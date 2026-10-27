import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/services/Hero";
import Offers from "@/components/services/Offers";
import Work from "@/components/services/Work";
import Steps from "@/components/services/Steps";
import Guarantees from "@/components/services/Guarantees";
import Faq from "@/components/services/Faq";
import Contact from "@/components/services/Contact";
import StickyBar from "@/components/services/StickyBar";
import { SERVICES_EMAIL, isBesoin } from "@/lib/services";

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

export default function ServicesPage({
  searchParams,
}: {
  searchParams: { besoin?: string | string[] };
}) {
  const requested = Array.isArray(searchParams.besoin)
    ? searchParams.besoin[0]
    : searchParams.besoin;
  const defaultBesoin = requested && isBesoin(requested) ? requested : "";

  return (
    <main className="main main--no-rail">
      <div className="main-inner">
        <Hero />
        <Offers />
        <Work />
        <Steps />
        <Guarantees />
        <Faq />
        <Contact defaultBesoin={defaultBesoin} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <footer className="services-footer mono">
          © Adel Djahnit · <Link href="/services/confidentialite">Confidentialité</Link>
        </footer>
      </div>
      <StickyBar />
    </main>
  );
}
