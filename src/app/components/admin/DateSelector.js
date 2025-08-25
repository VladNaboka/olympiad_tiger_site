'use client';

import { useState, useEffect } from 'react';

export default function DateSelector({ 
  label, 
  name, 
  defaultValue, 
  required = false, 
  className = "",
  selectedSubject = null,
  onAgeValidation = null,
  onDateChange = null
}) {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  // Парсим defaultValue при инициализации
  useEffect(() => {
    if (defaultValue) {
      const date = new Date(defaultValue);
      if (!isNaN(date.getTime())) {
        setDay(String(date.getDate()).padStart(2, '0'));
        setMonth(String(date.getMonth() + 1).padStart(2, '0'));
        setYear(String(date.getFullYear()));
      }
    }
  }, [defaultValue]);

  // Категории по предметам (скопировано из constants)
  const MATH_CATEGORIES = [
    { id: 1, name: 'Grade 5-6', minAge: 10, maxAge: 12, subject: 'math' },
    { id: 2, name: 'Grade 7-8', minAge: 12, maxAge: 14, subject: 'math' },
    { id: 3, name: 'Grade 9-10', minAge: 14, maxAge: 16, subject: 'math' },
    { id: 4, name: 'Grade 11-12', minAge: 16, maxAge: 18, subject: 'math' }
  ];

  const ART_CATEGORIES = [
    { id: 5, name: 'Age 6-9', minAge: 6, maxAge: 9, subject: 'art' },
    { id: 6, name: 'Age 10-13', minAge: 10, maxAge: 13, subject: 'art' },
    { id: 7, name: 'Age 14-17', minAge: 14, maxAge: 17, subject: 'art' }
  ];

  const getCategoriesBySubject = (subjectId) => {
    if (subjectId === '1' || subjectId === 1) {
      return ART_CATEGORIES;
    } else {
      return MATH_CATEGORIES;
    }
  };

  // Получаем ограничения по датам
  const getDateLimits = () => {
    if (!selectedSubject) {
      return { min: '', max: '' };
    }

    const categories = getCategoriesBySubject(selectedSubject);
    const minAge = Math.min(...categories.map(c => c.minAge));
    const maxAge = Math.max(...categories.map(c => c.maxAge));
    
    const today = new Date();
    const minDate = new Date(today.getFullYear() - maxAge - 1, today.getMonth(), today.getDate() + 1);
    const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    
    return {
      min: minDate.toISOString().split('T')[0],
      max: maxDate.toISOString().split('T')[0]
    };
  };

  // Проверяем возраст и определяем категорию
  const validateAge = (birthDate) => {
    if (!selectedSubject || !birthDate) {
      return { isValid: false, message: '', categoryName: '', categoryId: null };
    }

    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear() - 
      (today.getMonth() < birth.getMonth() || 
       (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate()) ? 1 : 0);

    const categories = getCategoriesBySubject(selectedSubject);
    const validCategory = categories.find(cat => age >= cat.minAge && age <= cat.maxAge);

    if (validCategory) {
      return {
        isValid: true,
        message: `Age ${age} years`,
        categoryName: validCategory.name,
        categoryId: validCategory.id,
        age: age
      };
    } else {
      const minAge = Math.min(...categories.map(c => c.minAge));
      const maxAge = Math.max(...categories.map(c => c.maxAge));
      return {
        isValid: false,
        message: `Age ${age} is not allowed for ${selectedSubject === '1' ? 'Art' : 'Mathematics'}`,
        categoryName: '',
        categoryId: null,
        age: age,
        allowedRange: `${minAge}-${maxAge} years`
      };
    }
  };

  // Массивы для селектов
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
  ];
  
  const currentYear = new Date().getFullYear();
  const limits = getDateLimits();
  
  // Ограничиваем года на основе выбранного предмета
  let availableYears = [];
  if (selectedSubject) {
    const minYear = parseInt(limits.min.split('-')[0]);
    const maxYear = parseInt(limits.max.split('-')[0]);
    availableYears = Array.from(
      { length: maxYear - minYear + 1 }, 
      (_, i) => maxYear - i
    );
  } else {
    availableYears = Array.from({ length: 100 }, (_, i) => currentYear - i);
  }

  // Формируем итоговую дату для скрытого поля
  const fullDate = (day && month && year) ? `${year}-${month}-${day}` : '';

  // Валидируем возраст при изменении даты
  useEffect(() => {
    if (fullDate && onAgeValidation) {
      const validation = validateAge(fullDate);
      onAgeValidation(validation);
    }

    // Передаем дату в родительский компонент
    if (onDateChange) {
      onDateChange(fullDate);
    }

  }, [fullDate, selectedSubject]);

  const ageValidation = validateAge(fullDate);

  return (
    <div className={className}>
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="grid grid-cols-3 gap-2">
        {/* День */}
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          required={required}
          disabled={!selectedSubject}
        >
          <option value="">Day</option>
          {days.map(d => (
            <option key={d} value={String(d).padStart(2, '0')}>
              {d}
            </option>
          ))}
        </select>

        {/* Месяц */}
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          required={required}
          disabled={!selectedSubject}
        >
          <option value="">Month</option>
          {months.map(m => (
            <option key={m.value} value={m.value}>
              {m.name}
            </option>
          ))}
        </select>

        {/* Год */}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          required={required}
          disabled={!selectedSubject}
        >
          <option value="">Year</option>
          {availableYears.map(y => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Скрытое поле с итоговой датой */}
      <input
        type="hidden"
        name={name}
        value={fullDate}
      />

      {!selectedSubject && (
        <p className="text-xs text-gray-500 mt-1">
          Please select a subject first to enable date selection
        </p>
      )}

      {/* Показываем результат валидации */}
      {fullDate && selectedSubject && (
        <div className={`mt-2 p-3 border rounded-md ${
          ageValidation.isValid 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${
              ageValidation.isValid ? 'text-green-700' : 'text-red-700'
            }`}>
              {ageValidation.isValid ? '✅' : '❌'} {ageValidation.message}
            </span>
          </div>
          {ageValidation.isValid && (
            <div className="mt-1 text-xs text-green-600">
              Auto-assigned to: <strong>{ageValidation.categoryName}</strong>
            </div>
          )}
          {!ageValidation.isValid && ageValidation.allowedRange && (
            <div className="mt-1 text-xs text-red-600">
              Allowed range: {ageValidation.allowedRange}
            </div>
          )}
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
    </div>
  );
}