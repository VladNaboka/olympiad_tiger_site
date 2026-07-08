// Защита от опасных схем в URL (javascript:, data:, vbscript:) для значений,
// пришедших с сервера/от пользователя (например, file_path картинки).
// Разрешаем только http/https и относительные пути; иначе — запасное изображение.
const SAFE_ABSOLUTE = /^https?:\/\//i;

/**
 * @param {string} url - исходный URL из API
 * @param {string} fallback - что вернуть, если URL небезопасен/пуст
 * @returns {string}
 */
export function safeImageUrl(url, fallback = "/image/artwork-sample.png") {
    if (typeof url !== "string") return fallback;

    const trimmed = url.trim();
    if (!trimmed) return fallback;

    // Относительные пути (/uploads/…, ./…, ../…) считаем безопасными.
    if (trimmed.startsWith("/") || trimmed.startsWith("./") || trimmed.startsWith("../")) {
        return trimmed;
    }

    // Абсолютные — только http(s).
    if (SAFE_ABSOLUTE.test(trimmed)) {
        return trimmed;
    }

    // Всё остальное (javascript:, data:, vbscript:, file: и т.п.) отклоняем.
    return fallback;
}
