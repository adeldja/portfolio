export interface ServiceOption {
  value: string;
  label: string;
}

export const ACTIVITE_OPTIONS: ServiceOption[] = [
  { value: "", label: "— Choisir —" },
  { value: "commerce", label: "Commerce" },
  { value: "restaurant", label: "Restaurant, bar, café" },
  { value: "artisan", label: "Artisan, bâtiment" },
  { value: "beaute", label: "Coiffure, beauté, bien-être" },
  { value: "independant", label: "Indépendant, profession libérale" },
  { value: "autre", label: "Autre" },
];

export const BESOIN_OPTIONS: ServiceOption[] = [
  { value: "", label: "— Choisir —" },
  { value: "google", label: "Fiche Google" },
  { value: "site", label: "Site vitrine" },
  { value: "refonte", label: "Refonte d'un site existant" },
  { value: "maintenance", label: "Suivi et maintenance" },
  { value: "autre", label: "Je ne sais pas encore" },
];

export type Besoin = "google" | "site" | "refonte" | "maintenance" | "autre";

export function isBesoin(value: string): value is Besoin {
  return value !== "" && BESOIN_OPTIONS.some((option) => option.value === value);
}

export interface ServiceOffer {
  name: string;
  price: string;
  description: string;
  items: string[];
  besoin: Besoin;
  cta: string;
}

export interface ServiceWorkItem {
  name: string;
  type: string;
  description: string;
  href: string | null;
  linkLabel: string | null;
}

export interface ServiceStep {
  title: string;
  text: string;
}

