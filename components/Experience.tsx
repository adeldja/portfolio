"use client";

import { useLanguage } from "@/lib/language-context";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="section">
      <h2 className="section-title">{t.sectionTitles.experience}</h2>
      <div className="timeline">
        {t.experience.map((entry) => (
          <div className="timeline-item" key={entry.date}>
            <span className="timeline-dot" />
            <p className="timeline-date mono">{entry.date}</p>
            <h3 className="timeline-role">{entry.role}</h3>
            <p className="timeline-org">{entry.org}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
