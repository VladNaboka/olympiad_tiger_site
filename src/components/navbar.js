'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#fffbf2] text-gray-800 py-4 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/image/logonavbar.png" 
                alt="Tigers Logo" 
                width={120} 
                height={50} 
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-orange-500 transition-colors font-medium">
              Home
            </Link>
            <Link href="/rules" className="hover:text-orange-500 transition-colors font-medium">
              Rules
            </Link>
            <Link href="/register" className="hover:text-orange-500 transition-colors font-medium">
              Registration
            </Link>
            <Link href="/gallery" className="hover:text-orange-500 transition-colors font-medium">
              Gallery
            </Link>
            <Link href="/faq" className="hover:text-orange-500 transition-colors font-medium">
              FAQ
            </Link>
            <Link href="/tasks" className="hover:text-orange-500 transition-colors font-medium">
              Tasks
            </Link>
            <Link href="/representatives" className="hover:text-orange-500 transition-colors font-medium">
              Representatives
            </Link>
            <Link href="/contacts" className="hover:text-orange-500 transition-colors font-medium">
              Contacts
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden px-2 pt-2 pb-4 bg-[#fffbf2]">
          <div className="flex flex-col space-y-2">
            <Link 
              href="/" 
              className="px-3 py-2 rounded hover:bg-gray-100 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/rules" 
              className="px-3 py-2 rounded hover:bg-gray-100 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rules
            </Link>
            <Link 
              href="/register" 
              className="px-3 py-2 rounded hover:bg-gray-100 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Registration
            </Link>
            <Link 
              href="/gallery" 
              className="px-3 py-2 rounded hover:bg-gray-100 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link 
              href="/faq" 
              className="px-3 py-2 rounded hover:bg-gray-100 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              href="/tasks" 
              className="px-3 py-2 rounded hover:bg-gray-100 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tasks
            </Link>
            <Link 
              href="/representatives" 
              className="px-3 py-2 rounded hover:bg-gray-100 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Representatives
            </Link>
            <Link 
              href="/contacts" 
              className="px-3 py-2 rounded hover:bg-gray-100 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contacts
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}