# CLAUDE.md — Guia do Projeto para instâncias do Claude

> Este arquivo faz parte do clone do repositório. Qualquer sessão do Claude Code (de qualquer
> colaborador) que abrir este projeto deve ler e seguir o que está aqui, para mantermos
> consistência entre contas/sessões diferentes.

## O que é este projeto

**Auvra Club** (codinome interno *Project ATLAS*; nomes antigos “MOGUL”, “Business Simulator” e a cidade fictícia “Meridian” estão aposentados) — um simulador de vida empresarial em mundo aberto, ambientado em **Nova York, começando em Wall Street**. O repositório contém **duas coisas**:

1. **A bíblia de design** (`docs/`) — especificação de pré-produção completa (13 documentos + glossário).
2. **O jogo** (`town/`) — Wall Street em 3D, terceira pessoa, celular na horizontal, multiplayer via Supabase. Publicado na Vercel ([auvraclub.vercel.app](https://auvraclub.vercel.app)); a raiz `index.html` redireciona para `town/`. Ver `town/README.md`.

> Versões antigas (o distrito 2D, o protótipo 3D `world/`, o simulador `game/` e o scaffold UE5 `ue5/`) foram **removidas** em nov/2026 — continuam só no histórico do git. A Unreal Engine 5.6 segue como o *plano* de produção AAA da bíblia ([docs/10](docs/10-TECHNICAL-ARCHITECTURE.md), [docs/11](docs/11-PRODUCTION-PLAN.md)), não como código neste repositório.

> A fonte canônica de fatos (nome, escopo, orçamento, plataformas) é o topo do [`README.md`](README.md).
> Mudou um fato lá → propague para os documentos afetados.

## Estrutura

```
README.md              Índice mestre + fatos canônicos
index.html             Redireciona para town/ (deploy na Vercel, estático, sem build)
town/                  O JOGO: Wall Street 3D + multiplayer + PWA (+ town/README.md)
supabase/schema.sql    Backend multiplayer: tabelas, RLS e RPCs (aplicar no SQL Editor)
tools/sim-town.js      Simulação headless permanente da economia do town/
docs/00..13            A bíblia (visão, mercado, gameplay, mundo, economia, negócios,
                       IA, ativos, UX, técnica, produção, plano de negócio, direção de arte)
docs/GLOSSARY.md       Termos canônicos · docs/CHANGELOG.md  histórico de decisões
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
- **O jogo:** manter **single-file, sem build, sem dependências locais**. Exceções via CDN (versão fixada, cacheadas pelo `sw.js`, com tela de erro + "Tentar de novo" se não carregarem): Three.js (`three` + `three/addons`) e `@supabase/supabase-js` (sem ele o jogo roda offline com save local).
  - **Exceção de assets:** `town/models/*.glb` (personagens realistas). São gerados com MakeHuman/MPFB a partir de assets **CC0** (`tools/mh/`, licenças em `town/models/LICENSE.md`) e carregados sob demanda. Se não carregarem, o jogo usa o personagem procedural. Nada de assets com licença não-livre.
- **Multiplayer:** escrita só no que é do próprio jogador (RLS); transferência entre jogadores só via RPC em `supabase/schema.sql`. Qualquer texto vindo de outro jogador (nome, chat, empresa) passa por `esc()` antes de ir para `innerHTML`.
- **Economia é data-driven e balanceada por simulação** — ver "Validação" abaixo.
- **Mundo = Nova York real, começando em Wall Street.** Ruas, marcos e arquitetura fiéis (quarteirões comprimidos); **empresas, bancos-NPC e marcas sempre fictícios** — nunca um logo/nome de empresa real em fachada, letreiro ou economia. Fatos históricos dos marcos só se verificados. Ver [docs/04](docs/04-WORLD-DESIGN.md) §1.

## Validação antes de commit/push (OBRIGATÓRIO para mudanças no jogo)

Não faça push do jogo sem validar. O padrão usado neste repo:

1. **Sintaxe:** extrair o `<script type="module">` do HTML, salvar como `.mjs` e rodar `node --check` (e `node --check town/sw.js`).
2. **Economia headless:** `node tools/sim-town.js 200 700` (extrai o bloco entre `/*@ECON-BEGIN*/` e `/*@ECON-END*/`):
   (a) não lança exceção, (b) progride pelas 5 fases, (c) falência é possível mas não garantida.
3. **UI smoke test:** Playwright com celular emulado **na horizontal** (Chromium com `--use-angle=swiftshader`): carregar, menu/personagem, jogar, freela, construir, painéis, 4×, recarregar/continuar — sem erros de console.

> `tools/sim-town.js` é o harness **permanente** (versionado). Demais testes pontuais (smoke de UI com
> Playwright, testes de SQL com PGlite) vão no scratchpad da sessão — **nunca** comite testes temporários.
4. **Backend:** mudou `supabase/schema.sql`? Teste RLS/RPC (ex.: PGlite com `auth.uid()` stubado) antes do push.

## Git / colaboração

- **Branch por contribuidor/tarefa.** Não trabalhar direto na default branch. Ver [CONTRIBUTING.md](CONTRIBUTING.md).
- **Commits descritivos** (pt-BR ok), escopo com prefixo: `docs:`, `feat(town):`, `fix:`, `chore:`.
- **Não criar PR sem o usuário pedir.** Integração é por PR + review.
- **Não** comitar segredos, arquivos temporários, ou `node_modules`.

## Não-objetivos (evite)

- Nada de **pay-to-win** no design de monetização ([docs/12](docs/12-BUSINESS-PLAN.md)).
- Não transformar o jogo em app com build/toolchain pesado — manter abrível com 1 clique.
- Não prometer "o jogo AAA pronto": o que roda hoje é o jogo web (Three.js); o AAA em UE5.6 é o plano de produção de ~6 anos do [docs/11](docs/11-PRODUCTION-PLAN.md). Entregar **camada por camada**, com honestidade de escopo.
