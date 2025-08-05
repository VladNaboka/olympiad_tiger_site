// api/users.js
import { apiRequest } from "./base_api";

/**
 * Получить всех пользователей, кроме владельцев (role !== 'owner')
 * @returns {Promise<object[]>} Массив пользователей
 */
export async function getAdminsAndTeachers() {
  try {
    const data = await apiRequest("/users", "GET");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Ошибка при получении админов и учителей:", error);
    return [];
  }
}

/**
 * Получить всех учителей по стране
 * @param {string} country - Название страны (например, "Kazakhstan")
 * @returns {Promise<object[]>} Массив учителей из указанной страны
 */
export async function getTeachersByCountry(country) {
  if (!country) {
    console.warn("getTeachersByCountry: страна не указана");
    return [];
  }

  try {
    const data = await apiRequest("/users/country", "POST", { country });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(`Ошибка при получении учителей из страны ${country}:`, error);
    return [];
  }
}

/**
 * Получить общее количество пользователей
 * @returns {Promise<{total_users: number}>}
 */
export function getUsersCount() {
    console.log('🔄 getUsersCount called');

    return apiRequest("/users/count")
        .then(response => {
            console.log('✅ Get users count API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Get users count API error:', error);
            throw error;
        });
}

