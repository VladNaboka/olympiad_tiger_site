"use client";

import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Image from 'next/image';

const T = {
  en: {
    title1: 'TIGERS', title2: 'NEWS', subtitle: 'OLYMPIAD DEADLINES',
    math: 'MATH', art: 'ART',
    finalDates: 'FINAL ROUND DATES', nationalDates: 'NATIONAL ROUND DATES',
    regDeadline: 'Registration Deadline',
    intake1: (<>1<sup>st</sup> intake – October 31, 2026</>),
    intake2: (<>2<sup>nd</sup> intake – March 1, 2027</>),
    download: '⬇️ Download brochure',
    prizes: 'Prizes',
    mathSingapore: 'Singapore, 27 JUNE – 3 JULY 2027',
    mathCats: [
      { name: 'Category 1 (5-6 grade)', p1: '1st place – trip to the next final', p2: '2nd place – iPad', p3: '3rd place – apple watch' },
      { name: 'Category 2 (7-8 grade)', p1: '1st place – trip to the next final', p2: '2nd place – iPad', p3: '3rd place – apple watch' },
      { name: 'Category 3 (9-10 grade)', p1: '1st place – 100% scholarship UK school', p2: '2nd place – trip to the next final', p3: '3rd place – iPad' },
      { name: 'Category 4 (11-12 grade)', p1: '1st place – Laptop', p2: '2nd place – iPad', p3: '3rd place – apple watch' },
    ],
    artLocations: [
      { place: 'Cape Town, South Africa 25 OCT – 1 NOV 2026', file: '/files_download/ART SA 2026.pdf' },
      { place: 'Epsom, England 2 – 9 APR 2027', file: '/files_download/ART UK 2027.pdf' },
      { place: 'Athens, Greece 1 – 7 AUG 2027', file: '/files_download/ART Greece 2027.pdf' },
    ],
    artCats: [
      { name: 'Category 1 (6-9 years)', p1: '1st place – Free Art Camp for 1 week', p2: '2nd place – iPad', p3: '3rd place – apple watch' },
      { name: 'Category 2 (10-13 years)', p1: '1st place – Free Art Camp for 1 week', p2: '2nd place – iPad', p3: '3rd place – apple watch' },
      { name: 'Category 3 (14-17 years)', p1: '1st place – Free Art Camp for 1 week', p2: '2nd place – iPad', p3: '3rd place – apple watch' },
    ],
  },
  ru: {
    title1: 'TIGERS', title2: 'НОВОСТИ', subtitle: 'СРОКИ ОЛИМПИАДЫ',
    math: 'MATH', art: 'ART',
    finalDates: 'ДАТЫ ФИНАЛЬНОГО РАУНДА', nationalDates: 'ДАТЫ НАЦИОНАЛЬНОГО РАУНДА',
    regDeadline: 'Крайний срок регистрации',
    intake1: (<>1-й поток – 31 октября 2026</>),
    intake2: (<>2-й поток – 1 марта 2027</>),
    download: '⬇️ Скачать брошюру',
    prizes: 'Призы',
    mathSingapore: 'Сингапур, 27 июня – 3 июля 2027',
    mathCats: [
      { name: 'Категория 1 (5-6 класс)', p1: '1 место – поездка на следующий финал', p2: '2 место – iPad', p3: '3 место – Apple Watch' },
      { name: 'Категория 2 (7-8 класс)', p1: '1 место – поездка на следующий финал', p2: '2 место – iPad', p3: '3 место – Apple Watch' },
      { name: 'Категория 3 (9-10 класс)', p1: '1 место – 100% стипендия в школе Великобритании', p2: '2 место – поездка на следующий финал', p3: '3 место – iPad' },
      { name: 'Категория 4 (11-12 класс)', p1: '1 место – Ноутбук', p2: '2 место – iPad', p3: '3 место – Apple Watch' },
    ],
    artLocations: [
      { place: 'Кейптаун, ЮАР, 25 окт. – 1 нояб. 2026', file: '/files_download/ART SA 2026.pdf' },
      { place: 'Эпсом, Англия, 2 – 9 апр. 2027', file: '/files_download/ART UK 2027.pdf' },
      { place: 'Афины, Греция, 1 – 7 авг. 2027', file: '/files_download/ART Greece 2027.pdf' },
    ],
    artCats: [
      { name: 'Категория 1 (6-9 лет)', p1: '1 место – бесплатный арт-кэмп на 1 неделю', p2: '2 место – iPad', p3: '3 место – Apple Watch' },
      { name: 'Категория 2 (10-13 лет)', p1: '1 место – бесплатный арт-кэмп на 1 неделю', p2: '2 место – iPad', p3: '3 место – Apple Watch' },
      { name: 'Категория 3 (14-17 лет)', p1: '1 место – бесплатный арт-кэмп на 1 неделю', p2: '2 место – iPad', p3: '3 место – Apple Watch' },
    ],
  },
};

