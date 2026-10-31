import ContactForm from "@/components/product/ContactForm";
import WordMask from "@/components/product/WordMask";
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
    <section id="contact" className="pd-section pd-contact" aria-labelledby="contact-title">
      <div className="pd-wrap">
        <div className="pd-head">
          <WordMask id="contact-title" tabIndex={-1} text="Parlons de votre projet" />
          <p className="pd-body">
            Dites-moi en quelques mots ce que vous faites et ce que vous cherchez. Je vous réponds
            sous 24 heures. Le premier rendez-vous est gratuit et sans engagement.
          </p>
        </div>
        <div className="pd-contact-grid">
          <aside className="pd-call" aria-labelledby="contact-side-title">
            <h3 className="pd-call-title" id="contact-side-title">
              Vous préférez appeler ?
            </h3>
            <a className="pd-call-phone" href={SERVICES_PHONE_TEL}>
              {SERVICES_PHONE_DISPLAY}
            </a>
            <dl className="pd-call-list">
              {SERVICES_WHATSAPP_URL ? (
                <div>
                  <dt>WhatsApp</dt>
                  <dd>
                    <a href={SERVICES_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      Écrire sur WhatsApp
                    </a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={SERVICES_MAILTO}>{SERVICES_EMAIL}</a>
                </dd>
              </div>
              <div>
                <dt>Zone :</dt>
                <dd>{SERVICES_AREA.join(", ")}</dd>
              </div>
            </dl>
          </aside>
          <div className="pd-contact-form">
            <ContactForm
              action={sendContactRequest}
              activiteOptions={ACTIVITE_OPTIONS}
              besoinOptions={BESOIN_OPTIONS}
              email={SERVICES_EMAIL}
              phoneDisplay={SERVICES_PHONE_DISPLAY}
              phoneTel={SERVICES_PHONE_TEL}
              privacyLink={<a href="/services/confidentialite">Confidentialité</a>}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
