'use client';

import { useState, useEffect } from 'react';
import { getStudentsByCountry } from '../../api/students_api';
import { getArtWorksByCountryAndCategory, uploadArtWork, setArtWorkScore } from '../../api/student_art_works';
import { getMathWorksByCountryAndCategory, createMathWork, setMathWorkScore } from '../../api/student_math_works';
import { CATEGORIES, getCategoryName } from '../../utils/constants';

export default function WorksManagement({ user }) {
  const [activeTab, setActiveTab] = useState('art'); // 'art' or 'math'
  const [selectedCategory, setSelectedCategory] = useState('');
  const [students, setStudents] = useState([]);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Загрузка студентов
  useEffect(() => {
    if (user.country) {
      loadStudents();
    }
  }, [user.country]);

  // Загрузка работ при изменении фильтров
  useEffect(() => {
    if (user.country && selectedCategory) {
      loadWorks();
    }
  }, [user.country, selectedCategory, activeTab]);

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
      let worksData;
      if (activeTab === 'art') {
        worksData = await getArtWorksByCountryAndCategory(user.country, parseInt(selectedCategory));
      } else {
        worksData = await getMathWorksByCountryAndCategory(user.country, parseInt(selectedCategory));
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
        <h2 className="text-xl font-semibold text-gray-800">Works Management</h2>
        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 flex items-center"
        >
          <span className="mr-2">+</span>
          Add Work
        </button>
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

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🎯 Filter by Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 bg-white"
        >
          <option value="" className="text-gray-800">Select category</option>
          {CATEGORIES.map(category => (
            <option key={category.id} value={category.id} className="text-gray-800">
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Works List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading works...</p>
        </div>
      ) : !selectedCategory ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🎯</div>
          <p>Select a category to view works</p>
        </div>
      ) : works.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📝</div>
          <p>No {activeTab} works found for {getCategoryName(selectedCategory)}</p>
          <button
            onClick={() => setShowUploadModal(true)}
            className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
          >
            Add the first work
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
                    <p className="text-gray-700 font-medium">{work.title}</p>
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
                <h3 className="font-semibold text-gray-800 mb-2">{work.title}</h3>
                <p className="text-sm text-gray-600 mb-3">Student ID: {work.student_id}</p>
                
                <div className="flex justify-between items-center">
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
                  {student.name} (ID: {student.id})
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Artwork File *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setArtworkFile(e.target.files[0])}
                className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
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
  )
}