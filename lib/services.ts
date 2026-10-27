export interface ServiceOffer {
  name: string;
  price: string;
  description: string;
  items: string[];
}

export interface ServiceWorkItem {
  name: string;
  type: string;
  description: string;
  href: string | null;
}

export interface ServiceStep {
  title: string;
  text: string;
}

export const SERVICES_EMAIL = "adel.djahnit.pro@gmail.com";
export const SERVICES_MAILTO = `mailto:${SERVICES_EMAIL}?subject=${encodeURIComponent(
  "Demande de devis — site internet"
)}`;

export const serviceOffers: ServiceOffer[] = [
  {
    name: "Visibilité Google",
    price: "à partir de 150 €",
    description:
      "Votre fiche Google complète et à jour : photos, horaires, catégories, description, réponses aux avis. C'est souvent la première chose que vos clients voient.",
    items: ["Fiche Google optimisée", "Photos et horaires", "Conseils pour obtenir des avis"],
  },
  {
    name: "Site vitrine",
    price: "à partir de 690 €",
    description:
      "Un site clair, rapide et lisible sur téléphone, qui présente votre activité et permet de vous contacter ou de demander un devis en un clic.",
    items: [
      "1 à 5 pages",
      "Adapté au mobile",
      "Formulaire de contact ou de devis",
      "Référencement local (Divonne, Gex, Genève…)",
      "Version anglaise en option",
      "Livré en 2 semaines environ",
    ],
  },
  {
    name: "Suivi et maintenance",
    price: "à partir de 25 € / mois",
    description:
      "Hébergement, mises à jour et petites modifications (horaires, carte, tarifs, photos). Vous m'envoyez un message, je m'en occupe.",
    items: ["Hébergement inclus", "Petites modifications", "Sans engagement"],
  },
];

export const serviceWork: ServiceWorkItem[] = [
  {
    name: "Globalpronet",
    type: "Entreprise de nettoyage — Genève",
    description:
      "Réécriture des textes du site pour améliorer son référencement sur Google, sans toucher au design existant.",
    href: "https://globalpronet.ch",
  },
  {
    name: "JSL Judo",
    type: "Club sportif",
    description: "Site associatif du club, développé en Symfony.",
    href: null,
  },
  {
    name: "OsUp",
    type: "Start-up",
    description: "Site vitrine de l'entreprise.",
    href: null,
  },
  {
    name: "Bonee",
    type: "Application mobile",
    description:
      "Application de budget conçue et développée de A à Z, publiée sur l'App Store et le Google Play Store.",
    href: "https://apps.apple.com/fr/app/bonee-budget-%C3%A9pargne/id6762883127",
  },
];

export const serviceSteps: ServiceStep[] = [
  {
    title: "On se rencontre",
    text: "Chez vous ou par téléphone, 20 minutes pour comprendre votre activité et vos besoins.",
  },
  {
    title: "Je vous envoie un devis",
    text: "Un prix fixe, sans surprise. Un acompte de 40 % lance le projet.",
  },
  {
    title: "Je crée votre site",
    text: "Vous voyez l'avancement et vous donnez votre avis à chaque étape.",
  },
  {
    title: "Mise en ligne",
    text: "Votre site est en ligne, et je reste disponible pour les modifications.",
  },
];
