<!-- Auvra Club / Project ATLAS — template de Pull Request -->

## O que muda
<!-- Resumo objetivo da mudança. -->

## Tipo
- [ ] `docs:` documentação / bíblia de design
- [ ] `feat(town):` o jogo (Wall Street 3D)
- [ ] `chore:` manutenção / infraestrutura
- [ ] `fix:` correção
- [ ] outro: ___

## Pillar Gate
> *"Isso faz o jogador sentir que está construindo um império?"* — explique como esta mudança serve a visão.

- Pilar(es) servido(s): <!-- I (Diegese) / II (Mundo reage) / III (Sobrevivência→Legado) -->
- Como se manifesta para o jogador:

## Validação (obrigatório p/ mudanças em `town/` ou `supabase/`)
- [ ] Sintaxe verificada (`node --check` no módulo `.mjs` e no `sw.js`)
- [ ] Economia rodada headless: `node tools/sim-town.js 200 700` (sem exceções; progride pelas fases; falência possível, não garantida)
- [ ] UI smoke test (Playwright, celular emulado na horizontal, sem erros de console)
- [ ] Backend: RLS/RPC testados (se mudou `supabase/schema.sql`)
- [ ] Testado num celular de verdade <!-- e prints, se for UI -->
- [ ] N/A (mudança só de documentação)

## Notas
<!-- Decisões, trade-offs, follow-ups, ou pontos para o review. -->

## Checklist
- [ ] Trabalhei numa branch própria (não na default)
- [ ] Segui [CLAUDE.md](../CLAUDE.md) e [CONTRIBUTING.md](../CONTRIBUTING.md)
- [ ] Não comitei segredos nem arquivos temporários
- [ ] Atualizei docs/README se mudei fatos canônicos
