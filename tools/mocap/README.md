# Movimento dos personagens realistas (captura de movimento → `town/models/anim.json`)

Fonte: **Universal Animation Library [Standard]**, de Quaternius, sob licença **CC0** (domínio público).
Download: opengameart.org/content/universal-animation-library (arquivo `universal_animation_librarystandard.zip`).

## Como regenerar
1. Copie `Godot/AnimationLibrary_Godot_Standard.glb` do pacote para esta pasta.
2. Sirva a raiz do repositório (`python3 -m http.server`) e abra `tools/mocap/extract.html`.
3. Salve `window.OUT` como `town/models/anim.json` (por exemplo, via Playwright: `JSON.stringify(await page.evaluate(() => window.OUT))`).

## O que o arquivo contém
- **Clipes:** `Idle_Loop`, `Walk_Loop`, `Walk_Formal_Loop`, `Jog_Fwd_Loop`, `Sprint_Loop`, `Idle_Talking_Loop`, `Sitting_Idle_Loop` e `Driving_Loop`.
- **Amostragem:** a 30 quadros/s, a **rotação de mundo** de cada osso de origem (quaternions em Int16, base64), mais a posição do quadril.
- **Repouso:** a rotação e a posição de cada osso de origem.

## Transferência no jogo (`realMocap`)
1. Para cada modelo, o jogo calcula por osso `Q = Ss⁻¹·A·St`:
   - `Ss` é a rotação do osso de origem em repouso.
   - `St` é a rotação do nosso osso em repouso.
   - `A` alinha a direção do nosso osso (até o filho) à direção do osso de origem.
2. A cada quadro, a rotação de mundo do nosso osso é `S(t)·Q`, convertida para rotação local.
3. Andar, trotar e correr são misturados pela velocidade. A cadência acompanha a velocidade natural de cada ciclo (`MOCAP_NAT`), para o pé não patinar.
