export interface TelegramFormValues {
  name: string;
  email: string;
  phone: string;
  promo?: string;
  details?: string;
}

/**
 * Sends a Croatia application to Telegram via the Bot API.
 *
 * This is a static SPA with no backend, so the POST happens straight from the
 * browser — Telegram's Bot API allows cross-origin requests. Plain text only
 * (no parse_mode), so anything the user types is safe and never needs escaping.
 */
export async function sendToTelegram(values: TelegramFormValues) {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error(
      "Telegram is not configured: set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID."
    );
  }

  const text = [
    "😌 New PoÏnter Alert",
    "",
    "🇭🇷 This is Croatia!",
    "",
    `👤 Ім'я: ${values.name}`,
    `📞 Телефон: ${values.phone}`,
    `✉️ E-mail: ${values.email}`,
    `🎟 Промокод: ${values.promo || "—"}`,
    `📝 Учасник: ${values.details || "—"}`,
    "",
    "Заявка Дэнс!",
    "ChaChing!",
  ].join("\n");

  const res = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    }
  );

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.ok) {
    throw new Error(
      `Telegram sendMessage failed${data?.description ? `: ${data.description}` : ""}`
    );
  }

  return { ok: true as const };
}
