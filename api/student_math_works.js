import { apiRequest } from "./baseApi";

/**
 * ➕ Добавить математическую работу
 * @param {object} data - { student_id, title, country, category_id }
 */
export function createMathWork(data) {
    return apiRequest("/mathworks", "POST", data);
}

/**
 * 🔄 Обновить математическую работу
 * @param {number|string} id 
 * @param {object} data - { student_id, title, country, category_id }
 */
export function updateMathWork(id, data) {
    return apiRequest(`/mathworks/${id}`, "PUT", data);
}

/**
 * ❌ Удалить математическую работу
 * @param {number|string} id 
 */
export function deleteMathWork(id) {
    return apiRequest(`/mathworks/${id}`, "DELETE");
}

/**
 * 🔍 Получить математическую работу по ID
 * @param {number|string} id 
 */
export function getMathWorkByID(id) {
    return apiRequest(`/mathworks/${id}`);
}

/**
 * 📥 Получить математические работы по стране и категории
 * @param {string} country 
 * @param {number} category_id 
 */
export function getMathWorksByCountryAndCategory(country, category_id) {
    return apiRequest(`/mathworks/filter`, "POST", { country, category_id });
}

/**
 * ✅ Поставить балл математической работе
 * @param {number|string} id 
 * @param {number} score 
 */
export function setMathWorkScore(id, score) {
    return apiRequest(`/mathworks/${id}/score`, "POST", { score });
}
