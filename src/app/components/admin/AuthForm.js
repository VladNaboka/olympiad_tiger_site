'use client';

import { useState } from 'react';
import Link from 'next/link';
import { registerUser, loginUser } from '../../api/auth_api';
import { COUNTRIES, USER_ROLES } from '../../utils/constants';

export default function AuthForm({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    country: '',
    city: '',
    school: '',
    role: 'admin',
    role_id: USER_ROLES.REGIONAL_ADMIN // По умолчанию региональный представитель
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('🔐 Попытка авторизации:', { email: formData.email, password: '***' });

    try {
      let response;
      if (isLogin) {
        response = await loginUser({
          email: formData.email,
          password: formData.password
        });
      } else {
        response = await registerUser(formData);
      }

      console.log('📥 Ответ от API:', response);

      // Проверяем разные варианты структуры ответа
      if (response && response.token) {
        console.log('✅ Токен найден:', response.token);
        localStorage.setItem('admin_token', response.token);

        // Проверяем где находится пользователь
        const user = response.user || response.data || response;
        console.log('👤 Данные пользователя:', user);

        onLogin(user);
      } else if (response && response.success && response.data) {
        // Альтернативная структура ответа
        console.log('✅ Успешный ответ, но другая структура:', response);
        if (response.data.token) {
          localStorage.setItem('admin_token', response.data.token);
          onLogin(response.data.user || response.data);
        } else {
          setError('Токен не найден в ответе сервера');
        }
      } else {
        console.error('❌ Неожиданная структура ответа:', response);
        setError('Неверный формат ответа от сервера');
      }
    } catch (error) {
      console.error('❌ Ошибка авторизации:', error);
      setError(error.message || 'Ошибка авторизации');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fffbf2] relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url("/image/fonmain1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Header with Back to Site */}
      <div className="relative z-10 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img
                src="/image/logonavbar.png"
                alt="Tigers Logo"
                className="h-10 w-auto"
              />
            </Link>
            <Link
              href="/"
              className="text-gray-600 hover:text-orange-500 transition-colors flex items-center"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-64px)] py-12">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <span className="text-white text-3xl font-bold">T</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Admin Login' : 'Admin Registration'}
              </h1>
              <p className="text-gray-600">
                Tigers Olympiad Administration Panel
              </p>
              {!isLogin && (
                <p className="text-sm text-orange-600 mt-2">
                  Only authorized regional representatives can register
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <span className="text-red-400">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-500 text-gray-800"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Country *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-500 text-gray-800"
                      required
                    >
                      <option value="">Select your country</option>
                      {COUNTRIES.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-500 text-gray-800"
                      placeholder="Enter your city"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Organization *
                    </label>
                    <input
                      type="text"
                      value={formData.school}
                      onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-500 text-gray-800"
                      placeholder="School or educational organization"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Role *
                    </label>
                    <select
                      value={formData.role_id}
                      onChange={(e) => {
                        const roleId = parseInt(e.target.value);
                        setFormData({ 
                          ...formData, 
                          role_id: roleId,
                          role: roleId === USER_ROLES.MAIN_ADMIN ? 'owner' : 'admin'
                        });
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-800"
                      required
                    >
                      <option value={USER_ROLES.REGIONAL_ADMIN}>Regional Representative</option>
                      <option value={USER_ROLES.MAIN_ADMIN}>Main Administrator</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      Most users should select "Regional Representative"
                    </p>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-500 text-gray-800"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-gray-500 text-gray-800"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Loading...
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Register'
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
              >
                {isLogin ? "Don't have an account? Register" : 'Already have an account? Sign In'}
              </button>
            </div>

            {isLogin && (
              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>For Regional Representatives:</strong> Use your authorized credentials to access the administration panel.
                </p>
                <p className="text-xs text-orange-600 mt-2">
                  🔧 Debug mode: Check browser console for API responses
                </p>
              </div>
            )}

            {/* Demo credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-semibold mb-2">Demo Accounts:</p>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>Main Admin:</strong> admin@tigers.com / password123</p>
                <p><strong>Regional Rep:</strong> rep@tigers.com / password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}