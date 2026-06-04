"use client";

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Image from 'next/image';

export default function News() {
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
              <span className="text-orange-500">TIGERS</span> <span className="text-black">NEWS</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-red-500">
              OLYMPIAD DEADLINES
            </h2>
          </div>
        </div>
      </div>

      {/* MATH Section */}
      <div className="px-4 pb-12">
        <div className="container mx-auto max-w-6xl">

          {/* MATH Header */}
          <div className="bg-orange-500 text-white text-center py-4 mb-8 rounded-xl">
            <h2 className="text-4xl font-bold tracking-wide">MATH</h2>
          </div>

          {/* 3 columns: Final dates | Image | National dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 items-center">

            {/* Left: Final Round Dates */}
            <div className="text-center">
              <p className="text-xl font-bold mb-3">FINAL ROUND DATES</p>
              <p className="text-lg text-gray-800 mb-4">Singapore, 27 JUNE – 3 JULY 2027</p>
              <a
                href="/files_download/MATH 2026.pdf"
                download
                className="inline-flex items-center gap-2 text-green-700 font-bold text-lg hover:text-green-900"
              >
                ⬇️ Download brochure
              </a>
            </div>

            {/* Center: Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full h-48 md:h-56">
                <Image
                  src="/image/news/math_final_in_china.png"
                  alt="Math Final"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right: National Round Dates */}
            <div className="text-center">
              <p className="text-xl font-bold mb-1">NATIONAL ROUND DATES</p>
              <p className="text-xl font-bold mb-3">Registration Deadline</p>
              <p className="text-lg text-gray-800">1<sup>st</sup> intake – October 31, 2026</p>
              <p className="text-lg text-gray-800">2<sup>nd</sup> intake – January 31, 2027</p>
            </div>
          </div>

          {/* MATH Prizes */}
          <h3 className="text-3xl font-bold text-center mb-6">Prizes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="bg-white rounded-xl shadow-lg p-5 text-center border-t-4 border-orange-400">
              <p className="font-bold text-lg mb-4">Category 1 (5-6 grade)</p>
              <p className="text-gray-700 mb-2">1st place – trip to the next final</p>
              <p className="text-gray-700 mb-2">2nd place – iPad</p>
              <p className="text-gray-700">3rd place – apple watch</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-5 text-center border-t-4 border-orange-400">
              <p className="font-bold text-lg mb-4">Category 2 (7-8 grade)</p>
              <p className="text-gray-700 mb-2">1st place – trip to the next final</p>
              <p className="text-gray-700 mb-2">2nd place – iPad</p>
              <p className="text-gray-700">3rd place – apple watch</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-5 text-center border-t-4 border-orange-400">
              <p className="font-bold text-lg mb-4">Category 3 (9-10 grade)</p>
              <p className="text-gray-700 mb-2">1st place – 100% scholarship UK school</p>
              <p className="text-gray-700 mb-2">2nd place – trip to the next final</p>
              <p className="text-gray-700">3rd place – iPad</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-5 text-center border-t-4 border-orange-400">
              <p className="font-bold text-lg mb-4">Category 4 (11-12 grade)</p>
              <p className="text-gray-700 mb-2">1st place – Laptop</p>
              <p className="text-gray-700 mb-2">2nd place – iPad</p>
              <p className="text-gray-700">3rd place – apple watch</p>
            </div>
          </div>
        </div>
      </div>

      {/* ART Section */}
      <div className="px-4 pb-12">
        <div className="container mx-auto max-w-6xl">

          {/* ART Header */}
          <div className="bg-blue-500 text-white text-center py-4 mb-8 rounded-xl">
            <h2 className="text-4xl font-bold tracking-wide">ART</h2>
          </div>

          <p className="text-xl font-bold mb-6">FINAL ROUND DATES</p>

          {/* 3 columns: flag + dates + brochure each */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

            {/* South Africa */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-48 h-32 mb-4">
                <Image src="/image/ЮАР.png" alt="South Africa" fill className="object-contain" />
              </div>
              <p className="text-lg text-gray-800">Cape Town, South Africa 25 OCT – 1 NOV 2026</p>
              <a
                href="/files_download/ART SA 2026.pdf"
                download
                className="inline-flex items-center gap-2 text-green-700 font-bold text-lg hover:text-green-900 mt-2"
              >
                ⬇️ Download brochure
              </a>
            </div>

            {/* England */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-48 h-32 mb-4">
                <Image src="/image/Великобритания.png" alt="Great Britain" fill className="object-contain" />
              </div>
              <p className="text-lg text-gray-800">Epsom, England 2 – 9 APR 2027</p>
              <a
                href="/files_download/ART UK 2027.pdf"
                download
                className="inline-flex items-center gap-2 text-green-700 font-bold text-lg hover:text-green-900 mt-2"
              >
                ⬇️ Download brochure
              </a>
            </div>

            {/* Greece */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-48 h-32 mb-4">
                <Image src="/image/Греция.png" alt="Greece" fill className="object-contain" />
              </div>
              <p className="text-lg text-gray-800">Athens, Greece 1 – 7 AUG 2027</p>
              <a
                href="/files_download/ART Greece 2027.pdf"
                download
                className="inline-flex items-center gap-2 text-green-700 font-bold text-lg hover:text-green-900 mt-2"
              >
                ⬇️ Download brochure
              </a>
            </div>
          </div>

          {/* ART Prizes */}
          <h3 className="text-3xl font-bold text-center mb-6">Prizes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="bg-white rounded-xl shadow-lg p-5 text-center border-t-4 border-blue-400">
              <p className="font-bold text-lg mb-4">Category 1 (6-9 years)</p>
              <p className="text-gray-700 mb-2">1st place – trip to the next final</p>
              <p className="text-gray-700 mb-2">2nd place – iPad</p>
              <p className="text-gray-700">3rd place – apple watch</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-5 text-center border-t-4 border-blue-400">
              <p className="font-bold text-lg mb-4">Category 2 (10-13 years)</p>
              <p className="text-gray-700 mb-2">1st place – trip to the next final</p>
              <p className="text-gray-700 mb-2">2nd place – iPad</p>
              <p className="text-gray-700">3rd place – apple watch</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-5 text-center border-t-4 border-blue-400">
              <p className="font-bold text-lg mb-4">Category 3 (14-17 years)</p>
              <p className="text-gray-700 mb-2">1st place – 100% scholarship</p>
              <p className="text-gray-700 mb-2">2nd place – iPad</p>
              <p className="text-gray-700">3rd place – apple watch</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
