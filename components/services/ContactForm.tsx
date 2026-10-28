"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useFormState, useFormStatus } from "react-dom";
import type { ContactState } from "@/lib/services";
import BesoinSelect, { isKnownBesoin, type BesoinOption } from "@/components/services/BesoinSelect";
import { scrollToTarget } from "@/components/services/motion/store";

// The Server Action and the data from lib/services.ts arrive as props from the
// server <Contact>: importing them here would share client modules with the
// /services chunk and change its size.
export interface ContactFormProps {
  action: (prev: ContactState, formData: FormData) => Promise<ContactState>;
  activiteOptions: BesoinOption[];
  besoinOptions: BesoinOption[];
  email: string;
  phoneDisplay: string;
  phoneTel: string;
  /** Rendered by the server (next/link) so this client chunk does not import next/link. */
  privacyLink: ReactNode;
}

const initialState: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="sv-btn sv-btn--primary sv-form-submit" disabled={pending}>
      {pending ? "Envoi en cours…" : "Envoyer ma demande"}
    </button>
  );
}

function describedBy(...ids: (string | false | undefined)[]) {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}

/** Offer CTAs (a[data-besoin]): pre-select the need and move to the form without a reload. */
function useOfferLinks(besoinOptions: BesoinOption[]) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      const link = target.closest<HTMLAnchorElement>("a[data-besoin]");
      const besoin = link?.dataset.besoin ?? "";
      const contact = document.getElementById("contact");
      if (!link || !contact || !isKnownBesoin(besoinOptions, besoin)) {
        return;
      }
      event.preventDefault();
      const select = document.getElementById("contact-besoin");
      if (select instanceof HTMLSelectElement) {
        select.value = besoin;
      }
      window.history.replaceState(window.history.state, "", `/services?besoin=${besoin}#contact`);
      scrollToTarget(contact);
      document.getElementById("contact-title")?.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [besoinOptions]);
}

