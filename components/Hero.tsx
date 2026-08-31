"use client";

import { useLanguage } from "@/lib/language-context";

export default function Hero() {
  const { t } = useLanguage();

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
        <p className="hero-kicker mono hero-animate">{t.hero.kicker}</p>
        <h1 className="hero-title hero-animate">{t.hero.title}</h1>
        <p className="hero-role hero-animate">{t.hero.role}</p>
        <p className="hero-pitch hero-animate">{t.hero.pitch}</p>
        <div className="hero-actions hero-animate">
          <a href="#projets" className="btn btn-primary">
            {t.hero.ctaPrimary}
          </a>
          <a href={t.contact.cvHref ?? "/cv.pdf"} className="btn btn-outline" download>
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
