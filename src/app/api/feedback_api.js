import { apiRequest } from "./base_api";

/**
 * Отправить фидбек
 * @param {object} data - объект с полями: name, email, message
 */
export function sendFeedback(data) {
    return apiRequest("/feedback", "POST", data);
}

/**
 * Получить список всех фидбеков
 */
export function getAllFeedback() {
    return apiRequest("/feedback", "GET");
}

/**
 * Получить один фидбек по ID
 * @param {number|string} id
 */
export function getFeedbackById(id) {
    return apiRequest(`/feedback/${id}`, "GET");
}

/**
 * Удалить фидбек по ID
 * @param {number|string} id
 */
export function deleteFeedback(id) {
    return apiRequest(`/feedback/${id}`, "DELETE");
}
