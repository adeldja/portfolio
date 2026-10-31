import type { Metadata, Viewport } from "next";
import Hero from "@/components/product/Hero";
import Story from "@/components/product/StoryLazy";
import Pricing from "@/components/product/Pricing";
import About from "@/components/product/About";
import Work from "@/components/product/Work";
import Faq from "@/components/product/Faq";
import Contact from "@/components/product/Contact";
import Footer from "@/components/product/Footer";
import StickyBar from "@/components/product/StickyBar";
import { storyShared, storyTrades } from "@/lib/product";
import { SERVICES_PHONE_TEL, serviceStory } from "@/lib/services";

export const metadata: Metadata = {
  title: "Viktra, création de site internet (version test)",
  description:
    "Développeur web à Divonne-les-Bains : sites vitrines et fiches Google pour les commerces et artisans du Pays de Gex, de Nyon et de Genève.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#F2CDBE",
};

export default function ProductPage() {
  return (
    <>
      <main className="pd-main">
        <Hero />
        <Story chapters={serviceStory} trades={storyTrades} shared={storyShared} />
        <Pricing />
        <About />
        <Work />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <StickyBar phoneTel={SERVICES_PHONE_TEL} />
    </>
  );
}
