'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStudentsByCountry } from '../../../api/students_api';
import { getArtWorksByCountryAndCategory } from '../../../api/student_art_works';
import { getMathWorksByCountryAndCategory } from '../../../api/student_math_works';
import { CATEGORIES, SUBJECTS, getCategoryName } from '../../../utils/constants';
import AddStudentForm from './AddStudentForm';
import StudentsTab from './StudentsTab';
import RegionalGalleryTab from './RegionalGalleryTab';
import RegionalResultsTab from './RegionalResultsTab';

export default function RegionalAdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('students');
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [countryStats, setCountryStats] = useState({});
  const [filters, setFilters] = useState({
    category: '',
    subject: ''
  });
  const [loading, setLoading] = useState(false);

  // Загрузка данных для региона
  const loadData = async () => {
    if (!user?.country) return;
    
    setLoading(true);
    try {
      // Загружаем студентов из страны представителя
      const studentsData = await getStudentsByCountry(user.country);
      setStudents(studentsData || []);

      // Загружаем статистику по стране
      const stats = await loadCountryStatistics(studentsData || []);
      setCountryStats(stats);
    } catch (error) {
      console.error('Error loading regional data:', error);
    }
    setLoading(false);
  };

  const loadCountryStatistics = async (students) => {
    try {
      const artStudents = students.filter(s => s.course_id === 1 || s.course_id === '1');
      const mathStudents = students.filter(s => s.course_id === 2 || s.course_id === '2');
      
      // Статистика по категориям
      const categoryStats = CATEGORIES.map(category => {
        const categoryStudents = students.filter(s => s.category_id === category.id);
        return {
          ...category,
          count: categoryStudents.length,
          artCount: categoryStudents.filter(s => s.course_id === 1 || s.course_id === '1').length,
          mathCount: categoryStudents.filter(s => s.course_id === 2 || s.course_id === '2').length
        };
      });

      return {
        totalStudents: students.length,
        artStudents: artStudents.length,
        mathStudents: mathStudents.length,
        categoryStats,
        recentlyAdded: students.slice(-5) // Последние 5 добавленных
      };
    } catch (error) {
      console.error('Error calculating country statistics:', error);
      return {};
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleStudentAdded = (studentId) => {
    setShowAddStudentForm(false);
    loadData();
    alert(`Participant successfully added with ID: ${studentId}`);
  };

  const tabs = [
    { id: 'students', label: '👥 My Participants', icon: '👥' },
    { id: 'gallery', label: '🎨 Regional Gallery', icon: '🎨' },
    { id: 'results', label: '🏆 Regional Results', icon: '🏆' }
  ];

  const getCountryFlag = (country) => {
    const flagMap = {
      'Kazakhstan': '🇰🇿',
      'Russia': '🇷🇺',
      'United States': '🇺🇸',
      'India': '🇮🇳',
      'China': '🇨🇳',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'United Kingdom': '🇬🇧',
      'Japan': '🇯🇵',
      'South Korea': '🇰🇷'
    };
    return flagMap[country] || '🌍';
  };

  return (
    <div className="min-h-screen bg-[#fffbf2]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity mr-4">
                <img 
                  src="/image/logonavbar.png" 
                  alt="Tigers Logo" 
                  className="h-10 w-auto"
                />
              </Link>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">R</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Regional Representative Panel
              </h1>
              <div className="ml-3 flex items-center space-x-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full font-medium">
                  {getCountryFlag(user.country)} {user.country}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                ← Back to Site
              </Link>
              <span className="text-gray-700">{user.full_name}</span>
              <span className="text-sm text-orange-600 font-medium">Regional Rep</span>
              <button
                onClick={onLogout}
                className="text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Country Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{countryStats.totalStudents || 0}</div>
                <div className="text-blue-100">Total Participants</div>
              </div>
              <div className="text-4xl opacity-80">🎓</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{countryStats.artStudents || 0}</div>
                <div className="text-pink-100">Art Participants</div>
              </div>
              <div className="text-4xl opacity-80">🎨</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{countryStats.mathStudents || 0}</div>
                <div className="text-green-100">Math Participants</div>
              </div>
              <div className="text-4xl opacity-80">📐</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">
                  {countryStats.categoryStats?.length || 0}
                </div>
                <div className="text-purple-100">Age Categories</div>
              </div>
              <div className="text-4xl opacity-80">👶</div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Managing: {getCountryFlag(user.country)} {user.country}
              </h2>
              <p className="text-sm text-gray-600">
                Add and manage participants from your region
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0">
              <button
                onClick={() => setShowAddStudentForm(true)}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center"
              >
                <span className="mr-2">+</span>
                Add Participant
              </button>
            </div>
          </div>
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Subject
              </label>
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
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

          {!loading && activeTab === 'students' && (
            <StudentsTab 
              students={students}
              userRole="admin"
              userCountry={user.country}
              onAddNew={() => setShowAddStudentForm(true)}
              onRefresh={loadData}
              filters={filters}
            />
          )}

          {!loading && activeTab === 'gallery' && (
            <RegionalGalleryTab 
              userCountry={user.country}
              filters={filters}
            />
          )}

          {!loading && activeTab === 'results' && (
            <RegionalResultsTab 
              userCountry={user.country}
              filters={filters}
              countryStats={countryStats}
            />
          )}
        </div>
      </div>

      {/* Modal for Adding Student */}
      {showAddStudentForm && (
        <AddStudentForm 
          onClose={() => setShowAddStudentForm(false)}
          onSuccess={handleStudentAdded}
          userCountry={user.country}
        />
      )}
    </div>
  );
}