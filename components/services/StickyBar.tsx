import { SERVICES_PHONE_TEL } from "@/lib/services";

export default function StickyBar() {
  return (
    <nav aria-label="Contact rapide" className="sv-sticky sv-theme-night">
      <a className="sv-btn sv-btn--ghost sv-sticky-btn" href={SERVICES_PHONE_TEL}>
        Appeler
      </a>
      <a className="sv-btn sv-btn--primary sv-sticky-btn" href="#contact">
        Devis gratuit
      </a>
    </nav>
  );
}
