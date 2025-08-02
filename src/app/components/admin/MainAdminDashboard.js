'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAdminsAndTeachers } from '../../api/users_api';
import { getStudentsByCountry } from '../../api/students_api';
import { COUNTRIES } from '../../utils/constants';
import { CATEGORIES } from '../../utils/constants';
import AddRepresentativeForm from './AddRepresentativeForm';
import RepresentativesTab from './RepresentativesTab';
import GlobalStatisticsTab from './GlobalStatisticsTab';
import GlobalGalleryTab from './GlobalGalleryTab';
import GlobalMathWorksTab from './GlobalMathWorksTab';
import { getMathWorksByCountryAndCategory } from '../../api/student_math_works';
import { getArtWorksByCountryAndCategory } from '../../api/student_art_works';



export default function MainAdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('representatives');
  const [showAddRepForm, setShowAddRepForm] = useState(false);
  const [representatives, setRepresentatives] = useState([]);
  const [globalStats, setGlobalStats] = useState({});
  const [filters, setFilters] = useState({
    country: '',
    category: '',
    subject: ''
  });
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      // Загружаем всех представителей
      const repsData = await getAdminsAndTeachers();
      setRepresentatives(repsData || []);

      // Загружаем глобальную статистику на основе repsData
      const stats = await loadGlobalStatistics(repsData || []);
      setGlobalStats(stats);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const loadGlobalStatistics = async (representativesList) => {
    try {
      const countries = [...new Set(representativesList.map(rep => rep.country))];

      let totalStudents = 0;
      let totalArtStudents = 0;
      let totalMathStudents = 0;

      // Подсчёт студентов
      for (const country of countries) {
        try {
          const students = await getStudentsByCountry(country);
          totalStudents += students.length;
          totalArtStudents += students.filter(s => s.course_id === 1 || s.course_id === '1').length;
          totalMathStudents += students.filter(s => s.course_id === 2 || s.course_id === '2').length;
        } catch { }
      }

      // Подсчёт Math Works
      const mathPromises = countries.map(async (country) => {
        const categoryPromises = CATEGORIES.map(category =>
          getMathWorksByCountryAndCategory(country, category.id).catch(() => [])
        );
        const categoryResults = await Promise.all(categoryPromises);
        const countryWorks = categoryResults.flat().filter(w => w && w.title);
        return countryWorks.length;
      });
      const mathCounts = await Promise.all(mathPromises);
      const totalMathWorks = mathCounts.reduce((a, b) => a + b, 0);

      // Подсчёт Art Works
      const artPromises = countries.map(async (country) => {
        const categoryPromises = CATEGORIES.map(category =>
          getArtWorksByCountryAndCategory(country, category.id).catch(() => [])
        );
        const categoryResults = await Promise.all(categoryPromises);
        const countryWorks = categoryResults.flat().filter(w => w && w.title);
        return countryWorks.length;
      });
      const artCounts = await Promise.all(artPromises);
      const totalArtWorks = artCounts.reduce((a, b) => a + b, 0);

      return {
        totalCountries: countries.length,
        totalRepresentatives: representativesList.length,
        totalStudents,
        totalArtStudents,
        totalMathStudents,
        totalMathWorks,
        totalArtWorks
      };
    } catch (error) {
      console.error('Error loading global statistics:', error);
      return {};
    }
  };




  useEffect(() => {
    loadData();
  }, []);

  const handleRepresentativeAdded = () => {
    setShowAddRepForm(false);
    loadData();
    alert('Representative successfully added!');
  };

  const tabs = [
    { id: 'representatives', label: 'Representatives Management', icon: '🌍' },
    { id: 'statistics', label: 'Global Statistics', icon: '📊' },
    { id: 'gallery', label: 'Global Gallery', icon: '🎨' },
    { id: 'mathworks', label: 'Math Works', icon: '🧮' } // новый таб
  ];


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
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">M</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Main Administrator Panel
              </h1>
              <span className="ml-3 px-3 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                🔐 GLOBAL ACCESS
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
              <span className="text-sm text-green-600 font-medium">Main Admin</span>
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
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{globalStats.totalCountries || 0}</div>
                <div className="text-blue-100">Countries</div>
              </div>
              <div className="text-4xl opacity-80">🌍</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{globalStats.totalRepresentatives || 0}</div>
                <div className="text-green-100">Representatives</div>
              </div>
              <div className="text-4xl opacity-80">👥</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{globalStats.totalStudents || 0}</div>
                <div className="text-purple-100">Total Participants</div>
              </div>
              <div className="text-4xl opacity-80">🎓</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                {/* <div className="text-2xl font-bold">
                  {globalStats.totalArtStudents || 0} / {globalStats.totalMathStudents || 0}
                </div>
                <div className="text-orange-100">Art / Math</div> */}
                <div className="text-2xl font-bold">
                  {globalStats.totalArtWorks || 0} / {globalStats.totalMathWorks || 0}
                </div>
                <div className="text-orange-100">Art / Math</div>


              </div>
              <div className="text-4xl opacity-80">📊</div>
            </div>
          </div>
        </div>

        {/* Global Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Global Filters & Views</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Country
              </label>
              <select
                value={filters.country}
                onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All countries</option>
                {COUNTRIES.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                View Mode
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="overview">Overview</option>
                <option value="detailed">Detailed</option>
                <option value="analytics">Analytics</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Actions
              </label>
              <button
                onClick={() => setShowAddRepForm(true)}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                + Add Representative
              </button>
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
                  className={`py-4 px-6 text-sm font-medium border-b-2 ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
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
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading...</p>
            </div>
          )}

          {!loading && activeTab === 'representatives' && (
            <RepresentativesTab
              representatives={representatives}
              onAddNew={() => setShowAddRepForm(true)}
              onRefresh={loadData}
              isMainAdmin={true}
            />
          )}

          {!loading && activeTab === 'statistics' && (
            <GlobalStatisticsTab
              globalStats={globalStats}
              filters={filters}
            />
          )}

          {!loading && activeTab === 'gallery' && (
            <GlobalGalleryTab
              filters={filters}
            />
          )}

          {!loading && activeTab === 'mathworks' && (
            <GlobalMathWorksTab filters={filters} />
          )}

        </div>
      </div>

      {/* Modal for Adding Representative */}
      {showAddRepForm && (
        <AddRepresentativeForm
          onClose={() => setShowAddRepForm(false)}
          onSuccess={handleRepresentativeAdded}
        />
      )}
    </div>
  );
}