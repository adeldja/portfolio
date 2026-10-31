import { SERVICES_TOWNS_SENTENCE } from "@/lib/services";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="pd-footer pd-dark">
      <div className="pd-wrap pd-footer-grid">
        <div className="pd-footer-brand">
          <Logo className="pd-logo pd-logo--footer" />
          <p className="pd-footer-line">Ouvert, même quand vous êtes fermé.</p>
        </div>
        <svg
          className="pd-sunset"
          viewBox="0 0 160 112"
          width="160"
          height="112"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <clipPath id="pd-horizon">
              <rect x="0" y="0" width="160" height="80" />
            </clipPath>
          </defs>
          <circle cx="80" cy="80" r="80" className="pd-sunset-disc" clipPath="url(#pd-horizon)" />
          <rect x="0" y="80" width="160" height="32" className="pd-sunset-lake" />
          <rect x="0" y="79" width="160" height="2" className="pd-sunset-line" />
        </svg>
        <p className="pd-footer-towns">{SERVICES_TOWNS_SENTENCE}</p>
        <div className="pd-footer-row">
          <p>© Viktra, Adel Djahnit</p>
          <a href="/services/confidentialite">Confidentialité</a>
          <a href="#top">Haut de page</a>
        </div>
      </div>
    </footer>
  );
}
