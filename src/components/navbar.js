'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Function to determine link activity
  const isActive = (path) => {
    return pathname === path;
  };
  
  // Style for active menu item
  const activeStyle = "text-orange-500 font-semibold";
  const defaultStyle = "hover:text-orange-500 transition-colors font-medium";

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
                width={186} 
                height={67} 
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className={isActive('/') ? activeStyle : defaultStyle}>
              Home
            </Link>
            <Link href="/news" className={isActive('/news') ? activeStyle : defaultStyle}>
              News
            </Link>
            <Link href="/rules" className={isActive('/rules') ? activeStyle : defaultStyle}>
              Regulations and Structure
            </Link>
            <Link href="/register" className={isActive('/register') ? activeStyle : defaultStyle}>
              Registration
            </Link>
            <Link href="/gallery" className={isActive('/gallery') ? activeStyle : defaultStyle}>
              Gallery
            </Link>
            <Link href="/faq" className={isActive('/faq') ? activeStyle : defaultStyle}>
              FAQ
            </Link>
            <Link href="/tasks" className={isActive('/tasks') ? activeStyle : defaultStyle}>
              Tasks
            </Link>
            <Link href="/representatives" className={isActive('/representatives') ? activeStyle : defaultStyle}>
              Representatives
            </Link>
            <Link href="/partners" className={isActive('/partners') ? activeStyle : defaultStyle}>
              Our Partners
            </Link>
            <Link href="/contacts" className={isActive('/contacts') ? activeStyle : defaultStyle}>
              Contacts
            </Link>
            <Link 
              href="/admin" 
              className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                isActive('/admin') 
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md' 
                  : 'text-orange-500 border-orange-500 hover:bg-orange-500 hover:!text-black hover:shadow-md'
              }`}
            >
              Login
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
              className={`px-3 py-2 rounded ${isActive('/') ? 'bg-orange-100 text-orange-500 font-semibold' : 'hover:bg-gray-100 transition-colors font-medium'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/news"
              className={`px-3 py-2 rounded ${isActive('/news') ? 'bg-orange-100 text-orange-500 font-semibold' : 'hover:bg-gray-100 transition-colors font-medium'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              News
            </Link>
            <Link
              href="/rules"
              className={`px-3 py-2 rounded ${isActive('/rules') ? 'bg-orange-100 text-orange-500 font-semibold' : 'hover:bg-gray-100 transition-colors font-medium'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Regulations and Structure
            </Link>
            <Link 
              href="/register" 
              className={`px-3 py-2 rounded ${isActive('/register') ? 'bg-orange-100 text-orange-500 font-semibold' : 'hover:bg-gray-100 transition-colors font-medium'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Registration
            </Link>
            <Link 
              href="/gallery" 
              className={`px-3 py-2 rounded ${isActive('/gallery') ? 'bg-orange-100 text-orange-500 font-semibold' : 'hover:bg-gray-100 transition-colors font-medium'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Gallery
            </Link>
            <Link 
              href="/faq" 
              className={`px-3 py-2 rounded ${isActive('/faq') ? 'bg-orange-100 text-orange-500 font-semibold' : 'hover:bg-gray-100 transition-colors font-medium'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link 
              href="/tasks" 
              className={`px-3 py-2 rounded ${isActive('/tasks') ? 'bg-orange-100 text-orange-500 font-semibold' : 'hover:bg-gray-100 transition-colors font-medium'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tasks
            </Link>
            <Link 
              href="/representatives" 
              className={`px-3 py-2 rounded ${isActive('/representatives') ? 'bg-orange-100 text-orange-500 font-semibold' : 'hover:bg-gray-100 transition-colors font-medium'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Representatives
            </Link>
            <Link 
              href="/partners" 
              className={`px-3 py-2 rounded ${isActive('/partners') ? 'bg-orange-100 text-orange-500 font-semibold' : 'hover:bg-gray-100 transition-colors font-medium'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Partners
            </Link>
            <Link 
              href="/contacts" 
              className={`px-3 py-2 rounded ${isActive('/contacts') ? 'bg-orange-100 text-orange-500 font-semibold' : 'hover:bg-gray-100 transition-colors font-medium'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contacts
            </Link>
            <Link 
              href="/admin" 
              className={`px-4 py-2 rounded-full border-2 transition-all duration-200 text-center ${
                isActive('/admin') 
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md' 
                  : 'text-orange-500 border-orange-500 hover:bg-orange-500 hover:!text-black hover:shadow-md'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}