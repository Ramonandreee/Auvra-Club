# Changelog — Bíblia de Pré-Produção (Project ATLAS / MOGUL)

Registro de versões da documentação de pré-produção. Segue versionamento semântico de documento (Major.Minor).

## 2.3.2 — 2026-11-27
- **feat(town):** mapa mais limpo. O painel lateral virou duas listas em abas, **Ir para** (atalhos, incluindo sua corretora e a Bolsa) e **Mostrar** (camadas com cor, contagem e interruptor, que também servem de legenda). Tudo cabe na tela sem rolar.
- Pinos próximos da mesma categoria viram **um pino com número**, e tocar nele aproxima o mapa. Concorrentes começam ocultos. Nomes dos pontos turísticos só aparecem com mais zoom.

## 2.3.1 — 2026-11-27
- **fix(town):** o herói voltou a andar na rua. Um comentário de uma linha engolia o código de colisão ao ar livre (`heroFree`), e o joystick não movia o boneco. Mesmo defeito corrigido no ajuste do trench coat.

## [2.3.0] — 2026-11-28 — *Do básico ao bilionário*
- 5 lojas em escada: Bowling Green Basics (básicos), Front Street (casual/couro), Maiden Lane (social/alfaiataria),
  Maison Verlaine (luxo) e Atelier Ravelle (alta-costura, só com patrimônio a partir de $1M ou fase 4).
- Peças novas: regata, cardigã, colete e gravata, trench coat, terno três peças, dinner jacket, terno bespoke,
  alta-costura; mocassim, sapatilha, sapato artesanal; óculos aviador, pasta italiana, bolsa de couro exótico.
- Novo espaço de joias/relógio (usado junto com o acessório): relógio clássico, suíço ($45k) e de bilionário ($380k),
  colar de pérolas, brincos de diamante, abotoaduras, anel de sinete.
- Estilo 0–100 com 6 níveis (Básico → Bilionário) somando roupa, calçado, acessório e joia; visual Magnata/Bilionário
  rende reputação pública todo dia.

## [2.2.0] — 2026-11-28 — *Personagens semi-realistas (1ª etapa)*
- Materiais físicos separados nos personagens próximos: pele (brilho e luz "por baixo"), lã/algodão (veludo da
  trama), couro (verniz) e cabelo (brilho de fio); malha mais suave de perto. Distantes seguem leves.
- Rosto: delineado/cílios, sombras do nariz e sob as maçãs, ponta do nariz, lábios e blush; sobrancelhas mais
  naturais; traços femininos (mandíbula, nariz, olhos, lábios). Cabelo assentado sem serrilhado na borda.
- Visual dos exemplos: "Blazer e camisa aberta" (camisa até o cinto, cinto com fivela), botas de couro, jeans na
  paleta, cor da camisa/blusa escolhível (blusa escura no blazer feminino); cabelos degradê e liso com franja.

## [2.1.1] — 2026-11-28 — *Lojas por gênero*
- Gênero do personagem (Masculino/Feminino) na aba Corpo. Lojas mostram só a coleção do seu gênero, com manequins do
  mesmo gênero; o editor esconde as peças do outro. No feminino, ternos viram tailleurs.
- Peças femininas novas: vestido de gala, scarpin stiletto e colar de pérolas.
- NPCs coerentes: homens sem vestido/saia/salto, mulheres sem barba; cortes de cabelo por gênero.

## [2.1.0] — 2026-11-28 — *Guarda-roupa e estilo*
- Começa com o básico (camiseta, jeans e tênis). Roupas, calçados e acessórios são comprados em três lojas fictícias
  com interior (araras, manequins vestindo a coleção, espelho, consultor(a) de estilo): Front Street Outfitters
  (casual/couro), Maiden Lane Tailors (social/alfaiataria) e Maison Verlaine (luxo/gala).
