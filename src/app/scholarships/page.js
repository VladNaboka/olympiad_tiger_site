'use client';

import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';

// Gifts/Prizes data
const gifts = [
  {
    id: 1,
    companyName: "Wycombe Abbey International",
    giftName: "Complimentary Summer Camp 2027",
    description: "Every Child Can Excel",
    sellingPhrase: "",
    website: "http://www.wycombeabbeyasia.com",
    companyLogo: "/image/mycome_logo.png",
    carousel: [
      "/image/scholarships/wycome_1.jpg",
      "/image/scholarships/wycome_2.jpg",
      "/image/scholarships/wycome_3.jpg",
      "/image/scholarships/wycome_4.jpg",
      "/image/scholarships/wycome_5.jpg"
    ]
  },
];

export default function Gifts() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fffbf2]">
      <Navbar />

      {/* Gifts Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gifts.map((gift) => (
            <GiftCard key={gift.id} gift={gift} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Placeholder image component
function ImagePlaceholder() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-150 to-gray-200 flex flex-col items-center justify-center">
      <svg
        className="w-24 h-24 text-gray-400 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <p className="text-gray-500 text-center text-lg font-semibold">
        Image coming soon
      </p>
    </div>
  );
}

// GiftCard Component
function GiftCard({ gift }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? gift.carousel.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === gift.carousel.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Header with company name and gift name */}
      <div className="p-6 border-b border-gray-200">
        <p className="text-lg font-bold text-black mb-2">
          {gift.companyName}
        </p> 
        <h3 className="text-lg font-bold mb-2" style={{ color: '#f97316' }}>
          {gift.giftName}
        </h3>
        <p className="text-lg font-bold text-black">
          {gift.description}
        </p>
      </div>

      {/* Carousel */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <div className="w-full h-full flex items-center justify-center">
          {!imageLoaded && <ImagePlaceholder />}
          <img
            src={gift.carousel[currentImageIndex]}
            alt={`${gift.giftName} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all duration-200 z-10"
          aria-label="Previous image"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2 transition-all duration-200 z-10"
          aria-label="Next image"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {gift.carousel.length}
        </div>
      </div>

      {/* Footer with selling phrase and website */}
      <div className="p-6 bg-gray-50">
        <p className="text-sm text-gray-600 mb-4">
          <strong>{gift.sellingPhrase}</strong>
        </p>
        {gift.website !== "#" && (
          <Link
            href={gift.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-orange-500 hover:text-orange-600 font-semibold transition-colors"
          >
            Visit Website →
          </Link>
        )}
      </div>
    </div>
  );
}
