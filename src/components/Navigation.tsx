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

  // ===== Color tokens (viktig: ingen svart tekst i darkmode) =====
  const activeText = isDark ? 'text-white' : 'text-gray-900';
  const inactiveText = isDark ? 'text-white/60 hover:text-white/90' : 'text-gray-700/70 hover:text-gray-900';
  const iconText = isDark ? 'text-white/75 hover:text-white' : 'text-gray-600 hover:text-gray-900';

  const navWrap = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled && (activeSection === 'portfolio' || activeSection === 'about' || activeSection === 'contact')
      ? 'py-4'
      : 'bg-transparent py-6'
  }`;

  const navButtonClass = (id: string) =>
    `transition-all font-bold ${displaySection === id ? activeText : inactiveText}`;

  const langSelected = isDark ? 'text-white font-bold' : 'text-gray-900 font-bold';
  const langUnselected = isDark ? 'text-white/55 hover:text-white/85' : 'text-gray-700/60 hover:text-gray-900';
  const langDivider = isDark ? 'text-white/35' : 'text-gray-400';

  return (
    <nav className={navWrap}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              onMouseEnter={() => onHover('home')}
              onMouseLeave={() => onHover(null)}
              className={navButtonClass('home')}
            >
              {c.nav.home}
            </button>

            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={activeSection === item.id ? 'true' : undefined}
                onMouseEnter={() => onHover(item.id)}
                onMouseLeave={() => onHover(null)}
                className={navButtonClass(item.id)}
              >
                {item.label}
              </button>
            ))}

            {/* Theme toggle icon */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`transition-colors ${iconText}`}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* Language toggle - looks like nav text (not a pill button) */}
            <button
              type="button"
              onClick={toggleLanguage}
              className={`text-sm font-bold tracking-wider transition-colors ${inactiveText}`}
              aria-label="Toggle language"
              title="Toggle language"
            >
              <span className={language === 'no' ? langSelected : langUnselected}>NO</span>
              <span className={`${langDivider}`}>&nbsp;|&nbsp;</span>
              <span className={language === 'en' ? langSelected : langUnselected}>EN</span>
            </button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex justify-between items-center w-full">
            <div />
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`transition-all font-bold ${activeText}`}
            >
              {getCurrentSectionLabel()}
            </button>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className={`transition-colors ${activeText}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={activeSection === item.id ? 'true' : undefined}
                className={`block w-full text-left px-4 py-3 transition-all font-bold ${
                  activeSection === item.id ? activeText : isDark ? 'text-white/50' : 'text-gray-900/50'
                } ${isDark ? 'hover:bg-neutral-800' : 'hover:bg-gray-50'}`}
              >
                {item.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => {
                toggleTheme();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center gap-2 w-full text-left px-4 py-3 transition-colors ${
                isDark ? 'text-neutral-300 hover:bg-neutral-800' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between w-full text-left px-4 py-3 transition-colors ${
                isDark ? 'text-neutral-300 hover:bg-neutral-800' : 'text-gray-600 hover:bg-gray-50'
              }`}
              aria-label="Toggle language"
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
