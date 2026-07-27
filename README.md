# BTP Site — Vitrine BTP Offshore

Site vitrine Next.js pour une activité BTP / plans (offshore), audience principale France.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Structure prête pour React Three Fiber / GSAP (expérience 3D scroll à venir)

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run start` | Serveur production |
| `npm run lint` | ESLint |

## Structure

```
src/app/          Pages Next.js
public/           Assets statiques
scripts/          Utilitaires (ex. génération CDC)
```

## Notes

Le cahier des charges Word est local et ignoré par git (`*.docx`).
