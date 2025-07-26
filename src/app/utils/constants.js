// Константы для Tigers Olympiad Admin Panel

// Категории по возрасту
export const CATEGORIES = [
  { id: 1, name: 'Category I (6-9 years)', minAge: 6, maxAge: 9 },
  { id: 2, name: 'Category II (10-13 years)', minAge: 10, maxAge: 13 },
  { id: 3, name: 'Category III (14-17 years)', minAge: 14, maxAge: 17 }
];

// Предметы олимпиады
export const SUBJECTS = [
  { id: 1, name: 'Art', icon: '🎨', description: 'Visual arts and creativity' },
  { id: 2, name: 'Mathematics', icon: '📐', description: 'Mathematical problem solving' }
];

// Страны участники
export const COUNTRIES = [
  'Kazakhstan',
  'Russia', 
  'United States',
  'India',
  'China',
  'Germany',
  'France',
  'United Kingdom',
  'Japan',
  'South Korea',
  'Canada',
  'Australia',
  'Brazil',
  'Mexico',
  'Italy',
  'Spain',
  'Netherlands',
  'Sweden',
  'Norway',
  'Finland'
];

// Роли пользователей
export const USER_ROLES = [
  { id: 'owner', name: 'Main Administrator', description: 'Full system access' },
  { id: 'admin', name: 'Regional Representative', description: 'Country-specific access' },
  { id: 'teacher', name: 'Teacher', description: 'Limited access' }
];

// Функция для получения названия категории по ID
export function getCategoryName(categoryId) {
  const category = CATEGORIES.find(cat => cat.id === parseInt(categoryId));
  return category ? category.name : 'Unknown Category';
}

// Функция для получения названия предмета по ID
export function getSubjectName(subjectId) {
  const subject = SUBJECTS.find(subj => subj.id === parseInt(subjectId));
  return subject ? subject.name : 'Unknown Subject';
}

// Функция для определения категории по дате рождения
export function calculateCategory(birthDate) {
  if (!birthDate) return null;
  
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  
  // Корректируем возраст если день рождения еще не наступил в этом году
  const hasHadBirthdayThisYear = today.getMonth() > birth.getMonth() || 
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());
  
  const actualAge = hasHadBirthdayThisYear ? age : age - 1;
  
  // Определяем категорию
  if (actualAge >= 6 && actualAge <= 9) return 1;
  if (actualAge >= 10 && actualAge <= 13) return 2;
  if (actualAge >= 14 && actualAge <= 17) return 3;
  
  return null; // Возраст не попадает в диапазон олимпиады
}

// Функция для генерации ID студента
export function generateStudentId() {
  const prefix = 'TIG';
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${prefix}${year}${random}`;
}

// Функция для получения возрастного диапазона категории
export function getCategoryAgeRange(categoryId) {
  const category = CATEGORIES.find(cat => cat.id === parseInt(categoryId));
  return category ? `${category.minAge}-${category.maxAge} years` : 'Unknown';
}

// Функция для валидации возраста для категории
export function isValidAgeForCategory(birthDate, categoryId) {
  if (!birthDate || !categoryId) return false;
  
  const calculatedCategory = calculateCategory(birthDate);
  return calculatedCategory === parseInt(categoryId);
}

// Статусы работ
export const WORK_STATUSES = {
  PENDING: 'pending',
  SCORED: 'scored',
  REVIEWED: 'reviewed'
};

// Уровни оценок
export const SCORE_LEVELS = {
  EXCELLENT: { min: 90, max: 100, label: 'Excellent', color: 'green' },
  GOOD: { min: 80, max: 89, label: 'Good', color: 'blue' },
  SATISFACTORY: { min: 70, max: 79, label: 'Satisfactory', color: 'yellow' },
  NEEDS_IMPROVEMENT: { min: 0, max: 69, label: 'Needs Improvement', color: 'red' }
};

// Функция для получения уровня оценки
export function getScoreLevel(score) {
  if (!score) return null;
  
  const numScore = parseInt(score);
  
  for (const [key, level] of Object.entries(SCORE_LEVELS)) {
    if (numScore >= level.min && numScore <= level.max) {
      return { key, ...level };
    }
  }
  
  return null;
}

// Типы файлов для загрузки
export const ALLOWED_FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
  DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

// Максимальные размеры файлов (в байтах)
export const MAX_FILE_SIZES = {
  IMAGE: 10 * 1024 * 1024, // 10MB
  DOCUMENT: 5 * 1024 * 1024 // 5MB
};

// Функция для форматирования размера файла
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Функция для валидации файла
export function validateFile(file, type = 'image') {
  const allowedTypes = type === 'image' ? ALLOWED_FILE_TYPES.IMAGES : ALLOWED_FILE_TYPES.DOCUMENTS;
  const maxSize = type === 'image' ? MAX_FILE_SIZES.IMAGE : MAX_FILE_SIZES.DOCUMENT;
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}` };
  }
  
  if (file.size > maxSize) {
    return { valid: false, error: `File too large. Maximum size: ${formatFileSize(maxSize)}` };
  }
  
  return { valid: true };
}