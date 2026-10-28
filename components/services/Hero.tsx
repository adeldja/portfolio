import Title from "@/components/services/Title";

const REASSURE = "Réponse sous 24 h · Rendez-vous chez vous · Prix fixe";

export default function Hero() {
  return (
    <section id="top" className="sv-hero sv-theme-night" data-loop="">
      <div className="sv-hero-sky" aria-hidden="true">
        <div className="sv-hero-blob" />
        <div className="sv-sun">
          <div className="sv-sun-core" />
        </div>
      </div>

      <div className="sv-container sv-hero-bar">
        <p className="sv-wordmark">
          <span className="sv-wordmark-name">Adel Djahnit</span>
          <span className="sv-wordmark-role sv-mono">Développeur web</span>
        </p>
        <div className="sv-hero-bar-actions">
          <a href="#contact" className="sv-btn sv-btn--primary sv-btn--sm sv-hero-bar-cta">
            Devis gratuit <span className="sv-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="sv-container sv-hero-content">
        <p className="sv-kicker sv-mono">Divonne-les-Bains · Pays de Gex · Genève</p>
        <Title
          as="h1"
          variant="hero"
          parts={["Un site internet qui vous amène des ", { em: "clients." }]}
        />
        <p className="sv-lead sv-hero-pitch">
          Je suis Adel, développeur web installé à Divonne-les-Bains. J&apos;aide les commerces,
          artisans et indépendants de la région à être trouvés sur Google et contactés
          facilement depuis un téléphone. On se rencontre en personne, et vous avez un seul
          interlocuteur du début à la fin.
        </p>
        <div className="sv-actions">
          <a href="#contact" className="sv-btn sv-btn--primary">
            Demander un devis gratuit <span className="sv-arrow" aria-hidden="true">→</span>
          </a>
          <a href="#offres" className="sv-btn sv-btn--ghost">
            Voir les offres
          </a>
        </div>
        <ul className="sv-reassure">
          {REASSURE.split(" · ").map((item) => (
            <li className="sv-reassure-pill sv-mono" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
