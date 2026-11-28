# Changelog — Bíblia de Pré-Produção (Project ATLAS / MOGUL)

Registro de versões da documentação de pré-produção. Segue versionamento semântico de documento (Major.Minor).

## 2.20.0 — 2026-11-28
- **feat(town): movimento de captura real (mocap).** Andar, andar formal (com terno), trotar, correr, parado, conversando e sentado vêm da **Universal Animation Library**, de Quaternius (CC0), transferidos osso a osso para os personagens realistas (`realMocap`, `models/anim.json`).
  - Andar, trotar e correr são misturados pela velocidade, com a cadência sincronizada à passada (o pé não patina).
  - Quem está sentado (restaurante, escritórios) usa a animação de sentado.
  - **Pernas abertas corrigidas:** o esqueleto de origem tem base larga (pés a ~47 cm). Coxa e canela giram ~7,5° para dentro (`MOCAP_LEG_IN`), o que deixa os pés a ~25 cm parado e os passos sob o quadril, sem inclinar a sola.
  - A animação procedural continua no modelo de longe e como reserva enquanto o arquivo carrega.
- **fix(town): validação item a item do editor.** Uma varredura automática tirou foto de cada opção (12 cortes × 2 gêneros, 7 cores de cabelo, 6 tons de pele, 3 íris, 10 pessoas, rosto e corpo nos extremos, 10 estilos e as cores de roupa, 12 acessórios e joias). Corrigido:
  - **Cabelo:**
    - Couro cabeludo na cor do fio (shader), o que acaba com os "buracos" em raspado, degradê, preso e longo.
    - "Médio" com a franja aparada para não cobrir o olho.
    - "Coque" refeito: cabelo puxado mais o coque na nuca.
    - Cores claras (loiro, grisalho, ruivo) com o tom certo.
  - **Pele:** os 6 tons agora ficam distintos (a textura é levada à cor média escolhida).
  - **Íris:** verde e azul agora aparecem.
  - **Rosto:** maxilar e nariz mais visíveis. Olhos, cílios e sobrancelhas acompanham a largura do rosto e o tamanho dos olhos.
  - **Corpo:** massa, ombros e quadril com efeito visível, sem deformar o pescoço.
  - **Terno:** as cores agora aparecem (antes só a gravata mudava).
  - **Acessórios e joias no realista:** óculos, aviador, boné, chapéu, cachecol, colar de pérolas, brincos, relógios, abotoaduras, anel, bolsa, pasta, bolsa exótica, celular, café e crachá, presos aos ossos.
  - **Prévia do editor:** o rosto passa a ser enquadrado pela cabeça animada.
- **chore:** `sw.js` v37 com cache de modelos v4. Ferramenta em `tools/mocap/` e licença atualizada.

## 2.19.0 — 2026-11-27
- **feat(town): tela Personagem em tela cheia.** Abre sem o menu lateral, com o botão "‹ Voltar".
- **feat(town): editor funciona no modelo realista.** Antes os controles só mexiam no personagem de longe. Agora mexem no realista também:
  - **Pessoa:** automática pelo tom de pele ou uma das 5.
  - **Tom de pele:** ajusta a textura da pele.
  - **Cabelo:** 12 cortes trocáveis (`models/hair/`, CC0) e qualquer cor.
  - **Íris:** castanho, verde ou azul.
  - **Cores da roupa:** camiseta, calça e terno.
  - **Rosto:** largura, maxilar, nariz e olhos viram *morphs* gerados dos targets do MakeHuman.
  - **Corpo:** massa, ombros e quadril.
- **Editor mais enxuto no modo realista:** barba, silhueta, cintura, sobrancelhas e calçado só valiam para o modelo de longe e foram ocultados. Em Acessórios há um aviso de que ainda não aparecem no realista.
- **fix(town): manchas brancas na cintura.** A camiseta atravessava a calça; agora a calça é desenhada por cima (polygon offset).
- **chore:** modelos regenerados com morphs (+~160 KB cada) e 20 malhas de cabelo (~0,3–0,6 MB, baixadas só se usadas). `sw.js` v36, cache de modelos v3. O coque usa a trança (o coque `rehmanpolanski` é AGPL e não foi usado).

