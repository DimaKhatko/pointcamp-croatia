export const LANDING = "croatia";
export const WEBHOOK_URL = "https://hook.eu1.make.com/29wyg57rzqxtajir3fw537ce1vrs2ev2";

export interface LeadData {
  name: string;
  phone: string;
  email: string;
  participant: string;
}

export interface SendResult {
  ok: boolean;
  error?: string;
}

const RETRY_DELAY_MS = 1500;

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function buildPayload(data: LeadData) {
  const params = new URLSearchParams(window.location.search);
  const utm = Object.fromEntries(UTM_KEYS.map((key) => [key, params.get(key) ?? ""]));
  return {
    landing: LANDING,
    name: data.name,
    phone: data.phone,
    email: data.email,
    participant: data.participant,
    page_url: window.location.href,
    ...utm,
    submitted_at: new Date().toISOString(),
    test: params.get("test") === "1",
  };
}

/** One POST attempt: resolves to null on a 2xx response, otherwise to an error message. */
async function post(body: string): Promise<string | null> {
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    return res.ok ? null : `Webhook responded with ${res.status}`;
  } catch (err) {
    return err instanceof Error ? err.message : "Network error";
  }
}

/**
 * Posts a lead to the Make webhook (one retry after 1.5 s). The `lead_submit` event
 * goes to `window.dataLayer` only after a confirmed 2xx, never on failure.
 */
export async function submitLead(data: LeadData): Promise<SendResult> {
  if (typeof window === "undefined") return { ok: false, error: "No window (SSR)" };

  const body = JSON.stringify(buildPayload(data));
  let error = await post(body);
  if (error !== null) {
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    error = await post(body);
  }
  if (error !== null) return { ok: false, error };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "lead_submit" });
  return { ok: true };
}
