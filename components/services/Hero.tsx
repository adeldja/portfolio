import { SERVICES_MAILTO } from "@/lib/services";

export default function Hero() {
  return (
    <section className="hero services-hero">
      <div className="hero-content">
        <p className="services-kicker mono">Divonne-les-Bains · Pays de Gex · Genève</p>
        <h1 className="hero-title">Un site internet qui vous amène des clients.</h1>
        <p className="hero-pitch">
          Je suis Adel, développeur web installé à Divonne-les-Bains. J&apos;aide les commerces,
          artisans et indépendants de la région à être trouvés sur Google et contactés
          facilement depuis un téléphone. On se rencontre en personne, et vous avez un seul
          interlocuteur du début à la fin.
        </p>
        <div className="hero-actions">
          <a href={SERVICES_MAILTO} className="btn btn-primary">
            Demander un devis gratuit
          </a>
          <a href="#offres" className="btn btn-outline">
            Voir les offres
          </a>
        </div>
      </div>
    </section>
  );
}
