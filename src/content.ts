import type { Language } from './contexts/LanguageContext';

export type Localized<T> = Record<Language, T>;

export const content = {
  en: {
    nav: {
      home: 'Bjørn Blom-Jensen',
      portfolio: 'Portfolio',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      ariaScroll: 'Scroll to portfolio',
    },
    portfolio: {
      modeProjects: 'Projects',
      modeSkills: 'Skills',
      projectsIntro:
        'A selection of work from studio courses and independent explorations — focusing on landscape, systems, and storytelling.',
      skillsIntro:
        'Core competencies — both digital tools and landscape architecture fundamentals that shape how I work.',
      more: 'More',
      less: 'Less',
      modal: {
        detailsTitle: 'Project details',
        close: 'Close project',
        prev: 'Previous image',
        next: 'Next image',
      },
    },
    about: {
      title: 'About',
      p1:
        "I'm a landscape architecture student at AHO (Oslo School of Architecture and Design) — working at the intersection of design, ecology, and digital workflows.",
      p2:
        'I enjoy building clear concepts, strong visual narratives, and practical design systems — from site analysis to detailed representation and model making.',
      p3:
        "I'm looking for a full-time role from 2026, and I'm also available for selected freelance projects.",
    },
    contact: {
      title: 'Get in touch',
      intro: "Want to collaborate or discuss a project? Send a message — I'd love to hear from you.",
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send message',
        sent: 'Opening email…',
      },
      infoTitle: 'Contact information',
      connectTitle: 'Connect',
      availabilityTitle: 'Availability',
      availabilityText:
        "Open to full-time roles from 2026 and selected freelance projects (design, visualization, mapping, and digital workflows).",
      availabilityBadge: 'Available',
    },
  },
  no: {
    nav: {
      home: 'Bjørn Blom-Jensen',
      portfolio: 'Portefølje',
      about: 'Om',
      contact: 'Kontakt',
    },
    hero: {
      ariaScroll: 'Scroll til portefølje',
    },
    portfolio: {
      modeProjects: 'Prosjekter',
      modeSkills: 'Kompetanse',
      projectsIntro:
        'Et utvalg arbeid fra studio og egne utforskninger — med fokus på landskap, systemer og formidling.',
      skillsIntro:
        'Kjernekompetanse — både digitale verktøy og landskapsarkitektur-fundamentet som styrer hvordan jeg jobber.',
      more: 'Mer',
      less: 'Mindre',
      modal: {
        detailsTitle: 'Prosjektdetaljer',
        close: 'Lukk prosjekt',
        prev: 'Forrige bilde',
        next: 'Neste bilde',
      },
    },
    about: {
      title: 'Om meg',
      p1:
        'Jeg er landskapsarkitektstudent ved AHO — og jobber i skjæringspunktet mellom design, økologi og digitale arbeidsflyter.',
      p2:
        'Jeg liker å bygge tydelige konsepter, sterke visuelle narrativ og praktiske designsystemer — fra analyse til detaljert representasjon og modellbygging.',
      p3:
        'Jeg ser etter fast jobb fra 2026, og kan også ta utvalgte freelance-oppdrag.',
    },
    contact: {
      title: 'Ta kontakt',
      intro: 'Vil du samarbeide eller diskutere et prosjekt? Send en melding — jeg hører gjerne fra deg.',
      form: {
        name: 'Navn',
        email: 'E-post',
        message: 'Melding',
        send: 'Send melding',
        sent: 'Åpner e-post…',
      },
      infoTitle: 'Kontaktinfo',
      connectTitle: 'Lenker',
      availabilityTitle: 'Tilgjengelighet',
      availabilityText:
        'Åpen for fast jobb fra 2026 og utvalgte freelance-oppdrag (design, visualisering, kart, og digitale arbeidsflyter).',
      availabilityBadge: 'Tilgjengelig',
    },
  },
} as const;

export function t<L extends keyof typeof content.en>(lang: Language, path: string): any {
  // Simple helper if you want it later. For now we access content directly.
  return (content as any)[lang];
}
