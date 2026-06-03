type Props = {
  className?: string;
  color?: string;
  opacity?: number;
};

export function DotGrid({
  className = "",
  color = "var(--primary)",
  opacity = 0.08,
}: Props) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 h-full w-full ${className}`}
      style={{ opacity }}
    >
      <defs>
        <pattern id="dot-pat" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.4" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-pat)" />
    </svg>
  );
}