# 04 — World Design: Nova York, a partir de Wall Street

> *Auvra Club (codinome Project ATLAS) — Bíblia de Pré-Produção*
> Documento 04 de 12 · Confidencial

---

## 1. Filosofia de Mundo

> **Nova York não é um cenário. É um personagem — e um adversário. Ela vive, respira e muda com ou sem o jogador.**

O jogo se passa em **Nova York real**, e começa no lugar que é sinônimo mundial de dinheiro e ambição: **Wall Street, em Lower Manhattan**. O jogador chega com $3k na esquina da Wall com a Broad — em frente à Bolsa e ao Federal Hall — e a cidade inteira é a escada a subir.

| Por que Nova York (e não uma cidade fictícia) | O que isso nos dá |
|------------------------------------------------|-------------------|
| **"If you can make it here…"** | A fantasia de império mais reconhecível do planeta — legível em 1 segundo, em qualquer idioma |
| **Wall Street como ponto de partida** | O coração simbólico do capital: Bolsa, bancos, cânions de pedra e vidro, ternos, pressa |
| **Arquitetura real e icônica** | Trinity Church, Federal Hall, a Bolsa, 40 Wall, 70 Pine, Bowling Green — marcos que o jogador reconhece e que dão peso a cada conquista |
| **Os cinco boroughs** | Uma progressão espacial pronta: do apê no Queens à cobertura no Upper East Side |

**Regras de autenticidade (não negociáveis):**
1. **Lugares reais, empresas fictícias.** Ruas, marcos e arquitetura são fiéis; **nenhuma marca, logo ou empresa real** aparece em fachadas, letreiros ou na economia. Todo concorrente, banco-NPC e startup é inventado.
2. **Fiel no traçado, comprimido na escala.** O traçado das ruas e a posição relativa dos marcos são reais; os quarteirões são comprimidos para manter **densidade de interação** (ver §7).
3. **História como conteúdo.** Cada marco tem um cartão com fatos reais verificados (datas, estilos, episódios) — diegese e aprendizado, não enfeite.
4. **Revisão jurídica** de uso de imagem de edifícios e de nomes antes de qualquer lançamento comercial (ver [12](12-BUSINESS-PLAN.md)).

## 2. Princípios de Design de Mundo

1. **Densidade comunica oportunidade.** Cada quarteirão deve transbordar de negócios, pessoas e possibilidades. Vazio = falha.
2. **Verticalidade comunica status.** A cidade é lida em camadas de altura — do subsolo aos rooftops de elite. Subir literalmente = subir socialmente.
3. **O mundo é legível como mapa de progressão.** Olhar a cidade deve revelar onde você está e para onde pode ir. Distritos = degraus aspiracionais.
4. **Tudo é potencialmente possuível.** Aquele prédio, aquela loja, aquele restaurante — quase tudo pode, em teoria, virar seu (ver [08-Assets](08-ASSETS-SYSTEMS.md)).
5. **A cidade muda com a economia.** Boom = guindastes, novos prédios, otimismo. Crise = obras paradas, lojas fechadas, tensão (ver [05-Economy](05-ECONOMY-DESIGN.md)).

## 3. Geografia — de Wall Street aos cinco boroughs

Nova York é organizada em regiões com **identidade visual, função econômica, classe social e gameplay** próprios. A geografia é também a **curva de progressão espacializada**: o jogador "sobe" pela cidade. O **primeiro mapa jogável é Wall Street** (§3.2); as demais regiões entram camada por camada.

### 3.1 Mapa-conceito

```
                    ✈ JFK (expansão global, networking de elite)
                                     |
      ┌──────────────────────┐   ┌───┴──────────────────────┐
      │ UPPER EAST SIDE /     │   │ SILICON ALLEY             │
      │ HUDSON YARDS (luxo)   │   │ Flatiron · Chelsea (tech) │
      └──────────┬───────────┘   └───────────┬──────────────┘
                 │       ╔════════════════╗   │
                 └───────╢ FINANCIAL      ╟───┘
                         ║ DISTRICT       ║ ◄── você começa aqui
                         ║ (Wall Street)  ║
                         ╚═══════╤════════╝
          East River ════════════╪═══════════════════════
      ┌──────────────────────────┴──────────────────────────┐
      │ BROOKLYN WATERFRONT (Navy Yard · Red Hook)  ·  THE   │
      │ BOROUGHS (Queens · Bronx · Brooklyn residencial)     │
      └──────────────────────────────────────────────────────┘
```

