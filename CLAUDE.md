# CLAUDE.md

Guia para trabalhar neste repositório (portfolio pessoal de Alan Lins).

## Fonte de verdade do conteúdo

- **Dados estruturados não-textuais** (empresas, períodos, localização,
  contato, tags de skills) vivem em [src/data/profile.ts](src/data/profile.ts).
- **Todo texto visível** (labels de UI, bullets de experiência, resumo,
  formação) vive em [src/i18n/pt-BR.json](src/i18n/pt-BR.json),
  [en-US.json](src/i18n/en-US.json) e [es-ES.json](src/i18n/es-ES.json) — as
  três chaves devem ficar sempre em paridade (isso é verificado por
  [src/i18n/i18n.test.ts](src/i18n/i18n.test.ts)).
- Não adicione métricas, números de impacto ou fatos novos sem confirmação
  do usuário — o conteúdo profissional vem de `Portfolio/como_ficou_apos_ajuste.pdf`
  e nada além disso deve ser inventado (ver placeholders explícitos abaixo).

## Adicionar/editar um idioma

1. Edite as três chaves em `src/i18n/*.json` mantendo a mesma estrutura de
   chaves aninhadas (o teste de paridade falha se uma chave faltar).
2. Se for um idioma novo, adicione o código em `supportedLanguages` em
   [src/i18n/index.ts](src/i18n/index.ts), crie o JSON correspondente, e
   adicione o label no `LANGUAGE_LABELS` de [src/components/Header.tsx](src/components/Header.tsx).
3. Regenere os PDFs (`python scripts/generate_cv.py`) — o script lê os
   mesmos JSONs, então qualquer texto novo já aparece no currículo também.
   Se for um idioma novo, adicione as tabelas `SKILL_GROUPS`,
   `LANGUAGES_SKILL` e `SECTION_LABELS` em [scripts/generate_cv.py](scripts/generate_cv.py).

## Regenerar os currículos em PDF

```bash
pip install reportlab
python scripts/generate_cv.py
```

Sobrescreve `public/cv/cv-pt-BR.pdf`, `cv-en-US.pdf` e `cv-es-ES.pdf`. Rode
sempre que o resumo profissional, a experiência ou a formação mudarem em
`src/i18n/*.json`.

## Adicionar projetos reais ao Portfolio

A seção Portfolio (`src/components/Portfolio.tsx`) hoje mostra 3 placeholders
vindos de `portfolioPlaceholders` em `src/data/profile.ts`. Para substituir
por projetos reais:

1. Defina uma interface com os campos que cada card precisa (nome, descrição,
   stack, link, imagem) e substitua `portfolioPlaceholders` por uma lista real
   em `src/data/profile.ts`.
2. Adicione as traduções de nome/descrição de cada projeto nos 3 arquivos de
   i18n (ou mantenha nomes de projeto sem tradução, se fizer mais sentido).
3. Atualize `Portfolio.tsx` para renderizar link/imagem/stack em vez do
   placeholder "Em breve".

## Tema claro/escuro

Implementado com Tailwind v4 (`@custom-variant dark` em
[src/index.css](src/index.css)) + [src/context/ThemeContext.tsx](src/context/ThemeContext.tsx),
que alterna a classe `dark` no `<html>` e persiste a escolha em
`localStorage` (`portfolio-theme`). Ao criar um componente novo, use sempre
o padrão `text-ink-900 dark:text-paper-100` (ou equivalente) em vez de cores
fixas, para não quebrar um dos dois temas.

## Testes

`npm run test:run` roda toda a suíte (Vitest + Testing Library). Pontos que
exigem mocks especiais em [src/test/setup.ts](src/test/setup.ts):
`IntersectionObserver` e `matchMedia` não existem em jsdom e são
necessários por `framer-motion` (`whileInView`) e `ThemeContext`
respectivamente.

Ao adicionar um componente novo, crie um `ComponentName.test.tsx` ao lado
dele (não em uma pasta `__tests__/` separada) e cubra: (1) renderização sem
erro com o texto-chave esperado, (2) qualquer comportamento com estado
(toggle, troca de idioma, links).

## Deploy

Veja a seção "Deploy no GitHub Pages" do [README.md](README.md). O `base`
em [vite.config.ts](vite.config.ts) só é aplicado no build de produção
(`command === 'build'`) — o dev server sempre serve a partir de `/`.
