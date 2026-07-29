import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
          data-umami-event="study_video_toggle"
          data-umami-event-study={label}
          data-umami-event-action={isPlaying ? 'pause' : 'play'}
        />
        <button
          type="button"
          className="sequence-control"
          aria-label={`${isPlaying ? pauseLabel : playLabel}: ${label}`}
          aria-pressed={isPlaying}
          onClick={handleToggle}
          data-umami-event="study_video_toggle"
          data-umami-event-study={label}
          data-umami-event-action={isPlaying ? 'pause' : 'play'}
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

        <div className="study-sequences" aria-label={c.comparisonLabel}>
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
      </article>

      <article className="study-entry aquateket-entry" aria-labelledby="aquateket-heading">
        <header className="study-header">
          <div>
            <p className="project-category">{c.aquateketCategory}</p>
            <h3 id="aquateket-heading">{c.aquateketTitle}</h3>
          </div>
          <p>{c.aquateketDescription}</p>
        </header>

        <div className="aquateket-gallery">
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
      </article>
    </section>
  );
}
