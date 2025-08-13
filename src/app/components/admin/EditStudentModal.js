'use client';

import { useState, useEffect } from 'react';
import { updateStudent } from '../../api/students_api';
import { getCategoriesBySubject, calculateCategory, SUBJECTS, COUNTRIES } from '../../utils/constants';

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
  const [selectedSubject, setSelectedSubject] = useState('');

  const courses = [
    { id: 1, name: 'Mathematics', icon: '📐' },
    { id: 2, name: 'Art', icon: '🎨' }
  ];

  // Заполняем форму данными студента при открытии
  useEffect(() => {
    if (student) {
      const courseId = student.course_id ? student.course_id.toString() : '';
      setSelectedSubject(courseId);
      setFormData({
        name: student.name || student.full_name || '',
        birth_date: student.birth_date ? student.birth_date.split('T')[0] : '',
        school: student.school || '',
        phone: student.phone || '',
        email: student.email || '',
        country: student.country || userCountry || '',
        city: student.city || '',
        course_id: courseId,
        category_id: student.category_id ? student.category_id.toString() : ''
      });
    }
  }, [student, userCountry]);

  // Автоматически вычисляем категорию при изменении даты рождения
  const handleBirthDateChange = (date) => {
    let categoryId = null;
    
    if (selectedSubject) {
      categoryId = calculateCategory(date, selectedSubject);
    }
    
    setFormData({
      ...formData,
      birth_date: date,
      category_id: categoryId ? categoryId.toString() : ''
    });
    
    if (!categoryId && selectedSubject) {
      console.warn('⚠️ Age does not fit any category for selected subject');
    }
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

            <div>
  <label className="block text-gray-700 text-sm font-bold mb-2">Subject *</label>
  <select
    value={selectedSubject}
    onChange={(e) => {
      const newSubject = e.target.value;
      setSelectedSubject(newSubject);
      setFormData({ 
        ...formData, 
        course_id: newSubject,
        category_id: '' // Сбрасываем категорию при смене предмета
      });
    }}
    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    required
  >
    <option value="">Select subject</option>
    {SUBJECTS.map(subject => (
      <option key={subject.id} value={subject.id}>{subject.name}</option>
    ))}
  </select>
</div>

<div>
  <label className="block text-gray-700 text-sm font-bold mb-2">Category *</label>
  <select
    value={formData.category_id}
    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
    required
    disabled={!selectedSubject}
  >
    <option value="">
      {selectedSubject ? 'Select category' : 'Please select a subject first'}
    </option>
    {selectedSubject && getCategoriesBySubject(selectedSubject).map(category => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ))}
  </select>
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