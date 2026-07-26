import { useLanguage } from '../contexts/LanguageContext';

const labels = {
  en: {
    kicker: 'Working methods',
    title: 'How the work is made',
    intro:
      'The portfolio is built around repeatable ways of reading ground, testing spatial consequences, and communicating landscape change.',
  },
  no: {
    kicker: 'Arbeidsmetoder',
    title: 'Hvordan arbeidet blir til',
    intro:
      'Porteføljen er bygget rundt arbeidsmåter for å lese terreng, teste romlige konsekvenser og formidle landskapsendring.',
  },
} as const;

const methods = [
  {
    number: '01',
    title: {
      en: 'Terrain and infrastructure reading',
      no: 'Terreng- og infrastrukturlesning',
    },
    description: {
      en: 'Studying slopes, roads, water, maintenance access, and risk as one connected landscape condition.',
      no: 'Undersøker skråninger, vei, vann, driftstilkomst og risiko som én sammenhengende landskapssituasjon.',
    },
  },
  {
    number: '02',
    title: {
      en: 'GIS and layered mapping',
      no: 'GIS og lagdelt kartlegging',
    },
    description: {
      en: 'Combining ortho imagery, terrain data, traces on the ground, and territorial systems into clear project maps.',
      no: 'Kombinerer ortofoto, terrengdata, spor i terrenget og territorielle systemer til tydelige prosjektkart.',
    },
  },
  {
    number: '03',
    title: {
      en: 'Model studies and material tests',
      no: 'Modellstudier og materialtester',
    },
    description: {
      en: 'Using physical and digital models to test scale, sequence, exposure, and spatial atmosphere.',
      no: 'Bruker fysiske og digitale modeller til å teste skala, sekvens, eksponering og romlig atmosfære.',
    },
  },
  {
    number: '04',
    title: {
      en: 'Visual storytelling',
      no: 'Visuell formidling',
    },
    description: {
      en: 'Turning complex site conditions into legible drawings, images, captions, and project narratives.',
      no: 'Oversetter komplekse stedsforhold til lesbare tegninger, bilder, bildetekster og prosjektfortellinger.',
    },
  },
] as const;

export function Methods() {
  const { language } = useLanguage();
  const copy = labels[language];

  return (
    <section className="methods-band" aria-labelledby="methods-heading">
      <div className="methods-section">
        <div className="methods-intro">
          <p className="section-kicker">{copy.kicker}</p>
          <h2 id="methods-heading">{copy.title}</h2>
          <p>{copy.intro}</p>
        </div>

        <div className="method-list">
          {methods.map((method) => (
            <article className="method-line" key={method.number}>
              <span>{method.number}</span>
              <h3>{method.title[language]}</h3>
              <p>{method.description[language]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