### 3.2 Distrito Financeiro — **Wall Street (Financial District, Lower Manhattan)**
*"Onde o dinheiro pensa."* — **o mapa jogável atual** ([`town/`](../town/README.md)).
- **Identidade:** ruas-cânion estreitas, pedra calcária e vidro, ternos, balizadores de segurança, táxis amarelos, vapor saindo do asfalto, caixas d'água nos telhados.
- **Traçado (fiel, comprimido):** Broadway, **Wall St** (trecho de pedestres entre a Broadway e a William), Nassau/Broad, William, Pearl, Water, South St sob o elevado da FDR, Pine, Exchange Pl, Beaver — e o **East River**.
- **Marcos:** **Trinity Church** (topo da Wall St), **Federal Hall** (posse de Washington, 1789), **a Bolsa** (Wall × Broad, 6 colunas coríntias), **1 Wall**, **14 Wall** (pirâmide de degraus), **23 Wall** (a "Casa de Morgan"), **40 Wall** (telhado de cobre verde), **55 Wall** (colunata dupla), **60 Wall**, **70 Pine**, **Bowling Green** (o touro de bronze) e o **Banco Central** (inspirado no Fed de NY, na Liberty St).
- **Função econômica:** bancos, fundos, corretoras, family offices, a Bolsa, VCs, escritórios de advocacia e M&A.
- **Gameplay:** a Bolsa abre o pregão (mercado, M&A, IPO); o 23 Wall é o banco; a praça Wall × Broad concentra os contatos de networking; terrenos à venda nos quarteirões viram suas empresas, que **crescem em andares** com a escala.
- **Progressão:** começar aqui duro é o contraste dramático da fantasia — você é o anônimo de mochila entre os ternos. Ter **uma torre sua na Wall St** é o status corporativo máximo (Fases 3–4).

### 3.3 Distrito Tecnológico — **Silicon Alley (Flatiron · Chelsea · Union Square)**
*"Onde o futuro é prototipado."*
- **Identidade:** lofts industriais de tijolo reconvertidos, o Flatiron Building, cafés 24h, energia de startup, casual-chic.
- **Função econômica:** startups, coworkings, incubadoras/aceleradoras, hubs de IA/SaaS/fintech, campus de big techs (fictícias).
- **Gameplay:** fundar startups, pitch days, demo days, recrutamento de talento técnico, "deal flow" inicial.
- **Marcos:** o coworking-âncora ("The Foundry", fictício), o anfiteatro de pitch ("Demo Hall"), Union Square.
- **Progressão:** barreira de entrada baixa, teto alto (Fase 1–2).

### 3.4 Distrito Industrial — **Brooklyn Waterfront (Navy Yard · Red Hook)**
*"Onde as coisas são feitas e movidas."*
- **Identidade:** galpões, guindastes, contêineres, armazéns de tijolo, caminhões, a orla trabalhadora com vista para Manhattan.
- **Função econômica:** fábricas, centros logísticos, terminal de contêineres, armazéns, energia, construção, atacado, manufatura.
- **Gameplay:** cadeias de suprimento, logística, produção física, imóveis industriais baratos (e gentrificáveis — DUMBO é a prova histórica), negócios de "economia real".
- **Progressão:** acessível desde cedo (capital baixo, margens reais); base de impérios "old economy".

