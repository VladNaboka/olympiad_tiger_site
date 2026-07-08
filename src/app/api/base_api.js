import { getToken, forceLogout } from "./auth_token";

// Все запросы идут на тот же origin через rewrites из next.config.mjs
// (/api/* -> BACKEND_URL/*), поэтому CORS/credentials здесь не задействованы,
// а заголовок Authorization безопасно добавлять ко всем запросам.
export const API_URL = "/api";

// Ошибка API с кодом статуса и человекочитаемым сообщением.
export class ApiError extends Error {
    constructor(message, status, body) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.body = body;
    }
}

// Единая обработка ответа: маппинг статусов в понятные сообщения и сайд-эффекты.
async function handleResponse(response) {
    if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }
        return {};
    }

    // Пытаемся достать текст ошибки от бэкенда (может быть JSON или plain text).
    let bodyText = "";
    try {
        bodyText = await response.text();
    } catch {
        /* no-op */
    }

    switch (response.status) {
        case 401:
            // Токен отсутствует/протух — разлогиниваем и уводим на вход.
            forceLogout();
            throw new ApiError("Сессия истекла. Войдите заново.", 401, bodyText);
        case 403:
            throw new ApiError("Недостаточно прав для этого действия.", 403, bodyText);
        case 429:
            throw new ApiError(
                "Слишком много запросов. Подождите минуту и попробуйте снова.",
                429,
                bodyText
            );
        default:
            if (response.status >= 500) {
                throw new ApiError(
                    "Ошибка сервера. Попробуйте позже.",
                    response.status,
                    bodyText
                );
            }
            throw new ApiError(
                bodyText || `Ошибка запроса (${response.status})`,
                response.status,
                bodyText
            );
    }
}

// Собираем заголовки: базовые + Authorization, если есть токен.
// Токен добавляется всегда, когда он есть — публичные эндпоинты его игнорируют,
// а защищённые получают нужную авторизацию без ручной простановки в каждом вызове.
function buildHeaders(extra = {}) {
    const headers = { ...extra };
    const token = getToken();
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}

export async function apiRequest(endpoint, method = "GET", body = null) {
    const options = {
        method,
        headers: buildHeaders({ "Content-Type": "application/json" }),
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    return handleResponse(response);
}

// Загрузка multipart/form-data (файлы). Content-Type НЕ ставим — браузер сам
// проставит boundary. Authorization добавляется, если пользователь авторизован.
export async function apiUpload(endpoint, formData, method = "POST") {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: buildHeaders(),
        body: formData,
    });
    return handleResponse(response);
}
