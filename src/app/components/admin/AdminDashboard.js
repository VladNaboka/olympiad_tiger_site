'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getArtWorksByCountryAndCategory } from '../../api/student_art_works';
import { getMathWorksByCountryAndCategory } from '../../api/student_math_works';
import { getAdminsAndTeachers } from '../../api/users_api';
import { registerUser, deleteUser, updateUser, MIN_PASSWORD_LENGTH } from '../../api/auth_api';
import { CATEGORIES, SUBJECTS, COUNTRIES, getCategoryName, isMainAdmin, isRegionalAdmin, getUserRoleName, formatDate } from '../../utils/constants';
import GalleryTab from './GalleryTab';
import ResultsTab from './ResultsTab';
import AddStudentForm from './AddStudentForm';
import WorksManagement from './WorksManagement';
import MainAdminWorksManagement from './MainAdminWorksManagement';
import FeedbackTab from './FeedbackTab';
import OlympiadTab from './OlympiadTab';
import { getStudentsByCountry, updateStudent, deleteStudent } from '../../api/students_api';
import DateSelector from './DateSelector';
import { getCategoriesBySubject } from '../../utils/constants';

// Форма добавления регионального представителя
function AddRepresentativeForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    country: '',
    city: '',
    school: '',
    phone: '',
    role: 'admin' // Всегда региональный представитель
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`);
      setLoading(false);
      return;
    }

    try {
      await registerUser(formData);
      onSuccess();
    } catch (error) {
      setError(error.message || 'Failed to add representative');
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-orange-600">Add Regional Representative</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
                minLength={MIN_PASSWORD_LENGTH}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="+7 700 123 4567"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Country *
              </label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select country</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
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
              disabled={loading}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Representative'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Главная админ панель (role_id = 1 или role = 'owner')
function MainAdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [showAddRepForm, setShowAddRepForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [mathworks, setMathworks] = useState([]);

  // РАЗДЕЛЕННЫЕ ФИЛЬТРЫ
  const [studentsFilters, setStudentsFilters] = useState({
    country: '',
    category: ''
  });

  const [worksFilters, setWorksFilters] = useState({
    country: '',
    category: '',
    subject: ''
  });

  const [overviewStats, setOverviewStats] = useState({
    totalUsers: null,      // null означает загрузка
    totalStudents: null,
    totalArtworks: null,
    totalMathworks: null
  });

  const [loading, setLoading] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [editingRepresentative, setEditingRepresentative] = useState(null);
  const [editingStudentData, setEditingStudentData] = useState({});

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleEditRepresentative = (representative) => {
    setEditingRepresentative(representative);
  };

  function AnimatedNumber({ value, label, color, icon }) {
    const [displayValue, setDisplayValue] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (value !== null && value !== displayValue && !hasAnimated) {
        setIsAnimating(true);
        setHasAnimated(true);

        // Анимация счетчика от 0 до конечного значения
        const duration = 800; // 0.8 секунды
        const steps = 20;
        const stepValue = value / steps;
        const stepDuration = duration / steps;

        let currentStep = 0;

        const timer = setInterval(() => {
          currentStep++;
          const currentValue = Math.min(Math.round(stepValue * currentStep), value);
          setDisplayValue(currentValue);

          if (currentStep >= steps || currentValue >= value) {
            clearInterval(timer);
            setDisplayValue(value);
            setIsAnimating(false);
          }
        }, stepDuration);

        return () => clearInterval(timer);
      } else if (value !== null && hasAnimated) {
        // Если данные уже загружались, обновляем без анимации
        setDisplayValue(value);
      }
    }, [value, hasAnimated]);

    if (value === null) {
      return (
        <div className={`${color} p-6 rounded-lg relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          <h3 className="text-lg font-semibold mb-2">{label}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-3xl">{icon}</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
          <p className="text-sm mt-2 opacity-75">Loading...</p>
        </div>
      );
    }

    return (
      <div className={`${color} p-6 rounded-lg transition-all duration-300 ${isAnimating ? 'scale-105' : 'scale-100'}`}>
        <h3 className="text-lg font-semibold mb-2">{label}</h3>
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{icon}</span>
          <div className="text-3xl font-bold relative">
            <span className={`transition-all duration-200`}>
              {displayValue.toLocaleString()}
            </span>
            {isAnimating && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse rounded"></div>
            )}
          </div>
        </div>
        <p className="text-sm mt-2 opacity-75">
          {isAnimating ? 'Counting...' : `${displayValue.toLocaleString()} total`}
        </p>
      </div>
    );
  }


  const loadOverviewStats = async () => {
    try {
      console.log('🔄 Loading overview statistics...');

      // Сначала устанавливаем null для показа анимации загрузки
      setOverviewStats({
        totalUsers: null,
        totalStudents: null,
        totalArtworks: null,
        totalMathworks: null
      });

      // Загружаем пользователей
      const usersData = await getAdminsAndTeachers();

      // Обновляем первую статистику
      setOverviewStats(prev => ({
        ...prev,
        totalUsers: usersData?.length || 0
      }));

      // Загружаем студентов с небольшой задержкой для эффекта
      setTimeout(async () => {
        const allStudents = [];
        for (const country of COUNTRIES) {
          try {
            const countryStudents = await getStudentsByCountry(country);
            if (countryStudents && countryStudents.length > 0) {
              allStudents.push(...countryStudents);
            }
          } catch (error) {
            console.warn(`No students in ${country}`);
          }
        }

        setOverviewStats(prev => ({
          ...prev,
          totalStudents: allStudents.length
        }));
      }, 300);

      // Загружаем работы с дополнительной задержкой
      setTimeout(async () => {
        let allArtworks = [];
        let allMathworks = [];

        for (const country of COUNTRIES) {
          for (const category of CATEGORIES) {
            try {
              const artworks = await getArtWorksByCountryAndCategory(country, category.id);
              if (artworks && artworks.length > 0) {
                allArtworks.push(...artworks);
              }
            } catch (error) {
              // Игнорируем ошибки
            }

            try {
              const mathworks = await getMathWorksByCountryAndCategory(country, category.id);
              if (mathworks && mathworks.length > 0) {
                allMathworks.push(...mathworks);
              }
            } catch (error) {
              // Игнорируем ошибки
            }
          }
        }

        setOverviewStats(prev => ({
          ...prev,
          totalArtworks: allArtworks.length,
          totalMathworks: allMathworks.length
        }));
      }, 600);

      // Также обновляем пользователей для других вкладок
      setUsers(usersData || []);

      console.log('📊 Overview stats loading initiated');

    } catch (error) {
      console.error('❌ Error loading overview stats:', error);
      // В случае ошибки показываем 0 вместо null
      setOverviewStats({
        totalUsers: 0,
        totalStudents: 0,
        totalArtworks: 0,
        totalMathworks: 0
      });
    }
  };

  // Загрузка данных для главного админа - СТУДЕНТЫ
  const loadStudentsData = async () => {
    setLoading(true);
    try {
      console.log('🔄 Loading students data with filters:', studentsFilters);

      // Загружаем всех пользователей
      const usersData = await getAdminsAndTeachers();
      setUsers(usersData || []);
      console.log('👥 Users loaded:', usersData?.length || 0);

      // Загружаем студентов
      let studentsData = []; // Инициализируем как пустой массив

      if (studentsFilters.country) {
        // Если выбрана конкретная страна
        console.log('🌍 Loading students for specific country:', studentsFilters.country);
        try {
          const countryStudents = await getStudentsByCountry(studentsFilters.country);
          studentsData = countryStudents || []; // Обеспечиваем, что это всегда массив
        } catch (error) {
          console.warn(`No students found in ${studentsFilters.country}:`, error);
          studentsData = []; // Устанавливаем пустой массив в случае ошибки
        }
      } else {
        // Если страна не выбрана, загружаем студентов из всех стран
        console.log('🌍 Loading students from all countries...');
        const allStudents = [];

        for (const country of COUNTRIES) {
          try {
            const countryStudents = await getStudentsByCountry(country);
            if (countryStudents && Array.isArray(countryStudents) && countryStudents.length > 0) {
              allStudents.push(...countryStudents);
            }
          } catch (error) {
            console.warn(`No students found in ${country}:`, error);
          }
        }
        studentsData = allStudents;
      }

      // Фильтруем по категории если нужно
      if (studentsFilters.category && Array.isArray(studentsData)) {
        studentsData = studentsData.filter(s => s.category_id === parseInt(studentsFilters.category));
      }

      setStudents(studentsData || []);
      console.log('👨‍🎓 Total students loaded:', studentsData?.length || 0);
    } catch (error) {
      console.error('❌ Error loading students data:', error);
      setStudents([]); // В случае общей ошибки устанавливаем пустой массив
    }
    setLoading(false);
  };

  // Загрузка данных для главного админа - РАБОТЫ
  const loadWorksData = async () => {
    setLoading(true);
    try {
      console.log('🔄 Loading works data with filters:', worksFilters);

      // Загружаем работы только если выбрана конкретная страна
      if (worksFilters.country) {
        console.log('📝 Loading works for country:', worksFilters.country);

        // Загружаем художественные работы
        if (worksFilters.subject === '1' || !worksFilters.subject) {
          console.log('🎨 Loading art works...');
          try {
            let artData = [];

            if (worksFilters.category) {
              artData = await getArtWorksByCountryAndCategory(worksFilters.country, parseInt(worksFilters.category));
            } else {
              // Загружаем все художественные работы для страны
              for (const category of CATEGORIES) {
                try {
                  const categoryArtworks = await getArtWorksByCountryAndCategory(worksFilters.country, category.id);
                  if (categoryArtworks && categoryArtworks.length > 0) {
                    artData.push(...categoryArtworks);
                  }
                } catch (categoryError) {
                  console.warn(`No artworks for category ${category.id}:`, categoryError);
                }
              }
            }

            setArtworks(artData || []);
            console.log('✅ Artworks loaded:', artData?.length || 0);
          } catch (error) {
            console.error('❌ Error loading artworks:', error);
            setArtworks([]);
          }
        } else {
          setArtworks([]);
        }

        // Загружаем математические работы
        if (worksFilters.subject === '2' || !worksFilters.subject) {
          console.log('📐 Loading math works...');
          try {
            let mathData = [];

            if (worksFilters.category) {
              mathData = await getMathWorksByCountryAndCategory(worksFilters.country, parseInt(worksFilters.category));
            } else {
              // Загружаем все математические работы для страны
              for (const category of CATEGORIES) {
                try {
                  const categoryMathworks = await getMathWorksByCountryAndCategory(worksFilters.country, category.id);
                  if (categoryMathworks && categoryMathworks.length > 0) {
                    mathData.push(...categoryMathworks);
                  }
                } catch (categoryError) {
                  console.warn(`No math works for category ${category.id}:`, categoryError);
                }
              }
            }

            setMathworks(mathData || []);
            console.log('✅ Math works loaded:', mathData?.length || 0);
          } catch (error) {
            console.error('❌ Error loading math works:', error);
            setMathworks([]);
          }
        } else {
          setMathworks([]);
        }
      } else {
        setArtworks([]);
        setMathworks([]);
      }
    } catch (error) {
      console.error('❌ Error loading works data:', error);
    }
    setLoading(false);
  };

  // Загружаем базовые данные при монтировании
  useEffect(() => {
    loadStudentsData();
  }, [studentsFilters]);

  // Загружаем данные работ при изменении worksFilters
  useEffect(() => {
    if (activeTab === 'works') {
      loadWorksData();
    }
  }, [worksFilters, activeTab]);

  useEffect(() => {
    // Загружаем общую статистику для Overview при монтировании
    loadOverviewStats();
  }, []);

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}?`)) {
      try {
        await deleteUser(userId);
        loadStudentsData(); // Перезагружаем данные
        alert('Representative deleted successfully');
      } catch (error) {
        alert('Error deleting representative: ' + error.message);
      }
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setEditingStudentData({
      subject: student.course_id,
      category: student.category_id
    });
  };

  const handleDeleteStudent = (student) => {
    setDeletingStudent(student);
  };

  const confirmDeleteStudent = async (studentId) => {
    try {
      await deleteStudent(studentId);
      await loadStudentsData();
      setDeletingStudent(null);
      alert('Student deleted successfully');
    } catch (error) {
      alert('Error deleting student: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffbf2]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - адаптивный */}
            <div className="flex items-center min-w-0 flex-1">
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity mr-2 sm:mr-4 flex-shrink-0">
                <img src="/image/logonavbar.png" alt="Tigers Logo" className="h-8 sm:h-10 w-auto" />
              </Link>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                <span className="text-white font-bold text-sm sm:text-base">T</span>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-xl font-bold text-gray-900 truncate">
                  <span className="hidden lg:inline">Tigers Olympiad - </span>
                  <span className="lg:hidden">Tigers </span>
                  Main Admin
                </h1>
                <span className="hidden md:inline-block ml-0 md:ml-3 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                  <span className="hidden lg:inline">👑 Main Administrator</span>
                  <span className="lg:hidden">👑 Admin</span>
                </span>
              </div>
            </div>

            {/* Right side - адаптивный */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 flex-shrink-0">
              <Link
                href="/"
                className="hidden sm:block text-gray-600 hover:text-orange-500 transition-colors text-sm lg:text-base"
              >
                <span className="hidden lg:inline">← Back to Site</span>
                <span className="lg:hidden">← Back</span>
              </Link>

              {/* User info - скрываем на очень маленьких экранах */}
              <div className="hidden sm:block">
                <span className="text-gray-700 text-xs sm:text-sm truncate max-w-20 sm:max-w-none">
                  {user.full_name}
                </span>
              </div>

              {/* Mobile user menu button */}
              <div className="sm:hidden relative">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>

                {/* Mobile dropdown */}
                {mobileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50 border">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      {user.full_name}
                    </div>
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ← Back to Site
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Desktop logout button */}
              <button
                onClick={onLogout}
                className="hidden sm:block text-gray-500 hover:text-gray-700 px-2 py-1 text-sm lg:text-base"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">🌍 Global Management Dashboard</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
                👑 Main Administrator
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                🌍 All Countries Access
              </span>
            </div>
          </div>

          {/* Навигация для главного админа */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'overview'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                📊 Overview
              </button>
              <button
                onClick={() => setActiveTab('representatives')}
                className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center space-x-2 ${activeTab === 'representatives'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <span>👤 Representatives</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {users.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'students'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                👥 All Participants
              </button>
              <button
                onClick={() => setActiveTab('works')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'works'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                🎨 All Works
              </button>
              <button
                onClick={() => setActiveTab('feedback')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'feedback'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                📬 Feedback
              </button>
              <button
                onClick={() => setActiveTab('olympiad')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === 'olympiad'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                🏆 Olympiad
              </button>
            </nav>
          </div>
        </div>

        {/* Контент вкладок для главного админа */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

          {!loading && activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Global Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <AnimatedNumber
                  value={overviewStats.totalUsers}
                  label="Total Representatives"
                  color="bg-blue-50 text-blue-800"
                  icon="👥"
                />
                <AnimatedNumber
                  value={overviewStats.totalStudents}
                  label="Total Participants"
                  color="bg-green-50 text-green-800"
                  icon="🎓"
                />
                <AnimatedNumber
                  value={overviewStats.totalArtworks}
                  label="Art Works"
                  color="bg-purple-50 text-purple-800"
                  icon="🎨"
                />
                <AnimatedNumber
                  value={overviewStats.totalMathworks}
                  label="Math Works"
                  color="bg-orange-50 text-orange-800"
                  icon="📊"
                />
              </div>

              {/* Enhanced Quick Actions Cards with hover animations */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">👤</span>
                    <h3 className="text-lg font-semibold">Manage Representatives</h3>
                  </div>
                  <p className="text-sm mb-4 opacity-90">Add, edit, or remove regional representatives</p>
                  <button
                    onClick={() => setActiveTab('representatives')}
                    className="bg-white text-orange-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors transform hover:scale-105"
                  >
                    Manage Representatives
                  </button>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">👥</span>
                    <h3 className="text-lg font-semibold">Add Participant</h3>
                  </div>
                  <p className="text-sm mb-4 opacity-90">Register new participants from any country</p>
                  <button
                    onClick={() => setShowAddStudentForm(true)}
                    className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors transform hover:scale-105"
                  >
                    Add Participant
                  </button>
                </div>
              </div>
            </div>
          )}

          {!loading && activeTab === 'representatives' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Regional Representatives</h2>
                <button
                  onClick={() => setShowAddRepForm(true)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
                >
                  <span className="mr-2">+</span>
                  Add Representative
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((rep) => (
                      <tr key={rep.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{rep.full_name}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{rep.email}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{rep.phone}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            🌍 {rep.country}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditRepresentative(rep)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteUser(rep.id, rep.full_name)}
                              className="text-red-600 hover:text-red-800 font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {users.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No representatives found. Add some to get started!
                  </div>
                )}
              </div>
            </div>
          )}

          {!loading && activeTab === 'students' && (
            <div>
              {/* ФИЛЬТРЫ ДЛЯ СТУДЕНТОВ */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">🔍 Filter Participants</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">🌍 Country</label>
                    <select
                      value={studentsFilters.country}
                      onChange={(e) => setStudentsFilters({ ...studentsFilters, country: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    >
                      <option value="">All Countries</option>
                      {COUNTRIES.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">🎯 Category</label>
                    <select
                      value={studentsFilters.category}
                      onChange={(e) => setStudentsFilters({ ...studentsFilters, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                    >
                      <option value="">All Categories</option>
                      {CATEGORIES.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={() => setStudentsFilters({ country: '', category: '' })}
                      className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
                    >
                      🔄 Clear Filters
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    All Participants
                    {studentsFilters.country && (
                      <span className="ml-2 text-base font-normal text-gray-600">
                        from {studentsFilters.country}
                      </span>
                    )}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {studentsFilters.country
                      ? `Showing participants from ${studentsFilters.country}`
                      : 'Showing participants from all countries'
                    }
                  </p>
                </div>
                <button
                  onClick={() => setShowAddStudentForm(true)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
                >
                  <span className="mr-2">+</span>
                  Add Participant
                </button>
              </div>

              {/* Дополнительная статистика */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-blue-800">Total Students</h3>
                  <p className="text-2xl font-bold text-blue-600">{students.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-green-800">Countries</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {[...new Set(students.map(s => s.country))].length}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-purple-800">Categories</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {[...new Set(students.map(s => s.category_id))].length}
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-orange-800">Schools</h3>
                  <p className="text-2xl font-bold text-orange-600">
                    {[...new Set(students.map(s => s.school))].length}
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Birth Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(students && Array.isArray(students) ? students : []).map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-mono text-gray-900 bg-yellow-50">
                          {student.id}
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">
                          {student.name || student.full_name}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {formatDate(student.birth_date)}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {student.school}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            🌍 {student.country}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            🏙️ {student.city}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {getCategoryName(student.category_id)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditStudent(student)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student)}
                              className="text-red-600 hover:text-red-800 font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {students.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-4">👥</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No participants found</h3>
                    <p className="text-gray-500 mb-4">
                      {studentsFilters.country
                        ? `No participants found in ${studentsFilters.country}`
                        : 'No participants have been registered yet'
                      }
                    </p>
                    {/* <button
                      onClick={() => setShowAddStudentForm(true)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                    >
                      Add First Participant
                    </button> */}
                  </div>
                )}
              </div>
            </div>
          )}

          {!loading && activeTab === 'works' && (
            <MainAdminWorksManagement
              user={user}
              filters={worksFilters}
              setFilters={setWorksFilters}
            />
          )}

          {!loading && activeTab === 'feedback' && (
            <FeedbackTab />
          )}

          {!loading && activeTab === 'olympiad' && (
            <OlympiadTab />
          )}

          {!loading && activeTab === 'statistics' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Global Statistics</h2>
              <div className="text-center py-8 text-gray-500">
                Advanced statistics dashboard coming soon
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Форма добавления студента */}
      {showAddStudentForm && (
        <AddStudentForm
          onClose={() => setShowAddStudentForm(false)}
          onSuccess={(studentId) => {
            setShowAddStudentForm(false);
            loadStudentsData();
            alert(`Student added successfully! ID: ${studentId}`);
          }}
          userCountry={null} // Главный админ может выбирать любую страну
        />
      )}

      {/* Форма добавления представителя */}
      {showAddRepForm && (
        <AddRepresentativeForm
          onClose={() => setShowAddRepForm(false)}
          onSuccess={() => {
            setShowAddRepForm(false);
            loadStudentsData();
            alert('Representative added successfully!');
          }}
        />
      )}

      {/* Модальное окно редактирования студента */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-orange-600">Edit Student</h3>
              <button
                onClick={() => setEditingStudent(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const studentData = {
                id: editingStudent.id,
                name: formData.get('name'),
                birth_date: formData.get('birth_date'),
                school: formData.get('school'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                country: formData.get('country'),
                city: formData.get('city'),
                course_id: formData.get('course_id'),
                category_id: formData.get('category_id')
              };

              try {
                await updateStudent(studentData);
                await loadStudentsData();
                setEditingStudent(null);
                alert('Student updated successfully!');
              } catch (error) {
                alert('Error updating student: ' + error.message);
              }
            }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingStudent.name || editingStudent.full_name}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <DateSelector
                  label="Birth Date"
                  name="birth_date"
                  defaultValue={editingStudent.birth_date}
                  required={true}
                  selectedSubject={editingStudentData.subject || editingStudent.course_id}
                  onAgeValidation={(validation) => {
                    if (validation.isValid && validation.categoryId) {
                      setEditingStudentData(prev => ({
                        ...prev,
                        category: validation.categoryId
                      }));
                    }
                  }}
                />

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={editingStudent.email}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={editingStudent.phone}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Country *</label>
                  <select
                    name="country"
                    defaultValue={editingStudent.country}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    {COUNTRIES.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    defaultValue={editingStudent.city}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">School *</label>
                  <input
                    type="text"
                    name="school"
                    defaultValue={editingStudent.school}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Subject *</label>
                  <select
                    name="course_id"
                    value={editingStudentData.subject || editingStudent.course_id}
                    onChange={(e) => {
                      const newSubject = e.target.value;
                      setEditingStudentData({
                        subject: newSubject,
                        category: ''
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    {SUBJECTS.map(subject => (
                      <option key={subject.id} value={subject.id}>{subject.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Category *</label>
                  <select
                    name="category_id"
                    value={editingStudentData.category || editingStudent.category_id}
                    onChange={(e) => setEditingStudentData(prev => ({
                      ...prev,
                      category: parseInt(e.target.value)
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select category</option>
                    {getCategoriesBySubject(editingStudentData.subject || editingStudent.course_id).map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Update Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Модальное окно подтверждения удаления студента */}
      {deletingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-red-600">Delete Student</h3>
              <button
                onClick={() => setDeletingStudent(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete student <strong>{deletingStudent.name || deletingStudent.full_name}</strong>?
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>School:</strong> {deletingStudent.school}<br />
                  <strong>Country:</strong> {deletingStudent.country}<br />
                  <strong>City:</strong> {deletingStudent.city}
                </p>
              </div>
              <p className="text-red-600 text-sm mt-3">
                ⚠️ This action cannot be undone!
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeletingStudent(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDeleteStudent(deletingStudent.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Модальное окно редактирования представителя */}
      {editingRepresentative && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-orange-600">Edit Representative</h3>
              <button
                onClick={() => setEditingRepresentative(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);

              const password = formData.get('password');

              // Проверяем пароль если он введен
              if (password && password.length > 0) {
                if (password.length < MIN_PASSWORD_LENGTH) {
                  alert(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long!`);
                  return;
                }
              }

              try {
                await updateUser(
                  editingRepresentative.id,
                  formData.get('full_name'),
                  formData.get('email'),
                  password || undefined, // Передаем пароль только если он введен
                  formData.get('country'),
                  formData.get('phone'),
                  undefined  // role_id не меняем
                );
                await loadStudentsData();
                setEditingRepresentative(null);
                alert('Representative updated successfully!');
              } catch (error) {
                alert('Error updating representative: ' + error.message);
              }
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="full_name"
                    defaultValue={editingRepresentative.full_name}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={editingRepresentative.email}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    New Password
                    <span className="text-gray-500 font-normal">(leave empty to keep current)</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      id="passwordField"
                      placeholder="Enter new password (optional)"
                      className="w-full px-3 py-2 pr-12 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      minLength={MIN_PASSWORD_LENGTH}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const field = document.getElementById('passwordField');
                        const button = event.target;
                        if (field.type === 'password') {
                          field.type = 'text';
                          button.textContent = '🙈';
                          button.title = 'Hide password';
                        } else {
                          field.type = 'password';
                          button.textContent = '👁️';
                          button.title = 'Show password';
                        }
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      title="Show password"
                    >
                      👁️
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={editingRepresentative.phone}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Country *</label>
                  <select
                    name="country"
                    defaultValue={editingRepresentative.country}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select country</option>
                    {COUNTRIES.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingRepresentative(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Update Representative
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Региональная админ панель (role_id = 2 или role = 'admin')
function RegionalAdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('students');
  const [showAddForm, setShowAddForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [mathworks, setMathworks] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    subject: ''
  });
  const [loading, setLoading] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [editingStudentData, setEditingStudentData] = useState({});

  // При открытии модального окна редактирования
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setEditingStudentData({
      subject: student.course_id,
      category: student.category_id
    });
  };

  const handleDeleteStudent = (student) => {
    setDeletingStudent(student);
  };

  const confirmDeleteStudent = async (studentId) => {
    try {
      await deleteStudent(studentId);
      await loadData();
      setDeletingStudent(null);
      alert('Student deleted successfully');
    } catch (error) {
      alert('Error deleting student: ' + error.message);
    }
  };

  const [editingStudentSubject, setEditingStudentSubject] = useState('');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (editingStudent) {
      setEditingStudentSubject(editingStudent.course_id);
    }
  }, [editingStudent]);

  // Загрузка данных для регионального админа
  const loadData = async () => {
    if (!user.country) return;
    setLoading(true);

    try {
      console.log('🔄 Loading students for country:', user.country);
      const studentsData = await getStudentsByCountry(user.country);

      // Обеспечиваем, что studentsData всегда массив
      const safeStudentsData = studentsData && Array.isArray(studentsData) ? studentsData : [];

      console.log('📊 Students loaded:', safeStudentsData.length, 'students');
      console.log('📋 First student example:', safeStudentsData[0]);
      setStudents(safeStudentsData);

      // Загружаем работы если выбрана категория
      if (filters.category) {
        if (filters.subject === '1' || !filters.subject) {
          try {
            const artData = await getArtWorksByCountryAndCategory(user.country, parseInt(filters.category));
            setArtworks(artData || []);
          } catch (error) {
            console.error('Error loading artworks:', error);
            setArtworks([]);
          }
        }
        if (filters.subject === '2' || !filters.subject) {
          try {
            const mathData = await getMathWorksByCountryAndCategory(user.country, parseInt(filters.category));
            setMathworks(mathData || []);
          } catch (error) {
            console.error('Error loading math works:', error);
            setMathworks([]);
          }
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setStudents([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [user, filters]);

  return (
    <div className="min-h-screen bg-[#fffbf2]">
      {/* Header для регионального админа */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - адаптивный */}
            <div className="flex items-center min-w-0 flex-1">
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity mr-2 sm:mr-4 flex-shrink-0">
                <img src="/image/logonavbar.png" alt="Tigers Logo" className="h-8 sm:h-10 w-auto" />
              </Link>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                <span className="text-white font-bold text-sm sm:text-base">T</span>
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-sm sm:text-xl font-bold text-gray-900 truncate">
                  <span className="hidden lg:inline">Tigers Olympiad - </span>
                  <span className="lg:hidden">Tigers </span>
                  {user.country}
                </h1>
                <span className="hidden md:inline-block ml-0 md:ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  <span className="hidden lg:inline">🌍 Regional Representative</span>
                  <span className="lg:hidden">🌍 Regional</span>
                </span>
              </div>
            </div>

            {/* Right side - адаптивный */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 flex-shrink-0">
              <Link
                href="/"
                className="hidden sm:block text-gray-600 hover:text-orange-500 transition-colors text-sm lg:text-base"
              >
                <span className="hidden lg:inline">← Back to Site</span>
                <span className="lg:hidden">← Back</span>
              </Link>

              {/* User info - адаптивный */}
              <div className="hidden md:block">
                <span className="text-gray-700 text-xs sm:text-sm truncate max-w-24 lg:max-w-none block">
                  {user.full_name}
                </span>
                <span className="text-xs text-gray-500 hidden lg:block">({user.country})</span>
              </div>

              {/* Mobile user menu button */}
              <div className="md:hidden relative">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>

                {/* Mobile dropdown */}
                {mobileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-2 z-50 border">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">{user.full_name}</div>
                      <div className="text-xs text-gray-500">({user.country})</div>
                    </div>
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      ← Back to Site
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Desktop logout button */}
              <button
                onClick={onLogout}
                className="hidden md:block text-gray-500 hover:text-gray-700 px-2 py-1 text-sm lg:text-base"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Dashboard для регионального админа - Mobile Responsive */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              <span className="hidden sm:inline">📍 {user.country} - Regional Dashboard</span>
              <span className="sm:hidden">📍 {user.country} Dashboard</span>
            </h2>
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full whitespace-nowrap">
                <span className="hidden sm:inline">🌍 {user.country}</span>
                <span className="sm:hidden">🌍</span>
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full whitespace-nowrap">
                <span className="hidden sm:inline">👥 {students.length} participants</span>
                <span className="sm:hidden">👥 {students.length}</span>
              </span>
            </div>
          </div>

          {/* Навигация для регионального админа - Mobile Responsive */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveTab('students')}
                className={`py-3 px-3 sm:px-6 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap flex items-center space-x-1 sm:space-x-2 ${activeTab === 'students'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <span className="text-sm sm:text-base">👥</span>
                <span className="hidden sm:inline">Participants</span>
                <span className="sm:hidden">Students</span>
                <span className="bg-orange-100 text-orange-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
                  {students.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('works')}
                className={`py-3 px-3 sm:px-6 text-xs sm:text-sm font-medium border-b-2 whitespace-nowrap flex items-center space-x-1 sm:space-x-2 ${activeTab === 'works'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <span className="text-sm sm:text-base">📝</span>
                <span className="hidden sm:inline">Manage Works</span>
                <span className="sm:hidden">Works</span>
                <span className="bg-purple-100 text-purple-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
                  {artworks.length + mathworks.length}
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* Контент вкладок для регионального админа */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

          {!loading && activeTab === 'students' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Participants from {user.country}</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
                >
                  <span className="mr-2">+</span>
                  Add Participant
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(students && Array.isArray(students) ? students : []).map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-gray-900 bg-yellow-50">
                          {student.id}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.name || student.full_name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(student.birth_date)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            🏙️ {student.city}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.school}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {getCategoryName(student.category_id)}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditStudent(student)}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student)}
                              className="text-red-600 hover:text-red-800 font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {students.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No participants yet</h3>
                    <p className="text-gray-500 mb-4">Start by adding participants from {user.country}</p>
                    {/* <button
                      onClick={() => setShowAddForm(true)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                    >
                      Add First Participant
                    </button> */}
                  </div>
                )}
              </div>
            </div>
          )}

          {!loading && activeTab === 'works' && (
            <WorksManagement user={user} />
          )}
        </div>
      </div>

      {/* Форма добавления студента для регионального админа */}
      {showAddForm && (
        <AddStudentForm
          onClose={() => setShowAddForm(false)}
          onSuccess={(studentId) => {
            setShowAddForm(false);
            loadData();
            alert(`Student added successfully! ID: ${studentId}`);
          }}
          userCountry={user.country} // Региональный админ может добавлять только в свою страну
        />
      )}
      {/* Модальное окно редактирования студента для регионального админа */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-orange-600">Edit Student</h3>
              <button
                onClick={() => setEditingStudent(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);

              console.log('📝 Form data entries:');
              for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
              }

              const studentData = {
                id: editingStudent.id,
                name: formData.get('name'),
                birth_date: formData.get('birth_date'),
                school: formData.get('school'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                country: formData.get('country'),
                city: formData.get('city'),
                course_id: formData.get('course_id'),
                category_id: formData.get('category_id')
              };

              console.log('🔍 Student data to send:', studentData);
              console.log('🔍 Original editing student:', editingStudent);

              try {
                const result = await updateStudent(studentData);
                console.log('✅ Update result:', result);
                await loadData();
                setEditingStudent(null);
                alert('Student updated successfully!');
              } catch (error) {
                console.error('❌ Update error:', error);
                alert('Error updating student: ' + error.message);
              }
            }}>
              {/* ВСЕ ПОЛЯ ФОРМЫ - скопируйте из главного админа */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingStudent.name || editingStudent.full_name}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <DateSelector
                  label="Birth Date"
                  name="birth_date"
                  defaultValue={editingStudent.birth_date}
                  required={true}
                  selectedSubject={editingStudentData.subject || editingStudent.course_id}
                  onAgeValidation={(validation) => {
                    if (validation.isValid && validation.categoryId) {
                      setEditingStudentData(prev => ({
                        ...prev,
                        category: validation.categoryId
                      }));
                    }
                  }}
                />

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={editingStudent.email}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={editingStudent.phone}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Country *</label>
                  <select
                    name="country"
                    defaultValue={editingStudent.country}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                    disabled
                  >
                    {COUNTRIES.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  <input
                    type="hidden"
                    name="country"
                    value={editingStudent.country}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    defaultValue={editingStudent.city}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">School *</label>
                  <input
                    type="text"
                    name="school"
                    defaultValue={editingStudent.school}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Subject *</label>
                  <select
                    name="course_id"
                    value={editingStudentData.subject || editingStudent.course_id}
                    onChange={(e) => {
                      const newSubject = e.target.value;
                      setEditingStudentData({
                        subject: newSubject,
                        category: '' // Сбрасываем категорию при смене предмета
                      });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    {SUBJECTS.map(subject => (
                      <option key={subject.id} value={subject.id}>{subject.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Category *</label>
                  <select
                    name="category_id"
                    value={editingStudentData.category || editingStudent.category_id}
                    onChange={(e) => setEditingStudentData(prev => ({
                      ...prev,
                      category: parseInt(e.target.value)
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value="">Select category</option>
                    {getCategoriesBySubject(editingStudentData.subject || editingStudent.course_id).map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Update Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Модальное окно подтверждения удаления студента для регионального админа */}
      {deletingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-red-600">Delete Student</h3>
              <button
                onClick={() => setDeletingStudent(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete student <strong>{deletingStudent.name || deletingStudent.full_name}</strong>?
              </p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>School:</strong> {deletingStudent.school}<br />
                  <strong>Country:</strong> {deletingStudent.country}<br />
                  <strong>City:</strong> {deletingStudent.city}
                </p>
              </div>
              <p className="text-red-600 text-sm mt-3">
                ⚠️ This action cannot be undone!
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeletingStudent(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDeleteStudent(deletingStudent.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Основной компонент AdminDashboard
export default function AdminDashboard({ user, onLogout }) {
  console.log('👤 AdminDashboard user:', user);

  // Проверяем role_id или role пользователя
  const userIsMainAdmin = isMainAdmin(user);
  const userIsRegionalAdmin = isRegionalAdmin(user);

  if (userIsMainAdmin) {
    return <MainAdminDashboard user={user} onLogout={onLogout} />;
  } else if (userIsRegionalAdmin) {
    return <RegionalAdminDashboard user={user} onLogout={onLogout} />;
  } else {
    return (
      <div className="min-h-screen bg-[#fffbf2] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access this admin panel.</p>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 max-w-md mx-auto">
            <p className="text-sm">
              <strong>User Role:</strong> {getUserRoleName(user)}<br />
              <strong>Role ID:</strong> {user.role_id || 'Not specified'}<br />
              <strong>Role String:</strong> {user.role || 'Not specified'}
            </p>
          </div>
          <button
            onClick={onLogout}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}