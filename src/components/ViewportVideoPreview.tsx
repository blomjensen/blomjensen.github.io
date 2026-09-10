import { useEffect, useRef, useState } from 'react';

export type VideoPlaybackPosition = {
  current: number;
};

type ViewportVideoPreviewProps = {
  src: string;
  poster?: string;
  playbackPosition?: VideoPlaybackPosition;
};

function restorePlaybackPosition(video: HTMLVideoElement, playbackPosition?: VideoPlaybackPosition) {
  if (!playbackPosition || !Number.isFinite(playbackPosition.current) || playbackPosition.current <= 0) return;

  const latestValidTime = Number.isFinite(video.duration) ? Math.max(video.duration - 0.05, 0) : playbackPosition.current;
  const nextTime = Math.min(playbackPosition.current, latestValidTime);
  if (Math.abs(video.currentTime - nextTime) > 0.35) video.currentTime = nextTime;
}

export function ViewportVideoPreview({ src, poster, playbackPosition }: ViewportVideoPreviewProps) {
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
            restorePlaybackPosition(video, playbackPosition);
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
  }, [playbackPosition]);

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
      onLoadedMetadata={(event) => restorePlaybackPosition(event.currentTarget, playbackPosition)}
      onTimeUpdate={(event) => {
        if (playbackPosition) playbackPosition.current = event.currentTarget.currentTime;
      }}
      onPause={(event) => {
        if (playbackPosition) playbackPosition.current = event.currentTarget.currentTime;
      }}
    />
  );
}
