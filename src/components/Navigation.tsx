import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../content';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  hoveredSection: string | null;
  onHover: (section: string | null) => void;
}

export function Navigation({ activeSection, onNavigate, hoveredSection, onHover }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const c = content[language];

  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'portfolio', label: c.nav.portfolio },
    { id: 'about', label: c.nav.about },
    { id: 'contact', label: c.nav.contact },
  ];

  const getCurrentSectionLabel = () => {
    if (activeSection === 'home') return c.nav.home;
    const currentItem = navItems.find((item) => item.id === activeSection);
    return currentItem ? currentItem.label : c.nav.home;
  };

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  const displaySection = hoveredSection || activeSection;

  const activeNav = isScrolled
    ? isDark ? 'text-white' : 'text-gray-900'
    : isDark ? 'text-white' : 'text-gray-900';

  const inactiveNav = isScrolled
    ? isDark ? 'text-white/60 hover:text-white/85' : 'text-gray-600 hover:text-gray-900'
    : isDark ? 'text-white/60 hover:text-white/85' : 'text-gray-700/70 hover:text-gray-900';

  // Language pill styles
  const langOuter = isDark ? 'bg-white/10 border-white/10' : 'bg-gray-200/80 border-gray-300/60';
  const langActivePill = isDark ? 'bg-white' : 'bg-gray-900';
  const langActiveText = isDark ? 'text-black' : 'text-white';
  const langInactiveText = isDark ? 'text-white/70 hover:text-white' : 'text-gray-700 hover:text-gray-900';

  const isNo = language === 'no';
  const insetPx = 5;
  const gapPx = 10;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled && (activeSection === 'portfolio' || activeSection === 'about' || activeSection === 'contact')
          ? 'py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          {/* Desktop */}
          <div className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => handleNavClick('home')}
              onMouseEnter={() => onHover('home')}
              onMouseLeave={() => onHover(null)}
              className={`transition-all font-bold ${displaySection === 'home' ? activeNav : inactiveNav}`}
            >
              {c.nav.home}
            </button>

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={activeSection === item.id ? 'true' : undefined}
                onMouseEnter={() => onHover(item.id)}
                onMouseLeave={() => onHover(null)}
                className={`transition-all font-bold ${displaySection === item.id ? activeNav : inactiveNav}`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={toggleTheme}
              className={`transition-colors ${
                isScrolled
                  ? isDark ? 'text-neutral-300 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  : isDark ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'
              }`}
              aria-label="Toggle theme"
              type="button"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* NO | EN language pill */}
            <button
              type="button"
              onClick={toggleLanguage}
              className={`relative inline-flex rounded-full border backdrop-blur-md ${langOuter}`}
              style={{ padding: insetPx }}
              aria-label="Toggle language"
              title="Toggle language"
            >
              <span
                aria-hidden
                className={`absolute rounded-full transition-transform duration-200 ease-out shadow-sm ${langActivePill}`}
                style={{
                  top: insetPx,
                  bottom: insetPx,
                  left: insetPx,
                  width: `calc(50% - ${gapPx / 2}px)`,
                  transform: isNo ? 'translateX(0)' : `translateX(calc(100% + ${gapPx}px))`,
                }}
              />

              <span className="relative z-10 inline-flex" style={{ gap: gapPx }}>
                <span
                  className={`px-3 py-1 text-xs font-bold tracking-wider rounded-full transition-colors ${
                    isNo ? langActiveText : langInactiveText
                  }`}
                  style={{ minWidth: 34, textAlign: 'center' }}
                >
                  NO
                </span>
                <span
                  className={`px-3 py-1 text-xs font-bold tracking-wider rounded-full transition-colors ${
                    !isNo ? langActiveText : langInactiveText
                  }`}
                  style={{ minWidth: 34, textAlign: 'center' }}
                >
                  EN
                </span>
              </span>
            </button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex justify-between items-center w-full">
            <div />
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-all font-bold ${activeNav}`}
              type="button"
            >
              {getCurrentSectionLabel()}
            </button>
            <button
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className={`transition-colors ${activeNav}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className={`md:hidden mt-4 rounded-lg shadow-lg py-4 ${isDark ? 'bg-neutral-900' : 'bg-white'}`}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={activeSection === item.id ? 'true' : undefined}
                className={`block w-full text-left px-4 py-3 transition-all font-bold ${
                  activeSection === item.id ? (isDark ? 'text-white' : 'text-gray-900') : (isDark ? 'text-white/60' : 'text-gray-900/60')
                } ${isDark ? 'hover:bg-neutral-800' : 'hover:bg-gray-50'}`}
                type="button"
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => {
                toggleTheme();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 w-full text-left px-4 py-3 transition-colors ${
                isDark ? 'text-neutral-200 hover:bg-neutral-800' : 'text-gray-700 hover:bg-gray-50'
              }`}
              type="button"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <button
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between w-full text-left px-4 py-3 transition-colors ${
                isDark ? 'text-neutral-200 hover:bg-neutral-800' : 'text-gray-700 hover:bg-gray-50'
              }`}
              aria-label="Toggle language"
              type="button"
            >
              <span className="font-bold">{language === 'no' ? 'Språk' : 'Language'}</span>
              <span className="text-sm opacity-80">{language === 'no' ? 'NO' : 'EN'}</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
