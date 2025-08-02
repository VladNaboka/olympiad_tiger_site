'use client';

import { useState } from 'react';
import { registerUser } from '../../api/auth_api';
import { COUNTRIES } from '../../utils/constants';

export default function AddRepresentativeForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    country: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Проверяем, что все обязательные поля заполнены
    if (!formData.full_name || !formData.email || !formData.password || !formData.country || !formData.phone) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Проверяем формат email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Проверяем длину пароля
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      console.log('🔄 Creating representative with data:', formData);

      // Подготавливаем данные согласно новой API структуре
      const userData = {
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        country: formData.country,
        phone: formData.phone
      };

      console.log('📤 Sending to API:', userData);

      const response = await registerUser(userData);
      console.log('✅ Representative created successfully:', response);

      // Проверяем успешность создания
      if (response && (response.id || response.user_id)) {
        onSuccess();
      } else {
        throw new Error('Unexpected response format from server');
      }


    } catch (error) {
      console.error('❌ Error creating representative:', error);

      // Обрабатываем различные типы ошибок
      let errorMessage = 'Failed to create representative';

      if (error.message) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      // Специальные сообщения для известных ошибок
      if (errorMessage.includes('email')) {
        errorMessage = 'Email already exists or invalid email format';
      } else if (errorMessage.includes('password')) {
        errorMessage = 'Password does not meet requirements';
      } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      }

      setError(errorMessage);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-orange-600">Add Regional Representative</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter full name"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter email address"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Create password (min 6 characters)"
                minLength={6}
                required
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters required</p>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter phone number"
                required
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">Format: +77071234567</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Country *
              </label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
                disabled={loading}
              >
                <option value="">Select country</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>

          {/* API Data Preview (только в development режиме) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">🔧 Debug: API Data Preview</h4>
              <pre className="text-xs text-gray-600 overflow-x-auto">
                {JSON.stringify({
                  full_name: formData.full_name,
                  email: formData.email,
                  password: '***hidden***',
                  country: formData.country,
                  phone: formData.phone,
                  role_id: 2
                }, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-6 p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">Representative Permissions:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-1 text-sm text-orange-700">
                <div>✅ Add participants from {formData.country || 'their country'}</div>
                <div>✅ Upload artwork submissions</div>
                <div>✅ Set scores for submissions</div>
              </div>
              <div className="space-y-1 text-sm text-orange-700">
                <div>✅ View regional statistics</div>
                <div>✅ Manage regional gallery</div>
                <div>❌ Create other representatives</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.full_name || !formData.email || !formData.password || !formData.country || !formData.phone}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </div>
              ) : (
                'Create Representative'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}