"use server";

import {
  ACTIVITE_OPTIONS,
  BESOIN_OPTIONS,
  SERVICES_EMAIL,
  type ContactState,
  type ServiceOption,
} from "@/lib/services";

const PHONE_PATTERN = /^\+?\d{6,15}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function optionLabel(options: ServiceOption[], value: string): string {
  if (!value) {
    return "";
  }
  return options.find((option) => option.value === value)?.label ?? "";
}

function knownOption(options: ServiceOption[], value: string): string {
  return value && options.some((option) => option.value === value) ? value : "";
}

export async function sendContactRequest(
  prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  if (readField(formData, "entreprise_site")) {
    return { status: "success" };
  }

  const values = {
    nom: readField(formData, "nom"),
    telephone: readField(formData, "telephone"),
    email: readField(formData, "email"),
    activite: knownOption(ACTIVITE_OPTIONS, readField(formData, "activite")),
    besoin: knownOption(BESOIN_OPTIONS, readField(formData, "besoin")),
    message: readField(formData, "message"),
  };

  const errors: NonNullable<ContactState["errors"]> = {};

  if (values.nom.length < 2 || values.nom.length > 100) {
    errors.nom = "Indiquez votre nom.";
  }

  if (values.telephone && !PHONE_PATTERN.test(values.telephone.replace(/[\s.\-()]/g, ""))) {
    errors.telephone = "Ce numéro ne semble pas valide.";
  }

  if (values.email && (values.email.length > 200 || !EMAIL_PATTERN.test(values.email))) {
    errors.email = "Cet email ne semble pas valide.";
  }

  if (!values.telephone && !values.email) {
    errors.contact = "Indiquez un téléphone ou un email pour que je puisse vous répondre.";
  }

  if (values.message.length < 10 || values.message.length > 3000) {
    errors.message = "Écrivez quelques mots sur votre projet (10 caractères minimum).";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors, values };
  }

  const activiteLabel = optionLabel(ACTIVITE_OPTIONS, values.activite);
  const besoinLabel = optionLabel(BESOIN_OPTIONS, values.besoin);

  const summary = [
    `Nom : ${values.nom}`,
    `Téléphone : ${values.telephone}`,
    `Email : ${values.email}`,
    `Activité : ${activiteLabel}`,
    `Besoin : ${besoinLabel}`,
  ].join("\n");

  const mailtoBody = `${summary}\n\n${values.message}`.slice(0, 1500);
  const mailto = `mailto:${SERVICES_EMAIL}?subject=${encodeURIComponent(
    "Demande de devis — site internet"
  )}&body=${encodeURIComponent(mailtoBody)}`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set, message not sent.");
    return { status: "unavailable", values, mailto };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? "Formulaire site <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? SERVICES_EMAIL],
        ...(values.email ? { reply_to: values.email } : {}),
        subject: `Nouvelle demande — ${values.nom}${besoinLabel ? " (" + besoinLabel + ")" : ""}`,
        text: `${summary}\n\nMessage :\n${values.message}\n\nEnvoyé depuis le formulaire /services`,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error(
        `Contact form: Resend responded ${response.status}`,
        await response.text().catch(() => "")
      );
      return { status: "error", values, mailto };
    }
  } catch (error) {
    console.error("Contact form: request to Resend failed", error);
    return { status: "error", values, mailto };
  }

  return { status: "success" };
}
