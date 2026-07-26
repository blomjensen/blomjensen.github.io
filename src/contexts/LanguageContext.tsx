import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Language = 'no' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const preferred = (navigator.languages?.[0] ?? navigator.language ?? 'en').toLowerCase();
  return preferred.startsWith('no') || preferred.startsWith('nb') || preferred.startsWith('nn') ? 'no' : 'en';
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const saved = localStorage.getItem('language');
  if (saved === 'no' || saved === 'en') return saved;

  return getBrowserLanguage();
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language === 'no' ? 'nb' : 'en';
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
