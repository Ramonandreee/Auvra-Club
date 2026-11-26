# Roadmap do Auvra Club no navegador

A versão web concentra Wall Street, o loop de fundação e operação de empresas e o multiplayer
assíncrono em um jogo estático. A economia tem simulação automatizada. O navegador usa Three.js
e o Supabase cuida de presença, chat, ranking, saves e ofertas. A pré-produção em Unreal Engine
tem seu [plano de produção](11-PRODUCTION-PLAN.md). Este roadmap acompanha o jogo publicado.

| Prioridade | Evolução | Critério para avançar |
| --- | --- | --- |
| 1 | **Personagens, interface e desempenho.** Ajustar olhos, mãos, caimento e contato dos pés com o chão. Medir o editor e Wall Street em um iPhone físico. Guardar amostras de frame time, memória e tempos de carregamento. | 30 FPS sustentados no aparelho de referência na qualidade média, com perfil de três minutos e travessia de áreas densas. |
| 2 | **Cidade, arquitetura e ambientes.** Refinar iluminação, fachadas, calçadas e elementos de rua. Abrir a sede, um café e um escritório como primeiros interiores ligados ao loop. | Os três interiores funcionam com toque, navegação e retorno à rua. O distrito mantém o orçamento definido na etapa 1. |
| 3 | **Veículos e rotas.** Começar com uma corrida de táxi ligada a um compromisso comercial. Adicionar embarque e desembarque aos pontos da rua antes de considerar direção livre. | A corrida salva o destino e devolve o controle do jogador em um ponto acessível. |
| 4 | **Negócios e construção.** Tornar contratação, capacidade, preços e demanda visíveis no prédio e na equipe. Fazer um setor completo servir de referência para os demais. | O jogador entende o efeito de contratar ou expandir. Os bots continuam alcançando as cinco fases. |
| 5 | **Mercado financeiro e economia dinâmica.** Dar visibilidade a juros, demanda setorial e resultados das empresas listadas. Simular choques que alteram crédito e decisões de expansão. | Cada choque gera resultados verificáveis no caixa e na simulação de várias partidas. |
| 6 | **NPCs e multiplayer.** Dar agenda, memória e objetivos aos contatos com regras locais. Adicionar testes com duas sessões para ofertas, save em nuvem e retomada após queda. | A história do contato persiste, e uma operação entre jogadores tem o mesmo resultado após reconexão. |
| 7 | **Progressão patrimonial, imóveis e luxo.** Transformar os primeiros imóveis, escritórios e ativos aspiracionais em escolhas com custo de manutenção e efeitos sociais. | Os bens aparecem no mundo, afetam o patrimônio e criam decisões ao longo das fases. |

A primeira rodada usa os serviços e ferramentas gratuitos já disponíveis. A medição da etapa 1
define o espaço para aumentar densidade de NPCs, texturas, interiores e tráfego no WebGL.
