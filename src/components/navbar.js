'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-orange-600 text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <Link href="/" className="hover:text-pink-300 transition-colors font-medium">
            Home
          </Link>
          <Link href="/rules" className="hover:text-pink-300 transition-colors font-medium">
            Rules
          </Link>
          <Link href="/register" className="hover:text-pink-300 transition-colors font-medium">
            Registration
          </Link>
          <Link href="/gallery" className="hover:text-pink-300 transition-colors font-medium">
            Gallery
          </Link>
          <Link href="/faq" className="hover:text-pink-300 transition-colors font-medium">
            FAQ
          </Link>
          <Link href="/tasks" className="hover:text-pink-300 transition-colors font-medium">
            Tasks
          </Link>
          <Link href="/representatives" className="hover:text-pink-300 transition-colors font-medium">
            Representatives
          </Link>
          <Link href="/contacts" className="hover:text-pink-300 transition-colors font-medium">
            Contacts
          </Link>
        </div>
      </div>
    </nav>
  );
}