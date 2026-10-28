import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Footer from "@/components/services/Footer";
import Title from "@/components/services/Title";
import { SERVICES_EMAIL } from "@/lib/services";

export const metadata: Metadata = {
  title: "Confidentialité | Adel Djahnit",
  robots: { index: false },
};

const email = <a href={`mailto:${SERVICES_EMAIL}`}>{SERVICES_EMAIL}</a>;

const blocks: { title: string; body: ReactNode }[] = [
  {
    title: "Responsable du traitement",
    body: <>Adel Djahnit, {email}.</>,
  },
  {
    title: "Données collectées",
    body: (
      <>
        Lorsque vous utilisez le formulaire de contact : votre nom, votre téléphone, votre email,
        votre activité, votre besoin et votre message.
      </>
    ),
  },
  {
    title: "Pourquoi",
    body: (
      <>
        Ces informations servent uniquement à répondre à votre demande et à préparer un devis.
        Elles ne sont ni vendues ni utilisées pour de la publicité.
      </>
    ),
  },
  {
    title: "Base légale",
    body: (
      <>
        Le traitement repose sur les mesures précontractuelles prises à votre demande : vous me
        contactez pour obtenir une réponse ou un devis, avant tout contrat.
      </>
    ),
  },
  {
    title: "Prestataires",
    body: (
      <>
        Les messages du formulaire me sont transmis par email via le service Resend. Le site est
        hébergé par Vercel. Ces deux prestataires sont établis aux États-Unis.
      </>
    ),
  },
  {
    title: "Durée de conservation",
    body: (
      <>
        Vos informations sont conservées au maximum 3 ans après notre dernier échange, puis
        supprimées.
      </>
    ),
  },
  {
    title: "Vos droits",
    body: (
      <>
        Vous pouvez demander à accéder à vos données, à les corriger ou à les supprimer en
        écrivant à {email}. Vous pouvez aussi adresser une réclamation à la CNIL (
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          cnil.fr
        </a>
        ).
      </>
    ),
  },
  {
    title: "Mesure d'audience",
    body: (
      <>
        Le site utilise Vercel Analytics pour compter les visites de façon anonyme. Aucun cookie
        publicitaire n&apos;est déposé.
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <div id="sv-page" className="sv-page">
      <div className="sv-grain" aria-hidden="true" />
      <header id="top" className="sv-legal-head sv-theme-night">
        <div className="sv-container sv-hero-bar">
          <Link href="/services" className="sv-wordmark">
            <span className="sv-wordmark-name">Adel Djahnit</span>
            <span className="sv-wordmark-role sv-mono">Développeur web</span>
          </Link>
          <div className="sv-hero-bar-actions">
            <Link
              href="/services#contact"
              className="sv-btn sv-btn--primary sv-btn--sm sv-hero-bar-cta"
            >
              Devis gratuit <span className="sv-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="sv-container sv-legal-intro">
          <p className="sv-kicker sv-mono">Données personnelles</p>
          <Title as="h1" parts={[{ em: "Confidentialité" }]} />
          <p className="sv-lead">
            Ce que deviennent les informations que vous m&apos;envoyez avec le formulaire de
            contact.
          </p>
          <Link href="/services" className="sv-legal-back sv-mono">
            ← Retour à la page Services
          </Link>
        </div>
      </header>

      <main className="sv-section sv-legal sv-theme-day">
        <div className="sv-container sv-legal-body">
          {blocks.map((block) => (
            <section className="sv-legal-block" key={block.title}>
              <h2>{block.title}</h2>
              <p>{block.body}</p>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