## 2.18.1 — 2026-11-27
- **fix(town): pernas dos personagens realistas.** Os modelos vêm em pose "A" (pés afastados), e o andar ficava com as pernas abertas em "V". Agora coxa, canela e pé são alinhados na vertical sob o quadril.
- **fix(town): passada mais curta nos modelos realistas.** A animação foi feita para pernas mais curtas. Os ângulos de perna e braço passam a ser escalados (`realPose`), o que acaba com a "passada de espacate" ao correr.
- **feat(town): roupa padrão de início.** Cada uma das 10 pessoas ganhou a versão **casual** (camiseta, calça de lã e tênis), que é a roupa de início, além da **social** (terno ou tailleur com sapato social ou salto). A versão segue o que você veste: camiseta/casual → casual; terno/tailleur → social. Os NPCs seguem a própria roupa. "Casual" virou "Moderno/Moderna" na lista de modelos.
- **chore:** 20 modelos (~37 MB no total, baixados só quando usados). `sw.js` v35 com cache de modelos v2.

## 2.18.0 — 2026-11-27
- **feat(town): personagens realistas.** 10 modelos 3D (5 homens e 5 mulheres de etnias e idades variadas, com ternos e tailleurs e 2 casuais), gerados com MakeHuman/MPFB a partir de **assets CC0**. Pele com textura, olhos, sobrancelhas, cílios, cabelo, roupa e mãos com dedos.
- **Integração:** modelos em `town/models/`, carregados sob demanda com GLTFLoader e clonados com SkeletonUtils.
  - **Animação:** o esqueleto procedural continua animado e as rotações são transferidas ao rig do modelo (`realPose`). Os braços saem da pose em T alinhando cada segmento ao braço procedural em repouso.
  - **Limite de desempenho:** só as N pessoas mais próximas recebem o modelo (3/6/10 conforme a qualidade). As de longe mantêm o procedural. Medição na Wall St: ~190 draw calls e ~510 mil triângulos na cena inteira, igual a antes.
  - **Variedade de NPCs:** respeita gênero, tom de pele e cabelo grisalho, e prefere terno em Wall Street.
- **feat(town): opções novas.** "Modelo realista" no editor (Automático ou um dos 5) e **Ajustes → Personagens realistas**.
- **chore:** `sw.js` v34 guarda os modelos num cache próprio (não é apagado a cada versão). Ferramenta de geração em `tools/mh/` e licenças em `town/models/LICENSE.md`. CLAUDE.md ganhou a exceção de assets CC0.

## 2.17.0 — 2026-11-27
- **feat(town): rosto procedural novo.** A cabeça deixa de ser uma malha empacotada esticada e passa a ser gerada por seções (`headForm`/`headRows`/`headTint`), lisa e com mais vértices na frente do rosto.
  - **Relevo:** crânio, testa, arco das sobrancelhas, órbitas, maçãs do rosto, nariz (ponte, ponta e asas), lábios, filtro, queixo, mandíbula, pomo de adão e orelhas.
  - **Olhos:** a pele abraça o globo e abre em amêndoa, então aparecem o branco, a íris e os cílios.
  - **Boca e narinas:** traço fino da boca e narinas de perto.
  - **Sombras pintadas:** sob o nariz, sob o lábio, sulcos nasolabiais, cantos dos olhos e sob a sobrancelha.
  - **Gênero e sliders:** masculino e feminino têm formas próprias (mandíbula, pescoço, arco, lábios), e os controles do editor atuam na forma.
- **feat(town): mãos** (palma, dedos e polegar). Braços um pouco mais cheios e alinhados ao ombro; cintura e quadril femininos mais marcados.
- **feat(town): NPCs mais variados:** grisalhos, ombros, olhos e sobrancelhas.
- **fix(town): mancha preta no pescoço.**
  - **Causa:** a gola careca (e o cachecol) estava girada no eixo errado e aparecia em pé, como uma lâmina preta.
  - **Correção:** gola deitada em volta do pescoço, decote fechado com pele e base do pescoço alargada. Óculos e aviador também giravam no eixo errado.
