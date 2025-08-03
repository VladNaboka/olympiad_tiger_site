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

// Возрастные категории
export const CATEGORIES = [
  { id: 1, name: 'Category I (6-9 years)', minAge: 6, maxAge: 9 },
  { id: 2, name: 'Category II (10-13 years)', minAge: 10, maxAge: 13 },
  { id: 3, name: 'Category III (14-17 years)', minAge: 14, maxAge: 17 }
];

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

// Функция для получения названия категории по ID
export const getCategoryName = (categoryId) => {
  const category = CATEGORIES.find(cat => cat.id === parseInt(categoryId));
  return category ? category.name : 'Unknown Category';
};

// Функция для расчета категории по дате рождения
export const calculateCategory = (birthDate) => {
  if (!birthDate) return null;
  
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  console.log(`🎂 Calculated age: ${age} for birth date: ${birthDate}`);
  
  if (age >= 6 && age <= 9) {
    console.log('📝 Category 1 (6-9 years)');
    return 1;
  } else if (age >= 10 && age <= 13) {
    console.log('📝 Category 2 (10-13 years)');
    return 2;
  } else if (age >= 14 && age <= 17) {
    console.log('📝 Category 3 (14-17 years)');
    return 3;
  }
  
  console.log('❌ Age outside of valid range');
  return null; // Возраст не подходит ни под одну категорию
};

// Функция для генерации ID студента
export const generateStudentId = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `TIG${timestamp.slice(-6)}${random}`;
};

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