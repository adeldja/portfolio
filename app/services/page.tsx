import type { Metadata } from "next";
import Hero from "@/components/services/Hero";
import Offers from "@/components/services/Offers";
import Work from "@/components/services/Work";
import Steps from "@/components/services/Steps";
import Contact from "@/components/services/Contact";

export const metadata: Metadata = {
  title: "Création de site internet à Divonne-les-Bains et dans le Pays de Gex | Adel Djahnit",
  description:
    "Développeur web basé à Divonne-les-Bains. Sites vitrines, fiche Google et réservation en ligne pour les commerces, artisans et indépendants du Pays de Gex et de la région genevoise.",
};

export default function ServicesPage() {
  return (
    <main className="main main--no-rail">
      <div className="main-inner">
        <Hero />
        <Offers />
        <Work />
        <Steps />
        <Contact />
      </div>
    </main>
  );
}
