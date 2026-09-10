import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';

type LabViewProps = {
  onPageChange: (page: 'portfolio', sectionId?: string) => void;
  isActive: boolean;
};

export function LabView({ onPageChange, isActive }: LabViewProps) {
  const { language } = useLanguage();
  const copy = content[language].lab;
  const homeLabel = content[language].nav.portfolio;
  const inertProps = !isActive ? ({ inert: '' } as const) : {};

  return (
    <section
      className="page-panel page-panel--lab lab-page"
      aria-hidden={!isActive}
      {...inertProps}
    >
      <section className="lab-hero" aria-labelledby="lab-heading">
        <img
          className="lab-hero-image"
          src="/projects/impermanence-maintenance/00-point-cloud-aho.webp"
          alt={copy.heroAlt}
          loading="lazy"
          decoding="async"
        />
        <div className="lab-hero-shade" aria-hidden="true" />
        <div className="lab-hero-copy">
          <p className="lab-eyebrow">{copy.kicker}</p>
          <h1 id="lab-heading">{copy.title}</h1>
          <div className="lab-hero-intro">
            <p>{copy.intro}</p>
            <dl>
              {copy.lenses.map((lens) => (
                <div key={lens.label}>
                  <dt>{lens.label}</dt>
                  <dd>{lens.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="experiments" className="lab-work" aria-labelledby="lab-work-heading">
        <header className="lab-work-header">
          <p className="lab-eyebrow">{copy.indexKicker}</p>
          <h2 id="lab-work-heading">{copy.indexTitle}</h2>
          <p>{copy.indexIntro}</p>
        </header>

        <div className="lab-grid">
          {copy.experiments.map((experiment) => (
            <article className="lab-experiment" key={experiment.title}>
              <figure>
                <img src={experiment.image} alt={experiment.alt} loading="lazy" />
                <figcaption>{experiment.caption}</figcaption>
              </figure>
              <div className="lab-experiment-copy">
                <div className="lab-experiment-line">
                  <span>{experiment.number}</span>
                  <p>{experiment.meta}</p>
                  <p className="lab-status">{copy.inDevelopment}</p>
                </div>
                <h3>{experiment.title}</h3>
                <p>{experiment.description}</p>
              </div>
            </article>
          ))}
        </div>

        <footer className="lab-footer">
          <p>{copy.note}</p>
          <button type="button" className="lab-footer-link" onClick={() => onPageChange('portfolio', 'home')}>
            ← {homeLabel}
          </button>
        </footer>
      </section>
    </section>
  );
}
