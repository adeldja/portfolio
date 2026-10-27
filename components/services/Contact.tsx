import Link from "next/link";
import { SERVICES_EMAIL, SERVICES_MAILTO } from "@/lib/services";

export default function Contact() {
  return (
    <section id="contact" className="section">
      <h2 className="section-title">Parlons de votre projet</h2>
      <p className="hero-pitch">
        Dites-moi en deux lignes ce que vous faites et ce que vous cherchez. Je vous réponds sous
        24 heures.
      </p>
      <div className="contact-list">
        <div className="contact-item">
          <span className="contact-label mono">Email</span>
          <a className="contact-value" href={SERVICES_MAILTO}>
            {SERVICES_EMAIL}
          </a>
        </div>
        <div className="contact-item">
          <span className="contact-label mono">Zone</span>
          <span className="contact-value">
            Divonne-les-Bains, Gex, Ferney-Voltaire, Nyon, Genève
          </span>
        </div>
      </div>
      <p className="footer mono">
        <Link href="/">← Voir mon portfolio de développeur</Link>
      </p>
    </section>
  );
}
