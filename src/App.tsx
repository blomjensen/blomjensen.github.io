import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const { theme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      const sections = ['home', 'portfolio', 'about', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      // Clear hover state after scrolling (with small delay to allow mouse movement)
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setHoveredSection(null);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // NOTE: The original Figma export included a custom "elastic overscroll" effect.
  // It required non-passive scroll listeners (and extra CSS) and can reduce scroll performance,
  // especially on laptops with trackpads. Keeping native scrolling is usually the best choice.

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#313131]' : 'bg-gray-50'}`}>
      <Navigation 
        activeSection={activeSection}
        onNavigate={scrollToSection}
        hoveredSection={hoveredSection}
        onHover={setHoveredSection}
      />
      
      <main>
        <section 
          id="home"
          onMouseEnter={() => setHoveredSection('home')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <Hero onExploreClick={() => scrollToSection('portfolio')} />
        </section>
        
        <section 
          id="portfolio"
          onMouseEnter={() => setHoveredSection('portfolio')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <Portfolio />
        </section>
        
        <section 
          id="about"
          onMouseEnter={() => setHoveredSection('about')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <About />
        </section>
        
        <section 
          id="contact"
          onMouseEnter={() => setHoveredSection('contact')}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <Contact />
        </section>
      </main>
      
      <footer className={`${theme === 'dark' ? 'bg-black text-white border-white/10' : 'bg-white text-gray-900 border-gray-200'} py-8 border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}>
            © {new Date().getFullYear()} Bjørn Blom-Jensen. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}