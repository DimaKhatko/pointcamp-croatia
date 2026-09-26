import type { CSSProperties } from "react";
import { imageManifest, type ImageKey } from "@/lib/imageManifest";

interface ResponsiveImageProps {
  /** Key registered in `imageManifest.ts`. */
  image: ImageKey;
  alt: string;
  /** `sizes` attribute — describes the image's rendered width per breakpoint. */
  sizes: string;
  className?: string;
  style?: CSSProperties;
  /**
   * `true` sets fetchPriority="high" (use on the LCP / above-the-fold image
   * only). All variants are decoded eagerly regardless — the collage is in the
   * first viewport.
   */
  priority?: boolean;
}

/**
 * Shared responsive image: AVIF → WebP `<source>` srcsets with a WebP `<img>`
 * fallback. Intrinsic width/height come from the manifest so the box is
 * reserved before load (no CLS).
 */
export function ResponsiveImage({
  image,
  alt,
  sizes,
  className,
  style,
  priority = false,
}: ResponsiveImageProps) {
  const sources = imageManifest[image];
  return (
    <picture>
      <source
        type="image/avif"
        srcSet={`${sources.avif.w400} 400w, ${sources.avif.w800} 800w`}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={`${sources.webp.w400} 400w, ${sources.webp.w800} 800w`}
        sizes={sizes}
      />
      <img
        src={sources.webp.w800}
        alt={alt}
        width={sources.width}
        height={sources.height}
        loading="eager"
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={className}
        style={style}
      />
    </picture>
  );
}
