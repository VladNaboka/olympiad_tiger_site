'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';
import LangToggle from '../../../components/LangToggle';

const T = {
  en: {
    title: 'Payment failed',
    body: 'The payment was not completed or was declined. You have not been charged. You can try submitting your registration again.',
    orderNumber: 'Order number:',
    tryAgain: 'Try Again',
    backHome: 'Back to Home',
  },
  ru: {
    title: 'Оплата не прошла',
    body: 'Платёж не завершён или был отклонён. Списание средств не производилось. Вы можете попробовать зарегистрироваться ещё раз.',
    orderNumber: 'Номер заказа:',
    tryAgain: 'Попробовать снова',
    backHome: 'На главную',
  },
};

function FailureContent({ lang }) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const t = T[lang];

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
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

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/olympiad/register"
            className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            {t.tryAgain}
          </Link>
          <Link
            href="/"
            className="inline-block bg-gray-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            {t.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OlympiadFailure() {
  const [lang, setLang] = useState('en');

  return (
    <div
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{ backgroundImage: 'url("/image/fonmain1.png")' }}
    >
      <Navbar lang={lang} />
      <div className="flex justify-center pt-8">
        <LangToggle lang={lang} setLang={setLang} />
      </div>
      <Suspense fallback={<div className="flex-1" />}>
        <FailureContent lang={lang} />
      </Suspense>
      <div className="mt-auto">
        <Footer lang={lang} />
      </div>
    </div>
  );
}
