# Changelog — Bíblia de Pré-Produção (Project ATLAS / MOGUL)

Registro de versões da documentação de pré-produção. Segue versionamento semântico de documento (Major.Minor).

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