export interface ServiceGuarantee {
  title: string;
  text: string;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export type ContactField = "nom" | "contact" | "telephone" | "email" | "message";

export type ContactState = {
  status: "idle" | "success" | "invalid" | "unavailable" | "error";
  errors?: Partial<Record<ContactField, string>>;
  values?: Record<string, string>;
  mailto?: string;
};

export const SERVICES_EMAIL = "adel.djahnit.pro@gmail.com";
export const SERVICES_MAILTO = `mailto:${SERVICES_EMAIL}?subject=${encodeURIComponent(
  "Demande de devis — site internet"
)}`;

export const SERVICES_PHONE_DISPLAY = "06 52 33 87 13";
export const SERVICES_PHONE_TEL = "tel:+33652338713";
export const SERVICES_WHATSAPP_URL: string | null =
  "https://wa.me/33652338713?text=" +
  encodeURIComponent("Bonjour Adel, je vous contacte depuis votre site. Mon activité : ");

export const SERVICES_AREA = [
  "Divonne-les-Bains",
  "Gex",
  "Ferney-Voltaire",
  "Saint-Genis-Pouilly",
  "Nyon",
  "Genève",
];

export const serviceOffers: ServiceOffer[] = [
  {
    name: "Visibilité Google",
    price: "à partir de 150 €",
    description:
      "Votre fiche Google complète et à jour : photos, horaires, catégories, description, réponses aux avis. C'est souvent la première chose que vos clients voient.",
    items: ["Fiche Google optimisée", "Photos et horaires", "Conseils pour obtenir des avis"],
    besoin: "google",
    cta: "Je veux être visible sur Google",
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
    besoin: "site",
    cta: "Je veux un site",
  },
  {
    name: "Suivi et maintenance",
    price: "à partir de 25 € / mois",
    description:
      "Hébergement, mises à jour et petites modifications (horaires, carte, tarifs, photos). Vous m'envoyez un message, je m'en occupe.",
    items: ["Hébergement inclus", "Petites modifications", "Sans engagement"],
    besoin: "maintenance",
    cta: "Je veux le suivi",
  },
];

export const serviceWork: ServiceWorkItem[] = [
  {
    name: "Globalpronet",
    type: "Entreprise de nettoyage — Genève",
    description:
      "Réécriture des textes du site pour qu'il soit mieux référencé sur Google. Le design et le site existants n'ont pas été modifiés.",
    href: "https://globalpronet.ch",
    linkLabel: "Voir le site →",
  },
  {
    name: "JSL Judo",
    type: "Club sportif",
    description: "Développement du site internet du club avec le framework Symfony.",
    href: null,
    linkLabel: null,
  },
  {
    name: "OsUp",
    type: "Start-up",
    description: "Développement du site vitrine de la start-up.",
    href: null,
    linkLabel: null,
  },
  {
    name: "Bonee",
    type: "Projet personnel — application mobile",
    description:
      "Application de budget que j'ai conçue et développée seul, publiée sur l'App Store et le Google Play Store.",
    href: "https://apps.apple.com/fr/app/bonee-budget-%C3%A9pargne/id6762883127",
    linkLabel: "Voir sur l'App Store →",
  },
];

export const serviceSteps: ServiceStep[] = [
  {
    title: "On se rencontre",
    text: "Chez vous ou par téléphone, 20 minutes pour comprendre votre activité et vos besoins.",
  },
  {
    title: "Je vous envoie un devis",
    text: "Un prix fixe, sans surprise. Un acompte de 40 % lance le projet, le solde est payé à la livraison.",
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

export const serviceGuarantees: ServiceGuarantee[] = [
  {
    title: "Un prix fixe",
    text: "Le prix du devis est celui que vous payez. Pas de frais cachés.",
  },
  {
    title: "Un seul interlocuteur",
    text: "C'est moi qui vous rencontre, qui crée votre site et qui le suis ensuite.",
  },
  {
    title: "Près de chez vous",
    text: "Installé à Divonne-les-Bains, je me déplace dans le Pays de Gex, à Nyon et à Genève.",
  },
  {
    title: "Votre site vous appartient",
    text: "Le nom de domaine est à votre nom. Si vous arrêtez le suivi, je vous remets tout ce qu'il faut pour le confier à quelqu'un d'autre.",
  },
  {
    title: "Sans engagement",
    text: "Le suivi mensuel s'arrête quand vous le souhaitez.",
  },
];

export const serviceFaq: ServiceFaqItem[] = [
  {
    question: "Combien coûte un site au total ?",
    answer:
      "Le prix dépend du nombre de pages et des fonctions souhaitées. Un site vitrine démarre à 690 €, une fiche Google à 150 €. Vous recevez un devis à prix fixe avant de vous engager.",
  },
  {
    question: "Et ensuite, qu'est-ce que je paie chaque mois ou chaque année ?",
    answer:
      "Le suivi, à partir de 25 € par mois, comprend l'hébergement du site, les mises à jour et les petites modifications (horaires, tarifs, photos, carte). Il est sans engagement. Le nom de domaine (votre adresse, par exemple votre-commerce.fr) est payé à part, une fois par an : son prix exact figure dans le devis.",
  },
  {
    question: "En combien de temps mon site est-il en ligne ?",
    answer:
      "Comptez environ 2 semaines pour un site vitrine, à partir du moment où j'ai vos textes et vos photos. Une fiche Google est plus rapide à mettre en place.",
  },
  {
    question: "Je n'ai ni textes ni photos, et je ne suis pas à l'aise avec l'informatique.",
    answer:
      "Ce n'est pas un problème. Pendant le rendez-vous, vous me parlez de votre activité et je vous aide à rédiger les textes ; vous les relisez avant la mise en ligne. Pour les photos, on peut partir de celles de votre téléphone.",
  },
  {
    question: "Une fiche Google ne suffit-elle pas ?",
    answer:
      "Pour certains commerces, si : c'est pour ça que je la propose seule. Un site devient utile quand vous voulez présenter vos prestations en détail, afficher vos tarifs ou recevoir des demandes de devis.",
  },
  {
    question: "Est-ce que je serai premier sur Google ?",
    answer:
      "Personne ne peut le garantir honnêtement. Ce que je fais : un site rapide et lisible sur téléphone, des textes qui citent votre métier et votre ville, et une fiche Google complète. Ce sont les bases d'un bon référencement local.",
  },
  {
    question: "Vous travaillez avec des clients en Suisse ?",
    answer:
      "Oui. Je suis à 20 minutes de Genève et je me déplace aussi à Nyon et dans le canton de Vaud. Le devis est établi en euros ; si vous préférez un montant en francs suisses, dites-le-moi. Une version anglaise du site est possible en option.",
  },
];

export const SERVICES_TRADES = [
  "Boulangerie",
  "Plombier",
  "Coiffeuse",
  "Restaurant",
  "Électricien",
  "Fleuriste",
  "Institut de beauté",
  "Garage",
  "Café",
  "Menuisier",
];

export const SERVICES_TOWNS = [
  "Divonne-les-Bains",
  "Gex",
  "Ferney-Voltaire",
  "Saint-Genis-Pouilly",
  "Pays de Gex",
  "Nyon",
  "Genève",
];

export const SERVICES_TOWNS_SENTENCE =
  "Pour les commerces, artisans et indépendants de Divonne-les-Bains, Gex, Ferney-Voltaire, Saint-Genis-Pouilly, Nyon et Genève.";

export interface StoryStep {
  title: string;
  text: string;
}

export const serviceStory: StoryStep[] = [
  {
    title: "On vous cherche sur un téléphone.",
    text: "Vos futurs clients tapent votre métier et votre ville sur Google. Votre activité doit apparaître, clairement.",
  },
  {
    title: "Ils trouvent l'essentiel en un coup d'œil.",
    text: "Horaires, adresse, prestations : tout est lisible sur un petit écran, sans zoomer.",
  },
  {
    title: "Et ils vous contactent en un geste.",
    text: "Un bouton pour appeler, un formulaire pour demander un devis. Les demandes arrivent directement chez vous.",
  },
];

export const storyMockup = {
  ariaLabel:
    "Exemple fictif : le site d'une boulangerie sur un téléphone, avec horaires, adresse et bouton Appeler",
  caption: "Exemple fictif · La Mie du Matin",
  time: "8:15",
  search: "boulangerie près de moi",
  name: "La Mie du Matin",
  monogram: "M",
  meta: "Boulangerie · Ouvert",
  chip: "Site web",
  headline: "Pain au levain et viennoiseries maison",
  call: "Appeler",
  directions: "Itinéraire",
  hoursTitle: "Ouvert aujourd'hui",
  hours: "6 h 30 – 19 h 00",
  mapCaption: "Grand-Rue · Votre ville",
  chips: ["Baguette tradition", "Croissants", "Gâteaux sur commande"],
  formTitle: "Commander un gâteau",
  send: "Envoyer",
  notifTitle: "Nouveau message · maintenant",
  notifText: "« Bonjour, vous faites des gâteaux d'anniversaire ? »",
};
