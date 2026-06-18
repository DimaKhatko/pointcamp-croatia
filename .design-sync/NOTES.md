# design-sync notes — PointCamp Croatia

## Repo shape
This is a landing-page SPA (TanStack Start + React 19 + Tailwind), not a published npm package. No Storybook, no dist/ component library. The converter runs in synth-entry mode: it auto-creates a barrel re-exporting all TSX files under `src/components/landing/`.

## Build quirks
- No `npm run build` needed before sync — converter synthesizes the entry from src/
- `--entry ./dist/index.es.js` is passed intentionally as a non-existent path to (a) anchor PKG_DIR at the repo root and (b) trigger synth-entry mode in source-kit.mjs
- `import.meta.env` warnings from `src/lib/sendToTelegram.ts` are non-blocking (VITE env vars are undefined in the bundle; the form still renders)

## Font issues (non-blocking)
- `KyivTypeSans-VarGX.woff2` is self-hosted with an absolute URL (`/fonts/KyivTypeSans-VarGX.woff2`) in the @font-face rule in `src/styles.css`. The font file is copied to `fonts/` in the bundle but the absolute URL won't resolve in the DS preview context. DS renders with system-font fallback.
- `Manrope` and `Inter` are system-font fallbacks in the CSS variable stack — no @font-face needed. Suppressed via `runtimeFontPrefixes`.

## Thin decor components
Five decorative elements (Blob, DotGrid, HeroWaveDivider, Underline, WavePattern) are flagged as `[RENDER_THIN]` — they render but have no text content because they're pure SVG/CSS shapes. This is expected; they're not standalone UI components.

## bundle.mjs fork
`.design-sync/lib/bundle.mjs` adds `.webp`, `.jpg`, `.jpeg` as `dataurl` loaders so esbuild can inline the photo assets that landing components import. Without this, esbuild errors on `No loader is configured for ".webp" files`.
