export interface FeaturedProject {
  id: string;
  name: string;
  period: string;
  role: string;
  context: string;
  approach: string;
  result: string;
  stack: string[];
  linkHref: string | null;
  linkLabel: string;
}

export interface ExperienceEntry {
  date: string;
  role: string;
  org: string;
}

export interface OtherProject {
  name: string;
  description: string;
  href: string;
  linkLabel: string;
}

export interface RecommendationItem {
  label: string;
  imageAlt: string;
  downloadLabel: string;
}

export interface RecommendationContent {
  letter: RecommendationItem;
  diploma: RecommendationItem;
}

export interface ContactInfo {
  emailLabel: string;
  email: string;
  locationLabel: string;
  location: string;
  cvLabel: string;
  cvHref: string;
  linkedinLabel: string;
  linkedinHref: string;
}

export interface NavLabels {
  hero: string;
  projets: string;
  experience: string;
  autres: string;
  competences: string;
  recommandation: string;
  contact: string;
}

export interface LocaleContent {
  meta: {
    title: string;
    description: string;
  };
  nav: NavLabels;
  langSwitch: {
    current: string;
    target: string;
    ariaLabel: string;
  };
  hero: {
    kicker: string;
    title: string;
    role: string;
    pitch: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  sectionTitles: {
    projets: string;
    experience: string;
    autres: string;
    competences: string;
    recommandation: string;
    contact: string;
  };
  projects: FeaturedProject[];
  experience: ExperienceEntry[];
  otherProjects: OtherProject[];
  skills: Record<string, string[]>;
  recommendation: RecommendationContent;
  contact: ContactInfo;
  footer: string;
}

export type Lang = "fr" | "en";

export const content: Record<Lang, LocaleContent> = {
  fr: {
    meta: {
      title: "Adel Djahnit — Développeur Fullstack",
      description:
        "Développeur Fullstack (React, .NET, Azure), actuellement en mission chez FIBA. Disponible pour un CDI en Suisse dès novembre 2026.",
    },
    nav: {
      hero: "Accueil",
      projets: "Projets",
      experience: "Expérience",
      autres: "Autres projets",
      competences: "Compétences",
      recommandation: "Recommandation",
      contact: "Contact",
    },
    langSwitch: {
      current: "FR",
      target: "EN",
      ariaLabel: "Passer le site en anglais",
    },
    hero: {
      kicker: "Disponible pour un CDI en Suisse dès novembre 2026",
      title: "Adel Djahnit",
      role: "Développeur Fullstack — React, .NET, Azure",
      pitch:
        "Actuellement en mission chez FIBA à Mies, où je développe des outils internes pour la fédération. Basé à Divonne-les-Bains, je recherche une opportunité stable en Suisse à l'issue de ce stage.",
      ctaPrimary: "Voir mes projets",
      ctaSecondary: "Télécharger mon CV",
    },
    sectionTitles: {
      projets: "Projets phares",
      experience: "Expérience",
      autres: "Autres projets",
      competences: "Compétences",
      recommandation: "Recommandation",
      contact: "Contact",
    },
    projects: [
      {
        id: "fiba",
        name: "FIBA",
        period: "Juin 2026 — en cours",
        role: "Développeur Fullstack",
        context:
          "Avant, une organisation qui voulait accéder à l'API de données de la fédération devait passer par un formulaire papier et plusieurs échanges avec le staff avant d'obtenir ses accès.",
        approach:
          "Je développe le formulaire de souscription automatisé qui remplace ce processus : le candidat remplit ses infos, le staff valide en un clic, et les accès sont créés automatiquement. Backend en C# / ASP.NET Core, frontend en Next.js / React, sur l'infrastructure Azure de la fédération.",
        result:
          "Le formulaire fonctionne déjà. Encore trop récent pour avoir des chiffres, mais le gain de temps pour le staff est immédiat.",
        stack: ["C#", "ASP.NET Core", "Next.js", "React", "Azure SQL Server", "Azure DevOps"],
        linkHref: null,
        linkLabel: "Projet interne — non public",
      },
      {
        id: "bonee",
        name: "Bonee",
        period: "2024 — en production",
        role: "Développeur",
        context:
          "Appli mobile de gestion de budget et d'épargne. J'ai réalisé les maquettes avec Melvil Cherruau (il les validait), puis développé toute l'application moi-même.",
        approach:
          "Tout en Flutter/Dart, que j'ai appris en autodidacte pour ce projet : stockage des données, logique de validation, et paiements in-app avec RevenueCat (appris de zéro aussi).",
        result:
          "En ligne sur l'App Store et le Play Store depuis moins de deux mois, une dizaine d'utilisateurs actifs.",
        stack: ["Flutter", "Dart", "RevenueCat", "iOS", "Android"],
        linkHref: "https://apps.apple.com/fr/app/bonee-budget-%C3%A9pargne/id6762883127",
        linkLabel: "Voir sur l'App Store",
      },
      {
        id: "kunagi",
        name: "Kunagi",
        period: "2023 — 2025",
        role: "Développeur Fullstack (alternance)",
        context:
          "L'appli était déjà en prod quand je suis arrivé (React Native / Expo, backend Laravel). Pendant deux ans, j'ai ajouté des fonctionnalités et corrigé des bugs, souvent seul développeur sur le projet.",
        approach:
          'J\'ai géré seul les certificats iOS. J\'ai aussi débloqué une file de notifications restée coincée — environ 3000 messages prêts à partir d\'un coup — et j\'ai réussi à couper l\'envoi après une centaine seulement. Ajouté des parcours différents selon le profil utilisateur (ex. profil "jardinier").',
        result:
          "Ma contribution est reconnue dans ma lettre de recommandation de la fondatrice de Kunagi (voir ci-dessous).",
        stack: ["React Native", "Expo", "Laravel", "API REST", "CI/CD"],
        linkHref: null,
        linkLabel: "Projet interne — non public",
      },
    ],
    experience: [
      {
        date: "Juin 2026 — en cours",
        role: "Développeur Fullstack",
        org: "FIBA, Mies (Suisse)",
      },
      {
        date: "2023 — 2025",
        role: "Développeur Fullstack",
        org: "Kunagi",
      },
      {
        date: "Mai — Sept. 2022",
        role: "Développeur Web",
        org: "OsUp — prototype de rapprochement bancaire (Vue.js) et site vitrine",
      },
      {
        date: "Mars — Juin 2021",
        role: "Développeur Web",
        org: "JSL Judo — site associatif (Symfony)",
      },
    ],
    otherProjects: [
      {
        name: "StriveMatch",
        description:
          "Projet de master : j'ai développé une plateforme de mise en relation entre pratiquants sportifs pour faciliter l'organisation de sessions.",
        href: "https://github.com/StriveMatch/strive",
        linkLabel: "Voir le code",
      },
      {
        name: "Indep-com",
        description:
          "Projet d'école : j'ai développé un site vitrine et des outils de communication pour indépendants.",
        href: "https://github.com/Indep-com/indep",
        linkLabel: "Voir le code",
      },
    ],
    skills: {
      Frontend: ["React", "React Native", "Vue.js", "Next.js"],
      Backend: ["ASP.NET Core (.NET)", "Laravel", "Node.js", "Azure SQL Server"],
      DevOps: ["Terraform", "Azure DevOps", "Git", "Docker"],
      Mobile: ["Dart", "Flutter (iOS, Android)"],
    },
    recommendation: {
      letter: {
        label: "Lettre de recommandation",
        imageAlt: "Première page de la lettre de recommandation d'Hélène Cayla, fondatrice de Kunagi",
        downloadLabel: "Télécharger la lettre complète (PDF)",
      },
      diploma: {
        label: "Diplôme",
        imageAlt: "Attestation de réussite — Mastère Expert Développement Web, Bordeaux Ynov Campus",
        downloadLabel: "Télécharger l'attestation (PDF)",
      },
    },
    contact: {
      emailLabel: "Email",
      email: "adel.djahnit.pro@gmail.com",
      locationLabel: "Lieu",
      location: "Divonne-les-Bains, France ",
      cvLabel: "Télécharger mon CV",
      cvHref: "/cv.pdf",
      linkedinLabel: "LinkedIn",
      linkedinHref: "#",
    },
    footer: "Conçu et développé par Adel Djahnit.",
  },

  en: {
    meta: {
      title: "Adel Djahnit — Fullstack Developer",
      description:
        "Fullstack Developer (React, .NET, Azure), currently on assignment at FIBA. Available for a permanent role in Switzerland from November 2026.",
    },
    nav: {
      hero: "Home",
      projets: "Work",
      experience: "Experience",
      autres: "Other projects",
      competences: "Skills",
      recommandation: "Recommendation",
      contact: "Contact",
    },
    langSwitch: {
      current: "EN",
      target: "FR",
      ariaLabel: "Switch site to French",
    },
    hero: {
      kicker: "Available for a permanent role in Switzerland from November 2026",
      title: "Adel Djahnit",
      role: "Fullstack Developer — React, .NET, Azure",
      pitch:
        "Currently on assignment at FIBA in Mies, building internal tools for the federation. Based in Divonne-les-Bains as a cross-border worker, looking for a permanent role in Switzerland after this internship.",
      ctaPrimary: "See my work",
      ctaSecondary: "Download CV",
    },
    sectionTitles: {
      projets: "Featured projects",
      experience: "Experience",
      autres: "Other projects",
      competences: "Skills",
      recommandation: "Recommendation",
      contact: "Contact",
    },
    projects: [
      {
        id: "fiba",
        name: "FIBA",
        period: "June 2026 — ongoing",
        role: "Fullstack Developer",
        context:
          "Before, an organization wanting access to the federation's data API had to go through a paper form and several rounds with staff before getting access.",
        approach:
          "I'm building the automated subscription form that replaces this process: the applicant fills in their info, staff validates in one click, and access is created automatically. Backend in C# / ASP.NET Core, frontend in Next.js / React, on the federation's Azure infrastructure.",
        result:
          "The form is already working. Still too recent for hard numbers, but the time saved for staff is immediate.",
        stack: ["C#", "ASP.NET Core", "Next.js", "React", "Azure SQL Server", "Azure DevOps"],
        linkHref: null,
        linkLabel: "Internal project — not public",
      },
      {
        id: "bonee",
        name: "Bonee",
        period: "2024 — in production",
        role: "Developer",
        context:
          "Mobile budgeting and savings app. I built the mockups with Melvil Cherruau (he validated them), then developed the whole app myself.",
        approach:
          "Built entirely in Flutter/Dart, which I taught myself for this project: data storage, validation logic, and in-app payments with RevenueCat (also learned from scratch).",
        result:
          "Live on the App Store and Play Store for under two months, with about ten active users.",
        stack: ["Flutter", "Dart", "RevenueCat", "iOS", "Android"],
        linkHref: "https://apps.apple.com/fr/app/bonee-budget-%C3%A9pargne/id6762883127",
        linkLabel: "View on the App Store",
      },
      {
        id: "kunagi",
        name: "Kunagi",
        period: "2023 — 2025",
        role: "Fullstack Developer (work-study)",
        context:
          "The app was already live when I joined (React Native / Expo, Laravel backend). Over two years I added features and fixed bugs, often as the only developer on the project.",
        approach:
          'I managed iOS certificates on my own. I also had to unblock a stuck notification queue — around 3,000 messages ready to fire at once — and managed to cut delivery after only about a hundred went out. Added different flows depending on user profile (e.g. a "gardener" profile).',
        result:
          "My contribution is recognized in my letter of recommendation from Kunagi's founder (see below).",
        stack: ["React Native", "Expo", "Laravel", "REST API", "CI/CD"],
        linkHref: null,
        linkLabel: "Internal project — not public",
      },
    ],
    experience: [
      {
        date: "June 2026 — ongoing",
        role: "Fullstack Developer",
        org: "FIBA, Mies (Switzerland)",
      },
      {
        date: "2023 — 2025",
        role: "Fullstack Developer",
        org: "Kunagi",
      },
      {
        date: "May — Sept. 2022",
        role: "Web Developer",
        org: "OsUp — bank reconciliation prototype (Vue.js) and showcase website",
      },
      {
        date: "March — June 2021",
        role: "Web Developer",
        org: "JSL Judo — club website (Symfony)",
      },
    ],
    otherProjects: [
      {
        name: "StriveMatch",
        description:
          "Master's project: I built a platform connecting sports practitioners to help organize sessions between individuals.",
        href: "https://github.com/StriveMatch/strive",
        linkLabel: "View code",
      },
      {
        name: "Indep-com",
        description:
          "School project: I built a showcase website and communication tools for freelancers.",
        href: "https://github.com/Indep-com/indep",
        linkLabel: "View code",
      },
    ],
    skills: {
      Frontend: ["React", "React Native", "Vue.js", "Next.js"],
      Backend: ["ASP.NET Core (.NET)", "Laravel", "Node.js", "Azure SQL Server"],
      DevOps: ["Terraform", "Azure DevOps", "Git", "Docker"],
      Mobile: ["Dart", "Flutter (iOS, Android)"],
    },
    recommendation: {
      letter: {
        label: "Recommendation letter",
        imageAlt: "First page of the recommendation letter from Hélène Cayla, founder of Kunagi",
        downloadLabel: "Download the full letter (PDF)",
      },
      diploma: {
        label: "Diploma",
        imageAlt: "Certificate of completion — Master's in Web Development, Bordeaux Ynov Campus",
        downloadLabel: "Download the certificate (PDF)",
      },
    },
    contact: {
      emailLabel: "Email",
      email: "adel.djahnit.pro@gmail.com",
      locationLabel: "Location",
      location: "Divonne-les-Bains, France — cross-border worker",
      cvLabel: "Download CV",
      cvHref: "/cv.pdf",
      linkedinLabel: "LinkedIn",
      linkedinHref: "#",
    },
    footer: "Designed and built by Adel Djahnit.",
  },
};

export const sectionOrder: (keyof NavLabels)[] = [
  "hero",
  "projets",
  "experience",
  "autres",
  "competences",
  "recommandation",
  "contact",
];
