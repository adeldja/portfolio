import type { Metadata } from "next";
import Hero from "@/components/services/Hero";
import Marquee from "@/components/services/Marquee";
import Story from "@/components/services/Story";
import Offers from "@/components/services/Offers";
import Work from "@/components/services/Work";
import Steps from "@/components/services/Steps";
import Guarantees from "@/components/services/Guarantees";
import Faq from "@/components/services/Faq";
import Contact from "@/components/services/Contact";
import Footer from "@/components/services/Footer";
import StickyBar from "@/components/services/StickyBar";
import MotionRoot from "@/components/services/MotionRoot";
import { SERVICES_EMAIL } from "@/lib/services";

const description =
  "Développeur web basé à Divonne-les-Bains. Sites vitrines, fiche Google et réservation en ligne pour les commerces, artisans et indépendants du Pays de Gex et de la région genevoise.";

export const metadata: Metadata = {
  title: "Création de site internet à Divonne-les-Bains et dans le Pays de Gex | Adel Djahnit",
  description,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Adel Djahnit — Création de sites internet",
  description,
  url: "https://www.adeldjahnit.com/services",
  telephone: "+33652338713",
  email: SERVICES_EMAIL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Divonne-les-Bains",
    postalCode: "01220",
    addressRegion: "Ain",
    addressCountry: "FR",
  },
  areaServed: [
    "Divonne-les-Bains",
    "Gex",
    "Ferney-Voltaire",
    "Saint-Genis-Pouilly",
    "Pays de Gex",
    "Nyon",
    "Genève",
  ].map((name) => ({ "@type": "Place", name })),
  priceRange: "À partir de 150 €",
};

export default function ServicesPage() {
  return (
    <div id="sv-page" className="sv-page">
      <div className="sv-grain" aria-hidden="true" />
      <div className="sv-progress" aria-hidden="true" />
      <main className="sv-main">
        <Hero />
        <Marquee />
        <Story />
        <Offers />
        <Work />
        <Steps />
        <Guarantees />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MotionRoot />
    </div>
  );
}
