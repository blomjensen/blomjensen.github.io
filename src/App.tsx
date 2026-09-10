import { useEffect, useRef, useState } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { LabView } from './components/Lab';
import { Photography } from './components/Photography';
import { Portfolio } from './components/Portfolio';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const sections = ['home', 'portfolio', 'studies', 'about', 'contact'];

function CursorTrail({ count = 6 }: { count?: number }) {
  const trailRef = useRef<HTMLDivElement>(null);
  const dots = useRef<Array<HTMLSpanElement | null>>([]);
  const points = useRef(Array.from({ length: count }, () => ({ x: 0, y: 0 })));
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let frameId = 0;

    const tick = () => {
      let lead = target.current;
      points.current.forEach((point, index) => {
        point.x += (lead.x - point.x) * 0.35;
        point.y += (lead.y - point.y) * 0.35;
        dots.current[index]?.style.setProperty('transform', `translate3d(${point.x}px, ${point.y}px, 0)`);
        lead = point;
      });
      frameId = window.requestAnimationFrame(tick);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const targetElement = event.target instanceof Element ? event.target : null;
      if (targetElement?.closest('.study-media')) {
        trailRef.current?.classList.remove('is-active');
        return;
      }

      target.current = { x: event.clientX, y: event.clientY };
      trailRef.current?.classList.add('is-active');
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) trailRef.current?.classList.remove('is-active');
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerout', handlePointerOut, { passive: true });
    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerout', handlePointerOut);
    };
  }, []);

  return (
    <div ref={trailRef} className="cursor-trail" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          ref={(element) => {
            dots.current[index] = element;
          }}
          className="cursor-trail-dot"
        />
      ))}
    </div>
  );
}

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [activePage, setActivePage] = useState<'portfolio' | 'lab'>(() =>
    window.location.pathname.endsWith('/lab/') ? 'lab' : 'portfolio',
  );
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  );
  const { language } = useLanguage();
  const portfolioPanelRef = useRef<HTMLElement>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    portfolioPanelRef.current?.querySelector<HTMLElement>(`#${sectionId}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  const changePage = (page: 'portfolio' | 'lab', sectionId?: string) => {
    const base = import.meta.env.BASE_URL;
    const target = page === 'lab' ? `${base}lab/` : `${base}${sectionId ? `#${sectionId}` : ''}`;
    setActivePage(page);
    window.history.pushState({}, '', target);

    window.setTimeout(() => {
      if (page === 'portfolio') {
        if (sectionId) scrollToSection(sectionId);
        else portfolioPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        document.querySelector<HTMLElement>('.page-panel--lab')?.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 60);
  };

  const toggleTheme = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      const panel = portfolioPanelRef.current;
      if (!panel) return;
      const scrollPosition = panel.scrollTop + panel.clientHeight * 0.32;

      for (const sectionId of sections) {
        const element = panel.querySelector<HTMLElement>(`#${sectionId}`);
        if (!element) continue;

        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    const panel = portfolioPanelRef.current;
    if (!panel) return;
    panel.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => panel.removeEventListener('scroll', handleScroll);
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
    <div className={`site-root site-root--canvas is-${activePage} theme-${theme}`}>
      <Navigation
        activeSection={activePage === 'lab' ? 'lab' : activeSection}
        onNavigate={scrollToSection}
        onPageChange={changePage}
        page={activePage}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <div className="site-canvas">
        <section ref={portfolioPanelRef} className="page-panel page-panel--portfolio">
          <CursorTrail />
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
        <LabView onPageChange={changePage} />
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
