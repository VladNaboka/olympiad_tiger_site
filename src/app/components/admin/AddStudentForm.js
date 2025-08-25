'use client';

import { useState, useEffect } from 'react';
import { addStudent } from '../../api/students_api';
import { uploadArtWork } from '../../api/student_art_works';
import { createMathWork } from '../../api/student_math_works';
import { COUNTRIES, SUBJECTS, getCategoriesBySubject, calculateCategory, calculateAge, generateStudentId, getCategoryName } from '../../utils/constants';
import DateSelector from './DateSelector';

export default function AddStudentForm({ onClose, onSuccess, userCountry }) {
  const [formData, setFormData] = useState({
    name: '',
    birth_date: '',
    school: '',
    phone: '',
    email: '',
    country: userCountry || '',
    city: '',
    course_id: '', // 1 = art, 2 = math
    category_id: ''
  });
  const [artworkFile, setArtworkFile] = useState(null);
  const [artworkTitle, setArtworkTitle] = useState('');
  const [mathTitle, setMathTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [addedStudent, setAddedStudent] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [ageValidation, setAgeValidation] = useState({ isValid: false, message: '', age: null, categoryName: '' });

  // Проверяем валидность формы для первого шага
  const isStep1Valid = () => {
    const requiredFields = ['name', 'birth_date', 'school', 'city', 'course_id'];
    const country = userCountry || formData.country;
    
    // Проверяем обязательные поля
    const hasRequiredFields = requiredFields.every(field => {
      return formData[field] && formData[field].toString().trim() !== '';
    });
    
    const hasCountry = Boolean(country && country.trim() !== '');
    const hasValidCategory = Boolean(formData.category_id);
    const hasValidAge = ageValidation.isValid;
    
    return hasRequiredFields && hasCountry && hasValidCategory && hasValidAge;
  };

  // Автоматическое определение категории при изменении даты рождения или предмета
  const updateCategoryAndValidation = (birthDate, subjectId) => {
    if (!birthDate || !subjectId) {
      setAgeValidation({ isValid: false, message: '', age: null, categoryName: '' });
      setFormData(prev => ({ ...prev, category_id: '' }));
      return;
    }

    const age = calculateAge(birthDate);
    if (!age) {
      setAgeValidation({ isValid: false, message: 'Invalid date of birth', age: null, categoryName: '' });
      setFormData(prev => ({ ...prev, category_id: '' }));
      return;
    }

    const categories = getCategoriesBySubject(subjectId);
    const minAge = Math.min(...categories.map(cat => cat.minAge));
    const maxAge = Math.max(...categories.map(cat => cat.maxAge));
    const subjectName = subjectId === '1' ? 'Art' : 'Mathematics';

    // Проверяем, попадает ли возраст в допустимый диапазон
    if (age < minAge || age > maxAge) {
      setAgeValidation({
        isValid: false,
        message: `Age ${age} is not eligible for ${subjectName}. Required: ${minAge}-${maxAge} years`,
        age: age,
        categoryName: ''
      });
      setFormData(prev => ({ ...prev, category_id: '' }));
      return;
    }

    // Автоматически определяем категорию
    const categoryId = calculateCategory(birthDate, subjectId);
    if (categoryId) {
      const categoryName = getCategoryName(categoryId);
      setAgeValidation({
        isValid: true,
        message: `Perfect! Age ${age} fits ${categoryName} category`,
        age: age,
        categoryName: categoryName
      });
      setFormData(prev => ({ ...prev, category_id: categoryId.toString() }));
    } else {
      setAgeValidation({
        isValid: false,
        message: `Age ${age} doesn't fit any ${subjectName} category`,
        age: age,
        categoryName: ''
      });
      setFormData(prev => ({ ...prev, category_id: '' }));
    }
  };

  const getDateLimits = () => {
    if (!selectedSubject) return { min: '', max: '' };
    
    const categories = getCategoriesBySubject(selectedSubject);
    const today = new Date();
    
    // Находим минимальный и максимальный возраст среди категорий
    const minAge = Math.min(...categories.map(cat => cat.minAge));
    const maxAge = Math.max(...categories.map(cat => cat.maxAge));
    
    // Вычисляем диапазон дат
    const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    const minDate = new Date(today.getFullYear() - maxAge - 1, today.getMonth(), today.getDate());
    
    return {
      min: minDate.toISOString().split('T')[0],
      max: maxDate.toISOString().split('T')[0]
    };
  };

  // Отслеживаем изменения для автоматического определения категории
  useEffect(() => {
    if (formData.birth_date && selectedSubject) {
      updateCategoryAndValidation(formData.birth_date, selectedSubject);
    }
  }, [formData.birth_date, selectedSubject]);

  // Шаг 1: Добавление студента
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    
    if (!isStep1Valid()) {
      alert('Please fill in all required fields and ensure the age is valid for the selected subject');
      return;
    }
    
    setLoading(true);
  
    try {
      const generatedId = generateStudentId(
        userCountry || formData.country, 
        formData.category_id
      );
      
      const studentData = {
        id: generatedId,
        name: formData.name,
        birth_date: formData.birth_date,
        school: formData.school,
        phone: formData.phone || '',
        email: formData.email || '',
        country: userCountry || formData.country,
        city: formData.city,
        course_id: parseInt(formData.course_id),
        category_id: parseInt(formData.category_id)
      };
  
      console.log('📤 Sending student data:', studentData);
      const response = await addStudent(studentData);
      console.log('📥 Response received:', response);
      
      const student = response.data || response;
      
      if (!student || !student.id) {
        throw new Error('Student was created but no ID returned');
      }
      
      console.log('✅ Student added successfully with ID:', student.id);
      setAddedStudent(student);
      setStep(2);
      
    } catch (error) {
      console.error('❌ Error adding student:', error);
      alert('Error adding student: ' + error.message);
    }
    
    setLoading(false);
  };

  // Шаг 2: Загрузка работы
  const handleWorkSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.course_id === '1') { // Art
        if (!artworkFile) {
          alert('Please select an artwork file');
          setLoading(false);
          return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('student_id', addedStudent.id);
        formDataToSend.append('title', artworkTitle || `Artwork by ${formData.name}`);
        formDataToSend.append('country', userCountry || formData.country);
        formDataToSend.append('category_id', formData.category_id);
        formDataToSend.append('file', artworkFile);

        console.log('🎨 Uploading artwork...');
        const artResponse = await uploadArtWork(formDataToSend);
        console.log('✅ Artwork uploaded:', artResponse);

      } else if (formData.course_id === '2') { // Math
        const mathData = {
          student_id: addedStudent.id,
          title: mathTitle || `Math work by ${formData.name}`,
          country: userCountry || formData.country,
          category_id: parseInt(formData.category_id)
        };

        console.log('📐 Creating math work:', mathData);
        const mathResponse = await createMathWork(mathData);
        console.log('✅ Math work created:', mathResponse);
      }

      console.log('🎉 All done! Calling onSuccess...');
      onSuccess(addedStudent.id);
      
    } catch (error) {
      console.error('❌ Error uploading work:', error);
      alert('Student added successfully, but there was an error uploading the work: ' + error.message);
      onSuccess(addedStudent.id);
    }
    
    setLoading(false);
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
                  placeholder="Enter full name"
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
                    setAgeValidation({ isValid: false, message: '', age: null, categoryName: '' });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                >
                  <option value="">Select subject</option>
                  {SUBJECTS.map(subject => (
                    <option key={subject.id} value={subject.id}>{subject.name}</option>
                  ))}
                </select>
              </div>

              <DateSelector
  label="Birth Date"
  name="birth_date"
  defaultValue=""
  required={true}
  selectedSubject={selectedSubject}
  onDateChange={(date) => {
    setFormData(prev => ({ ...prev, birth_date: date }));
  }}
  onAgeValidation={(validation) => {
    setAgeValidation(validation);
    if (validation.isValid && validation.categoryId) {
      setFormData(prev => ({ 
        ...prev, 
        category_id: validation.categoryId.toString() 
      }));
    } else {
      setFormData(prev => ({ 
        ...prev, 
        category_id: '' 
      }));
    }
  }}
