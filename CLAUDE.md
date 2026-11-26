# CLAUDE.md — Guia do Projeto para instâncias do Claude

> Este arquivo faz parte do clone do repositório. Qualquer sessão do Claude Code (de qualquer
> colaborador) que abrir este projeto deve ler e seguir o que está aqui, para mantermos
> consistência entre contas/sessões diferentes.

## O que é este projeto

**Auvra Club** (codinome interno *Project ATLAS*; nomes antigos “MOGUL” e “Business Simulator” estão aposentados — `MOGUL` sobrevive só como identificador do módulo C++ em `ue5/`) — um simulador de vida empresarial em mundo aberto de
ambição AAA. O repositório contém **duas coisas**:

1. **A bíblia de design** (`docs/`) — especificação de pré-produção completa (13 documentos + glossário).
2. **Protótipos jogáveis** — provas de conceito que rodam no navegador (publicados na Vercel a partir do `index.html` da raiz):
   - `town/index.html` — **O JOGO**: Wall Street em 3D, terceira pessoa, celular na horizontal + multiplayer (Supabase). A raiz `index.html` redireciona para cá. Ver `town/README.md`.
   - `world/index.html` — Meridian City em 3D (Three.js via CDN) — *referência, single-player*.
   - `game/index.html` — protótipo de sistemas 2D (offline) — *referência, single-player*.

> A fonte canônica de fatos (nome, escopo, orçamento, plataformas) é o topo do [`README.md`](README.md).
> Mudou um fato lá → propague para os documentos afetados.

## Estrutura

```
README.md              Índice mestre + fatos canônicos
index.html             Redireciona para town/ (deploy na Vercel, estático, sem build)
town/                  O JOGO: Wall Street 3D + multiplayer + PWA (+ town/README.md)
supabase/schema.sql    Backend multiplayer: tabelas, RLS e RPCs (aplicar no SQL Editor)
tools/sim-town.js      Simulação headless permanente da economia do town/
docs/00..12            A bíblia (visão, mercado, gameplay, mundo, economia, negócios,
                       IA, ativos, UX, técnica, produção, plano de negócio)
docs/GLOSSARY.md       Termos canônicos
game/                  Protótipo 2D de sistemas (+ game/README.md)
world/                 Mundo 3D navegável (+ world/README.md)
CONTRIBUTING.md        Como colaborar (humanos + IA, via GitHub/PRs)
```

## Princípios de design que governam TODA decisão

1. **Pillar Gate** (ver [docs/01](docs/01-PRODUCT-VISION.md) §5): toda feature/conteúdo precisa
   responder *"isso faz o jogador sentir que está construindo um império?"*. Se não, corta.
2. **Diegese (Pilar I):** nada de "planilha gamificada". Ações importantes são *vividas*, não viram menu cru.
3. **O mundo reage (Pilar II):** economia + agentes vivem com ou sem o jogador; ações têm consequência persistente.
4. **Da sobrevivência ao legado (Pilar III):** sempre há um próximo degrau aspiracional.
5. **Bússola:** Fantasia > Realismo · Consequência > Conveniência · Sistemas > Scripts · Legibilidade > Profundidade oculta · Visível > Abstrato.

## Convenções

- **Idioma:** documentação e textos de jogo em **PT-BR**; termos técnicos de indústria em inglês quando for o padrão. Código/comentários técnicos podem ser em inglês.
- **Protótipos:** manter **single-file, sem build, sem dependências**. Exceções via CDN (versão fixada, sempre com fallback offline): Three.js (3D e o "assar" de sprites do town) e `@supabase/supabase-js` (multiplayer do town — sem ele o jogo roda offline com save local).
- **Multiplayer:** escrita só no que é do próprio jogador (RLS); transferência entre jogadores só via RPC em `supabase/schema.sql`. Qualquer texto vindo de outro jogador (nome, chat, empresa) passa por `esc()` antes de ir para `innerHTML`.
- **Economia é data-driven e balanceada por simulação** — ver "Validação" abaixo.

## Validação antes de commit/push (OBRIGATÓRIO para mudanças nos protótipos)

Não faça push de protótipo sem validar. O padrão usado neste repo:

1. **Sintaxe:** extrair o `<script>` do HTML e rodar `node --check` (para o 3D, salvar como `.mjs`).
2. **Economia headless:** no `town/`, rode `node tools/sim-town.js 200 700` (extrai o bloco entre `/*@ECON-BEGIN*/` e `/*@ECON-END*/`). Nos outros protótipos: extrair a lógica de economia, stubar `document`/`localStorage`, e rodar
   centenas de "dias" simulados verificando que (a) não lança exceção, (b) progride pelas 5 fases,
   (c) falência é possível mas não garantida (sobrevivência tensa, justa).
3. **UI smoke test:** stubar o DOM e exercitar render/modais/eventos/game-over sem lançar.

> `tools/sim-town.js` é o harness **permanente** (versionado). Demais testes pontuais (smoke de UI com
> Playwright, testes de SQL com PGlite) vão no scratchpad da sessão — **nunca** comite testes temporários.
4. **Backend:** mudou `supabase/schema.sql`? Teste RLS/RPC (ex.: PGlite com `auth.uid()` stubado) antes do push.

## Git / colaboração

- **Branch por contribuidor/tarefa.** Não trabalhar direto na default branch. Ver [CONTRIBUTING.md](CONTRIBUTING.md).
- **Commits descritivos** (pt-BR ok), escopo com prefixo: `docs:`, `feat(game):`, `feat(world):`, `fix:`.
- **Não criar PR sem o usuário pedir.** Integração é por PR + review.
- **Não** comitar segredos, arquivos temporários, ou `node_modules`.

## Não-objetivos (evite)

- Nada de **pay-to-win** no design de monetização ([docs/12](docs/12-BUSINESS-PLAN.md)).
- Não transformar os protótipos em apps com build/toolchain pesado — manter abríveis com 1 clique.
- Não prometer "o jogo AAA pronto": o build final em UE5.6 é a produção de ~6 anos do [docs/11](docs/11-PRODUCTION-PLAN.md). Entregar **camada por camada**, com honestidade de escopo.
