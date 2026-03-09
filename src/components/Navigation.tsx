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
  const navTone = isDark ? 'dark' : 'light';
  const mobileActiveText = isDark ? 'rgba(255, 255, 255, 0.98)' : 'rgba(17, 24, 39, 0.96)';
  const mobileMutedText = isDark ? 'rgba(255, 255, 255, 0.72)' : 'rgba(17, 24, 39, 0.72)';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  return (
    <nav
      className={`site-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
      data-tone={navTone}
      data-scrolled={isScrolled ? 'true' : 'false'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          {/* Desktop Navigation */}
          <div className="site-nav-shell hidden md:flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              onMouseEnter={() => onHover('home')}
              onMouseLeave={() => onHover(null)}
              className="site-nav-link"
              data-active={displaySection === 'home' ? 'true' : 'false'}
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
                className="site-nav-link"
                data-active={displaySection === item.id ? 'true' : 'false'}
                type="button"
              >
                {item.label}
              </button>
            ))}

            {/* Theme toggle (always highlight color) */}
            <button
              onClick={toggleTheme}
              className="site-nav-icon"
              aria-label="Toggle theme"
              type="button"
            >
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* Language toggle (TEXT-STYLE) */}
            <button
              onClick={toggleLanguage}
              className="site-nav-language text-sm tracking-wider"
              aria-label="Toggle language"
              type="button"
            >
              <span className="site-nav-language-option" data-active={language === 'no' ? 'true' : 'false'}>NO</span>
              <span className="site-nav-separator">&nbsp;|&nbsp;</span>
              <span className="site-nav-language-option" data-active={language === 'en' ? 'true' : 'false'}>EN</span>
            </button>
          </div>

          {/* Mobile header */}
          <div className="site-nav-shell md:hidden flex items-center justify-between w-full">
            <div style={{ width: 24 }} />
            <button
              onClick={() => handleNavClick('home')}
              className="font-bold transition-colors"
              style={{ color: mobileActiveText }}
              type="button"
            >
              {getCurrentSectionLabel()}
            </button>

            <button
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="transition-colors"
              style={{ color: mobileActiveText }}
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
            className="site-mobile-menu md:hidden py-4"
          >
            <button
              onClick={() => handleNavClick('home')}
              className={`block w-full text-left px-4 py-3 transition-colors font-bold ${
                isDark ? 'hover:bg-neutral-800' : 'hover:bg-gray-50'
              }`}
              style={{ color: activeSection === 'home' ? mobileActiveText : mobileMutedText }}
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
                  isDark ? 'hover:bg-neutral-800' : 'hover:bg-gray-50'
                }`}
                style={{ color: activeSection === item.id ? mobileActiveText : mobileMutedText }}
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
                isDark ? 'hover:bg-neutral-800' : 'hover:bg-gray-50'
              }`}
              style={{ color: mobileActiveText }}
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
                isDark ? 'hover:bg-neutral-800' : 'hover:bg-gray-50'
              }`}
              style={{ color: mobileActiveText }}
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
