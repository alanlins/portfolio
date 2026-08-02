# Alan Lins — Portfolio

Site de portfolio pessoal de Alan D'Almeida Lins (Software Engineer Sênior |
Fullstack | Arquitetura de Software | IA Aplicada), construído em React +
TypeScript + Tailwind CSS, com internacionalização (PT-BR/EN-US/ES-ES), tema
claro/escuro e um currículo em PDF gerado a partir do mesmo conteúdo do site.

## Stack

- [Vite](https://vite.dev) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (tema claro/escuro via classe `dark`)
- [Framer Motion](https://motion.dev) (transições e scroll suave)
- [react-i18next](https://react.i18next.com) (PT-BR, EN-US, ES-ES)
- [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) (testes)
- Python + [ReportLab](https://www.reportlab.com/) (geração dos PDFs de currículo)

## Rodando localmente

Requisitos: Node.js 20+ e Python 3.10+ (para regenerar os currículos em PDF).

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Scripts

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Sobe o servidor de desenvolvimento |
| `npm run build` | Type-check (`tsc -b`) + build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm run test` | Roda os testes em modo watch |
| `npm run test:run` | Roda os testes uma vez (usado no CI) |
| `npm run lint` | Lint com Oxlint |
| `npm run deploy` | Build + publica `dist/` no branch `gh-pages` (via `gh-pages`) |

## Currículo em PDF

Os PDFs em `public/cv/cv-{pt-BR,en-US,es-ES}.pdf` (usados pelo botão "Download
CV") são gerados a partir do script:

```bash
pip install reportlab
python scripts/generate_cv.py
```

O script lê o mesmo conteúdo usado no site (`src/i18n/*.json`) para manter o
currículo e o site sempre sincronizados. Ver [CLAUDE.md](CLAUDE.md) para como
editar o conteúdo.

## Deploy no GitHub Pages

O workflow em `.github/workflows/deploy.yml` builda e publica automaticamente
a cada push em `main` (instala dependências, gera os PDFs, roda os testes,
builda e publica via GitHub Pages Actions).

Antes do primeiro deploy:

1. Ajuste `base` em [vite.config.ts](vite.config.ts) para `/<nome-do-repositorio>/`
   (já está como `/portfolio/` — troque se o repositório tiver outro nome).
2. No GitHub, em **Settings → Pages**, defina a fonte como **GitHub Actions**.
3. Faça push para `main`.

Alternativamente, deploy manual com `npm run deploy` (usa o pacote `gh-pages`
para publicar `dist/` direto no branch `gh-pages`).

## Estrutura

```
src/
  components/    Header, Hero, Specialties, About, Portfolio, Contact, Footer, ThemeToggle
  context/       ThemeContext (tema claro/escuro)
  data/          profile.ts — fonte única dos dados profissionais estruturados
  hooks/         useScrollSpy — destaque do item de nav ativo ao rolar a página
  i18n/          traduções PT-BR/EN-US/ES-ES + setup do react-i18next
scripts/
  generate_cv.py Gera os PDFs de currículo a partir de src/i18n/*.json
public/cv/       PDFs de currículo (gerados)
```

Mais detalhes de convenções do projeto em [CLAUDE.md](CLAUDE.md).
