// TODO: Change to render or from VPS-host
const API_URL = "https://tigerbackend.onrender.com:8080";

/**
 * Вспомогательная функция для отправки запросов к API.
 * 
 * @param {string} endpoint - Путь к API.
 * @param {string} method - HTTP метод (GET, POST, PUT, DELETE).
 * @param {object} [body=null] - Данные для отправки (для POST и PUT запросов).
 * @returns {object} - Ответ сервера, преобразованный в формат JSON.
 */
async function apiRequest(endpoint, method = "GET", body = null) {
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
    };
    
    if (body) {
        options.body = JSON.stringify(body);
    }
    
    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Ошибка запроса:", error);
    }
}

// Функции для работы с API

/**
 * Получить всех администраторов и учителей.
 * 
 * @returns {object[]} - Список пользователей с ролями, отличными от 'owner'.
 * @example
 * const users = await getAdminAndTeachers();
 * console.log(users);
 */
function getAdminAndTeachers() {
    return apiRequest("/users");
}

/**
 * Получить учителей по стране.
 * 
 * @param {string} country - Страна, по которой нужно получить учителей.
 * @returns {object[]} - Список учителей из указанной страны.
 * @example
 * const teachers = await getTeachersByCountry('Россия');
 * console.log(teachers);
 */
function getTeachersByCountry(country) {
    return apiRequest("/users/country", "POST", { country });
}

/**
 * Зарегистрировать нового пользователя.
 * 
 * @param {object} userData - Данные пользователя для регистрации (например, имя, email, пароль).
 * @returns {object} - Ответ от сервера (успех или ошибка).
 * @example
 * const userData = {
 *   full_name: 'Иван Иванов',
 *   email: 'ivan.ivanov@example.com',
 *   password: 'password123',
 *   country: 'Россия',
 *   city: 'Москва',
 *   school: 'Школа №1',
 *   role: 'teacher'
 * };
 * const response = await registerUser(userData);
 * console.log(response);
 */
function registerUser(userData) {
    return apiRequest("/register", "POST", userData);
}

/**
 * Войти в систему.
 * 
 * @param {object} credentials - Данные для входа (email и пароль).
 * @returns {object} - Ответ от сервера (например, токен аутентификации).
 * @example
 * const credentials = { email: 'ivan.ivanov@example.com', password: 'password123' };
 * const response = await loginUser(credentials);
 * console.log(response);
 */
function loginUser(credentials) {
    return apiRequest("/login", "POST", credentials);
}

/**
 * Удалить пользователя по его ID.
 * 
 * @param {number} userId - ID пользователя, которого нужно удалить.
 * @returns {object} - Ответ от сервера (успех или ошибка).
 * @example
 * const response = await deleteUser(1);
 * console.log(response);
 */
function deleteUser(userId) {
    return apiRequest(`/users/delete/${userId}`, "DELETE");
}

/**
 * Добавить нового студента.
 * 
 * @param {object} studentData - Данные студента для добавления (например, имя, возраст, школа).
 * @returns {object} - Ответ от сервера (успех или ошибка).
 * @example
 * const studentData = { name: 'Алексей Смирнов', age: 14, school: 'Школа №1' };
 * const response = await addStudent(studentData);
 * console.log(response);
 */
function addStudent(studentData) {
    return apiRequest("/students/add", "POST", studentData);
}

/**
 * Получить студентов по имени школы.
 * 
 * @param {string} schoolName - Название школы для фильтрации студентов.
 * @returns {object[]} - Список студентов, обучающихся в указанной школе.
 * @example
 * const students = await getStudentsBySchool('Школа №1');
 * console.log(students);
 */
function getStudentsBySchool(schoolName) {
    return apiRequest("/students/school", "POST", { school: schoolName });
}

/**
 * Обновить данные студента.
 * 
 * @param {object} studentData - Данные студента для обновления (например, имя, возраст).
 * @returns {object} - Ответ от сервера (успех или ошибка).
 * @example
 * const studentData = { id: 1, name: 'Алексей Петров', age: 15 };
 * const response = await updateStudent(studentData);
 * console.log(response);
 */
function updateStudent(studentData) {
    return apiRequest("/students/update", "PUT", studentData);
}

/**
 * Удалить студента по его ID.
 * 
 * @param {number} studentId - ID студента, которого нужно удалить.
 * @returns {object} - Ответ от сервера (успех или ошибка).
 * @example
 * const response = await deleteStudent(1);
 * console.log(response);
 */
function deleteStudent(studentId) {
    return apiRequest(`/students/delete/${studentId}`, "DELETE");
}
