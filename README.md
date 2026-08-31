# Portfolio — Adel Djahnit

Site portfolio one-page, bilingue FR/EN, construit avec Next.js 14 (App
Router) et du CSS pur (pas de Tailwind, pas de framework CSS).

## Stack

- Next.js 14 (App Router), React 18, TypeScript
- CSS pur avec variables CSS (`app/globals.css`)
- Google Fonts : Space Grotesk, IBM Plex Sans, IBM Plex Mono (chargées via
  `next/font/google`)
- Toggle FR/EN côté client (React state), sans dépendance à `localStorage`

## Démarrer en local

```bash
npm install
npm run dev
```

Le site est servi sur [http://localhost:3000](http://localhost:3000).

## À faire avant mise en ligne

- Remplacer le fichier placeholder `public/cv.pdf` par le vrai CV (le lien
  de téléchargement dans le hero et la section Contact pointe déjà vers
  `/cv.pdf`).
- Renseigner le vrai lien LinkedIn dans `lib/content.ts`
  (`contact.linkedinHref`, actuellement `#`).

## Déploiement sur Vercel (gratuit)

1. Pousser ce dépôt sur GitHub :

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <url-du-repo-github>
   git push -u origin main
   ```

2. Aller sur [vercel.com](https://vercel.com) et se connecter avec le
   compte GitHub.
3. Cliquer sur **Add New… → Project**, puis sélectionner ce dépôt.
4. Vercel détecte automatiquement Next.js — laisser les réglages par
   défaut (`Build Command: next build`, `Output Directory: .next`).
5. Cliquer sur **Deploy**.
6. Le site est en ligne sur une URL du type `nom-du-projet.vercel.app`.

Chaque `git push` sur la branche `main` déclenche ensuite un nouveau
déploiement automatique.

## Structure du projet

```
app/
  layout.tsx      Layout racine, polices, métadonnées
  page.tsx        Assemblage de la page (une seule route)
  globals.css     Design system (couleurs, typo, layout, composants)
  providers.tsx   Provider du contexte de langue
components/
  Rail.tsx         Rail de navigation verticale + toggle FR/EN
  Hero.tsx         Section hero
  Projects.tsx     Projets phares
  Experience.tsx   Timeline d'expérience
  OtherProjects.tsx Autres projets
  Skills.tsx       Compétences par catégorie
  Contact.tsx      Contact + pied de page
lib/
  content.ts            Contenu bilingue FR/EN + types (source unique de vérité)
  language-context.tsx  Contexte + hook useLanguage()
```
