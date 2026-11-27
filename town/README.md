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
entrar / conversar / conhecer. No computador: **WASD/setas** andam, **Shift** corre, mouse arrasta a câmera, roda = zoom,
**E** interage, **Espaço** pausa, **1/2/3** velocidade, **Esc** abre o menu. O tempo **pausa** com
menu ou painel aberto.

## Vida em Wall Street (estilo mundo aberto)

- **Entrar nos prédios:** sede, suas empresas e concorrentes têm interior 3D. Nas suas empresas, a equipe trabalha
  sentada nas mesas (digitando) ou circula; fale com cada funcionário (elogiar, aumento de 10%, demitir). Recepção/RH e a
  mesa do CEO abrem a gestão; a mesa de reunião otimiza a operação; a copa faz um café com a equipe (1×/dia).
  Na sede: computador = freela, estante = cursos, telefone = banco, quadro = metas.
- **Casa:** nas *Residências Pearl St* (🏠). 5 níveis (quitinete alugada → penthouse de $15M) + 3 níveis de reforma.
  Dá ⚡ extra todo dia e reputação; dentro: cama (dormir = próximo dia), closet (visual), notebook (freela), tablet de imóveis.
- **Carro:** na *Manhattan Motors* (🚗), showroom com 6 modelos girando (sedã usado $9k → limusine $4M). Dirija pelas ruas
  (joystick: cima acelera, baixo freia/ré, lados viram; táxis param para você). Ferramenta 🚗 *Carro* chama o manobrista.
- **Bens no patrimônio:** carro conta 70% do preço, casa 90%, reformas 50% (`assetValue()` no bloco @ECON).
- **Pedestres:** qualquer pessoa na calçada pode ser abordada (1×/dia cada): turista, trader, recrutadora, jornalista,
  empreendedora, estudante, vendedor de cachorro-quente — cada encontro tem um efeito pequeno.
- **Mais gente na rua:** multidão 16/34/52 pessoas (qualidade baixa/média/alta).

## Menu principal

**Jogar / Continuar**, **Novo jogo**, **Personagem**, **Amigos**, **Indicadores**, **Ajustes** e
**Como jogar**. Indicadores reúne patrimônio, caixa, dívida, lucro por dia, ranking e a tabela das empresas.
Ajustes reúne qualidade gráfica, câmera, ciclo dia/noite, trânsito, tela cheia, instalação e save.

## Interface e personagens

O HUD, a barra de ferramentas, o menu e os modais usam superfícies azul-carvão, texto claro e
dourado para ações e foco. O CSS concentra a grade de 8 px, os raios, a elevação, a tipografia e as
transições de 140 ms. Os controles principais têm área de toque de pelo menos 44 px e respeitam as
safe areas. A preferência por movimento reduzido desativa as animações da interface.

Em **Personagem**, as abas **Corpo**, **Rosto**, **Cabelo**, **Roupa** e **Acessórios** editam a aparência
ao lado da prévia 3D. Arraste a prévia para girar e use **Aproximar** para enquadrar o rosto. **Aleatório**
gera um visual completo e **Desfazer** restaura até 24 mudanças de aparência da sessão. O nome
é editado separadamente. Aparências antigas no save e em `auvra_avatar` recebem os campos novos com
valores padrão. O seletor de movimento permite conferir **Parado**, **Caminhada** e **Corrida**
com a roupa escolhida. Ele só anima a prévia e volta para **Parado** ao sair do editor.
Enquanto a prévia está aberta, o jogo pausa a atualização da rua para concentrar o trabalho
no personagem exibido.

O corpo usa malhas com pesos interpolados nas articulações. A cabeça deriva da malha anatômica
CC0 do MakeHuman. Cabelo, cor da pele, íris, sobrancelhas, barba, vestuário e acessórios são
montados pelo jogo. Os três níveis de detalhe compartilham o esqueleto. A prévia usa LOD0,
a qualidade baixa usa LOD2 e as outras alternam pela distância da câmera, com
histerese na troca. A malha usa uma chamada de desenho no passe principal por pessoa.
O marcador de contato precisa de uma chamada adicional quando está visível.

Na caminhada e na corrida, joelhos e tornozelos acompanham uma trajetória de apoio e
retorno. Na caminhada, o calcanhar toca primeiro, o pé assenta e a ponta termina o apoio.
A passada do protagonista usa o deslocamento realizado no mundo, incluindo
quando ele desliza ao longo de uma parede ou para diante de um obstáculo.

Em **Roupa**, **Aplicar visual da fase** sugere uma combinação coerente com a progressão.
Todas as roupas, de casual a alfaiataria premium, ficam disponíveis desde o início.
Contatos mantêm identidade visual associada ao nome e à função. Ao abrir uma conversa,
jogador e contato viram um para o outro e entram em uma animação de diálogo. Táxis e
outros carros integram o tráfego ambiente. Embarque depende de um sistema de veículos jogáveis.

### Fonte da malha facial

O arquivo [base.obj](https://github.com/makehumancommunity/makehuman/blob/a8bc2d54ff0ac92e78ff71431b1023eda42bf482/makehuman/data/3dobjs/base.obj)
do MakeHuman declara [CC0 1.0 Universal](https://github.com/makehumancommunity/makehuman/blob/a8bc2d54ff0ac92e78ff71431b1023eda42bf482/makehuman/LICENSE.md#c-the-license-for-the-bundled-assets).
O script `tools/bake-character-head.py` recorta a cabeça na altura do colarinho e gera
os dados incorporados de 3.600 e 900 triângulos. Ele pode ser executado com Blender 4.3
pela raiz do repositório.

```sh
blender -b -t 2 -P tools/bake-character-head.py -- /caminho/base.obj town/index.html
```

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
- Para medir o passe principal, consulte `window.__game.STATS()` depois de entrar no distrito.
  Os campos `calls` e `triangles` vêm de `renderer.info.render`. O Three.js reinicia esses
  contadores após o passe de sombras. Em média, o orçamento é 250 chamadas e 400 mil triângulos,
  com pools de 26 NPCs e 18 pedestres de multidão. A meta de 30 FPS exige teste em aparelho físico.
- Saves do mapa 2D antigo são re-assentados em Wall St.
