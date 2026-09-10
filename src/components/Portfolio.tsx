import { ChevronLeft, ChevronRight, Maximize2, Minus, Pause, Play, Plus, X } from 'lucide-react';
import {
  type WheelEvent as ReactWheelEvent,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';
import { projects, type Project, type ProjectImage, type ProjectVideo } from '../data/projects';
import { ViewportVideoPreview, type VideoPlaybackPosition } from './ViewportVideoPreview';
import './ProjectVideo.css';

const ProjectModelViewer = lazy(() =>
  import('./ProjectModelViewer').then((module) => ({ default: module.ProjectModelViewer })),
);

const labels = {
  en: {
    kicker: 'Project index',
    projectType: 'Project case',
    open: 'Open case',
    close: 'Close case',
    featured: 'Featured image',
    closeImage: 'Close case by selecting the image',
    zoomImage: 'Open image gallery',
    closeGallery: 'Close image gallery',
    previousImage: 'Previous image',
    nextImage: 'Next image',
    previousImages: 'Show previous images',
    nextImages: 'Show next images',
    supporting: 'Supporting material',
    interactiveModel: 'Interactive model',
    loadingModel: 'Loading interactive model…',
    playVideo: 'Play video',
    pauseVideo: 'Pause video',
    playImages: 'Play image sequence',
    stillImage: 'Show still image',
  },
  no: {
    kicker: 'Prosjektoversikt',
    projectType: 'Prosjektcase',
    open: 'Åpne case',
    close: 'Lukk case',
    featured: 'Hovedbilde',
    closeImage: 'Lukk case ved å velge bildet',
    zoomImage: 'Åpne bildegalleri',
    closeGallery: 'Lukk bildegalleri',
    previousImage: 'Forrige bilde',
    nextImage: 'Neste bilde',
    previousImages: 'Vis forrige bilder',
    nextImages: 'Vis neste bilder',
    supporting: 'Støttemateriale',
    interactiveModel: 'Interaktiv modell',
    loadingModel: 'Laster interaktiv modell…',
    playVideo: 'Spill av video',
    pauseVideo: 'Pause video',
    playImages: 'Spill av bildesekvens',
    stillImage: 'Vis stillbilde',
  },
} as const;

function ProjectVideoFigure({
  video,
  language,
  playLabel,
  pauseLabel,
  playbackPosition,
}: {
  video: ProjectVideo;
  language: 'en' | 'no';
  playLabel: string;
  pauseLabel: string;
  playbackPosition: VideoPlaybackPosition;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const caption = video.caption?.[language];

  const restorePosition = useCallback(() => {
    const element = videoRef.current;
    if (!element || !Number.isFinite(playbackPosition.current) || playbackPosition.current <= 0) return;

    const latestValidTime = Number.isFinite(element.duration)
      ? Math.max(element.duration - 0.05, 0)
      : playbackPosition.current;
    const nextTime = Math.min(playbackPosition.current, latestValidTime);
    if (Math.abs(element.currentTime - nextTime) > 0.35) element.currentTime = nextTime;
  }, [playbackPosition]);

  const attemptPlayback = useCallback(() => {
    const element = videoRef.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    restorePosition();
    element.muted = true;
    element.defaultMuted = true;
    element.playsInline = true;
    void element.play().catch(() => setIsPlaying(false));
  }, [restorePosition]);

  useEffect(() => {
    attemptPlayback();
    return () => {
      const element = videoRef.current;
      if (element) playbackPosition.current = element.currentTime;
    };
  }, [attemptPlayback, playbackPosition]);

  const handleToggle = () => {
    const element = videoRef.current;
    if (!element) return;

    if (element.paused) {
      void element.play().catch(() => setIsPlaying(false));
    } else {
      element.pause();
    }
  };

  const controlLabel = `${isPlaying ? pauseLabel : playLabel}${caption ? `: ${caption}` : ''}`;

  return (
    <figure className="project-video">
      <div className="project-video-media">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-label={caption}
          onLoadedMetadata={restorePosition}
          onLoadedData={attemptPlayback}
          onCanPlay={attemptPlayback}
          onPlay={() => setIsPlaying(true)}
          onPause={(event) => {
            playbackPosition.current = event.currentTarget.currentTime;
            setIsPlaying(false);
          }}
          onTimeUpdate={(event) => {
            playbackPosition.current = event.currentTarget.currentTime;
          }}
        />
        <button
          type="button"
          className="sequence-media-toggle"
          aria-label={controlLabel}
          aria-pressed={isPlaying}
          onClick={handleToggle}
        />
        <button
          type="button"
          className="sequence-control"
          aria-label={controlLabel}
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
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function getAlt(project: Project, language: 'en' | 'no', caption?: string) {
  return caption ? `${project.title[language]} - ${caption}` : project.title[language];
}

function getProjectImages(project: Project) {
  return [
    ...project.images,
    ...(project.processImages ?? []),
    ...(project.imageRows?.flatMap((row) => row.images) ?? []),
  ];
}

function getCarouselSnapPoints(carousel: HTMLDivElement) {
  const maximum = Math.max(carousel.scrollWidth - carousel.clientWidth, 0);
  const carouselLeft = carousel.getBoundingClientRect().left;

  return Array.from(
    new Set(
      Array.from(carousel.children)
        .filter(
          (element): element is HTMLElement =>
            element instanceof HTMLElement && element.tagName === 'FIGURE',
        )
        .map((figure) =>
          Math.round(
            Math.min(
              Math.max(
                figure.getBoundingClientRect().left - carouselLeft + carousel.scrollLeft,
                0,
              ),
              maximum,
            ),
          ),
        ),
    ),
  ).sort((left, right) => left - right);
}

function getClosestSnapIndex(snapPoints: number[], scrollLeft: number) {
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  snapPoints.forEach((point, index) => {
    const distance = Math.abs(point - scrollLeft);
    if (distance >= closestDistance) return;
    closestDistance = distance;
    closestIndex = index;
  });

  return closestIndex;
}

export function Portfolio() {
  const { language } = useLanguage();
  const c = content[language];
  const copy = labels[language];
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [gallery, setGallery] = useState<{ projectId: number; imageIndex: number } | null>(null);
  const [autoplayImages] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [imagePlayback, setImagePlayback] = useState<Record<string, boolean>>({});
  const projectRefs = useRef<Record<number, HTMLElement | null>>({});
  const positionLockRef = useRef<{ projectId: number; top: number } | null>(null);
  const pendingProjectFocusRef = useRef<number | null>(null);
  const videoPlaybackPositions = useRef<Record<string, VideoPlaybackPosition>>({});
  const galleryTouchStartX = useRef<number | null>(null);
  const galleryHasSwiped = useRef(false);
  const galleryWheelDelta = useRef(0);
  const galleryWheelLocked = useRef(false);
  const galleryWheelIdle = useRef<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryTouchStart = useRef<{ x: number; y: number } | null>(null);
  const suppressGalleryCloseUntil = useRef(0);
  const carouselTouchStart = useRef<{
    x: number;
    y: number;
    moved: boolean;
    snapIndex: number;
  } | null>(null);
  const suppressCarouselImageOpen = useRef(false);
  const carouselRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [isCompactViewport, setIsCompactViewport] = useState(() =>
    window.matchMedia('(max-width: 860px)').matches,
  );
  const [carouselIndicators, setCarouselIndicators] = useState<
    Record<string, { progress: number; thumb: number; isScrollable: boolean }>
  >({});

  const galleryProject = gallery ? projects.find((project) => project.id === gallery.projectId) : null;
  const galleryImages = galleryProject ? getProjectImages(galleryProject) : [];
  const galleryImage = gallery ? galleryImages[gallery.imageIndex] : null;

  const isImagePlaying = (image: ProjectImage) => Boolean(image.animationSrc && (imagePlayback[image.src] ?? autoplayImages));
  const imageSource = (image: ProjectImage) => (isImagePlaying(image) ? image.animationSrc! : image.src);
  const renderImagePlayback = (image: ProjectImage) => {
    if (!image.animationSrc) return null;
    const playing = isImagePlaying(image);
    const label = `${playing ? copy.stillImage : copy.playImages}: ${image.caption?.[language] ?? ''}`;

    return (
      <button
        type="button"
        className="project-image-playback"
        aria-label={label}
        aria-pressed={playing}
        title={playing ? copy.stillImage : copy.playImages}
        onClick={(event) => {
          event.stopPropagation();
          setImagePlayback((current) => ({ ...current, [image.src]: !playing }));
        }}
      >
        {playing ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
      </button>
    );
  };

  const updateCarouselIndicator = useCallback((carouselId: string, node: HTMLDivElement) => {
    const maximum = Math.max(node.scrollWidth - node.clientWidth, 0);
    const next = {
      progress: maximum === 0 ? 0 : node.scrollLeft / maximum,
      thumb: node.scrollWidth === 0 ? 1 : Math.min(node.clientWidth / node.scrollWidth, 1),
      isScrollable: maximum > 2,
    };

    setCarouselIndicators((current) => {
      const previous = current[carouselId];
      if (
        previous &&
        Math.abs(previous.progress - next.progress) < 0.001 &&
        Math.abs(previous.thumb - next.thumb) < 0.001 &&
        previous.isScrollable === next.isScrollable
      ) {
        return current;
      }
      return { ...current, [carouselId]: next };
    });
  }, []);

  const updateAllCarouselIndicators = useCallback(() => {
    Object.entries(carouselRefs.current).forEach(([carouselId, node]) => {
      if (node) updateCarouselIndicator(carouselId, node);
    });
  }, [updateCarouselIndicator]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 860px)');
    const updateViewport = () => setIsCompactViewport(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateViewport);
    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  useEffect(() => {
    if (expandedProjectId === null) return;

    updateAllCarouselIndicators();
    window.addEventListener('resize', updateAllCarouselIndicators);

    const resizeObserver =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateAllCarouselIndicators);

    Object.values(carouselRefs.current).forEach((node) => {
      if (!node || !resizeObserver) return;
      resizeObserver.observe(node);
      node.querySelectorAll('figure, img').forEach((element) => resizeObserver.observe(element));
    });

    return () => {
      window.removeEventListener('resize', updateAllCarouselIndicators);
      resizeObserver?.disconnect();
    };
  }, [expandedProjectId, updateAllCarouselIndicators]);

  const scrollCarousel = (carouselId: string, direction: 1 | -1) => {
    const carousel = carouselRefs.current[carouselId];
    if (!carousel) return;

    const maximum = Math.max(carousel.scrollWidth - carousel.clientWidth, 0);
    const snapPoints = getCarouselSnapPoints(carousel);
    const current = carousel.scrollLeft;
    const target =
      direction === 1
        ? snapPoints.find((point) => point > current + 2) ?? maximum
        : [...snapPoints].reverse().find((point) => point < current - 2) ?? 0;

    carousel.scrollTo({ left: target, behavior: 'smooth' });
  };

  const handleCarouselWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

    const carousel = event.currentTarget;
    const maximum = carousel.scrollWidth - carousel.clientWidth;
    const leavingAtStart = event.deltaX < 0 && carousel.scrollLeft <= 0;
    const leavingAtEnd = event.deltaX > 0 && carousel.scrollLeft >= maximum;

    if (leavingAtStart || leavingAtEnd) event.preventDefault();
  };

  const handleCarouselTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;

    const carousel = event.currentTarget;
    const snapPoints = getCarouselSnapPoints(carousel);
    carouselTouchStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      moved: false,
      snapIndex: getClosestSnapIndex(snapPoints, carousel.scrollLeft),
    };
    suppressCarouselImageOpen.current = false;
  };

  const handleCarouselTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = carouselTouchStart.current;
    const touch = event.touches[0];
    if (!start || !touch) return;

    const horizontalDistance = touch.clientX - start.x;
    const verticalDistance = touch.clientY - start.y;
    if (Math.hypot(horizontalDistance, verticalDistance) > 8) {
      start.moved = true;
      suppressCarouselImageOpen.current = true;
    }

    if (Math.abs(horizontalDistance) < 4 || Math.abs(horizontalDistance) <= Math.abs(verticalDistance)) return;

    const carousel = event.currentTarget;
    const maximum = carousel.scrollWidth - carousel.clientWidth;
    const pullingPastStart = horizontalDistance > 0 && carousel.scrollLeft <= 1;
    const pullingPastEnd = horizontalDistance < 0 && carousel.scrollLeft >= maximum - 1;

    if (pullingPastStart || pullingPastEnd) event.preventDefault();
  };

  const handleCarouselTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = carouselTouchStart.current;
    const touch = event.changedTouches[0];

    if (start && touch) {
      const horizontalDistance = touch.clientX - start.x;
      const verticalDistance = touch.clientY - start.y;
      const isHorizontalSwipe =
        Math.abs(horizontalDistance) >= 42 &&
        Math.abs(horizontalDistance) > Math.abs(verticalDistance);

      if (isHorizontalSwipe) {
        const carousel = event.currentTarget;
        const snapPoints = getCarouselSnapPoints(carousel);
        const direction = horizontalDistance < 0 ? 1 : -1;
        const targetIndex = Math.min(
          Math.max(start.snapIndex + direction, 0),
          Math.max(snapPoints.length - 1, 0),
        );
        const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth';
        carousel.scrollTo({ left: snapPoints[targetIndex] ?? 0, behavior });
      }
    }

    carouselTouchStart.current = null;
    window.setTimeout(() => {
      suppressCarouselImageOpen.current = false;
    }, 0);
  };

  const handleCarouselTouchCancel = () => {
    carouselTouchStart.current = null;
    window.setTimeout(() => {
      suppressCarouselImageOpen.current = false;
    }, 0);
  };

  const openCarouselImage = (projectId: number, imageIndex: number) => {
    if (suppressCarouselImageOpen.current) return;
    showGalleryImage(projectId, imageIndex);
  };

  const renderCarouselControls = (carouselId: string) => {
    const indicator = carouselIndicators[carouselId] ?? { progress: 0, thumb: 1, isScrollable: false };
    const left = indicator.progress * (1 - indicator.thumb) * 100;
    const canGoBack = indicator.isScrollable && indicator.progress > 0.01;
    const canGoForward = indicator.isScrollable && indicator.progress < 0.99;

    return (
      <>
        {canGoBack && (
          <button
            type="button"
            className="carousel-next carousel-previous"
            aria-label={copy.previousImages}
            onClick={() => scrollCarousel(carouselId, -1)}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
        )}
        {canGoForward && (
          <button
            type="button"
            className="carousel-next"
            aria-label={copy.nextImages}
            onClick={() => scrollCarousel(carouselId, 1)}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        )}
        {indicator.isScrollable && (
          <div className="carousel-progress" aria-hidden="true">
            <span style={{ width: `${indicator.thumb * 100}%`, left: `${left}%` }} />
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    if (!gallery) return;

    // Siden scroller i .page-panel--portfolio, ikke i body - a lase body
    // gjorde ingenting.
    const panel = document.querySelector<HTMLElement>('.page-panel--portfolio');
    const previousOverflow = panel?.style.overflow ?? '';
    const previousBodyOverflow = document.body.style.overflow;
    const usesDocumentScroll = window.matchMedia('(max-width: 860px)').matches;
    const preventBrowserNavigation = (event: TouchEvent) => {
      if (event.touches.length === 1) event.preventDefault();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setGallery(null);
      if (event.key === 'ArrowLeft') {
        setGallery((current) =>
          current ? { ...current, imageIndex: (current.imageIndex - 1 + galleryImages.length) % galleryImages.length } : null
        );
      }
      if (event.key === 'ArrowRight') {
        setGallery((current) => current ? { ...current, imageIndex: (current.imageIndex + 1) % galleryImages.length } : null);
      }
    };

    const galleryNode = galleryRef.current;

    if (panel) panel.style.overflow = 'hidden';
    if (usesDocumentScroll) document.body.style.overflow = 'hidden';
    galleryNode?.addEventListener('touchmove', preventBrowserNavigation, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      if (panel) panel.style.overflow = previousOverflow;
      if (usesDocumentScroll) document.body.style.overflow = previousBodyOverflow;
      galleryNode?.removeEventListener('touchmove', preventBrowserNavigation);
      if (galleryWheelIdle.current !== null) window.clearTimeout(galleryWheelIdle.current);
      galleryWheelIdle.current = null;
      galleryWheelLocked.current = false;
      galleryWheelDelta.current = 0;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [gallery, galleryImages.length]);

  useLayoutEffect(() => {
    const positionLock = positionLockRef.current;
    if (positionLock) {
      const target = projectRefs.current[positionLock.projectId];
      positionLockRef.current = null;

      if (target) {
        const offset = target.getBoundingClientRect().top - positionLock.top;
        if (Math.abs(offset) >= 1) {
          const panel = document.querySelector<HTMLElement>('.page-panel--portfolio');
          const root = document.documentElement;
          const previousScrollBehavior = root.style.scrollBehavior;
          root.style.scrollBehavior = 'auto';
          if (window.matchMedia('(max-width: 860px)').matches) window.scrollBy(0, offset);
          else panel?.scrollBy({ top: offset, behavior: 'auto' });
          root.style.scrollBehavior = previousScrollBehavior;
        }
      }
    }

    const focusProjectId = pendingProjectFocusRef.current;
    if (focusProjectId === null) return;
    pendingProjectFocusRef.current = null;

    const animationFrame = window.requestAnimationFrame(() => {
      const project = projectRefs.current[focusProjectId];
      if (!project) return;

      const compactViewport = window.matchMedia('(max-width: 860px)').matches;
      const media = compactViewport
        ? project.querySelector<HTMLElement>('.project-thumb')
        : project.querySelector<HTMLElement>('.project-video, .project-main-image') ??
          project.querySelector<HTMLElement>('.project-thumb');
      const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth';
      media?.scrollIntoView({ behavior, block: 'start' });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [expandedProjectId]);

  const scrollProjectIntoView = (projectId: number, behavior: ScrollBehavior) => {
    projectRefs.current[projectId]?.scrollIntoView({ behavior, block: 'start' });
  };

  const handleToggle = (projectId: number) => {
    const currentProjectId = expandedProjectId;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scrollBehavior: ScrollBehavior = reducedMotion ? 'auto' : 'smooth';

    if (currentProjectId === projectId) {
      setExpandedProjectId(null);
      window.requestAnimationFrame(() => scrollProjectIntoView(projectId, scrollBehavior));
      return;
    }

    if (currentProjectId === null) {
      pendingProjectFocusRef.current = projectId;
      setExpandedProjectId(projectId);
      return;
    }

    const target = projectRefs.current[projectId];
    if (target) {
      positionLockRef.current = {
        projectId,
        top: target.getBoundingClientRect().top,
      };
    }

    pendingProjectFocusRef.current = projectId;
    setExpandedProjectId(projectId);
  };

  const showGalleryImage = (projectId: number, imageIndex: number) => {
    setGallery({ projectId, imageIndex });
  };

  const moveGallery = (direction: -1 | 1) => {
    setGallery((current) => {
      if (!current) return null;
      const imageCount = getProjectImages(projects.find((project) => project.id === current.projectId)!).length;
      return { ...current, imageIndex: (current.imageIndex + direction + imageCount) % imageCount };
    });
  };

  const handleGalleryTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    galleryTouchStartX.current = touch?.clientX ?? null;
    galleryTouchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
    galleryHasSwiped.current = false;
  };

  const handleGalleryTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = galleryTouchStart.current;
    const touch = event.touches[0];
    if (!start || !touch) return;

    if (Math.hypot(touch.clientX - start.x, touch.clientY - start.y) > 8) {
      suppressGalleryCloseUntil.current = performance.now() + 500;
    }
  };

  const handleGalleryTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = galleryTouchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    galleryTouchStartX.current = null;
    galleryTouchStart.current = null;

    if (startX === null || endX === undefined) return;

    const delta = endX - startX;
    if (Math.abs(delta) < 42) return;

    galleryHasSwiped.current = true;
    suppressGalleryCloseUntil.current = performance.now() + 500;
    moveGallery(delta < 0 ? 1 : -1);
  };

  // To fingre pa en styreflate sender wheel-events, ikke touch, sa sveip
  // fungerte bare pa skjerm. Vi teller opp horisontal delta og bytter bilde
  // en gang per gest - uten det ville en enkelt sveip hoppet mange bilder.
  // Ingen preventDefault her: React fester wheel passivt, og det er
  // overscroll-behavior-x i CSS som hindrer nettleserens tilbake-gest.
  const handleGalleryWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

    if (galleryWheelIdle.current !== null) window.clearTimeout(galleryWheelIdle.current);
    galleryWheelIdle.current = window.setTimeout(() => {
      galleryWheelLocked.current = false;
      galleryWheelDelta.current = 0;
    }, 220);

    if (galleryWheelLocked.current) return;

    galleryWheelDelta.current += event.deltaX;
    if (Math.abs(galleryWheelDelta.current) < 60) return;

    moveGallery(galleryWheelDelta.current > 0 ? 1 : -1);
    galleryWheelLocked.current = true;
    galleryWheelDelta.current = 0;
  };

  return (
    <section id="portfolio" className="portfolio-section" aria-labelledby="portfolio-heading">
      <div className="section-intro">
        <div>
          <p className="section-kicker">{copy.kicker}</p>
          <h2 id="portfolio-heading" className="section-title">
            {c.portfolio.title}
          </h2>
        </div>
        <p className="section-lead">{c.portfolio.projectsIntro}</p>
      </div>

      <div className="project-index">
        {projects.map((project, index) => {
          const isOpen = expandedProjectId === project.id;
          const titleId = `project-${project.id}-title`;
          const actionLabel = `${isOpen ? copy.close : copy.open}: ${project.title[language]}`;
          const primaryImage = project.images[0];
          const primaryCaption = primaryImage?.caption?.[language];
          const secondaryImages = [
            ...(project.video ? project.images : project.images.slice(1)),
            ...(project.processImages ?? []),
          ];
          const secondaryIsCarousel = secondaryImages.length >= 3;
          const secondaryCarouselId = `project-${project.id}-secondary`;
          const secondaryImageStartIndex = project.video ? 0 : 1;
          const imageRowStartIndex = secondaryImageStartIndex + secondaryImages.length;
          let videoPlaybackPosition: VideoPlaybackPosition | undefined;

          if (project.video) {
            videoPlaybackPosition = videoPlaybackPositions.current[project.video.src];
            if (!videoPlaybackPosition) {
              videoPlaybackPosition = { current: 0 };
              videoPlaybackPositions.current[project.video.src] = videoPlaybackPosition;
            }
          }

          return (
            <article
              className={`project-entry ${isOpen ? 'is-open' : ''}`}
              key={project.id}
              aria-labelledby={titleId}
              ref={(node) => {
                projectRefs.current[project.id] = node;
              }}
            >
              <button
                type="button"
                className="project-summary"
                aria-label={actionLabel}
                aria-expanded={isOpen}
                aria-controls={`project-${project.id}-detail`}
                data-umami-event={isOpen ? undefined : 'project-case-open'}
                data-umami-event-project={isOpen ? undefined : project.title.en}
                onClick={() => handleToggle(project.id)}
              >
                <span className="project-number">{String(index + 1).padStart(2, '0')}</span>

                {project.video ? (
                  <span className="project-thumb project-thumb-video">
                    <ViewportVideoPreview
                      src={project.video.src}
                      poster={project.video.poster}
                      playbackPosition={videoPlaybackPosition}
                    />
                  </span>
                ) : primaryImage ? (
                  <span className={`project-thumb${primaryImage.fit === 'dark-contain' ? ' is-dark-contained' : ''}`}>
                    <img src={primaryImage.src} alt={getAlt(project, language, primaryCaption)} loading="lazy" />
                  </span>
                ) : null}

                <span className="project-summary-copy">
                  <span className="project-category">{project.category[language]}</span>
                  <strong id={titleId}>{project.title[language]}</strong>
                  <span>{project.description[language]}</span>
                </span>

                <span className="project-toggle">
                  {isOpen ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
                </span>
              </button>

              {isOpen && (
                <div className="project-detail" id={`project-${project.id}-detail`}>
                  {project.video && !isCompactViewport && (
                    <ProjectVideoFigure
                      video={project.video}
                      language={language}
                      playLabel={copy.playVideo}
                      pauseLabel={copy.pauseVideo}
                      playbackPosition={videoPlaybackPosition!}
                    />
                  )}

                  {primaryImage && !project.video && !isCompactViewport && (
                    <figure className={`project-main-image${primaryImage.fit === 'dark-contain' ? ' is-dark-contained' : ''}`}>
                      <div className="project-image-media">
                        <button
                          type="button"
                          className="project-main-image-button"
                          aria-label={`${copy.closeImage}: ${project.title[language]}`}
                          onClick={() => handleToggle(project.id)}
                        >
                          <img src={primaryImage.src} alt={getAlt(project, language, primaryCaption)} loading="eager" />
                        </button>
                        <button
                          type="button"
                          className="project-image-zoom"
                          aria-label={`${copy.zoomImage}: ${project.title[language]}`}
                          data-umami-event="project-image-open"
                          data-umami-event-project={project.title.en}
                          onClick={() => showGalleryImage(project.id, 0)}
                        >
                          <Maximize2 size={18} aria-hidden="true" />
                        </button>
                      </div>
                      <figcaption>{primaryCaption ?? copy.featured}</figcaption>
                    </figure>
                  )}

                  <div className="project-detail-copy">
                    <p className="detail-label">{copy.projectType}</p>
                    <p>{project.fullDescription[language]}</p>

                    <dl className="project-meta-list">
                      {project.facts.map((fact) => (
                        <div key={fact.label.en}>
                          <dt>{fact.label[language]}</dt>
                          <dd>{fact.value[language]}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  {project.modelViewers?.map((modelViewer) => (
                    <figure className="project-model-viewer" key={modelViewer.modelSrc}>
                      <div className="project-model-viewer-frame">
                        <Suspense fallback={<div className="project-model-loading" role="status">{copy.loadingModel}</div>}>
                          <ProjectModelViewer
                            src={modelViewer.modelSrc}
                            title={modelViewer.title[language]}
                          />
                        </Suspense>
                      </div>
                      <figcaption>
                        <span className="detail-label">{copy.interactiveModel}</span>
                        {modelViewer.caption?.[language] ?? modelViewer.title[language]}
                      </figcaption>
                    </figure>
                  ))}

                  {secondaryImages.length > 0 && (
                    <div className={secondaryIsCarousel ? 'image-carousel' : 'image-row'}>
                      <div
                        className={`supporting-images ${secondaryIsCarousel ? 'is-carousel is-secondary-carousel' : ''}`}
                        aria-label={copy.supporting}
                        role={secondaryIsCarousel ? 'region' : undefined}
                        tabIndex={secondaryIsCarousel ? 0 : undefined}
                        ref={(node) => {
                          carouselRefs.current[secondaryCarouselId] = node;
                        }}
                        onScroll={(event) => updateCarouselIndicator(secondaryCarouselId, event.currentTarget)}
                        onWheel={handleCarouselWheel}
                        onTouchStart={handleCarouselTouchStart}
                        onTouchMove={handleCarouselTouchMove}
                        onTouchEnd={handleCarouselTouchEnd}
                        onTouchCancel={handleCarouselTouchCancel}
                      >
                        {secondaryImages.map((image, imageIndex) => {
                          const caption = image.caption?.[language];

                          return (
                            <figure
                              className={
                                image.fit === 'contain'
                                  ? 'is-contained'
                                  : image.fit === 'wide'
                                    ? 'is-wide'
                                  : image.fit === 'dark-contain'
                                    ? 'is-dark-contained'
                                    : undefined
                              }
                              key={`${project.id}-${image.src}`}
                            >
                              <div className="project-image-media">
                                <button
                                  type="button"
                                  className="project-carousel-image-button"
                                  aria-label={`${copy.zoomImage}: ${project.title[language]}`}
                                  data-umami-event="project-image-open"
                                  data-umami-event-project={project.title.en}
                                  onClick={() => openCarouselImage(project.id, secondaryImageStartIndex + imageIndex)}
                                >
                                  <img src={imageSource(image)} alt={getAlt(project, language, caption)} loading="lazy" />
                                </button>
                                {renderImagePlayback(image)}
                                <button
                                  type="button"
                                  className="project-image-zoom"
                                  aria-label={`${copy.zoomImage}: ${project.title[language]}`}
                                  data-umami-event="project-image-open"
                                  data-umami-event-project={project.title.en}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    openCarouselImage(project.id, secondaryImageStartIndex + imageIndex);
                                  }}
                                >
                                  <Maximize2 size={18} aria-hidden="true" />
                                </button>
                              </div>
                              {caption && <figcaption>{caption}</figcaption>}
                            </figure>
                          );
                        })}
                      </div>
                      {secondaryIsCarousel && renderCarouselControls(secondaryCarouselId)}
                    </div>
                  )}

                  {project.imageRows?.map((row, rowIndex) => {
                    const rowIsCarousel = row.carousel ?? row.images.length >= 3;
                    const rowCarouselId = `project-${project.id}-row-${rowIndex}`;

                    return (
                      <div className={rowIsCarousel ? 'image-carousel' : 'image-row'} key={rowCarouselId}>
                        {row.title && (
                          <div className="project-image-row-heading">
                            <h3>{row.title[language]}</h3>
                            {row.subtitle && <p>{row.subtitle[language]}</p>}
                          </div>
                        )}
                        {row.quote && (
                          <blockquote className="project-field-quote">
                            <p>«{row.quote.text[language]}»</p>
                            <footer>{row.quote.attribution[language]}</footer>
                          </blockquote>
                        )}
                        <div className="project-image-row-media">
                          <div
                            className={[
                              'supporting-images',
                              rowIsCarousel ? 'is-carousel' : '',
                              row.columns === 1 ? 'is-one-column' : '',
                              row.columns === 3 ? 'is-three-column' : '',
                              row.columns === 4 ? 'is-four-column' : '',
                              row.compact ? 'is-compact-carousel' : '',
                              row.naturalAspect ? 'uses-natural-aspect' : '',
                              row.matchHorizontalHeight ? 'uses-matched-horizontal-height' : '',
                              row.uniformAspect === 'portrait' ? 'uses-portrait-crop' : '',
                            ]
                              .filter(Boolean)
                              .join(' ')}
                            aria-label={row.title?.[language] ?? copy.supporting}
                            role={rowIsCarousel ? 'region' : undefined}
                            tabIndex={rowIsCarousel ? 0 : undefined}
                            ref={(node) => {
                              carouselRefs.current[rowCarouselId] = node;
                            }}
                            onScroll={(event) => updateCarouselIndicator(rowCarouselId, event.currentTarget)}
                            onWheel={handleCarouselWheel}
                            onTouchStart={handleCarouselTouchStart}
                            onTouchMove={handleCarouselTouchMove}
                            onTouchEnd={handleCarouselTouchEnd}
                            onTouchCancel={handleCarouselTouchCancel}
                          >
                            {row.images.map((image, imageIndex) => {
                              const caption = image.caption?.[language];
                              const previousRowImageCount = (project.imageRows ?? [])
                                .slice(0, rowIndex)
                                .reduce((count, previousRow) => count + previousRow.images.length, 0);

                              return (
                                <figure
                                  className={
                                    image.fit === 'contain'
                                      ? 'is-contained'
                                      : image.fit === 'wide'
                                        ? 'is-wide'
                                        : image.fit === 'dark-contain'
                                        ? 'is-dark-contained'
                                        : undefined
                                  }
                                  key={`${project.id}-${rowIndex}-${image.src}`}
                                >
                                  <div className="project-image-media">
                                    <button
                                      type="button"
                                      className="project-carousel-image-button"
                                      aria-label={`${copy.zoomImage}: ${project.title[language]}`}
                                      data-umami-event="project-image-open"
                                      data-umami-event-project={project.title.en}
                                      onClick={() =>
                                        openCarouselImage(project.id, imageRowStartIndex + previousRowImageCount + imageIndex)
                                      }
                                    >
                                      <img src={imageSource(image)} alt={getAlt(project, language, caption)} loading="lazy" />
                                    </button>
                                    {renderImagePlayback(image)}
                                    <button
                                      type="button"
                                      className="project-image-zoom"
                                      aria-label={`${copy.zoomImage}: ${project.title[language]}`}
                                      data-umami-event="project-image-open"
                                      data-umami-event-project={project.title.en}
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        openCarouselImage(project.id, imageRowStartIndex + previousRowImageCount + imageIndex);
                                      }}
                                    >
                                      <Maximize2 size={18} aria-hidden="true" />
                                    </button>
                                  </div>
                                  {caption && <figcaption>{caption}</figcaption>}
                                </figure>
                              );
                            })}
                          </div>
                          {rowIsCarousel && renderCarouselControls(rowCarouselId)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {gallery &&
        galleryProject &&
        galleryImage &&
        // Portal til <body>: .site-canvas har transform + will-change, og en
        // transformert forelder blir containing block for position: fixed.
        // Inne i den ble inset:0 lik canvasets bredde - 200 % av viewporten.
        createPortal(
        <div
          ref={galleryRef}
          className="project-gallery"
          role="dialog"
          aria-modal="true"
          aria-label={galleryProject.title[language]}
          onTouchStart={handleGalleryTouchStart}
          onTouchMove={handleGalleryTouchMove}
          onTouchEnd={handleGalleryTouchEnd}
          onWheel={handleGalleryWheel}
        >
          <button type="button" className="project-gallery-close" onClick={() => setGallery(null)} aria-label={copy.closeGallery}>
            <X size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="project-gallery-image"
            aria-label={copy.closeGallery}
            onClick={() => {
              if (galleryHasSwiped.current || performance.now() < suppressGalleryCloseUntil.current) {
                galleryHasSwiped.current = false;
                return;
              }

              setGallery(null);
            }}
          >
            <img
              src={imageSource(galleryImage)}
              alt={getAlt(galleryProject, language, galleryImage.caption?.[language])}
              decoding="async"
            />
          </button>

          {renderImagePlayback(galleryImage)}

          {galleryImages.length > 1 && (
            <>
              <button type="button" className="project-gallery-nav is-previous" onClick={() => moveGallery(-1)} aria-label={copy.previousImage}>
                <ChevronLeft size={28} aria-hidden="true" />
              </button>
              <button type="button" className="project-gallery-nav is-next" onClick={() => moveGallery(1)} aria-label={copy.nextImage}>
                <ChevronRight size={28} aria-hidden="true" />
              </button>
            </>
          )}

          <p className="project-gallery-caption">
            {galleryImage.caption?.[language] ?? galleryProject.title[language]}
            {galleryImages.length > 1 && <span>{`${gallery.imageIndex + 1} / ${galleryImages.length}`}</span>}
          </p>
        </div>,
          document.body,
        )}
    </section>
  );
}
