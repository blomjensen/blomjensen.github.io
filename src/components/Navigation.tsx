import { useEffect, useRef, useState } from 'react';
import { Languages, Menu as MenuIcon, Moon, Sun, X } from 'lucide-react';
import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';

export type SitePage = 'portfolio' | 'lab';

type NavigationProps = {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onPageChange?: (page: SitePage, sectionId?: string) => void;
  page?: SitePage;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
};

export function Navigation({
  activeSection,
  onNavigate,
  onPageChange,
  page = 'portfolio',
  theme,
  onThemeToggle,
}: NavigationProps) {
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverLightSection, setIsOverLightSection] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [displayedPage, setDisplayedPage] = useState(page);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pageTransitionTimerRef = useRef<number | null>(null);
  const labels = content[language].nav;

  const items = [
    { id: 'portfolio', label: labels.portfolio, page: 'portfolio' as const, section: 'portfolio' },
    { id: 'lab', label: labels.lab, page: 'lab' as const },
    { id: 'studies', label: labels.studies, page: 'portfolio' as const, section: 'studies' },
    { id: 'about', label: labels.about, page: 'portfolio' as const, section: 'about' },
    { id: 'contact', label: labels.contact, page: 'portfolio' as const, section: 'contact' },
  ];

  useEffect(() => {
    const panel = document.querySelector<HTMLElement>(
      page === 'lab' ? '.page-panel--lab' : '.page-panel--portfolio',
    );
    if (!panel) return;

    const updateScrolled = () => {
      const documentScroll = window.matchMedia('(max-width: 860px)').matches;
      const scrollTop = documentScroll ? window.scrollY : panel.scrollTop;
      setIsScrolled(scrollTop > 24);

      const labWork = panel.querySelector<HTMLElement>('.lab-work');
      setIsOverLightSection(
        page === 'lab' &&
          theme === 'light' &&
          Boolean(
            labWork &&
              (documentScroll
                ? labWork.getBoundingClientRect().top <= 24
                : panel.scrollTop + 24 >= labWork.offsetTop),
          ),
      );
    };
    panel.addEventListener('scroll', updateScrolled, { passive: true });
    window.addEventListener('scroll', updateScrolled, { passive: true });
    updateScrolled();
    return () => {
      panel.removeEventListener('scroll', updateScrolled);
      window.removeEventListener('scroll', updateScrolled);
    };
  }, [page, theme]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMenuOpen]);

  useEffect(() => () => {
    if (pageTransitionTimerRef.current !== null) {
      window.clearTimeout(pageTransitionTimerRef.current);
    }
  }, []);

  const beginPageTransition = (nextPage: SitePage) => {
    if (pageTransitionTimerRef.current !== null) {
      window.clearTimeout(pageTransitionTimerRef.current);
    }
    setIsPageTransitioning(true);
    pageTransitionTimerRef.current = window.setTimeout(() => {
      setDisplayedPage(nextPage);
      setIsPageTransitioning(false);
      pageTransitionTimerRef.current = null;
    }, 820);
  };

  useEffect(() => {
    if (page === displayedPage) return;
    beginPageTransition(page);
  }, [displayedPage, page]);

  const activate = (item: (typeof items)[number]) => {
    setIsMenuOpen(false);
    if (item.page !== page) {
      beginPageTransition(item.page);
      onPageChange?.(item.page, item.section);
      return;
    }
    if (item.section) onNavigate(item.section);
  };

  const goHome = () => {
    setIsMenuOpen(false);
    if (page === 'portfolio') onNavigate('home');
    else {
      beginPageTransition('portfolio');
      onPageChange?.('portfolio', 'home');
    }
  };

  const toggleLanguageAndClose = () => {
    toggleLanguage();
    setIsMenuOpen(false);
  };

  const toggleThemeAndClose = () => {
    onThemeToggle();
    setIsMenuOpen(false);
  };

  const switchPrimaryPage = () => {
    setIsMenuOpen(false);
    const nextPage = page === 'lab' ? 'portfolio' : 'lab';
    beginPageTransition(nextPage);
    if (nextPage === 'portfolio') onPageChange?.('portfolio', 'home');
    else onPageChange?.('lab');
  };

  const isCurrent = (item: (typeof items)[number]) =>
    page === 'lab' ? item.id === 'lab' : item.section === activeSection;

  return (
    <header className={`editorial-nav${displayedPage === 'lab' ? ' is-lab-page' : ''}${isScrolled ? ' is-scrolled' : ''}${isOverLightSection ? ' is-on-light-surface' : ''}${isPageTransitioning ? ' is-page-transitioning' : ''}`}>
      <button type="button" className="nav-mark" onClick={goHome} aria-label={labels.home}>
        {labels.home}
      </button>

      <nav className="nav-links" aria-label={labels.primaryNav}>
        {items.map((item) => (
          <button
            type="button"
            className={`nav-link${(displayedPage === 'lab' ? item.id !== 'lab' : item.id === 'lab') ? ' is-elevated' : ''}`}
            key={item.id}
            onClick={() => activate(item)}
            aria-current={isCurrent(item) ? 'true' : undefined}
          >
            {item.label}
          </button>
        ))}
        <button type="button" className="nav-link nav-language" onClick={toggleLanguageAndClose}>
          {language === 'en' ? 'NO' : 'EN'}
        </button>
        <button
          type="button"
          className="nav-link nav-theme"
          onClick={toggleThemeAndClose}
          aria-label={theme === 'light' ? labels.darkMode : labels.lightMode}
          title={theme === 'light' ? labels.darkMode : labels.lightMode}
        >
          {theme === 'light' ? <Moon size={16} strokeWidth={1.8} aria-hidden="true" /> : <Sun size={17} strokeWidth={1.8} aria-hidden="true" />}
        </button>
      </nav>

      <button type="button" className="nav-page-switch" onClick={switchPrimaryPage}>
        {displayedPage === 'lab' ? labels.portfolio : labels.lab}
      </button>

      <div className="nav-mobile-controls" aria-label={language === 'en' ? 'Display settings' : 'Visningsvalg'}>
        <button
          type="button"
          className="nav-mobile-icon"
          onClick={toggleLanguageAndClose}
          aria-label={language === 'en' ? 'Bytt til norsk' : 'Switch to English'}
          title={language === 'en' ? 'Norsk' : 'English'}
        >
          <Languages size={18} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="nav-mobile-icon"
          onClick={toggleThemeAndClose}
          aria-label={theme === 'light' ? labels.darkMode : labels.lightMode}
          title={theme === 'light' ? labels.darkMode : labels.lightMode}
        >
          {theme === 'light' ? <Moon size={17} strokeWidth={1.8} aria-hidden="true" /> : <Sun size={18} strokeWidth={1.8} aria-hidden="true" />}
        </button>
      </div>

      <button
        ref={menuButtonRef}
        type="button"
        className="nav-menu-button"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span className="sr-only">
          {isMenuOpen ? (language === 'en' ? 'Close menu' : 'Lukk meny') : labels.menu}
        </span>
        {isMenuOpen ? (
          <X size={18} strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <MenuIcon size={18} strokeWidth={1.8} aria-hidden="true" />
        )}
      </button>

      {isMenuOpen && (
        <nav id="mobile-navigation" className="mobile-menu" aria-label={labels.mobileNav}>
          {items.filter((item) => item.id !== displayedPage).map((item) => (
            <button type="button" key={item.id} onClick={() => activate(item)} aria-current={isCurrent(item) ? 'true' : undefined}>
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
