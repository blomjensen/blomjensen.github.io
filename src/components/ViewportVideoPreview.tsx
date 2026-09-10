import { useEffect, useRef, useState } from 'react';

type ViewportVideoPreviewProps = {
  src: string;
  poster?: string;
};

export function ViewportVideoPreview({ src, poster }: ViewportVideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasLoadedRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reducedMotion || connection?.saveData) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasLoadedRef.current) {
            hasLoadedRef.current = true;
            setShouldLoad(true);
          } else {
            void video.play().catch(() => undefined);
          }
          return;
        }

        video.pause();
      },
      { threshold: 0.08 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      poster={poster}
      autoPlay={shouldLoad}
      loop
      muted
      playsInline
      preload={shouldLoad ? 'metadata' : 'none'}
      aria-hidden="true"
    />
  );
}
