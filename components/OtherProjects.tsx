"use client";

import { useTranslations } from "next-intl";
import type { OtherProject } from "@/lib/types";

export default function OtherProjects() {
  const tTitle = useTranslations("SectionTitles");
  const t = useTranslations("OtherProjects");
  const items = t.raw("items") as OtherProject[];

  return (
    <section id="autres-projets" className="section">
      <h2 className="section-title">{tTitle("autres")}</h2>
      <div className="other-projects-grid">
        {items.map((project) => (
          <div className="other-project-item" key={project.name}>
            <h3 className="other-project-name">{project.name}</h3>
            <p className="other-project-description">{project.description}</p>
            <a
              className="other-project-link"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.linkLabel} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
