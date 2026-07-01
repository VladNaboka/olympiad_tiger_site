import { API_URL, apiRequest } from "./base_api";

/**
 * Создать заявку на олимпиаду и получить ссылку на оплату FreedomPay.
 *
 * Тело ответа при ошибке приходит обычным текстом (не JSON), поэтому здесь
 * используется прямой fetch вместо apiRequest, чтобы достать текст ошибки.
 *
 * @param {Object} data - { full_name, email, phone, olympiad }
 * @param {"Math"|"Art"} data.olympiad
 * @returns {Promise<{ redirect_url: string, order_id: string }>}
 */
export async function registerOlympiad({ full_name, email, phone, olympiad }) {
  const res = await fetch(`${API_URL}/olympiad/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ full_name, email, phone, olympiad }),
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
