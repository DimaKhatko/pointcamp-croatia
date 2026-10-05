/**
 * Price ladder for the 2027 Croatia camp: the one place to change prices or
 * switch dates. Dates are calendar days in Europe/Kyiv ("YYYY-MM-DD", compared as
 * strings), both ends inclusive.
 *
 * The current tier is always worked out on the client from the real date (see
 * DatesPricing); the JSON-LD offer in src/routes/index.tsx uses the build-time
 * tier, so the site must be rebuilt and redeployed on every switch date.
 */

export type PriceTier = {
  /** First day of the tier, or null for the first tier. */
  start: string | null;
  /** Last day of the tier, or null for the last tier (it stays in force). */
  end: string | null;
  /** Price in euro. */
  price: number;
  /** Presale for returning participants only (no returning discount on top). */
  returningOnly?: boolean;
};

export const TIERS: readonly PriceTier[] = [
  { start: null, end: "2026-10-31", price: 1300, returningOnly: true },
  { start: "2026-11-01", end: "2026-12-31", price: 1450 },
  { start: "2027-01-01", end: "2027-04-30", price: 1550 },
  { start: "2027-05-01", end: null, price: 1650 },
];

/** Returning participants: this much off the current price (from Nov 1). Not stackable. */
export const RETURNING_DISCOUNT = 100;

export type PriceState = {
  price: number;
  /** Last day of the current tier, or null on the last tier. */
  end: string | null;
  returningOnly: boolean;
  /** The tier that follows, or null on the last tier. */
  next: { start: string; price: number } | null;
};

const KYIV_ZONES = ["Europe/Kyiv", "Europe/Kiev"]; // older ICU only knows the second name

/** Today's calendar date in Europe/Kyiv as "YYYY-MM-DD" (no manual UTC offsets). */
export function getKyivDateString(now: Date = new Date()): string {
  for (const timeZone of KYIV_ZONES) {
    try {
      const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).formatToParts(now);
      const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
      return `${get("year")}-${get("month")}-${get("day")}`;
    } catch {
      // try the next zone name
    }
  }
  return now.toISOString().slice(0, 10);
}

export function getPriceState(kyivDate: string): PriceState {
  let i = TIERS.length - 1;
  for (let k = 0; k < TIERS.length; k++) {
    const end = TIERS[k].end;
    if (end === null || kyivDate <= end) {
      i = k;
      break;
    }
  }
  const tier = TIERS[i];
  const nextTier = TIERS[i + 1];
  return {
    price: tier.price,
    end: tier.end,
    returningOnly: tier.returningOnly === true,
    next: nextTier && nextTier.start ? { start: nextTier.start, price: nextTier.price } : null,
  };
}

/** 1300 -> "1 300 €" (no-break spaces, so the amount never wraps). */
export function formatPrice(amount: number): string {
  const digits = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${digits} €`;
}

const MONTHS_GENITIVE = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
];

/** "2026-10-31" -> "31 жовтня"; "2027-01-01" -> "1 січня" (no leading zero, no-break space). */
export function formatUkDate(isoDate: string): string {
  const [, month, day] = isoDate.split("-").map(Number);
  return `${day} ${MONTHS_GENITIVE[month - 1]}`;
}

/** Short qualifier shown next to the presale price (it is for returning participants only). */
export const PRESALE_QUALIFIER = "для своїх";

/** "1 300 € · для своїх" during the presale, plain "1 450 €" afterwards. */
export function priceChipLabel(state: PriceState): string {
  const price = formatPrice(state.price);
  return state.returningOnly ? `${price} · ${PRESALE_QUALIFIER}` : price;
}

/**
 * The price that may be published to crawlers (JSON-LD offers). The presale price
 * is never exposed: until the presale ends the offer is the first public tier,
 * valid from its start date; afterwards it is simply the current tier.
 */
export function getPublicOffer(kyivDate: string): { price: number; validFrom?: string } {
  const state = getPriceState(kyivDate);
  if (state.returningOnly && state.next) {
    return { price: state.next.price, validFrom: state.next.start };
  }
  return { price: state.price };
}
