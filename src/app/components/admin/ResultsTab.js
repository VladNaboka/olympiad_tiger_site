'use client';

import { useState, useEffect } from 'react';
import { getArtWorksByCountryAndCategory } from '../../api/student_art_works';
import { getMathWorksByCountryAndCategory } from '../../api/student_math_works';
import { getStudentsByCountry } from '../../api/students_api';
import { CATEGORIES, getCategoryName } from '../../utils/constants';

export default function ResultsTab({ userRole, userCountry, filters }) {
  const [results, setResults] = useState({
    artworks: [],
    mathworks: [],
    students: []
  });
  const [loading, setLoading] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState('overview');

  const loadResults = async () => {
    if (!filters.country && userRole === 'owner') {
      setResults({ artworks: [], mathworks: [], students: [] });
      return;
    }

    setLoading(true);
    try {
      const country = userRole === 'owner' ? filters.country : userCountry;
      
      if (country) {
        // Загружаем студентов
        const studentsData = await getStudentsByCountry(country);
        
        // Загружаем все художественные работы
        const artPromises = CATEGORIES.map(cat => 
          getArtWorksByCountryAndCategory(country, cat.id).catch(() => [])
        );
        const artResults = await Promise.all(artPromises);
        const allArtworks = artResults.flat();
        
        // Загружаем все математические работы
        const mathPromises = CATEGORIES.map(cat => 
          getMathWorksByCountryAndCategory(country, cat.id).catch(() => [])
        );
        const mathResults = await Promise.all(mathPromises);
        const allMathworks = mathResults.flat();
        
        setResults({
          artworks: allArtworks,
          mathworks: allMathworks,
          students: studentsData || []
        });
      }
    } catch (error) {
      console.error('Error loading results:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadResults();
  }, [userRole, userCountry, filters]);

  // Анализ результатов
  const getTopPerformers = (works, limit = 10) => {
    return works
      .filter(work => work.score && work.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  };

  const getAverageScore = (works) => {
    const scoredWorks = works.filter(work => work.score && work.score > 0);
    if (scoredWorks.length === 0) return 0;
    const total = scoredWorks.reduce((sum, work) => sum + work.score, 0);
    return (total / scoredWorks.length).toFixed(1);
  };

  const getScoreDistribution = (works) => {
    const scoredWorks = works.filter(work => work.score && work.score > 0);
    const distribution = {
      excellent: scoredWorks.filter(w => w.score >= 90).length,
      good: scoredWorks.filter(w => w.score >= 80 && w.score < 90).length,
      satisfactory: scoredWorks.filter(w => w.score >= 70 && w.score < 80).length,
      needsImprovement: scoredWorks.filter(w => w.score < 70).length
    };
    return distribution;
  };

  const topArtworks = getTopPerformers(results.artworks);
  const topMathworks = getTopPerformers(results.mathworks);
  const artAverage = getAverageScore(results.artworks);
  const mathAverage = getAverageScore(results.mathworks);
  const artDistribution = getScoreDistribution(results.artworks);
  const mathDistribution = getScoreDistribution(results.mathworks);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Results & Analytics</h2>
          <p className="text-sm text-gray-600 mt-1">
            Performance analysis and leaderboards
          </p>
        </div>
      </div>

      {/* Info message for main admin */}
      {userRole === 'owner' && !filters.country && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="text-blue-500 mr-3">ℹ️</div>
            <div>
              <h3 className="text-blue-800 font-medium">Select a country to view results</h3>
              <p className="text-blue-600 text-sm">Use the country filter above to see performance data from a specific region.</p>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading results...</p>
        </div>
      )}

      {!loading && filters.country && (
        <div className="space-y-6">
          {/* Overview Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{results.students.length}</div>
              <div className="text-sm text-blue-800">Total Participants</div>
            </div>
            <div className="bg-pink-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">{results.artworks.length}</div>
              <div className="text-sm text-pink-800">Art Submissions</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{results.mathworks.length}</div>
              <div className="text-sm text-green-800">Math Submissions</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {results.artworks.filter(a => a.score > 0).length + results.mathworks.filter(m => m.score > 0).length}
              </div>
              <div className="text-sm text-purple-800">Scored Works</div>
            </div>
          </div>

          {/* Subject Performance Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Art Performance */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">🎨</span>
                Art Performance
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Score:</span>
                  <span className="text-2xl font-bold text-pink-600">{artAverage}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Excellent (90-100):</span>
                    <span className="text-green-600 font-medium">{artDistribution.excellent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Good (80-89):</span>
                    <span className="text-blue-600 font-medium">{artDistribution.good}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Satisfactory (70-79):</span>
                    <span className="text-yellow-600 font-medium">{artDistribution.satisfactory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Needs Improvement (70):</span>
                    <span className="text-red-600 font-medium">{artDistribution.needsImprovement}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Math Performance */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">📐</span>
                Mathematics Performance
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Score:</span>
                  <span className="text-2xl font-bold text-green-600">{mathAverage}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Excellent (90-100):</span>
                    <span className="text-green-600 font-medium">{mathDistribution.excellent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Good (80-89):</span>
                    <span className="text-blue-600 font-medium">{mathDistribution.good}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Satisfactory (70-79):</span>
                    <span className="text-yellow-600 font-medium">{mathDistribution.satisfactory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Needs Improvement (70):</span>
                    <span className="text-red-600 font-medium">{mathDistribution.needsImprovement}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Art Works */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">🏆</span>
                Top Art Works
              </h3>
              
              {topArtworks.length > 0 ? (
                <div className="space-y-3">
                  {topArtworks.map((artwork, index) => (
                    <div key={artwork.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800' :
                          index === 1 ? 'bg-gray-100 text-gray-800' :
                          index === 2 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{artwork.title}</div>
                          <div className="text-sm text-gray-600">Student: {artwork.student_id}</div>
                          <div className="text-xs text-gray-500">{getCategoryName(artwork.category_id)}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-pink-600">{artwork.score}</div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No scored artworks yet</p>
              )}
            </div>

            {/* Top Math Works */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                <span className="text-2xl mr-2">🏆</span>
                Top Math Works
              </h3>
              
              {topMathworks.length > 0 ? (
                <div className="space-y-3">
                  {topMathworks.map((mathwork, index) => (
                    <div key={mathwork.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          index === 0 ? 'bg-yellow-100 text-yellow-800' :
                          index === 1 ? 'bg-gray-100 text-gray-800' :
                          index === 2 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">{mathwork.title}</div>
                          <div className="text-sm text-gray-600">Student: {mathwork.student_id}</div>
                          <div className="text-xs text-gray-500">{getCategoryName(mathwork.category_id)}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{mathwork.score}</div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No scored math works yet</p>
              )}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
              <span className="text-2xl mr-2">📊</span>
              Performance by Category
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CATEGORIES.map(category => {
                const artWorksInCategory = results.artworks.filter(a => a.category_id === category.id);
                const mathWorksInCategory = results.mathworks.filter(m => m.category_id === category.id);
                const studentsInCategory = results.students.filter(s => s.category_id === category.id);
                
                return (
                  <div key={category.id} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-3">{category.name}</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Participants:</span>
                        <span className="font-medium">{studentsInCategory.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">🎨 Art works:</span>
                        <span className="font-medium text-pink-600">{artWorksInCategory.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">📐 Math works:</span>
                        <span className="font-medium text-green-600">{mathWorksInCategory.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Art Score:</span>
                        <span className="font-medium text-pink-600">
                          {getAverageScore(artWorksInCategory) || 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Math Score:</span>
                        <span className="font-medium text-green-600">
                          {getAverageScore(mathWorksInCategory) || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* No results message */}
      {!loading && !filters.country && userRole !== 'owner' && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-lg font-semibold mb-2">Results will appear here</h3>
          <p>Performance analytics and leaderboards will be shown once participants submit their work.</p>
        </div>
      )}
    </div>
  );
}