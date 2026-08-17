'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';
import PaymentBadges from '../../../components/PaymentBadges';
import LangToggle from '../../../components/LangToggle';
import { registerOlympiad } from '../../api/olympiad_api';

const PARTICIPATION_FEE_USD = 20;
const PARTICIPATION_FEE_KZT = 10000;

const HOW_IT_WORKS_CONTENT = {
  en: {
    heading: 'How Registration Works',
    subheading: 'There is no personal account — everything happens in one flow, and your confirmation arrives by email.',
    steps: [
      { title: 'Register & Choose an Olympiad', description: 'Fill in the participant’s name, email, and phone number, and select Math or Art as the olympiad category — all in one form.' },
      { title: 'Pay Online', description: `Pay the ${PARTICIPATION_FEE_KZT.toLocaleString('ru-RU')} KZT registration fee securely via our payment provider.` },
      { title: 'Get Confirmation', description: 'Receive an email confirmation with your registration code and payment receipt.' },
    ],
    feeLabel: 'Participation fee',
    seeOur: 'See our',
    terms: 'Terms',
    privacy: 'Privacy Policy',
    and: 'and',
    refund: 'Refund Policy',
    executorLabel: 'Service provider',
    executorValue: 'LLP "WILLIAM ACADEMY" (Republic of Kazakhstan)',
    weAccept: 'We accept',
  },
  ru: {
    heading: 'Как проходит регистрация',
    subheading: 'Личного кабинета нет — всё происходит в один этап, а подтверждение приходит на email.',
    steps: [
      { title: 'Регистрация и выбор олимпиады', description: 'Укажите имя участника, email и номер телефона, выберите категорию — Math или Art — всё в одной форме.' },
      { title: 'Оплата онлайн', description: `Оплатите организационный взнос ${PARTICIPATION_FEE_KZT.toLocaleString('ru-RU')} ₸ через нашего платежного провайдера.` },
      { title: 'Подтверждение', description: 'Получите на email подтверждение регистрации с регистрационным кодом и чеком об оплате.' },
    ],
    feeLabel: 'Организационный взнос',
    seeOur: 'Ознакомьтесь с',
    terms: 'Публичной офертой',
    privacy: 'Политикой конфиденциальности',
    and: 'и',
    refund: 'Политикой возврата',
    executorLabel: 'Исполнитель услуги',
    executorValue: 'ТОО «WILLIAM ACADEMY» (Республика Казахстан)',
    weAccept: 'Способы оплаты',
  },
};

