import Link from "next/link";
import MotionToggle from "@/components/services/MotionToggle";

export default function Footer() {
  return (
    <footer className="sv-footer sv-theme-night">
      <div className="sv-container">
        <p className="sv-footer-line sv-em">À bientôt, près de chez vous.</p>
        <div className="sv-footer-row">
          <p className="sv-footer-legal sv-mono">
            © Adel Djahnit · <Link href="/services/confidentialite">Confidentialité</Link>
          </p>
          <MotionToggle />
          <a className="sv-footer-top sv-mono" href="#top">
            Haut de page <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
