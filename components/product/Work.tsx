import WordMask from "@/components/product/WordMask";
import { RevealGroup } from "@/components/product/motion/reveal";
import { BONEE_SHOTS } from "@/lib/product";
import { serviceWork, type ServiceWorkItem } from "@/lib/services";

const cleanLabel = (label: string) => label.replace(/\s*→$/, "");

function WorkLink({ work }: { work: ServiceWorkItem }) {
  if (!work.href || !work.linkLabel) return null;
  return (
    <a className="pd-textlink" href={work.href} target="_blank" rel="noopener noreferrer">
      {cleanLabel(work.linkLabel)}
    </a>
  );
}

function WorkRow({ work }: { work: ServiceWorkItem }) {
  return (
    <article className="pd-work-row">
      <h3 className="pd-work-name">{work.name}</h3>
      <div className="pd-work-meta">
        <p className="pd-work-type">{work.type}</p>
        <p className="pd-body">{work.description}</p>
        <WorkLink work={work} />
      </div>
    </article>
  );
}

export default function Work() {
  const bonee = serviceWork.find((work) => work.name === "Bonee");
  const featured = bonee && BONEE_SHOTS.length > 0 ? bonee : null;
  const rows = featured
    ? serviceWork.filter((work) => work !== featured)
    : bonee
      ? [bonee, ...serviceWork.filter((work) => work !== bonee)]
      : serviceWork;

  return (
    <section id="realisations" className="pd-section pd-work" aria-labelledby="realisations-title">
      <div className="pd-wrap">
        <div className="pd-head">
          <WordMask id="realisations-title" text="Réalisations" />
          <p className="pd-body">Des projets réels, et ce que j&apos;y ai fait concrètement.</p>
        </div>

        {featured ? (
          <article className="pd-feature">
            <RevealGroup preset="rise" stagger={0.08} amount={0.3} className="pd-shots">
              {BONEE_SHOTS.map((shot) => (
                <div className="pd-shot" data-rise="" key={shot.src}>
                  <picture>
                    {shot.webp ? <source srcSet={shot.webp} type="image/webp" /> : null}
                    {/* eslint-disable-next-line @next/next/no-img-element -- static App Store screenshots, already sized */}
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>
              ))}
            </RevealGroup>
            <div className="pd-feature-text">
              <h3 className="pd-feature-name">{featured.name}</h3>
              <p className="pd-work-type">{featured.type}</p>
              <p className="pd-body">{featured.description}</p>
              <WorkLink work={featured} />
            </div>
          </article>
        ) : null}

        <div className="pd-work-list">
          {rows.map((work) => (
            <WorkRow work={work} key={work.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