- Peças novas: camiseta básica, polo, suéter de tricô, jaqueta de couro, blazer, smoking; oxford italiano; boné,
  chapéu fedora e cachecol. Detalhes: golas, botões, zíper, punhos, gravata-borboleta, solado branco e cadarço,
  biqueira do oxford, relógio com mostrador.
- Estilo (0–100): pesa na troca de contatos, no pitch para investidores, na negociação de carros e na relação com
  atendentes; dress code executivo para tocar o sino da Bolsa; pessoas comentam o seu visual. No editor, peças não
  compradas aparecem com 🔒 e preço — tocar marca a loja no mapa.

## [2.0.1] — 2026-11-28 — *Correções: progresso, travamento, tela cheia*
- Login baixa o save da nuvem e usa o mais recente (aparelho × nuvem); nuvem salva a cada minuto e ao sair do app —
  antes, ao entrar em outro armazenamento, o jogo recomeçava.
- Travamento ao entrar na cidade: com destino sem rota possível o GPS recalculava a rota a cada quadro; agora tenta
  a cada 4 s, e o suavizador de rota é limitado.
- iPhone (app instalado): mede a tela real (o iOS informa a altura sem a barra de status) e usa a área inteira.
- Missão recolhida num botão 🎯 (ponto dourado quando muda). Mapa e diálogos cabem sem rolar (✕ no topo, filtros
  recolhidos, botões em duas colunas).

## [2.0.0] — 2026-11-28 — *Wall Street de verdade: Bolsa, corretoras e investimentos*
- **Bolsa de Nova York por dentro:** pregão gigante (colunas, galeria, bandeira, 6 postos de negociação com telas,
  fita de cotações ao vivo nas paredes, traders circulando), especialista do pregão e o sino de abertura (9:30,
  reputação de mercado 10+).
- **Mercado de ações:** 11 grandes empresas americanas fictícias + um fundo índice (regra do projeto: marcas
  fictícias), preços diários com tendência por setor, ciclo da economia e juros; cotação anda durante o dia.
- **Corretoras concorrentes:** Liberty Square (corretagem zero, spread), Hudson & Pell (taxa fixa + relatórios de
  analistas, escritório na Pine St) e Bowline Capital (0,1% e saldo rende 4% a.a.). Conta, depósito, saque, compra e
  venda pelo **AuvraOS → Investir** ou no balcão das corretoras. A carteira entra no patrimônio.
- **Contatos:** sem emoji na cabeça; ninguém começa como contato — qualquer pessoa pode virar ("Trocar contato" na
  conversa). Contatos agem sozinhos: dicas de ações que mexem de verdade nos preços, pedidos para suas empresas,
  matérias no jornal, mentorias e recados.
- Menu: voo de câmera mais lento e sem cintilação.

## [1.9.0] — 2026-11-28 — *Animações de verdade*
- Dormir: o personagem deita na cama, a janela escurece, a madrugada passa e amanhece (o dia vira no meio).
- Táxi: destino escolhido no mapa (com rota e preço), o táxi vem dirigindo pela rua até você e a corrida é
  acompanhada no mapa, com o relógio andando até a chegada.
- Cabelo moldado ao crânio real de cada personagem (sem vãos nas laterais e na nuca).
- Casa: não nasce mais dentro de móveis; em qualquer interior dá para sair de um ponto preso. Botão de correr discreto
  (silhueta monocromática).

## [1.8.0] — 2026-11-28 — *Gente de verdade e frota variada*
- Frota com silhuetas próprias: sedã, SUV, hatch, cupê, picape, van, limusine, caminhão-baú, ônibus e táxis (sedã e
  minivan), com faróis, lanternas, para-choques, rodas com aro e retrovisores; tráfego respeita o tamanho de cada um.
- Atendente com nome e personalidade fixos em cada estabelecimento (vendedor, garçom, barista, recepções, secretária),
  relação que cresce com a convivência e várias interações. Concessionária: tour, test drive, negociação de desconto
  (habilidade + relação + jeito do vendedor) e contrato à vista ou financiado — não se compra mais sozinho.
