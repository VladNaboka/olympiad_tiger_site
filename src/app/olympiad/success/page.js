'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  return (
    <div className="flex-1 flex items-center justify-center py-24 md:py-32 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">
          Thank you! Confirming your payment
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          An email with your registration code (TIG-...) will arrive within a
          couple of minutes. Payment is confirmed automatically, so the code may
          not appear instantly.
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 mb-8">
            Order number: <span className="font-mono">{orderId}</span>
          </p>
        )}

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8 text-left">
          <p className="text-sm text-gray-600">
            If the email doesn't arrive within 15 minutes, please check your Spam
            folder or contact us. Keep the email safe: the registration code is
            required to take part.
          </p>
        </div>

        <Link
          href="/"
          className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function OlympiadSuccess() {
  return (
    <div
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{ backgroundImage: 'url("/image/fonmain1.png")' }}
    >
      <Navbar />
      <Suspense fallback={<div className="flex-1" />}>
        <SuccessContent />
      </Suspense>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
