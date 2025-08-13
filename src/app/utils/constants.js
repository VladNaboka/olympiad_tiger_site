// Роли пользователей
export const USER_ROLES = {
  MAIN_ADMIN: 1,      // Главный администратор
  REGIONAL_ADMIN: 2,  // Региональный представитель
};

export const ROLE_NAMES = {
  [USER_ROLES.MAIN_ADMIN]: 'Main Administrator',
  [USER_ROLES.REGIONAL_ADMIN]: 'Regional Representative',
  'owner': 'Main Administrator',
  'admin': 'Regional Representative',
};

// Функции для проверки ролей
export const isMainAdmin = (user) => {
  return user.role_id === USER_ROLES.MAIN_ADMIN || user.role === 'owner';
};

export const isRegionalAdmin = (user) => {
  return user.role_id === USER_ROLES.REGIONAL_ADMIN || user.role === 'admin';
};

export const getUserRoleName = (user) => {
  if (user.role_id) {
    return ROLE_NAMES[user.role_id] || 'Unknown Role';
  }
  return ROLE_NAMES[user.role] || user.role || 'Unknown Role';
};

// Категории для математики (4 категории - ID 1-4)
export const MATH_CATEGORIES = [
  { id: 1, name: 'Grade 5-6', minAge: 10, maxAge: 12, subject: 'math' },
  { id: 2, name: 'Grade 7-8', minAge: 12, maxAge: 14, subject: 'math' },
  { id: 3, name: 'Grade 9-10', minAge: 14, maxAge: 16, subject: 'math' },
  { id: 4, name: 'Grade 11-12', minAge: 16, maxAge: 18, subject: 'math' }
];

// Категории для искусства (3 категории - ID 5-7) 
export const ART_CATEGORIES = [
  { id: 5, name: 'Age 6-9', minAge: 6, maxAge: 9, subject: 'art' },
  { id: 6, name: 'Age 10-13', minAge: 10, maxAge: 13, subject: 'art' },
  { id: 7, name: 'Age 14-17', minAge: 14, maxAge: 17, subject: 'art' }
];

// Все категории вместе
export const ALL_CATEGORIES = [...MATH_CATEGORIES, ...ART_CATEGORIES];

// Старая константа для обратной совместимости
export const CATEGORIES = ALL_CATEGORIES;

// Предметы
export const SUBJECTS = [
  { id: '1', name: 'Art' },
  { id: '2', name: 'Mathematics' }
];

// Страны
export const COUNTRIES = [
  'Kazakhstan',
  'Russia',
  'United States',
  'United Kingdom', 
  'Germany',
  'France',
  'Italy',
  'Spain',
  'Canada',
  'Australia',
  'Japan',
  'China',
  'India',
  'Brazil',
  'Mexico',
  'Turkey',
  'Poland',
  'Czech Republic',
  'Ukraine',
  'Belarus',
  'Lithuania',
  'Latvia',
  'Estonia',
  'Georgia',
  'Armenia',
  'Azerbaijan',
  'Uzbekistan',
  'Kyrgyzstan',
  'Tajikistan',
  'Turkmenistan',
  'Mongolia'
];

// Карта стран для сокращений (добавьте в constants.js)
export const COUNTRY_CODES = {
  'Kazakhstan': 'KZ',
  'Russia': 'RU',
  'Kyrgyzstan': 'KG',
  'United States': 'US',
  'United Kingdom': 'UK',
  'Germany': 'DE',
  'France': 'FR',
  'Italy': 'IT',
  'Spain': 'ES',
  'Canada': 'CA',
  'Australia': 'AU',
  'Japan': 'JP',
  'China': 'CN',
  'India': 'IN',
  'Brazil': 'BR',
  'Mexico': 'MX',
  'Turkey': 'TR',
  'Poland': 'PL',
  'Czech Republic': 'CZ',
  'Ukraine': 'UA',
  'Belarus': 'BY',
  'Lithuania': 'LT',
  'Latvia': 'LV',
  'Estonia': 'EE',
  'Georgia': 'GE',
  'Armenia': 'AM',
  'Azerbaijan': 'AZ',
  'Uzbekistan': 'UZ',
  'Tajikistan': 'TJ',
  'Turkmenistan': 'TM',
  'Mongolia': 'MN'
};

// Функция для генерации уникального ID студента
export const generateStudentId = (country, categoryId) => {
  // Получаем код страны
  const countryCode = COUNTRY_CODES[country] || 'XX';
  
  // Генерируем 8 случайных цифр
  const randomDigits = Array.from({ length: 8 }, () => 
    Math.floor(Math.random() * 10)
  ).join('');
  
  // Формируем ID: СТРАНА-КАТЕГОРИЯ + 8 цифр
  const studentId = `${countryCode}-${categoryId}${randomDigits}`;
  
  console.log(`🆔 Generated student ID: ${studentId} for country: ${country}, category: ${categoryId}`);
  
  return studentId;
};

// Функция для проверки уникальности ID (можно расширить позже)
export const isValidStudentId = (id) => {
  const pattern = /^[A-Z]{2}-\d{9}$/;
  return pattern.test(id);
};

// Функция для получения категорий по предмету
export const getCategoriesBySubject = (subjectId) => {
  if (subjectId === 1 || subjectId === '1') {
    return ART_CATEGORIES; // Искусство
  } else if (subjectId === 2 || subjectId === '2') {
    return MATH_CATEGORIES; // Математика
  }
  return ALL_CATEGORIES;
};

// Функция для получения названия категории по ID
export const getCategoryName = (categoryId) => {
  const category = ALL_CATEGORIES.find(cat => cat.id === parseInt(categoryId));
  return category ? category.name : 'Unknown Category';
};

// Функция для расчета категории по дате рождения и предмету
export const calculateCategory = (birthDate, subjectId) => {
  if (!birthDate) return null;
  
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  console.log(`🎂 Calculated age: ${age} for birth date: ${birthDate}, subject: ${subjectId}`);
  
  const categories = getCategoriesBySubject(subjectId);
  
  for (const category of categories) {
    if (age >= category.minAge && age <= category.maxAge) {
      console.log(`📝 Category ${category.id} (${category.name})`);
      return category.id;
    }
  }
  
  console.log('❌ Age outside of valid range for this subject');
  return null;
};

// Добавьте эту функцию в constants.js:
export const calculateAge = (birthDate) => {
  if (!birthDate) return null;
  
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

// Функция для старой логики (без предмета) - для обратной совместимости
export const calculateCategoryOld = (birthDate) => {
  if (!birthDate) return null;
  
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  // Возвращаем категории искусства по умолчанию для старого кода
  if (age >= 6 && age <= 9) return 5;
  if (age >= 10 && age <= 13) return 6;
  if (age >= 14 && age <= 17) return 7;
  
  return null;
};

// // Функция для генерации ID студента
// export const generateStudentId = () => {
//   const timestamp = Date.now().toString();
//   const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
//   return `TIG${timestamp.slice(-6)}${random}`;
// };

// Функция для форматирования даты в читаемый вид
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  // Создаем объект Date из строки
  const date = new Date(dateString);
  
  // Проверяем, что дата валидна
  if (isNaN(date.getTime())) return dateString;
  
  // Форматируем в DD.MM.YYYY
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}.${month}.${year}`;
};

// Статусы работ
export const WORK_STATUSES = {
  PENDING: 'pending',
  REVIEWED: 'reviewed',
  SCORED: 'scored'
};

// Типы работ
export const WORK_TYPES = {
  ART: 'art',
  MATH: 'math'
};