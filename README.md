# Marketing Platform — Frontend

Standalone Next.js 16 frontend. The backend is a separate repository and is reached through `NEXT_PUBLIC_API_URL`.

## Quick start

```bash
git init -b main          # only when cloning without .git (husky needs it)
nvm use                   # Node 26 from .nvmrc (npm 11 ships with it)
npm install
cp .env.example .env.local
npm run dev               # http://localhost:3000
```

## Commands

| Command                | What it does                                                   |
| ---------------------- | -------------------------------------------------------------- |
| `npm run dev`          | Next.js dev server with Turbopack                              |
| `npm run build`        | Production build (`output: standalone`) + copies static assets |
| `npm start`            | Run the standalone production server locally                   |
| `npm run lint`         | ESLint, zero warnings allowed                                  |
| `npm run typecheck`    | `next typegen` + `tsc --noEmit`                                |
| `npm test`             | Vitest unit tests (jsdom)                                      |
| `npm run test:watch`   | Vitest in watch mode                                           |
| `npm run test:e2e`     | Playwright against the standalone server (chromium + Pixel 7)  |
| `npm run format`       | Prettier write                                                 |
| `npm run format:check` | Prettier check (CI)                                            |

## Technologies

- **Next.js 16** — App Router, Cache Components (PPR), Turbopack, typed routes, standalone output.
- **React 19** — Server Components by default, client islands where needed.
- **TypeScript** — strict, `noUncheckedIndexedAccess`.
- **Tailwind CSS v4** — CSS-first tokens in `globals.css`, class-based dark mode.
- **radix-ui** — unstyled accessible primitives (single package).
- **TanStack Query** — server data cache, one client per request on the server.
- **Zustand** — small UI state store with devtools + persist.
- **React Hook Form + Zod** — forms and validation; Zod also validates env vars.
- **Motion** — `LazyMotion` + `m` for entry, list and count-up animations.
- **next-themes** — light / dark / system.
- **sonner** — toasts.
- **lucide-react** — icons.
- **Vitest + Testing Library** — unit tests.
- **Playwright** — e2e tests.

### Library count

| Group   | Count | Packages                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime | 16    | next, react, react-dom, @tanstack/react-query, zustand, zod, react-hook-form, @hookform/resolvers, next-themes, radix-ui, class-variance-authority, clsx, tailwind-merge, lucide-react, sonner, motion                                                                                                                                                                                                                                                                             |
| Dev     | 28    | typescript, @types/node, @types/react, @types/react-dom, tailwindcss, @tailwindcss/turbopack, eslint, eslint-config-next, eslint-config-prettier, @tanstack/eslint-plugin-query, vitest, @vitejs/plugin-react, vite-tsconfig-paths, jsdom, @testing-library/react, @testing-library/jest-dom, @testing-library/user-event, @playwright/test, 4 × @fontsource-variable, prettier, prettier-plugin-tailwindcss, husky, lint-staged, @commitlint/cli, @commitlint/config-conventional |

**Add later, only when the feature is built:** next-intl, recharts, @xyflow/react, dnd-kit, fullcalendar, uppy + tus, tiptap, date-fns, @lottiefiles/dotlottie-react, socket.io-client, @sentry/nextjs, posthog-js, storybook.

### Redux vs Zustand → Zustand + TanStack Query

1. **Server data is a cache, not state.** TanStack Query handles fetching, caching, dedupe, retries and invalidation; Redux would re-implement all of that by hand.
2. **UI state is tiny.** Sidebar, panels and toggles fit in a 30-line Zustand store with no boilerplate, actions or reducers.
3. **Smaller bundle, simpler mental model.** Zustand is ~1 KB, works outside React, and has first-class devtools and persistence middleware.

Rule of thumb: API data → TanStack Query · UI state → Zustand · forms → React Hook Form · filters → URL params.

## Design system

Tokens live in `src/app/globals.css` (Tailwind v4 `@theme inline`). Brand primary is indigo-600 `#4F46E5`, accent is orange-500 `#F97316`, neutrals are slate. All text pairs meet WCAG AA in both themes.

### Typography (`src/components/ui/typography.tsx`)

| Element  | Size / line-height | Weight | Font    | Notes                   |
| -------- | ------------------ | ------ | ------- | ----------------------- |
| display  | 48 / 56            | 800    | Jakarta |                         |
| h1       | 36 / 44            | 700    | Jakarta |                         |
| h2       | 30 / 38            | 700    | Jakarta |                         |
| h3       | 24 / 32            | 600    | Jakarta |                         |
| h4       | 18 / 28            | 600    | Jakarta |                         |
| body-lg  | 16 / 26            | 400    | Inter   |                         |
| body     | 14 / 22            | 400    | Inter   | default                 |
| small    | 13 / 20            | 400    | Inter   |                         |
| caption  | 12 / 16            | 500    | Inter   |                         |
| overline | 11 / 16            | 700    | Inter   | uppercase, +8% tracking |
| label    | 14 / 20            | 600    | Inter   |                         |

Also: `Kpi` (32/40 bold, tabular-nums) and `Code` (JetBrains Mono 13px). `Text` takes `variant` and `tone` (default, secondary, muted, primary, success, warning, danger).

