'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext({ lang: 'en', setLang: () => {} });

const STORAGE_KEY = 'tigers_lang';

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'ru') {
        setLangState(stored);
      }
    } catch (e) {
      // localStorage unavailable — stay on default 'en'
    }
  }, []);

  const setLang = (next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
