import { ChevronLeft, ChevronRight, Maximize2, Minus, Plus, X } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';
import { projects, type Project } from '../data/projects';

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
    supporting: 'Supporting material',
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
    supporting: 'Støttemateriale',
  },
} as const;

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

export function Portfolio() {
  const { language } = useLanguage();
  const c = content[language];
  const copy = labels[language];
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [gallery, setGallery] = useState<{ projectId: number; imageIndex: number } | null>(null);
  const projectRefs = useRef<Record<number, HTMLElement | null>>({});
  const positionLockRef = useRef<{ projectId: number; top: number } | null>(null);
  const galleryTouchStartX = useRef<number | null>(null);
  const galleryHasSwiped = useRef(false);

  const galleryProject = gallery ? projects.find((project) => project.id === gallery.projectId) : null;
  const galleryImages = galleryProject ? getProjectImages(galleryProject) : [];
  const galleryImage = gallery ? galleryImages[gallery.imageIndex] : null;

  useEffect(() => {
    if (!gallery) return;

    const previousOverflow = document.body.style.overflow;
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

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [gallery, galleryImages.length]);

  useLayoutEffect(() => {
    const positionLock = positionLockRef.current;
    if (!positionLock) return;

    const target = projectRefs.current[positionLock.projectId];
    positionLockRef.current = null;
    if (!target) return;

    const offset = target.getBoundingClientRect().top - positionLock.top;
    if (Math.abs(offset) < 1) return;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollBy(0, offset);
    root.style.scrollBehavior = previousScrollBehavior;
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
      setExpandedProjectId(projectId);
      window.requestAnimationFrame(() => scrollProjectIntoView(projectId, scrollBehavior));
      return;
    }

    const target = projectRefs.current[projectId];
    if (target) {
      positionLockRef.current = {
        projectId,
        top: target.getBoundingClientRect().top,
      };
    }

    setExpandedProjectId(projectId);
    window.requestAnimationFrame(() => scrollProjectIntoView(projectId, scrollBehavior));
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
    galleryTouchStartX.current = event.touches[0]?.clientX ?? null;
    galleryHasSwiped.current = false;
  };

  const handleGalleryTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = galleryTouchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    galleryTouchStartX.current = null;

    if (startX === null || endX === undefined) return;

    const delta = endX - startX;
    if (Math.abs(delta) < 42) return;

    galleryHasSwiped.current = true;
    moveGallery(delta < 0 ? 1 : -1);
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
          const secondaryImages = [...project.images.slice(1), ...(project.processImages ?? [])];
          const imageRowStartIndex = 1 + secondaryImages.length;

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
                onClick={() => handleToggle(project.id)}
              >
                <span className="project-number">{String(index + 1).padStart(2, '0')}</span>

                {primaryImage && (
                  <span className={`project-thumb${primaryImage.fit === 'dark-contain' ? ' is-dark-contained' : ''}`}>
                    <img src={primaryImage.src} alt={getAlt(project, language, primaryCaption)} loading="lazy" />
                  </span>
                )}

                <span className="project-summary-copy">
                  <span className="project-category">{project.category[language]}</span>
                  <strong id={titleId}>{project.title[language]}</strong>
                  <span>{project.description[language]}</span>
                </span>

                <span className="project-toggle">
                  <span>{isOpen ? copy.close : copy.open}</span>
                  {isOpen ? <Minus size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
                </span>
              </button>

              {isOpen && (
                <div className="project-detail" id={`project-${project.id}-detail`}>
                  {primaryImage && (
                    <figure className={`project-main-image${primaryImage.fit === 'dark-contain' ? ' is-dark-contained' : ''}`}>
                      <div className="project-image-media">
                        <button
                          type="button"
                          className="project-main-image-button"
                          aria-label={`${copy.closeImage}: ${project.title[language]}`}
                          onClick={() => handleToggle(project.id)}
                        >
                          <img src={primaryImage.src} alt={getAlt(project, language, primaryCaption)} loading="lazy" />
                        </button>
                        <button
                          type="button"
                          className="project-image-zoom"
                          aria-label={`${copy.zoomImage}: ${project.title[language]}`}
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

                  {secondaryImages.length > 0 && (
                    <div className="supporting-images" aria-label={copy.supporting}>
                      {secondaryImages.map((image, imageIndex) => {
                        const caption = image.caption?.[language];

                        return (
                          <figure
                            className={
                              image.fit === 'contain'
                                ? 'is-contained'
                                : image.fit === 'dark-contain'
                                  ? 'is-dark-contained'
                                  : undefined
                            }
                            key={`${project.id}-${image.src}`}
                          >
                            <div className="project-image-media">
                              <img src={image.src} alt={getAlt(project, language, caption)} loading="lazy" />
                              <button
                                type="button"
                                className="project-image-zoom"
                                aria-label={`${copy.zoomImage}: ${project.title[language]}`}
                                onClick={() => showGalleryImage(project.id, imageIndex + 1)}
                              >
                                <Maximize2 size={18} aria-hidden="true" />
                              </button>
                            </div>
                            {caption && <figcaption>{caption}</figcaption>}
                          </figure>
                        );
                      })}
                    </div>
                  )}

                  {project.imageRows?.map((row, rowIndex) => (
                    <div
                      className={[
                        'supporting-images',
                        row.columns === 1 ? 'is-one-column' : '',
                        row.columns === 3 ? 'is-three-column' : '',
                        row.columns === 4 ? 'is-four-column' : '',
                        row.naturalAspect ? 'uses-natural-aspect' : '',
                        row.matchHorizontalHeight ? 'uses-matched-horizontal-height' : '',
                        row.uniformAspect === 'portrait' ? 'uses-portrait-crop' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-label={copy.supporting}
                      key={`${project.id}-row-${rowIndex}`}
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
                                : image.fit === 'dark-contain'
                                  ? 'is-dark-contained'
                                  : undefined
                            }
                            key={`${project.id}-${rowIndex}-${image.src}`}
                          >
                            <div className="project-image-media">
                              <img src={image.src} alt={getAlt(project, language, caption)} loading="lazy" />
                              <button
                                type="button"
                                className="project-image-zoom"
                                aria-label={`${copy.zoomImage}: ${project.title[language]}`}
                                onClick={() =>
                                  showGalleryImage(project.id, imageRowStartIndex + previousRowImageCount + imageIndex)
                                }
                              >
                                <Maximize2 size={18} aria-hidden="true" />
                              </button>
                            </div>
                            {caption && <figcaption>{caption}</figcaption>}
                          </figure>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>

      {gallery && galleryProject && galleryImage && (
        <div
          className="project-gallery"
          role="dialog"
          aria-modal="true"
          aria-label={galleryProject.title[language]}
          onTouchStart={handleGalleryTouchStart}
          onTouchEnd={handleGalleryTouchEnd}
        >
          <button type="button" className="project-gallery-close" onClick={() => setGallery(null)} aria-label={copy.closeGallery}>
            <X size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="project-gallery-image"
            aria-label={copy.closeGallery}
            onClick={() => {
              if (galleryHasSwiped.current) {
                galleryHasSwiped.current = false;
                return;
              }

              setGallery(null);
            }}
          >
            <img
              src={galleryImage.src}
              alt={getAlt(galleryProject, language, galleryImage.caption?.[language])}
              decoding="async"
            />
          </button>

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
        </div>
      )}
    </section>
  );
}
