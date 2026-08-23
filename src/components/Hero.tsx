import { content } from '../content';
import { ChartNetwork, Cuboid, Map, PencilRuler, Ruler, ScanLine } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import heroImage from '../assets/11641084856f4253f2024f07b07edcc8d4b7a88f.webp';
import { InteractiveLink } from './InteractiveLink';

interface HeroProps {
  onExploreClick: () => void;
}

const heroCopy = {
  en: {
    kicker: 'Portfolio',
    title: 'Landscape architecture for terrain in change.',
    lead:
      'I am a landscape architect from AHO, working with terrain, infrastructure, maintenance, and the systems that shape places over time.',
    viewWork: 'View selected work',
    contact: 'Contact',
    imageAlt: 'Portrait of Bjørn Blom-Jensen',
    actionsLabel: 'Primary actions',
    metadataLabel: 'Portfolio metadata',
    capabilitiesLabel: 'Capabilities',
    capabilities: [
      { label: 'Landscape design', Icon: PencilRuler },
      { label: 'Detailing', Icon: Ruler },
      { label: 'Site analysis', Icon: ChartNetwork },
      { label: 'Mapping', Icon: Map },
      { label: '3D studies', Icon: Cuboid },
      { label: 'Aerial survey', Icon: ScanLine },
    ],
    details: [
      { label: 'Base', value: 'Oslo, Norway' },
      { label: 'Profile', value: 'Landscape architect, AHO 2026' },
      { label: 'Email', value: 'bjorn@blom-jensen.no', href: 'mailto:bjorn@blom-jensen.no' },
      { label: 'Phone', value: '+47 906 40 381', href: 'tel:+4790640381' },
      { label: 'CV', value: 'CV (PDF)', href: '/files/bjorn-blom-jensen-cv-2026.pdf' },
    ],
  },
  no: {
    kicker: 'Portefølje',
    title: 'Landskapsarkitektur for terreng i endring.',
    lead:
      'Jeg er landskapsarkitekt fra AHO og arbeider med terreng, infrastruktur, drift og systemene som former steder over tid.',
    viewWork: 'Se utvalgte arbeider',
    contact: 'Kontakt',
    imageAlt: 'Portrett av Bjørn Blom-Jensen',
    actionsLabel: 'Hovedhandlinger',
    metadataLabel: 'Porteføljeinformasjon',
    capabilitiesLabel: 'Kompetanse',
    capabilities: [
      { label: 'Landskapsdesign', Icon: PencilRuler },
      { label: 'Detaljering', Icon: Ruler },
      { label: 'Stedsanalyse', Icon: ChartNetwork },
      { label: 'Kartlegging', Icon: Map },
      { label: '3D-studier', Icon: Cuboid },
      { label: 'Drone', Icon: ScanLine },
    ],
    details: [
      { label: 'Base', value: 'Oslo, Norge' },
      { label: 'Profil', value: 'Landskapsarkitekt, AHO 2026' },
      { label: 'E-post', value: 'bjorn@blom-jensen.no', href: 'mailto:bjorn@blom-jensen.no' },
      { label: 'Telefon', value: '+47 906 40 381', href: 'tel:+4790640381' },
      { label: 'CV', value: 'CV (PDF)', href: '/files/bjorn-blom-jensen-cv-2026.pdf' },
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
            <button type="button" className="plain-action" onClick={onExploreClick}>
              {copy.viewWork}
            </button>
            <InteractiveLink className="plain-link hero-contact-action fx-55" href="mailto:bjorn@blom-jensen.no">
              {copy.contact}
            </InteractiveLink>
          </div>
        </div>

        <figure className="hero-figure">
          <img src={heroImage} alt={copy.imageAlt} loading="eager" decoding="async" />
        </figure>
      </div>

      <div className="hero-lower">
        <dl className="hero-details" aria-label={copy.metadataLabel}>
          {copy.details.map((detail) => (
            <div key={detail.label}>
              <dt>{detail.label}</dt>
              <dd>
                {detail.href ? (
                  <InteractiveLink
                    className="hero-detail-link"
                    href={detail.href}
                    target={detail.href.endsWith('.pdf') ? '_blank' : undefined}
                    rel={detail.href.endsWith('.pdf') ? 'noopener noreferrer' : undefined}
                    previewSrc={detail.href.endsWith('.pdf') ? '/files/previews/bjorn-blom-jensen-cv-2026.png' : undefined}
                    previewAlt={detail.href.endsWith('.pdf') ? 'First page of the CV' : undefined}
                  >
                    {detail.value}
                  </InteractiveLink>
                ) : (
                  detail.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        <section className="hero-capabilities" aria-label={copy.capabilitiesLabel}>
          <p>{copy.capabilitiesLabel}</p>
          <ul>
            {copy.capabilities.map(({ label, Icon }) => (
              <li key={label}>
                <span className="hero-capability-icon" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.55} />
                </span>
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
