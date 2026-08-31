import type { Language } from './contexts/LanguageContext';

export type Localized<T> = Record<Language, T>;

export const content = {
  en: {
    nav: {
      home: 'Bjørn Blom-Jensen',
      portfolio: 'Portfolio',
      studies: 'Studies',
      about: 'About',
      contact: 'Contact',
    },
    hero: {
      ariaScroll: 'Scroll to portfolio',
      status: 'Landscape architect, AHO 2026',
    },
    portfolio: {
      title: 'Selected work',
      modeProjects: 'Projects',
      modeSkills: 'Methods',
      projectsIntro:
        'Academic and independent work across terrain, infrastructure, mapping, model studies, and landscape systems.',
      skillsIntro:
        'Methods and tools used to read sites, test proposals, and communicate complex landscape conditions clearly.',
      more: 'More',
      less: 'Less',
      modal: {
        detailsTitle: 'Project details',
        close: 'Close project',
        prev: 'Previous image',
        next: 'Next image',
      },
    },
    studies: {
      kicker: 'Fieldwork, material, and collective experiments',
      title: 'Studies & workshops',
      intro:
        'A selection of short-form investigations developed through fieldwork, photography, material testing, and collaborative workshops alongside larger projects.',
      fieldworkLabel: 'Fieldwork & photography',
      materialLabel: 'Material & representation studies',
      workshopLabel: 'Workshops & collective experiments',
      transitionsCategory: 'Self-initiated photographic study',
      projectTitle: 'Transitions — Portugal, 2025',
      description:
        'A self-initiated photo series made during a study trip to Portugal in 2025. The same 36 photographs are shown at two speeds, allowing the sequence to be read at both a slow and a compressed rhythm.',
      comparisonLabel: 'Transitions shown at two animation speeds',
      slowLabel: '0.5 fps',
      slowDetail: '36 photographs · 72-second loop',
      slowAlt: 'Transitions photo sequence from Portugal playing at 0.5 frames per second',
      fastLabel: '2 fps',
      fastDetail: '36 photographs · 18-second loop',
      fastAlt: 'Transitions photo sequence from Portugal playing at 2 frames per second',
      play: 'Play',
      pause: 'Pause',
      aquateketCategory: 'Material study, workshop, AHO 2021',
      aquateketTitle: 'Aquateket',
      aquateketDescription:
        'A series of material experiments translating water conditions - rippling, cascading, and foaming - through paint, water, concrete, and organic material.',
      aquateketImages: [
        { alt: 'Wavy, paint drawn with a stick and scraped with a sharp object', label: 'Wavy\n"Paint dragged with a stick and scraped with a sharp object"' },
        { alt: 'Wavy, paint drawn with a stick in horizontal strokes', label: 'Wavy\n"Paint dragged with a stick in horizontal strokes"' },
        { alt: 'Wavy, oil paint applied with a brush in horizontal strokes', label: 'Wavy\n"Oil paint applied with a brush in horizontal strokes"' },
        { alt: 'Cascading, paint drawn with a stick on concrete', label: 'Cascading\n"Paint dragged with a stick on concrete"' },
        { alt: 'Cascading, paint stamped with reindeer lichen', label: 'Cascading\n"Stamped with reindeer lichen"' },
        { alt: 'Foaming, paint and water allowed to run and dry', label: 'Foaming\n"Paint and water running and drying"' },
        { alt: 'Foaming, paint and water allowed to run and dry', label: 'Foaming\n"Paint and water running and drying"' },
        { alt: 'Foaming, paint and water allowed to run and dry', label: 'Foaming\n"Paint and water running and drying"' },
      ],
    },
    about: {
      title: 'About',
      p1:
        'I am a landscape architect educated at AHO, and I am particularly curious about how digital tools and new technology can be used to understand sites, develop ideas, and communicate landscape projects.',
      p2:
        'I work with an analytical and exploratory approach, from site reading and mapping to modelling, visualization, and detailing. At the same time, I care that what is designed works in practice, has aesthetic qualities, and can be built and maintained.',
      p3:
        'I am now looking to join a practice where I can contribute both landscape expertise and digital ways of working, learn from others, and develop good solutions collaboratively.',
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
        'Open to landscape architecture roles, and to selected collaborations in mapping, visualization, design research, and digital workflows.',
      availabilityBadge: 'Open to roles',
    },
  },
  no: {
    nav: {
      home: 'Bjørn Blom-Jensen',
      portfolio: 'Portefølje',
      studies: 'Studier',
      about: 'Om',
      contact: 'Kontakt',
    },
    hero: {
      ariaScroll: 'Scroll til portefølje',
      status: 'Landskapsarkitekt, AHO 2026',
    },
    portfolio: {
      title: 'Utvalgte arbeider',
      modeProjects: 'Prosjekter',
      modeSkills: 'Metoder',
      projectsIntro:
        'Akademiske og egne arbeider innen terreng, infrastruktur, kartlegging, modellstudier og landskapssystemer.',
      skillsIntro:
        'Metoder og verktøy for å lese steder, teste forslag og formidle komplekse landskapsforhold tydelig.',
      more: 'Mer',
      less: 'Mindre',
      modal: {
        detailsTitle: 'Prosjektdetaljer',
        close: 'Lukk prosjekt',
        prev: 'Forrige bilde',
        next: 'Neste bilde',
      },
    },
    studies: {
      kicker: 'Feltarbeid, materiale og kollektive eksperimenter',
      title: 'Studier og verksteder',
      intro:
        'Et utvalg korte undersøkelser utviklet gjennom feltarbeid, fotografi, materialtesting og samarbeidsbaserte verksteder ved siden av større prosjekter.',
      fieldworkLabel: 'Feltarbeid og fotografi',
      materialLabel: 'Material- og representasjonsstudier',
      workshopLabel: 'Verksteder og kollektive eksperimenter',
      transitionsCategory: 'Selvinitiert fotografisk studie',
      projectTitle: 'Transitions — Portugal, 2025',
      description:
        'En selvinitiert fotoserie laget under en studietur til Portugal i 2025. De samme 36 fotografiene vises i to hastigheter, slik at sekvensen kan leses i både et langsomt og et komprimert tempo.',
      comparisonLabel: 'Transitions vist i to animasjonshastigheter',
      slowLabel: '0,5 fps',
      slowDetail: '36 fotografier · 72 sekunder per runde',
      slowAlt: 'Transitions-fotoserien fra Portugal avspilt med 0,5 bilder per sekund',
      fastLabel: '2 fps',
      fastDetail: '36 fotografier · 18 sekunder per runde',
      fastAlt: 'Transitions-fotoserien fra Portugal avspilt med 2 bilder per sekund',
      play: 'Spill av',
      pause: 'Pause',
      aquateketCategory: 'Materialstudie, verksted, AHO 2021',
      aquateketTitle: 'Aquateket',
      aquateketDescription:
        'En serie materialeksperimenter som oversetter vanntilstander - bølgete, fossende og skummende - gjennom maling, vann, betong og organisk materiale.',
      aquateketImages: [
        { alt: 'Bølgete, maling dratt med pinne og skrapt med skarp gjenstand', label: 'Bølgete\n"Maling dratt med pinne og skrapt med skarp gjenstand"' },
        { alt: 'Bølgete, maling dratt med pinne i horisontale drag', label: 'Bølgete\n"Maling dratt med pinne i horisontale drag"' },
        { alt: 'Bølgete, olje og maling påført med pensel i horisontale drag', label: 'Bølgete\n"Olje, maling, pensel i horisontale drag"' },
        { alt: 'Fossende, maling dratt med pinne på betong', label: 'Fossende\n"Maling dratt med pinne på betong"' },
        { alt: 'Fossende, maling stemplet med reinlav', label: 'Fossende\n"Stemplet med Reinlav"' },
        { alt: 'Skummende, maling og vann rennende og tørket', label: 'Skummende\n"Maling og vann rennende og tørket"' },
        { alt: 'Skummende, maling og vann rennende og tørket', label: 'Skummende\n"Maling og vann rennende og tørket"' },
        { alt: 'Skummende, maling og vann rennende og tørket', label: 'Skummende\n"Maling og vann rennende og tørket"' },
      ],
    },
    about: {
      title: 'Om meg',
      p1:
        'Jeg er utdannet landskapsarkitekt fra AHO og er særlig nysgjerrig på hvordan digitale verktøy og ny teknologi kan brukes til å forstå steder, utvikle ideer og formidle landskapsprosjekter.',
      p2:
        'Jeg arbeider analytisk og utforskende, fra stedslesning og kartlegging til modellering, visualisering og detaljering. Samtidig er jeg opptatt av at det som tegnes skal fungere i praksis, ha estetiske kvaliteter og være mulig å bygge og vedlikeholde.',
      p3:
        'Nå ønsker jeg å bli en del av et fagmiljø der jeg kan bidra med både landskapsfaglig forståelse og digitale arbeidsmåter, lære av andre og utvikle gode løsninger i samarbeid.',
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
        'Åpen for stillinger innen landskapsarkitektur og utvalgte samarbeid innen kartlegging, visualisering, designbasert forskning og digitale arbeidsflyter.',
      availabilityBadge: 'Åpen for roller',
    },
  },
} as const;

export function t<L extends keyof typeof content.en>(lang: Language, path: string): any {
  // Simple helper if you want it later. For now we access content directly.
  return (content as any)[lang];
}
