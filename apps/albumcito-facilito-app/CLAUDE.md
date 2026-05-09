# Albumcito Facilito — Frontend App

The frontend application for the Albumcito Facilito sticker album experience.

## Purpose

Lets users view their Cody sticker album, mark individual stickers as collected or missing, and see their overall completion progress.

## Key Responsibilities

- Display the full album grid of Cody stickers
- Allow users to toggle sticker ownership (have it / missing)
- Show collection progress and stats
- Communicate with the backend API to persist state

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (CSS-first, `@import "tailwindcss"` in `globals.css`)
- **Testing**: Vitest + React Testing Library + jsdom
- **Linting**: ESLint 9 with `eslint-config-next/core-web-vitals` (native flat config — no FlatCompat needed)

## Project Structure

```
app/
  layout.tsx       # Root layout (imports globals.css)
  page.tsx         # Home page
  globals.css      # Tailwind CSS entry point
next.config.ts     # Next.js configuration
postcss.config.mjs # PostCSS config (@tailwindcss/postcss plugin)
tsconfig.json      # TypeScript config (bundler module resolution)
vitest.config.mts  # Vitest config (jsdom, React plugin, tsconfig paths)
eslint.config.mjs  # ESLint 9 flat config (imports eslint-config-next/core-web-vitals directly)
```

## Development Commands

```bash
# From repo root (via Turbo)
pnpm --filter @albumcito-facilito/app dev
pnpm --filter @albumcito-facilito/app build
pnpm --filter @albumcito-facilito/app lint
pnpm --filter @albumcito-facilito/app test

# Test in watch mode
pnpm --filter @albumcito-facilito/app test:watch
```

## Key Notes

- Uses **Tailwind CSS v4** — no `tailwind.config.js` needed; config is CSS-first via `@import "tailwindcss"`
- **App Router** only — no `pages/` directory
- Path alias `@/*` maps to the workspace root (e.g., `@/app/page`)
- ESLint uses the **flat config** format (`eslint.config.mjs`), not `.eslintrc`

## API

Talks to the backend at `apis/albumcito-facilito-api/`. See the root `CLAUDE.md` for shared domain concepts.

## Skills

- **`next-best-practices`** — File conventions, RSC/client component boundaries, data-fetching patterns, async APIs, metadata, error handling, route handlers, image and font optimization, and bundling. Use when adding or refactoring pages, layouts, or data-fetching logic.
- **`vercel-react-best-practices`** — React and Next.js performance optimization patterns from Vercel Engineering (memoization, streaming, bundle size, etc.). Use when writing or reviewing React components and pages.
- **`bdd-gherkin`** — Write Gherkin feature files and Vitest-Cucumber step definitions for the Next.js frontend. Use when adding acceptance tests or `Given/When/Then` scenarios.
