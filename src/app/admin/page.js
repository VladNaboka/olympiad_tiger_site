'use client';

import { useState, useEffect } from 'react';
import { authWithToken } from '../api/auth_api';
import AuthForm from '../components/admin/AuthForm';
import AdminDashboard from '../components/admin/MainAdminDashboard';

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Проверка авторизации при загрузке
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    console.log('🔑 Проверка токена при загрузке:', token);
    
    if (token) {
      authWithToken(token)
        .then(response => {
          console.log('✅ Ответ authWithToken:', response);
          
          // Попробуем разные варианты структуры ответа
          const userData = response.user || response.data || response;
          console.log('👤 Извлеченные данные пользователя:', userData);
          
          setUser(userData);
        })
        .catch((error) => {
          console.error('❌ Ошибка проверки токена:', error);
          localStorage.removeItem('admin_token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log('🚫 Токен не найден');
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    console.log('🚪 Выход из системы');
    localStorage.removeItem('admin_token');
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fffbf2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('🔐 Показываем форму авторизации');
    return <AuthForm onLogin={setUser} />;
  }

  console.log('✅ Пользователь авторизован, показываем дашборд:', user);
  return <AdminDashboard user={user} onLogout={handleLogout} />;
}