import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';

const posterSrc = '/projects/transitions-portugal/poster.jpg';

type SequenceFigureProps = {
  videoSrc: string;
  alt: string;
  label: string;
  detail: string;
  playLabel: string;
  pauseLabel: string;
};

function SequenceFigure({
  videoSrc,
  alt,
  label,
  detail,
  playLabel,
  pauseLabel,
}: SequenceFigureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const attemptPlayback = () => {
    const video = videoRef.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Set these as DOM properties as well as JSX attributes: iOS is stricter
    // about muted, inline playback before it permits autoplay.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    void video.play().catch(() => setIsPlaying(false));
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMotionPreference = () => {
      if (reducedMotion.matches) {
        video.pause();
        return;
      }

      attemptPlayback();
    };

    applyMotionPreference();
    reducedMotion.addEventListener('change', applyMotionPreference);
    return () => reducedMotion.removeEventListener('change', applyMotionPreference);
  }, []);

  const handleToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  };

  return (
    <figure className="study-sequence">
      <div className="study-media">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          aria-label={alt}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          onLoadedData={attemptPlayback}
          onCanPlay={attemptPlayback}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        <button
          type="button"
          className="sequence-media-toggle"
          aria-label={`${isPlaying ? pauseLabel : playLabel}: ${label}`}
          aria-pressed={isPlaying}
          onClick={handleToggle}
        />
        <button
          type="button"
          className="sequence-control"
          aria-label={`${isPlaying ? pauseLabel : playLabel}: ${label}`}
          aria-pressed={isPlaying}
          onClick={handleToggle}
        >
          {isPlaying ? (
            <Pause size={18} fill="currentColor" strokeWidth={0} aria-hidden="true" />
          ) : (
            <Play size={18} fill="currentColor" strokeWidth={0} aria-hidden="true" />
          )}
        </button>
      </div>
      <figcaption>
        <strong>{label}</strong>
        <span>{detail}</span>
      </figcaption>
    </figure>
  );
}

