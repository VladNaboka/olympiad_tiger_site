import { apiRequest } from "./base_api";

/**
 * Зарегистрировать нового пользователя (региональный представитель)
 * @param {object} userData - данные пользователя
 * @returns {object} - созданный пользователь с токеном
 */
export function registerUser(userData) {
    console.log('🔄 registerUser called with:', userData);
    
    // Проверяем обязательные поля
    const requiredFields = ['full_name', 'email', 'password', 'country', 'phone'];
    const missingFields = requiredFields.filter(field => !userData[field]);
    
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Подготавливаем данные для отправки согласно новой API структуре
    const apiData = {
        full_name: userData.full_name,
        email: userData.email,
        password: userData.password,
        country: userData.country,
        phone: userData.phone,
        role_id: 2 // Всегда 2 для региональных представителей
    };
    
    console.log('📤 Sending to API /register:', apiData);
    
    return apiRequest("/register", "POST", apiData)
        .then(response => {
            console.log('✅ Register API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Register API error:', error);
            throw error;
        });
}

/**
 * Авторизация по email и паролю
 * @param {object} credentials - { email, password }
 * @returns {object} - пользователь с токеном
 */
export function loginUser(credentials) {
    console.log('🔄 loginUser called with email:', credentials.email);
    
    if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
    }
    
    const loginData = {
        email: credentials.email,
        password: credentials.password
    };
    
    console.log('📤 Sending to API /login:', { email: loginData.email, password: '***' });
    
    return apiRequest("/login", "POST", loginData)
        .then(response => {
            console.log('✅ Login API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Login API error:', error);
            throw error;
        });
}

/**
 * Авторизация по токену
 * @param {string} token - токен пользователя
 * @returns {object} - пользователь
 */
export function authWithToken(token) {
    console.log('🔄 authWithToken called with token:', token ? 'exists' : 'null');
    
    if (!token) {
        throw new Error('Token is required');
    }
    
    const authData = { token };
    
    console.log('📤 Sending to API /auth');
    
    return apiRequest("/auth", "POST", authData)
        .then(response => {
            console.log('✅ Auth API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Auth API error:', error);
            throw error;
        });
}

/**
 * Удаление пользователя по ID
 * @param {number} userId
 * @returns {object}
 */
export function deleteUser(userId) {
    console.log('🔄 deleteUser called with ID:', userId);
    
    if (!userId) {
        throw new Error('User ID is required');
    }
    
    const deleteData = { id: userId };
    
    console.log('📤 Sending to API DELETE /users/delete:', deleteData);
    
    return apiRequest("/users/delete", "DELETE", deleteData)
        .then(response => {
            console.log('✅ Delete user API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Delete user API error:', error);
            throw error;
        });
}

/**
 * Обновление данных пользователя (частичное)
 * @param {number} id - ID пользователя (обязательно)
 * @param {string} [full_name] - новое ФИО
 * @param {string} [email] - новый email
 * @param {string} [password] - новый пароль
 * @param {string} [country] - новая страна
 * @param {string} [phone] - новый телефон
 * @param {number} [role_id] - новая роль
 * @returns {Promise<object>}
 */
export function updateUser(id, full_name, email, password, country, phone, role_id) {
    console.log('🔄 updateUser called');

    if (!id) {
        throw new Error('User ID is required');
    }

    // Формируем объект только с переданными значениями
    const updateData = { id };
    if (full_name !== undefined) updateData.full_name = full_name;
    if (email !== undefined) updateData.email = email;
    if (password !== undefined) updateData.password = password;
    if (country !== undefined) updateData.country = country;
    if (phone !== undefined) updateData.phone = phone;
    if (role_id !== undefined) updateData.role_id = role_id;

    // Логируем без пароля
    const logData = { ...updateData };
    if (logData.password) logData.password = '***';
    console.log('📤 Sending to API PUT /users/update:', logData);

    return apiRequest("/users/update", "PUT", updateData)
        .then(response => {
            console.log('✅ Update user API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Update user API error:', error);
            throw error;
        });
}
