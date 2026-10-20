'use client';

import { useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import Link from 'next/link';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';
import PaymentBadges from '../../../components/PaymentBadges';
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
    chargedNote: `On the payment page you will be charged in US dollars — ${PARTICIPATION_FEE_USD} USD.`,
    seeOur: 'See our',
    terms: 'Terms',
    privacy: 'Privacy Policy',
    and: 'and',
    refund: 'Refund Policy',
    executorLabel: 'Service provider',
    executorValue: 'Individual Entrepreneur "TIGERS OLYMPIAD" (Republic of Kazakhstan)',
    weAccept: 'We accept',
    cardPaymentHeading: 'How Card Payment Works',
    cardPaymentSteps: [
      'Click "Proceed to Payment" — you will be redirected to the secure payment page of our provider, Freedom Pay.',
      'Enter your Visa or Mastercard details on that page (name, card number, expiry date, CVC).',
      'Confirm the payment via 3-D Secure — a one-time code (SMS/push) sent by your card-issuing bank.',
      'You are redirected back to our site, and a confirmation with your registration code and payment receipt is sent to your email.',
    ],
    cardPaymentNote: 'The website never sees or stores your card number — card data is entered only on the payment provider\'s secure page.',
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
    chargedNote: `На странице оплаты сумма спишется в тенге — ${PARTICIPATION_FEE_KZT.toLocaleString('ru-RU')} ₸.`,
    seeOur: 'Ознакомьтесь с',
    terms: 'Публичной офертой',
    privacy: 'Политикой конфиденциальности',
    and: 'и',
    refund: 'Политикой возврата',
    executorLabel: 'Исполнитель услуги',
    executorValue: 'ИП «TIGERS OLYMPIAD» (Республика Казахстан)',
    weAccept: 'Способы оплаты',
    cardPaymentHeading: 'Порядок оплаты банковской картой',
    cardPaymentSteps: [
      'Нажмите «Перейти к оплате» — вы будете перенаправлены на защищённую страницу оплаты нашего провайдера Freedom Pay.',
      'Введите данные карты Visa или Mastercard (имя владельца, номер карты, срок действия, CVC-код).',
      'Подтвердите платёж через 3-D Secure — одноразовый код (SMS/push), который присылает банк-эмитент вашей карты.',
      'Вы возвращаетесь на наш сайт, а на email приходит подтверждение с регистрационным кодом и чеком об оплате.',
    ],
    cardPaymentNote: 'Сайт не видит и не хранит номер вашей карты — данные карты вводятся только на защищённой странице платёжного провайдера.',
  },
};

const FORM_CONTENT = {
  en: {
    formTitle: 'Olympiad Registration',
    formSubtitle: 'Fill in the participant details. After payment, you will receive an email with your registration code (TIG-...).',
    fullNameLabel: 'Full Name *',
    fullNamePlaceholder: 'John Smith',
    emailLabel: 'Email *',
    emailPlaceholder: 'user@example.com',
    phoneLabel: 'Phone *',
    phonePlaceholder: '+77011234567',
    olympiadLabel: 'Olympiad *',
    mathLabel: '📐 Math',
    artLabel: '🎨 Art',
    agreementPrefix: "I confirm that I am the participant's parent or legal representative, and on behalf of the participant I have read and agree to the",
    termsLink: 'Public Offer',
    privacyLink: 'Privacy Policy',
    and: 'and',
    refundLink: 'Refund Policy',
    agreementSuffix: ", including the processing and publication of the participant's personal data as described therein. *",
    submitLoading: 'Redirecting to payment...',
    submit: 'Proceed to Payment',
    footerNote: 'Payment is processed on the secure FreedomPay page. We do not store or handle your card details.',
    comingSoonTitle: 'Coming Soon',
    comingSoonText: 'Olympiad registration is temporarily unavailable. Please check back later.',
    errors: {
      fullNameRequired: 'Please enter your full name',
      fullNameShort: 'Full name is too short',
      emailRequired: 'Please enter your email',
      emailInvalid: 'Invalid email format',
      phoneRequired: 'Please enter your phone number',
      phoneInvalid: 'Invalid phone format (e.g. +77011234567)',
      olympiadRequired: 'Please choose an olympiad',
      agreementRequired: 'You must accept the Public Offer to continue',
      noRedirectUrl: 'Payment link was not received. Please try again later.',
      submitFailed: 'Failed to submit registration',
    },
  },
  ru: {
    formTitle: 'Регистрация на олимпиаду',
    formSubtitle: 'Укажите данные участника. После оплаты на почту придёт письмо с регистрационным кодом (TIG-...).',
    fullNameLabel: 'ФИО *',
    fullNamePlaceholder: 'Иван Иванов',
    emailLabel: 'Email *',
    emailPlaceholder: 'user@example.com',
    phoneLabel: 'Телефон *',
    phonePlaceholder: '+77011234567',
    olympiadLabel: 'Олимпиада *',
    mathLabel: '📐 Math',
    artLabel: '🎨 Art',
    agreementPrefix: 'Я подтверждаю, что являюсь родителем или законным представителем участника, и от его имени ознакомлен(а) и согласен(на) с',
    termsLink: 'Публичной офертой',
    privacyLink: 'Политикой конфиденциальности',
    and: 'и',
    refundLink: 'Политикой возврата',
    agreementSuffix: ', включая обработку и публикацию персональных данных участника, как описано в этих документах. *',
    submitLoading: 'Переходим к оплате...',
    submit: 'Перейти к оплате',
    footerNote: 'Оплата проходит на защищённой странице FreedomPay. Мы не храним и не обрабатываем данные вашей карты.',
    comingSoonTitle: 'Скоро откроется',
    comingSoonText: 'Регистрация на олимпиаду временно недоступна. Пожалуйста, загляните позже.',
    errors: {
      fullNameRequired: 'Пожалуйста, укажите ФИО',
      fullNameShort: 'ФИО слишком короткое',
      emailRequired: 'Пожалуйста, укажите email',
      emailInvalid: 'Неверный формат email',
      phoneRequired: 'Пожалуйста, укажите номер телефона',
      phoneInvalid: 'Неверный формат телефона (например, +77011234567)',
      olympiadRequired: 'Пожалуйста, выберите олимпиаду',
      agreementRequired: 'Необходимо принять условия Публичной оферты',
      noRedirectUrl: 'Не удалось получить ссылку на оплату. Пожалуйста, попробуйте позже.',
      submitFailed: 'Не удалось отправить регистрацию',
    },
  },
};

