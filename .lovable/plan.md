# Point Camp Croatia — Landing Page Plan (v2, approved with additions)

Single-page landing on TanStack Start + React + Tailwind v4 + shadcn, replacing the old WordPress page. Positioned as "Quietcation / Soft Escapism", formal Ukrainian copy for parents, energetic accents for kids, full funnel ending in a validated application form with analytics conversion event.

---

## 1. Design system (src/styles.css)

Replace default tokens with Point Camp "Quiet Mode" palette in oklch:

- `--primary` purple #4A316D, `--primary-foreground` near-white
- `--accent-sun` warm yellow, `--accent-mint` fresh mint
- `--sea` Adriatic turquoise, `--sand` warm sand
- `--background` soft warm off-white; dark mode tuned
- `--radius: 1rem`, soft shadows, `--gradient-sea`, `--gradient-sunset` utilities

Load **Kyiv Type Sans** via `@font-face` (cyrillic woff2; fallback Manrope/Inter). Display for H1/H2; body same family at regular weight. All components use semantic tokens — no raw hex.

---

## 2. Analytics — Google Tag Manager (baked in from the start)

Container: **GTM-PGJNFD95**. Installed in `src/routes/__root.tsx`:

- In the `<head>` shell: render a `<script>` tag (via head() `scripts`) with the standard GTM snippet, loaded async, not blocking render.
- Immediately after `<body>` opens in `RootShell`: a `<noscript>` containing the GTM `<iframe>` fallback (placed in `<body>`, never in `<head>` — parse5 disallows that).
- This GTM container handles the Facebook Pixel injection downstream — no separate FB code in source.

**Conversion event from the application form.** In `ApplicationForm.tsx` → `submitApplication(data)`, on **real success only** (not on validation errors):

```ts
if (typeof window !== "undefined") {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "generate_lead", form: "croatia_application" });
}
```

A `// TODO:` comment notes that the GTM-side trigger configuration and Google Ads conversion import are done separately in the GTM UI. A small ambient type declaration extends `Window` with `dataLayer?: any[]` to keep TS strict-mode happy.

---

## 3. SEO — absolute URLs, canonical, robots, sitemap

Production domain: **https://croatia.pointcamp.com.ua/**.

In `src/routes/index.tsx` `head()`:

- `<title>` — "Англомовний літній кемп у Хорватії для дітей 8–17 | Point Camp"
- meta description — ~155 chars, Ukrainian, Adriatic + English immersion + 16 років досвіду
- `og:title`, `og:description` — Ukrainian, page-specific
- `og:type` "website", `og:locale` "uk_UA", `og:site_name` "Point Camp"
- **`og:url` ABSOLUTE**: `https://croatia.pointcamp.com.ua/`
- **`og:image` ABSOLUTE**: `https://croatia.pointcamp.com.ua/og-image.jpg` + og:image:width/height + alt
- `twitter:card` "summary_large_image", `twitter:title`, `twitter:description`, `twitter:image` (same absolute URL)
- `robots` meta "index, follow" (explicit)
- `links`: `<link rel="canonical" href="https://croatia.pointcamp.com.ua/">` — leaf only, not in `__root.tsx` (TanStack concatenates links without dedup)
- `scripts`: JSON-LD with `@type: Organization` + nested `Event` (Flagship 31.07–09.08.2026, location Pakoštane HR, offers 1550 EUR)

In `__root.tsx`: keep only `<html lang="uk">`, charset, viewport, favicon link, GTM script — no canonical, no og:image, no per-page title (root-level og:image would override every leaf).

Static files:

- **`public/robots.txt`**:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://croatia.pointcamp.com.ua/sitemap.xml
  ```
- **`public/sitemap.xml`** — minimal urlset with the single absolute URL `https://croatia.pointcamp.com.ua/`, lastmod today, changefreq monthly, priority 1.0.
- **`public/favicon.svg`** — placeholder mark (client supplies real).
- **`public/og-image.jpg`** — placeholder slot at the path referenced by og:image (client supplies real). Use a generated atmospheric Adriatic image as a sensible default so previews aren't broken.

