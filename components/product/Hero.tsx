import { productHero } from "@/lib/product";
import Logo from "./Logo";

/** Jura crest (La Dôle at ~70%) and low rolling hills, drawn on a 1440×340 box. */
const BACK_RIDGE =
  "M0 340 L0 236 C150 232 300 222 450 210 C590 199 700 184 790 160 C870 138 920 72 975 40 C1005 22 1035 20 1062 30 C1100 44 1135 84 1185 112 C1270 156 1360 170 1440 176 L1440 340 Z";
const FRONT_RIDGE =
  "M0 340 L0 270 C140 254 280 258 410 272 C540 286 660 270 790 258 C930 245 1070 268 1200 280 C1310 290 1390 282 1440 276 L1440 340 Z";

export default function Hero() {
  return (
    <section id="top" className="pd-hero" aria-labelledby="hero-title">
      <div className="pd-hero-art" aria-hidden="true">
        <div className="pd-sun-track">
          <div className="pd-sun" />
        </div>
        <svg
          className="pd-ridges"
          viewBox="0 0 1440 340"
          preserveAspectRatio="xMidYMax slice"
          focusable="false"
        >
          <path className="pd-ridge-back" d={BACK_RIDGE} />
          <path className="pd-ridge-front" d={FRONT_RIDGE} />
        </svg>
      </div>

      <div className="pd-wrap pd-hero-bar">
        <a href="#top" className="pd-brand">
          <Logo className="pd-logo" />
          <span className="pd-brand-role">par Adel Djahnit</span>
        </a>
        <a href="#contact" className="pd-btn pd-btn--primary pd-btn--sm">
          Devis gratuit
        </a>
      </div>

      <div className="pd-wrap pd-hero-content">
        <h1 className="pd-h1" id="hero-title">{productHero.title}</h1>
        <p className="pd-hero-lead">{productHero.lead}</p>
        <div className="pd-hero-actions">
          <a href="#contact" className="pd-btn pd-btn--primary">
            Demander un devis gratuit
          </a>
          <a href="#tarifs" className="pd-textlink">
            Voir les tarifs
          </a>
        </div>
      </div>
    </section>
  );
}
