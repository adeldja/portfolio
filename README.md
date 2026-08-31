<div align="center">

# Adel Djahnit — Portfolio

Site portfolio personnel, one-page et bilingue FR/EN, présentant mon
parcours de développeur fullstack : projets phares, expérience,
compétences et recommandation.

![Aperçu du hero](.github/hero-screenshot.png)

</div>

## À propos

Ce dépôt contient le code source de mon portfolio : une page unique,
sombre et sobre, pensée comme une vitrine directe plutôt qu'un site
vitrine générique — pas de template, pas de framework CSS, chaque
composant et chaque style écrits à la main pour garder un contrôle fin
sur le rendu.

**Ce que le site présente :**

- 🏀 **Projets phares** — FIBA, Bonee, Kunagi — sous forme d'études de
  cas courtes (contexte → ce que j'ai fait → résultat), avec lien vers
  le projet quand il est public
- 🧭 **Expérience** — timeline compacte de mon parcours
- 🗂️ **Autres projets** — projets d'école/master, avec lien vers le code
- 🛠️ **Compétences** — grille d'icônes cliquables vers la doc officielle
  de chaque techno
- ✉️ **Recommandation** — vraie lettre de recommandation et diplôme,
  affichés en image + téléchargement PDF
- 🌐 **FR/EN** — bascule de langue instantanée côté client, sans
  rechargement ni dépendance à `localStorage`

## Stack technique

| | |
|---|---|
| Framework | [Next.js 14](https://nextjs.org) (App Router) + React 18 |
| Langage | TypeScript |
| Style | CSS pur, variables CSS — pas de Tailwind ni de framework CSS |
| Polices | Space Grotesk, IBM Plex Sans, IBM Plex Mono (`next/font/google`) |
| Icônes | [`simple-icons`](https://simpleicons.org) (logos de marque) + [`react-icons`](https://react-icons.github.io/react-icons/) (fallback générique) |
| Déploiement | [Vercel](https://vercel.com) |

Aucune dépendance lourde type `framer-motion` : l'animation d'entrée du
hero est en CSS pur, une seule séquence au chargement.

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
  providers.tsx       Provider du contexte de langue
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
  content.ts             Contenu bilingue FR/EN + types (source unique de vérité)
  language-context.tsx   Contexte + hook useLanguage()
  skills.ts               Données des compétences (icônes, liens)
```

## Contenu bilingue

Tout le texte du site vit dans `lib/content.ts`, sous la forme
`content.fr` / `content.en`, avec un typage TypeScript qui garantit que
les deux langues ont exactement la même forme. Le composant
`LanguageProvider` (`lib/language-context.tsx`) expose un hook
`useLanguage()` qui donne accès à la langue active et au contenu déjà
traduit — aucun composant de section ne gère la traduction lui-même.

## Déploiement sur Vercel (gratuit)

1. Ce dépôt est déjà sur GitHub — il suffit de le connecter.
2. Aller sur [vercel.com](https://vercel.com) et se connecter avec le
   compte GitHub.
3. Cliquer sur **Add New… → Project**, puis sélectionner ce dépôt.
4. Vercel détecte automatiquement Next.js — laisser les réglages par
   défaut (`Build Command: next build`, `Output Directory: .next`).
5. Cliquer sur **Deploy**.
6. Le site est en ligne sur une URL du type `nom-du-projet.vercel.app`.

Chaque `git push` sur la branche `main` déclenche ensuite un nouveau
déploiement automatique.

## À faire avant mise en ligne

- Remplacer le fichier placeholder `public/cv.pdf` par le vrai CV (le
  lien de téléchargement dans le hero et la section Contact pointe déjà
  vers `/cv.pdf`).
- Renseigner le vrai lien LinkedIn dans `lib/content.ts`
  (`contact.linkedinHref`, actuellement `#`).

## Contact

**Adel Djahnit** — adel.djahnit.pro@gmail.com
