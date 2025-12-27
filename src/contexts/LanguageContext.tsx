import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Language = 'no' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language | null;
    if (saved === 'no' || saved === 'en') setLanguage(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const value = useMemo<LanguageContextType>(() => {
    return {
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((prev) => (prev === 'en' ? 'no' : 'en')),
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