export function Photography() {
  const { language } = useLanguage();
  const c = content[language].studies;
  const carouselRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [carouselProgress, setCarouselProgress] = useState<Record<string, { value: number; scrollable: boolean }>>({});
  const previousLabel = language === 'en' ? 'Show previous media' : 'Vis forrige medier';
  const nextLabel = language === 'en' ? 'Show next media' : 'Vis neste medier';
  const aquateketImages = [
    '/projects/aquateket/bolgete.webp',
    '/projects/aquateket/bolgete-3.webp',
    '/projects/aquateket/bolgete-4.webp',
    '/projects/aquateket/fossende.webp',
    '/projects/aquateket/fossende-4.webp',
    '/projects/aquateket/skummende.webp',
    '/projects/aquateket/skummende-3.webp',
    '/projects/aquateket/skummende-4.webp',
  ];

  const updateCarouselProgress = useCallback((carouselId: string, carousel: HTMLDivElement) => {
    const maximum = Math.max(carousel.scrollWidth - carousel.clientWidth, 0);
    const next = { value: maximum === 0 ? 0 : carousel.scrollLeft / maximum, scrollable: maximum > 2 };

    setCarouselProgress((current) => {
      const previous = current[carouselId];
      if (previous && Math.abs(previous.value - next.value) < 0.001 && previous.scrollable === next.scrollable) {
        return current;
      }
      return { ...current, [carouselId]: next };
    });
  }, []);

  useEffect(() => {
    const updateAll = () => {
      Object.entries(carouselRefs.current).forEach(([carouselId, carousel]) => {
        if (carousel) updateCarouselProgress(carouselId, carousel);
      });
    };

    updateAll();
    window.addEventListener('resize', updateAll);
    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateAll);
    Object.values(carouselRefs.current).forEach((carousel) => {
      if (!carousel || !resizeObserver) return;
      resizeObserver.observe(carousel);
      carousel.querySelectorAll('figure, img, video').forEach((element) => resizeObserver.observe(element));
    });

    return () => {
      window.removeEventListener('resize', updateAll);
      resizeObserver?.disconnect();
    };
  }, [updateCarouselProgress]);

  const scrollCarousel = (carouselId: string, direction: 1 | -1) => {
    const carousel = carouselRefs.current[carouselId];
    if (!carousel) return;

    const maximum = Math.max(carousel.scrollWidth - carousel.clientWidth, 0);
    const carouselLeft = carousel.getBoundingClientRect().left;
    const snapPoints = Array.from(
      new Set(
        Array.from(carousel.children)
          .filter((element): element is HTMLElement => element instanceof HTMLElement && element.tagName === 'FIGURE')
          .map((figure) =>
            Math.round(Math.min(Math.max(figure.getBoundingClientRect().left - carouselLeft + carousel.scrollLeft, 0), maximum))
          )
      )
    ).sort((left, right) => left - right);
    const current = carousel.scrollLeft;
    const target =
      direction === 1
        ? snapPoints.find((point) => point > current + 2) ?? maximum
        : [...snapPoints].reverse().find((point) => point < current - 2) ?? 0;

    carousel.scrollTo({ left: target, behavior: 'smooth' });
  };

  const renderCarouselControls = (carouselId: string) => {
    const indicator = carouselProgress[carouselId] ?? { value: 0, scrollable: false };

    return (
      <>
        {indicator.scrollable && indicator.value > 0.01 && (
          <button
            type="button"
            className="carousel-next carousel-previous"
            aria-label={previousLabel}
            onClick={() => scrollCarousel(carouselId, -1)}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
        )}
        {indicator.scrollable && indicator.value < 0.99 && (
          <button type="button" className="carousel-next" aria-label={nextLabel} onClick={() => scrollCarousel(carouselId, 1)}>
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        )}
      </>
    );
  };

  return (
    <section id="studies" className="studies-section" aria-labelledby="studies-heading">
      <div className="section-intro">
        <div>
          <p className="section-kicker">{c.kicker}</p>
          <h2 id="studies-heading" className="section-title">
            {c.title}
          </h2>
        </div>
        <p className="section-lead">{c.intro}</p>
      </div>

      <div className="study-tracks" aria-label={language === 'en' ? 'Study categories' : 'Studiekategorier'}>
        <span>{c.fieldworkLabel}</span>
        <span>{c.materialLabel}</span>
        <span>{c.workshopLabel}</span>
      </div>

      <article className="study-entry" aria-labelledby="transitions-heading">
        <header className="study-header">
          <div>
            <p className="project-category">{c.transitionsCategory}</p>
            <h3 id="transitions-heading">{c.projectTitle}</h3>
          </div>
          <p>{c.description}</p>
        </header>

        <div className="study-carousel">
          <div
            className="study-sequences is-carousel"
            aria-label={c.comparisonLabel}
            role="region"
            tabIndex={0}
            ref={(node) => {
              carouselRefs.current.transitions = node;
            }}
            onScroll={(event) => updateCarouselProgress('transitions', event.currentTarget)}
          >
            <SequenceFigure
              videoSrc="/projects/transitions-portugal/transitions-0.5fps.mp4"
              alt={c.slowAlt}
              label={c.slowLabel}
              detail={c.slowDetail}
              playLabel={c.play}
              pauseLabel={c.pause}
            />
            <SequenceFigure
              videoSrc="/projects/transitions-portugal/transitions-2fps.mp4"
              alt={c.fastAlt}
              label={c.fastLabel}
              detail={c.fastDetail}
              playLabel={c.play}
              pauseLabel={c.pause}
            />
          </div>
          {renderCarouselControls('transitions')}
        </div>
      </article>

      <article className="study-entry aquateket-entry" aria-labelledby="aquateket-heading">
        <header className="study-header">
          <div>
            <p className="project-category">{c.aquateketCategory}</p>
            <h3 id="aquateket-heading">{c.aquateketTitle}</h3>
          </div>
          <p>{c.aquateketDescription}</p>
        </header>

        <div className="study-carousel aquateket-carousel">
          <div
            className="aquateket-gallery"
            role="region"
            aria-label={language === 'en' ? 'Aquateket image carousel' : 'Aquateket bilderekke'}
            tabIndex={0}
            ref={(node) => {
              carouselRefs.current.aquateket = node;
            }}
            onScroll={(event) => updateCarouselProgress('aquateket', event.currentTarget)}
          >
            {aquateketImages.map((src, index) => {
              const image = c.aquateketImages[index];
              return (
                <figure key={src}>
                  <img src={src} alt={image.alt} loading="lazy" decoding="async" />
                  <figcaption>{image.label}</figcaption>
                </figure>
              );
            })}
          </div>
          {renderCarouselControls('aquateket')}
        </div>
      </article>
    </section>
  );
}
