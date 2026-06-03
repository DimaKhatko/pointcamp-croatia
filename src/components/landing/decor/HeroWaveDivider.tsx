export function HeroWaveDivider() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 z-[2] h-16 w-full md:h-24"
    >
      <path
        d="M0 60 Q 360 0 720 50 T 1440 50 L 1440 100 L 0 100 Z"
        fill="var(--background)"
      />
    </svg>
  );
}