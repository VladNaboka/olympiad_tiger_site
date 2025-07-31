import { apiRequest } from "./base_api";

/**
 * Создать новый фидбек
 * @param {Object} feedback - { name: string, email: string, subject: string, message: string }
 * @returns {Promise<Object>}
 */
export async function createFeedback(feedback) {
  console.log("[API] Creating feedback:", feedback);

  if (!feedback?.name || !feedback?.email || !feedback?.message) {
    throw new Error("Name, email, and message are required");
  }

  return await apiRequest("/feedback", "POST", feedback);
}

/**
 * Получить список всех фидбеков
 * @returns {Promise<Array>}
 */
export async function getAllFeedback() {
  console.log("[API] Fetching all feedback...");
  const data = await apiRequest("/feedback", "GET");
  return Array.isArray(data) ? data : [];
}

/**
 * Получить фидбек по ID
 * @param {number|string} id
 * @returns {Promise<Object>}
 */
export async function getFeedbackById(id) {
  const feedbackId = parseInt(id, 10);
  if (isNaN(feedbackId)) {
    throw new Error("Feedback ID must be a number");
  }
  console.log(`[API] Fetching feedback by ID: ${feedbackId}`);
  return await apiRequest(`/feedback/${feedbackId}`, "GET");
}

/**
 * Удалить фидбек по ID
 * @param {number|string} id
 * @returns {Promise<boolean>} - true если удалено
 */
export async function deleteFeedback(id) {
  const feedbackId = parseInt(id, 10);
  if (isNaN(feedbackId)) {
    throw new Error("Feedback ID must be a number");
  }
  console.log(`[API] Deleting feedback ID: ${feedbackId}`);
  await apiRequest(`/feedback/${feedbackId}`, "DELETE");
  return true;
}
