export const API_URL = "https://tigersedu.com/api";

export async function apiRequest(endpoint, method = "GET", body = null) {
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

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }

        return {};
    } catch (error) {
        console.error("Ошибка запроса:", error);
        throw error;
    }
}
