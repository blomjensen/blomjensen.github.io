import { useEffect, useRef, useState } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
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
  const { language } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.32;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (!element) continue;

        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="site-root">
      <CursorTrail />
      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />

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