- **fix(town):** linha do cabelo sem dente de serra; sobrancelhas mais finas.

## 2.16.1 — 2026-11-27
- **fix(town): passeios jogáveis.**
  - **Barra compacta:** o cartão grande no topo virou uma barra pequena embaixo, com botões de ícone (💬 conversar, 👁️/🎥 dentro/fora, ⏩ pular). As falas aparecem como legenda e somem sozinhas.
  - **Câmera livre:** dá para arrastar em qualquer direção (inclusive olhar para cima na visão de dentro) e dar zoom com pinça. Ela só volta para a frente depois de 4 s sem mexer.
  - **Balsa:** você anda pelo deque superior aberto com o joystick, entre os passageiros (antes eles ficavam dentro da cabine). Com 💬 você conversa com o mais perto, e a visão de dentro agora é do deque, não de uma parede.
  - **Rydr e helicóptero:** 💬 puxa conversa com o motorista ou o piloto. Sentado, o joystick e o botão de correr somem da tela.

## 2.16.0 — 2026-11-27
- **feat(town): mapa ampliado (98 → 114 linhas).** O grid gerado é esticado por `stretchWorld()`, que insere linhas (`ROW_INS`) e remapeia ruas, marcos, prédios e decoração.
  - **Norte:** 8 linhas novas para a **Vesey St** e a **Ann St**. O **One World Trade Center** foi para o lugar real, entre a Vesey e a Fulton (antes ficava ao sul da Fulton). Onde ele ficava virou a praça do **Memorial 9/11**, com carvalhos.
  - **Entre a Fulton e a Maiden Ln:** 8 linhas novas para a **John St**, que vai da Broadway ao East River.
  - A proporção do trecho norte ficou mais próxima da real: Fulton → Maiden passou de 9 para 17 linhas.
- **Dados reais recalibrados:** thin-plate spline com 70 cruzamentos (incluindo Vesey, Ann e John), 484 prédios do NYC Open Data no grid novo.
- **Saves:** o formato do mapa passa a ser `fidi2`. Saves `fidi` (e os antigos `wallstreet`) são migrados ao carregar: empresas, concorrentes, posição do herói e locais da agenda descem junto com as linhas inseridas.
- **Coordenadas fixas ajustadas:** heliporto, faixas da FDR, Estátua da Liberdade, caminhos do cemitério da Trinity e do Bowling Green. Esses caminhos também estavam desenhados no lugar errado desde a ampliação anterior.

## 2.15.0 — 2026-11-27
- **feat(town): Wall Street com volumetria real.**
  - **Altura e época de cada prédio** vêm do NYC Open Data (581 pegadas, com altura do telhado e ano de construção).
  - **Posição no grid:** uma deformação thin-plate spline, calibrada em 57 cruzamentos reais do OpenStreetMap (ODbL), coloca cada pegada no lugar certo. Os marcos já existentes caem a ~1–3 tiles da posição real.
  - **Estilo pela época:** pré-guerra, art déco, vidro ou sobrado.
  - **Números:** a mediana passou de 23 para 25 andares, e o máximo de 49 para 72 (perto de One Liberty Plaza e 28 Liberty).
- **feat(town): ruas reais que faltavam.**
  - **New St:** calçadão nos fundos da Bolsa; o 1 Wall ficou com 4 tiles de largura.
  - **Stone St:** calçadão de pedras com sobrados do séc. XIX, mesas e guarda-sóis. O restaurante do jogo mudou para lá.
- **feat(town): estátua de bronze da menina** em frente à Bolsa, olhando para a fachada (lá desde 2018).
- **feat(town): distrito mais denso.** Longe do centro, a chance de prédio por lote subiu, e os terrenos vazios caíram de 1214 para 769 tiles. Os terrenos da fase 1 perto da Bolsa ficaram iguais.
- **docs:** atribuição dos dados em "Como jogar" e no README.
- **Ficou para as próximas etapas** (pede ampliar o grid e migrar os saves): John St, Hanover St e a posição exata do 1 WTC ao norte da Fulton.

