## Goal
Refine the existing Croatia landing — more photo slots, warmer palette use, brand graphic depth. No copy / SEO / GTM / structure changes.

## 1. Photo slots (≈3× current count)

Reusable component `src/components/landing/PhotoSlot.tsx`:
- Props: `alt`, `aspect` (e.g. "4/5", "1/1", "16/9"), `tone` ("sea"|"sun"|"mint"|"sand"|"mix"), `label?`, optional `className`.
- Renders a div with `aspect-[X]`, gradient background from chosen brand tokens, soft inner ring, optional caption chip. Reserves space → no CLS. Trivially swappable with `<img>` later.

Edits:
- **ThreePillars**: each card becomes image-led — `PhotoSlot` (aspect 4/3) on top with the 01/02/03 badge overlay, copy below. Tones: sea / mint / sun.
- **ActivitiesGrid**: convert to mixed grid. Tag ~5 items in `data.ts` (`{ label, photo?: boolean, tone? }`); photo items render as image cards (square `PhotoSlot` + label below), rest stay as text chips. Layout `grid-cols-2 sm:grid-cols-3 md:grid-cols-4` keeps rhythm.
- **DayInCamp**: insert 3 `PhotoSlot` rows between schedule items (after morning, midday, evening) spanning both timeline columns, aspect 21/9, atmospheric tones.
- **NEW `MomentsGallery.tsx`** placed after `EmotionalIntro` in `routes/index.tsx`. Full-width band, off-white bg, eyebrow "Моменти", H2 "Літо, яке хочеться пам'ятати." 8 slots in a scattered/masonry layout (CSS grid with varied row/col spans + slight rotation on alternating cards for polaroid feel; rotation disabled under reduced-motion).
- **PineBeachResort**: gallery grows from 6 → 10 slots, keeping featured 2×2 hero tile.

## 2. Warmer palette rhythm

- Section background alternation in `routes/index.tsx` via wrapper classes already on each section; update to alternate `bg-background`, `bg-[color-mix(in_oklab,var(--sea)_8%,var(--background))]`, `bg-[color-mix(in_oklab,var(--sand)_14%,var(--background))]`, `bg-secondary/40`. Add two new utility tokens in `styles.css`: `--wash-sea`, `--wash-sand` for reuse.
- Eyebrows: small inline accent dot before the text using `bg-sun` / `bg-mint` / `bg-sea` depending on section (not all purple).
- Chips (QUICK_FACTS, discount chips, FAQ tags): subtle accent borders/backgrounds rotating across sun/mint/sea instead of all neutral.
- CTA: keep primary purple; add hover state with sun-tinted glow (`shadow-[0_10px_30px_-10px_color-mix(in_oklab,var(--sun)_55%,transparent)]`).
- Number badges (01/02/03) in ThreePillars: filled pill in mint/sun/sea respectively with white-on-color text + soft shadow.

## 3. Brand graphic layer

New folder `src/components/landing/decor/`:
- `Blob.tsx` — inline SVG organic blob, props `color`, `className`. Used absolutely-positioned behind section headings (`-z-10`, `blur-3xl`, opacity 25–40%).
- `WavePattern.tsx` — repeating SVG `<pattern>` of gentle waves, very low opacity, used as full-bleed background watermark in 1–2 sections (EmotionalIntro + DayInCamp).
- `DotGrid.tsx` — subtle dotted pattern for Safety/PineBeachResort background.
- `Underline.tsx` — hand-drawn squiggle SVG; wraps key words in H1/H2 (`<Underline>тиша</Underline>`). Two-tone variants (sun / mint).
- `AccentDot.tsx` — small floating filled circle SVG with soft shadow, scattered near eyebrows / fact-strip / hero CTA area (decorative, `aria-hidden`).
- `HeroSunGlow.tsx` — radial gradient blob layered above the hero overlay for warm sun bloom in upper-right.
- `HeroWaveDivider.tsx` — soft SVG wave at the bottom edge of the hero transitioning into next section's background.

3D / pill treatments:
- Add `.chip-3d` utility in `styles.css`: rounded-full + subtle gradient (`linear-gradient(180deg, white, color-mix(...))`) + `box-shadow: 0 1px 0 rgba(255,255,255,.6) inset, 0 6px 14px -8px color-mix(in oklab, var(--primary) 40%, transparent)`. Apply to QUICK_FACTS chips, discount chips, schedule time pill, eyebrow pills.
- `.badge-3d` for pillar 01/02/03 numbers: larger pill, accent fill, layered shadow.

Reduced motion: blobs and pattern animations gated behind `motion-safe:`. Decorative SVGs marked `aria-hidden="true"`; underlines wrap text without altering reading order. Everything inline SVG, no extra libs.

## Files

**New:** `src/components/landing/PhotoSlot.tsx`, `MomentsGallery.tsx`, `decor/Blob.tsx`, `decor/WavePattern.tsx`, `decor/DotGrid.tsx`, `decor/Underline.tsx`, `decor/AccentDot.tsx`, `decor/HeroSunGlow.tsx`, `decor/HeroWaveDivider.tsx`.

**Edit:** `styles.css` (wash tokens + .chip-3d + .badge-3d), `routes/index.tsx` (mount MomentsGallery + alternate section washes), `Hero.tsx`, `EmotionalIntro.tsx`, `ThreePillars.tsx`, `ActivitiesGrid.tsx`, `DayInCamp.tsx`, `PineBeachResort.tsx`, `Safety.tsx`, `DatesPricing.tsx`, `FAQ.tsx`, `data.ts` (activity photo flags).

**Untouched:** `__root.tsx`, GTM, `ApplicationForm.tsx` dataLayer, SEO meta, absolute URLs, copy, section order, `robots.txt`, `sitemap.xml`.

## Out of scope
Real photo files, backend, EN locale, animations beyond CSS-only.