function HowItWorks() {
  const [lang, setLang] = useState('en');
  const t = HOW_IT_WORKS_CONTENT[lang];

  return (
    <div className="w-full max-w-3xl mx-auto mb-10">
      <div className="flex justify-center mb-2">
        <LangToggle lang={lang} setLang={setLang} />
      </div>
      <h2 className="text-2xl font-bold text-orange-600 mb-2 text-center">{t.heading}</h2>
      <p className="text-gray-600 mb-6 text-center">{t.subheading}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {t.steps.map((step, i) => (
          <div key={step.title} className="bg-white rounded-xl shadow p-4 text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">{i + 1}</div>
            <div className="font-semibold text-gray-800 mb-1">{step.title}</div>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm text-gray-500">{t.feeLabel}</div>
          <div className="flex items-baseline gap-2 flex-wrap">
            <div className="text-2xl font-bold text-orange-600">
              {PARTICIPATION_FEE_KZT.toLocaleString('ru-RU')} ₸
            </div>
            <div className="text-2xl font-bold text-orange-600">/</div>
            <div className="text-2xl font-bold text-orange-600">
              {PARTICIPATION_FEE_USD} USD
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {t.executorLabel}: {t.executorValue}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {t.seeOur}{' '}
            <Link href="/terms" className="underline hover:text-orange-600">{t.terms}</Link>,{' '}
            <Link href="/privacy" className="underline hover:text-orange-600">{t.privacy}</Link>{' '}
            {t.and}{' '}
            <Link href="/refund" className="underline hover:text-orange-600">{t.refund}</Link>.
          </p>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-2 text-center sm:text-right">{t.weAccept}</div>
          <PaymentBadges />
        </div>
      </div>
    </div>
  );
}

// Чтобы снова скрыть форму регистрации/оплаты олимпиады — поставить false.
const REGISTRATION_ENABLED = true;

// Basic client-side format checks
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Phone: optional + and 10–15 digits (spaces/brackets/dashes are stripped before checking)
const PHONE_RE = /^\+?\d{10,15}$/;

export default function OlympiadRegister() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    olympiad: 'Math',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setServerError('');
  };

  const validate = () => {
    const next = {};
    const fullName = form.full_name.trim();
    const email = form.email.trim();
    const phone = form.phone.replace(/[\s()-]/g, '');

    if (!fullName) {
      next.full_name = 'Please enter your full name';
    } else if (fullName.length < 3) {
      next.full_name = 'Full name is too short';
    }

    if (!email) {
      next.email = 'Please enter your email';
    } else if (!EMAIL_RE.test(email)) {
      next.email = 'Invalid email format';
    }

    if (!phone) {
      next.phone = 'Please enter your phone number';
    } else if (!PHONE_RE.test(phone)) {
      next.phone = 'Invalid phone format (e.g. +77011234567)';
    }

    if (form.olympiad !== 'Math' && form.olympiad !== 'Art') {
      next.olympiad = 'Please choose an olympiad';
    }

    if (!agreedToTerms) {
      next.agreedToTerms = 'You must accept the Public Offer to continue';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    if (!validate()) return;

    setLoading(true);
    try {
      const { redirect_url } = await registerOlympiad({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        phone: form.phone.replace(/[\s()-]/g, ''),
        olympiad: form.olympiad,
      });

      if (!redirect_url) {
        throw new Error('Payment link was not received. Please try again later.');
      }

      // Redirect to the FreedomPay payment page
      window.location.href = redirect_url;
    } catch (err) {
      setServerError(err.message || 'Failed to submit registration');
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-500 ${
      errors[field] ? 'border-red-400' : 'border-gray-300'
    }`;

  // Пока регистрация выключена — показываем заглушку вместо формы и оплаты.
  if (!REGISTRATION_ENABLED) {
    return (
      <div
        className="min-h-screen flex flex-col bg-[#fffbf2] relative"
        style={{ backgroundImage: 'url("/image/fonmain1.png")' }}
      >
        <Navbar />

        <div className="flex-1 flex flex-col items-center justify-center py-24 md:py-32 px-4">
          <HowItWorks />

          <div className="text-center max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-6">
              Coming Soon
            </h1>
            <p className="text-lg text-gray-600">
              Olympiad registration is temporarily unavailable. Please check back later.
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{ backgroundImage: 'url("/image/fonmain1.png")' }}
    >
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center py-24 md:py-32 px-4">
        <HowItWorks />

        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2 text-center">
            Olympiad Registration
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Fill in the participant details. After payment, you will receive an
            email with your registration code (TIG-...).
          </p>

          {serverError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">
              {/* Full name */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={handleChange('full_name')}
                  className={inputClass('full_name')}
                  placeholder="John Smith"
                  disabled={loading}
                />
                {errors.full_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.full_name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  className={inputClass('email')}
                  placeholder="user@example.com"
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  className={inputClass('phone')}
                  placeholder="+77011234567"
                  disabled={loading}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Olympiad */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Olympiad *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'Math', label: '📐 Math' },
                    { value: 'Art', label: '🎨 Art' },
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      onClick={() =>
                        setForm((prev) => ({ ...prev, olympiad: opt.value }))
                      }
                      disabled={loading}
                      className={`py-3 px-4 rounded-lg border-2 font-semibold transition-colors ${
                        form.olympiad === opt.value
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 text-gray-700 hover:border-orange-300'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {errors.olympiad && (
                  <p className="text-red-600 text-sm mt-1">{errors.olympiad}</p>
                )}
              </div>

              {/* Offer agreement */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      setErrors((prev) => ({ ...prev, agreedToTerms: undefined }));
                    }}
                    disabled={loading}
                    className="mt-1 h-4 w-4 accent-orange-500"
                  />
                  <span className="text-sm text-gray-700">
                    I confirm that I am the participant&apos;s parent or legal
                    representative, and on behalf of the participant I have read and
                    agree to the{' '}
                    <Link href="/terms" target="_blank" className="text-orange-600 underline">
                      Public Offer
                    </Link>
                    ,{' '}
                    <Link href="/privacy" target="_blank" className="text-orange-600 underline">
                      Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link href="/refund" target="_blank" className="text-orange-600 underline">
                      Refund Policy
                    </Link>
                    , including the processing and publication of the participant&apos;s
                    personal data as described therein. *
                  </span>
                </label>
                {errors.agreedToTerms && (
                  <p className="text-red-600 text-sm mt-1">{errors.agreedToTerms}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !agreedToTerms}
              className="w-full mt-8 bg-orange-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Redirecting to payment...
                </>
              ) : (
                'Proceed to Payment'
              )}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Payment is processed on the secure FreedomPay page. We do not store
              or handle your card details.
            </p>
          </form>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
