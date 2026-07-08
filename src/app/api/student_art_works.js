import { apiRequest, apiUpload } from "./base_api";

/**
 * Загрузка художественной работы (с файлом). Публичный эндпоинт.
 * @param {FormData} formData - поля: student_id, title, country, category_id, file
 */
export function uploadArtWork(formData) {
    return apiUpload("/artworks", formData, "POST");
}

/**
 * Удалить художественную работу по ID. Требует авторизации.
 * @param {number|string} id
 */
export function deleteArtWork(id) {
    return apiRequest(`/artworks/${id}`, "DELETE");
}

/**
 * Обновить художественную работу. Требует авторизации.
 * @param {number|string} id
 * @param {object} data
 */
export function updateArtWork(id, data) {
    return apiRequest(`/artworks/${id}`, "PUT", data);
}

/**
 * Получить художественную работу по ID.
 * @param {number|string} id
 */
export function getArtWorkById(id) {
    return apiRequest(`/artworks/${id}`, "GET");
}

/**
 * Получить все художественные работы без фильтра по стране.
 */
export function getAllArtWorks() {
    return apiRequest("/artworks/all", "GET");
}

/**
 * Получить художественные работы по стране и категории.
 * @param {string} country
 * @param {number} category_id
 */
export function getArtWorksByCountryAndCategory(country, category_id) {
    return apiRequest("/artworks/filter", "POST", {
        country,
        category_id: parseInt(category_id),
    });
}

/**
 * Поставить балл художественной работе. Требует авторизации.
 * @param {number|string} id
 * @param {number} score
 */
export function setArtWorkScore(id, score) {
    if (!id || score === undefined || score === null) {
        throw new Error("ID and score are required");
    }
    return apiRequest(`/artworks/${id}/score`, "PUT", { score: parseInt(score) });
}

/**
 * Получить общее количество арт-работ. Публичный агрегат.
 * @returns {Promise<{total_art_works: number}>}
 */
export function getArtWorksCount() {
    return apiRequest("/artworks/count", "GET");
}

/**
 * Получить все художественные работы по стране, перебирая категории.
 * @param {string} country
 */
export async function getAllArtWorksByCountry(country) {
    const allArtworks = [];
    for (let categoryId = 1; categoryId <= 3; categoryId++) {
        try {
            const artworks = await getArtWorksByCountryAndCategory(country, categoryId);
            if (artworks && artworks.length > 0) {
                allArtworks.push(...artworks);
            }
        } catch {
            // Категория без работ — пропускаем и грузим дальше.
        }
    }
    return allArtworks;
}

/**
 * Получить все художественные работы по стране (без фильтрации по категориям).
 * @param {string} country
 */
export function getArtWorksByCountry(country) {
    if (!country) {
        throw new Error("Country is required");
    }
    return apiRequest("/artworks/country", "POST", { country });
}

/**
 * Обновить картинку художественной работы. Требует авторизации.
 * @param {number|string} id
 * @param {FormData} formData - file обязателен
 */
export function updateArtWorkImage(id, formData) {
    return apiUpload(`/artworks/${id}/image`, formData, "PUT");
}
