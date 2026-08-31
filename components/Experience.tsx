"use client";

import { useTranslations } from "next-intl";
import type { ExperienceEntry } from "@/lib/types";

export default function Experience() {
  const tTitle = useTranslations("SectionTitles");
  const t = useTranslations("Experience");
  const items = t.raw("items") as ExperienceEntry[];

  return (
    <section id="experience" className="section">
      <h2 className="section-title">{tTitle("experience")}</h2>
      <div className="timeline">
        {items.map((entry) => (
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
