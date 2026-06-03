export function HeroSunGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -top-24 right-[-10%] z-[1] h-[55vh] w-[55vh] rounded-full"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--sun) 70%, transparent), transparent 65%)",
        filter: "blur(20px)",
        opacity: 0.6,
      }}
    />
  );
}