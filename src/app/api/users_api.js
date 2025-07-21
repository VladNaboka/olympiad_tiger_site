import { apiRequest } from "./base_api";

/**
 * Получить всех пользователей, у которых роль не 'owner'
 * @returns {object[]} - список пользователей (админы, учителя и др.)
 */
export function getAdminsAndTeachers() {
    return apiRequest("/users");
}

/**
 * Получить всех учителей по стране (role = 'teacher')
 * @param {string} country - название страны
 * @returns {object[]} - список учителей из указанной страны
 */
export function getTeachersByCountry(country) {
    return apiRequest("/users/country", "POST", { country });
}
