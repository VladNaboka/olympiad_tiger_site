import { apiRequest } from "./base_api";

/**
 * Зарегистрировать нового пользователя
 * @param {object} userData - данные пользователя
 * @returns {object} - созданный пользователь с токеном
 */
export function registerUser(userData) {
    return apiRequest("/register", "POST", userData);
}

/**
 * Авторизация по email и паролю
 * @param {object} credentials - { email, password }
 * @returns {object} - пользователь с токеном
 */
export function loginUser(credentials) {
    return apiRequest("/login", "POST", credentials);
}

/**
 * Авторизация по токену
 * @param {string} token - токен пользователя
 * @returns {object} - пользователь
 */
export function authWithToken(token) {
    return apiRequest("/auth", "POST", { token });
}

/**
 * Удаление пользователя по ID
 * @param {number} userId
 * @returns {void}
 */
export function deleteUser(userId) {
    return apiRequest("/users/delete", "DELETE", { id: userId });
}

/**
 * Обновление ФИО пользователя
 * @param {number} userId
 * @param {string} newName
 * @returns {void}
 */
export function updateUserName(userId, newName) {
    return apiRequest("/users/update-name", "PUT", {
        id: userId,
        full_name: newName,
    });
}
