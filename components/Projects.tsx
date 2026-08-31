"use client";

import { useLanguage } from "@/lib/language-context";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projets" className="section">
      <h2 className="section-title">{t.sectionTitles.projets}</h2>
      <div className="project-list">
        {t.projects.map((project) => (
          <article className="project-card" key={project.id}>
            <div className="project-card-header">
              <h3 className="project-name">{project.name}</h3>
              <span className="project-period mono">{project.period}</span>
            </div>
            <p className="project-role">{project.role}</p>
            <p className="project-description">{project.context}</p>
            <p className="project-description">{project.approach}</p>
            <p className="project-description">{project.result}</p>
            <div className="tag-list">
              {project.stack.map((item) => (
                <span className="tag" key={item}>{item}</span>
              ))}
            </div>
            {project.linkHref ? (
              <a
                className="project-link"
                href={project.linkHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.linkLabel} →
              </a>
            ) : (
              <span className="project-link-static">{project.linkLabel}</span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
