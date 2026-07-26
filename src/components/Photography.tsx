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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyMotionPreference = () => {
      if (reducedMotion.matches) {
        video.pause();
        return;
      }

      void video.play().catch(() => setIsPlaying(false));
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
          onCanPlay={() => {
            const video = videoRef.current;
            if (!video || !video.paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            void video.play().catch(() => setIsPlaying(false));
          }}
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
  const c = content[language].photography;

  return (
    <section id="photography" className="photography-section" aria-labelledby="photography-heading">
      <div className="section-intro">
        <div>
          <p className="section-kicker">{c.kicker}</p>
          <h2 id="photography-heading" className="section-title">
            {c.title}
          </h2>
        </div>
        <p className="section-lead">{c.intro}</p>
      </div>

      <article className="study-entry" aria-labelledby="transitions-heading">
        <header className="study-header">
          <div>
            <p className="project-category">{c.category}</p>
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
    </section>
  );
}
