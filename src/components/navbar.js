'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import LangToggle from './LangToggle';

const NAV_LINKS = [
  { href: '/', en: 'Home', ru: 'Главная' },
  { href: '/news', en: 'News', ru: 'Новости' },
  { href: '/scholarships', en: 'Scholarships', ru: 'Стипендии' },
  { href: '/rules', en: 'Regulations', ru: 'Регламент' },
  { href: '/gallery', en: 'Gallery', ru: 'Галерея' },
  { href: '/faq', en: 'FAQ', ru: 'FAQ' },
  { href: '/tasks', en: 'Tasks', ru: 'Задания' },
  { href: '/representatives', en: 'Representatives', ru: 'Представители' },
  { href: '/partners', en: 'Our Partners', ru: 'Наши партнёры' },
];

const LOGIN_LABEL = { en: 'Login', ru: 'Войти' };

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();

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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(link.href) ? activeStyle : defaultStyle}
              >
                {link[lang]}
              </Link>
            ))}
            <Link
              href="/admin"
              className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                isActive('/admin')
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                  : 'text-orange-500 border-orange-500 hover:bg-orange-500 hover:!text-black hover:shadow-md'
              }`}
            >
              {LOGIN_LABEL[lang]}
            </Link>
            <LangToggle lang={lang} setLang={setLang} />
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
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded ${isActive(link.href) ? 'bg-orange-100 text-orange-500 font-semibold' : 'hover:bg-gray-100 transition-colors font-medium'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link[lang]}
              </Link>
            ))}
            <Link
              href="/admin"
              className={`px-4 py-2 rounded-full border-2 transition-all duration-200 text-center ${
                isActive('/admin')
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                  : 'text-orange-500 border-orange-500 hover:bg-orange-500 hover:!text-black hover:shadow-md'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {LOGIN_LABEL[lang]}
            </Link>
            <div className="flex justify-center pt-2">
              <LangToggle lang={lang} setLang={setLang} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
