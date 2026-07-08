'use client';

import { useState, useEffect } from 'react';
import { authWithToken } from '../api/auth_api';
import { getToken, clearToken, onForceLogout } from '../api/auth_token';
import AuthForm from '../components/admin/AuthForm';
import AdminDashboard from '../components/admin/AdminDashboard';

// Нормализуем role_id из строковой роли, если сервер прислал только role.
function normalizeUser(userData) {
  if (!userData) return userData;
  if (!userData.role_id && userData.role) {
    if (userData.role === 'owner') {
      userData.role_id = 1;
    } else if (userData.role === 'admin') {
      userData.role_id = 2;
    }
  }
  return userData;
}

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Проверка авторизации при загрузке
  useEffect(() => {
    const token = getToken();

    if (token) {
      authWithToken(token)
        .then(response => {
          const userData = normalizeUser(response.user || response.data || response);
          setUser(userData);
        })
        .catch(() => {
          clearToken();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Централизованный разлогин при 401 из любого запроса.
  useEffect(() => {
    return onForceLogout(() => setUser(null));
  }, []);

  const handleLogin = (userData) => {
    setUser(normalizeUser(userData));
  };

  const handleLogout = () => {
    clearToken();
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffbf2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return <AdminDashboard user={user} onLogout={handleLogout} />;
}