## 2.14.0 — 2026-11-27
- **feat(town): menu de servidores.** A tela inicial passa a ser a escolha de cidade, com o fundo 3D atrás e 1 cartão por servidor.
  - **Wall Street · Nova York:** aberto; mostra quantos jogadores estão online, data, caixa, fase e o próximo compromisso, com o botão Jogar/Continuar.
  - **Balneário Camboriú · SC:** visível e bloqueado ("🔒 EM BREVE"), com o botão "🔔 Avise-me quando abrir".
  - Atalhos em barra no rodapé: Novo jogo, Personagem, Amigos, Indicadores, Ajustes e Como jogar. Nas páginas internas, a lateral ganhou o botão "Servidores".
- **feat(backend): um save por servidor.** `saves` ganhou a coluna `server` (padrão `wallstreet`), e a chave primária passa a ser `(user_id, server)`.
  - O personagem (visual, nome, roupas) é o mesmo em todas as cidades, mas cada servidor tem uma vida própria que começa do zero.
  - Os saves existentes foram marcados como Wall Street.

## 2.13.0 — 2026-11-27
- **feat(town): câmera de dentro nos passeios** (`insideCam`). Painel e volante no Rydr, console na cabine do helicóptero e olhar do convés na balsa. Dá para olhar em volta arrastando.
- **feat(town): vida nos trajetos.**
  - O motorista do Rydr fala a cada 10–15 s: a rua atual, a ação que mais sobe e a que mais cai, os juros e o ciclo da economia.
  - O piloto anuncia os marcos ao passar perto, de que lado estão e o primeiro fato do texto de cada um.
  - A balsa leva 9 passageiros no convés, com falas.
- **feat(town): pôr do sol.**
  - **Voo ao pôr do sol:** rota a oeste sobre o Hudson, das 17:20 às 19:45.
  - **Balsa ao entardecer:** recompensa maior.
- **feat(town): portas que abrem de verdade.**
  - **Entrada:** o herói caminha até a porta, as folhas de vidro deslizam e ele entra.
  - **Saída:** a porta abre, o herói sai para a calçada e a porta fecha.

## 2.12.0 — 2026-11-27
- **feat(town): passeios em 3D.** O motor `RIDE` percorre o trajeto com aceleração e frenagem, e a câmera segue o veículo (`CAMFOLLOW`). O tempo do jogo passa proporcionalmente, e dá para pular.
  - **Rydr:** rota pelas faixas; reduz nas curvas e freia para carros à frente.
  - **Helicóptero:** curva Catmull-Rom com inclinação nas curvas e rotor girando. Voo panorâmico com volta à plataforma ou voo particular com pouso em outro heliponto.
  - **Balsa:** laranja, com o herói no convés, passando perto da Estátua da Liberdade (modelo novo na baía).
  - **Elevador:** cabine de aço com espelho, corrimão, portas que abrem e fecham, painel com contagem de andares e "ding".
  - **Portas:** transição escura ao entrar da rua e ao sair.
- **feat(town): logos originais** das 21 ações e do fundo, no home broker e na carteira do banco.
- **fix(town):** o botão Heliponto do elevador era confundido com "seu apartamento" (código começando com "h"). Agora funciona.

## 2.11.0 — 2026-11-27
- **feat(town): datas de calendário** em vez de "Dia N": HUD, celular, agenda, mensagens, notícias, contatos, propostas, extrato e menu. O dia 1 é a data em que o jogador começou; saves antigos contam para trás a partir de hoje.
- **feat(town): celular como central de apps.**
  - **Banco J.P. Halloway & Co.:** fictício, decisão do dono do projeto para manter as marcas fictícias do CLAUDE.md. Tem aba de investimentos e corretora própria (0,05% por ordem).
  - **Rydr no lugar do táxi:** categorias, tarifa dinâmica, motorista e avaliação.
- **feat(town): 9 novas ações** fictícias inspiradas em empresas famosas. Saves antigos recebem o histórico de preços das novas.
- **feat(town): trava do analógico** em qualquer direção, invisível até o dedo passar da borda.
- **fix(town): fachadas livres.** As escadas de incêndio foram para os fundos, e postes, árvores de calçada e placas saíram da frente das entradas.

