"use client";

import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';
import { getAllArtWorks } from '../api/student_art_works';
import { getAllMathWorks } from '../api/student_math_works';
import { getStudentById } from '../api/students_api';
import { ART_CATEGORIES, MATH_CATEGORIES, getCategoryName, getCategoriesBySubject, getCategoryDisplayName } from '../utils/constants';
import ArtworkImage from '../components/ArtworkImage';

const TRANSLATIONS = {
  en: {
    heroTitle: '📸 Tigers Gallery',
    heroSubtitle: 'Explore amazing artworks and math achievements from Tigers participants around the world. Filter by age category and subject or search by student ID.',
    discoverTitle: '🌟 Discover Global Talent',
    discoverText: 'Browse through remarkable submissions from Tigers participants worldwide. Use the filters below to explore different countries, age groups, and subjects.',
    filterGalleryTitle: '🎯 Filter Gallery',
    searchByIdTitle: '🔍 Search by Student ID',
    searchPlaceholder: 'Enter Student ID (e.g., 123)',
    searchButton: '🔍 Search',
    searchingButton: '🔍 Searching...',
    clearButton: '❌ Clear',
    foundWorksText: (count, id) => `Found ${count} work(s) for Student ID: ${id}`,
    subjectLabel: '📚 Subject',
    categoryLabel: '👶 Category',
    currentlyViewingLabel: 'Currently viewing:',
    categoryWord: 'Category:',
    resultWord: 'result',
    resultsWord: 'results',
    foundWord: 'found',
    searchingWorksText: 'Searching for works...',
    loadingWorksText: 'Loading incredible works...',
    lookingForIdText: (id) => `Looking for Student ID ${id}`,
    discoveringTalentText: 'Discovering talent from around the world',
    noWorksSearchTitle: 'No works found for this Student ID',
    noWorksTitle: 'No works found',
    noWorksSearchText: (id) => `No works found for Student ID: ${id}. They may not have submitted any works yet, or the ID may not exist.`,
    noWorksText: (subject, category) => `No ${subject.toLowerCase()} found in the ${category} category.`,
    tipLabel: 'Tip:',
    tipSearchText: 'Double-check the Student ID, or try browsing by country and category instead.',
    tipDefaultText: 'Try different combinations of subject and category, or contact your representative to submit works!',
    forArtText: '📝 For Art: Categories are Age 6-9, Age 10-13, Age 14-17',
    forMathText: '📊 For Math: Categories are Grade 5-6, Grade 7-8, Grade 9-10, Grade 11-12',
    searchResultsTitle: (id) => `🔍 Search Results for Student ID: ${id}`,
    galleryTitleFor: (icon, subject) => `${icon} ${subject} Gallery`,
    foundCountText: (count) => `Found ${count} work(s)`,
    amazingWorksText: (category, count, word) => `${category} • ${count} amazing ${word}`,
    workWord: 'work',
    worksWord: 'works',
    backToGalleryButton: 'Back to Gallery',
    idLabel: 'ID:',
    unknownText: 'Unknown',
    ctaTitle: 'Ready to Join the Tigers Experience?',
    ctaText: 'Be part of the next generation of Tigers Olympiad participants and showcase your talent to the world.',
    registerNowButton: 'Register Now',
    findRepresentativeButton: 'Find Your Representative',
    subjectNames: { Artworks: 'Artworks', Math: 'Mathematics' },
    unknownCategory: 'Unknown Category',
    enterStudentIdAlert: 'Please enter a Student ID',
    searchErrorAlert: 'Error occurred while searching',
  },
  ru: {
    heroTitle: '📸 Галерея Tigers',
    heroSubtitle: 'Изучите потрясающие творческие работы и математические достижения участников Tigers со всего мира. Фильтруйте по возрастной категории и предмету или ищите по ID участника.',
    discoverTitle: '🌟 Откройте таланты со всего мира',
    discoverText: 'Просмотрите замечательные работы участников Tigers со всего мира. Используйте фильтры ниже, чтобы изучить работы по странам, возрастным группам и предметам.',
    filterGalleryTitle: '🎯 Фильтр галереи',
    searchByIdTitle: '🔍 Поиск по ID участника',
    searchPlaceholder: 'Введите ID участника (например, 123)',
    searchButton: '🔍 Найти',
    searchingButton: '🔍 Поиск...',
    clearButton: '❌ Очистить',
    foundWorksText: (count, id) => `Найдено работ: ${count} для ID участника: ${id}`,
    subjectLabel: '📚 Предмет',
    categoryLabel: '👶 Категория',
    currentlyViewingLabel: 'Сейчас просматривается:',
    categoryWord: 'Категория:',
    resultWord: 'результат',
    resultsWord: 'результатов',
    foundWord: 'найдено',
    searchingWorksText: 'Идёт поиск работ...',
    loadingWorksText: 'Загружаем потрясающие работы...',
    lookingForIdText: (id) => `Ищем ID участника ${id}`,
    discoveringTalentText: 'Открываем таланты со всего мира',
    noWorksSearchTitle: 'По этому ID участника работы не найдены',
    noWorksTitle: 'Работы не найдены',
    noWorksSearchText: (id) => `Работы для ID участника ${id} не найдены. Возможно, они ещё не отправили работы, либо такого ID не существует.`,
    noWorksText: (subject, category) => `В категории «${category}» работ по разделу «${subject}» не найдено.`,
    tipLabel: 'Совет:',
    tipSearchText: 'Проверьте правильность ID участника или попробуйте найти работу по стране и категории.',
    tipDefaultText: 'Попробуйте другие сочетания предмета и категории, либо обратитесь к своему представителю, чтобы отправить работу!',
    forArtText: '📝 Для Art: категории — возраст 6-9, 10-13, 14-17 лет',
    forMathText: '📊 Для Math: категории — 5-6, 7-8, 9-10, 11-12 классы',
    searchResultsTitle: (id) => `🔍 Результаты поиска по ID участника: ${id}`,
    galleryTitleFor: (icon, subject) => `${icon} Галерея — ${subject}`,
    foundCountText: (count) => `Найдено работ: ${count}`,
    amazingWorksText: (category, count, word) => `${category} • ${count} потрясающих ${word}`,
    workWord: 'работа',
    worksWord: 'работ',
    backToGalleryButton: 'Назад в галерею',
    idLabel: 'ID:',
    unknownText: 'Неизвестно',
    ctaTitle: 'Готовы стать частью Tigers?',
    ctaText: 'Присоединяйтесь к новому поколению участников Tigers Olympiad и покажите свой талант всему миру.',
    registerNowButton: 'Зарегистрироваться',
    findRepresentativeButton: 'Найти представителя',
    subjectNames: { Artworks: 'Творческие работы', Math: 'Математика' },
    unknownCategory: 'Неизвестная категория',
    enterStudentIdAlert: 'Пожалуйста, введите ID участника',
    searchErrorAlert: 'Произошла ошибка при поиске',
  },
};

