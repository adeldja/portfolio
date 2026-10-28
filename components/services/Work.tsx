import Title from "@/components/services/Title";
import { serviceWork } from "@/lib/services";

export default function Work() {
  return (
    <section
      id="realisations"
      className="sv-section sv-work sv-theme-day"
      aria-labelledby="realisations-title"
    >
      <div className="sv-container">
        <Title id="realisations-title" parts={[{ em: "Réalisations" }]} />
        <p className="sv-work-intro sv-lead" data-reveal="">
          Des projets réels, et ce que j&apos;y ai fait concrètement.
        </p>
        <div className="sv-work-list">
          {serviceWork.map((work, index) => (
            <article className="sv-work-row" key={work.name} data-reveal="mobile">
              <span className="sv-work-index sv-mono" aria-hidden="true">
                ({String(index + 1).padStart(2, "0")})
              </span>
              <h3 className="sv-work-name">{work.name}</h3>
              <div className="sv-work-meta">
                <p className="sv-work-type sv-mono">{work.type}</p>
                <p className="sv-work-desc">{work.description}</p>
                {work.href && work.linkLabel ? (
                  <a
                    className="sv-work-link"
                    href={work.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {work.linkLabel}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
