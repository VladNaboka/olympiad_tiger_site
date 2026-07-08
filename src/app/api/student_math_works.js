import { apiRequest } from "./base_api";

/**
 * Создать математическую работу. Публичный эндпоинт подачи.
 * @param {object} data - { student_id, title, country, category_id }
 */
export function createMathWork(data) {
    const requiredFields = ['student_id', 'title', 'country', 'category_id'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    return apiRequest("/mathworks", "POST", {
        student_id: data.student_id,
        title: data.title,
        country: data.country,
        category_id: parseInt(data.category_id),
    });
}

/**
 * Обновить математическую работу. Требует авторизации.
 * @param {number|string} id
 * @param {object} data - { student_id, title, country, category_id }
 */
export function updateMathWork(id, data) {
    return apiRequest(`/mathworks/${id}`, "PUT", {
        student_id: parseInt(data.student_id),
        title: data.title,
        country: data.country,
        category_id: parseInt(data.category_id),
    });
}

/**
 * Удалить математическую работу. Требует авторизации.
 * @param {number|string} id
 */
export function deleteMathWork(id) {
    return apiRequest(`/mathworks/${id}`, "DELETE");
}

/**
 * Получить математическую работу по ID.
 * @param {number|string} id
 */
export function getMathWorkById(id) {
    return apiRequest(`/mathworks/${id}`);
}

/**
 * Получить все математические работы без фильтра по стране.
 */
export function getAllMathWorks() {
    return apiRequest("/mathworks/all", "GET");
}

/**
 * Получить математические работы по стране и категории.
 * @param {string} country
 * @param {number} category_id
 */
export function getMathWorksByCountryAndCategory(country, category_id) {
    return apiRequest("/mathworks/filter", "POST", {
        country,
        category_id: parseInt(category_id),
    });
}

/**
 * Поставить балл математической работе. Требует авторизации.
 * @param {number|string} id
 * @param {number} score
 */
export function setMathWorkScore(id, score) {
    if (!id || score === undefined || score === null) {
        throw new Error('ID and score are required');
    }
    return apiRequest(`/mathworks/${id}/score`, "PUT", { score: parseInt(score) });
}

/**
 * Получить общее количество математических работ. Публичный агрегат.
 * @returns {Promise<{total_math_works: number}>}
 */
export function getMathWorksCount() {
    return apiRequest("/mathworks/count");
}

/**
 * Получить все математические работы по стране, перебирая категории.
 * @param {string} country
 */
export async function getAllMathWorksByCountry(country) {
    const allMathworks = [];
    for (let categoryId = 1; categoryId <= 3; categoryId++) {
        try {
            const mathworks = await getMathWorksByCountryAndCategory(country, categoryId);
            if (mathworks && mathworks.length > 0) {
                allMathworks.push(...mathworks);
            }
        } catch {
            // Категория без работ — пропускаем.
        }
    }
    return allMathworks;
}

/**
 * Получить все математические работы по стране (без фильтрации по категориям).
 * @param {string} country
 */
export function getMathWorksByCountry(country) {
    if (!country) {
        throw new Error('Country is required');
    }
    return apiRequest("/mathworks/country", "POST", { country });
}
