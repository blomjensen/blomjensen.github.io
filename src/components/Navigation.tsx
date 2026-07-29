import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const c = content[language];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'portfolio', label: c.nav.portfolio },
    { id: 'studies', label: c.nav.studies },
    { id: 'about', label: c.nav.about },
    { id: 'contact', label: c.nav.contact },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  const handleLanguageToggle = () => {
    toggleLanguage();
    setIsMobileMenuOpen(false);
  };

  const nextLanguageLabel = language === 'en' ? 'Switch to Norwegian' : 'Bytt til engelsk';
  const mainNavigationLabel = language === 'en' ? 'Main navigation' : 'Hovednavigasjon';
  const mobileNavigationLabel = language === 'en' ? 'Mobile navigation' : 'Mobilnavigasjon';
  const menuButtonLabel = isMobileMenuOpen
    ? language === 'en'
      ? 'Close menu'
      : 'Lukk meny'
    : language === 'en'
      ? 'Open menu'
      : 'Åpne meny';

  return (
    <header className={`editorial-nav ${isScrolled ? 'is-scrolled' : ''}`}>
      <button
        className="nav-mark"
        type="button"
        aria-current={activeSection === 'home' ? 'true' : undefined}
        onClick={() => handleNavClick('home')}
        data-umami-event="navigation_click"
        data-umami-event-section="home"
        data-umami-event-location="desktop"
      >
        Bjørn Blom-Jensen
      </button>

      <nav className="nav-links" aria-label={mainNavigationLabel}>
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNavClick(item.id)}
            className="nav-link"
            aria-current={activeSection === item.id ? 'true' : undefined}
            data-umami-event="navigation_click"
            data-umami-event-section={item.id}
            data-umami-event-location="desktop"
          >
            {item.label}
          </button>
        ))}
        <button
          className="nav-link nav-language"
          type="button"
          onClick={handleLanguageToggle}
          aria-label={nextLanguageLabel}
          data-umami-event="language_change"
          data-umami-event-from={language}
          data-umami-event-to={language === 'en' ? 'no' : 'en'}
          data-umami-event-location="desktop"
        >
          {language === 'en' ? 'NO' : 'EN'}
        </button>
      </nav>

      <button
        className="nav-menu-button"
        type="button"
        aria-label={menuButtonLabel}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsMobileMenuOpen((open) => !open)}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isMobileMenuOpen && (
        <nav className="mobile-menu" id="mobile-menu" aria-label={mobileNavigationLabel}>
          <button
            type="button"
            aria-current={activeSection === 'home' ? 'true' : undefined}
            onClick={() => handleNavClick('home')}
            data-umami-event="navigation_click"
            data-umami-event-section="home"
            data-umami-event-location="mobile"
          >
            {c.nav.home}
          </button>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={activeSection === item.id ? 'true' : undefined}
              onClick={() => handleNavClick(item.id)}
              data-umami-event="navigation_click"
              data-umami-event-section={item.id}
              data-umami-event-location="mobile"
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={handleLanguageToggle}
            aria-label={nextLanguageLabel}
            data-umami-event="language_change"
            data-umami-event-from={language}
            data-umami-event-to={language === 'en' ? 'no' : 'en'}
            data-umami-event-location="mobile"
          >
            {language === 'en' ? 'Norsk' : 'English'}
          </button>
        </nav>
      )}
    </header>
  );
}
