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
      status: 'Under construction',
    },
    portfolio: {
      title: 'Selected work and skills',
      modeProjects: 'Projects',
      modeSkills: 'Skills',
      projectsIntro:
        'A selection of academic and independent work in landscape architecture, with a focus on spatial strategy, ecological systems, and visual communication.',
      skillsIntro:
        'A practical toolkit spanning landscape architecture, digital workflows, and visual representation.',
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
        'I am a landscape architecture student at AHO (The Oslo School of Architecture and Design), working across design, ecology, and digital workflows.',
      p2:
        'My work combines site reading, concept development, and clear visual communication, from early analysis to detailed drawings, models, and presentations.',
      p3:
        'I am seeking a full-time role from 2026, and I remain available for selected freelance work in design, visualization, mapping, and digital production.',
    },
    contact: {
      title: 'Get in touch',
      intro:
        'Interested in collaborating, discussing a role, or talking through a project? Send a message and I will get back to you.',
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
        'Available for full-time roles from 2026, and for selected freelance work in design, visualization, mapping, and digital workflows.',
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
      status: 'Under utvikling',
    },
    portfolio: {
      title: 'Utvalgte arbeider og kompetanse',
      modeProjects: 'Prosjekter',
      modeSkills: 'Kompetanse',
      projectsIntro:
        'Et utvalg akademisk arbeid og egne prosjekter innen landskapsarkitektur, med fokus på romlige strategier, økologiske systemer og visuell formidling.',
      skillsIntro:
        'Et praktisk verktøysett som spenner fra landskapsarkitektur og digitale arbeidsflyter til visuell representasjon.',
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
        'Jeg er landskapsarkitektstudent ved AHO og jobber i skjæringspunktet mellom design, økologi og digitale arbeidsflyter.',
      p2:
        'Arbeidet mitt kombinerer stedslesning, konseptutvikling og tydelig visuell formidling - fra tidlig analyse til detaljerte tegninger, modeller og presentasjoner.',
      p3:
        'Jeg søker fast jobb fra 2026, og er også tilgjengelig for utvalgte freelance-oppdrag innen design, visualisering, kart og digital produksjon.',
    },
    contact: {
      title: 'Ta kontakt',
      intro:
        'Vil du samarbeide, diskutere en rolle eller snakke om et prosjekt? Send en melding, så hører du fra meg.',
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
        'Tilgjengelig for fast jobb fra 2026, og for utvalgte freelance-oppdrag innen design, visualisering, kart og digitale arbeidsflyter.',
      availabilityBadge: 'Tilgjengelig',
    },
  },
} as const;

export function t<L extends keyof typeof content.en>(lang: Language, path: string): any {
  // Simple helper if you want it later. For now we access content directly.
  return (content as any)[lang];
}
