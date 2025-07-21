import db from '../utils/localDb';

// Задержка для имитации сетевого запроса
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Базовый класс для API
export class LocalAPI {
  
  // Авторизация и пользователи
  static async login(email, password) {
    await delay();
    console.log('🔐 Локальный логин:', email);
    
    const users = db.get('users');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Неверные учетные данные');
    }
    
    const token = db.generateToken();
    db.saveToken(token, user.id);
    
    // Убираем пароль из ответа
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      success: true,
      token,
      user: userWithoutPassword
    };
  }

  static async register(userData) {
    await delay();
    console.log('📝 Локальная регистрация:', userData.email);
    
    const users = db.get('users');
    const existingUser = users.find(u => u.email === userData.email);
    
    if (existingUser) {
      throw new Error('Пользователь с таким email уже существует');
    }
    
    const newUser = db.add('users', {
      ...userData,
      id: db.generateId()
    });
    
    const token = db.generateToken();
    db.saveToken(token, newUser.id);
    
    // Убираем пароль из ответа
    const { password: _, ...userWithoutPassword } = newUser;
    
    return {
      success: true,
      token,
      user: userWithoutPassword
    };
  }

  static async authWithToken(token) {
    await delay(100);
    console.log('🔑 Проверка локального токена');
    
    const user = db.validateToken(token);
    if (!user) {
      throw new Error('Недействительный токен');
    }
    
    // Убираем пароль из ответа
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      success: true,
      user: userWithoutPassword
    };
  }

  static async getUsers() {
    await delay();
    const users = db.get('users');
    return users.filter(u => u.role !== 'owner').map(({ password, ...user }) => user);
  }

  static async getUsersByCountry(country) {
    await delay();
    const users = db.findBy('users', { country });
    return users.filter(u => u.role === 'admin').map(({ password, ...user }) => user);
  }

  static async deleteUser(userId) {
    await delay();
    return db.delete('users', userId);
  }

  // Студенты
  static async addStudent(studentData) {
    await delay();
    console.log('➕ Добавление студента:', studentData.full_name);
    
    const newStudent = db.add('students', studentData);
    return {
      success: true,
      data: newStudent
    };
  }

  static async getStudentById(studentId) {
    await delay();
    return db.findById('students', studentId);
  }

  static async getStudentsByCountry(country) {
    await delay();
    console.log('👥 Получение студентов для страны:', country);
    return db.findBy('students', { country });
  }

  static async getStudentsByCourse(courseId) {
    await delay();
    return db.findBy('students', { course_id: parseInt(courseId) });
  }

  static async getStudentsBySchool(schoolName) {
    await delay();
    return db.findBy('students', { school: schoolName });
  }

  static async getStudentsByFilters(filters) {
    await delay();
    let students = db.get('students');
    
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        students = students.filter(s => s[key] === filters[key]);
      }
    });
    
    return students;
  }

  static async updateStudent(studentData) {
    await delay();
    return db.update('students', studentData.id, studentData);
  }

  static async deleteStudent(studentId) {
    await delay();
    return db.delete('students', studentId);
  }

  // Художественные работы
  static async uploadArtWork(artworkData) {
    await delay();
    console.log('🎨 Загрузка художественной работы');
    
    const newArtwork = db.add('artworks', {
      ...artworkData,
      file_url: `/placeholder-artwork-${Date.now()}.jpg`,
      score: null
    });
    
    return {
      success: true,
      data: newArtwork
    };
  }

  static async getArtWorksByCountryAndCategory(country, categoryId) {
    await delay();
    console.log('🎨 Получение художественных работ:', country, categoryId);
    return db.findBy('artworks', { country, category_id: parseInt(categoryId) });
  }

  static async getArtWorkById(id) {
    await delay();
    return db.findById('artworks', id);
  }

  static async setArtWorkScore(id, score) {
    await delay();
    console.log('⭐ Установка оценки для художественной работы:', id, score);
    return db.update('artworks', id, { score: parseInt(score) });
  }

  static async deleteArtWork(id) {
    await delay();
    return db.delete('artworks', id);
  }

  static async updateArtWork(id, data) {
    await delay();
    return db.update('artworks', id, data);
  }

  // Математические работы
  static async createMathWork(mathData) {
    await delay();
    console.log('🔢 Создание математической работы');
    
    const newMathWork = db.add('mathworks', {
      ...mathData,
      score: null
    });
    
    return {
      success: true,
      data: newMathWork
    };
  }

  static async getMathWorksByCountryAndCategory(country, categoryId) {
    await delay();
    console.log('🔢 Получение математических работ:', country, categoryId);
    return db.findBy('mathworks', { country, category_id: parseInt(categoryId) });
  }

  static async getMathWorkById(id) {
    await delay();
    return db.findById('mathworks', id);
  }

  static async setMathWorkScore(id, score) {
    await delay();
    console.log('⭐ Установка оценки для математической работы:', id, score);
    return db.update('mathworks', id, { score: parseInt(score) });
  }

  static async deleteMathWork(id) {
    await delay();
    return db.delete('mathworks', id);
  }

  static async updateMathWork(id, data) {
    await delay();
    return db.update('mathworks', id, data);
  }

  // Утилиты
  static async clearDatabase() {
    await delay();
    db.clear();
    return { success: true, message: 'База данных очищена' };
  }

  static async exportData() {
    await delay();
    return db.export();
  }

  static async importData(data) {
    await delay();
    db.import(data);
    return { success: true, message: 'Данные импортированы' };
  }

  static getStats() {
    const users = db.get('users');
    const students = db.get('students');
    const artworks = db.get('artworks');
    const mathworks = db.get('mathworks');
    
    return {
      users: users.length,
      students: students.length,
      artworks: artworks.length,
      mathworks: mathworks.length,
      countries: [...new Set(students.map(s => s.country))].length
    };
  }
}

export default LocalAPI;