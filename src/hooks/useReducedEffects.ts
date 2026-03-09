import { useEffect, useState } from 'react';

function getShouldReduceEffects() {
  if (typeof window === 'undefined') return false;

  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 767px)').matches
  );
}

export function useReducedEffects() {
  const [shouldReduceEffects, setShouldReduceEffects] = useState(getShouldReduceEffects);

  useEffect(() => {
    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(pointer: coarse)'),
      window.matchMedia('(max-width: 767px)'),
    ];

    const update = () => {
      setShouldReduceEffects(mediaQueries.some((query) => query.matches));
    };

    update();
    mediaQueries.forEach((query) => query.addEventListener('change', update));

    return () => {
      mediaQueries.forEach((query) => query.removeEventListener('change', update));
    };
  }, []);

  return shouldReduceEffects;
}
