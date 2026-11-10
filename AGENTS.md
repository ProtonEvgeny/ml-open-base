# AGENTS.md

Guidance for coding agents working in this repository.

## Project

ML Open Base is an open knowledge base for machine learning and AI, published as a
documentation site. It is meant to be useful to both people and agents. The project is
MIT-licensed.

## Stack

- [Blume](https://useblume.dev) 2.x — documentation framework built on Astro and Vite.
- Node.js >= 22.19.0, pinned in `.nvmrc` (major 22).
- npm, with `package-lock.json` committed.

## Commands

```bash
npm run dev          # start the dev server with hot reload
npm run build        # build the static site
npm run doctor       # diagnose config and content problems
npm run vercel:sync  # refresh root vercel.json from dist/vercel.json
npm run vercel:check # verify root vercel.json matches the build output
```

`dev` and `build` run `scripts/check-node.mjs` first and fail on an unsupported Node
version. Run `nvm use` in this directory if the shell uses the wrong one.

## Repository layout

| Path                | Purpose                                                     |
| ------------------- | ----------------------------------------------------------- |
| `docs/`             | Content root; files become routes and sidebar entries       |
| `blume.config.ts`   | Site configuration                                          |
| `scripts/`          | Local Node helper scripts                                   |
| `vercel.json`       | Vercel build settings, headers, and redirects               |
| `.blume/`, `dist/`  | Generated output — never edit or commit                     |
| `node_modules/`     | Dependencies — never edit                                   |

## Blume conventions

- Content lives in `docs/`. Routing, navigation, and metadata are derived from the file
  system; there is no manifest to keep in sync.
- The site is bilingual: `ru` is the default locale, `en` is the second locale.
  Default-locale content sits at the content root, English content under `docs/en/`.
- Site-level settings belong in `blume.config.ts`, wrapped in `defineConfig`.

Before changing Blume behavior, read the guidance bundled with the installed package:

- `node_modules/blume/AGENTS.md`
- `node_modules/blume/skills/blume/SKILL.md`
- `node_modules/blume/docs/`

Use those as the source of truth for Blume APIs and workflows. Do not guess option names
or invent CLI flags.

## Working rules

- Do not edit generated directories (`.blume/`, `dist/`) or `node_modules/`.
- Keep frontmatter valid YAML; quote values containing `: `.
- In `.mdx`, `{` and `<` are syntax. Escape them when they are meant as text.
- Make focused changes. Do not reformat or rewrite unrelated files.
- The site deploys as a static build on Vercel. `vercel.json` carries the build
  settings, headers, and redirects; do not change the matching project settings in
  the Vercel dashboard without updating the repository too. After configuration
  changes that affect generated headers or redirects, run `npm run vercel:sync`
  and commit the result.
- Do not commit secrets, credentials, or local environment files.
- If a task requires writing or restructuring knowledge-base content, confirm the intent
  first — that is outside the usual scope of agents in this repository.

## Git and pull requests

- Never push directly to `main`; every change goes through a short-lived branch and a
  pull request. This applies to maintainers too.
- Branch names follow `<type>/<kebab-slug>`; commit messages follow Conventional Commits
  in English.
- Keep one pull request to one logical change; do not mix content, tooling, and
  infrastructure.
- Before opening a pull request, run `npm run build` and `npm run doctor`.
- Full human-facing policy: `CONTRIBUTING.md`.

## Definition of done

Before reporting a task complete:

1. `npm run build` succeeds.
2. `npm run doctor` reports no new problems.
3. Changed links and frontmatter are valid.
4. `vercel.json` is in sync (`npm run vercel:check` after `npm run build`).
5. No generated files or unrelated changes are included.
