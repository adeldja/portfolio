// Copy and data for the /product test page ("L'affiche du matin").
// Validated texts (offers, steps, FAQ, guarantees, story chapters) stay in lib/services.ts
// and are imported by the server components; this file only holds what is new.
import { storyMockup } from "@/lib/services";

export const productHero = {
  title: "Le site de votre commerce, fait près de chez vous.",
  lead: "Je suis Adel, développeur web à Divonne-les-Bains. Je crée des sites et des fiches Google pour que les commerces et artisans de la région soient trouvés, puis appelés.",
};

export type TradeGlyph = "wheat" | "drop" | "scissors" | "plate";

export interface StoryTrade {
  id: string;
  label: string;
  glyph: TradeGlyph;
  brand: string;
  search: string;
  name: string;
  monogram: string;
  meta: string;
  /** Main button of the fictional site: what this trade's customers come to do. */
  call: string;
  headline: string;
  hoursTitle: string;
  hours: string;
  chips: string[];
  formTitle: string;
  notifText: string;
}

/** Shared by every trade in the phone mockup. */
export const storyShared = {
  time: storyMockup.time,
  chip: storyMockup.chip,
  directions: storyMockup.directions,
  send: storyMockup.send,
  notifTitle: "Nouveau message",
  notifWhen: "maintenant",
  mapCaption: "Grand-Rue, votre ville",
  caption: "Exemple fictif : ce commerce n'existe pas.",
  legend: "Essayez avec votre métier",
};

export type StoryShared = typeof storyShared;

export const storyTrades: StoryTrade[] = [
  {
    id: "boulangerie",
    label: "Boulangerie",
    glyph: "wheat",
    brand: "#8A4B1F",
    search: storyMockup.search,
    name: storyMockup.name,
    monogram: storyMockup.monogram,
    meta: "Boulangerie, ouvert",
    call: storyMockup.call,
    headline: storyMockup.headline,
    hoursTitle: storyMockup.hoursTitle,
    hours: storyMockup.hours,
    chips: storyMockup.chips,
    formTitle: storyMockup.formTitle,
    notifText: storyMockup.notifText,
  },
  {
    id: "plombier",
    label: "Plombier",
    glyph: "drop",
    brand: "#1F5FA8",
    search: "plombier divonne",
    name: "Mercier Plomberie",
    monogram: "M",
    meta: "Plombier, ouvert",
    call: "Urgence : appeler",
    headline: "Dépannage, chauffe-eau et salles de bain",
    hoursTitle: "Disponible aujourd'hui",
    hours: "7 h 30 – 18 h 30",
    chips: ["Fuite d'eau", "Chauffe-eau", "Salle de bain"],
    formTitle: "Demander un devis",
    notifText: "« Bonjour, j'ai une fuite sous l'évier, vous pouvez passer aujourd'hui ? »",
  },
  {
    id: "coiffeuse",
    label: "Coiffeuse",
    glyph: "scissors",
    brand: "#7A3E6B",
    search: "coiffeuse gex",
    name: "Salon Lumière",
    monogram: "L",
    meta: "Coiffeuse, ouvert",
    call: "Prendre RDV",
    headline: "Coupe, couleur et brushing, avec ou sans rendez-vous",
    hoursTitle: "Ouvert aujourd'hui",
    hours: "9 h 00 – 19 h 00",
    chips: ["Coupe femme", "Couleur", "Coupe homme"],
    formTitle: "Prendre rendez-vous",
    notifText: "« Bonjour, vous avez une place samedi matin ? »",
  },
  {
    id: "restaurant",
    label: "Restaurant",
    glyph: "plate",
    brand: "#2F5D3A",
    search: "restaurant nyon",
    name: "Le Comptoir du Lac",
    monogram: "C",
    meta: "Restaurant, ouvert",
    call: "Réserver",
    headline: "Cuisine de saison, menu du jour à midi",
    hoursTitle: "Ouvert aujourd'hui",
    hours: "11 h 45 – 14 h 00 et 19 h – 22 h",
    chips: ["Menu du jour", "Terrasse", "Groupes"],
    formTitle: "Réserver une table",
    notifText: "« Bonjour, une table pour 4 ce soir à 20 h ? »",
  },
];

export interface ProductImage {
  src: string;
  webp?: string;
  width: number;
  height: number;
  alt: string;
}

/** Photo of Adel for the About section. null until consent: the quote is shown instead. */
export const ABOUT_PHOTO: ProductImage | null = null;

/** First two iPhone screenshots of Bonee, from its App Store page. Empty = text row. */
export const BONEE_SHOTS: ProductImage[] = [
  {
    src: "/product/bonee-1.jpg",
    webp: "/product/bonee-1.webp",
    width: 600,
    height: 1300,
    alt: "Bonee, écran d'accueil : objectif principal, revenus, dépenses et économies du mois.",
  },
  {
    src: "/product/bonee-2.jpg",
    webp: "/product/bonee-2.webp",
    width: 600,
    height: 1300,
    alt: "Bonee, écran Mon budget : répartition des dépenses de juin et liste des transactions.",
  },
];

export const aboutCopy = {
  title: "Vous parlez à celui qui fait.",
  text: "Je suis Adel Djahnit, développeur web installé à Divonne-les-Bains. On se rencontre en personne, et vous avez un seul interlocuteur du début à la fin.",
};

/** Verbatim from the Kunagi recommendation letter (public/recommendation-letter.jpg). */
export const KUNAGI_QUOTE = {
  text: "Un réel sens du service et une volonté constante de répondre aux besoins des utilisateurs et de l'équipe.",
  author:
    "Hélène Cayla, fondatrice de Kunagi, où j'ai été développeur full stack en alternance pendant deux ans.",
  linkLabel: "Lire la lettre",
  href: "/recommendation-letter.pdf",
};

export const pricingNote =
  "Prix indicatifs. Le prix définitif est celui du devis, établi après notre rendez-vous.";
