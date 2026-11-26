# Auvra Club — Wall Street (`town/`) · o jogo

Jogo em **3D, terceira pessoa, para celular na horizontal**, ambientado em **Wall Street (Lower
Manhattan)**. Roda no navegador (1 arquivo, sem build; Three.js e supabase-js via CDN com versão
fixada), tem **save local** e **multiplayer assíncrono + tempo real** via Supabase.

▶ **Jogar:** a raiz do site abre direto o jogo (`/` → `/town/`).

## O mapa (fiel ao traçado real, quarteirões comprimidos)

Ruas: **Broadway**, **Wall St** (trecho de pedestres entre a Broadway e a William, com balizadores),
**Nassau / Broad**, **William**, **Pearl**, **Water**, **South St** (sob o elevado da **FDR**), **Pine**,
**Exchange Pl** e **Beaver**. Marcos modelados com seus traços característicos: **Trinity Church** no
topo da Wall St (com o cemitério), **Federal Hall** (templo dórico + estátua de Washington na escadaria),
a **Bolsa** (6 colunas coríntias + bandeira), **1 Wall** (art déco escalonado), **14 Wall** (pirâmide de
degraus), **40 Wall** (telhado de cobre verde), **23 Wall** (a “Casa de Morgan”), **55 Wall** (colunata
dupla), **60 Wall** (coroa de treliça), **70 Pine** (lanterna de vidro), **Bowling Green** (touro de bronze),
o **East River** com o calçadão e uma ponte de torres góticas ao longe. Vida de rua: táxis amarelos
com semáforos, caixas d’água nos telhados, entradas de metrô com globos verdes, chaminés de vapor,
faixas de pedestre, placas verdes de esquina, escadas de incêndio. As janelas acendem à noite.

Lógica: o mapa continua sendo um **grid de tiles** (1 tile = 4 m = 48 “px” lógicos) — é isso que a
economia, o save e o multiplayer enxergam. Terrenos à venda (verdes no modo construção) são onde as
empresas nascem; os marcos e os prédios de enchimento são fixos. Cada marco tem um cartão com a
história real; a **Bolsa** abre o pregão (Mercado) e o **23 Wall** abre o banco.

## O loop

1. **Sobrevivência:** você começa com **$3k**. Caminhe até a ⭐ **Sede** para fazer **freelas**
   (gasta ⚡ energia, que renova todo dia), cursos e **banco** (empréstimo com juros que sobem na
   recessão e com a alavancagem; caixa negativo por 5 dias = falência).
2. **Fundar:** 🔨 Construir → escolha o setor → o terreno livre mais próximo fica marcado; ande
   (ou toque no chão) para escolher outro e confirme. O prédio **cresce** quando a empresa expande.
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

Controles (celular): **joystick** à esquerda anda (na borda = corre) · **arrastar** a tela gira a
câmera · **pinça** = zoom · tocar num prédio/pessoa/chão = ir até lá · **botão dourado** à direita =
entrar / conversar / conhecer. No computador: **WASD/setas**, mouse arrasta a câmera, roda = zoom,
**E** interage, **Espaço** pausa, **1/2/3** velocidade, **Esc** abre o menu. O tempo **pausa** com
menu ou painel aberto.

## Menu principal

▶ Jogar / Continuar · 🌱 Novo jogo · 👤 **Personagem** (nome, pele, cabelo, roupa, calça, silhueta,
altura — com prévia 3D) · 👥 **Amigos** (online, ranking, chat, ofertas) · 📊 **Indicadores**
(patrimônio, caixa, dívida, lucro/dia, ranking, gráfico do patrimônio, tabela das empresas) ·
⚙️ **Ajustes** (qualidade gráfica baixa/média/alta, sensibilidade, inverter câmera, ciclo dia/noite,
trânsito, tela cheia, instalar app, salvar) · ❓ **Como jogar**. O distrito fica vivo atrás do menu.

## No celular (app instalável)

O `town/` é um **PWA**: `manifest.webmanifest` + `sw.js` + ícones. No jogo, **⚙️ Ajustes → 📲 Instalar app**
(Android/Chrome abre o instalador; no iPhone mostra o passo *Compartilhar → Adicionar à Tela de Início*).
Instalado, abre em tela cheia **na horizontal**, respeita notch/barra de gestos e abre mesmo sem internet (save local).
O service worker busca o HTML na rede primeiro (atualizações chegam na hora) e **nunca** faz cache das
chamadas ao Supabase. Mudou o shell ou uma lib de CDN? Suba a versão de `CACHE` em `sw.js`.

> No iPhone, o app instalado tem armazenamento separado do Safari: é outro jogador (identidade é por navegador).

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
- 3D/UI: smoke test com Playwright em celular emulado na horizontal (carrega, menu, personagem,
  freela, construir, painéis, 4×, recarregar/continuar, aviso de girar o celular) — no scratchpad.
- Desempenho: ~200 draw calls na qualidade média (cidade estática fundida por material; pessoas e
  carros com 1 material de cores por vértice). Saves do mapa 2D antigo são re-assentados em Wall St.
