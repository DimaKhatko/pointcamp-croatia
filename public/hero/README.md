# Hero collage assets

The hero polaroid collage (`src/components/landing/Hero.tsx` → `HeroCollage`,
registered in `src/lib/imageManifest.ts`) expects these files here. All are
**square (1:1)**. Provide 400w and 800w variants in both AVIF and WebP:

| card        | files                                                                  |
|-------------|------------------------------------------------------------------------|
| central     | `hero-jump-400.avif` `hero-jump-800.avif` `hero-jump-400.webp` `hero-jump-800.webp` |
| top-right   | `hero-duck-400.avif` `hero-duck-800.avif` `hero-duck-400.webp` `hero-duck-800.webp` |
| bottom-left | `hero-crew-400.avif` `hero-crew-800.avif` `hero-crew-400.webp` `hero-crew-800.webp` |

Until the real photos are dropped in, the collage renders with empty (correctly
sized, 1:1) frames — layout and CLS are unaffected.
