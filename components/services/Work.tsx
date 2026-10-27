import { serviceWork } from "@/lib/services";

export default function Work() {
  return (
    <section id="realisations" className="section">
      <h2 className="section-title">Réalisations</h2>
      <div className="project-list">
        {serviceWork.map((work) => (
          <article className="project-card" key={work.name}>
            <div className="project-card-header">
              <h3 className="project-name">{work.name}</h3>
              <span className="project-period mono">{work.type}</span>
            </div>
            <p className="project-description">{work.description}</p>
            {work.href ? (
              <a
                className="project-link"
                href={work.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir →
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
