type Props = {
  className?: string;
  color?: string;
  opacity?: number;
};

export function WavePattern({
  className = "",
  color = "var(--sea)",
  opacity = 0.08,
}: Props) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 h-full w-full ${className}`}
      style={{ opacity }}
    >
      <defs>
        <pattern id="wave-pat" x="0" y="0" width="120" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M0 20 Q 30 0 60 20 T 120 20"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#wave-pat)" />
    </svg>
  );
}