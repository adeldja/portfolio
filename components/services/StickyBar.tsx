import { SERVICES_PHONE_TEL } from "@/lib/services";

export default function StickyBar() {
  return (
    <nav aria-label="Contact rapide" className="services-sticky">
      <a className="btn btn-outline" href={SERVICES_PHONE_TEL}>
        Appeler
      </a>
      <a className="btn btn-primary" href="#contact">
        Devis gratuit
      </a>
    </nav>
  );
}
