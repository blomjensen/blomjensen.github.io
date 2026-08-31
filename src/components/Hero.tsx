import { content } from '../content';
import { Blocks, ChartNetwork, Cuboid, ExternalLink, Map, Ruler, ScanLine } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import heroImage from '../assets/hero-666aaa-1116.webp';
import { InteractiveLink } from './InteractiveLink';

interface HeroProps {
  onExploreClick: () => void;
}

const heroCopy = {
  en: {
    kicker: 'Portfolio',
    title: 'Bjørn Blom-Jensen',
    lead:
      'Here you will find selected work from AHO and independent studies of terrain, infrastructure, mapping, physical models, and landscape systems.',
    viewWork: 'View selected work',
    contact: 'Contact',
    imageAlt: 'Portrait of Bjørn Blom-Jensen',
    actionsLabel: 'Primary actions',
    metadataLabel: 'Portfolio metadata',
    capabilitiesLabel: 'Capabilities',
    capabilities: [
      { label: 'Detailing', Icon: Ruler },
      { label: 'Site analysis', Icon: ChartNetwork },
      { label: 'Mapping', Icon: Map },
      { label: 'Physical model', Icon: Blocks },
      { label: '3D studies', Icon: Cuboid },
      { label: 'Aerial survey', Icon: ScanLine },
    ],
    details: [
      { label: 'Base', value: 'Oslo, Norway' },
      { label: 'Profile', value: 'Landscape architect, AHO 2026' },
      { label: 'Email', value: 'bjorn@blom-jensen.no', href: 'mailto:bjorn@blom-jensen.no' },
      { label: 'Phone', value: '+47 906 40 381', href: 'tel:+4790640381' },
      { label: 'CV', value: 'CV (PDF)', href: '/files/bjorn-blom-jensen-cv-2026.pdf' },
      {
        label: 'Diploma project, AHO 2026',
        value: 'Impermanence & Maintenance',
        href: 'https://www.aho.no/english/student-projects/landscape-architecture/2026/impermanence-and-maintenance.html/',
      },
    ],
  },
  no: {
    kicker: 'Portefølje',
    title: 'Bjørn Blom-Jensen',
    lead:
      'Her finner du utvalgte arbeider fra AHO og egne studier innen terreng, infrastruktur, kartlegging, fysiske modeller og landskapssystemer.',
    viewWork: 'Se utvalgte arbeider',
    contact: 'Kontakt',
    imageAlt: 'Portrett av Bjørn Blom-Jensen',
    actionsLabel: 'Hovedhandlinger',
    metadataLabel: 'Porteføljeinformasjon',
    capabilitiesLabel: 'Kompetanse',
    capabilities: [
      { label: 'Detaljering', Icon: Ruler },
      { label: 'Stedsanalyse', Icon: ChartNetwork },
      { label: 'Kartlegging', Icon: Map },
      { label: 'Fysisk modell', Icon: Blocks },
      { label: '3D-studier', Icon: Cuboid },
      { label: 'Drone', Icon: ScanLine },
    ],
    details: [
      { label: 'Base', value: 'Oslo, Norge' },
      { label: 'Profil', value: 'Landskapsarkitekt, AHO 2026' },
      { label: 'E-post', value: 'bjorn@blom-jensen.no', href: 'mailto:bjorn@blom-jensen.no' },
      { label: 'Telefon', value: '+47 906 40 381', href: 'tel:+4790640381' },
      { label: 'CV', value: 'CV (PDF)', href: '/files/bjorn-blom-jensen-cv-2026.pdf' },
      {
        label: 'Diplomoppgave AHO 2026',
        value: 'Impermanence & Maintenance',
        href: 'https://www.aho.no/english/student-projects/landscape-architecture/2026/impermanence-and-maintenance.html/',
      },
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
                    target={detail.href.endsWith('.pdf') || detail.href.startsWith('http') ? '_blank' : undefined}
                    rel={detail.href.endsWith('.pdf') || detail.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={
                      detail.href.startsWith('http')
                        ? `${detail.value} (${language === 'no' ? 'åpnes i ny fane' : 'opens in a new tab'})`
                        : undefined
                    }
                    trackingEvent={detail.href.endsWith('.pdf') ? 'cv-download' : undefined}
                    trackingData={detail.href.endsWith('.pdf') ? { document: 'cv-2026' } : undefined}
                    previewSrc={detail.href.endsWith('.pdf') ? '/files/previews/bjorn-blom-jensen-cv-2026.png' : undefined}
                    previewAlt={detail.href.endsWith('.pdf') ? 'First page of the CV' : undefined}
                    previewHref={detail.href.endsWith('.pdf') ? detail.href : undefined}
                  >
                    {detail.value}
                    {detail.href.startsWith('http') && (
                      <ExternalLink className="hero-detail-external-icon" size={14} strokeWidth={1.7} aria-hidden="true" />
                    )}
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
