# Gerador de personagens realistas (MakeHuman → GLB)

Gera os modelos de `town/models/` a partir de `cast.json`. Não roda no jogo: é uma ferramenta de produção.

1. Baixe o **Blender 4.2 LTS** (blender.org) e o **MPFB 2** (`files.makehumancommunity.org/plugins/mpfb2-latest.zip`).
2. Instale o MPFB: `blender --command extension install-file -r user_default -e mpfb2-latest.zip`.
3. Baixe os pacotes **_cc0** de `files.makehumancommunity.org/asset_packs/<pacote>/<pacote>_cc0.zip` e descompacte em
   `~/.config/blender/4.2/extensions/.user/user_default/mpfb/data/`.
4. Para cada personagem do `cast.json`:
   `blender -b --python gen.py -- '<json do personagem com "out": "caminho/m1.glb">'`

O `gen.py`:
- monta o corpo (macros de gênero/idade/peso/etnia), a pele e as roupas;
- aplica o rig `game_engine`;
- simplifica roupas, sapatos e cabelo;
- reduz as texturas (pele 1024 px, resto 512 px) e exporta GLB (JPEG para materiais opacos).

Use **apenas** assets CC0 e atualize `town/models/LICENSE.md`.
