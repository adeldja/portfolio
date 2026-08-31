# Portfolio — Adel Djahnit

Site portfolio one-page, bilingue FR/EN, construit avec Next.js 14 (App
Router) et du CSS pur (pas de Tailwind, pas de framework CSS).

![Aperçu du hero](.github/hero-screenshot.png)

## Sections

- Projets phares (FIBA, Bonee, Kunagi) : contexte, ce que j'ai fait,
  résultat, lien vers le projet quand il est public
- Expérience : timeline
- Autres projets, avec lien vers le code
- Compétences : icônes cliquables vers le site officiel de chaque techno
- Recommandation : lettre de recommandation et diplôme, en image +
  téléchargement PDF
- Contact

Toggle FR/EN côté client (React state), sans dépendance à `localStorage`
ni routing par locale.

## Stack

- Next.js 14 (App Router), React 18, TypeScript
- `next-intl` pour le FR/EN, en mode client uniquement (pas de routes
  `/fr` `/en`, pas de middleware)
- CSS pur avec variables CSS (`app/globals.css`)
- Polices Google Fonts : Space Grotesk, IBM Plex Sans, IBM Plex Mono
  (via `next/font/google`)
- Icônes : `simple-icons` (logos de marque) + `react-icons` (fallback
  générique quand la marque n'a pas d'icône libre, ex. Azure)
- Pas de dépendance type framer-motion : l'animation d'entrée du hero
  est en CSS pur

## Démarrer en local

```bash
npm install
npm run dev
```

Le site est servi sur [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de production + vérification des types
npm run start   # sert le build de production
```

## Structure du projet

```
app/
  layout.tsx        Layout racine, polices, métadonnées
  page.tsx           Assemblage de la page (une seule route)
  globals.css         Design system (couleurs, typo, layout, composants)
  providers.tsx       NextIntlClientProvider + toggle de langue
components/
  Rail.tsx             Rail de navigation verticale + toggle FR/EN
  Hero.tsx             Section hero
  Projects.tsx         Projets phares
  Experience.tsx       Timeline d'expérience
  OtherProjects.tsx    Autres projets
  Skills.tsx           Compétences (icônes cliquables)
  Recommendation.tsx   Lettre de recommandation + diplôme
  Contact.tsx          Contact + pied de page
lib/
  locales.ts               Type Locale et liste des langues supportées
  locale-switch-context.tsx  Contexte pour basculer la langue côté client
  types.ts                 Types des contenus structurés (projets, expérience...)
  skills.ts                 Données des compétences (icônes, liens)
messages/
  fr.json / en.json        Tout le texte du site, par langue
```

Le texte du site vit dans `messages/fr.json` et `messages/en.json`.
Les composants lisent ce texte via les hooks `useTranslations()` /
`useLocale()` de `next-intl` — aucune logique de traduction à gérer
dans les composants eux-mêmes. Pour les contenus structurés (projets,
expérience, autres projets), `t.raw("items")` renvoie le tableau JSON
tel quel, typé contre `lib/types.ts`.

## Déploiement sur Vercel (gratuit)

1. Ce dépôt est déjà sur GitHub — il suffit de le connecter.
2. Aller sur [vercel.com](https://vercel.com) et se connecter avec le
   compte GitHub.
3. Cliquer sur **Add New… → Project**, puis sélectionner ce dépôt.
4. Vercel détecte automatiquement Next.js — laisser les réglages par
   défaut (`Build Command: next build`, `Output Directory: .next`).
5. Cliquer sur **Deploy**.

Chaque `git push` sur la branche `main` déclenche ensuite un nouveau
déploiement automatique.

## Contact

Adel Djahnit — adel.djahnit.pro@gmail.com
