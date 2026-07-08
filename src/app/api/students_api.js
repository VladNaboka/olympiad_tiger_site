import { apiRequest } from "./base_api";

/**
 * Добавить нового студента. Публичный эндпоинт подачи.
 * @param {object} student - объект студента
 * @returns {object} - добавленный студент с ID
 */
export function addStudent(student) {
    const requiredFields = ['id', 'name', 'birth_date', 'school', 'phone', 'email', 'country', 'city', 'course_id', 'category_id'];
    const missingFields = requiredFields.filter(field => !student[field]);

    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    return apiRequest("/students/add", "POST", {
        id: student.id,
        name: student.name,
        birth_date: student.birth_date,
        school: student.school,
        phone: student.phone,
        email: student.email,
        country: student.country,
        city: student.city,
        course_id: parseInt(student.course_id),
        category_id: parseInt(student.category_id),
    });
}

/**
 * Получить студента по ID. Содержит ПДн — требует авторизации.
 * @param {number} studentId
 */
export function getStudentById(studentId) {
    return apiRequest(`/students/${studentId}`);
}

/**
 * Получить всех студентов по стране. Содержит ПДн — требует авторизации.
 * @param {string} country
 */
export function getStudentsByCountry(country) {
    if (!country) {
        throw new Error('Country is required');
    }
    return apiRequest(`/students/country?country=${encodeURIComponent(country)}`);
}

/**
 * Получить студентов с фильтрами.
 * @param {object} filters - { country, course_id, category_id }
 */
export function getStudentsByFilters(filters) {
    const apiData = {
        country: filters.country,
        course_id: filters.course_id ? parseInt(filters.course_id) : undefined,
        category_id: filters.category_id ? parseInt(filters.category_id) : undefined,
    };

    Object.keys(apiData).forEach(key => {
        if (apiData[key] === undefined) {
            delete apiData[key];
        }
    });

    return apiRequest("/students/filter", "POST", apiData);
}

/**
 * Обновить данные студента. Требует авторизации.
 * @param {object} student - объект студента (включая ID)
 */
export function updateStudent(student) {
    if (!student.id) {
        throw new Error('Student ID is required for update');
    }

    return apiRequest("/students/update", "PUT", {
        id: student.id,
        name: student.name,
        birth_date: student.birth_date,
        school: student.school,
        phone: student.phone,
        email: student.email,
        country: student.country,
        city: student.city,
        course_id: parseInt(student.course_id),
        category_id: parseInt(student.category_id),
    });
}

/**
 * Удалить студента по ID. Требует авторизации.
 * @param {number} studentId
 */
export function deleteStudent(studentId) {
    if (!studentId) {
        throw new Error('Student ID is required');
    }
    return apiRequest(`/students/delete/${studentId}`, "DELETE");
}

/**
 * Получить общее количество студентов. Публичный агрегат.
 * @returns {Promise<{total_students: number}>}
 */
export function getStudentsCount() {
    return apiRequest("/students/count");
}
