import { apiRequest } from "./base_api";

/**
 * Добавить нового студента
 * @param {object} student - объект студента
 * @returns {object} - добавленный студент с ID
 */
export function addStudent(student) {
    console.log('🔄 addStudent called with:', student);
    
    const requiredFields = ['name', 'birth_date', 'school', 'phone', 'email', 'country', 'city', 'course_id', 'category_id'];
    const missingFields = requiredFields.filter(field => !student[field]);
    
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    // Подготавливаем данные согласно новой API структуре
    const apiData = {
        name: student.name, // Изменено с full_name на name
        birth_date: student.birth_date,
        school: student.school,
        phone: student.phone,
        email: student.email,
        country: student.country,
        city: student.city,
        course_id: parseInt(student.course_id),
        category_id: parseInt(student.category_id)
    };
    
    console.log('📤 Sending to API /students/add:', apiData);
    
    return apiRequest("/students/add", "POST", apiData)
        .then(response => {
            console.log('✅ Add student API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Add student API error:', error);
            throw error;
        });
}

/**
 * Получить студента по ID
 * @param {number} studentId - ID студента
 * @returns {object} - объект студента
 */
export function getStudentById(studentId) {
    console.log('🔄 getStudentById called with ID:', studentId);
    
    return apiRequest(`/students/${studentId}`)
        .then(response => {
            console.log('✅ Get student API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Get student API error:', error);
            throw error;
        });
}

/**
 * Получить всех студентов по стране
 * @param {string} country - страна
 * @returns {object[]} - массив студентов
 */
export function getStudentsByCountry(country) {
    console.log('🔄 getStudentsByCountry called with country:', country);
    
    if (!country) {
        throw new Error('Country is required');
    }
    
    return apiRequest(`/students/country?country=${encodeURIComponent(country)}`)
        .then(response => {
            console.log('✅ Get students by country API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Get students by country API error:', error);
            throw error;
        });
}

/**
 * Получить студентов с фильтрами
 * @param {object} filters - { country, course_id, category_id }
 * @returns {object[]} - массив студентов
 */
export function getStudentsByFilters(filters) {
    console.log('🔄 getStudentsByFilters called with:', filters);
    
    const apiData = {
        country: filters.country,
        course_id: filters.course_id ? parseInt(filters.course_id) : undefined,
        category_id: filters.category_id ? parseInt(filters.category_id) : undefined
    };
    
    // Убираем undefined значения
    Object.keys(apiData).forEach(key => {
        if (apiData[key] === undefined) {
            delete apiData[key];
        }
    });
    
    console.log('📤 Sending to API /students/filter:', apiData);
    
    return apiRequest("/students/filter", "POST", apiData)
        .then(response => {
            console.log('✅ Get students by filters API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Get students by filters API error:', error);
            throw error;
        });
}

/**
 * Обновить данные студента
 * @param {object} student - объект студента (включая ID)
 * @returns {object}
 */
export function updateStudent(student) {
    console.log('🔄 updateStudent called with:', student);
    
    if (!student.id) {
        throw new Error('Student ID is required for update');
    }
    
    const apiData = {
        id: student.id,
        name: student.name,
        birth_date: student.birth_date,
        school: student.school,
        phone: student.phone,
        email: student.email,
        country: student.country,
        city: student.city,
        course_id: parseInt(student.course_id),
        category_id: parseInt(student.category_id)
    };
    
    console.log('📤 Sending to API /students/update:', apiData);
    
    return apiRequest("/students/update", "PUT", apiData)
        .then(response => {
            console.log('✅ Update student API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Update student API error:', error);
            throw error;
        });
}

/**
 * Удалить студента по ID
 * @param {number} studentId
 * @returns {object}
 */
export function deleteStudent(studentId) {
    console.log('🔄 deleteStudent called with ID:', studentId);
    
    if (!studentId) {
        throw new Error('Student ID is required');
    }
    
    return apiRequest(`/students/delete/${studentId}`, "DELETE")
        .then(response => {
            console.log('✅ Delete student API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Delete student API error:', error);
            throw error;
        });
}

/**
 * Получить общее количество студентов
 * @returns {Promise<{total_students: number}>}
 */
export function getStudentsCount() {
    console.log('🔄 getStudentsCount called');

    return apiRequest("/students/count")
        .then(response => {
            console.log('✅ Get students count API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Get students count API error:', error);
            throw error;
        });
}