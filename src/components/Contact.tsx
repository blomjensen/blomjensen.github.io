import { Mail, Linkedin, Instagram, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { content } from '../content';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const c = content[language];

  const TO_EMAIL = 'bjorn@blom-jensen.no';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open the user's email client with a prefilled email (simple + reliable for a landing page)
    setIsSubmitted(true);
    const subject = `Website message from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
    const href = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;

    // Reset UI state shortly after
    window.setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`py-20 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{c.contact.title}</h2>
          <p className={`max-w-2xl mx-auto ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
            {c.contact.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="relative z-40 p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {c.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'bg-black border-white/20 text-white focus:ring-white/50'
                      : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-gray-400'
                  }`}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {c.contact.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    theme === 'dark'
                      ? 'bg-black border-white/20 text-white focus:ring-white/50'
                      : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-gray-400'
                  }`}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className={`block mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {c.contact.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                    theme === 'dark'
                      ? 'bg-black border-white/20 text-white focus:ring-white/50'
                      : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-gray-400'
                  }`}
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full py-4 rounded-lg transition-colors ${
                  theme === 'dark'
                    ? 'bg-white text-black hover:bg-neutral-200'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {isSubmitted ? c.contact.form.sent : c.contact.form.send}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="relative z-40">
            <div className="mb-8">
              <h3 className={`mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{c.contact.infoTitle}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    theme === 'dark' ? 'bg-white text-black' : 'bg-gray-900 text-white'
                  }`}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className={theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}>bjorn@blom-jensen.no</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    theme === 'dark' ? 'bg-white text-black' : 'bg-gray-900 text-white'
                  }`}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className={theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}>Oslo, Norway</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                    theme === 'dark' ? 'bg-white text-black' : 'bg-gray-900 text-white'
                  }`}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className={theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}>+47 906 40 381</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className={`mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{c.contact.connectTitle}</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/bjornblomjensen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-4 transition-opacity hover:opacity-70"
                >
                  <Linkedin size={24} className={theme === 'dark' ? 'text-white' : 'text-gray-900'} />
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/bjornblomjensen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-4 transition-opacity hover:opacity-70"
                >
                  <Instagram size={24} className={theme === 'dark' ? 'text-white' : 'text-gray-900'} />
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Instagram</span>
                </a>
              </div>
            </div>

            <div className="mt-8 p-6">
              <h3 className={`mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{c.contact.availabilityTitle}</h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-neutral-400' : 'text-gray-600'}`}>
                {c.contact.availabilityText}
              </p>
              <div className="inline-block px-4 py-2 bg-green-900/30 text-green-400 rounded-full border border-green-500/30">
                {c.contact.availabilityBadge}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}