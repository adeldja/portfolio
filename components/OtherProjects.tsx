"use client";

import { useLanguage } from "@/lib/language-context";

export default function OtherProjects() {
  const { t } = useLanguage();

  return (
    <section id="autres-projets" className="section">
      <h2 className="section-title">{t.sectionTitles.autres}</h2>
      <div className="other-projects-grid">
        {t.otherProjects.map((project) => (
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
