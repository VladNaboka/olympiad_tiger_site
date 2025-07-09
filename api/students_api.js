import { apiRequest } from "./baseApi"; // вынеси apiRequest в baseApi.js или оставь здесь, если не модульный проект

/**
 * Добавить нового ученика
 * @param {object} student - объект ученика
 * @returns {object} - добавленный ученик с ID
 */
export function addStudent(student) {
    return apiRequest("/students/add", "POST", student);
}

/**
 * Получить ученика по ID
 * @param {number} studentId - ID ученика
 * @returns {object} - объект ученика
 */
export function getStudentById(studentId) {
    return apiRequest(`/students/${studentId}`);
}

/**
 * Получить всех учеников по стране
 * @param {string} country - страна
 * @returns {object[]} - массив учеников
 */
export function getStudentsByCountry(country) {
    return apiRequest(`/students/country?country=${encodeURIComponent(country)}`);
}

/**
 * Получить всех учеников по направлению (course_id)
 * @param {number} courseId
 * @returns {object[]} - массив учеников
 */
export function getStudentsByCourse(courseId) {
    return apiRequest(`/students/course?course_id=${encodeURIComponent(courseId)}`);
}

/**
 * Получить всех учеников по школе
 * @param {string} schoolName
 * @returns {object[]} - массив учеников
 */
export function getStudentsBySchool(schoolName) {
    return apiRequest("/students/school", "POST", { school: schoolName });
}

/**
 * Получить учеников по стране + направлению + категории
 * @param {object} filters - { country, course_id, category_id }
 * @returns {object[]} - массив учеников
 * @example
 * getStudentsByFilters({ country: "Казахстан", course_id: 1, category_id: 2 });
 */
export function getStudentsByFilters(filters) {
    return apiRequest("/students/filter", "POST", filters);
}

/**
 * Обновить данные ученика
 * @param {object} student - объект ученика (включая ID)
 * @returns {void}
 */
export function updateStudent(student) {
    return apiRequest("/students/update", "PUT", student);
}

/**
 * Удалить ученика по ID
 * @param {number} studentId
 * @returns {void}
 */
export function deleteStudent(studentId) {
    return apiRequest(`/students/delete/${studentId}`, "DELETE");
}