- Pedestres com 13 arquétipos (turista, trader, golpista, investidora, recrutadora, jornalista, estudante, vendedor de
  cachorro-quente, recém-demitido, fofoqueira de concorrente, executivo rival, músico, veterano) × 7 personalidades,
  falas que mudam com hora, mercado, concorrentes, fama e sua situação, escolhas com consequências.

## [1.7.0] — 2026-11-28 — *Obras, táxi, ritmo de cidade e menu novo*
- Dia de 10 min reais. Analógico só anda; botão de correr; câmera no lado direito (corrigido o arrasto com o celular em pé).
- Táxi pelo AuvraOS com preço/rota/chegada; canteiro de obras com prazo por porte e hora extra (economia: empresa em
  obra não fatura nem contrata). Noite mais clara com luz dos postes. NPCs sentados de frente para a mesa e sempre em
  cadeira.
- Menu e editor de personagem redesenhados (rail com logo, painel de início com dia/caixa/fase/patrimônio e próximo
  compromisso; editor em duas colunas com abas, opções roláveis e sliders com − / +). Sem avisos de instrução na tela.
- Tela inteira no app instalado (mede a tela real) e rolagem/sliders funcionando com o celular em pé.

## [1.6.0] — 2026-11-27 — *Tela limpa, mundo sólido e GPS*
- HUD mínimo (caixa/energia, relógio, mapa, ações, menu, minimapa redondo); ferramentas sob demanda; missão temporária.
- Sem acelerar o tempo. Energia só para esforço (trabalho/estudo); networking, reuniões, mercado e banco são livres;
  exausto anda devagar.
- Colisão em tudo: prédios, mobiliário urbano, pessoas e carros (multidão desvia, carros param para pedestres).
- GPS com A* (a pé/de carro), setas no chão e instruções de curva; mapa redesenhado com zoom, arraste e atalhos.
- Celular em pé: abertura já deitada desde o 1º quadro e teclado próprio deitado (o do sistema fica em pé).

## [1.5.0] — 2026-11-27 — *Contas, abertura e dias que pesam*
- Jogo (`town/`): abertura com a nova logo (a mesma do Instagram) → **login/cadastro obrigatório** (uma conta por
  e-mail, nome de usuário único garantido no banco, sem login anônimo); save por conta.
- Celular em pé não bloqueia mais: o jogo abre **sempre deitado** (tela girada + toques convertidos).
- **Dias longos:** 1 dia ≈ 4,8 min reais (antes 5,5 s), velocidade máx. 2×, sol segue o relógio. Energia cheia só
  dormindo em casa (+35 se virar a noite fora). `supabase/schema.sql`: trigger de novo usuário, `username_available`,
  nome imutável.

## [1.4.0] — 2026-11-27 — *Vida em Wall Street: carreira, agenda e mundo aberto*
- Jogo (`town/`): interiores 3D, casa, carro e garagem, pedestres abordáveis, relógio + agenda + AuvraOS, empregos com
  turnos e mini-jogos, entrevistas no RH, assédio de concorrentes, reuniões com contatos, fama visível, mapa com destinos,
  colisão com carros e trânsito que vira nas esquinas. Detalhes em `town/README.md`.

## [1.3.1] — 2026-11-26 — *Repositório = o que está rodando*
- **Removidos** (ficam só no histórico do git): o protótipo 3D `world/` (cidade fictícia antiga), o simulador de sistemas `game/` e o scaffold Unreal `ue5/`. O distrito 2D já tinha sido substituído pelo `town/` 3D.
- O repositório passa a ter só: `town/` (o jogo), `supabase/`, `tools/`, `docs/`, `index.html`, `CLAUDE.md`, `CONTRIBUTING.md`.
- `README` (status, versão jogável atual, mapa do repositório), `CLAUDE.md`, `CONTRIBUTING`, template de PR (prefixo `feat(town):`, validação do jogo 3D), `GLOSSARY` e `13-ART-DIRECTION` alinhados.
- A Unreal Engine 5.6 continua como **plano** de produção AAA (docs 10/11), não como código no repositório.
- No jogo: título e telas de carregamento/erro dizem "Wall Street" (o último "Meridian" saiu).