export default function ContactForm({
  action,
  activiteOptions,
  besoinOptions,
  email: SERVICES_EMAIL,
  phoneDisplay: SERVICES_PHONE_DISPLAY,
  phoneTel: SERVICES_PHONE_TEL,
  privacyLink,
}: ContactFormProps) {
  const [state, formAction] = useFormState(action, initialState);
  const [previousState, setPreviousState] = useState(state);
  const [formKey, setFormKey] = useState(0);
  const statusRef = useRef<HTMLDivElement>(null);

  useOfferLinks(besoinOptions);

  if (state !== previousState) {
    setPreviousState(state);
    setFormKey((key) => key + 1);
  }

  useEffect(() => {
    if (state.status !== "idle") {
      statusRef.current?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        ref={statusRef}
        className="sv-card sv-form-card sv-status sv-status--success"
        role="status"
        aria-live="polite"
        tabIndex={-1}
      >
        <h3 className="sv-status-title">Merci, votre demande est bien envoyée.</h3>
        <p>
          Je vous réponds sous 24 heures, par téléphone ou par email. Si c&apos;est urgent :{" "}
          <a href={SERVICES_PHONE_TEL}>{SERVICES_PHONE_DISPLAY}</a>.
        </p>
      </div>
    );
  }

  const errors = state.errors ?? {};
  const values = state.values ?? {};
  const fallback = state.status === "unavailable" || state.status === "error";

  return (
    <div className="sv-card sv-form-card">
      {state.status === "invalid" ? (
        <div ref={statusRef} className="sv-status sv-status--error" role="alert" tabIndex={-1}>
          <p>Il manque quelques informations, voir ci-dessous.</p>
        </div>
      ) : null}

      {fallback ? (
        <div
          ref={statusRef}
          className="sv-status sv-status--error"
          role="status"
          aria-live="polite"
          tabIndex={-1}
        >
          <p>
            {state.status === "unavailable"
              ? "Le formulaire n'est pas disponible pour le moment et votre message n'a pas été envoyé."
              : "Votre message n'a pas pu être envoyé à cause d'un problème technique de mon côté."}{" "}
            Vous pouvez me l&apos;envoyer par email en un clic, ou m&apos;appeler au{" "}
            <a href={SERVICES_PHONE_TEL}>{SERVICES_PHONE_DISPLAY}</a>.
          </p>
          <a className="sv-btn sv-btn--primary" href={state.mailto}>
            Envoyer par email
          </a>
        </div>
      ) : null}

      <form key={formKey} className="sv-form" action={formAction} noValidate>
        <p className="sv-form-hint">Les champs marqués * sont obligatoires.</p>

        <div className="sv-field">
          <label className="sv-label" htmlFor="contact-nom">
            Votre nom *
          </label>
          <input
            id="contact-nom"
            className="sv-input"
            type="text"
            name="nom"
            autoComplete="name"
            maxLength={100}
            required
            aria-required="true"
            aria-invalid={errors.nom ? true : undefined}
            aria-describedby={describedBy(errors.nom && "err-nom")}
            defaultValue={values.nom ?? ""}
          />
          {errors.nom ? (
            <p className="sv-form-error" id="err-nom">
              {errors.nom}
            </p>
          ) : null}
        </div>

        <fieldset
          className="sv-fieldset"
          aria-describedby={describedBy("hint-contact", errors.contact && "err-contact")}
        >
          <legend className="sv-label">Comment vous joindre ? *</legend>
          <p className="sv-form-hint" id="hint-contact">
            Un téléphone ou un email suffit.
          </p>
          {errors.contact ? (
            <p className="sv-form-error" id="err-contact">
              {errors.contact}
            </p>
          ) : null}

          <div className="sv-form-row">
            <div className="sv-field">
              <label className="sv-label" htmlFor="contact-telephone">
                Téléphone
              </label>
              <input
                id="contact-telephone"
                className="sv-input"
                type="tel"
                inputMode="tel"
                name="telephone"
                autoComplete="tel"
                maxLength={30}
                aria-invalid={errors.telephone || errors.contact ? true : undefined}
                aria-describedby={describedBy(
                  errors.telephone && "err-telephone",
                  errors.contact && "err-contact"
                )}
                defaultValue={values.telephone ?? ""}
              />
              {errors.telephone ? (
                <p className="sv-form-error" id="err-telephone">
                  {errors.telephone}
                </p>
              ) : null}
            </div>

            <div className="sv-field">
              <label className="sv-label" htmlFor="contact-email">
                Email
              </label>
              <input
                id="contact-email"
                className="sv-input"
                type="email"
                name="email"
                autoComplete="email"
                maxLength={200}
                aria-invalid={errors.email || errors.contact ? true : undefined}
                aria-describedby={describedBy(
                  errors.email && "err-email",
                  errors.contact && "err-contact"
                )}
                defaultValue={values.email ?? ""}
              />
              {errors.email ? (
                <p className="sv-form-error" id="err-email">
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>
        </fieldset>

        <div className="sv-form-row">
          <div className="sv-field">
            <label className="sv-label" htmlFor="contact-activite">
              Votre activité
            </label>
            <select
              id="contact-activite"
              className="sv-input"
              name="activite"
              defaultValue={values.activite ?? ""}
            >
              {activiteOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sv-field">
            <label className="sv-label" htmlFor="contact-besoin">
              Votre besoin
            </label>
            <BesoinSelect options={besoinOptions} value={values.besoin} />
          </div>
        </div>

        <div className="sv-field">
          <label className="sv-label" htmlFor="contact-message">
            Votre message *
          </label>
          <textarea
            id="contact-message"
            className="sv-input"
            name="message"
            rows={5}
            maxLength={3000}
            required
            aria-required="true"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy(errors.message && "err-message")}
            placeholder="Ex. : je tiens une boulangerie à Gex et je voudrais que mes clients trouvent mes horaires sur Google."
            defaultValue={values.message ?? ""}
          />
          {errors.message ? (
            <p className="sv-form-error" id="err-message">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="sv-honeypot" aria-hidden="true">
          <label htmlFor="contact-entreprise-site">Site de votre entreprise</label>
          <input
            id="contact-entreprise-site"
            type="text"
            name="entreprise_site"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <SubmitButton />

        <p className="sv-form-notice">
          Vos informations servent uniquement à répondre à votre demande. Elles me sont transmises
          par email et conservées au maximum 3 ans après notre dernier échange. Vous pouvez
          demander leur suppression à <a href={`mailto:${SERVICES_EMAIL}`}>{SERVICES_EMAIL}</a>.
          En savoir plus : {privacyLink}
        </p>
      </form>
    </div>
  );
}
