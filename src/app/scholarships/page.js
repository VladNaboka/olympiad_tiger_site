'use client';

import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';
import { apiRequest } from '../api/base_api';

const ITEMS_PER_PAGE = 16;

const placeholderCarousel = [
  "/image/scholarships/wycome_1.jpg",
];

const gifts = [
  {
    id: 1,
    companyName: "Wycombe Abbey International",
    description: "Every Child Can Excel",
    website: "http://www.wycombeabbeyasia.com",
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
    description: "Explore Your Potential at Top Universities",
    website: "https://www.eduexplora.com/",
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
    description: "Summer Camps in Toronto",
    website: "https://williamacademy.ca",
    carousel: [
      "/image/scholarships/william_1.jpg",
      "/image/scholarships/william_2.jpg",
      "/image/scholarships/william_3.jpg"
    ]
  },
  ...Array.from({ length: 37 }, (_, i) => ({
    id: i + 4,
    companyName: "School Name",
    description: "",
    website: "#",
    carousel: placeholderCarousel
  }))
];

export default function Scholarships() {
  const [currentPage, setCurrentPage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    olympiad: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const totalPages = Math.ceil(gifts.length / ITEMS_PER_PAGE);
  const currentGifts = gifts.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.olympiad) {
      setError('Please select Math or Art.');
      return;
    }
    setError('');
    setSending(true);
    try {
      await apiRequest('/claim-award', 'POST', formData);
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setSubmitted(false);
    setError('');
    setDropdownOpen(false);
    setFormData({ firstName: '', lastName: '', phone: '', email: '', olympiad: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffbf2]">
      <Navbar />

      {/* Cards Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {currentGifts.map((gift) => (
            <GiftCard key={gift.id} gift={gift} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="px-6 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Prev
          </button>
          <span className="text-gray-700 font-medium">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="px-6 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      </section>

      {/* CLAIM AWARD Button */}
      <div className="text-center pb-16">
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 text-white py-4 px-16 rounded-full text-2xl font-bold hover:bg-orange-600 transition-colors shadow-lg"
        >
          Apply Now
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            {!submitted ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Apply Now</h2>
                  <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`w-full text-left border border-gray-300 rounded-lg px-4 py-3 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-orange-400 ${formData.olympiad === '' ? 'text-gray-400' : 'text-gray-900'}`}
                    >
                      <span>{formData.olympiad === '' ? 'Olympiad participant' : formData.olympiad}</span>
                      <svg className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                        {['Math', 'Art'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, olympiad: opt });
                              setDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-orange-50 text-gray-900 transition-colors"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? 'Sending...' : 'Submit'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h2>
                <p className="text-gray-600 mb-6">We will contact you soon.</p>
                <button
                  onClick={closeForm}
                  className="bg-orange-500 text-white py-3 px-8 rounded-full font-bold hover:bg-orange-600 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function GiftCard({ gift }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={gift.carousel[0]}
          alt={gift.companyName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="font-bold text-sm text-gray-900 truncate">{gift.companyName}</p>
        {gift.description && (
          <p className="text-xs text-gray-500 truncate mt-0.5">{gift.description}</p>
        )}
      </div>

      {/* Website link */}
      <div className="px-3 pb-3">
        {gift.website !== "#" ? (
          <Link
            href={gift.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-orange-500 hover:text-orange-600 font-semibold transition-colors"
          >
            Visit Website →
          </Link>
        ) : (
          <span className="inline-block text-gray-400 font-semibold">
            Coming Soon
          </span>
        )}
      </div>
    </div>
  );
}
