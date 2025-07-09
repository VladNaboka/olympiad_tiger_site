import { apiRequest } from "./baseApi";

/**
 * Загрузка художественной работы
 * @param {FormData} formData - данные формы с полями: student_id, title, country, category_id, file
 */
export function uploadArtWork(formData) {
    return fetch("/artworks", {
        method: "POST",
        body: formData,
    }).then((res) => {
        if (!res.ok) throw new Error("Ошибка загрузки работы");
        return res.json();
    });
}

/**
 * Удалить работу по ID
 * @param {number|string} id 
 */
export function deleteArtWork(id) {
    return apiRequest(`/artworks/${id}`, "DELETE");
}

/**
 * Обновить работу
 * @param {number|string} id 
 * @param {object} data 
 */
export function updateArtWork(id, data) {
    return apiRequest(`/artworks/${id}`, "PUT", data);
}

/**
 * Получить работу по ID
 * @param {number|string} id 
 */
export function getArtWorkByID(id) {
    return apiRequest(`/artworks/${id}`);
}

/**
 * Получить работы по стране и категории
 * @param {string} country 
 * @param {number} category_id 
 */
export function getArtWorksByCountryAndCategory(country, category_id) {
    return apiRequest(`/artworks/filter`, "POST", { country, category_id });
}

/**
 * Поставить балл работе
 * @param {number|string} id 
 * @param {number} score 
 */
export function setArtWorkScore(id, score) {
    return apiRequest(`/artworks/${id}/score`, "PUT", { score });
}
