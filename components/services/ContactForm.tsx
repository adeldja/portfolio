"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { sendContactRequest } from "@/app/services/actions";
import {
  ACTIVITE_OPTIONS,
  BESOIN_OPTIONS,
  SERVICES_EMAIL,
  SERVICES_PHONE_DISPLAY,
  SERVICES_PHONE_TEL,
  type ContactState,
} from "@/lib/services";

const initialState: ContactState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary form-submit" disabled={pending}>
      {pending ? "Envoi en cours…" : "Envoyer ma demande"}
    </button>
  );
}

function describedBy(...ids: (string | false | undefined)[]) {
  const value = ids.filter(Boolean).join(" ");
  return value || undefined;
}

export default function ContactForm({ defaultBesoin }: { defaultBesoin: string }) {
  const [state, formAction] = useFormState(sendContactRequest, initialState);
  const [previousState, setPreviousState] = useState(state);
  const [formKey, setFormKey] = useState(0);
  const statusRef = useRef<HTMLDivElement>(null);

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
        className="form-status form-status--success"
        role="status"
        aria-live="polite"
        tabIndex={-1}
      >
        <h3 className="form-status-title">Merci, votre demande est bien envoyée.</h3>
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
    <div className="contact-form-wrap">
      {state.status === "invalid" ? (
        <div
          ref={statusRef}
          className="form-status form-status--error"
          role="alert"
          tabIndex={-1}
        >
          <p>Il manque quelques informations, voir ci-dessous.</p>
        </div>
      ) : null}

      {fallback ? (
        <div
          ref={statusRef}
          className="form-status form-status--error"
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
          <a className="btn btn-primary" href={state.mailto}>
            Envoyer par email
          </a>
        </div>
      ) : null}

      <form key={formKey} className="contact-form" action={formAction} noValidate>
        <p className="form-hint">Les champs marqués * sont obligatoires.</p>

        <div className="form-field">
          <label className="form-label" htmlFor="contact-nom">
            Votre nom *
          </label>
          <input
            id="contact-nom"
            className="form-input"
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
            <p className="form-error" id="err-nom">
              {errors.nom}
            </p>
          ) : null}
        </div>

        <fieldset
          className="form-fieldset"
          aria-describedby={describedBy("hint-contact", errors.contact && "err-contact")}
        >
          <legend className="form-label">Comment vous joindre ? *</legend>
          <p className="form-hint" id="hint-contact">
            Un téléphone ou un email suffit.
          </p>
          {errors.contact ? (
            <p className="form-error" id="err-contact">
              {errors.contact}
            </p>
          ) : null}

          <div className="form-field">
            <label className="form-label" htmlFor="contact-telephone">
              Téléphone
            </label>
            <input
              id="contact-telephone"
              className="form-input"
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
              <p className="form-error" id="err-telephone">
                {errors.telephone}
              </p>
            ) : null}
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="contact-email">
              Email
            </label>
            <input
              id="contact-email"
              className="form-input"
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
              <p className="form-error" id="err-email">
                {errors.email}
              </p>
            ) : null}
          </div>
        </fieldset>

        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="contact-activite">
              Votre activité
            </label>
            <select
              id="contact-activite"
              className="form-input"
              name="activite"
              defaultValue={values.activite ?? ""}
            >
              {ACTIVITE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label className="form-label" htmlFor="contact-besoin">
              Votre besoin
            </label>
            <select
              id="contact-besoin"
              className="form-input"
              name="besoin"
              defaultValue={values.besoin ?? defaultBesoin}
            >
              {BESOIN_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="contact-message">
            Votre message *
          </label>
          <textarea
            id="contact-message"
            className="form-input"
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
            <p className="form-error" id="err-message">
              {errors.message}
            </p>
          ) : null}
        </div>

        <div className="form-honeypot" aria-hidden="true">
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

        <p className="form-notice">
          Vos informations servent uniquement à répondre à votre demande. Elles me sont transmises
          par email et conservées au maximum 3 ans après notre dernier échange. Vous pouvez
          demander leur suppression à <a href={`mailto:${SERVICES_EMAIL}`}>{SERVICES_EMAIL}</a>.
          En savoir plus : <Link href="/services/confidentialite">Confidentialité</Link>
        </p>
      </form>
    </div>
  );
}
