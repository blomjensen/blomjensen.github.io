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
import { projects } from '../data/projects';

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

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId) ?? null,
    [selectedProjectId]
  );

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProjectId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProjectId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const displayedProjects = showMore ? projects : projects.slice(0, 3);

  const handleShowMore = () => {
    setShowMore(true);
    window.setTimeout(() => {
      const el = gridRef.current;
      if (!el) return;
      const y = window.scrollY + el.getBoundingClientRect().top - 96;
      animateScrollTo(y);
    }, 40);
  };

  const handleShowLess = () => {
    setShowMore(false);
    window.setTimeout(() => {
      const el = moreButtonRef.current;
      if (!el) return;
      const y = window.scrollY + el.getBoundingClientRect().top - 96;
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

  return (
    <div className={`relative py-20 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-[#313131]' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div
            className={`inline-flex items-center gap-1 rounded-full p-1 ${
              theme === 'dark' ? 'bg-white/10 border-white/10' : 'bg-gray-200/70 border-gray-200'
            } backdrop-blur-md border`}
          >
            <button
              type="button"
              onClick={() => setViewMode('projects')}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                viewMode === 'projects'
                  ? theme === 'dark'
                    ? 'bg-white text-black shadow'
                    : 'bg-gray-900 text-white shadow'
                  : theme === 'dark'
                    ? 'text-white/70 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {c.portfolio.modeProjects}
            </button>

            <button
              type="button"
              onClick={() => setViewMode('skills')}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                viewMode === 'skills'
                  ? theme === 'dark'
                    ? 'bg-white text-black shadow'
                    : 'bg-gray-900 text-white shadow'
                  : theme === 'dark'
                    ? 'text-white/70 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {c.portfolio.modeSkills}
            </button>
          </div>
        </div>

        {/* Intro */}
        <div className="text-center mb-12">
          <p className={`max-w-3xl mx-auto ${theme === 'dark' ? 'text-neutral-300' : 'text-gray-700'}`}>
            {viewMode === 'projects' ? c.portfolio.projectsIntro : c.portfolio.skillsIntro}
          </p>
        </div>

        {/* Projects */}
        {viewMode === 'projects' && (
          <>
            <div
              ref={gridRef}
              className={`grid grid-cols-1 gap-8 ${
                displayedProjects.length > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1 justify-items-center'
              }`}
            >
              {displayedProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`relative text-left group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
                    displayedProjects.length === 1 ? 'w-full max-w-4xl' : 'w-full'
                  }`}
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={project.images[0].src}
                      alt={project.title[language]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-xl font-bold mb-2">{project.title[language]}</h3>
                      <p className="text-white/90 text-sm line-clamp-2">{project.description[language]}</p>
                    </div>

                    <div className="absolute top-4 left-4">
                      <span className="glass-pill">{project.category[language]}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-end mt-8">
              {!showMore ? (
                <button
                  ref={moreButtonRef}
                  onClick={handleShowMore}
                  className="w-full flex justify-center group"
                  aria-label="Load more projects"
                  type="button"
                >
                  <div
                    className={`flex flex-col items-center gap-2 transition-colors ${
                      theme === 'dark'
                        ? 'text-white group-hover:text-neutral-300'
                        : 'text-gray-900 group-hover:text-gray-600'
                    }`}
                  >
                    <span className="text-sm uppercase tracking-wider">{c.portfolio.more}</span>
                    <div className="flex flex-col -space-y-2 wiggle-animation">
                      <ChevronDown size={20} className="-mb-3" />
                      <ChevronDown size={20} />
                    </div>
                  </div>
                </button>
              ) : (
                <button
                  ref={moreButtonRef}
                  onClick={handleShowLess}
                  className="w-full flex justify-center group"
                  aria-label="Show less projects"
                  type="button"
                >
                  <div
                    className={`flex flex-col items-center gap-2 transition-colors ${
                      theme === 'dark'
                        ? 'text-white group-hover:text-neutral-300'
                        : 'text-gray-900 group-hover:text-gray-600'
                    }`}
                  >
                    <div className="flex flex-col -space-y-2 wiggle-animation">
                      <ChevronUp size={20} className="-mb-3" />
                      <ChevronUp size={20} />
                    </div>
                    <span className="text-sm uppercase tracking-wider">{c.portfolio.less}</span>
                  </div>
                </button>
              )}
            </div>
          </>
        )}

        {/* Skills */}
        {viewMode === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill) => (
              <div
                key={skill.title.en}
                className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-80 overflow-hidden">
                  <div
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500 flex items-center justify-center"
                    style={{
                      backgroundColor: theme === 'dark' ? 'white' : 'black',
                    }}
                  >
                    <skill.icon size={40} className="text-gray-900" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="glass-pill">{skill.title[language]}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
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
          onClick={() => setSelectedProjectId(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`max-w-4xl w-full rounded-lg overflow-hidden modal-content-scrollable ${
              theme === 'dark' ? 'bg-neutral-900' : 'bg-white'
            } max-h-[90vh] modal-pop`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                type="button"
                className="absolute inset-0 z-10"
                aria-label={c.portfolio.modal.close}
                onClick={() => setSelectedProjectId(null)}
              />

              <img
                src={selectedProject.images[currentImageIndex].src}
                alt={`${selectedProject.title[language]} – ${currentImageIndex + 1}`}
                className="w-full h-96 object-cover"
                loading="eager"
                decoding="async"
              />

              {selectedProject.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onMouseDown={(e) => e.stopPropagation()}
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
                    onMouseDown={(e) => e.stopPropagation()}
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
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProjectId(null);
                }}
                className="absolute top-4 right-4 z-30 glass-button"
                aria-label={c.portfolio.modal.close}
              >
                <X size={22} className="text-white" />
              </button>

              <div className="absolute bottom-4 left-4 z-20">
                <span className="glass-pill">{selectedProject.category[language]}</span>
              </div>

              {selectedProject.images[currentImageIndex].caption && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="glass-caption">{selectedProject.images[currentImageIndex].caption}</span>
                </div>
              )}
            </div>

            <div className="p-8">
              <h2 className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {selectedProject.title[language]}
              </h2>

              <p className={`mb-6 ${theme === 'dark' ? 'text-neutral-300' : 'text-gray-700'}`}>
                {selectedProject.fullDescription[language]}
              </p>

              {selectedProject.processImages && selectedProject.processImages.length > 0 && (
                <div className="mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedProject.processImages.map((img, idx) => (
                      <figure key={idx} className="rounded-lg overflow-hidden">
                        <img
                          src={img.src}
                          alt={img.caption ?? `Process ${idx + 1}`}
                          className="w-full h-48 object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        {img.caption && (
                          <figcaption className={`text-xs mt-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
                            {img.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              <div className={`border-t pt-6 ${theme === 'dark' ? 'border-neutral-700' : 'border-gray-200'}`}>
                <h3 className={`mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {c.portfolio.modal.detailsTitle}
                </h3>
                <p className={`${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
                  {selectedProject.description[language]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
