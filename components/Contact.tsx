"use client";

import { useTranslations } from "next-intl";

export default function Contact() {
  const tTitle = useTranslations("SectionTitles");
  const t = useTranslations("Contact");
  const footer = useTranslations()("Footer");

  return (
    <section id="contact" className="section">
      <h2 className="section-title">{tTitle("contact")}</h2>
      <div className="contact-list">
        <div className="contact-item">
          <span className="contact-label mono">{t("emailLabel")}</span>
          <a className="contact-value" href={`mailto:${t("email")}`}>{t("email")}</a>
        </div>
        <div className="contact-item">
          <span className="contact-label mono">{t("locationLabel")}</span>
          <span className="contact-value">{t("location")}</span>
        </div>
        <div className="contact-item">
          <span className="contact-label mono">CV</span>
          <a className="contact-value" href={t("cvHref")} download>{t("cvLabel")}</a>
        </div>
        <div className="contact-item">
          <span className="contact-label mono">{t("linkedinLabel")}</span>
          <a className="contact-value" href={t("linkedinHref")} target="_blank" rel="noopener noreferrer">{t("linkedinLabel")}</a>
        </div>
      </div>
      <p className="footer mono">{footer}</p>
    </section>
  );
}
