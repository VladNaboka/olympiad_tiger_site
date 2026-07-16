'use client';

import { useState, useEffect } from 'react';
import { getStudentsByCountry } from '../../api/students_api';
import { getArtWorksByCountryAndCategory, uploadArtWork, setArtWorkScore } from '../../api/student_art_works';
import { getMathWorksByCountryAndCategory, createMathWork, setMathWorkScore } from '../../api/student_math_works';
import { CATEGORIES, ART_CATEGORIES, MATH_CATEGORIES, getCategoryName } from '../../utils/constants';
import { validateImageFile, IMAGE_ACCEPT_ATTR } from '../../utils/fileValidation';
import ArtworkImage from '../ArtworkImage';

export default function WorksManagement({ user }) {
  const [activeTab, setActiveTab] = useState('art'); // 'art' or 'math'
  const [students, setStudents] = useState([]);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  // Локальные фильтры для Works Management
  const [localFilters, setLocalFilters] = useState({
    category: ''
  });

  // Загрузка студентов при монтировании компонента
  useEffect(() => {
    if (user.country) {
      loadStudents();
    }
  }, [user.country]);

  // Загрузка работ при изменении фильтров или вкладки
  useEffect(() => {
    if (user.country) {
      loadWorks();
    }
  }, [user.country, localFilters.category, activeTab]);

  const loadStudents = async () => {
    try {
      const studentsData = await getStudentsByCountry(user.country);
      setStudents(studentsData || []);
    } catch (error) {
      console.error('Error loading students:', error);
      setStudents([]);
    }
  };

  const loadWorks = async () => {
    setLoading(true);
    try {
      let worksData = [];
      
      if (activeTab === 'art') {
        if (localFilters.category) {
          // Загружаем работы для конкретной категории
          worksData = await getArtWorksByCountryAndCategory(user.country, parseInt(localFilters.category));
        } else {
          // Загружаем все художественные работы - используем ART_CATEGORIES (ID 5, 6, 7)
          const artPromises = ART_CATEGORIES.map(category => 
            getArtWorksByCountryAndCategory(user.country, category.id).catch(() => [])
          );
          const artResults = await Promise.all(artPromises);
          worksData = artResults.flat();
        }
      } else {
        if (localFilters.category) {
          // Загружаем работы для конкретной категории
          worksData = await getMathWorksByCountryAndCategory(user.country, parseInt(localFilters.category));
        } else {
          // Загружаем все математические работы - используем MATH_CATEGORIES (ID 1, 2, 3, 4)
          const mathPromises = MATH_CATEGORIES.map(category => 
            getMathWorksByCountryAndCategory(user.country, category.id).catch(() => [])
          );
          const mathResults = await Promise.all(mathPromises);
          worksData = mathResults.flat();
        }
      }
      
      // Фильтруем null/undefined значения и проверяем, что у объектов есть обязательные поля
      const validWorks = (worksData || []).filter(work => 
        work && 
        typeof work === 'object' && 
        work.id && 
        work.title
      );
      
      setWorks(validWorks);
      console.log(`📊 Loaded ${validWorks.length} valid ${activeTab} works for ${user.country} ${localFilters.category ? `(category ${localFilters.category})` : '(all categories)'}`);
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
          <h2 className="text-xl font-semibold text-gray-800">Works Management</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage works from {user.country} - {localFilters.category ? getCategoryName(localFilters.category) : 'All Categories'}
          </p>
        </div>
      </div>

      {/* Локальные фильтры для Works */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">🔍 Filter Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">🎯 Category</label>
            <select
              value={localFilters.category}
              onChange={(e) => setLocalFilters({...localFilters, category: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
            >
              <option value="">All Categories</option>
              {(activeTab === 'art' ? ART_CATEGORIES : MATH_CATEGORIES).map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setLocalFilters({category: ''})}
              className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
            >
              🔄 Clear Filters
            </button>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">
          {localFilters.category 
            ? `Showing ${activeTab} works for ${getCategoryName(localFilters.category)}`
            : `Showing all ${activeTab} works from ${user.country}`
          }
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-800">Total Students</h3>
          <p className="text-2xl font-bold text-blue-600">{students.length}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-purple-800">Current Works</h3>
          <p className="text-2xl font-bold text-purple-600">{works.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-green-800">Scored Works</h3>
          <p className="text-2xl font-bold text-green-600">
            {works.filter(w => w && w.score).length}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-sm font-semibold text-yellow-800">Avg Score</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {(() => {
              const scoredWorks = works.filter(w => w && w.score);
              return scoredWorks.length > 0 
                ? (scoredWorks.reduce((sum, w) => sum + w.score, 0) / scoredWorks.length).toFixed(1)
                : '0.0';
            })()}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('art')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'art'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span>🎨</span>
            <span>Art Works</span>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
              {activeTab === 'art' ? works.length : '-'}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('math')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'math'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span>📐</span>
            <span>Math Works</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              {activeTab === 'math' ? works.length : '-'}
            </span>
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {activeTab} works found
          </h3>
          <p className="text-gray-500 mb-4">
            {localFilters.category 
              ? `No ${activeTab} works found for ${getCategoryName(localFilters.category)} from ${user.country}`
              : `No ${activeTab} works found from ${user.country}`
            }
          </p>
          {/* <button
            onClick={() => setShowUploadModal(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Add First {activeTab === 'art' ? 'Artwork' : 'Math Work'}
          </button> */}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.filter(work => work && work.id).map((work) => (
            <div key={work.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {activeTab === 'art' ? (
                <div className="relative">
                  <div className="relative w-full h-48">
                    <ArtworkImage
                      src={work.file_path}
                      alt={work.title}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
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
                  <p>Category: <span className="text-green-600">{getCategoryName(work.category_id)}</span></p>
                </div>
                
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {getCategoryName(work.category_id)}
                  </span>
                  {/* <button
                    onClick={() => {
                      setSelectedWork(work);
                      setShowScoreModal(true);
                    }}
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                  >
                    {work.score ? 'Update Score' : 'Add Score'}
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary when works exist */}
      {works.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">📊 Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Total Works:</span>
              <span className="ml-2 text-gray-900 font-semibold">{works.length}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Scored:</span>
              <span className="ml-2 text-green-600 font-semibold">
                {works.filter(w => w && w.score).length}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Unscored:</span>
              <span className="ml-2 text-orange-600 font-semibold">
                {works.filter(w => w && !w.score).length}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Categories:</span>
              <span className="ml-2 text-purple-600 font-semibold">
                {[...new Set(works.filter(w => w && w.category_id).map(w => w.category_id))].length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Upload Work Modal */}
      {showUploadModal && (
        <UploadWorkModal
          user={user}
          students={students}
          activeTab={activeTab}
          onClose={() => setShowUploadModal(false)}
          onSuccess={() => {
            setShowUploadModal(false);
            loadWorks();
          }}
        />
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


// Upload Work Modal Component
function UploadWorkModal({ user, students, activeTab, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    student_id: '',
    title: '',
    category_id: ''
  });
  const [artworkFile, setArtworkFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeTab === 'art') {
        if (!artworkFile) {
          alert('Please select an artwork file');
          setLoading(false);
          return;
        }

        const validation = validateImageFile(artworkFile);
        if (!validation.isValid) {
          alert(validation.error);
          setLoading(false);
          return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('student_id', formData.student_id);
        formDataToSend.append('title', formData.title);
        formDataToSend.append('country', user.country);
        formDataToSend.append('category_id', formData.category_id);
        formDataToSend.append('file', artworkFile);

        await uploadArtWork(formDataToSend);
      } else {
        const mathData = {
          student_id: parseInt(formData.student_id),
          title: formData.title,
          country: user.country,
          category_id: parseInt(formData.category_id)
        };
        await createMathWork(mathData);
      }

      onSuccess();
    } catch (error) {
      console.error('Error uploading work:', error);
      alert('Error uploading work: ' + error.message);
    }
    
    setLoading(false);
  };

  const selectedStudent = students.find(s => s.id === parseInt(formData.student_id));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            Upload {activeTab === 'art' ? 'Artwork' : 'Math Work'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student *
            </label>
            <select
              value={formData.student_id}
              onChange={(e) => {
                const studentId = e.target.value;
                const student = students.find(s => s.id === parseInt(studentId));
                setFormData({
                  ...formData,
                  student_id: studentId,
                  category_id: student ? student.category_id : ''
                });
              }}
              className="w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value="">Select student</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name || student.full_name} (ID: {student.id})
                </option>
              ))}
            </select>
            {selectedStudent && (
              <p className="text-sm text-gray-500 mt-1">
                Category: {getCategoryName(selectedStudent.category_id)}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder={activeTab === 'art' ? 'Artwork title' : 'Math work title'}
              required
            />
          </div>

          {activeTab === 'art' && (
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Artwork File *
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept={IMAGE_ACCEPT_ATTR}
                        onChange={(e) => setArtworkFile(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        required
                      />
                      <div className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus-within:ring-2 focus-within:ring-purple-500 bg-white cursor-pointer hover:bg-gray-50">
                        {artworkFile ? (
                          <span className="text-gray-900">{artworkFile.name}</span>
                        ) : (
                          <span className="text-gray-500">Choose artwork file or drag and drop</span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Supported formats: JPG, PNG, GIF (max 10MB)
                    </p>
                  </div>
          )}

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
              {loading ? 'Uploading...' : `Upload ${activeTab === 'art' ? 'Artwork' : 'Math Work'}`}
            </button>
          </div>
        </form>
      </div>
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