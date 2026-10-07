import type { ReactNode } from "react";

/**
 * Dark-purple closing callout shared by the sections that end on a key insight
 * (Reviews, ForWhom): a small uppercase label, the headline text and an optional
 * line below it.
 */
export function TakeawayCallout({
  label,
  children,
  note,
  className = "mt-12",
}: {
  label: string;
  children: ReactNode;
  note?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl bg-[#452B70] px-6 py-10 text-center md:px-10 md:py-12 ${className}`}>
      <p className="text-xs font-medium uppercase tracking-widest text-[#FFE8C7]/70">{label}</p>
      <p className="mx-auto mt-4 max-w-3xl text-balance text-2xl font-extrabold leading-snug text-[#FFE8C7] md:text-4xl">
        {children}
      </p>
      {note && (
        <p className="mx-auto mt-4 max-w-xl text-base text-[#FFE8C7]/85 md:text-lg">{note}</p>
      )}
    </div>
  );
}
