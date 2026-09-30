# CLAUDE.md — pointcamp-croatia

## Repo facts
- Landing: Croatia summer camp, Pine Beach Pakoštane.
- Repo: `pointcamp-croatia` · Stack: TanStack Start (Lovable config) + Bun.
- Toolchain (aligned with the reference repo smart-point-camp2): Vite `8.1.5`; `@tanstack/react-router` `1.170.18`, `@tanstack/react-start` `1.168.32`, `@tanstack/router-plugin` `1.168.23`; `@lovable.dev/vite-tanstack-config` `^2.20.0`; `nitro` `3.0.260603-beta`; `@vitejs/plugin-react` `^5.2.0`; top-level `overrides: { "rolldown": "1.2.1" }`. `bun run build` prerenders `/` to `dist/client/index.html`.
- `LANDING = "croatia"`.
- Build output: `dist/client`.
- Firebase: target `croatia` → site `pointcamp-croatia-2026` · domain `croatia.pointcamp.com.ua`.
- Future path: `pointcamp.com.ua/croatia/` (pilot of the subfolder migration). Not done in-repo yet.
- Lead form currently posts directly to the Telegram Bot API via `src/lib/sendToTelegram.ts` using `VITE_TELEGRAM_BOT_TOKEN` / `VITE_TELEGRAM_CHAT_ID`. S1 replaces this (see Pending).

## Standard v1 rules (S1–S5, concise)
- **S1 Lead submission.** Target end-state: `src/lib/submitLead.ts` posting JSON to the Make webhook `https://hook.eu1.make.com/29wyg57rzqxtajir3fw537ce1vrs2ev2`. Payload keys exactly: `landing, name, phone, email, participant, page_url, utm_source, utm_medium, utm_campaign, utm_content, utm_term, submitted_at, test`. Retry once after 1500 ms on network/non-2xx failure. Push `{ event: "lead_submit" }` to `window.dataLayer` **only after a confirmed 2xx** (SSR-guarded). Form via `FormData`, names `name/phone/email/participant`, visually-hidden honeypot `website`. No `VITE_*` tokens and no browser calls to third-party APIs (e.g. `api.telegram.org`) in client code.
- **S2 Analytics.** GTM container `GTM-PGJNFD95` is the only tracking loader (head script + `<noscript>` iframe). No direct gtag.js, no fbq/fbevents, no second GTM. `window.dataLayer` typed once. Allowed custom events: `lead_submit`, `video_play`.
- **S3 Meta & crawl.** `<html lang="uk">`; title; meta description; absolute canonical; `og:title/description/image` (absolute, image 1200×630), `og:url`, `og:type`, `og:locale=uk_UA`, `og:site_name="Point Camp"`; `twitter:card=summary_large_image`; `theme-color`; favicon. `robots.txt` with explicit `Allow: /` for Googlebot, Bingbot, Twitterbot, facebookexternalhit and `*`, plus a `Sitemap:` line. `sitemap.xml` with `<lastmod>`. No JSON-LD work in standard sessions.
- **S4 Build & hosting.** `vite.config` uses `nitro: false` + `spa { enabled: true, prerender: { outputPath: "/index" } }`. `firebase.json`: `public = dist/client`; SPA rewrite `** → /index.html`; Cache-Control `public, max-age=31536000, immutable` for `/assets/**` and static extensions (js, css, woff2, woff, jpg, jpeg, png, svg, webp, avif); `no-cache, no-store, must-revalidate` for `/index.html`. `.firebaserc` target `croatia` → site `pointcamp-croatia-2026`. `.gitignore` contains `.firebase/`, `dist`, `*.report.html`.
- **S5 Subfolder readiness (prep only; "/" must not change).** No hardcoded root-absolute asset URLs in TS/TSX/CSS/HTML — use imports or `import.meta.env.BASE_URL`. Absolute `https` URLs in meta tags are fine. Router would take a base path via `createRouter({ basepath })` + Vite `base`; do not set either yet.

## Commands
- `bun install`
- `rm -rf dist && bun run build`
- `bunx serve dist/client -p 5000`
- `firebase deploy --only hosting:croatia` — deploys are done by Dima only.

## Conventions
- Work on `main`. No feature branches, no Firebase preview channels.
- Prompts and code comments in English.
- Never write shell commands with `#` comments.
- Assets must be committed to be visible (nothing is fetched at deploy time).
- Measure layout shift and load timing on the static output (`bunx serve dist/client -p 5000`), not `vite preview`: preview serves server-rendered pages, while Firebase hosts the static shell whose text is created by JS, so font/CLS timing differs.
- The display font is preloaded in `src/routes/__root.tsx` (same hashed file the CSS `@font-face` uses). Keep the two in sync: it removes the font-swap layout shift, which was 0.2–0.29 at 768–1023px before.
- Lockfile: `bun.lock` is the only lockfile (`package-lock.json` is not used and stays gitignored).

## Content rules (S6 — audit, do not edit copy without a task)
- Parents are addressed with lowercase «ви» in page copy; participants with «ти».
- Flag any mention of вогнище, ватра, багаття, костер, bonfire, campfire.
- Flag outdated years/dates, template or Lovable leftovers, lorem, `{{placeholders}}`, or mentions belonging to another landing.

## Pending
- **S1 lead submission — blocked until the Make router is ready.** Keep `sendToTelegram.ts` and the current form until then; the switch to `submitLead.ts` + honeypot + `idle/sending/sent/error` states removes `VITE_TELEGRAM_*` from `.env`/`.env.example`.
- **Season 2027 content update** — the landing still sells the summer **2026** shift (dates 31.07–09.08.2026, sitemap `lastmod`, copy). Refresh for 2027 when confirmed.
- **og:image 1200×630 swap** — current `og-image.jpg` is 1920×1280; replace the file and update the declared `og:image:width/height` in `src/routes/index.tsx` once the 1200×630 asset is supplied.
- **Subfolder migration to `pointcamp.com.ua/croatia/`** — set Vite `base: "/croatia/"` + `createRouter({ basepath: import.meta.env.BASE_URL })` and re-verify. Not done this session.
- **Unused Lovable scaffolding** — `src/lib/lovable-error-reporting.ts`, `src/lib/error-capture.ts`, `src/lib/error-page.ts`, `src/lib/config.server.ts`: verify they are truly dead and remove later.