function HowItWorks({ lang }) {
  const t = HOW_IT_WORKS_CONTENT[lang];

  return (
    <div className="w-full max-w-3xl mx-auto mb-10">
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
            <div className={`text-2xl font-bold ${lang === 'en' ? 'text-orange-300' : 'text-orange-600'}`}>
              {PARTICIPATION_FEE_KZT.toLocaleString('ru-RU')} ₸
            </div>
            <div className="text-2xl font-bold text-orange-300">/</div>
            <div className={`text-2xl font-bold ${lang === 'en' ? 'text-orange-600' : 'text-orange-300'}`}>
              {PARTICIPATION_FEE_USD} USD
            </div>
          </div>
          <div className="text-xs text-gray-600 mt-1">{t.chargedNote}</div>
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

      <div className="mt-4 bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold text-gray-800 mb-3">{t.cardPaymentHeading}</h3>
        <ol className="space-y-2">
          {t.cardPaymentSteps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-600">
              <span className="shrink-0 w-5 h-5 rounded-full bg-orange-100 text-orange-600 text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className="text-xs text-gray-500 mt-3">{t.cardPaymentNote}</p>
      </div>
    </div>
  );
}

// Чтобы снова скрыть форму регистрации/оплаты олимпиады — поставить false.
const REGISTRATION_ENABLED = false;

// Basic client-side format checks
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Phone: optional + and 10–15 digits (spaces/brackets/dashes are stripped before checking)
const PHONE_RE = /^\+?\d{10,15}$/;

export default function OlympiadRegister() {
  const { lang } = useLanguage();
  const f = FORM_CONTENT[lang];

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
      next.full_name = f.errors.fullNameRequired;
    } else if (fullName.length < 3) {
      next.full_name = f.errors.fullNameShort;
    }

    if (!email) {
      next.email = f.errors.emailRequired;
    } else if (!EMAIL_RE.test(email)) {
      next.email = f.errors.emailInvalid;
    }

    if (!phone) {
      next.phone = f.errors.phoneRequired;
    } else if (!PHONE_RE.test(phone)) {
      next.phone = f.errors.phoneInvalid;
    }

    if (form.olympiad !== 'Math' && form.olympiad !== 'Art') {
      next.olympiad = f.errors.olympiadRequired;
    }

    if (!agreedToTerms) {
      next.agreedToTerms = f.errors.agreementRequired;
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
        language: lang,
      });

      if (!redirect_url) {
        throw new Error(f.errors.noRedirectUrl);
      }

      // Redirect to the FreedomPay payment page
      window.location.href = redirect_url;
    } catch (err) {
      setServerError(err.message || f.errors.submitFailed);
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
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-600 mb-6">
              {f.comingSoonTitle}
            </h1>
            <p className="text-lg text-gray-600">
              {f.comingSoonText}
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
        <HowItWorks lang={lang} />

        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2 text-center">
            {f.formTitle}
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            {f.formSubtitle}
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
                  {f.fullNameLabel}
                </label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={handleChange('full_name')}
                  className={inputClass('full_name')}
                  placeholder={f.fullNamePlaceholder}
                  disabled={loading}
                />
                {errors.full_name && (
                  <p className="text-red-600 text-sm mt-1">{errors.full_name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {f.emailLabel}
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  className={inputClass('email')}
                  placeholder={f.emailPlaceholder}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {f.phoneLabel}
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  className={inputClass('phone')}
                  placeholder={f.phonePlaceholder}
                  disabled={loading}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Olympiad */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {f.olympiadLabel}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'Math', label: f.mathLabel },
                    { value: 'Art', label: f.artLabel },
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
                    {f.agreementPrefix}{' '}
                    <Link href="/terms" target="_blank" className="text-orange-600 underline">
                      {f.termsLink}
                    </Link>
                    ,{' '}
                    <Link href="/privacy" target="_blank" className="text-orange-600 underline">
                      {f.privacyLink}
                    </Link>{' '}
                    {f.and}{' '}
                    <Link href="/refund" target="_blank" className="text-orange-600 underline">
                      {f.refundLink}
                    </Link>
                    {f.agreementSuffix}
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
                  {f.submitLoading}
                </>
              ) : (
                f.submit
              )}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              {f.footerNote}
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
