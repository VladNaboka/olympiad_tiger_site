'use client';

import { useState } from 'react';
import { addStudent } from '../../api/students_api';
import { uploadArtWork } from '../../api/student_art_works';
import { createMathWork } from '../../api/student_math_works';
import { CATEGORIES, COUNTRIES, calculateCategory } from '../../utils/constants';

export default function AddStudentForm({ onClose, onSuccess, userCountry }) {
  const [formData, setFormData] = useState({
    name: '',
    birth_date: '',
    school: '',
    phone: '',
    email: '',
    country: userCountry || '',
    city: '',
    course_id: '', // 1 = math, 2 = art
    category_id: ''
  });
  const [artworkFile, setArtworkFile] = useState(null);
  const [artworkTitle, setArtworkTitle] = useState('');
  const [mathTitle, setMathTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1 = student info, 2 = work upload
  const [addedStudent, setAddedStudent] = useState(null);

  const courses = [
    { id: 1, name: 'Mathematics', icon: '📐' },
    { id: 2, name: 'Art', icon: '🎨' }
  ];

  // Автоматически вычисляем категорию при изменении даты рождения
  const handleBirthDateChange = (date) => {
    console.log('📅 Birth date changed:', date);
    const categoryId = calculateCategory(date);
    console.log('🏷️ Calculated category:', categoryId);
    
    setFormData({
      ...formData,
      birth_date: date,
      category_id: categoryId || ''
    });
  };

  // Шаг 1: Добавление студента
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Проверяем, что category_id установлен
      if (!formData.category_id) {
        alert('Please enter a valid date of birth to determine the age category');
        setLoading(false);
        return;
      }

      console.log('📝 Добавляем студента:', formData);
      
      const studentData = {
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

      console.log('🚀 Отправляем данные студента:', studentData);
      const response = await addStudent(studentData);
      console.log('✅ Студент добавлен:', response);
      
      // Проверяем структуру ответа
      const student = response.data || response;
      if (!student || !student.id) {
        throw new Error('Student was created but no ID returned');
      }
      
      setAddedStudent(student);
      setStep(2); // Переходим к загрузке работы
    } catch (error) {
      console.error('❌ Ошибка добавления студента:', error);
      alert('Error adding student: ' + error.message);
    }
    
    setLoading(false);
  };

  // Шаг 2: Загрузка работы
  const handleWorkSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.course_id === '2') { // Art
        if (!artworkFile) {
          alert('Please select an artwork file');
          setLoading(false);
          return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('student_id', addedStudent.id);
        formDataToSend.append('title', artworkTitle || `Artwork by ${formData.name}`);
        formDataToSend.append('country', formData.country);
        formDataToSend.append('category_id', formData.category_id);
        formDataToSend.append('file', artworkFile);

        console.log('🎨 Загружаем арт-работу...');
        const artResponse = await uploadArtWork(formDataToSend);
        console.log('✅ Арт-работа загружена:', artResponse);

      } else if (formData.course_id === '1') { // Math
        const mathData = {
          student_id: addedStudent.id,
          title: mathTitle || `Math work by ${formData.name}`,
          country: formData.country,
          category_id: parseInt(formData.category_id)
        };

        console.log('📐 Создаем математическую работу:', mathData);
        const mathResponse = await createMathWork(mathData);
        console.log('✅ Математическая работа создана:', mathResponse);
      }

      onSuccess(addedStudent.id);
    } catch (error) {
      console.error('❌ Ошибка загрузки работы:', error);
      alert('Student added successfully, but there was an error uploading the work: ' + error.message);
      onSuccess(addedStudent.id);
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
          <h3 className="text-xl font-bold text-orange-600">
            {step === 1 ? 'Add Student' : 'Upload Work'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}>
            2
          </div>
        </div>

        {step === 1 ? (
          // Шаг 1: Информация о студенте
          <form onSubmit={handleStudentSubmit}>
            {/* Debug info - только в development
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-4 p-3 bg-gray-100 rounded text-xs text-black">
                <strong>Debug:</strong> category_id: {formData.category_id || 'not set'}, 
                course_id: {formData.course_id || 'not set'}
              </div>
            )} */}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
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
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {!userCountry && (
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Country *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select country</option>
                    {COUNTRIES.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                      className={`cursor-pointer p-4 border-2 rounded-lg text-black text-center transition-all ${
                        formData.course_id === course.id.toString()
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
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
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding...' : 'Next: Upload Work'}
              </button>
            </div>
          </form>
        ) : (
          // Шаг 2: Загрузка работы
          <div>
            {/* Информация о добавленном студенте */}
            <div className="bg-green-50 border border-green-200 p-4 rounded-md mb-6">
              <h4 className="font-semibold text-green-800 mb-2">✅ Student Added Successfully!</h4>
              <p className="text-green-700">
                <strong>{addedStudent?.name}</strong> (ID: {addedStudent?.id})
              </p>
              <p className="text-sm text-green-600">
                Subject: {courses.find(c => c.id === parseInt(formData.course_id))?.name} • 
                Category: {getCategoryName(formData.category_id)}
              </p>
            </div>

            <form onSubmit={handleWorkSubmit}>
              {formData.course_id === '2' ? (
                // Art work upload
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-purple-600">🎨 Upload Artwork</h4>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Artwork Title
                    </label>
                    <input
                      type="text"
                      value={artworkTitle}
                      onChange={(e) => setArtworkTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder={`Artwork by ${formData.name}`}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Artwork File *
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setArtworkFile(e.target.files[0])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Supported formats: JPG, PNG, GIF (max 10MB)
                    </p>
                  </div>
                </div>
              ) : (
                // Math work creation
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-blue-600">📐 Create Math Work</h4>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Math Work Title
                    </label>
                    <input
                      type="text"
                      value={mathTitle}
                      onChange={(e) => setMathTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Math work by ${formData.name}`}
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                    <p className="text-blue-800 text-sm">
                      <strong>Note:</strong> Math work will be created and can be scored later during evaluation.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => onSuccess(addedStudent?.id)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Skip Work Upload
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
                >
                  {loading ? 'Uploading...' : 'Complete Registration'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}