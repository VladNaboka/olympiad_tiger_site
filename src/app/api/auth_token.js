// Централизованное хранение токена админа.
//
// Компромисс по хранилищу:
//   - localStorage удобен (переживает перезагрузку вкладки), но доступен из JS,
//     поэтому уязвим к краже через XSS. В этом проекте нет своего HTML-рендера
//     от пользователя (React экранирует весь текст, dangerouslySetInnerHTML не
//     используется), поэтому вектор XSS сведён к минимуму.
//   - httpOnly-cookie надёжнее против XSS, но требует, чтобы токен ставил и читал
//     бэкенд (Set-Cookie + чтение куки в middleware). Сейчас контракт бэкенда —
//     заголовок Authorization: Bearer, куки он не выставляет, поэтому перейти на
//     httpOnly-cookie в одиночку на фронте нельзя — это отдельная задача с бэком.
//
// Пока держим токен в localStorage, но изолируем доступ здесь: единая точка
// чтения/записи/очистки, без разбросанных по коду обращений и без логирования.

const TOKEN_KEY = 'admin_token';

// Подписчики на разлогин (например, чтобы сбросить состояние в React).
const logoutListeners = new Set();

export function getToken() {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  if (typeof window === 'undefined' || !token) return;
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* private mode / storage disabled — тихо игнорируем */
  }
}

export function clearToken() {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* no-op */
  }
}

// Вызывается клиентом при 401: чистим токен и уведомляем подписчиков,
// чтобы UI мог показать форму входа.
export function forceLogout() {
  clearToken();
  logoutListeners.forEach((cb) => {
    try {
      cb();
    } catch {
      /* no-op */
    }
  });
}

export function onForceLogout(cb) {
  logoutListeners.add(cb);
  return () => logoutListeners.delete(cb);
}
