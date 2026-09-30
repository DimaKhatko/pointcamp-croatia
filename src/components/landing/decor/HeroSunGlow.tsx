export function HeroSunGlow() {
  return (
    <div
      aria-hidden
      // Hidden below lg: over the bright blue sky of the mobile crop the yellow glow
      // mixes to a greenish haze. Desktop keeps it unchanged.
      className="pointer-events-none absolute -top-24 right-[-10%] z-[1] h-[55vh] w-[55vh] rounded-full max-lg:hidden"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--sun) 70%, transparent), transparent 65%)",
        filter: "blur(20px)",
        opacity: 0.6,
      }}
    />
  );
}