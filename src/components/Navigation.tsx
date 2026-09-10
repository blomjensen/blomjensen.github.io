import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Menu as MenuIcon, Moon, Sun, X } from 'lucide-react';
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
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const labels = content[language].nav;

  const items = [
    { id: 'portfolio', label: content[language].portfolio.title, page: 'portfolio' as const, section: 'portfolio' },
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

  useLayoutEffect(() => {
    const header = headerRef.current;
    const canvas = document.querySelector<HTMLElement>('.site-canvas');
    const labPanel = document.querySelector<HTMLElement>('.page-panel--lab');
    if (!header || !canvas || !labPanel) return;

    const surfaceElements = Array.from(
      header.querySelectorAll<HTMLElement>('[data-nav-surface]'),
    );
    let frameId = 0;
    let hasStopped = false;

    const syncSurfaceStyles = () => {
      const labBoundary = labPanel.getBoundingClientRect().left;
      const elementsOverLab = surfaceElements.map((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.left + bounds.width / 2 >= labBoundary;
      });

      surfaceElements.forEach((element, index) => {
        element.toggleAttribute('data-nav-over-lab', elementsOverLab[index]);
      });
    };

    const stopTracking = () => {
      if (hasStopped) return;
      hasStopped = true;
      window.cancelAnimationFrame(frameId);
      syncSurfaceStyles();
    };

    const trackBoundary = () => {
      syncSurfaceStyles();
      frameId = window.requestAnimationFrame(trackBoundary);
    };

    syncSurfaceStyles();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.target === canvas && event.propertyName === 'transform') stopTracking();
    };

    canvas.addEventListener('transitionend', handleTransitionEnd);
    frameId = window.requestAnimationFrame(trackBoundary);
    const fallbackTimer = window.setTimeout(stopTracking, 900);

    return () => {
      hasStopped = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(fallbackTimer);
      canvas.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [language, page]);

  const activate = (item: (typeof items)[number]) => {
    setIsMenuOpen(false);
    if (item.page !== page) {
      onPageChange?.(item.page, item.section);
      return;
    }
    if (item.section) onNavigate(item.section);
  };

  const goHome = () => {
    setIsMenuOpen(false);
    if (page === 'portfolio') onNavigate('home');
    else {
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
    if (nextPage === 'portfolio') onPageChange?.('portfolio', 'home');
    else onPageChange?.('lab');
  };

  const isCurrent = (item: (typeof items)[number]) =>
    page === 'lab' ? item.id === 'lab' : item.section === activeSection;

  return (
    <header ref={headerRef} className={`editorial-nav${page === 'lab' ? ' is-lab-page' : ''}${isScrolled ? ' is-scrolled' : ''}${isOverLightSection ? ' is-on-light-surface' : ''}`}>
      <button type="button" className="nav-mark" data-nav-surface onClick={goHome} aria-label={labels.home}>
        {labels.home}
      </button>

      <nav className="nav-links" aria-label={labels.primaryNav}>
        {items.map((item) => (
          <button
            type="button"
            className={`nav-link${(page === 'lab' ? item.id !== 'lab' : item.id === 'lab') ? ' is-elevated' : ''}`}
            data-nav-surface
            key={item.id}
            onClick={() => activate(item)}
            aria-current={isCurrent(item) ? 'true' : undefined}
          >
            {item.label}
          </button>
        ))}
        <button type="button" className="nav-link nav-language" data-nav-surface onClick={toggleLanguageAndClose}>
          {language === 'en' ? 'NO' : 'EN'}
        </button>
        <button
          type="button"
          className="nav-link nav-theme"
          data-nav-surface
          onClick={toggleThemeAndClose}
          aria-label={theme === 'light' ? labels.darkMode : labels.lightMode}
          title={theme === 'light' ? labels.darkMode : labels.lightMode}
        >
          {theme === 'light' ? <Moon size={16} strokeWidth={1.8} aria-hidden="true" /> : <Sun size={17} strokeWidth={1.8} aria-hidden="true" />}
        </button>
      </nav>

      <div className="nav-page-menu">
        <button type="button" className="nav-page-switch" data-nav-surface onClick={switchPrimaryPage}>
          {page === 'lab' ? labels.portfolio : labels.lab}
        </button>

        {isMenuOpen && (
          <nav id="mobile-navigation" className="mobile-menu" aria-label={labels.mobileNav}>
            {items.filter((item) => item.id !== 'lab').map((item) => (
              <button type="button" key={item.id} onClick={() => activate(item)} aria-current={isCurrent(item) ? 'true' : undefined}>
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>

      <div className="nav-mobile-controls" aria-label={language === 'en' ? 'Display settings' : 'Visningsvalg'}>
        <button
          type="button"
          className="nav-mobile-icon nav-mobile-language"
          data-nav-surface
          onClick={toggleLanguageAndClose}
          aria-label={language === 'en' ? 'Bytt til norsk' : 'Switch to English'}
          title={language === 'en' ? 'Norsk' : 'English'}
        >
          {language === 'en' ? 'NO' : 'EN'}
        </button>
        <button
          type="button"
          className="nav-mobile-icon"
          data-nav-surface
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
        data-nav-surface
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

    </header>
  );
}
