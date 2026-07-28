# BTP Site — Vitrine BTP Offshore



Site vitrine Next.js avec expérience 3D scroll-driven (maison → zoom → porte → visite → contact).

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- React Three Fiber + Drei (scène 3D)
- Scroll → timeline caméra (auto-tour après ouverture de porte)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Cahier des charges

Voir [`docs/CAHIER_DES_CHARGES.md`](docs/CAHIER_DES_CHARGES.md).

## Personnaliser

Éditez `src/data/content.ts` : nom, contacts, projets, textes.

## Commandes

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run start` | Serveur production |
| `npm run lint` | ESLint |

## Structure

```
src/app/                 Pages (accueil, mentions légales)
src/components/          UI + overlays + contact
src/components/scene/    Maison 3D + canvas
src/data/content.ts      Contenu éditable
src/lib/sceneTimeline.ts Timeline caméra / porte
docs/                    Cahier des charges
```
