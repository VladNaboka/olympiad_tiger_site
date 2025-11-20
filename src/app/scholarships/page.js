'use client';

import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';

// Gifts/Prizes data
const gifts = [
  {
    id: 1,
    companyName: "Company Name 1",
    giftName: "Gift Prize 1",
    description: "A carousel made of 5 photos in PNG format",
    sellingPhrase: "They provide",
    website: "#",
    companyLogo: "/image/gift-placeholder-1.png",
    carousel: [
      "/image/gift-1-1.png",
      "/image/gift-1-2.png",
      "/image/gift-1-3.png",
      "/image/gift-1-4.png",
      "/image/gift-1-5.png"
    ]
  },
  {
    id: 2,
    companyName: "Company Name 2",
    giftName: "Gift Prize 2",
    description: "A carousel made of 5 photos in PNG format",
    sellingPhrase: "They provide",
    website: "#",
    companyLogo: "/image/gift-placeholder-2.png",
    carousel: [
      "/image/gift-2-1.png",
      "/image/gift-2-2.png",
      "/image/gift-2-3.png",
      "/image/gift-2-4.png",
      "/image/gift-2-5.png"
    ]
  },
  {
    id: 3,
    companyName: "Company Name 3",
    giftName: "Gift Prize 3",
    description: "A carousel made of 5 photos in PNG format",
    sellingPhrase: "They provide",
    website: "#",
    companyLogo: "/image/gift-placeholder-3.png",
    carousel: [
      "/image/gift-3-1.png",
      "/image/gift-3-2.png",
      "/image/gift-3-3.png",
      "/image/gift-3-4.png",
      "/image/gift-3-5.png"
    ]
  },
  {
    id: 4,
    companyName: "Company Name 4",
    giftName: "Gift Prize 4",
    description: "A carousel made of 5 photos in PNG format",
    sellingPhrase: "They provide",
    website: "#",
    companyLogo: "/image/gift-placeholder-4.png",
    carousel: [
      "/image/gift-4-1.png",
      "/image/gift-4-2.png",
      "/image/gift-4-3.png",
      "/image/gift-4-4.png",
      "/image/gift-4-5.png"
    ]
  },
  {
    id: 5,
    companyName: "Company Name 5",
    giftName: "Gift Prize 5",
    description: "A carousel made of 5 photos in PNG format",
    sellingPhrase: "They provide",
    website: "#",
    companyLogo: "/image/gift-placeholder-5.png",
    carousel: [
      "/image/gift-5-1.png",
      "/image/gift-5-2.png",
      "/image/gift-5-3.png",
      "/image/gift-5-4.png",
      "/image/gift-5-5.png"
    ]
  },
  {
    id: 6,
    companyName: "Company Name 6",
    giftName: "Gift Prize 6",
    description: "A carousel made of 5 photos in PNG format",
    sellingPhrase: "They provide",
    website: "#",
    companyLogo: "/image/gift-placeholder-6.png",
    carousel: [
      "/image/gift-6-1.png",
      "/image/gift-6-2.png",
      "/image/gift-6-3.png",
      "/image/gift-6-4.png",
      "/image/gift-6-5.png"
    ]
  }
];

export default function Gifts() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fffbf2]">
      <Navbar />

      {/* Header Section */}
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-bold mb-4 text-black">
          Prizes & <span className="text-orange-500">Gifts</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl">
          Our amazing partners provide wonderful gifts and prizes for our participants. 
          Discover the incredible opportunities and rewards awaiting our winners.
        </p>
      </section>

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
        <p className="text-sm text-gray-600 mb-2">
          {gift.companyName}
        </p>
        <h3 className="text-2xl font-bold text-black mb-2">
          {gift.giftName}
        </h3>
        <p className="text-sm text-gray-600">
          {gift.description}
        </p>
      </div>

      {/* Carousel */}
      <div className="relative aspect-square overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <ImagePlaceholder />
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