## 2.10.0 — 2026-11-27
- **feat(town): app do banco.**
  - **Abas:** Saldo, Extrato, Futuros e Crédito.
  - **Extrato automático (`S.ledger`):** o caixa passa a ser observado e cada mudança vira lançamento. O rótulo vem de `tx()` nos pontos principais (freela, salário, empréstimo, táxi, presentes, fundação de empresa, comida) ou do título da janela aberta na compra.
  - **Fechamento do dia detalhado (`bankDay`):** mesmo total que a economia (`sim-town` igual). Fora do jogo, a simulação usa o caminho original.
  - **Lançamentos futuros:** com projeção de 7 dias.

## 2.9.0 — 2026-11-27
- **feat(town): interiores vivos.**
  - **Acabamento comum (`roomTrim`):** rodapé, sanca, quadros procedurais e relógio que marca a hora do jogo.
  - **Janelas:** skyline noturno com janelas acesas depois das 19h.
  - **Sentar (`sitSpots`):** pose sentada do herói e descanso de cerca de ⚡+6 por minuto real, até 100.
  - **Telas vivas:** fita de cotações reaproveitada fora da Bolsa e TV com as manchetes do feed.
  - **Horário de funcionamento (`HOURS`):** com aviso de "Fechado agora".
  - **Movimento por hora (`busy`):** no restaurante, lounge, comércio, Bolsa, andares de escritório, museu e igreja.
  - **Interações novas:**
    - Em casa: TV, cozinha, banho (+5 de estilo no dia) e janela.
    - Empresa: painel de KPIs.
    - Restaurante: almoço com contato (relação +8, $45).
    - Banco: caixa eletrônico.
    - Museu: 4 exposições com fatos verificados.
    - Igreja: vela.
    - Loja de roupas: espelho.
    - Comércio: prateleiras.

## 2.8.0 — 2026-11-27
- **feat(town): moradia por prédio e andar; fim da "sede".**
  - **Sede:** o prédio de sede saiu do mapa (vira só um ponto de referência interno). Freelas, cursos e metas foram para o home office da casa.
  - **Prédios:** cada nível de casa tem um prédio residencial (`RESID`).
  - **Andares:** cada jogador recebe um andar exclusivo. A tabela `residences` tem `unique(tier,floor)` e a RPC `claim_residence` dá o menor andar livre da faixa do prédio. Testado com PGlite.
  - **Elevador:** mostra o seu apartamento e o dos amigos (visita, com espaço compartilhado por andar). Os outros moradores ficam como "particulares".
  - "Loft em Tribeca" passa a se chamar "Loft de tijolinho".
- **feat(town): caminhada no celular.**
  - Velocidade de 0,95–1,85 m/s (antes 0,75–1,55).
  - Trava do analógico 🔒: arrastar para cima além da borda.
  - Desvio por ângulos laterais. A multidão dá um passo para o lado e, se só houver gente bloqueando, o personagem passa após 0,3 s.
- **balance:** o dia de jogo passa a durar 15 min reais (antes 10).

## 2.7.1 — 2026-11-27
- **feat(town): avisos de amigos e "onde está".** Aviso quando um amigo entra ou sai, com "📍 Ir até lá" (GPS até a rua ou a porta do prédio) e 💬, e resumo ao abrir o jogo. A posição em tempo real passa a levar o nome do lugar e a porta do prédio.
- **feat(town): Contatos e Amigos separados no celular.** 📇 Contatos é a rede de network (NPCs): relação, último encontro, ligar e onde está. 👥 Amigos são os jogadores: onde estão, "visto por último" (coluna `players.last_seen`, atualizada a cada 60 s e ao sair) e conversas.

