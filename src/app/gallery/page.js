"use client";

import { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';
import { getArtWorksByCountryAndCategory } from '../api/student_art_works';
import { getMathWorksByCountryAndCategory } from '../api/student_math_works';
import { getStudentById } from '../api/students_api';
import { ART_CATEGORIES, MATH_CATEGORIES, getCategoryName, getCategoriesBySubject, COUNTRIES, COUNTRY_CODES } from '../utils/constants';

export default function Gallery() {
  // Устанавливаем значения по умолчанию
  const [country, setCountry] = useState('Kazakhstan');
  const [category, setCategory] = useState(5); // Первая категория искусства
  const [subject, setSubject] = useState('Artworks');
  const [items, setItems] = useState([]);
  const [studentsCache, setStudentsCache] = useState({});
  const [loading, setLoading] = useState(false);

  // Создаем список стран с флагами на основе constants.js
  const getCountriesWithFlags = () => {
    const flagMap = {
      'Kazakhstan': '🇰🇿',
      'Russia': '🇷🇺',
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'Italy': '🇮🇹',
      'Spain': '🇪🇸',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'Japan': '🇯🇵',
      'China': '🇨🇳',
      'India': '🇮🇳',
      'Brazil': '🇧🇷',
      'Mexico': '🇲🇽',
      'Turkey': '🇹🇷',
      'Poland': '🇵🇱',
      'Czech Republic': '🇨🇿',
      'Ukraine': '🇺🇦',
      'Belarus': '🇧🇾',
      'Lithuania': '🇱🇹',
      'Latvia': '🇱🇻',
      'Estonia': '🇪🇪',
      'Georgia': '🇬🇪',
      'Armenia': '🇦🇲',
      'Azerbaijan': '🇦🇿',
      'Uzbekistan': '🇺🇿',
      'Kyrgyzstan': '🇰🇬',
      'Tajikistan': '🇹🇯',
      'Turkmenistan': '🇹🇲',
      'Mongolia': '🇲🇳'
    };

    return COUNTRIES.map(country => ({
      code: COUNTRY_CODES[country] || country.substring(0, 2).toUpperCase(),
      name: country,
      flag: flagMap[country] || '🌍'
    }));
  };

  const countries = getCountriesWithFlags();

  const subjects = [
    { id: 'Artworks', name: 'Artworks', icon: '🎨', color: 'from-pink-500 to-rose-500', subjectId: '1' },
    { id: 'Math', name: 'Mathematics', icon: '📐', color: 'from-blue-500 to-indigo-500', subjectId: '2' }
  ];

  // Получаем категории в зависимости от выбранного предмета
  const getAvailableCategories = () => {
    if (subject === 'Artworks') {
      return ART_CATEGORIES.map(cat => ({
        id: cat.id,
        name: cat.name,
        icon: cat.minAge <= 9 ? '🧒' : cat.minAge <= 13 ? '👦' : '👨',
        color: cat.minAge <= 9 ? 'bg-green-100 text-green-800' : 
               cat.minAge <= 13 ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
      }));
    } else {
      return MATH_CATEGORIES.map(cat => ({
        id: cat.id,
        name: cat.name,
        icon: cat.minAge <= 12 ? '📚' : cat.minAge <= 14 ? '📖' : cat.minAge <= 16 ? '📊' : '🎓',
        color: cat.minAge <= 12 ? 'bg-yellow-100 text-yellow-800' : 
               cat.minAge <= 14 ? 'bg-green-100 text-green-800' :
               cat.minAge <= 16 ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
      }));
    }
  };

  // Автоматически обновляем категорию при смене предмета
  useEffect(() => {
    const availableCategories = getAvailableCategories();
    if (availableCategories.length > 0) {
      // Выбираем первую доступную категорию для нового предмета
      setCategory(availableCategories[0].id);
    }
  }, [subject]);

  // Функция для загрузки данных студента
  const fetchStudentData = async (studentId) => {
    if (studentsCache[studentId]) {
      return studentsCache[studentId];
    }

    try {
      const student = await getStudentById(studentId);
      setStudentsCache(prev => ({
        ...prev,
        [studentId]: student
      }));
      return student;
    } catch (error) {
      console.error(`Error fetching student ${studentId}:`, error);
      return null;
    }
  };

  // Загрузка данных при изменении фильтров
  useEffect(() => {
    if (country && category && subject) {
      setLoading(true);
      console.log(`🔍 Loading ${subject} for ${country}, category ${category}`);

      let fetchData;
      if (subject === "Artworks") {
        fetchData = getArtWorksByCountryAndCategory(country, category);
      } else if (subject === "Math") {
        fetchData = getMathWorksByCountryAndCategory(country, category);
      }

      fetchData
        .then(async (data) => {
          const works = Array.isArray(data) ? data : [];
          console.log(`📊 Found ${works.length} ${subject.toLowerCase()} for category ${category}`);
          
          // Загружаем данные студентов для всех работ
          const worksWithStudents = await Promise.all(
            works.map(async (work) => {
              if (work.student_id) {
                const student = await fetchStudentData(work.student_id);
                return {
                  ...work,
                  student: student
                };
              }
              return work;
            })
          );

          setItems(worksWithStudents);
        })
        .catch((err) => {
          console.error("Ошибка загрузки данных:", err);
          setItems([]);
        })
        .finally(() => setLoading(false));
    }
  }, [country, category, subject]);

  // Получаем название текущей категории
  const getCurrentCategoryName = () => {
    return getCategoryName(category) || 'Unknown Category';
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{ backgroundImage: 'url("/image/fonmain1.png")' }}
    >
      <Navbar />

      {/* Hero Section */}
      <div className="py-16 px-4 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left - Pink Torch Logo */}
            <div className="md:w-1/4">
              <img 
                src="/image/pinkfakel.png" 
                alt="Tigers Olympiad Pink Torch Logo" 
                width="300"
                height="400"
                style={{width: "300px"}}
              />
            </div>
            
            {/* Center - Title and Description */}
            <div className="md:w-2/4 text-center my-8 md:my-0">
              <h1 className="text-5xl font-bold text-orange-600 mb-6">
                📸 Tigers Gallery
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Explore amazing artworks and math achievements from Tigers participants around the world.
                Filter by country, age category, and subject to discover incredible talent.
              </p>
            </div>
            
            {/* Right - Tiger Eye */}
            <div className="md:w-1/4">
              <img 
                src="/image/tiger3.png" 
                alt="Tiger Eye" 
                width="300"
                height="300"
                style={{width: "300px"}}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Inspiration Message */}
      <div className="px-4 mb-12">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-4">🌟 Discover Global Talent</h2>
            <p className="text-lg">
              Browse through remarkable submissions from Tigers participants worldwide. 
              Use the filters below to explore different countries, age groups, and subjects.
            </p>
          </div>
        </div>
      </div>

      {/* Beautiful Filters Section */}
      <div className="px-4 mb-12">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">🎯 Filter Gallery</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Country Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  🌍 Country
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-gray-800 bg-white shadow-sm hover:shadow-md"
                >
                  {countries.map(countryOption => (
                    <option key={countryOption.code} value={countryOption.name}>
                      {countryOption.flag} {countryOption.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  📚 Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-gray-800 bg-white shadow-sm hover:shadow-md"
                >
                  {subjects.map(subjectOption => (
                    <option key={subjectOption.id} value={subjectOption.id}>
                      {subjectOption.icon} {subjectOption.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  👶 Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-800 bg-white shadow-sm hover:shadow-md"
                >
                  {getAvailableCategories().map(categoryOption => (
                    <option key={categoryOption.id} value={categoryOption.id}>
                      {categoryOption.icon} {categoryOption.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Current Selection Display */}
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
              <p className="text-center text-gray-700">
                <span className="font-semibold">Currently viewing:</span> {subject} from <span className="text-orange-600 font-semibold">{country}</span> 
                {' '}• Category: <span className="text-orange-600 font-semibold">{getCurrentCategoryName()}</span>
                {items.length > 0 && (
                  <span> • <span className="text-green-600 font-semibold">{items.length}</span> {items.length === 1 ? 'result' : 'results'} found</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          {loading ? (
            <div className="text-center py-16">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-6"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl">{subjects.find(s => s.id === subject)?.icon}</div>
                </div>
              </div>
              <p className="text-gray-600 text-xl font-medium">Loading incredible works...</p>
              <p className="text-gray-500 text-sm mt-2">Discovering talent from {country}</p>
            </div>
          ) : (items && items.length === 0) ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-3xl font-bold text-gray-700 mb-4">No works found</h3>
              <p className="text-gray-600 mb-8 text-lg">
                No {subject.toLowerCase()} found for <strong>{country}</strong> in the <strong>{getCurrentCategoryName()}</strong> category.
              </p>
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 max-w-lg mx-auto">
                <div className="text-4xl mb-3">💡</div>
                <p className="text-yellow-800 font-medium">
                  <strong>Tip:</strong> Try different combinations of country, subject, and category, or contact your representative to submit works!
                </p>
                <div className="mt-4 text-sm text-yellow-700">
                  <p>📝 <strong>For Art:</strong> Categories are Age 6-9, Age 10-13, Age 14-17</p>
                  <p>📊 <strong>For Math:</strong> Categories are Grade 5-6, Grade 7-8, Grade 9-10, Grade 11-12</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-gray-800 mb-2">
                  {subjects.find(s => s.id === subject)?.icon} {subject} Gallery
                </h3>
                <p className="text-xl text-gray-600">
                  {getCurrentCategoryName()} • {country} • {items.length} amazing {items.length === 1 ? 'work' : 'works'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                  >
                    <div className="relative">
                      {subject === "Artworks" ? (
                        <div className="relative">
                          <img
                            src={item.file_path || "/image/artwork-sample.png"}
                            alt={item.title}
                            className="w-full h-56 object-cover"
                            onError={(e) => {
                              e.target.src = "/image/artwork-placeholder.png";
                            }}
                          />
                          {/* Art badge */}
                          <div className="absolute top-4 left-4">
                            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-pink-500 text-white shadow-lg backdrop-blur-sm">
                              🎨 Artwork
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="w-full h-56 bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-6xl mb-3">📐</div>
                              <p className="text-gray-700 font-semibold text-lg px-4">{item.title}</p>
                            </div>
                          </div>
                          {/* Math badge */}
                          <div className="absolute top-4 left-4">
                            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-500 text-white shadow-lg backdrop-blur-sm">
                              📐 Math
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Score badge */}
                      {item.score && (
                        <div className="absolute top-4 right-4">
                          <span className="inline-block px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-800 shadow-lg backdrop-blur-sm">
                            ⭐ {item.score} pts
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{item.title}</h4>
                      
                      {/* Student Information */}
                      {item.student ? (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <p className="font-semibold text-gray-800 mb-2">{item.student.name || item.student.full_name}</p>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span className="flex items-center">
                              <span className="mr-1">👤</span>
                              ID: {item.student_id}
                            </span>
                            {item.student.school && (
                              <span className="flex items-center">
                                <span className="mr-1">🏫</span>
                                {item.student.school}
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <p className="text-sm text-gray-500 flex items-center">
                            <span className="mr-1">👤</span>
                            Student ID: {item.student_id || 'Unknown'}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                          <span className="mr-1">🌍</span>
                          {item.country}
                        </span>
                        <span className={`flex items-center px-3 py-1 rounded-full ${
                          getAvailableCategories().find(c => c.id === item.category_id)?.color || 'bg-gray-100 text-gray-800'
                        }`}>
                          <span className="mr-1">{getAvailableCategories().find(c => c.id === item.category_id)?.icon}</span>
                          {getCurrentCategoryName()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl text-center border border-gray-200 shadow-lg">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Ready to Join the Tigers Experience?</h3>
            <p className="text-gray-600 mb-8 text-lg">
              Be part of the next generation of Tigers Olympiad participants and showcase your talent to the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/register" 
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 px-8 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <span className="mr-2">🎯</span>
                Register Now
              </Link>
              <Link 
                href="/representatives" 
                className="inline-flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 px-8 rounded-full text-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <span className="mr-2">🌍</span>
                Find Your Representative
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}