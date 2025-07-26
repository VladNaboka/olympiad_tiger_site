'use client';

import { useState, useEffect } from 'react';
import { getStudentsByCountry } from '../../api/students_api';
import { COUNTRIES, CATEGORIES, getCategoryName } from '../../utils/constants';

export default function GlobalStatisticsTab({ globalStats, filters }) {
  const [detailedStats, setDetailedStats] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDetailedStatistics = async () => {
    setLoading(true);
    try {
      const promises = COUNTRIES.map(async (country) => {
        try {
          const students = await getStudentsByCountry(country);
          return {
            country,
            totalStudents: students.length,
            artStudents: students.filter(s => s.course_id === 1 || s.course_id === '1').length,
            mathStudents: students.filter(s => s.course_id === 2 || s.course_id === '2').length,
            categories: CATEGORIES.map(cat => ({
              ...cat,
              count: students.filter(s => s.category_id === cat.id).length
            }))
          };
        } catch {
          return {
            country,
            totalStudents: 0,
            artStudents: 0,
            mathStudents: 0,
            categories: CATEGORIES.map(cat => ({ ...cat, count: 0 }))
          };
        }
      });

      const results = await Promise.all(promises);
      // Фильтруем только страны с участниками
      setDetailedStats(results.filter(stat => stat.totalStudents > 0));
    } catch (error) {
      console.error('Error loading detailed statistics:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDetailedStatistics();
  }, []);

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

  const filteredStats = filters.country 
    ? detailedStats.filter(stat => stat.country === filters.country)
    : detailedStats;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Global Statistics Overview</h2>
          <p className="text-sm text-gray-600 mt-1">
            Comprehensive statistics across all regions
          </p>
        </div>
        <button
          onClick={loadDetailedStatistics}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center"
        >
          <span className="mr-2">🔄</span>
          Refresh Data
        </button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading statistics...</p>
        </div>
      )}

      {!loading && (
        <div className="space-y-6">
          {/* Global Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Global Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{globalStats.totalCountries}</div>
                <div className="text-sm text-gray-600">Active Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{globalStats.totalRepresentatives}</div>
                <div className="text-sm text-gray-600">Representatives</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{globalStats.totalStudents}</div>
                <div className="text-sm text-gray-600">Total Participants</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">
                  {globalStats.totalArtStudents}/{globalStats.totalMathStudents}
                </div>
                <div className="text-sm text-gray-600">Art/Math Split</div>
              </div>
            </div>
          </div>

          {/* Country-by-Country Breakdown */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Country Breakdown</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredStats.map((countryStat) => (
                <div key={countryStat.country} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                      <span className="text-2xl mr-2">{getCountryFlag(countryStat.country)}</span>
                      {countryStat.country}
                    </h4>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                      {countryStat.totalStudents} participants
                    </span>
                  </div>

                  {/* Subject Distribution */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-pink-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">🎨 Art</span>
                        <span className="text-lg font-bold text-pink-600">
                          {countryStat.artStudents}
                        </span>
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">📐 Math</span>
                        <span className="text-lg font-bold text-green-600">
                          {countryStat.mathStudents}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Age Categories */}
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Age Categories:</div>
                    <div className="space-y-1">
                      {countryStat.categories.map((category) => (
                        <div key={category.id} className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{category.name}</span>
                          <span className="font-medium text-gray-800">{category.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* No Data Message */}
          {filteredStats.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-lg font-semibold mb-2">No data available</h3>
              <p>
                {filters.country 
                  ? `No participants found for ${filters.country}`
                  : 'No countries have participants yet'
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}