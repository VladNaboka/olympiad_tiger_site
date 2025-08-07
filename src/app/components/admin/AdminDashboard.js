'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStudentsByCountry } from '../../api/students_api';
import { getArtWorksByCountryAndCategory } from '../../api/student_art_works';
import { getMathWorksByCountryAndCategory } from '../../api/student_math_works';
import { getAdminsAndTeachers } from '../../api/users_api';
import { registerUser, deleteUser } from '../../api/auth_api';
import { CATEGORIES, SUBJECTS, COUNTRIES, getCategoryName, isMainAdmin, isRegionalAdmin, getUserRoleName, formatDate } from '../../utils/constants';
import GalleryTab from './GalleryTab';
import ResultsTab from './ResultsTab';
import AddStudentForm from './AddStudentForm';
import WorksManagement from './WorksManagement';
import MainAdminWorksManagement from './MainAdminWorksManagement';

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

    try {
      const response = await registerUser(formData);
      console.log('✅ Representative added:', response);
      onSuccess();
    } catch (error) {
      console.error('❌ Error adding representative:', error);
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
                minLength="6"
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

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Organization *
              </label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="School or educational organization"
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
    totalUsers: 0,
    totalStudents: 0,
    totalArtworks: 0,
    totalMathworks: 0
  });
  
  const [loading, setLoading] = useState(false);

  const loadOverviewStats = async () => {
    try {
      console.log('🔄 Loading overview statistics...');
      
      // Загружаем пользователей (это уже есть)
      const usersData = await getAdminsAndTeachers();
      
      // Загружаем всех студентов из всех стран
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
      
      // Загружаем все работы из всех стран и категорий
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
      
      setOverviewStats({
        totalUsers: usersData?.length || 0,
        totalStudents: allStudents.length,
        totalArtworks: allArtworks.length,
        totalMathworks: allMathworks.length
      });
      
      // Также обновляем пользователей для других вкладок
      setUsers(usersData || []);
      
      console.log('📊 Overview stats loaded:', {
        users: usersData?.length || 0,
        students: allStudents.length,
        artworks: allArtworks.length,
        mathworks: allMathworks.length
      });
      
    } catch (error) {
      console.error('❌ Error loading overview stats:', error);
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
      let studentsData = [];

      if (studentsFilters.country) {
        // Если выбрана конкретная страна
        console.log('🌍 Loading students for specific country:', studentsFilters.country);
        studentsData = await getStudentsByCountry(studentsFilters.country);
      } else {
        // Если страна не выбрана, загружаем студентов из всех стран
        console.log('🌍 Loading students from all countries...');
        const allStudents = [];

        for (const country of COUNTRIES) {
          try {
            const countryStudents = await getStudentsByCountry(country);
            if (countryStudents && countryStudents.length > 0) {
              allStudents.push(...countryStudents);
            }
          } catch (error) {
            console.warn(`No students found in ${country}:`, error);
          }
        }
        studentsData = allStudents;
      }

      // Фильтруем по категории если нужно
      if (studentsFilters.category) {
        studentsData = studentsData.filter(s => s.category_id === parseInt(studentsFilters.category));
      }

      setStudents(studentsData || []);
      console.log('👨‍🎓 Total students loaded:', studentsData?.length || 0);
    } catch (error) {
      console.error('❌ Error loading students data:', error);
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

  return (
    <div className="min-h-screen bg-[#fffbf2]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity mr-4">
                <img src="/image/logonavbar.png" alt="Tigers Logo" className="h-10 w-auto" />
              </Link>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">T</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Tigers Olympiad - Main Admin</h1>
              <span className="ml-3 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                👑 Main Administrator
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-orange-500 transition-colors">
                ← Back to Site
              </Link>
              <span className="text-gray-700">{user.full_name}</span>
              <button onClick={onLogout} className="text-gray-500 hover:text-gray-700">
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
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800">Total Representatives</h3>
                  <p className="text-3xl font-bold text-blue-600">{overviewStats.totalUsers}</p>
                  <p className="text-sm text-blue-600 mt-2">Regional coordinators</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800">Total Participants</h3>
                  <p className="text-3xl font-bold text-green-600">{overviewStats.totalStudents}</p>
                  <p className="text-sm text-green-600 mt-2">From all countries</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800">Art Works</h3>
                  <p className="text-3xl font-bold text-purple-600">{overviewStats.totalArtworks}</p>
                  <p className="text-sm text-purple-600 mt-2">Creative submissions</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-800">Math Works</h3>
                  <p className="text-3xl font-bold text-orange-600">{overviewStats.totalMathworks}</p>
                  <p className="text-sm text-orange-600 mt-2">Problem solutions</p>
                </div>
              </div>

              {/* Quick Actions Cards */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">👤 Manage Representatives</h3>
                  <p className="text-sm mb-4">Add, edit, or remove regional representatives</p>
                  <button
                    onClick={() => setActiveTab('representatives')}
                    className="bg-white text-orange-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Manage Representatives
                  </button>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">👥 Add Participant</h3>
                  <p className="text-sm mb-4">Register new participants from any country</p>
                  <button
                    onClick={() => setShowAddStudentForm(true)}
                    className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
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
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Organization</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((rep) => (
                      <tr key={rep.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{rep.full_name}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{rep.email}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            🌍 {rep.country}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">{rep.city}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{rep.school}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          <button
                            onClick={() => handleDeleteUser(rep.id, rep.full_name)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Delete
                          </button>
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
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
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
                    <button
                      onClick={() => setShowAddStudentForm(true)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                    >
                      Add First Participant
                    </button>
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

  // Загрузка данных для регионального админа
  const loadData = async () => {
    if (!user.country) return;
    setLoading(true);

    try {
      const studentsData = await getStudentsByCountry(user.country);
      setStudents(studentsData || []);

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
            <div className="flex items-center">
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity mr-4">
                <img src="/image/logonavbar.png" alt="Tigers Logo" className="h-10 w-auto" />
              </Link>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">T</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Tigers Olympiad - {user.country}</h1>
              <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                🌍 Regional Representative
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-orange-500 transition-colors">
                ← Back to Site
              </Link>
              <span className="text-gray-700">{user.full_name}</span>
              <span className="text-sm text-gray-500">({user.country})</span>
              <button onClick={onLogout} className="text-gray-500 hover:text-gray-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard для регионального админа */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              📍 {user.country} - Regional Dashboard
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                🌍 {user.country}
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                👥 {students.length} participants
              </span>
            </div>
          </div>

        {/* Навигация для регионального админа */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('students')}
                className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center space-x-2 ${activeTab === 'students'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <span>👥</span>
                <span>Participants</span>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                  {students.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('works')}
                className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center space-x-2 ${activeTab === 'works'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <span>📝</span>
                <span>Manage Works</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
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
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>

                {students.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No participants yet</h3>
                    <p className="text-gray-500 mb-4">Start by adding participants from {user.country}</p>
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                    >
                      Add First Participant
                    </button>
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