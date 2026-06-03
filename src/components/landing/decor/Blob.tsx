type Props = {
  color?: string; // CSS color or var
  className?: string;
  opacity?: number;
};

export function Blob({ color = "var(--primary)", className = "", opacity = 0.35 }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 600"
      className={`pointer-events-none absolute -z-10 blur-3xl ${className}`}
      style={{ opacity }}
    >
      <path
        fill={color}
        d="M421,320Q400,390,330,420Q260,450,190,415Q120,380,110,300Q100,220,170,170Q240,120,320,140Q400,160,425,230Q450,300,421,320Z"
      />
    </svg>
  );
}