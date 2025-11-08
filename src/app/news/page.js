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
                  <p className="text-lg text-gray-800">first intake - December 8, 2025</p>
                  <p className="text-lg text-gray-800">second intake - February 9, 2026</p>
                </div>
              </div>

              {/* STEM Section */}
              <div>
                <h3 className="text-3xl font-bold text-black mb-4 underline decoration-2">STEM</h3>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-black">Registration Deadline</p>
                  <p className="text-lg text-gray-800">March 1, 2026</p>
                </div>
              </div>

              {/* Art Section */}
              <div>
                <h3 className="text-3xl font-bold text-black mb-4 underline decoration-2">ART</h3>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-black">Registration Deadline</p>
                  <p className="text-lg text-gray-800">April 1, 2026</p>
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
              <div className="relative h-20 md:h-24 w-full mb-4 md:mb-6">
                <Image
                  src="/image/news/mycombe_logo.png"
                  alt="Wycombe Abbey International"
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">WYCOMBE ABBEY INTERNATIONAL</h4>
              <a href="http://www.wycombeabbey.com" className="text-purple-600 underline hover:text-purple-800 text-base md:text-lg">
                www.wycombeabbey.com
              </a>
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
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">ART final in Great Britain</h3>
              <div className="relative h-20 md:h-24 w-full mb-4 md:mb-6">
                <Image
                  src="/image/news/qe_logo.jpeg"
                  alt="Queen Ethelburga's"
                  fill
                  className="object-contain"
                />
              </div>
              <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">Queen Ethelburga's</h4>
              <a href="http://www.qe.org" className="text-purple-600 underline hover:text-purple-800 text-base md:text-lg">
                www.qe.org
              </a>
              <p className="text-sm md:text-base text-gray-600 mt-2">download the brochure</p>
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

      {/* STEM competition USA Section */}
      <div className="px-4 pb-12">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-600 mb-6">
              STEM COMPETITION USA
            </h2>
          </div>

          {/* 2x2 Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Row 1, Col 1: STEM Text */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">LASELL UNIVERSITY</h3>
              <div className="relative h-20 md:h-24 w-full mb-4 md:mb-6">
                <Image
                  src="/image/news/lasell_logo.png"
                  alt="LASELL UNIVERSITY"
                  fill
                  className="object-contain"
                />
              </div>
              <a href="http://www.lasell.edu" className="text-purple-600 underline hover:text-purple-800 text-base md:text-lg">
                www.lasell.edu
              </a>
              <a
                href="/files_download/STEM 2026.pdf"
                download
                className="text-sm md:text-base text-gray-600 mt-2 hover:text-purple-600 cursor-pointer underline block"
              >
                download the brochure
              </a>
            </div>

            {/* Row 1, Col 2: Prize */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="text-7xl md:text-8xl">💰</div>
                <div className="text-center">
                  <h3 className="text-3xl md:text-5xl font-bold text-green-600 mb-2">PRIZE</h3>
                  <h3 className="text-3xl md:text-5xl font-bold text-green-600">5000$</h3>
                </div>
                <div className="text-7xl md:text-8xl">💰</div>
              </div>
            </div>

            {/* Row 2, Col 1: Look Ahead Image */}
            <div className="rounded-xl overflow-hidden flex items-center justify-center">
              <div className="relative w-full h-64 md:h-80 lg:h-full">
                <Image
                  src="/image/news/tiger_stem.png"
                  alt="Look Ahead"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Row 2, Col 2: MATH Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
              <h3 className="text-3xl font-bold text-orange-500 mb-6 md:mb-8">CATEGORIES</h3>
              <div className="space-y-3 md:space-y-4 text-gray-800">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-lg md:text-xl"><strong>Category I</strong> — Grades 5-8</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <p className="text-lg md:text-xl"><strong>Category II</strong> — Grades 9-12</p>
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