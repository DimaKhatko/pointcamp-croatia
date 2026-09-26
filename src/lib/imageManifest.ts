/**
 * Responsive-image manifest.
 *
 * Each entry points at pre-generated AVIF + WebP variants (400w and 800w) that
 * live in `public/` and are therefore served by URL (not import-hashed). Add a
 * new image by dropping its variants next to the others and registering a key
 * here in the same shape.
 *
 * Hero collage assets live in `public/hero/`:
 *   hero-<name>-400.avif · hero-<name>-800.avif
 *   hero-<name>-400.webp · hero-<name>-800.webp
 * All hero images are square (1:1), so width === height.
 */
export interface ResponsiveImageSources {
  avif: { w400: string; w800: string };
  webp: { w400: string; w800: string };
  /** Intrinsic pixel size — used for width/height attrs to prevent CLS. */
  width: number;
  height: number;
}

const HERO = "/hero";

function heroSquare(name: string): ResponsiveImageSources {
  return {
    avif: { w400: `${HERO}/${name}-400.avif`, w800: `${HERO}/${name}-800.avif` },
    webp: { w400: `${HERO}/${name}-400.webp`, w800: `${HERO}/${name}-800.webp` },
    width: 800,
    height: 800,
  };
}

export const imageManifest = {
  "hero-jump": heroSquare("hero-jump"),
  "hero-duck": heroSquare("hero-duck"),
  "hero-crew": heroSquare("hero-crew"),
} satisfies Record<string, ResponsiveImageSources>;

export type ImageKey = keyof typeof imageManifest;