### 3.5 Distrito Residencial — **The Boroughs (Queens · Bronx · Brooklyn)**
*"Onde a cidade dorme — e sonha."*
- **Identidade:** vizinhanças em gradiente social: do apê apertado no Queens (onde o jogador mora no início) ao brownstone no Brooklyn ao bairro em gentrificação.
- **Função econômica:** moradia, comércio de bairro, serviços, o "mercado consumidor" de massa.
- **Gameplay:** seu primeiro apartamento; imóveis residenciais (compra/reforma/aluguel/flip); varejo de proximidade; sentir o pulso do consumidor comum. O **metrô** liga o seu bairro a Wall Street — a viagem diária é a distância social em minutos.
- **Progressão:** **o início absoluto** (Fase 1). Voltar aqui depois de rico é um poderoso marcador emocional de quão longe você chegou.

### 3.6 Distrito de Luxo — **Upper East Side · Hudson Yards** (+ fins de semana nos Hamptons)
*"Onde o dinheiro descansa e se exibe."*
- **Identidade:** coberturas na Park Avenue, townhouses, Central Park, torres de vidro de Hudson Yards, hotéis 5 estrelas, galerias, restaurantes estrelados, clubes privados; mansões de praia nos Hamptons.
- **Função econômica:** hospitality de luxo, alta gastronomia, moda, arte/leilões, clubes e eventos exclusivos, imóveis de altíssimo padrão.
- **Gameplay:** networking de elite (os deals mais valiosos acontecem aqui), galas, exibição de status (carro/roupa/companhia importam — ver [08](08-ASSETS-SYSTEMS.md)), aquisição de "troféus" (hotéis, restaurantes, obras de arte, iate).
- **Marcos:** o clube privado mais exclusivo (**"The Apex Club"**, fictício — só por convite/reputação), o hotel-ícone, a casa de leilões.
- **Progressão:** aspiração das Fases 4–5. **O Apex Club é um símbolo-meta:** entrar nele é um marco emocional do endgame.

### 3.7 Aeroporto Internacional — **JFK**
*"A porta para o mundo."*
- **Identidade:** o portal. Terminais, lounges executivos, hangares de jatos privados (e o heliporto de Downtown Manhattan, a 5 min de Wall Street).
- **Função econômica:** expansão internacional, networking global, importação/exportação, viagens de negócios.
- **Gameplay:** abrir operações em outras cidades (gancho para expansões — ver [12](12-BUSINESS-PLAN.md)); networking com players internacionais; o jato privado como ápice de status; viagens que disparam eventos/oportunidades.
- **Progressão:** habilita o "go global" (Fase 4–5). O upgrade "classe econômica → executiva → jato privado" é uma micro-curva de status deliciosa.

## 4. Verticalidade & Camadas Sociais

A cidade é lida em **camadas de altura**, espelhando a estratificação social — uma metáfora jogável de ascensão:

| Camada | Espaço | Quem está lá | Significado |
|--------|--------|--------------|-------------|
| **Subsolo / Rua** | Metrô, ruas, comércio popular | Massa, o jogador no início | Sobrevivência, anonimato |
| **Andares baixos** | Lojas, escritórios pequenos, coworkings | Pequenos empresários | Crescimento |
| **Andares médios** | Escritórios corporativos | Empresas estabelecidas | Escala |
| **Andares altos** | C-suites, salas de conselho | Executivos, decisores | Influência |
| **Rooftops / Penthouses** | Clubes de rooftop, coberturas, helipontos | A elite absoluta | Legado, chegada ao topo |

> Subir de andar é, literalmente e simbolicamente, subir na vida. O elevador panorâmico é um dispositivo emocional recorrente.

## 5. A Cidade Viva (Sistemas de Ambiente)

### 5.1 Ciclo de dia/noite & semana
- **Dia/noite** afeta atividades disponíveis: Wall Street lotada de dia e vazia à noite (com as janelas acesas das torres); o Upper East Side, Hudson Yards e a vida noturna acordam à noite.
- **Dias da semana:** dias úteis (negócios) vs. fins de semana (lazer, networking informal, eventos sociais).
- **Ritmo:** rush hours, horário de almoço (oportunidade de networking em cafés/restaurantes), after-work.

### 5.2 Clima & estações
- Clima dinâmico (chuva, calor, etc.) afeta atmosfera e alguns sistemas (ex.: construção, varejo, humor dos NPCs em margem).
- Estações marcam o calendário econômico e eventos sazonais (ver §6).

