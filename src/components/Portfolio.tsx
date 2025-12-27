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
import projectImage1 from '../assets/8636c894bd1bb5b3c9b040ecb00d75aa7761bb73.webp';
import projectImage2 from '../assets/2e07276df870a50fba5aed6d9bf444cacffc516a.webp';
import projectImage3 from '../assets/e6814993224a45b6d05aa254b19bd8d03e94adf8.webp';

type ViewMode = 'projects' | 'skills';

type ProjectImage = {
  src: string;
  caption?: string;
};

type Project = {
  id: number;
  title: { en: string; no: string };
  category: { en: string; no: string };
  description: { en: string; no: string };
  fullDescription: { en: string; no: string };
  images: ProjectImage[];
  // Optional extra images that appear below the main carousel
  processImages?: ProjectImage[];
};

const projects: Project[] = [
  {
    id: 1,
    title: { en: 'Urban Park Revitalization', no: 'Bypark – revitalisering' },
    category: { en: 'Public Space Design', no: 'Offentlige uterom' },
    description: {
      en: 'Transforming underutilized urban spaces into vibrant community parks with native plantings and sustainable water management.',
      no: 'Transformasjon av underutnyttede byrom til levende parker med stedegne plantinger og bærekraftig overvannshåndtering.',
    },
    fullDescription: {
      en: 'A comprehensive studio project that reimagines neglected city spaces as thriving community hubs. The design integrates native plant species, sustainable drainage systems, and flexible gathering spaces that work across seasons.',
      no: 'Et helhetlig studioprosjekt som reimaginerer et neglisjert byrom som et aktivt fellesskapsknutepunkt. Prosjektet kombinerer stedegne plantinger, robuste overvannsløsninger og fleksible møteplasser gjennom året.',
    },
    images: [
      { src: projectImage1, caption: 'Model 1:200' },
      {
        src: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHBhcmt8ZW58MXx8fHwxNzY1OTYwMDY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        caption: 'Plan 1:500',
      },
      {
        src: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx1cmJhbiUyMHBhcmt8ZW58MXx8fHwxNzY1OTYwMDY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        caption: 'Section 1:50',
      },
    ],
    processImages: [
      { src: projectImage2, caption: 'Process' },
      { src: projectImage3, caption: 'Iterations' },
    ],
  },
  {
    id: 2,
    title: { en: 'Sustainable Garden Design', no: 'Bærekraftig hage' },
    category: { en: 'Ecological Design', no: 'Økologisk design' },
    description: {
      en: 'A residential garden focusing on drought-resistant plants, rainwater harvesting, and habitats for local wildlife.',
      no: 'Bolighage med tørketålende planter, regnvannshåndtering og habitater for lokal fauna.',
    },
    fullDescription: {
      en: 'A compact landscape concept prioritizing ecological function alongside aesthetic clarity. Planting is drought-tolerant and supports pollinators, while stormwater is captured and reused on site.',
      no: 'Et kompakt landskapskonsept med økologisk funksjon og tydelig estetikk. Planting er tørketålende og støtter pollinatorer, og overvann fanges og gjenbrukes lokalt.',
    },
    images: [
      { src: projectImage2, caption: 'Planting strategy' },
      {
        src: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJkZW4lMjBkZXNpZ258ZW58MXx8fHwxNzY1OTYwMDY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        caption: 'Rainwater harvesting',
      },
    ],
  },
  {
    id: 3,
    title: { en: 'Campus Masterplan', no: 'Campus – masterplan' },
    category: { en: 'Institutional Design', no: 'Institusjon / campus' },
    description: {
      en: 'Comprehensive landscape strategy emphasizing pedestrian connectivity and outdoor learning spaces.',
      no: 'Helhetlig landskapsstrategi med fokus på gangforbindelser og ute-læringsrom.',
    },
    fullDescription: {
      en: 'A masterplan that strengthens campus identity through a connected path network and a sequence of outdoor rooms for learning and social life.',
      no: 'En masterplan som styrker campus-identitet gjennom et sammenhengende stinett og en serie uterom for læring og sosialt liv.',
    },
    images: [
      { src: projectImage3, caption: 'Concept diagram' },
      {
        src: 'https://images.unsplash.com/photo-1562774053-701939374585?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzY1OTYwMDY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        caption: 'Outdoor learning',
      },
    ],
  },
  {
    id: 4,
    title: { en: 'Green Infrastructure Study', no: 'Grønn infrastruktur – studie' },
    category: { en: 'Research & Planning', no: 'Analyse & plan' },
    description: {
      en: 'Urban green infrastructure systems and their role in climate adaptation and stormwater management.',
      no: 'Grønn infrastruktur i byen – rolle i klimatilpasning og overvann.',
    },
    fullDescription: {
      en: 'A research-driven exploration of how integrated green systems can reduce flooding risk, mitigate heat, and increase biodiversity in dense urban contexts.',
      no: 'En forskningsdrevet utforskning av hvordan integrerte grønne systemer kan redusere flomrisiko, dempe varme og øke biodiversitet i tette byområder.',
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1617850687395-620757feb1f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2NhcGUlMjBhcmNoaXRlY3R1cmUlMjBkZXNpZ258ZW58MXx8fHwxNzY1OTYwMDY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        caption: 'Mapping + analysis',
      },
      {
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBpbmZyYXN0cnVjdHVyZXxlbnwxfHx8fDE3NjU5NjAwNjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        caption: 'Green corridors',
      },
    ],
  },
];

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

  // Reset carousel index when switching project
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProjectId]);

  // Close modal on ESC
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
    // Gentle scroll to keep the expanded grid in view
    window.setTimeout(() => {
      const el = gridRef.current;
      if (!el) return;
      const y = window.scrollY + el.getBoundingClientRect().top - 96;
      animateScrollTo(y);
    }, 40);
  };

  const handleShowLess = () => {
    setShowMore(false);
    // After collapse, scroll so the “More” button sits nicely near the top
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
        <div className="flex justify-center mb-10">
          <div
            className={`inline-flex rounded-full p-1 ${
              theme === 'dark' ? 'bg-white/10' : 'bg-gray-200/70'
            } backdrop-blur-md border ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}
          >
            <button
              onClick={() => setViewMode('projects')}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                viewMode === 'projects'
                  ? theme === 'dark'
                    ? 'bg-white text-black'
                    : 'bg-gray-900 text-white'
                  : theme === 'dark'
                    ? 'text-white/70 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {c.portfolio.modeProjects}
            </button>
            <button
              onClick={() => setViewMode('skills')}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                viewMode === 'skills'
                  ? theme === 'dark'
                    ? 'bg-white text-black'
                    : 'bg-gray-900 text-white'
                  : theme === 'dark'
                    ? 'text-white/70 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              {c.portfolio.modeSkills}
            </button>
          </div>
        </div>

        <div className="text-center mb-12">
          <p className={`max-w-3xl mx-auto ${theme === 'dark' ? 'text-neutral-300' : 'text-gray-700'}`}>
            {viewMode === 'projects' ? c.portfolio.projectsIntro : c.portfolio.skillsIntro}
          </p>
        </div>

        {viewMode === 'projects' && (
          <>
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayedProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setSelectedProjectId(project.id)}
                  className="relative text-left group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
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
                      <span className="glass-pill">
                        {project.category[language]}
                      </span>
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
                    <span className="glass-pill">
                      {skill.title[language]}
                    </span>
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
              {/* Click-to-close overlay (so you can exit by clicking the image) */}
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
                  <span className="glass-caption">
                    {selectedProject.images[currentImageIndex].caption}
                  </span>
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
                          <figcaption
                            className={`text-xs mt-2 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}
                          >
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
