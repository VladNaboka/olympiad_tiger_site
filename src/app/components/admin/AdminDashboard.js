'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStudentsByCountry } from '../../api/students_api';
import { getArtWorksByCountryAndCategory } from '../../api/student_art_works';
import { getMathWorksByCountryAndCategory } from '../../api/student_math_works';
import { getAdminsAndTeachers } from '../../api/users_api';
import { CATEGORIES, SUBJECTS, COUNTRIES, getCategoryName, isMainAdmin, isRegionalAdmin, getUserRoleName, formatDate } from '../../utils/constants';
import GalleryTab from './GalleryTab';
import ResultsTab from './ResultsTab';
import AddStudentForm from './AddStudentForm';
import WorksManagement from './WorksManagement';

// Главная админ панель (role_id = 1)
function MainAdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddForm, setShowAddForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [mathworks, setMathworks] = useState([]);
  const [filters, setFilters] = useState({
    country: '',
    category: '',
    subject: ''
  });
  const [loading, setLoading] = useState(false);

  // Загрузка данных для главного админа
  const loadData = async () => {
    setLoading(true);
    try {
      // Загружаем всех пользователей
      const usersData = await getAdminsAndTeachers();
      setUsers(usersData || []);

      // Если выбрана страна, загружаем студентов
      if (filters.country) {
        const studentsData = await getStudentsByCountry(filters.country);
        setStudents(studentsData || []);

        // Загружаем работы если выбрана категория
        if (filters.category) {
          if (filters.subject === '1' || !filters.subject) {
            try {
              const artData = await getArtWorksByCountryAndCategory(filters.country, parseInt(filters.category));
              setArtworks(artData || []);
            } catch (error) {
              console.error('Error loading artworks:', error);
              setArtworks([]);
            }
          }
          if (filters.subject === '2' || !filters.subject) {
            try {
              const mathData = await getMathWorksByCountryAndCategory(filters.country, parseInt(filters.category));
              setMathworks(mathData || []);
            } catch (error) {
              console.error('Error loading math works:', error);
              setMathworks([]);
            }
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
  }, [filters]);

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
                Main Administrator
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
        {/* Фильтры для главного админа */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">🌍 Global Filters</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
                👑 Main Administrator
              </span>
              <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                🌍 All Countries
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">🌍 Country</label>
              <select
                value={filters.country}
                onChange={(e) => setFilters({...filters, country: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">All countries</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">🎯 Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">All categories</option>
                {CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">📚 Subject</label>
              <select
                value={filters.subject}
                onChange={(e) => setFilters({...filters, subject: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">All subjects</option>
                {SUBJECTS.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Быстрые действия для главного админа */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-2">Quick Actions:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilters({country: '', category: '', subject: ''})}
                className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                🔄 Reset All Filters
              </button>
              <button
                onClick={() => setFilters({...filters, country: 'Kazakhstan'})}
                className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
              >
                🇰🇿 Kazakhstan
              </button>
              <button
                onClick={() => setFilters({...filters, country: 'Russia'})}
                className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
              >
                🇷🇺 Russia
              </button>
              <button
                onClick={() => setFilters({...filters, subject: '2'})}
                className="px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-700 hover:bg-pink-200 transition-colors"
              >
                🎨 Art Works
              </button>
              <button
                onClick={() => setFilters({...filters, subject: '1'})}
                className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
              >
                📐 Math Works
              </button>
            </div>
          </div>
        </div>

        {/* Навигация для главного админа */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📊 Overview
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'users'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                👤 Representatives
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'students'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                👥 All Participants
              </button>
              <button
                onClick={() => setActiveTab('works')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'works'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                🎨 All Works
              </button>
              <button
                onClick={() => setActiveTab('statistics')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'statistics'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                📈 Statistics
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
                  <p className="text-3xl font-bold text-blue-600">{users.length}</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800">Total Participants</h3>
                  <p className="text-3xl font-bold text-green-600">{students.length}</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800">Art Works</h3>
                  <p className="text-3xl font-bold text-purple-600">{artworks.length}</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-800">Math Works</h3>
                  <p className="text-3xl font-bold text-orange-600">{mathworks.length}</p>
                </div>
              </div>
            </div>
          )}

          {!loading && activeTab === 'users' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Regional Representatives</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{user.full_name}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{user.email}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">{user.country}</td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {user.role === 'admin' ? 'Representative' : user.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!loading && activeTab === 'students' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">All Participants</h2>
              {filters.country ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Birth Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {students.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-mono text-gray-900 bg-yellow-50">{student.id}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{student.full_name}</td>
                                                      <td className="px-4 py-4 text-sm text-gray-900">{formatDate(student.birth_date)}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{student.school}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{student.country}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">{getCategoryName(student.category_id)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Please select a country to view participants
                </div>
              )}
            </div>
          )}

          {!loading && activeTab === 'works' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">All Works</h2>
              <div className="text-center py-8 text-gray-500">
                Works management functionality coming soon
              </div>
            </div>
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
      {showAddForm && (
        <AddStudentForm
          onClose={() => setShowAddForm(false)}
          onSuccess={(studentId) => {
            setShowAddForm(false);
            loadData();
            alert(`Student added successfully! ID: ${studentId}`);
          }}
          userCountry={null} // Главный админ может выбирать любую страну
        />
      )}
    </div>
  );
}

// Региональная админ панель (role_id = 2)
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
                Regional Representative
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
        {/* Фильтры для регионального админа */}
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
        </div>

        {/* Навигация для регионального админа */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('students')}
                className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center space-x-2 ${
                  activeTab === 'students'
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
                className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center space-x-2 ${
                  activeTab === 'works'
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
              <button
                onClick={() => setActiveTab('results')}
                className={`py-4 px-6 text-sm font-medium border-b-2 flex items-center space-x-2 ${
                  activeTab === 'results'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>🏆</span>
                <span>Results</span>
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
                          {getCategoryName(student.category_id)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {students.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No participants from {user.country} yet. Start by adding some!
                  </div>
                )}
              </div>
            </div>
          )}

          {!loading && activeTab === 'works' && (
            <WorksManagement user={user} />
          )}

          {!loading && activeTab === 'gallery' && (
            <GalleryTab user={user} filters={filters} />
          )}

          {!loading && activeTab === 'results' && (
            <ResultsTab user={user} students={students} artworks={artworks} mathworks={mathworks} />
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