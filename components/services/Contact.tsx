import Link from "next/link";
import ContactForm from "@/components/services/ContactForm";
import Title from "@/components/services/Title";
import { sendContactRequest } from "@/app/services/actions";
import {
  ACTIVITE_OPTIONS,
  BESOIN_OPTIONS,
  SERVICES_AREA,
  SERVICES_EMAIL,
  SERVICES_MAILTO,
  SERVICES_PHONE_DISPLAY,
  SERVICES_PHONE_TEL,
  SERVICES_WHATSAPP_URL,
} from "@/lib/services";

export default function Contact() {
  return (
    <section
      id="contact"
      className="sv-section sv-contact sv-theme-day"
      aria-labelledby="contact-title"
      data-loop=""
    >
      <div className="sv-contact-sun" aria-hidden="true" />
      <div className="sv-container sv-contact-inner">
        <Title
          id="contact-title"
          tabIndex={-1}
          parts={["Parlons de ", { em: "votre projet" }]}
        />
        <p className="sv-lead sv-contact-intro">
          Dites-moi en quelques mots ce que vous faites et ce que vous cherchez. Je vous réponds
          sous 24 heures. Le premier rendez-vous est gratuit et sans engagement.
        </p>
        <div className="sv-contact-layout">
          <ContactForm
            action={sendContactRequest}
            activiteOptions={ACTIVITE_OPTIONS}
            besoinOptions={BESOIN_OPTIONS}
            email={SERVICES_EMAIL}
            phoneDisplay={SERVICES_PHONE_DISPLAY}
            phoneTel={SERVICES_PHONE_TEL}
            privacyLink={<Link href="/services/confidentialite">Confidentialité</Link>}
          />
          <aside className="sv-contact-side sv-theme-night" aria-labelledby="contact-side-title">
            <h3 className="sv-contact-side-title" id="contact-side-title">
              Vous préférez appeler ?
            </h3>
            <a className="sv-contact-phone" href={SERVICES_PHONE_TEL}>
              {SERVICES_PHONE_DISPLAY}
            </a>
            <dl className="sv-contact-list">
              {SERVICES_WHATSAPP_URL ? (
                <div className="sv-contact-item">
                  <dt className="sv-contact-label sv-mono">WhatsApp</dt>
                  <dd>
                    <a
                      className="sv-contact-value"
                      href={SERVICES_WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Écrire sur WhatsApp
                    </a>
                  </dd>
                </div>
              ) : null}
              <div className="sv-contact-item">
                <dt className="sv-contact-label sv-mono">Email</dt>
                <dd>
                  <a className="sv-contact-value" href={SERVICES_MAILTO}>
                    {SERVICES_EMAIL}
                  </a>
                </dd>
              </div>
              <div className="sv-contact-item">
                <dt className="sv-contact-label sv-mono">Zone</dt>
                <dd>
                  <span className="sv-contact-value sv-contact-value--text">
                    {SERVICES_AREA.join(", ")}
                  </span>
                </dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
