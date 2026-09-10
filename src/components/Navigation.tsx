import { useEffect, useState } from 'react';
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
      setIsScrolled(panel.scrollTop > 24);

      const labWork = panel.querySelector<HTMLElement>('.lab-work');
      setIsOverLightSection(
        page === 'lab' && theme === 'light' && Boolean(labWork && panel.scrollTop + 24 >= labWork.offsetTop),
      );
    };
    panel.addEventListener('scroll', updateScrolled, { passive: true });
    updateScrolled();
    return () => panel.removeEventListener('scroll', updateScrolled);
  }, [page, theme]);

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
    else onPageChange?.('portfolio', 'home');
  };

  const isCurrent = (item: (typeof items)[number]) =>
    page === 'lab' ? item.id === 'lab' : item.section === activeSection;

  return (
    <header className={`editorial-nav${page === 'lab' ? ' is-lab-page' : ''}${isScrolled ? ' is-scrolled' : ''}${isOverLightSection ? ' is-on-light-surface' : ''}`}>
      <button type="button" className="nav-mark" onClick={goHome} aria-label={labels.home}>
        {labels.home}
      </button>

      <nav className="nav-links" aria-label="Primary navigation">
        {items.map((item) => (
          <button
            type="button"
            className={`nav-link${(page === 'lab' ? item.id !== 'lab' : item.id === 'lab') ? ' is-elevated' : ''}`}
            key={item.id}
            onClick={() => activate(item)}
            aria-current={isCurrent(item) ? 'true' : undefined}
          >
            {item.label}
          </button>
        ))}
        <button type="button" className="nav-link nav-language" onClick={toggleLanguage}>
          {language === 'en' ? 'NO' : 'EN'}
        </button>
        <button
          type="button"
          className="nav-link nav-theme"
          onClick={onThemeToggle}
          aria-label={theme === 'light' ? 'Aktiver mørkmodus' : 'Aktiver lysmodus'}
          title={theme === 'light' ? 'Mørkmodus' : 'Lysmodus'}
        >
          {theme === 'light' ? <Moon size={16} strokeWidth={1.8} aria-hidden="true" /> : <Sun size={17} strokeWidth={1.8} aria-hidden="true" />}
        </button>
      </nav>

      <button
        type="button"
        className="nav-menu-button"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span className="sr-only">{labels.menu}</span>
        {isMenuOpen ? (
          <X size={18} strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <MenuIcon size={18} strokeWidth={1.8} aria-hidden="true" />
        )}
      </button>

      {isMenuOpen && (
        <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
          <button type="button" onClick={goHome} aria-current={page === 'portfolio' && activeSection === 'home' ? 'true' : undefined}>
            {labels.home}
          </button>
          {items.map((item) => (
            <button type="button" key={item.id} onClick={() => activate(item)} aria-current={isCurrent(item) ? 'true' : undefined}>
              {item.label}
            </button>
          ))}
          <button type="button" onClick={toggleLanguage}>{language === 'en' ? 'Norsk' : 'English'}</button>
          <button type="button" onClick={onThemeToggle}>{theme === 'light' ? 'Mørkmodus' : 'Lysmodus'}</button>
        </nav>
      )}
    </header>
  );
}
