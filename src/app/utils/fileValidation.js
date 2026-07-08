// Ограничения на загружаемые изображения — согласованы с бэкендом:
// принимаются только JPG/PNG размером не более 5 МБ.
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
export const IMAGE_ACCEPT_ATTR = '.jpg,.jpeg,.png,image/jpeg,image/png';

/**
 * Проверяет изображение перед отправкой на сервер.
 * @param {File} file
 * @returns {{ isValid: boolean, error: string }}
 */
export function validateImageFile(file) {
    if (!file) {
        return { isValid: false, error: 'Please select a file' };
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase())) {
        return {
            isValid: false,
            error: 'Invalid file format. Only JPG and PNG files are allowed.',
        };
    }

    if (file.size > MAX_IMAGE_SIZE) {
        return {
            isValid: false,
            error: `File is too large. Maximum size is 5MB. Your file is ${(
                file.size /
                (1024 * 1024)
            ).toFixed(1)}MB.`,
        };
    }

    return { isValid: true, error: '' };
}
