'use client';

import { useState } from 'react';
import Link from 'next/link';
import { loginUser } from '../../api/auth_api';
import { setToken } from '../../api/auth_token';

export default function AuthForm({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password
      });

      // Проверяем разные варианты структуры ответа
      if (response && response.token) {
        setToken(response.token);
        const user = response.user || response.data || response;
        onLogin(user);
      } else if (response && response.success && response.data && response.data.token) {
        setToken(response.data.token);
        onLogin(response.data.user || response.data);
      } else {
        setError('Неверные учетные данные или ошибка сервера');
      }
    } catch (error) {
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
                Admin Login
              </h1>
              <p className="text-gray-600">
                Tigers Olympiad Administration Panel
              </p>
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
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>For Regional Representatives:</strong> Use your authorized credentials to access the administration panel.
              </p>
              <p className="text-xs text-orange-600 mt-2">
                Contact the administration team if you need access credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}