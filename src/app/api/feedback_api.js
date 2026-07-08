import { apiRequest } from "./base_api";

/**
 * Создать новый фидбек. Публичный эндпоинт (форма обратной связи).
 * @param {Object} feedback - { name, email, subject, message }
 * @returns {Promise<Object>}
 */
export async function createFeedback(feedback) {
  if (!feedback?.name || !feedback?.email || !feedback?.message) {
    throw new Error("Name, email, and message are required");
  }

  return await apiRequest("/feedback", "POST", feedback);
}

/**
 * Получить список всех фидбеков. Требует авторизации.
 * @returns {Promise<Array>}
 */
export async function getAllFeedback() {
  const data = await apiRequest("/feedback", "GET");
  return Array.isArray(data) ? data : [];
}

/**
 * Получить фидбек по ID. Требует авторизации.
 * @param {number|string} id
 * @returns {Promise<Object>}
 */
export async function getFeedbackById(id) {
  const feedbackId = parseInt(id, 10);
  if (isNaN(feedbackId)) {
    throw new Error("Feedback ID must be a number");
  }
  return await apiRequest(`/feedback/${feedbackId}`, "GET");
}

/**
 * Удалить фидбек по ID. Требует авторизации.
 * @param {number|string} id
 * @returns {Promise<boolean>}
 */
export async function deleteFeedback(id) {
  const feedbackId = parseInt(id, 10);
  if (isNaN(feedbackId)) {
    throw new Error("Feedback ID must be a number");
  }
  await apiRequest(`/feedback/${feedbackId}`, "DELETE");
  return true;
}
