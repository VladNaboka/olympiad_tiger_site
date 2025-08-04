'use client';

import { useState, useEffect } from 'react';
import { updateStudent } from '../../api/students_api';
import { CATEGORIES, COUNTRIES, calculateCategory, formatDate } from '../../utils/constants';

export default function EditStudentModal({ student, onClose, onSuccess, userCountry }) {
  const [formData, setFormData] = useState({
    name: '',
    birth_date: '',
    school: '',
    phone: '',
    email: '',
    country: userCountry || '',
    city: '',
    course_id: '',
    category_id: ''
  });
  const [loading, setLoading] = useState(false);

  const courses = [
    { id: 1, name: 'Mathematics', icon: '📐' },
    { id: 2, name: 'Art', icon: '🎨' }
  ];

  // Заполняем форму данными студента при открытии
  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || student.full_name || '',
        birth_date: student.birth_date ? student.birth_date.split('T')[0] : '', // Преобразуем ISO дату в формат input[type="date"]
        school: student.school || '',
        phone: student.phone || '',
        email: student.email || '',
        country: student.country || userCountry || '',
        city: student.city || '',
        course_id: student.course_id ? student.course_id.toString() : '',
        category_id: student.category_id ? student.category_id.toString() : ''
      });
    }
  }, [student, userCountry]);

  // Автоматически вычисляем категорию при изменении даты рождения
  const handleBirthDateChange = (date) => {
    console.log('📅 Birth date changed:', date);
    const categoryId = calculateCategory(date);
    console.log('🏷️ Calculated category:', categoryId);
    
    setFormData({
      ...formData,
      birth_date: date,
      category_id: categoryId ? categoryId.toString() : ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Проверяем, что category_id установлен
      if (!formData.category_id) {
        alert('Please enter a valid date of birth to determine the age category');
        setLoading(false);
        return;
      }

      console.log('📝 Обновляем студента:', formData);
      
      const studentData = {
        id: student.id, // Важно: передаем ID для обновления
        name: formData.name,
        birth_date: formData.birth_date,
        school: formData.school,
        phone: formData.phone,
        email: formData.email,
        country: formData.country,
        city: formData.city,
        course_id: parseInt(formData.course_id),
        category_id: parseInt(formData.category_id)
      };

      console.log('🚀 Отправляем обновленные данные студента:', studentData);
      await updateStudent(studentData);
      console.log('✅ Студент обновлен');
      
      onSuccess();
    } catch (error) {
      console.error('❌ Ошибка обновления студента:', error);
      alert('Error updating student: ' + error.message);
    }
    
    setLoading(false);
  };

  const getCategoryName = (categoryId) => {
    const category = CATEGORIES.find(cat => cat.id === parseInt(categoryId));
    return category ? category.name : '';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-indigo-600">
            Edit Student - ID: {student.id}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                value={formData.birth_date}
                onChange={(e) => handleBirthDateChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 bg-white"
                required
              />
              {formData.birth_date && formData.category_id && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-700 font-medium">
                    ✅ Category: {getCategoryName(formData.category_id)}
                  </p>
                </div>
              )}
              {formData.birth_date && !formData.category_id && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                  <p className="text-sm text-red-700 font-medium">
                    ❌ Age must be between 6-17 years for competition eligibility
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                School *
              </label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => setFormData({...formData, school: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 bg-white"
                placeholder="+77071234567"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 bg-white"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800 bg-white"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Subject *
              </label>
              <div className="grid grid-cols-2 gap-4">
                {courses.map(course => (
                  <label
                    key={course.id}
                    className={`cursor-pointer p-4 border-2 rounded-lg text-center transition-all ${
                      formData.course_id === course.id.toString()
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="course_id"
                      value={course.id}
                      checked={formData.course_id === course.id.toString()}
                      onChange={(e) => setFormData({...formData, course_id: e.target.value})}
                      className="sr-only"
                      required
                    />
                    <div className="text-3xl mb-2">{course.icon}</div>
                    <div className="font-medium">{course.name}</div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.category_id}
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}