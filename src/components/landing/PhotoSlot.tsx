import type { CSSProperties, ReactNode } from "react";

type Tone = "sea" | "sun" | "mint" | "sand" | "primary" | "mix";

const GRADIENTS: Record<Tone, string> = {
  sea: "linear-gradient(135deg, color-mix(in oklab, var(--sea) 60%, transparent), color-mix(in oklab, var(--mint) 40%, transparent))",
  sun: "linear-gradient(135deg, color-mix(in oklab, var(--sun) 55%, transparent), color-mix(in oklab, var(--sand) 55%, transparent))",
  mint: "linear-gradient(135deg, color-mix(in oklab, var(--mint) 55%, transparent), color-mix(in oklab, var(--sea) 35%, transparent))",
  sand: "linear-gradient(135deg, color-mix(in oklab, var(--sand) 70%, transparent), color-mix(in oklab, var(--sun) 35%, transparent))",
  primary:
    "linear-gradient(135deg, color-mix(in oklab, var(--primary) 40%, transparent), color-mix(in oklab, var(--sea) 45%, transparent))",
  mix: "linear-gradient(135deg, color-mix(in oklab, var(--sea) 45%, transparent), color-mix(in oklab, var(--sun) 40%, transparent))",
};

type Props = {
  alt: string;
  aspect?: string; // e.g. "4/3", "1/1", "21/9"
  tone?: Tone;
  label?: string;
  className?: string;
  rounded?: string; // tailwind class
  children?: ReactNode;
  style?: CSSProperties;
};

/**
 * Placeholder image slot. Reserves aspect ratio so swapping in a real <img>
 * later won't cause layout shift. Keep the same `alt` on the future <img>.
 */
export function PhotoSlot({
  alt,
  aspect = "4/3",
  tone = "mix",
  label,
  className = "",
  rounded = "rounded-2xl",
  children,
  style,
}: Props) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden border border-border/60 ${rounded} ${className}`}
      style={{
        aspectRatio: aspect,
        background: GRADIENTS[tone],
        ...style,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 30% 20%, rgba(255,255,255,0.35), transparent 60%)",
        }}
      />
      {label && (
        <span className="absolute bottom-3 left-3 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}