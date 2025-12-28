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

function SegmentedToggle({
  value,
  onChange,
  leftLabel,
  rightLabel,
  isDark,
}: {
  value: 'left' | 'right';
  onChange: (v: 'left' | 'right') => void;
  leftLabel: string;
  rightLabel: string;
  isDark: boolean;
}) {
  const isLeft = value === 'left';

  // Tuning for "screenshot look"
  const inset = 6; // padding inside outer pill
  const gap = 18; // space between inner pills (feel free to tweak)
  const btnMinW = 160;

  const outer = isDark
    ? 'bg-white/5 border-white/10'
    : 'bg-gray-200/70 border-gray-300/60';

  const highlight = isDark ? 'bg-white' : 'bg-gray-900';
  const activeText = isDark ? 'text-black' : 'text-white';
  const inactiveText = isDark
    ? 'text-white/70 hover:text-white'
    : 'text-gray-700 hover:text-gray-900';

  return (
    <div
      className={`relative inline-flex rounded-full border backdrop-blur-md ${outer}`}
      style={{ padding: inset }}
    >
      {/* Sliding highlight */}
      <span
        aria-hidden
        className={`absolute rounded-full transition-transform duration-200 ease-out ${highlight}`}
        style={{
          top: inset,
          bottom: inset,
          left: inset,
          width: `calc(50% - ${gap / 2}px)`,
          transform: isLeft ? 'translateX(0)' : `translateX(calc(100% + ${gap}px))`,
        }}
      />

      <div className="relative z-10 inline-flex" style={{ gap }}>
        <button
          type="button"
          onClick={() => onChange('left')}
          className={`rounded-full px-7 py-2 text-base font-semibold tracking-wide transition-colors ${
            isLeft ? activeText : inactiveText
          }`}
          style={{ minWidth: btnMinW, textAlign: 'center' }}
        >
          {leftLabel}
        </button>

        <button
          type="button"
          onClick={() => onChange('right')}
          className={`rounded-full px-7 py-2 text-base font-semibold tracking-wide transition-colors ${
            !isLeft ? activeText : inactiveText
          }`}
          style={{ minWidth: btnMinW, textAlign: 'center' }}
        >
          {rightLabel}
        </button>
      </div>
    </div>
  );
}

export function Portfolio() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const c = content[language];
  const isDark = theme === 'dark';

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

  // reset carousel index when changing project
  useEffect(() => setCurrentImageIndex(0), [selectedProjectId]);

  // lock background scroll when modal open
  useEffect(() => {
    if (!selectedProject) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selectedProject]);

  // keyboard controls when modal open
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

  const displayedProjects = showMore ? projects : projects.slice(0, 4);

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

  // === “screenshot” card styling ===
  const cardRadius = 'rounded-3xl';
  const cardHeight = 'h-72 sm:h-80 lg:h-[360px]';
  const cardBorder = isDark ? 'border border-white/10' : 'border border-black/10';
  const cardShadow = 'shadow-sm hover:shadow-xl transition-shadow duration-300';
  const cardBg = isDark ? 'bg-black/10' : 'bg-white';

  // Modal styling
  const modalRadius = 'rounded-3xl';
  const modalBorder = isDark ? 'border border-white/10' : 'border border-black/10';

  return (
    <section className={`relative py-24 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <SegmentedToggle
            value={viewMode === 'projects' ? 'left' : 'right'}
            onChange={(v) => setViewMode(v === 'left' ? 'projects' : 'skills')}
            leftLabel={c.portfolio.modeProjects}
            rightLabel={c.portfolio.modeSkills}
            isDark={isDark}
          />
        </div>

        {/* Intro */}
        <div className="text-center mb-14">
          <p className={`max-w-3xl mx-auto text-lg ${isDark ? 'text-neutral-400' : 'text-gray-700'}`}>
            {viewMode === 'projects' ? c.portfolio.projectsIntro : c.portfolio.skillsIntro}
          </p>
        </div>

        {/* Projects grid */}
        {viewMode === 'projects' && (
          <>
            <div
              ref={gridRef}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch"
            >
              {displayedProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`w-full ${cardRadius} overflow-hidden ${cardBorder} ${cardShadow} ${cardBg}`}
                  aria-label={`Open ${project.title[language]}`}
                >
                  <div className={`w-full ${cardHeight} overflow-hidden`}>
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
                  <span className={`text-sm uppercase tracking-wider ${isDark ? 'text-white/90' : 'text-gray-900'}`}>
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
                  <span className={`text-sm uppercase tracking-wider ${isDark ? 'text-white/90' : 'text-gray-900'}`}>
                    {c.portfolio.less}
                  </span>
                </button>
              )}
            </div>
          </>
        )}

        {/* Skills grid */}
        {viewMode === 'skills' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
            {skills.map((skill) => (
              <div
                key={skill.title.en}
                className={`w-full ${cardRadius} overflow-hidden ${cardBorder} ${cardShadow} ${
                  isDark ? 'bg-white/5' : 'bg-white'
                }`}
              >
                <div className={`w-full ${cardHeight} overflow-hidden`}>
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: isDark ? 'white' : 'black' }}
                  >
                    <skill.icon size={44} className="text-gray-900" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-3">
                    <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {skill.title[language]}
                    </span>
                  </div>
                  <p className={`${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>{skill.description[language]}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            // close only when clicking backdrop
            if (e.target === e.currentTarget) setSelectedProjectId(null);
          }}
        >
          <div
            className={`w-full max-w-5xl ${modalRadius} overflow-hidden ${modalBorder} ${
              isDark ? 'bg-neutral-900' : 'bg-white'
            }`}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div
              className="max-h-[90vh] overflow-y-auto overscroll-contain"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="relative">
                <div className="h-[42vh] sm:h-[52vh] overflow-hidden">
                  <img
                    src={selectedProject.images[currentImageIndex]?.src}
                    alt={`${selectedProject.title[language]} – ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {/* Prev/Next (don’t close modal) */}
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

                <h2 className={`mb-4 text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedProject.title[language]}
                </h2>

                <p className={`mb-7 text-lg ${isDark ? 'text-neutral-300' : 'text-gray-700'}`}>
                  {selectedProject.fullDescription[language]}
                </p>

                {selectedProject.processImages && selectedProject.processImages.length > 0 && (
                  <div className="mb-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProject.processImages.map((img, idx) => (
                        <figure key={idx} className={`${cardRadius} overflow-hidden ${cardBorder}`}>
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
                            <figcaption className={`px-3 py-2 text-xs ${isDark ? 'text-neutral-400' : 'text-gray-600'}`}>
                              {img.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  </div>
                )}

                <div className={`border-t pt-6 ${isDark ? 'border-white/10' : 'border-black/10'}`}>
                  <h3 className={`mb-3 font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {c.portfolio.modal.detailsTitle}
                  </h3>
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
    </section>
  );
}
