-- =====================================================================
-- Auvra Club — backend multiplayer (Supabase / Postgres)
-- Modelo: mundo compartilhado ASSÍNCRONO (docs/10) + camada em tempo real
-- (presença, chat e notícias via Supabase Realtime — não precisam de tabela).
--
-- Como aplicar: Supabase → SQL Editor → cole este arquivo → Run.
-- Depois: Authentication → Sign In / Providers → habilite "Anonymous sign-ins".
--
-- Segurança: o cliente usa só a publishable/anon key. Toda escrita é limitada
-- por RLS ao próprio jogador; transferências de empresas entre jogadores só
-- acontecem pelas funções (RPC) abaixo, que validam dono, preço e estado.
-- Observação honesta: o caixa de cada jogador vive no cliente (jogo entre
-- amigos). Um jogador mal-intencionado pode editar o próprio save — o servidor
-- garante apenas que ninguém mexe nos dados dos OUTROS.
-- =====================================================================

-- Jogadores (ranking público) ------------------------------------------
create table if not exists public.players (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text not null check (char_length(name) between 2 and 24),
  net_worth   bigint not null default 0,
  phase       int    not null default 1 check (phase between 1 and 5),
  day         int    not null default 1,
  companies   int    not null default 0,
  updated_at  timestamptz not null default now()
);
alter table public.players enable row level security;
drop policy if exists players_read on public.players;
create policy players_read on public.players for select to authenticated using (true);
drop policy if exists players_insert on public.players;
create policy players_insert on public.players for insert to authenticated with check (id = (select auth.uid()));
drop policy if exists players_update on public.players;
create policy players_update on public.players for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- Save na nuvem (privado) ----------------------------------------------
create table if not exists public.saves (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  data        jsonb not null,
  updated_at  timestamptz not null default now()
);
alter table public.saves enable row level security;
drop policy if exists saves_own on public.saves;
create policy saves_own on public.saves for all to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- Empresas listadas no mercado (o "mundo compartilhado") ------------------
create table if not exists public.listings (
  id          text primary key,
  owner       uuid not null references public.players(id) on delete cascade,
  owner_name  text not null,
  name        text not null check (char_length(name) <= 60),
  niche       text not null,
  value       bigint not null check (value >= 0),
  profit      bigint not null,
  employees   int not null default 0,
  is_public   boolean not null default false,
  stake       real not null default 1 check (stake > 0 and stake <= 1),
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);
create index if not exists listings_owner_idx on public.listings(owner);
create index if not exists listings_value_idx on public.listings(value desc);
alter table public.listings enable row level security;
drop policy if exists listings_read on public.listings;
create policy listings_read on public.listings for select to authenticated using (true);
drop policy if exists listings_insert on public.listings;
create policy listings_insert on public.listings for insert to authenticated with check (owner = (select auth.uid()));
drop policy if exists listings_update on public.listings;
create policy listings_update on public.listings for update to authenticated using (owner = (select auth.uid())) with check (owner = (select auth.uid()));
drop policy if exists listings_delete on public.listings;
create policy listings_delete on public.listings for delete to authenticated using (owner = (select auth.uid()));

-- Negócios entre jogadores (ofertas amigáveis e aquisições hostis) --------
create table if not exists public.deals (
  id           bigint generated always as identity primary key,
  listing_id   text not null,
  company      jsonb not null,              -- snapshot da empresa no momento da oferta
  seller       uuid not null references public.players(id) on delete cascade,
  seller_name  text not null,
  buyer        uuid not null references public.players(id) on delete cascade,
  buyer_name   text not null,
  price        bigint not null check (price > 0),
  kind         text not null check (kind in ('offer','hostile')),
  status       text not null default 'pending' check (status in ('pending','accepted','declined','cancelled')),
  buyer_done   boolean not null default false,  -- comprador já aplicou o resultado no save
  seller_done  boolean not null default false,  -- vendedor já aplicou o resultado no save
  created_at   timestamptz not null default now(),
  resolved_at  timestamptz
);
create index if not exists deals_seller_idx on public.deals(seller);
create index if not exists deals_buyer_idx on public.deals(buyer);
create index if not exists deals_listing_idx on public.deals(listing_id);
alter table public.deals enable row level security;
drop policy if exists deals_read on public.deals;
create policy deals_read on public.deals for select to authenticated
  using (buyer = (select auth.uid()) or seller = (select auth.uid()));
-- sem policies de insert/update/delete: só as funções abaixo escrevem aqui.

