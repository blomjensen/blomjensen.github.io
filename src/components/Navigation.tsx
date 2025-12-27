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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

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
    const currentItem = navItems.find(item => item.id === activeSection);
    return currentItem ? currentItem.label : c.nav.home;
  };

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  const displaySection = hoveredSection || activeSection;

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
          {/* Desktop Navigation - All Centered */}
          <div className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => handleNavClick('home')}
              onMouseEnter={() => onHover('home')}
              onMouseLeave={() => onHover(null)}
              className={`transition-all font-bold ${
                displaySection === 'home' 
                  ? isScrolled 
                    ? theme === 'dark' 
                      ? 'text-white' 
                      : 'text-gray-900'
                    : theme === 'dark'
                      ? 'text-white'
                      : 'text-gray-900'
                  : isScrolled 
                    ? theme === 'dark' 
                      ? 'text-white/60 hover:text-white/80' 
                      : 'text-gray-600 hover:text-gray-800'
                    : theme === 'dark'
                      ? 'text-white/60 hover:text-white/80'
                      : 'text-gray-700/60 hover:text-gray-700/80'
              }`}
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
                className={`transition-all font-bold ${
                  displaySection === item.id 
                    ? isScrolled 
                      ? theme === 'dark' 
                        ? 'text-white' 
                        : 'text-gray-900'
                      : theme === 'dark'
                        ? 'text-white'
                        : 'text-gray-900'
                    : isScrolled 
                      ? theme === 'dark' 
                        ? 'text-white/60 hover:text-white/80' 
                        : 'text-gray-600 hover:text-gray-800'
                      : theme === 'dark'
                        ? 'text-white/60 hover:text-white/80'
                        : 'text-gray-700/60 hover:text-gray-700/80'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={toggleTheme}
              className={`transition-colors ${
                isScrolled 
                  ? theme === 'dark' 
                    ? 'text-neutral-300 hover:text-white' 
                    : 'text-gray-400 hover:text-gray-900'
                  : theme === 'dark'
                    ? 'text-white/90 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            <button
              onClick={toggleLanguage}
              className={`text-sm font-bold tracking-wider transition-colors rounded-full px-3 py-1 border ${
                isScrolled
                  ? theme === 'dark'
                    ? 'text-white/80 hover:text-white border-white/10 hover:border-white/20'
                    : 'text-gray-700 hover:text-gray-900 border-gray-300/60 hover:border-gray-400'
                  : theme === 'dark'
                    ? 'text-white/80 hover:text-white border-white/10 hover:border-white/20'
                    : 'text-gray-700 hover:text-gray-900 border-gray-300/60 hover:border-gray-400'
              }`}
              aria-label="Toggle language"
            >
              <span className={language === 'no' ? 'opacity-100' : 'opacity-60'}>NO</span>
              <span className="opacity-50">&nbsp;|&nbsp;</span>
              <span className={language === 'en' ? 'opacity-100' : 'opacity-60'}>EN</span>
            </button>
          </div>

          {/* Mobile - Name centered with menu button on right */}
          <div className="md:hidden flex justify-between items-center w-full">
            <div></div>
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-all font-bold ${
                isScrolled 
                  ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                  : theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {getCurrentSectionLabel()}
            </button>
            <button
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className={`transition-colors ${
                isScrolled 
                  ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                  : theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div id="mobile-menu" className={`md:hidden mt-4 rounded-lg shadow-lg py-4 ${
            theme === 'dark' ? 'bg-neutral-900' : 'bg-white'
          }`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-current={activeSection === item.id ? 'true' : undefined}
                className={`block w-full text-left px-4 py-3 transition-all font-bold ${
                  activeSection === item.id 
                    ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                    : theme === 'dark' ? 'text-white/40' : 'text-gray-900/40'
                } ${
                  theme === 'dark'
                    ? 'hover:bg-neutral-800'
                    : 'hover:bg-gray-50'
                }`}
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
                theme === 'dark'
                  ? 'text-neutral-300 hover:bg-neutral-800'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <button
              onClick={() => {
                toggleLanguage();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center justify-between w-full text-left px-4 py-3 transition-colors ${
                theme === 'dark'
                  ? 'text-neutral-300 hover:bg-neutral-800'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              aria-label="Toggle language"
            >
              <span className="font-bold">{language === 'no' ? 'Språk' : 'Language'}</span>
              <span className="text-sm opacity-80">{language === 'no' ? 'NO' : 'EN'}
              </span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}