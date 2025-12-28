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

  // ✅ FARGER (samme logikk uansett scroll – du ønsket tydelig kontrast hele tiden)
  const activeText = isDark ? 'text-white' : 'text-gray-900';
  const inactiveText = isDark ? 'text-white/55 hover:text-white' : 'text-gray-700/70 hover:text-gray-900';

  // ✅ Theme-icon skal ALLTID være highlight (100% hvit/svart)
  const iconText = isDark ? 'text-white hover:text-white' : 'text-gray-900 hover:text-gray-900';

  // "NO | EN" separator
  const sepText = isDark ? 'text-white/40' : 'text-gray-500';

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
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => handleNavClick('home')}
              onMouseEnter={() => onHover('home')}
              onMouseLeave={() => onHover(null)}
              className={`transition-colors font-bold ${
                displaySection === 'home' ? activeText : inactiveText
              }`}
              type="button"
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
                className={`transition-colors font-bold ${
                  displaySection === item.id ? activeText : inactiveText
                }`}
                type="button"
              >
                {item.label}
              </button>
            ))}

            {/* Theme toggle (always highlight color) */}
            <button
              onClick={toggleTheme}
              className={`transition-colors ${iconText}`}
              aria-label="Toggle theme"
              type="button"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* Language toggle (TEXT-STYLE) */}
            <button
              onClick={toggleLanguage}
              className={`text-sm font-bold tracking-wider transition-colors ${
                isDark ? 'text-white/70 hover:text-white' : 'text-gray-700/70 hover:text-gray-900'
              }`}
              aria-label="Toggle language"
              type="button"
            >
              <span className={language === 'no' ? activeText : ''}>NO</span>
              <span className={sepText}>&nbsp;|&nbsp;</span>
              <span className={language === 'en' ? activeText : ''}>EN</span>
            </button>
          </div>

          {/* Mobile header */}
          <div className="md:hidden flex justify-between items-center w-full">
            <div />
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors font-bold ${activeText}`}
              type="button"
            >
              {getCurrentSectionLabel()}
            </button>

            <button
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className={`transition-colors ${activeText}`}
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
            className={`md:hidden mt-4 rounded-lg shadow-lg py-4 ${
              isDark ? 'bg-neutral-900' : 'bg-white'
            }`}
          >
            <button
              onClick={() => handleNavClick('home')}
              className={`block w-full text-left px-4 py-3 transition-colors font-bold ${
                activeSection === 'home' ? activeText : isDark ? 'text-white/55' : 'text-gray-900/55'
              } ${isDark ? 'hover:bg-neutral-800' : 'hover:bg-gray-50'}`}
              type="button"
            >
              {c.nav.home}
            </button>

            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={activeSection === item.id ? 'true' : undefined}
                className={`block w-full text-left px-4 py-3 transition-colors font-bold ${
                  activeSection === item.id ? activeText : isDark ? 'text-white/55' : 'text-gray-900/55'
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
                isDark ? 'text-white hover:bg-neutral-800' : 'text-gray-900 hover:bg-gray-50'
              }`}
              type="button"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
              <span className="font-bold">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <button
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between w-full text-left px-4 py-3 transition-colors ${
                isDark ? 'text-white hover:bg-neutral-800' : 'text-gray-900 hover:bg-gray-50'
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
