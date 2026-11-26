# Meridian — o distrito (`town/`) · jogo principal

Protótipo 2D top-down em pixel art: a **direção principal** do Auvra Club. Roda no navegador
(1 arquivo, sem build), tem **save local** e, quando o servidor está configurado, **multiplayer
assíncrono + tempo real** via Supabase.

▶ **Jogar:** abra `town/index.html` (ou a URL publicada na Vercel → `/town/`).

## O loop

1. **Sobrevivência:** você começa com **$3k**. Caminhe até a ⭐ **Sede** para fazer **freelas**
   (gasta ⚡ energia, que renova todo dia), cursos e **banco** (empréstimo com juros que sobem na
   recessão e com a alavancagem; caixa negativo por 5 dias = falência).
2. **Fundar:** 🔨 Construir → escolha o setor → toque numa área **clara** (liberada) do distrito.
3. **Crescer:** dentro de cada empresa, **expanda** (escala = capacidade e receita, com retorno
   decrescente) e **contrate** (funcionário só se paga com escala). Otimizar operação custa caixa +
   energia, 1×/dia. Gerente reduz a decadência da operação.
4. **Concorrentes vivos:** os prédios de **bandeira vermelha** são concorrentes. Tiram receita do
   seu setor, roubam talentos, fazem guerra de preço, quebram e surgem. Na fase 2+ dá para
   **comprá-los** (o prédio e a equipe viram seus).
5. **Networking diegético:** as pessoas com **anel dourado** na praça são contatos (investidora,
   banqueiro, mentor, cliente, headhunter). Vá até elas, converse, suba a relação e destrave
   aportes, juros menores, contratos e talentos estrela. Elas **lembram** do que vocês fizeram.
6. **Eventos com escolhas:** greve, escândalo, contrato com a prefeitura, pedido de aumento (quem
   tem o pedido recusado pode sair e **abrir uma concorrente**), incêndio, guerra de preço…
7. **Escala → Influência → Legado:** IPO (fase 3+, vende 35% e dilui sua participação), sinergia
   entre setores da mesma família, e o **distrito se expande** a cada fase. Fase 5 = tela de Legado.

Controles: toque/clique no chão = andar · num prédio/pessoa = ir até lá e interagir · arrastar =
câmera · roda do mouse / pinça = zoom · **Espaço** pausa · **1/2/3** velocidade · **Esc** fecha ·
📍 volta para você. O tempo **pausa** enquanto um painel está aberto.

## Multiplayer (opção 3: mundo compartilhado assíncrono + tempo real)

| Camada | O que faz | Onde |
|---|---|---|
| Assíncrona | Save na nuvem, ranking de patrimônio, suas empresas listadas no mercado de todos, **ofertas** (o dinheiro fica reservado até o dono responder) e **aquisição hostil** de empresas de capital aberto (150% da fatia do dono) | tabelas `players`, `saves`, `listings`, `deals` + funções RPC |
| Tempo real | Quem está online, **chat**, notícias ao vivo (fundou, IPO, aquisição, fase), aviso instantâneo de oferta/aquisição | Supabase Realtime (presence, broadcast, postgres_changes) |

Sem servidor configurado (ou sem internet), o jogo roda **offline** com save local.

### Ligar o servidor (uma vez)

1. Crie um projeto em [supabase.com](https://supabase.com) (plano grátis serve).
2. **SQL Editor** → cole [`supabase/schema.sql`](../supabase/schema.sql) → **Run**.
3. **Authentication → Sign In / Providers → Anonymous sign-ins → Enable** (cada navegador vira um
   jogador, sem cadastro).
4. **Project Settings → API**: copie a **Project URL** e a **publishable key** (ou a `anon` key) e
   cole em `MP_CONFIG` no topo do bloco *MULTIPLAYER* de `town/index.html`. Essas chaves são
   públicas por design: quem protege os dados é o RLS do schema.
5. Commit + push → a Vercel publica sozinha.

Limitações honestas: a identidade é **por navegador** (trocar de aparelho cria outro jogador); o
caixa vive no cliente (é um jogo entre amigos — o servidor impede mexer nos dados dos **outros**,
mas não impede alguém de editar o próprio save); o chat não fica guardado (só quem está online vê);
o plano grátis do Supabase **pausa o projeto após 1 semana sem uso** (reative no painel).

## Validação (CLAUDE.md)

- Economia: `node tools/sim-town.js 200 700` — 4 bots (passivo, equilibrado, agressivo, alavancado)
  × 200 partidas. Falha (exit 1) se o bot equilibrado não chegar à fase 5 ou falir > 50%.
  Referência atual: passivo ~100% falência · equilibrado ~3% falência, fase 3 ≈ dia 110, fase 5 ≈
  dia 500 · alavancado ~45% falência.
- O bloco de economia fica entre os marcadores `/*@ECON-BEGIN*/` e `/*@ECON-END*/` — mantenha-os.
