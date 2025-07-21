// Локальная база данных на основе localStorage

// Ключи для localStorage
const STORAGE_KEYS = {
    USERS: 'tigers_users',
    STUDENTS: 'tigers_students', 
    ARTWORKS: 'tigers_artworks',
    MATHWORKS: 'tigers_mathworks',
    TOKENS: 'tigers_tokens'
  };
  
  // Начальные данные
  const INITIAL_DATA = {
    users: [
      {
        id: 1,
        full_name: "Main Administrator",
        email: "admin@tigers.com",
        password: "admin123",
        role: "owner",
        country: null,
        city: "Global",
        school: "Tigers Organization",
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        full_name: "Kazakhstan Representative",
        email: "kz@tigers.com", 
        password: "kz123",
        role: "admin",
        country: "Kazakhstan",
        city: "Almaty",
        school: "Regional Office KZ",
        created_at: new Date().toISOString()
      },
      {
        id: 3,
        full_name: "Russia Representative",
        email: "ru@tigers.com",
        password: "ru123", 
        role: "admin",
        country: "Russia",
        city: "Moscow",
        school: "Regional Office RU",
        created_at: new Date().toISOString()
      }
    ],
    students: [
      {
        id: "123456789012345",
        full_name: "Aida Bekova",
        birth_date: "2010-05-15",
        grade: "8",
        school: "School #1",
        email: "aida@example.com",
        phone: "+7 700 123 4567",
        country: "Kazakhstan",
        city: "Almaty", 
        category_id: 2,
        course_id: 1,
        created_at: new Date().toISOString()
      },
      {
        id: "234567890123456",
        full_name: "Arman Nazarbayev", 
        birth_date: "2012-08-20",
        grade: "6",
        school: "School #5",
        email: "arman@example.com",
        phone: "+7 700 234 5678",
        country: "Kazakhstan",
        city: "Astana",
        category_id: 2,
        course_id: 2,
        created_at: new Date().toISOString()
      },
      {
        id: "345678901234567",
        full_name: "Elena Petrova",
        birth_date: "2008-12-10", 
        grade: "10",
        school: "Gymnasium #3",
        email: "elena@example.com",
        phone: "+7 905 345 6789",
        country: "Russia",
        city: "Moscow",
        category_id: 3,
        course_id: 1,
        created_at: new Date().toISOString()
      }
    ],
    artworks: [
      {
        id: 1,
        student_id: "123456789012345",
        title: "Artwork by Aida Bekova",
        country: "Kazakhstan",
        category_id: 2,
        file_url: "/placeholder-artwork-1.jpg",
        score: 85,
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        student_id: "345678901234567", 
        title: "Artwork by Elena Petrova",
        country: "Russia",
        category_id: 3,
        file_url: "/placeholder-artwork-2.jpg",
        score: 92,
        created_at: new Date().toISOString()
      }
    ],
    mathworks: [
      {
        id: 1,
        student_id: "234567890123456",
        title: "Math Result for Arman Nazarbayev",
        country: "Kazakhstan", 
        category_id: 2,
        score: 78,
        created_at: new Date().toISOString()
      }
    ]
  };
  
  // Утилиты для работы с localStorage
  class LocalDB {
    constructor() {
      this.initializeData();
    }
  
    // Инициализация данных
    initializeData() {
      Object.keys(STORAGE_KEYS).forEach(key => {
        const storageKey = STORAGE_KEYS[key];
        if (!localStorage.getItem(storageKey)) {
          const dataKey = key.toLowerCase();
          localStorage.setItem(storageKey, JSON.stringify(INITIAL_DATA[dataKey] || []));
        }
      });
    }
  
    // Получить данные
    get(tableName) {
      const key = STORAGE_KEYS[tableName.toUpperCase()];
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    }
  
    // Сохранить данные
    set(tableName, data) {
      const key = STORAGE_KEYS[tableName.toUpperCase()];
      localStorage.setItem(key, JSON.stringify(data));
    }
  
    // Добавить запись
    add(tableName, record) {
      const data = this.get(tableName);
      const newRecord = {
        ...record,
        id: record.id || this.generateId(),
        created_at: new Date().toISOString()
      };
      data.push(newRecord);
      this.set(tableName, data);
      return newRecord;
    }
  
    // Найти по ID
    findById(tableName, id) {
      const data = this.get(tableName);
      return data.find(item => item.id == id);
    }
  
    // Найти по условию
    findBy(tableName, condition) {
      const data = this.get(tableName);
      return data.filter(item => {
        return Object.keys(condition).every(key => item[key] === condition[key]);
      });
    }
  
    // Обновить запись
    update(tableName, id, updates) {
      const data = this.get(tableName);
      const index = data.findIndex(item => item.id == id);
      if (index !== -1) {
        data[index] = { ...data[index], ...updates, updated_at: new Date().toISOString() };
        this.set(tableName, data);
        return data[index];
      }
      return null;
    }
  
    // Удалить запись
    delete(tableName, id) {
      const data = this.get(tableName);
      const filteredData = data.filter(item => item.id != id);
      this.set(tableName, filteredData);
      return filteredData.length < data.length;
    }
  
    // Генерация ID
    generateId() {
      return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }
  
    // Генерация токена
    generateToken() {
      return 'local_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
  
    // Сохранить токен
    saveToken(token, userId) {
      const tokens = this.get('tokens');
      const tokenData = {
        token,
        user_id: userId,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 часа
      };
      tokens.push(tokenData);
      this.set('tokens', tokens);
    }
  
    // Проверить токен
    validateToken(token) {
      const tokens = this.get('tokens');
      const tokenData = tokens.find(t => t.token === token);
      
      if (!tokenData) return null;
      
      // Проверяем истечение токена
      if (new Date(tokenData.expires_at) < new Date()) {
        this.deleteToken(token);
        return null;
      }
      
      return this.findById('users', tokenData.user_id);
    }
  
    // Удалить токен
    deleteToken(token) {
      const tokens = this.get('tokens');
      const filteredTokens = tokens.filter(t => t.token !== token);
      this.set('tokens', filteredTokens);
    }
  
    // Очистить просроченные токены
    cleanExpiredTokens() {
      const tokens = this.get('tokens');
      const validTokens = tokens.filter(t => new Date(t.expires_at) >= new Date());
      this.set('tokens', validTokens);
    }
  
    // Полная очистка базы данных
    clear() {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      this.initializeData();
    }
  
    // Экспорт данных
    export() {
      const exportData = {};
      Object.keys(STORAGE_KEYS).forEach(key => {
        exportData[key.toLowerCase()] = this.get(key);
      });
      return exportData;
    }
  
    // Импорт данных
    import(data) {
      Object.keys(data).forEach(key => {
        if (STORAGE_KEYS[key.toUpperCase()]) {
          this.set(key, data[key]);
        }
      });
    }
  }
  
  // Экспортируем единственный экземпляр
  const db = new LocalDB();
  export default db;