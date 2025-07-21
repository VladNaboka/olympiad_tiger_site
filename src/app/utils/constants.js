// Генерация ID для студента
export const generateStudentId = () => {
    return Math.random().toString().slice(2, 17); // 15-значный ID
  };
  
  // Константы
  export const CATEGORIES = [
    { id: 1, name: '6-9 years', ageRange: '6-9' },
    { id: 2, name: '10-13 years', ageRange: '10-13' },
    { id: 3, name: '14-17 years', ageRange: '14-17' }
  ];
  
  export const SUBJECTS = [
    { id: 1, name: 'Drawing', code: 'art' },
    { id: 2, name: 'Mathematics', code: 'math' }
  ];
  
  export const COUNTRIES = [
    'Kazakhstan', 'Russia', 'USA', 'India', 'China', 'Germany', 'France', 'United Kingdom'
  ];
  
  // Утилитарные функции
  export const calculateCategory = (birthDate) => {
    const birth = new Date(birthDate);
    const now = new Date();
    const age = now.getFullYear() - birth.getFullYear();
    
    if (age >= 6 && age <= 9) return 1;
    if (age >= 10 && age <= 13) return 2;
    if (age >= 14 && age <= 17) return 3;
    return 1;
  };
  
  export const getCategoryName = (categoryId) => {
    const category = CATEGORIES.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };