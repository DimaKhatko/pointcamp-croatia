import { useEffect, useState } from "react";
import { getKyivDateString, getPriceState } from "./pricing";
import type { PriceState } from "./pricing";

/**
 * The current price tier from the real date in Europe/Kyiv, or null until the
 * component has mounted. The page is built long before it is visited, so the
 * tier is never baked into the HTML: the server/first render must show a
 * neutral skeleton (same size as the content) and the tier appears after mount,
 * which keeps hydration identical and the layout from shifting.
 */
export function usePriceState(): PriceState | null {
  const [state, setState] = useState<PriceState | null>(null);
  useEffect(() => {
    setState(getPriceState(getKyivDateString()));
  }, []);
  return state;
}