### 5.3 Multidões & tráfego (densidade)
- Simulação de multidões em escala via **Mass Entity** (ver [10-Tech](10-TECHNICAL-ARCHITECTURE.md)): milhares de pedestres e veículos.
- Densidade e composição da multidão **refletem a economia e o distrito** (Wall Street lotada de executivos e turistas fotografando a Bolsa; Boroughs com famílias; Upper East Side com a elite).
- **LOD de comportamento:** a vasta maioria são agentes "ambientais" baratos; um subconjunto são NPCs "profundos" (ver [07-AI](07-NPC-AI-ARCHITECTURE.md)).

### 5.4 A cidade muda com a economia e com o jogador
- **Reflexo macroeconômico:** boom traz guindastes, obras, novos negócios, otimismo visível; recessão traz obras paradas, vitrines fechadas, mais tensão (ver [05](05-ECONOMY-DESIGN.md)).
- **Reflexo do jogador:** seus prédios surgem na skyline; sua marca aparece em outdoors, fachadas, uniformes; bairros que você gentrifica mudam de cara. **Sua ascensão reescreve o mapa.**
- **Reflexo dos rivais:** empresas-IA também constroem, fecham, colocam outdoors. O mapa é uma leitura visual do estado competitivo do mundo.

## 6. Eventos de Mundo (conteúdo vivo)
- **Econômicos:** crises, bolhas, booms setoriais, mudanças de juros (ver [05](05-ECONOMY-DESIGN.md)).
- **Sociais/culturais:** feriados, festivais, eventos sazonais, modas (afetam consumo).
- **De negócios:** grandes conferências (tech summit, fórum financeiro), demo days, IPO windows, feiras setoriais — janelas de oportunidade e networking.
- **De elite:** galas, leilões, aberturas exclusivas, premiações (acesso gated por reputação — ver [07](07-NPC-AI-ARCHITECTURE.md)).
- **Emergentes:** escândalos (seus ou de rivais), falências de grandes players, fusões históricas — gerados pela simulação e pela mídia-IA.

## 7. Escala, Construção & Pipeline de Mundo

- **Escala-alvo:** uma cidade densa e *vertical* (densidade > extensão de quilômetros vazios). A métrica de sucesso é **densidade de interação por minuto de caminhada**, não km². Benchmark de "sensação de cidade grande viva" comparável aos melhores mundos urbanos AAA.
- **Tecnologia:** **World Partition** (streaming de mundo), **Nanite** (geometria massiva sem custo de detalhe), **Lumen** (iluminação global dinâmica para o ciclo dia/noite), **PCG Framework** (geração procedural de quarteirões, interiores e variação). Detalhes em [10-Tech](10-TECHNICAL-ARCHITECTURE.md).
- **Interiores:** alto índice de prédios com interiores acessíveis (escritórios, lojas, restaurantes, residências), pois a diegese exige caminhar por dentro. Mix de interiores autorais (marcos) + procedurais (variação em massa via PCG).
- **Filosofia de produção:** "kit-bashing" modular + PCG para escala, com "pontos de interesse" autorais para identidade e marcos. Ver pipeline em [10](10-TECHNICAL-ARCHITECTURE.md) e [11-Production](11-PRODUCTION-PLAN.md).

## 8. Mundo como Expansível (gancho de Live Ops)
A estrutura do mundo (regiões modulares de Nova York + JFK como portal) é projetada para **expansão**: novas regiões da cidade, depois **outras capitais reais do dinheiro** — a City de Londres, Tóquio (Marunouchi), São Paulo (Faria Lima), Dubai (DIFC) — como DLC/expansões, sempre com a mesma regra de lugares reais e empresas fictícias (ver [12-Business-Plan](12-BUSINESS-PLAN.md)). A cidade nunca está "terminada".

---

> **Anterior:** [← 03 — Gameplay Design](03-GAMEPLAY-DESIGN.md) · **Próximo:** [05 — Economy & Financial Systems →](05-ECONOMY-DESIGN.md)