export default function News() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <div
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{
        backgroundImage: 'url("/image/fonmain1.png")',
      }}
    >
      <Navbar />

      {/* Header Section */}
      <div className="py-12 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-orange-500">{t.title1}</span> <span className="text-black">{t.title2}</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-red-500">
              {t.subtitle}
            </h2>
          </div>
        </div>
      </div>

      {/* MATH Section */}
      <div className="px-4 pb-12">
        <div className="container mx-auto max-w-6xl">

          {/* MATH Header */}
          <div className="bg-orange-500 text-white text-center py-4 mb-8 rounded-xl">
            <h2 className="text-4xl font-bold tracking-wide">{t.math}</h2>
          </div>

          {/* 3 columns: Final dates | Image | National dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 items-center">

            {/* Left: Final Round Dates */}
            <div className="text-center">
              <p className="text-xl font-bold mb-3">{t.finalDates}</p>
              <p className="text-lg text-gray-800 mb-4">{t.mathSingapore}</p>
              <a
                href="/files_download/MATH 2027 singapore.pdf"
                download
                className="inline-flex items-center gap-2 text-green-700 font-bold text-lg hover:text-green-900"
              >
                {t.download}
              </a>
            </div>

            {/* Center: Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden shadow-lg border-4 border-white ring-1 ring-orange-300">
                <Image
                  src="/image/news/singapore_math_final.webp"
                  alt="Singapore"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right: National Round Dates */}
            <div className="text-center">
              <p className="text-xl font-bold mb-1">{t.nationalDates}</p>
              <p className="text-xl font-bold mb-3">{t.regDeadline}</p>
              <p className="text-lg text-gray-800">{t.intake1}</p>
              <p className="text-lg text-gray-800">{t.intake2}</p>
            </div>
          </div>

          {/* MATH Prizes */}
          <h3 className="text-3xl font-bold text-center mb-6">{t.prizes}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.mathCats.map((cat) => (
              <div key={cat.name} className="bg-white rounded-xl shadow-lg p-5 text-center border-t-4 border-orange-400">
                <p className="font-bold text-lg mb-4">{cat.name}</p>
                <p className="text-gray-700 mb-2">{cat.p1}</p>
                <p className="text-gray-700 mb-2">{cat.p2}</p>
                <p className="text-gray-700">{cat.p3}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ART Section */}
      <div className="px-4 pb-12">
        <div className="container mx-auto max-w-6xl">

          {/* ART Header */}
          <div className="bg-blue-500 text-white text-center py-4 mb-8 rounded-xl">
            <h2 className="text-4xl font-bold tracking-wide">{t.art}</h2>
          </div>

          <p className="text-xl font-bold mb-6">{t.finalDates}</p>

          {/* 3 columns: flag + dates + brochure each */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

            {/* South Africa */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-48 h-32 mb-4">
                <Image src="/image/ЮАР.png" alt="South Africa" fill className="object-contain" />
              </div>
              <p className="text-lg text-gray-800">{t.artLocations[0].place}</p>
              <a
                href={t.artLocations[0].file}
                download
                className="inline-flex items-center gap-2 text-green-700 font-bold text-lg hover:text-green-900 mt-2"
              >
                {t.download}
              </a>
            </div>

            {/* England */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-48 h-32 mb-4">
                <Image src="/image/Великобритания.png" alt="Great Britain" fill className="object-contain" />
              </div>
              <p className="text-lg text-gray-800">{t.artLocations[1].place}</p>
              <a
                href={t.artLocations[1].file}
                download
                className="inline-flex items-center gap-2 text-green-700 font-bold text-lg hover:text-green-900 mt-2"
              >
                {t.download}
              </a>
            </div>

            {/* Greece */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-48 h-32 mb-4">
                <Image src="/image/Греция.png" alt="Greece" fill className="object-contain" />
              </div>
              <p className="text-lg text-gray-800">{t.artLocations[2].place}</p>
              <a
                href={t.artLocations[2].file}
                download
                className="inline-flex items-center gap-2 text-green-700 font-bold text-lg hover:text-green-900 mt-2"
              >
                {t.download}
              </a>
            </div>
          </div>

          {/* ART Prizes */}
          <h3 className="text-3xl font-bold text-center mb-6">{t.prizes}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.artCats.map((cat) => (
              <div key={cat.name} className="bg-white rounded-xl shadow-lg p-5 text-center border-t-4 border-blue-400">
                <p className="font-bold text-lg mb-4">{cat.name}</p>
                <p className="text-gray-700 mb-2">{cat.p1}</p>
                <p className="text-gray-700 mb-2">{cat.p2}</p>
                <p className="text-gray-700">{cat.p3}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
