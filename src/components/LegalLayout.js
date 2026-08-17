'use client';

import Navbar from './navbar';
import Footer from './footer';

export default function LegalLayout({ title, updated, langToggle, children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fffbf2]">
      <Navbar />

      <div className="flex-1 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-3xl bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-orange-600">{title}</h1>
            {langToggle}
          </div>
          {updated && (
            <p className="text-sm text-gray-500 mb-8">{updated}</p>
          )}
          <div className="prose prose-orange max-w-none text-gray-800 space-y-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-orange-700 [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:leading-relaxed [&_li]:leading-relaxed">
            {children}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
