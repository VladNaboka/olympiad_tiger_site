'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStudentsByCountry } from '../../api/students_api';
import { getAdminsAndTeachers } from '../../api/users_api';
import { CATEGORIES, SUBJECTS, COUNTRIES, getCategoryName } from '../../utils/constants';
import AddStudentForm from './AddStudentForm';
import AddRepresentativeForm from './AddRepresentativeForm';
import StudentsTab from './StudentsTab';
import RepresentativesTab from './RepresentativesTab';
import GalleryTab from './GalleryTab';
import ResultsTab from './ResultsTab';

export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('students');
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [showAddRepForm, setShowAddRepForm] = useState(false);
  const [students, setStudents] = useState([]);
  const [representatives, setRepresentatives] = useState([]);
  const [filters, setFilters] = useState({
    country: '',
    category: '',
    subject: ''
  });
  const [loading, setLoading] = useState(false);

  // Устанавливаем страну для регионального админа
  useEffect(() => {
    if (user?.role === 'admin' && user?.country) {
      setFilters(prev => ({ ...prev, country: user.country }));
    }
  }, [user]);

  // Устанавливаем начальную вкладку в зависимости от роли
  useEffect(() => {
    if (user?.role === 'owner') {
      setActiveTab('representatives');
    } else {
      setActiveTab('students');
    }
  }, [user]);

  // Загрузка данных
  const loadData = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Для главного админа загружаем представителей
      if (user.role === 'owner') {
        const repsData = await getAdminsAndTeachers();
        setRepresentatives(repsData || []);
      }

      // Загружаем студентов в зависимости от роли
      const country = user.role === 'owner' ? filters.country : user.country;
      
      if (country) {
        const studentsData = await getStudentsByCountry(country);
        setStudents(studentsData || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [user, filters]);

  const handleStudentAdded = (studentId) => {
    setShowAddStudentForm(false);
    loadData(); // Перезагружаем данные
    alert(`Student successfully added with ID: ${studentId}`);
  };

  const handleRepresentativeAdded = () => {
    setShowAddRepForm(false);
    loadData(); // Перезагружаем данные
    alert('Representative successfully added!');
  };

  // Определяем доступные вкладки в зависимости от роли
  const getAvailableTabs = () => {
    const tabs = [];

    if (user.role === 'owner') {
      tabs.push({ id: 'representatives', label: '🌍 Representatives', icon: '🌍' });
    }

    tabs.push(
      { id: 'students', label: '👥 Participants', icon: '👥' },
      { id: 'gallery', label: '🎨 Gallery', icon: '🎨' },
      { id: 'results', label: '🏆 Results', icon: '🏆' }
    );

    return tabs;
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
                <span className="text-white font-bold">T</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Tigers Olympiad Admin
              </h1>
              <span className="ml-3 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                {user.role === 'owner' ? 'Main Admin' : 'Regional Representative'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                ← Back to Site
              </Link>
              <span className="text-gray-700">{user.full_name}</span>
              {user.country && (
                <span className="text-sm text-gray-500">({user.country})</span>
              )}
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
        {/* Фильтры */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user.role === 'owner' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
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
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800"
              >
                <option value="">All categories</option>
                {CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                value={filters.subject}
                onChange={(e) => setFilters({...filters, subject: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800"
              >
                <option value="">All subjects</option>
                {SUBJECTS.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Навигация */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {getAvailableTabs().map((tab) => (
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

        {/* Контент вкладок */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

          {!loading && activeTab === 'representatives' && user.role === 'owner' && (
            <RepresentativesTab 
              representatives={representatives}
              onAddNew={() => setShowAddRepForm(true)}
              onRefresh={loadData}
            />
          )}

          {!loading && activeTab === 'students' && (
            <StudentsTab 
              students={students}
              userRole={user.role}
              userCountry={user.country}
              onAddNew={() => setShowAddStudentForm(true)}
              onRefresh={loadData}
            />
          )}

          {!loading && activeTab === 'gallery' && (
            <GalleryTab 
              userRole={user.role}
              userCountry={user.country}
              filters={filters}
            />
          )}

          {!loading && activeTab === 'results' && (
            <ResultsTab 
              userRole={user.role}
              userCountry={user.country}
              filters={filters}
            />
          )}
        </div>
      </div>

      {/* Модальные окна */}
      {showAddStudentForm && (
        <AddStudentForm 
          onClose={() => setShowAddStudentForm(false)}
          onSuccess={handleStudentAdded}
          userCountry={user.role === 'admin' ? user.country : null}
        />
      )}

      {showAddRepForm && user.role === 'owner' && (
        <AddRepresentativeForm 
          onClose={() => setShowAddRepForm(false)}
          onSuccess={handleRepresentativeAdded}
        />
      )}
    </div>
  );
}