## [1.3.0] — 2026-11-26 — *O mundo é Nova York, a partir de Wall Street*
### Decisões
- **Mundo:** sai a cidade fictícia **Meridian**; entra **Nova York real**, começando em **Wall Street (Lower Manhattan)**. Subtítulo: *Construa seu império em Wall Street*.
- **Regra de autenticidade:** lugares, ruas e marcos fiéis; **empresas e marcas 100% fictícias** (nenhum logo real em fachadas, letreiros ou na economia); revisão jurídica de uso de imagem antes do lançamento comercial.
- **Regiões (mesmos papéis de jogo):** Sterling Heights → **Financial District/Wall Street** · The Grid → **Silicon Alley** · Ironside Docklands → **Brooklyn Waterfront** · The Boroughs → **The Boroughs (Queens · Bronx · Brooklyn)** · Goldhaven → **Upper East Side · Hudson Yards** · MER → **JFK** · MerEx → **a Bolsa** · MeridianOS → **AuvraOS**. Apex Club permanece (fictício).
- **Expansões:** outras capitais reais do dinheiro (Londres, Tóquio, São Paulo, Dubai), com a mesma regra.
### Alterações
- `04-WORLD-DESIGN` reescrito (§1 filosofia, §3 geografia e marcos, §8 expansões); `00, 05, 06, 07, 08, 09, 10, 11, 12, 13`, `GLOSSARY` e `README` alinhados.
- O jogo (`town/`) já é Wall Street em 3D, terceira pessoa. `world/` e `ue5/` ainda usam o nome Meridian no código (protótipo/scaffold) — registrado no glossário como aposentado.

## [1.2.0] — 2026-11-26 — *Nome oficial*
### Decisões
- **Título oficial: Auvra Club.** Subtítulo: *Construa seu império em Meridian*. Slogan mantido: *"Você não administra um império. Você vive um."*
- **Meridian** continua como o mundo/cidade. **Project ATLAS** fica como codinome interno.
- **Aposentados:** "MOGUL" (palavra saturada no gênero) e "Business Simulator" (conflito com jogo homônimo na Steam, lançado em nov/2025). `MOGUL` permanece só como identificador técnico do módulo C++ em `ue5/`.
- Pendências antes do lançamento: busca de marca (INPI/USPTO), domínio (ex.: auvra.club / auvraclub.com) e handles sociais.

## [1.1.0] — 2026-11-26 — *Protótipo principal + multiplayer*
### Decisões
- **`town/` vira o jogo principal** (2D top-down, mais viável); `world/` e `game/` ficam como referência.
- **Deploy:** site estático na **Vercel** (raiz `index.html`), sem build.
- **Multiplayer (alinhado à docs/10):** mundo compartilhado **assíncrono** (ranking, save na nuvem, ofertas e aquisição hostil entre jogadores) + camada **em tempo real** (presença, chat, notícias) sobre **Supabase**. Fallback offline obrigatório.
### Alterado no `town/`
- Começo falido ($3k), freelas/cursos/banco na Sede, energia diária, habilidades que evoluem com o uso.
- Economia rebalanceada por simulação (`tools/sim-town.js`): saturação de escala, juros sensíveis à alavancagem, IPO com diluição real, otimização de operação com custo e recarga, limite de equipe aplicado.
- Concorrentes com prédio no mapa (roubo de talento, guerra de preço, falência, ex-funcionários abrindo concorrentes); contatos de networking na praça com memória; eventos com escolhas e consequência persistente; distrito que expande por fase; tela de Legado; save local; pausa/velocidade/zoom/pinça.

