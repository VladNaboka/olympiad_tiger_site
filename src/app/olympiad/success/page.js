'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';
import { useLanguage } from '../../../context/LanguageContext';

const T = {
  en: {
    title: 'Thank you! Confirming your payment',
    body: 'An email with your registration code (TIG-...) will arrive within a couple of minutes. Payment is confirmed automatically, so the code may not appear instantly.',
    orderNumber: 'Order number:',
    note: "If the email doesn't arrive within 15 minutes, please check your Spam folder or contact us. Keep the email safe: the registration code is required to take part.",
    backHome: 'Back to Home',
  },
  ru: {
    title: 'Спасибо! Подтверждаем оплату',
    body: 'Письмо с регистрационным кодом (TIG-...) придёт на почту в течение пары минут. Оплата подтверждается автоматически, поэтому код может появиться не сразу.',
    orderNumber: 'Номер заказа:',
    note: 'Если письмо не пришло в течение 15 минут, проверьте папку "Спам" или свяжитесь с нами. Сохраните письмо — регистрационный код понадобится для участия.',
    backHome: 'На главную',
  },
};

function SuccessContent({ lang }) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const t = T[lang];

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">
          {t.title}
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          {t.body}
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 mb-8">
            {t.orderNumber} <span className="font-mono">{orderId}</span>
          </p>
        )}

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8 text-left">
          <p className="text-sm text-gray-600">
            {t.note}
          </p>
        </div>

        <Link
          href="/"
          className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
        >
          {t.backHome}
        </Link>
      </div>
    </div>
  );
}

export default function OlympiadSuccess() {
  const { lang } = useLanguage();

  return (
    <div
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{ backgroundImage: 'url("/image/fonmain1.png")' }}
    >
      <Navbar />
      <Suspense fallback={<div className="flex-1" />}>
        <SuccessContent lang={lang} />
      </Suspense>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
