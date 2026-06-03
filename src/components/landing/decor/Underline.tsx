import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  color?: "sun" | "mint" | "sea";
};

const COLOR: Record<NonNullable<Props["color"]>, string> = {
  sun: "var(--sun)",
  mint: "var(--mint)",
  sea: "var(--sea)",
};

export function Underline({ children, color = "sun" }: Props) {
  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden
        viewBox="0 0 200 14"
        preserveAspectRatio="none"
        className="absolute -bottom-1 left-0 z-0 h-[0.45em] w-full"
      >
        <path
          d="M2 9 Q 50 1 100 7 T 198 6"
          fill="none"
          stroke={COLOR[color]}
          strokeWidth="5"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
    </span>
  );
}