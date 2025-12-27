import { ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import heroImage from '../assets/e36c99279b001e794c342b64cce041989d85e9a9.webp';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../content';

interface HeroProps {
  onExploreClick: () => void;
}

export function Hero({ onExploreClick }: HeroProps) {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const textRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const c = content[language];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 }); // Reset to far away position
  };

  const calculateScale = (letterIndex: number, totalLetters: number) => {
    if (!textRef.current) return 1;
    
    const letterWidth = textRef.current.offsetWidth / totalLetters;
    const letterCenterX = letterIndex * letterWidth + letterWidth / 2;
    const distance = Math.abs(mousePos.x - letterCenterX);
    
    // Adjust these values to control the effect
    const maxScale = 1.3; // Maximum scale
    const effectRadius = 100; // Radius of effect in pixels
    
    if (distance > effectRadius) return 1;
    
    const scale = 1 + ((maxScale - 1) * (1 - distance / effectRadius));
    return scale;
  };

  const text = 'BJØRN BLOM-JENSEN';
  const letters = text.split('');

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Landscape Architecture"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          style={{
            transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
            willChange: 'transform',
            filter: theme === 'light' ? 'invert(1)' : 'none',
          }}
        />
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/40' : 'bg-white/20'}`}></div>
      </div>

      {/* Content */}
      <div className={`relative h-full flex flex-col items-center justify-center text-center px-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        <button
          onClick={onExploreClick}
          className="cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={textRef}
            className="inline-flex"
            style={{ 
              fontFamily: 'Futura, "Century Gothic", "Trebuchet MS", Arial, sans-serif', 
              fontWeight: 600, 
              fontSize: 'clamp(1rem, 4vw, 1.75rem)', 
              letterSpacing: '0.15em',
              height: 'clamp(2.5rem, 8vw, 3.5rem)', // Fixed height to prevent layout shift
              alignItems: 'center',
            }}
          >
            {letters.map((letter, index) => (
              <span
                key={index}
                className="inline-block transition-transform duration-200 ease-out"
                style={{
                  transform: `scale(${calculateScale(index, letters.length)})`,
                  transformOrigin: 'center center',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </div>
        </button>
      </div>

      {/* Scroll Indicator - Clickable */}
      <button
        onClick={onExploreClick}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer hover:opacity-70 transition-opacity ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
        aria-label={c.hero.ariaScroll}
      >
        <div className="flex flex-col -space-y-2 hero-bounce-animation">
          <ChevronDown size={24} className="-mb-3" />
          <ChevronDown size={24} />
        </div>
      </button>
    </div>
  );
}