-- Oferta amigável: mínimo 110% do valuation listado -------------------------
create or replace function public.make_offer(p_listing text, p_price bigint)
returns bigint language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid(); l public.listings; bname text; new_id bigint;
begin
  if uid is null then raise exception 'não autenticado'; end if;
  select * into l from public.listings where id = p_listing;
  if not found then raise exception 'empresa não está mais no mercado'; end if;
  if l.owner = uid then raise exception 'essa empresa já é sua'; end if;
  if p_price < ceil(l.value * 1.1) then raise exception 'oferta abaixo de 110%% do valuation'; end if;
  if exists (select 1 from public.deals where listing_id = p_listing and buyer = uid and status = 'pending') then
    raise exception 'você já tem uma oferta pendente por essa empresa'; end if;
  if (select count(*) from public.deals where buyer = uid and status = 'pending') >= 5 then
    raise exception 'máximo de 5 ofertas pendentes'; end if;
  select name into bname from public.players where id = uid;
  if bname is null then raise exception 'jogador não registrado'; end if;
  insert into public.deals(listing_id, company, seller, seller_name, buyer, buyer_name, price, kind)
  values (l.id, to_jsonb(l), l.owner, l.owner_name, uid, bname, p_price, 'offer')
  returning id into new_id;
  return new_id;
end $$;

-- Vendedor responde à oferta ------------------------------------------------
create or replace function public.respond_offer(p_deal bigint, p_accept boolean)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid(); d public.deals;
begin
  select * into d from public.deals where id = p_deal and seller = uid and status = 'pending' for update;
  if not found then raise exception 'oferta não encontrada'; end if;
  if p_accept then
    if not exists (select 1 from public.listings where id = d.listing_id and owner = uid) then
      update public.deals set status = 'cancelled', seller_done = true, resolved_at = now() where id = p_deal;
      return jsonb_build_object('status','cancelled');
    end if;
    delete from public.listings where id = d.listing_id;
    update public.deals set status = 'accepted', seller_done = true, resolved_at = now() where id = p_deal;
    -- outras ofertas pela mesma empresa caem (compradores recebem reembolso)
    update public.deals set status = 'cancelled', seller_done = true, resolved_at = now()
      where listing_id = d.listing_id and status = 'pending' and id <> p_deal;
    return jsonb_build_object('status','accepted');
  else
    update public.deals set status = 'declined', seller_done = true, resolved_at = now() where id = p_deal;
    return jsonb_build_object('status','declined');
  end if;
end $$;

-- Comprador cancela a própria oferta pendente -------------------------------
create or replace function public.cancel_offer(p_deal bigint)
returns void language plpgsql security definer set search_path = '' as $$
begin
  update public.deals set status = 'cancelled', seller_done = true, resolved_at = now()
   where id = p_deal and buyer = auth.uid() and status = 'pending';
  if not found then raise exception 'oferta não encontrada'; end if;
end $$;

-- Aquisição hostil: só empresas de capital aberto; paga 150% pela fatia do dono --
create or replace function public.hostile_takeover(p_listing text)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare uid uuid := auth.uid(); l public.listings; bname text; v_price bigint; new_id bigint;
begin
  if uid is null then raise exception 'não autenticado'; end if;
  select * into l from public.listings where id = p_listing for update;
  if not found then raise exception 'empresa não está mais no mercado'; end if;
  if l.owner = uid then raise exception 'essa empresa já é sua'; end if;
  if not l.is_public then raise exception 'só empresas de capital aberto podem sofrer aquisição hostil'; end if;
  select name into bname from public.players where id = uid;
  if bname is null then raise exception 'jogador não registrado'; end if;
  v_price := ceil(l.value * 1.5 * l.stake);
  delete from public.listings where id = l.id;
  insert into public.deals(listing_id, company, seller, seller_name, buyer, buyer_name, price, kind, status, buyer_done, resolved_at)
  values (l.id, to_jsonb(l), l.owner, l.owner_name, uid, bname, v_price, 'hostile', 'accepted', true, now())
  returning id into new_id;
  update public.deals set status = 'cancelled', seller_done = true, resolved_at = now()
   where listing_id = l.id and status = 'pending';
  return jsonb_build_object('deal_id', new_id, 'price', v_price, 'company', to_jsonb(l));
end $$;

-- Marca que o cliente já aplicou o resultado do negócio no save --------------
create or replace function public.mark_deal_done(p_deal bigint)
returns void language plpgsql security definer set search_path = '' as $$
begin
  update public.deals set buyer_done  = buyer_done  or (buyer  = auth.uid()),
                          seller_done = seller_done or (seller = auth.uid())
   where id = p_deal and (buyer = auth.uid() or seller = auth.uid());
end $$;

revoke all on function public.make_offer(text,bigint)       from public, anon;
revoke all on function public.respond_offer(bigint,boolean) from public, anon;
revoke all on function public.cancel_offer(bigint)          from public, anon;
revoke all on function public.hostile_takeover(text)        from public, anon;
revoke all on function public.mark_deal_done(bigint)        from public, anon;
grant execute on function public.make_offer(text,bigint)       to authenticated;
grant execute on function public.respond_offer(bigint,boolean) to authenticated;
grant execute on function public.cancel_offer(bigint)          to authenticated;
grant execute on function public.hostile_takeover(text)        to authenticated;
grant execute on function public.mark_deal_done(bigint)        to authenticated;

-- Realtime: notifica o vendedor/comprador quando um negócio muda -------------
do $$ begin
  alter publication supabase_realtime add table public.deals;
exception when duplicate_object then null; end $$;
