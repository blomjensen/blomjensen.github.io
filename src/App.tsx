import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { LabView } from './components/Lab';
import { Photography } from './components/Photography';
import { Portfolio } from './components/Portfolio';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const sections = ['home', 'portfolio', 'studies', 'about', 'contact'];
const mobileLayoutQuery = '(max-width: 860px)';
const pageTransitionDuration = 820;

function usesDocumentScroll() {
  return window.matchMedia(mobileLayoutQuery).matches;
}

function useScrollStopClickGuard(panelRef: React.RefObject<HTMLElement>, isActive: boolean) {
  const gestureRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    panelScrollTop: number;
    windowScrollY: number;
    suppress: boolean;
  } | null>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || !isActive) return;

    let lastScrollAt = -Infinity;
    let suppressClickUntil = 0;

    const markScroll = () => {
      lastScrollAt = performance.now();
      if (gestureRef.current) gestureRef.current.suppress = true;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') return;

      gestureRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        panelScrollTop: panel.scrollTop,
        windowScrollY: window.scrollY,
        suppress: performance.now() - lastScrollAt < 220,
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      const gesture = gestureRef.current;
      if (!gesture || gesture.pointerId !== event.pointerId) return;

      if (Math.hypot(event.clientX - gesture.startX, event.clientY - gesture.startY) > 8) {
        gesture.suppress = true;
      }
    };

    const finishPointer = (event: PointerEvent) => {
      const gesture = gestureRef.current;
      if (!gesture || gesture.pointerId !== event.pointerId) return;

      const shouldSuppress =
        gesture.suppress ||
        Math.abs(panel.scrollTop - gesture.panelScrollTop) > 2 ||
        Math.abs(window.scrollY - gesture.windowScrollY) > 2;
      suppressClickUntil = shouldSuppress ? performance.now() + 500 : 0;
      gestureRef.current = null;
    };

    const cancelPointer = () => {
      gestureRef.current = null;
      suppressClickUntil = performance.now() + 500;
    };

    const suppressScrollStopClick = (event: MouseEvent) => {
      if (performance.now() >= suppressClickUntil) return;
      suppressClickUntil = 0;
      event.preventDefault();
      event.stopImmediatePropagation();
    };

    panel.addEventListener('scroll', markScroll, { passive: true });
    window.addEventListener('scroll', markScroll, { passive: true });
    panel.addEventListener('pointerdown', onPointerDown, { passive: true });
    panel.addEventListener('pointermove', onPointerMove, { passive: true });
    panel.addEventListener('pointerup', finishPointer, { passive: true });
    panel.addEventListener('pointercancel', cancelPointer, { passive: true });
    panel.addEventListener('click', suppressScrollStopClick, true);

    return () => {
      panel.removeEventListener('scroll', markScroll);
      window.removeEventListener('scroll', markScroll);
      panel.removeEventListener('pointerdown', onPointerDown);
      panel.removeEventListener('pointermove', onPointerMove);
      panel.removeEventListener('pointerup', finishPointer);
      panel.removeEventListener('pointercancel', cancelPointer);
      panel.removeEventListener('click', suppressScrollStopClick, true);
    };
  }, [isActive, panelRef]);
}

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [activePage, setActivePage] = useState<'portfolio' | 'lab'>(() =>
    window.location.pathname.endsWith('/lab/') ? 'lab' : 'portfolio',
  );
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  );
  const { language } = useLanguage();
  const portfolioPanelRef = useRef<HTMLElement>(null);
  const pageTransitionTimerRef = useRef<number | null>(null);
  const mobilePageEntryRef = useRef<{
    panel: HTMLElement;
    targetScrollY: number;
  } | null>(null);
  const portfolioInertProps = activePage !== 'portfolio' ? ({ inert: '' } as const) : {};

  useScrollStopClickGuard(portfolioPanelRef, activePage === 'portfolio');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    portfolioPanelRef.current?.querySelector<HTMLElement>(`#${sectionId}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  const getPagePanel = (page: 'portfolio' | 'lab') =>
    document.querySelector<HTMLElement>(
      page === 'lab' ? '.page-panel--lab' : '.page-panel--portfolio',
    );

  const getPageTarget = (
    panel: HTMLElement,
    page: 'portfolio' | 'lab',
    sectionId?: string,
  ) =>
    page === 'portfolio' && sectionId
      ? panel.querySelector<HTMLElement>(`#${sectionId}`) ?? panel
      : panel;

  const setWindowScrollInstantly = (top: number) => {
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    const scrollContainer = document.scrollingElement;
    if (scrollContainer) scrollContainer.scrollTop = top;
    else window.scrollTo(0, top);
    root.style.scrollBehavior = previousScrollBehavior;
  };

  const finishPageTransition = () => {
    const mobileEntry = mobilePageEntryRef.current;
    if (mobileEntry) {
      flushSync(() => setIsPageTransitioning(false));
      mobileEntry.panel.classList.remove('is-page-entry-aligned');
      mobileEntry.panel.style.removeProperty('--page-entry-offset-y');
      setWindowScrollInstantly(mobileEntry.targetScrollY);
      mobilePageEntryRef.current = null;
    } else {
      setIsPageTransitioning(false);
    }

    pageTransitionTimerRef.current = null;
  };

  const preparePageDestination = (
    page: 'portfolio' | 'lab',
    sectionId?: string,
  ) => {
    const panel = getPagePanel(page);
    if (!panel) return;
    const target = getPageTarget(panel, page, sectionId);

    if (usesDocumentScroll()) {
      const currentScrollY = window.scrollY;
      setWindowScrollInstantly(currentScrollY);
      const targetScrollY = Math.max(0, currentScrollY + target.getBoundingClientRect().top);
      const entryOffset = currentScrollY - targetScrollY;
      panel.style.setProperty('--page-entry-offset-y', `${entryOffset}px`);
      panel.classList.add('is-page-entry-aligned');
      mobilePageEntryRef.current = { panel, targetScrollY };
      return;
    }

    const panelBounds = panel.getBoundingClientRect();
    const targetScrollTop = Math.max(
      0,
      panel.scrollTop + target.getBoundingClientRect().top - panelBounds.top,
    );
    panel.scrollTo({ top: targetScrollTop, left: 0, behavior: 'auto' });
  };

  const changePage = (page: 'portfolio' | 'lab', sectionId?: string) => {
    const base = import.meta.env.BASE_URL;
    const target = page === 'lab' ? `${base}lab/` : `${base}${sectionId ? `#${sectionId}` : ''}`;

    if (pageTransitionTimerRef.current !== null) {
      window.clearTimeout(pageTransitionTimerRef.current);
      finishPageTransition();
    }

    preparePageDestination(page, sectionId);
    setIsPageTransitioning(true);
    setActivePage(page);
    window.history.pushState({}, '', target);
    if (page === 'portfolio' && sectionId) setActiveSection(sectionId);

    const transitionDelay = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 0
      : pageTransitionDuration;
    pageTransitionTimerRef.current = window.setTimeout(
      finishPageTransition,
      transitionDelay,
    );
  };

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => () => {
    if (pageTransitionTimerRef.current !== null) {
      window.clearTimeout(pageTransitionTimerRef.current);
    }
    const mobileEntry = mobilePageEntryRef.current;
    if (!mobileEntry) return;
    mobileEntry.panel.classList.remove('is-page-entry-aligned');
    mobileEntry.panel.style.removeProperty('--page-entry-offset-y');
  }, []);

  useEffect(() => {
    document.title =
      activePage === 'lab'
        ? 'Lab — Bjørn Blom-Jensen'
        : language === 'en'
          ? 'Bjørn Blom-Jensen | Landscape Architect in Oslo'
          : 'Bjørn Blom-Jensen | Landskapsarkitekt i Oslo';
  }, [activePage, language]);

  useEffect(() => {
    const handleScroll = () => {
      const panel = portfolioPanelRef.current;
      if (!panel) return;
      const activationLine = (usesDocumentScroll() ? window.innerHeight : panel.clientHeight) * 0.32;

      for (const sectionId of sections) {
        const element = panel.querySelector<HTMLElement>(`#${sectionId}`);
        if (!element) continue;

        const bounds = element.getBoundingClientRect();
        if (bounds.top <= activationLine && bounds.bottom > activationLine) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    const panel = portfolioPanelRef.current;
    if (!panel) return;
    panel.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      panel.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const nextPage = window.location.pathname.endsWith('/lab/') ? 'lab' : 'portfolio';
      setActivePage(nextPage);
      if (nextPage === 'portfolio' && window.location.hash) {
        window.setTimeout(() => scrollToSection(window.location.hash.slice(1)), 60);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const passNavigationScrollToPage = (event: WheelEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('.editorial-nav')) return;
      const panel = document.querySelector<HTMLElement>(
        activePage === 'lab' ? '.page-panel--lab' : '.page-panel--portfolio',
      );
      if (!panel) return;

      panel.scrollBy({ top: event.deltaY, left: event.deltaX, behavior: 'auto' });
      event.preventDefault();
    };

    window.addEventListener('wheel', passNavigationScrollToPage, { passive: false });
    return () => window.removeEventListener('wheel', passNavigationScrollToPage);
  }, [activePage]);

  return (
    <div className={`site-root site-root--canvas is-${activePage} theme-${theme}${isPageTransitioning ? ' is-page-transitioning' : ''}`}>
      <Navigation
        activeSection={activePage === 'lab' ? 'lab' : activeSection}
        onNavigate={scrollToSection}
        onPageChange={changePage}
        page={activePage}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <div className="site-canvas">
        <section
          ref={portfolioPanelRef}
          className="page-panel page-panel--portfolio"
          aria-hidden={activePage !== 'portfolio'}
          {...portfolioInertProps}
        >
          <main>
            <Hero onExploreClick={() => scrollToSection('portfolio')} />
            <Portfolio />
            <Photography />
            <About />
            <Contact />
          </main>
          <footer className="site-footer">
            <span>Bjørn Blom-Jensen</span>
            <span>{language === 'en' ? 'Landscape Architecture Portfolio' : 'Portefølje i landskapsarkitektur'}</span>
            <span>{new Date().getFullYear()}</span>
          </footer>
        </section>
        <LabView onPageChange={changePage} isActive={activePage === 'lab'} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
