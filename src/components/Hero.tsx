import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';
import heroImage from '../assets/11641084856f4253f2024f07b07edcc8d4b7a88f.webp';

interface HeroProps {
  onExploreClick: () => void;
}

const heroCopy = {
  en: {
    kicker: 'Portfolio 2026',
    title: 'Landscape architecture for terrain in change.',
    lead:
      'I am a landscape architect from AHO, working with terrain, infrastructure, maintenance, and the systems that shape places over time.',
    viewWork: 'View selected work',
    contact: 'Contact',
    imageAlt: 'Portrait of Bjørn Blom-Jensen',
    actionsLabel: 'Primary actions',
    metadataLabel: 'Portfolio metadata',
    details: [
      ['Base', 'Oslo, Norway'],
      ['Profile', 'Landscape architect, AHO 2026'],
    ],
  },
  no: {
    kicker: 'Portefølje 2026',
    title: 'Landskapsarkitektur for terreng i endring.',
    lead:
      'Jeg er landskapsarkitekt fra AHO og arbeider med terreng, infrastruktur, drift og systemene som former steder over tid.',
    viewWork: 'Se utvalgte arbeider',
    contact: 'Kontakt',
    imageAlt: 'Portrett av Bjørn Blom-Jensen',
    actionsLabel: 'Hovedhandlinger',
    metadataLabel: 'Porteføljeinformasjon',
    details: [
      ['Base', 'Oslo, Norge'],
      ['Profil', 'Landskapsarkitekt, AHO 2026'],
    ],
  },
} as const;

export function Hero({ onExploreClick }: HeroProps) {
  const { language } = useLanguage();
  const c = content[language];
  const copy = heroCopy[language];

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-topline">
        <span>{copy.kicker}</span>
        <span>{c.hero.status}</span>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <h1 id="hero-title" className="hero-title">
            {copy.title}
          </h1>
          <p className="hero-lead">{copy.lead}</p>

          <div className="hero-actions" aria-label={copy.actionsLabel}>
            <button
              type="button"
              className="plain-action"
              onClick={onExploreClick}
              data-umami-event="navigation_click"
              data-umami-event-section="portfolio"
              data-umami-event-location="hero"
            >
              {copy.viewWork}
            </button>
            <a
              className="plain-link"
              href="mailto:bjorn@blom-jensen.no"
              data-umami-event="contact_click"
              data-umami-event-method="email"
              data-umami-event-location="hero"
            >
              {copy.contact}
            </a>
          </div>
        </div>

        <figure className="hero-figure">
          <img src={heroImage} alt={copy.imageAlt} loading="eager" decoding="async" />
        </figure>
      </div>

      <dl className="hero-details" aria-label={copy.metadataLabel}>
        {copy.details.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
