'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../../components/navbar';
import Footer from '../../../components/footer';

function FailureContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  return (
    <div className="flex-1 flex items-center justify-center py-24 md:py-32 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
          Payment failed
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          The payment was not completed or was declined. You have not been
          charged. You can try submitting your registration again.
        </p>

        {orderId && (
          <p className="text-sm text-gray-500 mb-8">
            Order number: <span className="font-mono">{orderId}</span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/olympiad/register"
            className="inline-block bg-orange-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="inline-block bg-gray-500 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-600 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OlympiadFailure() {
  return (
    <div
      className="min-h-screen flex flex-col bg-[#fffbf2] relative"
      style={{ backgroundImage: 'url("/image/fonmain1.png")' }}
    >
      <Navbar />
      <Suspense fallback={<div className="flex-1" />}>
        <FailureContent />
      </Suspense>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