## 2.7.0 — 2026-11-27
- **feat(town): jogadores se encontram no mapa.** Antes o jogo só sabia quem estava online, sem posição nem avatar.
  - **Encontro:** posição por broadcast (até 4/s e só quando há movimento, mais um sinal de vida a cada 4 s). Visual pela presença. Os outros jogadores são desenhados com interpolação, animação, placa de nome e "espaço" (a rua ou o mesmo interior e andar). Quem está dirigindo aparece como carro.
  - **Interações:** acenar, pagar café/drink, dar dinheiro ou roupa e adicionar aos contatos.
  - **Celular:** aba Contatos e chat privado persistente, com não lidas e aviso na hora.
  - **Backend:** tabelas `dms` e `gifts` com RLS, RPCs `send_gift` (limite de $10 mil por envio e $25 mil por dia, sem autopresente) e `claim_gifts` (resgate atômico). Testado com PGlite e com dois navegadores simultâneos.

## 2.6.0 — 2026-11-27
- **feat(town): Distrito Financeiro ampliado (etapa 1).** O mapa passa de 72×48 para 104×98. O núcleo original foi deslocado (OX=30, OY=36) sem mudar nenhum quarteirão.
  - **Ruas reais:** West St, Greenwich, Church St/Trinity Pl, Fulton (calçadão do Seaport), Maiden Ln, Liberty, Cedar, Rector e State St. Rio Hudson, Upper Bay e Battery Park.
  - **Novos marcos** (fatos verificados): One World Trade Center (torre com elevador), Memorial 9/11, Oculus, St. Paul's Chapel (interior de igreja), Zuccotti Park, Castle Clinton, terminal da balsa (passeio grátis) e Pier 17 (salão).
  - **Quarteirões:** cerca de 60 novos prédios de enchimento, todos com interior (comércios, torres e residenciais).
  - **Desbloqueio:** novas áreas na fase 4 (raio 30) e na fase 5.
  - **Entorno:** Manhattan ao norte, Brooklyn e Jersey City ao fundo. A torre de vidro fictícia do entorno saiu (agora é o 1 WTC de verdade).
  - **Save:** saves `wallstreet` são migrados (sede, empresas, concorrentes, herói e compromissos deslocados). O novo formato é `fidi`.
  - **Trânsito:** cruzamentos em T com a vez de quem chegou antes. A conversão à esquerda bloqueia o cruzamento enquanto acontece, e ninguém para dentro do cruzamento. Teste com 50 veículos: 0 batidas e 0 presos.

## 2.5.0 — 2026-11-27
- **feat(town): entrar nos prédios (etapa 3).** Todos os marcos têm interior.
  - **Torres:** saguão, elevador com painel e animação de andares, escritórios e lajes por andar, Sky Lounge na cobertura com código de vestimenta (estilo 30+).
  - **Residencial (70 Pine):** apartamento modelo e cobertura à venda, com hora marcada a partir de $1M de patrimônio.
  - **Salões:** de eventos (55 Wall), do banco (23 Wall), museu (Federal Hall) e igreja (Trinity).
  - **Comércios de rua:** 6 no térreo dos marcos, com atendentes e itens que mexem em energia, habilidades e reputação.
  - **Helipontos:** no topo real do 1 Wall St (heliponto fictício) e no píer do East River. Voo panorâmico ($450) e voo particular ($2.500).
  - **Mapa:** nova camada "Comércios e helipontos".
- **fix(town):** "Novo jogo" voltou a zerar empresas, concorrentes e contatos. Um comentário engolia essa linha.

## 2.4.0 — 2026-11-27
- **feat(town): trânsito com regras.** Rede de faixas por sentido, com a mão direita corrigida nas ruas horizontais de mão dupla (estava invertida) e cruzamentos detectados também onde a rua termina na outra.
  - **Veículos:** curvas suaves (Bézier) em vez de pulo de faixa; os longos abrem mais a curva. Semáforo com **amarelo** e regra de decisão no amarelo. Parada antes da faixa. Distância do veículo da frente, inclusive de quem cruza. Não bloqueiam o cruzamento. Conversão à esquerda espera quem vem de frente, e na curva dupla cada um vai para a sua faixa. **Setas** piscando. **Motos** com piloto.
  - **Pedestres:** atravessam na faixa, só com o sinal.
  - **Táxi, corrida e GPS de carro:** rota pelas faixas (fim do zigue-zague em escadinha).
  - **Teste:** 50 veículos por 5 minutos de jogo, com 0 batidas, 0 sinais vermelhos furados, 0 contramão e 0 carros presos.

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
