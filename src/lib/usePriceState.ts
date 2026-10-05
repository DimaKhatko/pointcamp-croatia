import { useEffect, useState } from "react";
import { BUILD_DATE } from "./buildDate.generated";
import { getKyivDateString, getPriceState } from "./pricing";
import type { PriceState } from "./pricing";

/** The price tier current on the day the site was built (see scripts/write-build-date.mjs). */
const BUILD_STATE: PriceState = getPriceState(BUILD_DATE);

/**
 * The current price tier from the real date in Europe/Kyiv.
 *
 * The page is built long before it is visited, so the real tier is only known
 * after mount. Until then `state` is the build-day tier and `ready` is false: the
 * caller renders that tier's content as a skeleton (same markup, transparent
 * text), so it takes exactly the space the real content will take whenever the
 * site was rebuilt on the last switch date, and the server render and the first
 * client render stay identical. After mount `state` is the live tier; a shift
 * only happens if the site was not rebuilt after a switch date.
 */
export function usePriceState(): { state: PriceState; ready: boolean } {
  const [live, setLive] = useState<PriceState | null>(null);
  useEffect(() => {
    setLive(getPriceState(getKyivDateString()));
  }, []);
  return { state: live ?? BUILD_STATE, ready: live !== null };
}
