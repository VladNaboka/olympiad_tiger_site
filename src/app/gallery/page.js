"use client";

import { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';
import { getArtWorksByCountryAndCategory } from '../api/student_art_works';
import { getMathWorksByCountryAndCategory } from '../api/student_math_works'; // нужно будет сделать по аналогии с artworks

export default function Gallery() {
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState(''); // Artworks / Math
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryNames = {
    1: "6-9 years",
    2: "10-13 years",
    3: "14-17 years"
  };

  // Загрузка данных при изменении фильтров
  useEffect(() => {
    if (country && category && subject) {
      setLoading(true);

      let fetchData;
      if (subject === "Artworks") {
        fetchData = getArtWorksByCountryAndCategory(country, category);
      } else if (subject === "Math") {
        fetchData = getMathWorksByCountryAndCategory(country, category);
      }

      fetchData
        .then((data) => {
          setItems(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error("Ошибка загрузки данных:", err);
          setItems([]);
        })
        .finally(() => setLoading(false));
    }
  }, [country, category, subject]);

  return (
    <div
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{ backgroundImage: 'url("/image/fonmain1.png")' }}
    >
      <Navbar />

      {/* Hero */}
      <div className="py-16 px-4 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/4">
              <img src="/image/pinkfakel.png" alt="Pink Torch" width="300" height="400" />
            </div>
            <div className="md:w-2/4 text-center my-8 md:my-0">
              <h1 className="text-5xl font-bold text-orange-600 mb-6">📸 Tigers Gallery</h1>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                The Tigers Olympiad brings together the brightest young minds from around the globe.
              </p>
            </div>
            <div className="md:w-1/4">
              <img src="/image/tiger3.png" alt="Tiger Eye" width="300" height="300" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 mb-8">
        <div className="container mx-auto flex flex-col md:flex-row gap-4">
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border p-2 rounded w-full md:w-1/3"
          >
            <option value="">Select country</option>
            <option value="Russia">Russia</option>
            <option value="Kazakhstan">Kazakhstan</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(parseInt(e.target.value))}
            className="border p-2 rounded w-full md:w-1/3"
          >
            <option value="">Select age category</option>
            <option value="1">6-9 years</option>
            <option value="2">10-13 years</option>
            <option value="3">14-17 years</option>
          </select>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-2 rounded w-full md:w-1/3"
          >
            <option value="">Select subject</option>
            <option value="Artworks">Artworks</option>
            <option value="Math">Math</option>
          </select>
        </div>
      </div>

      {/* Gallery */}
      <div className="px-4 pb-16">
        <div className="container mx-auto">
          {loading ? (
            <p className="text-center">Загрузка...</p>
          ) : (items && items.length === 0) ? (
            <p className="text-center">Нет данных для выбранных фильтров</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    {subject === "Artworks" ? (
                      <img
                        src={item.file_path}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
                        {item.title}
                      </div>
                    )}

                    {/* Имя участника */}
                    <div className="absolute top-4 left-4">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-white border-2 border-gray-300"
                      >
                        {categoryNames[item.category_id] || `Category #${item.category_id}`}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-4">
                      Country: {item.country} | Points: {item.score}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gray-100 p-8 rounded-xl text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Join?</h3>
            <p className="text-gray-600 mb-6">Be part of the Tigers Olympiad experience.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-orange-500 text-white py-3 px-8 rounded-full hover:bg-orange-600">
                Register Now
              </Link>
              <Link href="/representatives" className="bg-gray-500 text-white py-3 px-8 rounded-full hover:bg-gray-600">
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
