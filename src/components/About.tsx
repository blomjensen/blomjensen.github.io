import aboutImage from '../assets/11641084856f4253f2024f07b07edcc8d4b7a88f.webp';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../content';

export function About() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const c = content[language];
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className={`py-20 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-40">
            <h2 className={`mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{c.about.title}</h2>
            <p className={`mb-4 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
              {c.about.p1}
            </p>
            <p className={`mb-4 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
              {c.about.p2}
            </p>
            <p className={theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}>
              {c.about.p3}
            </p>
          </div>
          <div className="relative z-40 h-96 rounded-lg overflow-hidden shadow-lg">
            <img
              src={aboutImage}
              alt="About Me"
              className="w-full object-cover"
              loading="lazy"
              decoding="async"
              style={{ 
                transform: `scaleX(-1) translateY(${parallaxOffset}%)`,
                willChange: 'transform',
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