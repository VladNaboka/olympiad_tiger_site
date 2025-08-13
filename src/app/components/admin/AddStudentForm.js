'use client';

import { useState, useEffect } from 'react';
import { addStudent } from '../../api/students_api';
import { uploadArtWork } from '../../api/student_art_works';
import { createMathWork } from '../../api/student_math_works';
import { COUNTRIES, SUBJECTS, getCategoriesBySubject, calculateCategory, calculateAge, generateStudentId, getCategoryName } from '../../utils/constants';

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
  const [step, setStep] = useState(1);
  const [addedStudent, setAddedStudent] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('');

  // Проверяем валидность формы для первого шага
  const isStep1Valid = () => {
    const requiredFields = ['name', 'birth_date', 'school', 'city', 'course_id'];
    const country = userCountry || formData.country;
    
    console.log('🔍 Checking Step 1 validity:');
    console.log('- formData:', formData);
    console.log('- userCountry:', userCountry);
    console.log('- country:', country);
    console.log('- category_id:', formData.category_id);
    
    // Проверяем обязательные поля
    const hasRequiredFields = requiredFields.every(field => {
      const hasValue = formData[field] && formData[field].toString().trim() !== '';
      console.log(`- ${field}: "${formData[field]}" (valid: ${hasValue})`);
      return hasValue;
    });
    
    const hasCountry = Boolean(country && country.trim() !== '');
    const hasValidCategory = Boolean(formData.category_id);

    let hasValidAge = true;
    if (selectedSubject && formData.birth_date) {
      const age = calculateAge(formData.birth_date);
      const categories = getCategoriesBySubject(selectedSubject);
      const minAge = Math.min(...categories.map(cat => cat.minAge));
      const maxAge = Math.max(...categories.map(cat => cat.maxAge));
      hasValidAge = age >= minAge && age <= maxAge;
    }
    
    console.log('- hasRequiredFields:', hasRequiredFields);
    console.log('- hasCountry:', hasCountry);
    console.log('- hasValidCategory:', hasValidCategory);
    
    const isValid = hasRequiredFields && hasCountry && hasValidCategory;
    console.log('- STEP 1 VALID:', isValid);
    
    return isValid;
  };

  // Автоматически предлагаем категорию на основе возраста
  const suggestCategory = () => {
    if (!formData.birth_date) {
      alert('Please enter date of birth first');
      return;
    }
    
    const categoryId = calculateCategory(formData.birth_date);
    if (categoryId) {
      setFormData(prev => ({...prev, category_id: categoryId}));
      console.log('🎯 Auto-suggested category:', categoryId);
    } else {
      alert('Age must be between 6-17 years for competition eligibility');
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

  // Отслеживаем изменения formData для отладки
  useEffect(() => {
    console.log('📝 FormData updated:', formData);
    console.log('✅ Step 1 Valid:', isStep1Valid());
  }, [formData]);

  // Шаг 1: Добавление студента
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 Starting student submission...');
    
    if (!isStep1Valid()) {
      console.error('❌ Form is not valid!');
      alert('Please fill in all required fields');
      return;
    }

    if (selectedSubject && formData.birth_date) {
      const age = calculateAge(formData.birth_date);
      const categories = getCategoriesBySubject(selectedSubject);
      const minAge = Math.min(...categories.map(cat => cat.minAge));
      const maxAge = Math.max(...categories.map(cat => cat.maxAge));
      
      if (age < minAge || age > maxAge) {
        alert(`Age must be between ${minAge}-${maxAge} years for ${selectedSubject === '1' ? 'Art' : 'Mathematics'}`);
        return;
      }
      
      if (!formData.category_id) {
        alert('Please select a valid date of birth that fits into an age category');
        return;
      }
    }
    
    setLoading(true);
  
    try {
      // ДОБАВЬТЕ ГЕНЕРАЦИЮ ID:
      const generatedId = generateStudentId(
        userCountry || formData.country, 
        formData.category_id
      );
      
      const studentData = {
        id: generatedId, // Используем сгенерированный ID
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
  
      console.log('📤 Sending student data with generated ID:', studentData);
      const response = await addStudent(studentData);
      console.log('📥 Response received:', response);
      
      // Проверяем структуру ответа
      const student = response.data || response;
      console.log('👤 Extracted student:', student);
      
      if (!student) {
        throw new Error('No student data in response');
      }
      
      if (!student.id) {
        console.error('❌ No student ID in response:', student);
        throw new Error('Student was created but no ID returned');
      }
      
      console.log('✅ Student added successfully with ID:', student.id);
      setAddedStudent(student);
      setStep(2);
      
    } catch (error) {
      console.error('❌ Error adding student:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        response: error.response
      });
      alert('Error adding student: ' + error.message);
    }
    
    setLoading(false);
  };

  // Шаг 2: Загрузка работы
  const handleWorkSubmit = async (e) => {
    e.preventDefault();
    console.log('🎨📐 Starting work submission...');
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

  // Получаем текущий возраст для отображения
  const getCurrentAge = () => {
    if (!formData.birth_date) return null;
    return calculateAge(formData.birth_date);
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
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Date of Birth *
  </label>
  <input
    type="date"
    value={formData.birth_date}
    min={getDateLimits().min}
    max={getDateLimits().max}
    onChange={(e) => {
      console.log('📅 Birth date changed:', e.target.value);
      const date = e.target.value;
      let categoryId = null;
      
      if (selectedSubject) {
        categoryId = calculateCategory(date, selectedSubject);
      }
      
      setFormData({
        ...formData, 
        birth_date: date,
        category_id: categoryId ? categoryId.toString() : ''
      });
    }}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black"
    disabled={!selectedSubject}
    required
  />
  
  {/* Показываем информацию о возрасте */}
  {formData.birth_date && (
    <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
      <p className="text-sm text-blue-700 font-medium">
        ℹ️ Age: {getCurrentAge()} years
      </p>
    </div>
  )}
  
  {/* Показываем ограничения по возрасту */}
  {selectedSubject && (
    <div className="mt-2 p-2 bg-gray-50 border border-gray-200 rounded">
      <p className="text-xs text-gray-600">
        📅 Allowed age range for {selectedSubject === '1' ? 'Art' : 'Mathematics'}: 
        {' '}
        {getCategoriesBySubject(selectedSubject)[0]?.minAge}-
        {getCategoriesBySubject(selectedSubject).slice(-1)[0]?.maxAge} years
      </p>
    </div>
  )}
  
  {!selectedSubject && (
    <p className="text-xs text-gray-500 mt-1">
      Please select a subject first to enable date selection
    </p>
  )}
</div>
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
    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
  {!selectedSubject && (
    <p className="text-xs text-gray-500 mt-1">
      Please select a subject first to see available categories
    </p>
  )}
  {selectedSubject && (
    <p className="text-xs text-gray-500 mt-1">
      {selectedSubject === '1' ? 'Art categories' : 'Mathematics categories'}
    </p>
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
                  placeholder="School name"
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

              <div>
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