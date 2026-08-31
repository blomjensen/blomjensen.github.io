import aboutImage from '../assets/11641084856f4253f2024f07b07edcc8d4b7a88f.webp';
import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';

const aboutMeta = {
  en: [
    ['Profile', 'Landscape architect, AHO 2026'],
    ['Location', 'Oslo, Norway'],
    ['Focus', 'Terrain, infrastructure, maintenance, climate adaptation'],
    ['Tools', 'Adobe CC, AerialOD, Blender, CloudCompare, Rhino 3D, QGIS'],
    ['Qualities', 'Calm, analytical, curious'],
  ],
  no: [
    ['Profil', 'Landskapsarkitekt, AHO 2026'],
    ['Sted', 'Oslo, Norge'],
    ['Fokus', 'Terreng, infrastruktur, drift, klimatilpasning'],
    ['Verktøy', 'Adobe CC, AerialOD, Blender, CloudCompare, Rhino 3D, QGIS'],
    ['Egenskaper', 'Rolig, analytisk, nysgjerrig'],
  ],
} as const;

export function About() {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <section id="about" className="about-section" aria-labelledby="about-heading">
      <div className="about-layout">
        <div className="about-copy">
          <h2 id="about-heading" className="section-title">
            {c.about.title}
          </h2>

          <div className="about-text">
            <p>{c.about.p1}</p>
            <p>{c.about.p2}</p>
            <p>{c.about.p3}</p>
          </div>
        </div>

        <figure className="about-portrait">
          <img
            src={aboutImage}
            alt={language === 'en' ? 'Portrait of Bjørn Blom-Jensen' : 'Portrett av Bjørn Blom-Jensen'}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <aside className="about-meta" aria-label={language === 'en' ? 'Profile details' : 'Profildetaljer'}>
          <dl>
            {aboutMeta[language].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
