import { useEffect, useState } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { Photography } from './components/Photography';
import { Portfolio } from './components/Portfolio';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const sections = ['home', 'portfolio', 'photography', 'about', 'contact'];

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
