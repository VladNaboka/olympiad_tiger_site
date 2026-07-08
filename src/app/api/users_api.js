// api/users.js
import { apiRequest } from "./base_api";

/**
 * Получить всех пользователей, кроме владельцев (role !== 'owner').
 * Содержит ПДн — требует авторизации.
 * @returns {Promise<object[]>} Массив пользователей
 */
export async function getAdminsAndTeachers() {
  try {
    const data = await apiRequest("/users", "GET");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Ошибка при получении админов и учителей:", error.message);
    return [];
  }
}

/**
 * Получить всех учителей по стране. Требует авторизации.
 * @param {string} country
 * @returns {Promise<object[]>}
 */
export async function getTeachersByCountry(country) {
  if (!country) {
    return [];
  }

  try {
    const data = await apiRequest("/users/country", "POST", { country });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Ошибка при получении учителей:", error.message);
    return [];
  }
}

/**
 * Получить общее количество пользователей. Публичный агрегат.
 * @returns {Promise<{total_users: number}>}
 */
export function getUsersCount() {
    return apiRequest("/users/count");
}
