import ContactForm from "@/components/services/ContactForm";
import {
  SERVICES_AREA,
  SERVICES_EMAIL,
  SERVICES_MAILTO,
  SERVICES_PHONE_DISPLAY,
  SERVICES_PHONE_TEL,
  SERVICES_WHATSAPP_URL,
} from "@/lib/services";

export default function Contact({ defaultBesoin }: { defaultBesoin: string }) {
  return (
    <section id="contact" className="section">
      <h2 className="section-title">Parlons de votre projet</h2>
      <p className="hero-pitch">
        Dites-moi en quelques mots ce que vous faites et ce que vous cherchez. Je vous réponds
        sous 24 heures. Le premier rendez-vous est gratuit et sans engagement.
      </p>
      <div className="contact-layout">
        <ContactForm defaultBesoin={defaultBesoin} />
        <aside className="contact-side" aria-labelledby="contact-side-title">
          <h3 className="contact-side-title" id="contact-side-title">
            Vous préférez appeler ?
          </h3>
          <div className="contact-list">
            <div className="contact-item">
              <span className="contact-label mono">Téléphone</span>
              <a className="contact-value" href={SERVICES_PHONE_TEL}>
                {SERVICES_PHONE_DISPLAY}
              </a>
            </div>
            {SERVICES_WHATSAPP_URL ? (
              <div className="contact-item">
                <span className="contact-label mono">WhatsApp</span>
                <a
                  className="contact-value"
                  href={SERVICES_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Écrire sur WhatsApp
                </a>
              </div>
            ) : null}
            <div className="contact-item">
              <span className="contact-label mono">Email</span>
              <a className="contact-value" href={SERVICES_MAILTO}>
                {SERVICES_EMAIL}
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label mono">Zone</span>
              <span className="contact-value">{SERVICES_AREA.join(", ")}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
