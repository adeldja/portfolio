"use client";

import { useLanguage } from "@/lib/language-context";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section">
      <h2 className="section-title">{t.sectionTitles.contact}</h2>
      <div className="contact-list">
        <div className="contact-item">
          <span className="contact-label mono">{t.contact.emailLabel}</span>
          <a className="contact-value" href={`mailto:${t.contact.email}`}>{t.contact.email}</a>
        </div>
        <div className="contact-item">
          <span className="contact-label mono">{t.contact.locationLabel}</span>
          <span className="contact-value">{t.contact.location}</span>
        </div>
        <div className="contact-item">
          <span className="contact-label mono">CV</span>
          <a className="contact-value" href={t.contact.cvHref} download>{t.contact.cvLabel}</a>
        </div>
        <div className="contact-item">
          <span className="contact-label mono">{t.contact.linkedinLabel}</span>
          <a className="contact-value" href={t.contact.linkedinHref} target="_blank" rel="noopener noreferrer">{t.contact.linkedinLabel}</a>
        </div>
      </div>
      <p className="footer mono">{t.footer}</p>
    </section>
  );
}
