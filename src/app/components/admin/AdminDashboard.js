'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStudentsByCountry } from '../../api/students_api';
import { getArtWorksByCountryAndCategory } from '../../api/student_art_works';
import { getMathWorksByCountryAndCategory } from '../../api/student_math_works';
import { CATEGORIES, SUBJECTS, COUNTRIES, getCategoryName } from '../../utils/constants';

export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('students');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [students, setStudents] = useState([]);
  const [artworks, setArtworks] = useState([]);
  const [mathworks, setMathworks] = useState([]);
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

  // Загрузка данных
  const loadData = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const country = user.role === 'owner' ? filters.country : user.country;
      
      if (country) {
        const studentsData = await getStudentsByCountry(country);
        setStudents(studentsData || []);

        // Загружаем работы если выбрана категория
        if (filters.category) {
          if (filters.subject === '1' || !filters.subject) {
            try {
              const artData = await getArtWorksByCountryAndCategory(country, parseInt(filters.category));
              setArtworks(artData || []);
            } catch (error) {
              console.error('Error loading artworks:', error);
              setArtworks([]);
            }
          }
          if (filters.subject === '2' || !filters.subject) {
            try {
              const mathData = await getMathWorksByCountryAndCategory(country, parseInt(filters.category));
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
  }, [user, filters]);

  const getWinners = () => {
    const allWorks = [...artworks, ...mathworks].filter(work => work.score > 0);
    const sorted = allWorks.sort((a, b) => b.score - a.score);
    const winnersCount = Math.ceil(sorted.length * 0.1); // 10% победителей
    return sorted.slice(0, winnersCount);
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
                  <option value="">Select country</option>
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
              <button
                onClick={() => setActiveTab('students')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'students'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                👥 Participants
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'gallery'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                🎨 Gallery
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'results'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                🏆 Results
              </button>
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

          {!loading && activeTab === 'students' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Participants</h2>
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
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Full Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date of Birth
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        School
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Country
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-gray-900 bg-yellow-50">
                          {student.id}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.full_name}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.birth_date}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.school}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.country}
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
                    No participants to display
                  </div>
                )}
              </div>
            </div>
          )}

          {!loading && activeTab === 'gallery' && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Gallery - Work in Progress</h2>
              <div className="text-center py-8 text-gray-500">
                Gallery functionality will be available soon
              </div>
            </div>
          )}

          {!loading && activeTab === 'results' && (
            <div>
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Results - Work in Progress</h2>
              <div className="text-center py-8 text-gray-500">
                Results functionality will be available soon
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}