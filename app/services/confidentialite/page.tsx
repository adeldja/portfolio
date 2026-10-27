import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES_EMAIL } from "@/lib/services";

export const metadata: Metadata = {
  title: "Confidentialité | Adel Djahnit",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <main className="main main--no-rail">
      <div className="main-inner">
        <section className="section privacy">
          <p className="privacy-back mono">
            <Link href="/services">← Retour à la page Services</Link>
          </p>
          <h1 className="section-title">Confidentialité</h1>

          <h2 className="privacy-heading">Responsable du traitement</h2>
          <p className="privacy-text">
            Adel Djahnit, <a href={`mailto:${SERVICES_EMAIL}`}>{SERVICES_EMAIL}</a>.
          </p>

          <h2 className="privacy-heading">Données collectées</h2>
          <p className="privacy-text">
            Lorsque vous utilisez le formulaire de contact : votre nom, votre téléphone, votre
            email, votre activité, votre besoin et votre message.
          </p>

          <h2 className="privacy-heading">Pourquoi</h2>
          <p className="privacy-text">
            Ces informations servent uniquement à répondre à votre demande et à préparer un devis.
            Elles ne sont ni vendues ni utilisées pour de la publicité.
          </p>

          <h2 className="privacy-heading">Base légale</h2>
          <p className="privacy-text">
            Le traitement repose sur les mesures précontractuelles prises à votre demande : vous me
            contactez pour obtenir une réponse ou un devis, avant tout contrat.
          </p>

          <h2 className="privacy-heading">Prestataires</h2>
          <p className="privacy-text">
            Les messages du formulaire me sont transmis par email via le service Resend. Le site est
            hébergé par Vercel. Ces deux prestataires sont établis aux États-Unis.
          </p>

          <h2 className="privacy-heading">Durée de conservation</h2>
          <p className="privacy-text">
            Vos informations sont conservées au maximum 3 ans après notre dernier échange, puis
            supprimées.
          </p>

          <h2 className="privacy-heading">Vos droits</h2>
          <p className="privacy-text">
            Vous pouvez demander à accéder à vos données, à les corriger ou à les supprimer en
            écrivant à <a href={`mailto:${SERVICES_EMAIL}`}>{SERVICES_EMAIL}</a>. Vous pouvez
            aussi adresser une réclamation à la CNIL (
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
              cnil.fr
            </a>
            ).
          </p>

          <h2 className="privacy-heading">Mesure d&apos;audience</h2>
          <p className="privacy-text">
            Le site utilise Vercel Analytics pour compter les visites de façon anonyme. Aucun
            cookie publicitaire n&apos;est déposé.
          </p>
        </section>
      </div>
    </main>
  );
}
