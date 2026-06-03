type Props = {
  className?: string;
  color?: string;
  size?: number;
};

export function AccentDot({
  className = "",
  color = "var(--sun)",
  size = 14,
}: Props) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none inline-block rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, color-mix(in oklab, white 60%, ${color}), ${color})`,
        boxShadow: `0 4px 10px -2px color-mix(in oklab, ${color} 55%, transparent)`,
      }}
    />
  );
}