Exactly one `<h1>` on the page (in Hero). Semantic `<header><main><section aria-labelledby><footer>`. Alt text on every image.

---

## 4. Page sections (components in `src/components/landing/`)

Composed in `src/routes/index.tsx` in funnel order:

1. **StickyHeader** — logo, anchor nav (Програма · День · Резорт · Дати · FAQ), persistent CTA "Залишити заявку" → `#apply`. Mobile sheet.
2. **Hero** — full-bleed Adriatic photo, soft purple overlay, H1 "Англомовний літній кемп у Хорватії", emotional subline, primary CTA, fact strip (8–17 · 10 днів · Адріатика · 55 місць · 1 заїзд).
3. **EmotionalIntro** — "Літо без екранів. Справжні зв'язки. Море." + warm paragraph.
4. **WhyPointCamp** — 4 trust cards (16 років, Безпека 24/7, Міжнародна команда, English щодня).
5. **ForWhom** — 8–17, базова англійська.
6. **ThreePillars** — Море / Активності / Розваги, image-led.
7. **ActivitiesGrid** — responsive 2–4 col chips/cards of all activities.
8. **DayInCamp** — vertical timeline (alternating on desktop, stacked on mobile) for the full schedule.
9. **PineBeachResort** — split layout + gallery slot, Pakoštane / Vrana / 4 national parks.
10. **Safety** — лікар 24/7, страхування, 10 дорослих, 55 місць.
11. **DatesPricing** — highlighted card 31.07–09.08.2026 · 1550 €, "Що входить" / "Не входить", 4 discount chips, scarcity, "Забронювати".
12. **FAQ** — shadcn Accordion, all 8 items.
13. **ApplicationForm** (#apply) — react-hook-form + zod (Ім'я ≥2, E-mail email(), Телефон regex, Промокод optional, Інформація textarea optional). Ukrainian error messages. Success state card + sonner toast. **Fires `generate_lead` dataLayer event only on success.** Submit handler stubbed for backend wiring later.
14. **Footer** — +38 066 221 73 73, Telegram, Viber, contact@pointcamp.com.ua, Facebook/Instagram, Публічна оферта, Обробка персональних даних.

---

## 5. Imagery

- Generate ONE atmospheric hero image (Adriatic sea + pine, dusk, no people) → `src/assets/hero-sea.jpg`. Also drop a derivative into `public/og-image.jpg` so the absolute og:image URL resolves immediately.
- All other photo slots are lightweight gradient placeholders with proper `alt` and reserved aspect ratio (no CLS) — easy `<img>` swap later. No stock smiling-kid photos. No generic icons — restrained custom SVG accents.

---

## 6. Technical foundation

- Mobile-first, container `max-w-6xl`, section padding `py-24 md:py-32`.
- `html { scroll-behavior: smooth }` + `scroll-mt` on anchored sections.
- Sticky header with backdrop blur.
- LCP: hero image `fetchpriority="high" loading="eager"`, sized; everything below lazy.
- Reduced-motion respected.

---

## 7. Files

Create:
- `src/components/landing/{StickyHeader,Hero,EmotionalIntro,WhyPointCamp,ForWhom,ThreePillars,ActivitiesGrid,DayInCamp,PineBeachResort,Safety,DatesPricing,FAQ,ApplicationForm,Footer}.tsx`
- `src/components/landing/data.ts`
- `src/types/global.d.ts` (Window.dataLayer)
- `src/assets/hero-sea.jpg` (generated)
- `public/favicon.svg`, `public/og-image.jpg`, `public/robots.txt`, `public/sitemap.xml`

Modify:
- `src/styles.css` — tokens + @font-face
- `src/routes/__root.tsx` — `<html lang="uk">`, GTM script in head + noscript iframe in body, sitewide meta defaults, Sonner Toaster
- `src/routes/index.tsx` — replace placeholder, full landing composition, absolute-URL meta + canonical + JSON-LD

Add deps: `react-hook-form`, `@hookform/resolvers`, `zod`.

---

## Out of scope

- Real backend for form submission (handler stubbed, dataLayer event ready).
- Real photos (placeholder slots).
- EN translation, CMS, GA4/Ads configuration (handled in GTM UI separately).
