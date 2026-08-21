'use client';

import React, { useState } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Link from 'next/link';
import { apiRequest } from '../api/base_api';
import scholarships from '../../data/scholarships.json';
import LangToggle from '../../components/LangToggle';

const ITEMS_PER_PAGE = 16;

// Переводы кратких описаний партнёров из scholarships.json (companyName оставляем как есть — это бренды)
const DESCRIPTION_RU = {
  'Every Child Can Excel': 'Каждый ребёнок может преуспеть',
  'Explore Your Potential at Top Universities': 'Раскройте свой потенциал в ведущих университетах',
  'Summer Camps in Toronto': 'Летние лагеря в Торонто',
};

const T = {
  en: {
    prev: '← Prev', next: 'Next →',
    applyNow: 'Apply Now',
    firstName: 'First Name', lastName: 'Last Name', phone: 'Phone Number', email: 'Email',
    olympiadParticipant: 'Olympiad participant',
    selectError: 'Please select Math or Art.',
    genericError: 'Something went wrong. Please try again.',
    sending: 'Sending...', submit: 'Submit',
    thankYou: 'Thank you!', willContact: 'We will contact you soon.', close: 'Close',
    visitWebsite: 'Visit Website →', comingSoon: 'Coming Soon',
  },
  ru: {
    prev: '← Назад', next: 'Далее →',
    applyNow: 'Подать заявку',
    firstName: 'Имя', lastName: 'Фамилия', phone: 'Номер телефона', email: 'Email',
    olympiadParticipant: 'Участник олимпиады',
    selectError: 'Пожалуйста, выберите Math или Art.',
    genericError: 'Что-то пошло не так. Попробуйте ещё раз.',
    sending: 'Отправка...', submit: 'Отправить',
    thankYou: 'Спасибо!', willContact: 'Мы скоро свяжемся с вами.', close: 'Закрыть',
    visitWebsite: 'Перейти на сайт →', comingSoon: 'Скоро',
  },
};

const sortKey = (name) => name.replace(/^(the|a|an)\s+/i, '');

const gifts = [...scholarships].sort((a, b) =>
  sortKey(a.companyName).localeCompare(sortKey(b.companyName), 'en', { sensitivity: 'base', numeric: true })
);


export default function Scholarships() {
  const [lang, setLang] = useState('en');
  const t = T[lang];
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
      setError(t.selectError);
      return;
    }
    setError('');
    setSending(true);
    try {
      await apiRequest('/claim-award', 'POST', formData);
      setSubmitted(true);
    } catch (err) {
      setError(t.genericError);
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
      <Navbar lang={lang} />

      <div className="flex justify-center pt-8">
        <LangToggle lang={lang} setLang={setLang} />
      </div>

      {/* Cards Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {currentGifts.map((gift) => (
            <GiftCard key={gift.id} gift={gift} t={t} lang={lang} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="px-6 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {t.prev}
          </button>
          <span className="text-gray-700 font-medium">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="px-6 py-2 rounded-full bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {t.next}
          </button>
        </div>
      </section>

      {/* CLAIM AWARD Button */}
      <div className="text-center pb-16">
        <button
          onClick={() => setShowForm(true)}
          className="bg-orange-500 text-white py-4 px-16 rounded-full text-2xl font-bold hover:bg-orange-600 transition-colors shadow-lg"
        >
          {t.applyNow}
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-md flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            {!submitted ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{t.applyNow}</h2>
                  <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder={t.firstName}
                    required
                    value={formData.firstName}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder={t.lastName}
                    required
                    value={formData.lastName}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t.phone}
                    required
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={t.email}
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
                      <span>{formData.olympiad === '' ? t.olympiadParticipant : formData.olympiad}</span>
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
                    {sending ? t.sending : t.submit}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.thankYou}</h2>
                <p className="text-gray-600 mb-6">{t.willContact}</p>
                <button
                  onClick={closeForm}
                  className="bg-orange-500 text-white py-3 px-8 rounded-full font-bold hover:bg-orange-600 transition-colors"
                >
                  {t.close}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer lang={lang} />
    </div>
  );
}

function initials(name) {
  return name
    .replace(/^The\s+/i, '')
    .split(/\s+/)
    .filter(w => /[a-z0-9]/i.test(w))
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('');
}

function GiftCard({ gift, t, lang }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = gift.carousel.length > 0 && !imageFailed;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {showImage ? (
          <img
            src={gift.carousel[0]}
            alt={gift.companyName}
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
            <span className="text-3xl md:text-4xl font-bold text-orange-500/70 tracking-wide">
              {initials(gift.companyName)}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="font-bold text-sm text-gray-900 line-clamp-2">{gift.companyName}</p>
        {gift.description && (
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {lang === 'ru' ? (DESCRIPTION_RU[gift.description] || gift.description) : gift.description}
          </p>
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
            {t.visitWebsite}
          </Link>
        ) : (
          <span className="inline-block text-gray-400 font-semibold">
            {t.comingSoon}
          </span>
        )}
      </div>
    </div>
  );
}
