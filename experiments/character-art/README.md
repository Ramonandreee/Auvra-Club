# Personagens v3 — proposta de integração
A primeira entrega é um protótipo isolado de geometria, não uma substituição do jogo publicado. Preserva os ossos existentes e o formato de atributos da malha. O módulo character-shapes.mjs não é carregado pelo jogo.
 
## Integração
Na função personGeometry, experimentar a substituição das peças de cabeça, tronco e membros pelas funções do módulo, mantendo paint, skinIndex, skinWeight e mergeGeometries. As coordenadas são locais; aplicar xf conforme os pivôs existentes. Para manter o jogo single-file, incorporar as funções ao script principal após aprovação.
 
## Critérios de aceite
- Conferir rosto de frente, perfil e costas, nos dois biotipos e seis tons de pele.
- Conferir clipping de cabelo, roupa, joelhos e cotovelos durante caminhada e corrida.
- Manter uma malha skinned por personagem e comparar triângulos e FPS com a versão atual em iPhone.
- Executar node --check, node tools/sim-town.js 200 700 e smoke Playwright em paisagem antes de integrar.
- Nenhuma dependência nova, nenhum asset pago. Geometria procedural não equivale a um personagem escaneado ou MetaHuman.