Fonts are self-hosted from `@fontsource-variable` via `next/font/local`; Google is never contacted. Noto Sans Devanagari and Inter Latin-Extended (₹) load only when their unicode ranges appear on the page.

### Buttons (`src/components/ui/button.tsx`)

| Variant     | Use                                 |
| ----------- | ----------------------------------- |
| primary     | Main action (indigo)                |
| secondary   | Bordered, on cards                  |
| ghost       | Toolbars, low emphasis              |
| accent      | Orange CTA — **max one per screen** |
| destructive | Delete / irreversible               |
| link        | Inline text action                  |

Sizes: `sm` h-8, `md` h-10 (default), `lg` h-12, `icon`, `icon-sm`. Props: `loading` (spinner + disabled + `aria-busy`), `asChild` (wrap Next `<Link>`), `type="button"` by default.

### Animation rules

- **CSS only** for hover, press, toast, modal, dropdown and skeleton. Use `animate-toast-in`, `animate-pop-in`, `animate-modal-in`, `animate-pulse-soft` from `globals.css`.
- **Motion** (`motion/react`) only for page/card entry, list add/remove (`AnimatePresence`), drag, onboarding steps and KPI count-up.
- Always `LazyMotion` + `m` with `domAnimation` and `strict` (≈5 KB, not ≈34 KB). `MotionProvider` is already in `providers.tsx`.
- Animate only `opacity` and `transform`. Never width, height, top or left.
- Durations 150–250 ms, easing `[0.2, 0, 0, 1]` (same curve as `--ease-out-soft`).
- `<MotionConfig reducedMotion="user">` and the CSS `prefers-reduced-motion` rule honour the OS setting.
- Helpers in `src/components/motion/`: `FadeIn`, `StaggerList` / `StaggerItem`, `AnimatePresence`.

## Lint rules

Flat config in `eslint.config.mjs`, in order: `next/core-web-vitals` → `next/typescript` → `@tanstack/query` recommended → project rules → `eslint-config-prettier` last.

Project rules: `no-console` (warn; `warn`/`error` allowed), `eqeqeq`, `react/no-danger` error, `no-explicit-any` error, inline `consistent-type-imports`, `no-unused-vars` ignoring `_` prefixed names, `import/no-cycle`. `npm run lint` runs with `--max-warnings=0`.

Commits follow Conventional Commits (commitlint). Husky runs lint-staged on `pre-commit` and commitlint on `commit-msg`.

## CI

```
PR / push main ──▶ ci.yml        format → lint → typecheck → test → build ──▶ e2e (Playwright)
PR / push main ──▶ security.yml  CodeQL · gitleaks · npm audit · dependency-review (PRs)
weekly cron    ──▶ security.yml
```

Deployment is not part of this repo yet. `npm run build` produces a standalone server in `.next/standalone` (`npm start` runs it) that can be hosted on any Node platform; add a deploy workflow once the hosting target is decided.

### One-time GitHub setup

1. **Branch protection on `main`**: require PR, require status checks `quality`, `e2e`, `CodeQL`, `Secret scan (gitleaks)`, require Code Owners review, no force-push.
2. **Repository variables** (optional, CI uses localhost defaults): `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_APP_ENV`.
3. Replace `@your-org/frontend-team` in `.github/CODEOWNERS`.

## Security

- Static CSP (`default-src 'self'`, `frame-ancestors 'none'`, `object-src 'none'`, API origin allow-listed in `connect-src`). Nonce-based CSP is intentionally avoided: it forces dynamic rendering and breaks PPR.
- HSTS 2 years + includeSubDomains + preload, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Cross-Origin-Opener-Policy: same-origin`, `Permissions-Policy` disables camera, microphone, geolocation, payment, usb, browsing-topics.
- `poweredByHeader: false`.
- Auth via httpOnly cookies (`credentials: "include"`); tokens never touch JavaScript.
- Env vars validated with Zod at build time.
- CodeQL (security-extended), gitleaks, `npm audit`, dependency review and Dependabot in CI.

## Folder structure

```
marketing-platform-frontend/
├── e2e/                      Playwright specs
├── public/
├── scripts/copy-assets.mjs   copies public/ + .next/static into the standalone output
├── src/
│   ├── app/                  layout, page (design-system preview), error, not-found
│   │   ├── fonts.ts          next/font/local from @fontsource-variable
│   │   ├── globals.css       tokens, theme, base layer, keyframes
│   │   └── providers.tsx     Theme + Query + Motion + Toaster
│   ├── components/
│   │   ├── motion/           motion-provider, fade-in, stagger-list, presence
│   │   ├── ui/               button, typography
│   │   └── theme-toggle.tsx
│   ├── config/               env.ts (Zod), security-headers.ts
│   ├── lib/                  utils.ts (cn, formatINR), api/client.ts, query-client.ts
│   └── stores/               ui-store.ts (Zustand)
├── .github/                  workflows, dependabot, CODEOWNERS, PR template
├── .husky/                   pre-commit, commit-msg
├── .vscode/
├── eslint.config.mjs
├── next.config.ts
├── playwright.config.ts
└── vitest.config.mts
```
