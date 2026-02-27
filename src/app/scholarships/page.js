'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  {
    id: 2,
    companyName: "EDUEXPLORA",
    giftName: "Complimentary Summer Camp 2027",
    description: "Explore Your Potential at Top Universities",
    sellingPhrase: "",
    website: "https://www.eduexplora.com/",
    companyLogo: "/image/mycome_logo.png",
    carousel: [
      "/image/scholarships/eduexplora_2-1.jpg",
      "/image/scholarships/eduexplora_1-1.jpg",
      "/image/scholarships/eduexplora_3-1.jpg",
      "/image/scholarships/eduexplora_0-1.jpg",
      "/image/scholarships/eduexplora_4.png"
    ]
  },
  {
    id: 3,
    companyName: "William Academy",
    giftName: "Complimentary Summer Camp 2027",
    description: "Summer Camps in Toronto — Best Affordable & Highly Rated for International Students",
    sellingPhrase: "",
    website: "https://williamacademy.ca",
    companyLogo: "/image/william-academy-logo.png",
    carousel: [
      "/image/scholarships/william_1.jpg",
      "/image/scholarships/william_2.jpg",
      "/image/scholarships/william_3.jpg"
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

// GiftCard Component
function GiftCard({ gift }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    if (isPaused || gift.carousel.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === gift.carousel.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, gift.carousel.length]);

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? gift.carousel.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === gift.carousel.length - 1 ? 0 : prevIndex + 1
      );
      setIsTransitioning(false);
    }, 300);
  };

  // 3D Tilt effect handlers
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPaused(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-white rounded-lg overflow-hidden"
      style={{
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Header with company name and gift name */}
      <div className="p-6 border-b border-gray-200">
        <p className="text-lg font-bold text-black mb-2">
          {gift.companyName}
        </p>
        <h3 className="text-lg font-bold mb-2 gift-name-orange">
          {gift.giftName}
        </h3>
        <p className="text-lg text-black">
          {gift.description}
        </p>
      </div>

      {/* Carousel */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={gift.carousel[currentImageIndex]}
          alt={`${gift.giftName} - Image ${currentImageIndex + 1}`}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
          loading="eager"
        />

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