/>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  School *
                </label>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => setFormData({...formData, school: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="School name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone *
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
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Email address"
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
                  placeholder="City name"
                  required
                />
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
                disabled={loading || !isStep1Valid()}
                className={`px-4 py-2 rounded-md transition-colors ${
                  !loading && isStep1Valid()
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {loading ? 'Adding...' : 'Next: Upload Work'}
              </button>
            </div>
          </form>
        ) : (
          // Шаг 2: Загрузка работы  
          <div>
            <div className="bg-green-50 border border-green-200 p-4 rounded-md mb-6">
              <h4 className="font-semibold text-green-800 mb-2">✅ Student Added Successfully!</h4>
              <p className="text-green-700">
                <strong>{addedStudent?.name}</strong> (ID: {addedStudent?.id})
              </p>
              <p className="text-sm text-green-600">
                Subject: {SUBJECTS.find(s => s.id === formData.course_id)?.name} • 
                Category: {getCategoryName(formData.category_id)}
              </p>
            </div>

            <form onSubmit={handleWorkSubmit}>
              {formData.course_id === '1' ? (
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                      placeholder={`Artwork by ${formData.name}`}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Artwork File *
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setArtworkFile(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        required
                      />
                      <div className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus-within:ring-2 focus-within:ring-purple-500 bg-white cursor-pointer hover:bg-gray-50">
                        {artworkFile ? (
                          <span className="text-gray-900">{artworkFile.name}</span>
                        ) : (
                          <span className="text-gray-500">Choose artwork file or drag and drop</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Supported formats: JPG, PNG, GIF (max 10MB)
                    </p>
                  </div>
                </div>
              ) : (
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
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