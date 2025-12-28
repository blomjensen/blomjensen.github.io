import {
  Award,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  GraduationCap,
  TreePine,
  Users,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { projects, type Project } from '../data/projects';

type ViewMode = 'projects' | 'skills';

const skills = [
  {
    icon: GraduationCap,
    title: { en: 'Landscape Architecture', no: 'Landskapsarkitektur' },
    description: {
      en: 'Site analysis, concept development, spatial sequencing, planting strategy, and robust design detailing.',
      no: 'Stedsanalyse, konseptutvikling, romlig dramaturgi, planting, og robuste detaljløsninger.',
    },
  },
  {
    icon: Award,
    title: { en: 'Digital Workflows', no: 'Digitale arbeidsflyter' },
    description: {
      en: 'Rhino + Grasshopper, QGIS, Adobe (PS/AI/ID), 3D printing, and clear visual storytelling.',
      no: 'Rhino + Grasshopper, QGIS, Adobe (PS/AI/ID), 3D-print, og tydelig visuell formidling.',
    },
  },
  {
    icon: TreePine,
    title: { en: 'Ecology + Systems', no: 'Økologi + systemer' },
    description: {
      en: 'Water, soil, vegetation, and maintenance as design drivers — and how systems perform over time.',
      no: 'Vann, jord, vegetasjon og drift som design-drivere — og hvordan systemer virker over tid.',
    },
  },
  {
    icon: Users,
    title: { en: 'Collaboration', no: 'Samarbeid' },
    description: {
      en: 'Workshops, stakeholder mapping, iterative feedback, and making complex ideas easy to understand.',
      no: 'Workshop, interessentkartlegging, iterasjon, og å gjøre komplekse ideer forståelige.',
    },
  },
];

function animateScrollTo(targetY: number, durationMs = 650) {
  const startY = window.scrollY;
  const delta = targetY - startY;
  const start = performance.now();
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / durationMs);
    window.scrollTo(0, startY + delta * easeOutCubic(t));
    if (t < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

export function Portfolio() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const c = content[language];

  const [viewMode, setViewMode] = useState<ViewMode>('projects');
  const [showMore, setShowMore] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const selectedProject: Project | null = useMemo(
    () => projects.find((p) => p.id === selectedProjectId) ?? null,
    [selectedProjectId]
  );

  const isDark = theme === 'dark';

  // Reset carousel index when switching project
  useEffect(() => setCurrentImageIndex(0), [selectedProjectId]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (!selectedProject) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedProject]);

  // Keyboard controls when modal open
  useEffect(() => {
    if (!selectedProject) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProjectId(null);
      if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
      }
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedProject]);

  const displayedProjects = showMore ? projects : projects.slice(0, 3);

  const handleShowMore = () => {
    setShowMore(true);
    window.setTimeout(() => {
      const el = gridRef.current;
      if (!el) return;
      const y = window.scrollY + el.getBoundingClientRect().top - 110;
      animateScrollTo(y);
    }, 40);
  };

  const handleShowLess = () => {
    setShowMore(false);
    window.setTimeout(() => {
      const el = moreButtonRef.current;
      if (!el) return;
      const y = window.scrollY + el.getBoundingClientRect().top - 110;
      animateScrollTo(y);
    }, 60);
  };

  const handleNextImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
  };

  const handlePrevImage = () => {
    if (!selectedProject) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
  };

  // ===== Style constants =====
  const cardRadius = 'rounded-2xl';
  const cardShadow = 'shadow-md hover:shadow-xl';
  const cardMediaHeight = 'h-64 sm:h-72 lg:h-80';
  const cardMaxWidth = 'w-full max-w-[620px]';
  const modalRadius = 'rounded-2xl';
  const modalImageHeight = 'h-[42vh] sm:h-[52vh]';

  return (
    <div className={`relative py-20 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Toggle (Projects/Skills) */}
        <div className="flex justify-center mb-12">
          {(() => {
            const isProjects = viewMode === 'projects';
            const gapPx = 12;
            const insetPx = 6;

            const outer = isDark ? 'bg-white/10 border-white/10' : 'bg-gray-200/70 border-gray-200';
            const activePill = isDark ? 'bg-white' : 'bg-gray-900';
            const inactiveText = isDark ? 'text-white/70 hover:text-white' : 'text-gray-700 hover:text-gray-900';
            const activeText = isDark ? 'text-black' : 'text-white';

            return (
              <div
                className={`relative inline-flex rounded-full border backdrop-blur-md ${outer}`}
                style={{ padding: insetPx }}
              >
                <span
                  aria-hidden
                  className={`absolute rounded-full transition-transform duration-200 ease-out shadow-sm ${activePill}`}
                  style={{
                    top: insetPx,
                    bottom: insetPx,
                    left: insetPx,
                    width: `calc(50% - ${gapPx / 2}px)`,
                    transform: isProjects ? 'translateX(0)' : `translateX(calc(100% + ${gapPx}px))`,
                  }}
                />
                <div className="relative z-10 inline-flex" style={{ gap: gapPx }}>
                  <button
                    type="button"
                    onClick={() => setViewMode('projects')}
                    className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-bold transition-colors duration-200 ${
                      isProjects ? activeText : inactiveText
                    }`}
                    style={{ minWidth: 140, textAlign: 'center' }}
                  >
                    {c.portfolio.modeProjects}
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('skills')}
                    className={`whitespace-nowrap rounded-full px-6 py-2 text-sm font-bold transition-colors duration-200 ${
                      !isProjects ? activeText : inactiveText
                    }`}
                    style={{ minWidth: 140, textAlign: 'center' }}
                  >
                    {c.portfolio.modeSkills}
                  </button>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Intro */}
        <div className="text-center mb-14">
          <p className={`max-w-3xl mx-auto ${isDark ? 'text-neutral-300' : 'text-gray-700'}`}>
            {viewMode === 'projects' ? c.portfolio.projectsIntro : c.portfolio.skillsIntro}
          </p>
        </div>

        {/* Projects */}
        {viewMode === 'projects' && (
          <>
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
              {displayedProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`${cardMaxWidth} ${cardRadius} overflow-hidden ${cardShadow} transition-all duration-300 bg-transparent`}
                  aria-label={`Open ${project.title[language]}`}
                >
                  <div className={`relative ${cardMediaHeight} overflow-hidden`}>
                    <img
                      src={project.images[0]?.src}
                      alt={project.title[language]}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-center mt-10">
              {!showMore ? (
                <button
                  ref={moreButtonRef}
                  onClick={handleShowMore}
                  className="flex flex-col items-center gap-2 group"
                  aria-label="Load more projects"
                  type="button"
                >
                  <span className={`text-sm uppercase tracking-wider ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {c.portfolio.more}
                  </span>
                  <div className={`flex flex-col -space-y-2 ${isDark ? 'text-white' : 'text-gray-900'} wiggle-animation`}>
                    <ChevronDown size={20} className="-mb-3" />
                    <ChevronDown size={20} />
                  </div>
                </button>
              ) : (
                <button
                  ref={moreButtonRef}
                  onClick={handleShowLess}
                  className="flex flex-col items-center gap-2 group"
                  aria-label="Show less projects"
                  type="button"
                >
                  <div className={`flex flex-col -space-y-2 ${isDark ? 'text-white' : 'text-gray-900'} wiggle-animation`}>
                    <ChevronUp size={20} className="-mb-3" />
                    <ChevronUp size={20} />
                  </div>
                  <span className={`text-sm uppercase tracking-wider ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {c.portfolio.less}
                  </span>
                </button>
              )}
            </div>
          </>
        )}

        {/* Skills */}
        {viewMode === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
            {skills.map((skill) => (
              <div
                key={skill.title.en}
                className={`${cardMaxWidth} ${cardRadius} overflow-hidden ${cardShadow} transition-all duration-300 ${
                  isDark ? 'bg-neutral-900' : 'bg-white'
                }`}
              >
                <div className={`relative ${cardMediaHeight} overflow-hidden`}>
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: isDark ? 'white' : 'black' }}
                  >
                    <skill.icon size={40} className="text-gray-900" />
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-2">
                    <span className="glass-pill">{skill.title[language]}</span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
                    {skill.description[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelectedProjectId(null);
          }}
        >
          <div
            className={`max-w-5xl w-full ${modalRadius} overflow-hidden ${isDark ? 'bg-neutral-900' : 'bg-white'}`}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="max-h-[90vh] overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="relative">
                <div className={`w-full ${modalImageHeight} overflow-hidden`}>
                  <img
                    src={selectedProject.images[currentImageIndex]?.src}
                    alt={`${selectedProject.title[language]} – ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 glass-button"
                      aria-label={c.portfolio.modal.prev}
                    >
                      <ChevronLeft size={24} className="text-white" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 glass-button"
                      aria-label={c.portfolio.modal.next}
                    >
                      <ChevronRight size={24} className="text-white" />
                    </button>

                    <div className="absolute bottom-4 right-4 z-20 glass-pill text-sm">
                      {currentImageIndex + 1} / {selectedProject.images.length}
                    </div>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setSelectedProjectId(null)}
                  className="absolute top-4 right-4 z-30 glass-button"
                  aria-label={c.portfolio.modal.close}
                >
                  <X size={22} className="text-white" />
                </button>

                {selectedProject.images[currentImageIndex]?.caption && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                    <span className="glass-caption">{selectedProject.images[currentImageIndex].caption}</span>
                  </div>
                )}
              </div>

              <div className="p-8">
                <div className="mb-3">
                  <span className="glass-pill">{selectedProject.category[language]}</span>
                </div>

                <h2 className={`mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedProject.title[language]}</h2>

                <p className={`mb-6 ${isDark ? 'text-neutral-300' : 'text-gray-700'}`}>
                  {selectedProject.fullDescription[language]}
                </p>

                {selectedProject.processImages && selectedProject.processImages.length > 0 && (
                  <div className="mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProject.processImages.map((img, idx) => (
                        <figure key={idx} className={`${cardRadius} overflow-hidden`}>
                          <div className="h-48 overflow-hidden">
                            <img
                              src={img.src}
                              alt={img.caption ?? `Process ${idx + 1}`}
                              className="w-full h-full object-cover object-center"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          {img.caption && (
                            <figcaption className={`text-xs mt-2 ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
                              {img.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`border-t pt-6 ${isDark ? 'border-neutral-700' : 'border-gray-200'}`}>
                  <h3 className={`mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{c.portfolio.modal.detailsTitle}</h3>
                  <p className={`${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
                    {selectedProject.description[language]}
                  </p>
                </div>

                <div className="h-6" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
