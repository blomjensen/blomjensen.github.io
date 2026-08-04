import { Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { content } from '../content';
import { useLanguage } from '../contexts/LanguageContext';

const contactCopy = {
  en: {
    kicker: 'Contact',
    title: 'Available for landscape architecture roles and selected collaborations.',
    direct: 'Direct contact',
    social: 'Social',
    location: 'Location',
  },
  no: {
    kicker: 'Kontakt',
    title: 'Åpen for stillinger innen landskapsarkitektur og utvalgte samarbeid.',
    direct: 'Direkte kontakt',
    social: 'Sosialt',
    location: 'Sted',
  },
} as const;

export function Contact() {
  const { language } = useLanguage();
  const c = content[language];
  const copy = contactCopy[language];

  const directLinks = [
    {
      label: language === 'en' ? 'Email' : 'E-post',
      value: 'bjorn@blom-jensen.no',
      href: 'mailto:bjorn@blom-jensen.no',
      icon: Mail,
      event: 'contact-email',
    },
    {
      label: language === 'en' ? 'Phone' : 'Telefon',
      value: '+47 906 40 381',
      href: 'tel:+4790640381',
      icon: Phone,
      event: 'contact-phone',
    },
  ];

  const socialLinks = [
    {
      label: 'LinkedIn',
      value: 'bjornblomjensen',
      href: 'https://www.linkedin.com/in/bjornblomjensen/',
      icon: Linkedin,
      event: 'social-linkedin',
    },
    {
      label: 'Instagram',
      value: '@bjornblomjensen',
      href: 'https://www.instagram.com/bjornblomjensen/',
      icon: Instagram,
      event: 'social-instagram',
    },
  ];

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-heading">
      <div className="contact-layout">
        <div className="contact-heading">
          <p className="section-kicker">{copy.kicker}</p>
          <h2 id="contact-heading" className="section-title">
            {copy.title}
          </h2>
          <p className="section-lead">{c.contact.availabilityText}</p>
        </div>

        <address className="contact-directory">
          <div className="contact-group">
            <h3>{copy.direct}</h3>
            {directLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a className="contact-row interactive-text" href={item.href} key={item.label} data-umami-event={item.event}>
                  <Icon size={18} aria-hidden="true" />
                  <span>
                    <small>{item.label}</small>
                    <strong>{item.value}</strong>
                  </span>
                </a>
              );
            })}
          </div>

          <div className="contact-group">
            <h3>{copy.social}</h3>
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  className="contact-row interactive-text"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={item.label}
                  data-umami-event={item.event}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>
                    <small>{item.label}</small>
                    <strong>{item.value}</strong>
                  </span>
                </a>
              );
            })}
          </div>

          <div className="contact-group">
            <h3>{copy.location}</h3>
            <div className="contact-row" aria-label={language === 'en' ? 'Location' : 'Sted'}>
              <MapPin size={18} aria-hidden="true" />
              <span>
                <small>Base</small>
                <strong>{language === 'en' ? 'Oslo, Norway' : 'Oslo, Norge'}</strong>
              </span>
            </div>
          </div>
        </address>
      </div>
    </section>
  );
}
