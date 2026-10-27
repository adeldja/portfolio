import { serviceWork } from "@/lib/services";

export default function Work() {
  return (
    <section id="realisations" className="section">
      <h2 className="section-title">Réalisations</h2>
      <p className="work-intro">
        Des projets réels, et ce que j&apos;y ai fait concrètement.
      </p>
      <div className="project-list">
        {serviceWork.map((work) => (
          <article className="project-card" key={work.name}>
            <div className="project-card-header">
              <h3 className="project-name">{work.name}</h3>
              <span className="project-period mono">{work.type}</span>
            </div>
            <p className="project-description">{work.description}</p>
            {work.href && work.linkLabel ? (
              <a
                className="project-link"
                href={work.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {work.linkLabel}
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