## [1.0.0] — 2026-06-23 — *Concept Complete / Pré-Produção*
### Adicionado
- **Estrutura completa da bíblia** (13 documentos + glossário + changelog).
- **README** master com índice, fatos canônicos (single source of truth), pilares e guia de leitura por stakeholder.
- **00 — Executive Summary:** pitch, problema de mercado, USP, 5 fases, números-chave, projeções e riscos (resumo).
- **01 — Product Vision & Core Pillars:** visão fundamental, 7 emoções-alvo, 5 fases emocionais detalhadas, 3 pilares, Pillar Gate (princípio mestre), tom, bússola de design.
- **02 — Market, Audience & Competition:** personas, motivações (Bartle), TAM/SAM/SOM, mapa competitivo, SWOT, USP/trifecta, posicionamento.
- **03 — Gameplay Design:** 5 loops aninhados, 5 fases (gating de mecânicas), progressão de personagem, estilos de vitória, endgame, New Game+ geracional, economia da atenção.
- **04 — World Design:** Meridian City, 6 distritos + aeroporto, verticalidade/camadas sociais, cidade viva, eventos, escala/pipeline, expansibilidade.
- **05 — Economy & Financial Systems:** arquitetura em 4 camadas, macroeconomia viva, mercados setoriais, agentes econômicos, finanças corporativas e pessoais, mercado de capitais, alavancas de influência, crime econômico, balanceamento.
- **06 — Business & Corporate Growth:** ciclo de vida da empresa, setores/nichos + template de mecânica, operações, funcionários como agentes, liderança/cultura, M&A completo, sinergias/conglomerados, concorrência por IA, marca.
- **07 — NPC & Agent AI Architecture:** tese de agentes, LOD de cognição (Tier 0–3), anatomia do agente (perfil/Big Five/memória/comportamento), knowledge graph, diálogo híbrido + guard-rails, networking, grafo social, reputação multidimensional, emergência.
- **08 — Real Estate, Offices & Vehicles:** ativos como linguagem de status, imóveis (4 papéis), escritórios físicos como narrativa visual, veículos como sinal social, Status como sistema unificado.
- **09 — UX/UI Design:** interface diegética em 3 camadas, MeridianOS, consultores-IA, UX flows principais, HUD, legibilidade causal, acessibilidade AAA, direção de arte de UI.
- **10 — Technical Architecture:** stack UE5.6, Simulation Core + LOD de simulação, EDA, Economy Engine, Agent AI técnico, diálogo híbrido, backend/online/multiplayer assíncrono, save system, database, content pipeline, escalabilidade, segurança/conformidade.
- **11 — Production Plan:** roadmap ~6 anos/6 fases, gates, definição de Vertical Slice e MVP, full production, estrutura de equipe (strike teams), budget (~USD 195M) por ano e categoria, riscos de produção.
- **12 — Business Plan & Live Ops:** revenue model em camadas, projeções (3 cenários), break-even/ROI, unit economics de IA, GTM/marketing, matriz de riscos completa (15 riscos), post-launch/Live Ops, DLC/expansões, KPIs, visão de 5 anos.
- **Glossário** e **Changelog**.

### Decisões canônicas estabelecidas nesta versão
- Título **MOGUL**; codinome **Project ATLAS**; cidade **Meridian City** (6 distritos + MER).
- Engine **UE5.6**; plataformas PC (lead) + PS5/Series; modelo **premium + serviço não-predatório**.
- Modelo de IA **híbrido** (on-device + cloud + fallback determinístico); IA como *enhancement*, não dependência crítica.
- Multiplayer **assíncrono persistente** (não MMO de tempo real).
- Orçamento de produção **~USD 195M**; marketing **~USD 90M**; lançamento-alvo **T4 2032**.

---

### Como evoluir este documento
- Mudanças nos **fatos canônicos** começam no [README](../README.md) e propagam.
- Cada alteração relevante incrementa a versão e registra aqui (data, seções afetadas, racional).
- Versões: **Major** = mudança de visão/pilar/escopo; **Minor** = detalhamento/ajuste dentro da visão.
