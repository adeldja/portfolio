"use client";

import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");
  const cvHref = useTranslations("Contact")("cvHref");

  return (
    <section id="hero" className="hero">
      <svg
        className="hero-rings"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="190" stroke="#46626C" strokeWidth="1" strokeOpacity="0.5" />
        <circle cx="200" cy="200" r="150" stroke="#46626C" strokeWidth="1.2" strokeOpacity="0.35" />
        <circle cx="200" cy="200" r="110" stroke="#46626C" strokeWidth="1" strokeOpacity="0.6" />
        <circle cx="200" cy="200" r="70" stroke="#46626C" strokeWidth="1.5" strokeOpacity="0.4" />
      </svg>
      <div className="hero-content">
        <h1 className="hero-title hero-animate">{t("title")}</h1>
        <p className="hero-role hero-animate">{t("role")}</p>
        <p className="hero-pitch hero-animate">{t("pitch")}</p>
        <div className="hero-actions hero-animate">
          <a href="#projets" className="btn btn-primary">
            {t("ctaPrimary")}
          </a>
          <a href={cvHref} className="btn btn-outline" download>
            {t("ctaSecondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
