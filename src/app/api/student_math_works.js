import { apiRequest } from "./base_api";

/**
 * Создать математическую работу
 * @param {object} data - { student_id, title, country, category_id }
 */
export function createMathWork(data) {
    console.log('🔄 createMathWork called with:', data);
    
    const requiredFields = ['student_id', 'title', 'country', 'category_id'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    const apiData = {
        student_id: parseInt(data.student_id),
        title: data.title,
        country: data.country,
        category_id: parseInt(data.category_id)
    };
    
    console.log('📤 Sending to API /mathworks:', apiData);
    
    return apiRequest("/mathworks", "POST", apiData)
        .then(response => {
            console.log('✅ Create math work API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Create math work API error:', error);
            throw error;
        });
}

/**
 * Обновить математическую работу
 * @param {number|string} id 
 * @param {object} data - { student_id, title, country, category_id }
 */
export function updateMathWork(id, data) {
    console.log('🔄 updateMathWork called with:', { id, data });
    
    const apiData = {
        student_id: parseInt(data.student_id),
        title: data.title,
        country: data.country,
        category_id: parseInt(data.category_id)
    };
    
    console.log('📤 Sending to API PUT /mathworks/' + id, apiData);
    
    return apiRequest(`/mathworks/${id}`, "PUT", apiData)
        .then(response => {
            console.log('✅ Update math work API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Update math work API error:', error);
            throw error;
        });
}

/**
 * Удалить математическую работу
 * @param {number|string} id 
 */
export function deleteMathWork(id) {
    console.log('🔄 deleteMathWork called with ID:', id);
    
    return apiRequest(`/mathworks/${id}`, "DELETE")
        .then(response => {
            console.log('✅ Delete math work API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Delete math work API error:', error);
            throw error;
        });
}

/**
 * Получить математическую работу по ID
 * @param {number|string} id 
 */
export function getMathWorkById(id) {
    console.log('🔄 getMathWorkById called with ID:', id);
    
    return apiRequest(`/mathworks/${id}`)
        .then(response => {
            console.log('✅ Get math work API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Get math work API error:', error);
            throw error;
        });
}

/**
 * Получить математические работы по стране и категории
 * @param {string} country 
 * @param {number} category_id 
 */
export function getMathWorksByCountryAndCategory(country, category_id) {
    console.log('🔄 getMathWorksByCountryAndCategory called with:', { country, category_id });
    
    const apiData = {
        country: country,
        category_id: parseInt(category_id)
    };
    
    console.log('📤 Sending to API /mathworks/filter:', apiData);
    
    return apiRequest("/mathworks/filter", "POST", apiData)
        .then(response => {
            console.log('✅ Get math works by filter API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Get math works by filter API error:', error);
            throw error;
        });
}

/**
 * Поставить балл математической работе
 * @param {number|string} id 
 * @param {number} score 
 */
export function setMathWorkScore(id, score) {
    console.log('🔄 setMathWorkScore called with:', { id, score });
    
    if (!id || score === undefined || score === null) {
        throw new Error('ID and score are required');
    }
    
    const apiData = {
        score: parseInt(score)
    };
    
    console.log('📤 Sending to API PUT /mathworks/' + id + '/score:', apiData);
    
    return apiRequest(`/mathworks/${id}/score`, "PUT", apiData)
        .then(response => {
            console.log('✅ Set math work score API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Set math work score API error:', error);
            throw error;
        });
}

/**
 * Получить общее количество математических работ
 * @returns {Promise<{total_math_works: number}>}
 */
export function getMathWorksCount() {
    console.log('🔄 getMathWorksCount called');

    return apiRequest("/mathworks/count")
        .then(response => {
            console.log('✅ Get math works count API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Get math works count API error:', error);
            throw error;
        });
}