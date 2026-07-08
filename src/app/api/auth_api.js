import { apiRequest } from "./base_api";

// Минимальная длина пароля — согласована с бэкендом (иначе 400).
export const MIN_PASSWORD_LENGTH = 8;

/**
 * Зарегистрировать нового пользователя (региональный представитель).
 * Роль назначается на бэкенде — role_id клиентом НЕ отправляется.
 * @param {object} userData - { full_name, email, password, country, phone }
 * @returns {object} - созданный пользователь с токеном
 */
export function registerUser(userData) {
    const requiredFields = ['full_name', 'email', 'password', 'country', 'phone'];
    const missingFields = requiredFields.filter(field => !userData[field]);

    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    if (userData.password.length < MIN_PASSWORD_LENGTH) {
        throw new Error(`Пароль должен быть не короче ${MIN_PASSWORD_LENGTH} символов`);
    }

    // role_id намеренно не передаём — сервер его игнорирует и назначает роль сам.
    const apiData = {
        full_name: userData.full_name,
        email: userData.email,
        password: userData.password,
        country: userData.country,
        phone: userData.phone,
    };

    return apiRequest("/register", "POST", apiData);
}

/**
 * Авторизация по email и паролю.
 * @param {object} credentials - { email, password }
 * @returns {object} - пользователь с токеном
 */
export function loginUser(credentials) {
    if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
    }

    return apiRequest("/login", "POST", {
        email: credentials.email,
        password: credentials.password,
    });
}

/**
 * Авторизация по токену.
 * @param {string} token - токен пользователя
 * @returns {object} - пользователь
 */
export function authWithToken(token) {
    if (!token) {
        throw new Error('Token is required');
    }

    return apiRequest("/auth", "POST", { token });
}

/**
 * Удаление пользователя по ID. Требует роль owner (иначе 403).
 * @param {number} userId
 */
export function deleteUser(userId) {
    if (!userId) {
        throw new Error('User ID is required');
    }

    return apiRequest("/users/delete", "DELETE", { id: userId });
}

/**
 * Обновление данных пользователя (частичное). Свой аккаунт — сам,
 * чужой — только owner (иначе 403).
 * @param {number} id - ID пользователя (обязательно)
 * @param {string} [full_name]
 * @param {string} [email]
 * @param {string} [password]
 * @param {string} [country]
 * @param {string} [phone]
 * @param {number} [role_id]
 * @returns {Promise<object>}
 */
export function updateUser(id, full_name, email, password, country, phone, role_id) {
    if (!id) {
        throw new Error('User ID is required');
    }

    if (password !== undefined && password.length < MIN_PASSWORD_LENGTH) {
        throw new Error(`Пароль должен быть не короче ${MIN_PASSWORD_LENGTH} символов`);
    }

    // Формируем объект только с переданными значениями.
    const updateData = { id };
    if (full_name !== undefined) updateData.full_name = full_name;
    if (email !== undefined) updateData.email = email;
    if (password !== undefined) updateData.password = password;
    if (country !== undefined) updateData.country = country;
    if (phone !== undefined) updateData.phone = phone;
    if (role_id !== undefined) updateData.role_id = role_id;

    return apiRequest("/users/update", "PUT", updateData);
}
