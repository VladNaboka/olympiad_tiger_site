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
          {/* Main Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-orange-500">TIGERS</span> <span className="text-black">NEWS</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-red-500">
              OLYMPIAD DEADLINES
            </h2>
          </div>

          {/* Flag and Deadlines Layout */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
            {/* Tigers Flag - Left Side */}
            <div className="flex-shrink-0">
              <div className="relative w-96 h-96 md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="/image/news/tigers_flag.png"
                  alt="Tigers Flag"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Deadlines Information - Right Side */}
            <div className="text-center lg:text-left space-y-8">
              {/* Math Section */}
              <div>
                <h3 className="text-3xl font-bold text-black mb-4 underline decoration-2">MATH</h3>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-black">Registration Deadline</p>
                  <p className="text-lg text-gray-800">first intake - October 31, 2026</p>
                  <p className="text-lg text-gray-800">second intake - January 31, 2027</p>
                </div>
              </div>

              {/* Art Section */}
              <div>
                <h3 className="text-3xl font-bold text-black mb-4 underline decoration-2">ART</h3>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-black">Registration Deadline</p>
                  <p className="text-lg text-gray-800">Cape Town, South Africa</p>
                  <p className="text-lg text-gray-800">September 5, 2026</p>
                  <p className="text-lg text-gray-800 mt-5">Epsom, England</p>
                  <p className="text-lg text-gray-800">February 1, 2027</p>
                  <p className="text-lg text-gray-800 mt-5">Athens, Greece</p>
                  <p className="text-lg text-gray-800">June 15, 2027</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Events Section */}
      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
              FINAL <span className="underline">JULY 2026</span>
            </h2>
          </div>

          {/* 2x2 Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Row 1, Col 1: Math Text */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">MATH final in China</h3>
              <div className="relative h-40 md:h-48 w-full mb-4">
                <Image
                  src="/image/Chinaflag.png"
                  alt="China Flag"
                  fill
                  className="object-contain"
                />
              </div>
              <a
                href="/files_download/MATH 2026.pdf"
                download
                className="text-sm md:text-base text-gray-600 mt-2 hover:text-purple-600 cursor-pointer underline block"
              >
                download the brochure
              </a>            
            </div>

            {/* Row 1, Col 2: Math Image */}
            <div className="rounded-xl overflow-hidden">
              <div className="relative h-64 md:h-80 lg:h-96">
                <Image
                  src="/image/news/math_final_in_china.png"
                  alt="Math Final in China"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Row 2, Col 1: Art Image */}
            <div className="rounded-xl overflow-hidden">
              <div className="relative h-64 md:h-80 lg:h-96">
                <Image
                  src="/image/news/art_final_in_GB.png"
                  alt="Art Final in Great Britain"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Row 2, Col 2: Art Text */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">ART Final in South Africa</h3>
              <div className="relative h-40 md:h-48 w-full mb-4">
                <Image
                  src="/image/SouthAfrica.png"
                  alt="South Africa"
                  fill
                  className="object-contain"
                />
              </div>
              <a
                href="/files_download/ART SA 2026.pdf"
                download
                className="text-sm md:text-base text-gray-600 mt-2 hover:text-purple-600 cursor-pointer underline block"
              >
                download the brochure
              </a>
            </div>

            {/* Row 3, Col 1: Art England Text */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col justify-center items-center text-center min-h-64 md:min-h-80 lg:min-h-96">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">ART Final in England</h3>
              <div className="relative h-40 md:h-48 w-full mb-4">
                <Image
                  src="/image/GreatBritainflag.png"
                  alt="Great Britain Flag"
                  fill
                  className="object-contain"
                />
              </div>
              <a
                href="/files_download/ART UK 2027.pdf"
                download
                className="text-sm md:text-base text-gray-600 mt-2 hover:text-purple-600 cursor-pointer underline block"
              >
                download the brochure
              </a>
            </div>

            {/* Row 3, Col 2: Art England Image */}
            <div className="rounded-xl overflow-hidden">
              <div className="relative h-64 md:h-80 lg:h-96">
                <Image
                  src="/image/news/tiger_stem.png"
                  alt="Art Final in England"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Row 4, Col 1: Art Greece Image */}
            <div className="rounded-xl overflow-hidden">
              <div className="relative h-64 md:h-80 lg:h-96">
                <Image
                  src="/image/news/look_head.png"
                  alt="Art Final in Greece"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Row 4, Col 2: Art Greece Text */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col justify-center items-center text-center min-h-64 md:min-h-80 lg:min-h-96">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">ART Final in Greece</h3>
              <div className="relative h-40 md:h-48 w-full mb-4">
                <Image
                  src="/image/Greeceflag.png"
                  alt="Greece Flag"
                  fill
                  className="object-contain"
                />
              </div>
              <a
                href="/files_download/ART Greece 2027.pdf"
                download
                className="text-sm md:text-base text-gray-600 mt-2 hover:text-purple-600 cursor-pointer underline block"
              >
                download the brochure
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Prizes Section */}
      <div className="px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-red-600 mb-4">PRIZES</h2>
            </div>

            <div className="space-y-6">
              {/* Gold Prize */}
              <div className="flex items-center p-6 bg-yellow-50 rounded-lg border-2 border-yellow-200">
                <div className="text-7xl mr-6 flex-shrink-0">
                  🥇
                </div>
                <span className="text-xl font-bold text-gray-900">2 weeks summer camp, 2027 (US or UK)</span>
              </div>

              {/* Silver Prize */}
              <div className="flex items-center p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
                <div className="text-7xl mr-6 flex-shrink-0">
                  🥈
                </div>
                <span className="text-xl font-bold text-gray-900">2 weeks summer camp, 2027 (Europe or Asia)</span>
              </div>

              {/* Bronze Prize */}
              <div className="flex items-center p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
                <div className="text-7xl mr-6 flex-shrink-0">
                  🥉
                </div>
                <span className="text-xl font-bold text-gray-900">IPAD</span>
              </div>

              {/* Landmark icons placeholders - Made Much Bigger */}
              <div className="flex justify-center space-x-16 mt-16 pt-12 border-t border-gray-200">
                {[
                  { src: "/eiffel_tower.png", alt: "Eiffel Tower", label: "Europe", isImage: true },
                  { src: "/statue_of_liberty.png", alt: "Statue of liberty", label: "USA", isImage: true },
                  { src: "/building.png", alt: "Building", label: "Asia", isImage: true},
                  { src: "/soldier.png", alt: "British Soldier", label: "UK", isImage: true },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="text-center transform hover:scale-110 transition-transform"
                  >
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 flex items-center justify-center bg-white">
                      {item.isImage ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={item.src}
                            alt={item.alt}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <span className="text-7xl md:text-8xl">{item.emoji}</span>
                      )}
                    </div>
                    <p className="text-lg font-semibold text-gray-700">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-4 pb-12">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-600 mb-6">
              CATEGORIES OF PARTICIPANTS
            </h2>
          </div>

          {/* 2x2 Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Row 1, Col 1: ART Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
              <h3 className="text-3xl font-bold text-orange-500 mb-6 md:mb-8">ART</h3>
              <div className="space-y-3 md:space-y-4 text-gray-800">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-lg md:text-xl"><strong>Category I</strong> — 6-9 years</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-lg md:text-xl"><strong>Category II</strong> — 10-13 years</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-lg md:text-xl"><strong>Category III</strong> — 14-17 years</p>
                </div>
              </div>
            </div>

            {/* Row 1, Col 2: Image */}
            <div className="rounded-xl overflow-hidden flex items-center justify-center">
              <div className="relative w-full h-64 md:h-80 lg:h-full">
                <Image
                  src="/image/news/categoriaes_of.png"
                  alt="Categories of Participants"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Row 2, Col 1: Look Ahead Image */}
            <div className="rounded-xl overflow-hidden flex items-center justify-center">
              <div className="relative w-full h-64 md:h-80 lg:h-full">
                <Image
                  src="/image/news/look_head.png"
                  alt="Look Ahead"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Row 2, Col 2: MATH Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
              <h3 className="text-3xl font-bold text-orange-500 mb-6 md:mb-8">MATH</h3>
              <div className="space-y-3 md:space-y-4 text-gray-800">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-lg md:text-xl"><strong>Category I</strong> — Grades 5-6</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-lg md:text-xl"><strong>Category II</strong> — Grades 7-8</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-lg md:text-xl"><strong>Category III</strong> — Grades 9-10</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-lg md:text-xl"><strong>Category IV</strong> — Grades 11-12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
}