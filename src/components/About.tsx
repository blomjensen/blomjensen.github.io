import aboutImage from '../assets/11641084856f4253f2024f07b07edcc8d4b7a88f.webp';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../content';
import { useReducedEffects } from '../hooks/useReducedEffects';

export function About() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const c = content[language];
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceEffects = useReducedEffects();

  useEffect(() => {
    if (reduceEffects) {
      setParallaxOffset(0);
      return;
    }

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate center of the section
      const sectionCenter = sectionTop + sectionHeight / 2;
      
      // Start when section is 50% visible (center at bottom of viewport)
      // End when 50% has scrolled past (center at top of viewport)
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - sectionCenter) / windowHeight
      ));
      
      // Map progress to image translation (0% to -20% to show bottom of 120% height image)
      setParallaxOffset(scrollProgress * -20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reduceEffects]);

  return (
    <div
      ref={sectionRef}
      data-tone={theme}
      className={`py-20 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-40">
            <div className="section-header section-header--left">
              <p className="section-kicker">{language === 'no' ? 'Profil' : 'Profile'}</p>
              <h2 className="section-title">{c.about.title}</h2>
            </div>

            <div className="section-card">
              <p className="section-copy">{c.about.p1}</p>
              <p className="section-copy">{c.about.p2}</p>
              <p className="section-copy">{c.about.p3}</p>
            </div>
          </div>
          <div className="section-image-frame relative z-40 h-96">
            <img
              src={aboutImage}
              alt="Portrait of Bjorn Blom-Jensen"
              className="w-full object-cover"
              loading="eager"
              decoding="async"
              style={{ 
                transform: reduceEffects ? 'scaleX(-1)' : `scaleX(-1) translateY(${parallaxOffset}%)`,
                willChange: reduceEffects ? 'auto' : 'transform',
                height: '120%',
                marginTop: '0'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