export default function Gallery() {
  const { lang } = useLanguage();
  const t = TRANSLATIONS[lang];
  // Устанавливаем значения по умолчанию
  const [category, setCategory] = useState(5); // Первая категория искусства
  const [subject, setSubject] = useState('Artworks');
  const [items, setItems] = useState([]);
  const [studentsCache, setStudentsCache] = useState({});
  const [loading, setLoading] = useState(false);
  
  // Новые состояния для поиска
  const [searchStudentId, setSearchStudentId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const subjects = [
    { id: 'Artworks', name: t.subjectNames.Artworks, icon: '🎨', color: 'from-pink-500 to-rose-500', subjectId: '1' },
    { id: 'Math', name: t.subjectNames.Math, icon: '📐', color: 'from-blue-500 to-indigo-500', subjectId: '2' }
  ];

  // Получаем категории в зависимости от выбранного предмета
  const getAvailableCategories = () => {
    if (subject === 'Artworks') {
      return ART_CATEGORIES.map(cat => ({
        id: cat.id,
        name: getCategoryDisplayName(cat.id, lang),
        icon: cat.minAge <= 9 ? '🧒' : cat.minAge <= 13 ? '👦' : '👨',
        color: cat.minAge <= 9 ? 'bg-green-100 text-green-800' : 
               cat.minAge <= 13 ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
      }));
    } else {
      return MATH_CATEGORIES.map(cat => ({
        id: cat.id,
        name: getCategoryDisplayName(cat.id, lang),
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

  // Получаем правильные ID категорий для текущего предмета
  const getCategoryIdsForSubject = (subjectType) => {
    if (subjectType === 'Artworks') {
      return [5, 6, 7]; // ART_CATEGORIES IDs
    } else if (subjectType === 'Math') {
      return [1, 2, 3, 4]; // MATH_CATEGORIES IDs  
    }
    return [];
  };

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

  // Функция для поиска работ по ID студента
  const searchByStudentId = async () => {
    if (!searchStudentId.trim()) {
      alert(t.enterStudentIdAlert);
      return;
    }

    setIsSearching(true);

    try {
      const [artWorks, mathWorks] = await Promise.all([
        getAllArtWorks().catch(() => []),
        getAllMathWorks().catch(() => []),
      ]);

      const results = [
        ...(Array.isArray(artWorks) ? artWorks : [])
          .filter(work => work.student_id && work.student_id.toString() === searchStudentId.trim())
          .map(work => ({ ...work, subject: 'Artworks' })),
        ...(Array.isArray(mathWorks) ? mathWorks : [])
          .filter(work => work.student_id && work.student_id.toString() === searchStudentId.trim())
          .map(work => ({ ...work, subject: 'Math' })),
      ];

      const worksWithStudents = await Promise.all(
        results.map(async (work) => {
          if (work.student_id) {
            const student = await fetchStudentData(work.student_id);
            return { ...work, student };
          }
          return work;
        })
      );

      setSearchResults(worksWithStudents);
    } catch (error) {
      console.error('Error searching by student ID:', error);
      alert(t.searchErrorAlert);
    }

    setIsSearching(false);
  };

  // Функция для очистки поиска
  const clearSearch = () => {
    setSearchStudentId('');
    setSearchResults([]);
  };

  // Загрузка данных при изменении фильтров
  useEffect(() => {
    if (category && subject && !searchResults.length) {
      setLoading(true);

      const fetchData = subject === "Artworks" ? getAllArtWorks() : getAllMathWorks();

      fetchData
        .then(async (data) => {
          const allWorks = data && Array.isArray(data) ? data : [];
          const works = allWorks.filter(work => work.category_id === category);

          const worksWithStudents = await Promise.all(
            works.map(async (work) => {
              if (work.student_id) {
                const student = await fetchStudentData(work.student_id);
                return { ...work, student };
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
  }, [category, subject, searchResults.length]);

  // Получаем название текущей категории
  const getCurrentCategoryName = () => {
    return getCategoryDisplayName(category, lang) || t.unknownCategory;
  };

  // Определяем какие данные показывать
  const displayItems = searchResults.length > 0 ? searchResults : items;
  const isShowingSearchResults = searchResults.length > 0;

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
                {t.heroTitle}
              </h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                {t.heroSubtitle}
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
            <h2 className="text-2xl font-bold mb-4">{t.discoverTitle}</h2>
            <p className="text-lg">
              {t.discoverText}
            </p>
          </div>
        </div>
      </div>

      {/* Beautiful Filters Section - Hide when showing search results */}
      {!isShowingSearchResults && (
        <div className="px-4 mb-12">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">{t.filterGalleryTitle}</h3>

              {/* Search by Student ID in Filter Gallery */}
              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">{t.searchByIdTitle}</h4>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-lg mx-auto">
                  <input
                    type="text"
                    value={searchStudentId}
                    onChange={(e) => setSearchStudentId(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && searchByStudentId()}
                  />
                  <button
                    onClick={searchByStudentId}
                    disabled={isSearching}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 min-w-[100px]"
                  >
                    {isSearching ? t.searchingButton : t.searchButton}
                  </button>
                  {searchResults.length > 0 && (
                    <button
                      onClick={clearSearch}
                      className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                      {t.clearButton}
                    </button>
                  )}
                </div>
                {searchResults.length > 0 && (
                  <p className="mt-3 text-center text-green-700 font-medium">
                    {t.foundWorksText(searchResults.length, searchStudentId)}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <span className="font-semibold">{t.currentlyViewingLabel}</span> {subject}
                  {' '}• {t.categoryWord} <span className="text-orange-600 font-semibold">{getCurrentCategoryName()}</span>
                  {items.length > 0 && (
                    <span> • <span className="text-green-600 font-semibold">{items.length}</span> {items.length === 1 ? t.resultWord : t.resultsWord} {t.foundWord}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Content */}
      <div className="px-4 pb-16">
        <div className="container mx-auto max-w-6xl">
          {loading || isSearching ? (
            <div className="text-center py-16">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-6"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl">{isSearching ? '🔍' : subjects.find(s => s.id === subject)?.icon}</div>
                </div>
              </div>
              <p className="text-gray-600 text-xl font-medium">
                {isSearching ? t.searchingWorksText : t.loadingWorksText}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                {isSearching ? t.lookingForIdText(searchStudentId) : t.discoveringTalentText}
              </p>
            </div>
          ) : displayItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🔍</div>
              <h3 className="text-3xl font-bold text-gray-700 mb-4">
                {isShowingSearchResults ? t.noWorksSearchTitle : t.noWorksTitle}
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                {isShowingSearchResults
                  ? t.noWorksSearchText(searchStudentId)
                  : t.noWorksText(subject, getCurrentCategoryName())
                }
              </p>
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 max-w-lg mx-auto">
                <div className="text-4xl mb-3">💡</div>
                <p className="text-yellow-800 font-medium">
                  <strong>{t.tipLabel}</strong> {isShowingSearchResults
                    ? t.tipSearchText
                    : t.tipDefaultText
                  }
                </p>
                {!isShowingSearchResults && (
                  <div className="mt-4 text-sm text-yellow-700">
                    <p>{t.forArtText}</p>
                    <p>{t.forMathText}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-gray-800 mb-2">
                  {isShowingSearchResults
                    ? t.searchResultsTitle(searchStudentId)
                    : t.galleryTitleFor(subjects.find(s => s.id === subject)?.icon, subject)
                  }
                </h3>
                <p className="text-xl text-gray-600">
                  {isShowingSearchResults
                    ? t.foundCountText(displayItems.length)
                    : t.amazingWorksText(getCurrentCategoryName(), displayItems.length, displayItems.length === 1 ? t.workWord : t.worksWord)
                  }
                </p>
                {/* Back to Gallery Button when showing search results */}
                {isShowingSearchResults && (
                  <div className="mt-4">
                    <button
                      onClick={clearSearch}
                      className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center"
                    >
                      <span className="mr-2">←</span>
                      {t.backToGalleryButton}
                    </button>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayItems.map((item) => (
                  <div
                    key={`${item.id}-${item.subject || subject}`}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                  >
                    {(item.subject === "Artworks" || subject === "Artworks") ? (
                      <div className="relative w-full h-56">
                        <ArtworkImage
                          src={item.file_path}
                          alt={item.title}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-56 bg-gradient-to-br from-blue-100 via-purple-50 to-indigo-100 flex items-center justify-center">
                        <div className="text-6xl">📐</div>
                      </div>
                    )}

                    <div className="p-4 text-center">
                      <p className="text-sm text-gray-600">
                        {t.idLabel} {item.student_id || t.unknownText}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Call to Action - Hide when showing search results */}
      {!isShowingSearchResults && (
        <div className="px-4 pb-16">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl text-center border border-gray-200 shadow-lg">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">{t.ctaTitle}</h3>
              <p className="text-gray-600 mb-8 text-lg">
                {t.ctaText}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 px-8 rounded-full text-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <span className="mr-2">🎯</span>
                  {t.registerNowButton}
                </Link>
                <Link
                  href="/representatives"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 px-8 rounded-full text-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <span className="mr-2">🌍</span>
                  {t.findRepresentativeButton}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}