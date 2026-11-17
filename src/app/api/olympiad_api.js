import { API_URL, apiRequest } from "./base_api";

/**
 * Создать заявку на олимпиаду и получить параметры виджета TipTop Pay.
 *
 * Тело ответа при ошибке приходит обычным текстом (не JSON), поэтому здесь
 * используется прямой fetch вместо apiRequest, чтобы достать текст ошибки.
 *
 * @param {Object} data - { full_name, email, phone, olympiad, language, amount }
 * @param {"Math"|"Art"} data.olympiad
 * @param {"ru"|"en"} [data.language] - язык страницы: определяет язык виджета.
 * @param {number|string} data.amount - сумма в долларах (USD), которую выбрал
 *   пользователь; сервер проверяет диапазон (минимум 1 USD, максимума нет).
 * @returns {Promise<{ public_id: string, order_id: string, invoice_id: string,
 *   amount: number, currency: string, description: string, email: string,
 *   culture: string }>}
 */
export async function registerOlympiad({ full_name, email, phone, olympiad, language, amount }) {
  const res = await fetch(`${API_URL}/olympiad/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ full_name, email, phone, olympiad, language, amount }),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Failed to submit registration");
  }

  return await res.json();
}

/**
 * Получить список заявок для админки.
 * @param {""|"pending"|"paid"|"failed"} status - фильтр по статусу (пусто = все)
 * @returns {Promise<Array>}
 */
export async function getOlympiadRegistrations(status = "") {
  const endpoint = status
    ? `/olympiad/registrations?status=${encodeURIComponent(status)}`
    : "/olympiad/registrations";
  const data = await apiRequest(endpoint, "GET");
  return Array.isArray(data) ? data : [];
}

/**
 * Итоги по оплаченным заявкам для админки.
 * @returns {Promise<{ paid_count: number, totals: Array<{ currency: string, count: number, total: string }> }>}
 */
export async function getOlympiadSummary() {
  const data = await apiRequest("/olympiad/registrations/summary", "GET");
  return {
    paid_count: data?.paid_count ?? 0,
    totals: Array.isArray(data?.totals) ? data.totals : [],
  };
}
