// components/admin/MainAdminWorksManagement.js

'use client';

import { useState, useEffect } from 'react';
import { getStudentsByCountry } from '../../api/students_api';
import { getArtWorksByCountryAndCategory, uploadArtWork, setArtWorkScore } from '../../api/student_art_works';
import { getMathWorksByCountryAndCategory, createMathWork, setMathWorkScore } from '../../api/student_math_works';
import { CATEGORIES, COUNTRIES, getCategoryName } from '../../utils/constants';

export default function MainAdminWorksManagement({ user, filters, setFilters }) {
  const [activeTab, setActiveTab] = useState('art'); // 'art' or 'math'
  const [students, setStudents] = useState([]);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  // Загрузка студентов для выбранной страны
  useEffect(() => {
    if (filters.country) {
      loadStudents();
    } else {
      setStudents([]);
    }
  }, [filters.country]);

  // Загрузка работ при изменении фильтров
  useEffect(() => {
    if (filters.country && filters.category) {
      loadWorks();
    } else {
      setWorks([]);
    }
  }, [filters.country, filters.category, activeTab]);

  const loadStudents = async () => {
    try {
      const studentsData = await getStudentsByCountry(filters.country);
      setStudents(studentsData || []);
    } catch (error) {
      console.error('Error loading students:', error);
      setStudents([]);
    }
  };

  const loadWorks = async () => {
    setLoading(true);
    try {
      let worksData;
      if (activeTab === 'art') {
        worksData = await getArtWorksByCountryAndCategory(filters.country, parseInt(filters.category));
      } else {
        worksData = await getMathWorksByCountryAndCategory(filters.country, parseInt(filters.category));
      }
      setWorks(worksData || []);
    } catch (error) {
      console.error('Error loading works:', error);
      setWorks([]);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">All Works Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage artwork and math submissions from all countries
          </p>
        </div>
        {filters.country && filters.category && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
          >
            <span className="mr-2">+</span>
            Add {activeTab === 'art' ? 'Artwork' : 'Math Work'}
          </button>
        )}
      </div>

      {/* Enhanced Filters for Main Admin */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">🔍 Filter Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">🌍 Country</label>
            <select
              value={filters.country}
              onChange={(e) => setFilters({...filters, country: e.target.value, category: ''})}
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            >
              <option value="">Select country</option>
              {COUNTRIES.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">🎯 Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              disabled={!filters.country}
            >
              <option value="">Select category</option>
              {CATEGORIES.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({country: '', category: '', subject: ''})}
              className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
            >
              🔄 Clear Filters
            </button>
          </div>
        </div>

        {(filters.country || filters.category) && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-2">Active Filters:</p>
            <div className="flex flex-wrap gap-2">
              {filters.country && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  🌍 {filters.country}
                  <button
                    onClick={() => setFilters({...filters, country: '', category: ''})}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {filters.category && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  🎯 {getCategoryName(filters.category)}
                  <button
                    onClick={() => setFilters({...filters, category: ''})}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Info Message */}
      {!filters.country && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">🌍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Country</h3>
          <p className="text-gray-500 mb-4">
            Choose a country from the filter above to view and manage works
          </p>
        </div>
      )}

      {filters.country && !filters.category && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Category</h3>
          <p className="text-gray-500 mb-4">
            Choose a category to view works from {filters.country}
          </p>
        </div>
      )}

      {/* Works Management Content */}
      {filters.country && filters.category && (
        <>
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-purple-800">Art Works</h3>
              <p className="text-2xl font-bold text-purple-600">
                {activeTab === 'art' ? works.length : '-'}
              </p>
              <p className="text-xs text-purple-600 mt-1">
                Category: {getCategoryName(filters.category)}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-800">Math Works</h3>
              <p className="text-2xl font-bold text-blue-600">
                {activeTab === 'math' ? works.length : '-'}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Country: {filters.country}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-green-800">Students</h3>
              <p className="text-2xl font-bold text-green-600">{students.length}</p>
              <p className="text-xs text-green-600 mt-1">Available for works</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('art')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'art'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🎨 Art Works
              </button>
              <button
                onClick={() => setActiveTab('math')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'math'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📐 Math Works
              </button>
            </nav>
          </div>

          {/* Works List */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading works...</p>
            </div>
          ) : works.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} works found</h3>
              <p className="text-gray-500 mb-4">
                No {activeTab} works found for {getCategoryName(filters.category)} from {filters.country}
              </p>
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
              >
                Add First {activeTab === 'art' ? 'Artwork' : 'Math Work'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {works.map((work) => (
                <div key={work.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {activeTab === 'art' ? (
                    <div className="relative">
                      <img
                        src={work.file_path || "/image/artwork-sample.png"}
                        alt={work.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "/image/artwork-sample.png";
                        }}
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">🎨 Art</span>
                      </div>
                      {work.score && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-yellow-400 text-gray-800 text-xs px-2 py-1 rounded-full font-bold">
                            ⭐ {work.score}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📐</div>
                        <p className="text-gray-700 font-medium text-sm px-4">{work.title}</p>
                      </div>
                      <div className="absolute top-2 left-2">
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">📐 Math</span>
                      </div>
                      {work.score && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-yellow-400 text-gray-800 text-xs px-2 py-1 rounded-full font-bold">
                            ⭐ {work.score}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 truncate">{work.title}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Student ID: <span className="font-mono text-xs bg-gray-100 px-1 rounded">{work.student_id}</span></p>
                      <p>Country: <span className="text-blue-600">{work.country}</span></p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {getCategoryName(work.category_id)}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedWork(work);
                          setShowScoreModal(true);
                        }}
                        className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                      >
                        {work.score ? 'Update Score' : 'Add Score'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary */}
          {works.length > 0 && (
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">📊 Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Total Works:</span>
                  <span className="ml-2 text-gray-900 font-semibold">{works.length}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Scored:</span>
                  <span className="ml-2 text-green-600 font-semibold">
                    {works.filter(w => w.score).length}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Unscored:</span>
                  <span className="ml-2 text-orange-600 font-semibold">
                    {works.filter(w => !w.score).length}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Avg Score:</span>
                  <span className="ml-2 text-purple-600 font-semibold">
                    {(() => {
                      const scoredWorks = works.filter(w => w.score);
                      return scoredWorks.length > 0 
                        ? (scoredWorks.reduce((sum, w) => sum + w.score, 0) / scoredWorks.length).toFixed(1)
                        : 'N/A';
                    })()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Upload Work Modal */}
      {showUploadModal && (
        activeTab === 'art' ? (
          <UploadArtworkModal
            isOpen={showUploadModal}
            onClose={() => setShowUploadModal(false)}
            onSuccess={() => {
              setShowUploadModal(false);
              loadWorks();
            }}
            students={students}
            userCountry={filters.country}
          />
        ) : (
          <UploadMathWorkModal
            isOpen={showUploadModal}
            onClose={() => setShowUploadModal(false)}
            onSuccess={() => {
              setShowUploadModal(false);
              loadWorks();
            }}
            students={students}
            userCountry={filters.country}
          />
        )
      )}

      {/* Score Modal */}
      {showScoreModal && selectedWork && (
        <ScoreModal
          work={selectedWork}
          activeTab={activeTab}
          onClose={() => {
            setShowScoreModal(false);
            setSelectedWork(null);
          }}
          onSuccess={() => {
            setShowScoreModal(false);
            setSelectedWork(null);
            loadWorks();
          }}
        />
      )}
    </div>
  );
}

// Score Modal Component
function ScoreModal({ work, activeTab, onClose, onSuccess }) {
  const [score, setScore] = useState(work.score || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const scoreValue = parseInt(score);
      if (scoreValue < 0 || scoreValue > 100) {
        alert('Score must be between 0 and 100');
        setLoading(false);
        return;
      }

      if (activeTab === 'art') {
        await setArtWorkScore(work.id, scoreValue);
      } else {
        await setMathWorkScore(work.id, scoreValue);
      }

      onSuccess();
    } catch (error) {
      console.error('Error setting score:', error);
      alert('Error setting score: ' + error.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">Set Score</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <h4 className="font-medium text-gray-800">{work.title}</h4>
          <p className="text-sm text-gray-600">Student ID: {work.student_id}</p>
          <p className="text-sm text-gray-600">Country: {work.country}</p>
          <p className="text-sm text-gray-600">Category: {getCategoryName(work.category_id)}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Score (0-100) *
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter score"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
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
              {loading ? 'Saving...' : 'Save Score'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}