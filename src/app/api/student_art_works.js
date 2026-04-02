import { API_URL } from "./base_api";

/**
 * Загрузка художественной работы (с файлом)
 * @param {FormData} formData - данные формы с полями: student_id, title, country, category_id, file
 */
export function uploadArtWork(formData) {
    console.log('🔄 uploadArtWork called');
    
    // Логируем содержимое FormData
    for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
            console.log(`📤 FormData ${key}:`, value.name, value.size, 'bytes');
        } else {
            console.log(`📤 FormData ${key}:`, value);
        }
    }
    
    return fetch(`${API_URL}/artworks`, {
        method: "POST",
        body: formData, // НЕ устанавливаем Content-Type для FormData
    }).then((response) => {
        console.log('📡 Upload response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }
        
        return response.json();
    }).then((result) => {
        console.log('✅ Upload art work API response:', result);
        return result;
    }).catch((error) => {
        console.error('❌ Upload art work API error:', error);
        throw error;
    });
}

/**
 * Удалить художественную работу по ID
 * @param {number|string} id 
 */
export function deleteArtWork(id) {
    console.log('🔄 deleteArtWork called with ID:', id);
    
    return fetch(`${API_URL}/artworks/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => {
        console.log('📡 Delete response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Delete failed: ${response.status} ${response.statusText}`);
        }
        
        // Проверяем есть ли контент для парсинга
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        } else {
            return { success: true };
        }
    }).then((result) => {
        console.log('✅ Delete art work API response:', result);
        return result;
    }).catch((error) => {
        console.error('❌ Delete art work API error:', error);
        throw error;
    });
}

/**
 * Обновить художественную работу
 * @param {number|string} id 
 * @param {object} data 
 */
export function updateArtWork(id, data) {
    console.log('🔄 updateArtWork called with:', { id, data });
    
    return fetch(`${API_URL}/artworks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }).then((response) => {
        console.log('📡 Update response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Update failed: ${response.status} ${response.statusText}`);
        }
        
        return response.json();
    }).then((result) => {
        console.log('✅ Update art work API response:', result);
        return result;
    }).catch((error) => {
        console.error('❌ Update art work API error:', error);
        throw error;
    });
}

/**
 * Получить художественную работу по ID
 * @param {number|string} id 
 */
export function getArtWorkById(id) {
    console.log('🔄 getArtWorkById called with ID:', id);
    
    return fetch(`${API_URL}/artworks/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response) => {
        console.log('📡 Get artwork response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Get artwork failed: ${response.status} ${response.statusText}`);
        }
        
        return response.json();
    }).then((result) => {
        console.log('✅ Get art work API response:', result);
        return result;
    }).catch((error) => {
        console.error('❌ Get art work API error:', error);
        throw error;
    });
}

/**
 * Получить все художественные работы без фильтра по стране
 */
export function getAllArtWorks() {
    return fetch(`${API_URL}/artworks/all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(`Get all artworks failed: ${response.status} ${response.statusText}`);
        }
        return response.json();
    }).catch((error) => {
        console.error('❌ Get all artworks error:', error);
        throw error;
    });
}

/**
 * Получить художественные работы по стране и категории
 * @param {string} country
 * @param {number} category_id
 */
export function getArtWorksByCountryAndCategory(country, category_id) {
    console.log('🔄 getArtWorksByCountryAndCategory called with:', { country, category_id });
    
    const apiData = {
        country: country,
        category_id: parseInt(category_id)
    };
    
    console.log('📤 Sending to API /artworks/filter:', apiData);
    
    return fetch(`${API_URL}/artworks/filter`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData)
    }).then((response) => {
        console.log('📡 Filter artworks response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Filter artworks failed: ${response.status} ${response.statusText}`);
        }
        
        return response.json();
    }).then((result) => {
        console.log('✅ Get art works by filter API response:', result);
        return result;
    }).catch((error) => {
        console.error('❌ Get art works by filter API error:', error);
        throw error;
    });
}

/**
 * Поставить балл художественной работе
 * @param {number|string} id 
 * @param {number} score 
 */
export function setArtWorkScore(id, score) {
    console.log('🔄 setArtWorkScore called with:', { id, score });
    
    if (!id || score === undefined || score === null) {
        throw new Error('ID and score are required');
    }
    
    const apiData = {
        score: parseInt(score)
    };
    
    console.log('📤 Sending to API PUT /artworks/' + id + '/score:', apiData);
    
    return fetch(`${API_URL}/artworks/${id}/score`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData)
    }).then((response) => {
        console.log('📡 Set artwork score response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Set artwork score failed: ${response.status} ${response.statusText}`);
        }
        
        return response.text().then(text => text ? JSON.parse(text) : {});
    }).then((result) => {
        console.log('✅ Set art work score API response:', result);
        return result;
    }).catch((error) => {
        console.error('❌ Set art work score API error:', error);
        throw error;
    });
}

/**
 * Получить общее количество арт-работ
 * @returns {Promise<{total_art_works: number}>}
 */
export function getArtWorksCount() {
    console.log('🔄 getArtWorksCount called');

    return apiRequest("/artworks/count")
        .then(response => {
            console.log('✅ Get art works count API response:', response);
            return response;
        })
        .catch(error => {
            console.error('❌ Get art works count API error:', error);
            throw error;
        });
}

// В student_art_works.js - функция для получения всех художественных работ по стране
export async function getAllArtWorksByCountry(country) {
    try {
        const allArtworks = [];
        // Загружаем работы для всех категорий
        for (let categoryId = 1; categoryId <= 3; categoryId++) {
            try {
                const artworks = await getArtWorksByCountryAndCategory(country, categoryId);
                if (artworks && artworks.length > 0) {
                    allArtworks.push(...artworks);
                }
            } catch (error) {
                console.warn(`No artworks for category ${categoryId} in ${country}:`, error);
                // Продолжаем загружать другие категории
            }
        }
        return allArtworks;
    } catch (error) {
        console.error('Error loading all artworks:', error);
        return [];
    }
}

/**
 * Получить все художественные работы по стране (без фильтрации по категориям)
 * @param {string} country 
 */
export function getArtWorksByCountry(country) {
    console.log('🔄 getArtWorksByCountry called with:', country);

    if (!country) {
        throw new Error('Country is required');
    }

    const apiData = { country };

    return fetch(`${API_URL}/artworks/country`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData)
    }).then((response) => {
        console.log('📡 Get artworks by country response status:', response.status);

        if (!response.ok) {
            throw new Error(`Get artworks by country failed: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }).then((result) => {
        console.log('✅ Get artworks by country API response:', result);
        return result;
    }).catch((error) => {
        console.error('❌ Get artworks by country API error:', error);
        throw error;
    });
}

/**
 * Обновить картинку художественной работы
 * @param {number|string} id 
 * @param {FormData} formData - данные формы (file обязателен)
 */
export function updateArtWorkImage(id, formData) {
    console.log('🔄 updateArtWorkImage called with ID:', id);

    // Логируем содержимое FormData
    for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
            console.log(`📤 FormData ${key}:`, value.name, value.size, 'bytes');
        } else {
            console.log(`📤 FormData ${key}:`, value);
        }
    }

    return fetch(`${API_URL}/artworks/${id}/image`, {
        method: "PUT",
        body: formData // НЕ ставим Content-Type
    }).then((response) => {
        console.log('📡 Update image response status:', response.status);

        if (!response.ok) {
            throw new Error(`Update image failed: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }).then((result) => {
        console.log('✅ Update artwork image API response:', result);
        return result;
    }).catch((error) => {
        console.error('❌ Update artwork image API error:', error);
        throw error;
    });
}
