# Cahier des charges — Site vitrine BTP Offshore

**Version :** 2.0  
**Date :** juillet 2026  
**Repo :** `BTP-site-` (Next.js)  
**Langue du site :** français (audience principale : France)  
**Objectif de ce document :** permettre à une IA ou un développeur de comprendre **immédiatement** le produit, le design, la 3D, le backlog et l’existant, sans relire toute la conversation.

---

## 0. Prompt de reprise rapide (à coller à une IA)

```
Tu travailles sur le repo BTP-site- : site vitrine Next.js pour un freelance BTP/plans/offshore.
Lis docs/CAHIER_DES_CHARGES.md (ce fichier) et le code dans src/.

Produit : landing immersive scroll-driven.
- Scène 3D d’une maison (React Three Fiber).
- Plus on scrolle, plus la caméra zoome vers la façade.
- À un seuil, la porte s’ouvre ; une visite auto peut continuer même sans scroll (RDC → 1er étage).
- Textes commerciaux synchronisés au scroll (expérience, projets, offre).
- En bas : section Contact ; la maison disparaît dynamiquement.
- Contact : e-mail, LinkedIn, Facebook (+ options).
- Profil : 15 ans entreprise + 20 ans freelance + collab. étrangères ; tous types de plans.

Design : sobriété architecture (acier/béton/sable), typo Syne + Manrope, pas de purple AI, pas de cartes décoratives partout, hero full-bleed 3D, brand fort.
Améliore UX/perf/design selon la section « Fonctionnalités à ajouter » et « Direction design ».
Ne casse pas la timeline scroll 3D.
```

---

## 1. Contexte métier

### 1.1 Qui
Petit indépendant / petite structure **BTP offshore** spécialisée dans la **conception de plans** (tous types : architecturaux, techniques, exécution, permis, relevés, etc. — liste exacte à finaliser avec le client).

### 1.2 Parcours
| Élément | Détail |
|--------|--------|
| Entreprise | **15 ans** d’expérience en entreprise |
| Freelance | **20 ans** en freelance |
| International | Collaborations avec des **entreprises étrangères** |
| Cible | Surtout la **France** (clients, partenaires, donneurs d’ordre) |

### 1.3 Pourquoi le site
Ce n’est **pas** un SaaS. C’est une **vitrine de conversion** :
1. Impressionner / mémoriser (3D scroll)
2. Crédibiliser (expérience + projets)
3. Faire contacter (mail, LinkedIn, Facebook, éventuellement téléphone / WhatsApp)

---

## 2. Vision produit (une phrase)

> Une page unique où scroller = entrer dans une maison 3D, tout en lisant le pitch pro, jusqu’à une section Contact où la maison s’efface pour laisser place à la prise de contact.

---

## 3. Expérience 3D scroll-driven (cœur — NON NÉGOCIABLE)

### 3.1 Storyboard obligatoire

| Phase | Progress scroll (indicatif 0→1) | Caméra / scène | Contenu UI |
|------|----------------------------------|----------------|------------|
| A. Entrée | 0.00 – 0.12 | Vue large **façade principale** | Brand + tagline |
| B. Approche | 0.12 – 0.32 | Zoom progressif vers la façade | Pitch métier |
| C. Seuil porte | 0.32 – 0.42 | Face à la porte | Expérience (15+20 ans) |
| D. Ouverture | ~0.42 | **Porte s’ouvre** (animation) | Transition |
| E. Visite auto | 0.42 – 0.78 | Entrée RDC → circulation → **1er étage** | Projets / offre |
| F. Sortie | 0.78 – 0.95 | Recul / fade maison | Préparation contact |
| G. Contact | 0.95 – 1.00 | **Maison disparaît** (opacity → 0) | Bloc Contact lisible |

### 3.2 Règles d’interaction

1. **Scroll = progression** : plus on descend, plus on avance dans la timeline caméra (scrub).
2. **Après ouverture de porte** : si l’utilisateur **arrête** de scroller, la visite **continue toute seule** un moment (auto-tour), puis le scroll peut reprendre le contrôle.
3. Pendant le scroll, le site **se vend** : textes d’expérience, projets, offre — pas seulement du décor 3D.
4. En section **Contact**, la maison **disparaît dynamiquement** (fade / dissolve / sortie), pas un cut brutal.
5. Toujours un moyen d’**aller au contact** sans finir toute la visite (bouton header / skip).

### 3.3 Actifs 3D

- **MVP actuel** : maison procédurale (meshes Three.js) dans `src/components/scene/House.tsx`.
- **Cible qualité** : modèle GLB/GLTF optimisé (LOD, textures compressées), éclairage réaliste léger.
- Fallback : `prefers-reduced-motion` → pas de WebGL lourd ; fond + textes seulement.
- Mobile : viser 30–60 FPS ; sinon mode dégradé (vidéo scrub ou images).

### 3.4 Fichiers techniques existants (repo)

```
src/components/scene/House.tsx       → géométrie maison + porte
src/components/scene/SceneRoot.tsx   → caméra, auto-tour, damp
src/components/scene/HouseCanvas.tsx → Canvas R3F fixed
src/lib/sceneTimeline.ts             → keyframes caméra / door / opacity
src/hooks/useScrollProgress.ts       → progress 0→1
src/components/HomeExperience.tsx    → orchestration page
src/components/StoryOverlays.tsx     → textes sync scroll
src/components/ContactSection.tsx    → contact + liste projets
src/components/Header.tsx            → nav + CTA
src/data/content.ts                  → contenus éditables
```

Timeline actuelle : `CAMERA_KEYS` dans `sceneTimeline.ts` (position, lookAt, door 0→1, opacity 0→1).

---

## 4. Architecture de contenu

### 4.1 Sections (ordre narratif)

1. **Hero / Brand** — nom commercial dominant, une accroche, CTA Contact  
2. **Présentation** — tous types de plans, offshore, collab. internationales  
3. **Expérience** — 15 ans entreprise / 20 ans freelance / international  
4. **Projets** — vitrine 4–8 projets (titre, type, année, résumé)  
5. **Offre / méthode** — ce qui est proposé  
6. **Contact** — mail, LinkedIn, Facebook (+ formulaire recommandé)  
7. **Mentions légales** — page séparée `/mentions-legales`

### 4.2 Canaux de contact

| Canal | Priorité | Statut |
|-------|----------|--------|
| E-mail | P0 | Lien mailto (placeholders dans `content.ts`) |
| LinkedIn | P0 | Lien externe |
| Facebook | P1 | Lien externe |
| Formulaire contact | P0 recommandé | **À ajouter** |
| Téléphone | P1 | Optionnel |
| WhatsApp | P2 | Utile international |

### 4.3 Contenu éditable

Tout le copy marketing doit rester dans **`src/data/content.ts`** (ou MDX plus tard).  
Placeholders actuels : `Atelier Plans Offshore`, `contact@exemple-btp.fr` — **à remplacer** par les vrais infos client.

---

## 5. Direction design (très important)

### 5.1 Intention visuelle

- Univers **architecture / chantier / précision** : acier, béton, sable, bois.
- Première viewport = **une composition** : brand + 3D dominante (full-bleed), pas un dashboard.
- La **marque** doit rester le signal principal (pas un titre générique qui écrase le brand).
- La 3D est l’**ancre visuelle** ; les textes sont des overlays sobres.

### 5.2 Palette (existante — à respecter / enrichir)

| Token | Hex | Usage |
|-------|-----|--------|
| `--ink` | `#0f1c28` | Fond principal |
| `--ink-deep` | `#0a1218` | Fond profond |
| `--steel` | `#2f4a5e` | CTA / structures |
| `--steel-bright` | `#3d617a` | Hover CTA |
| `--sand` | `#e8e0d4` | Texte principal |
| `--mist` | `#b7c2cb` | Texte secondaire |
| `--accent` | `#c4a35a` | Accent or / laiton (détails) |

### 5.3 Typographie

- **Display :** Syne (déjà en place via `next/font`)
- **Body :** Manrope
- **Interdit par défaut :** Inter, Roboto, Arial, system-ui comme identité principale
- **Interdit look IA générique :** purple/indigo gradients, cream+#terracotta, glow violet, pills partout, multi-ombres

### 5.4 Règles UX / UI

- Pas de **cartes décoratives** dans le hero.
- Cards OK seulement si elles servent une **interaction** (ex. projet cliquable, formulaire).
- Une section = **un job**, un titre, une phrase de soutien.
- Motion : 2–3 intentions fortes (zoom caméra, porte, disparition) — pas de bruit.
- Contraste texte suffisant (cible WCAG AA).
- Header sticky discret + CTA Contact toujours accessible.

### 5.5 Atmosphère (à pousser davantage)

À ajouter / renforcer pour un rendu « wow » premium :

1. **Ciel / heure** : gradient animé très lent (aube → jour) derrière la scène, ou skybox soft.  
2. **Particules poussière / pollen** très légères (opacity basse) — optionnelles, désactivables mobile.  
3. **Reflets fenêtres** : léger env map déjà via Drei `Environment` ; pousser intensity selon moment.  
4. **Ombre portée** ContactShadows (déjà) + soft ground fog.  
5. **Parallax texte** : léger décalage Y des overlays vs caméra.  
6. **Grain film** CSS ultra subtil sur overlays (noise SVG 3–4% opacity).  
7. **Cursor custom** optionnel desktop (croix d’architecte / équerre) — désactivable.  
8. **Transitions section Contact** : blur progressif de la 3D + fond qui s’aplatit en panneau éditorial.  
9. **Hotspots 3D** : pastilles sur la maison (« Plan RDC », « Façade ») ouvrant un lightbox plan 2D.  
10. **Scroll progress bar** verticale fine (trait acier) sur le bord droit.

---

## 6. Stack technique

### 6.1 Choix retenu

| Couche | Techno | Pourquoi |
|--------|--------|----------|
| App | **Next.js** App Router + TypeScript | SEO, structure, perf |
| UI | Tailwind CSS v4 + CSS variables | Design tokens |
| 3D | **Three.js + React Three Fiber + Drei** | Standard WebGL React |
| Scroll | Progress custom (`useScrollProgress`) | Simple, déjà en place |
| Contenu | `src/data/content.ts` | Édition rapide |
| Backend | **Pas obligatoire en MVP** | Site vitrine |

### 6.2 Pourquoi pas « tout Python »

La 3D scroll-driven est native Web/JS. Python (FastAPI) seulement si besoin réel : formulaire robuste, admin projets, envoi mail serveur.  
**Recommandation :** rester Next.js ; API Route Next ou FastAPI en phase 2.

### 6.3 Scripts repo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

---

## 7. État actuel du projet (déjà livré)

### Fait
- [x] Structure Next.js + TypeScript + Tailwind  
- [x] Scène maison 3D procédurale + porte animée  
- [x] Timeline caméra liée au scroll  
- [x] Auto-tour après ouverture porte  
- [x] Fade opacity maison en fin de parcours  
- [x] Overlays narratifs (about / expérience / projets / offre)  
- [x] Section Contact + liste projets  
- [x] Header + CTA  
- [x] Mentions légales basiques  
- [x] `prefers-reduced-motion` (canvas masqué)  
- [x] README  

### Pas encore fait (prioritaire)
- [ ] Vrais contenus client (nom, bio, photos, liens)  
- [ ] Formulaire de contact fonctionnel  
- [ ] Pages détail projet / lightbox  
- [ ] Modèle 3D GLB haute qualité  
- [ ] Mode mobile optimisé / fallback vidéo  
- [ ] Analytics + consentement cookies  
- [ ] i18n EN  
- [ ] SEO avancé (JSON-LD LocalBusiness / Person)  

---

## 8. Fonctionnalités à ajouter (backlog détaillé)

### 8.1 P0 — Conversion & crédibilité

| ID | Fonctionnalité | Description |
|----|----------------|-------------|
| F01 | Formulaire contact | Nom, e-mail, type de besoin, message, anti-spam (honeypot + rate limit). Envoi Resend/SMTP. |
| F02 | CTA sticky mobile | Bouton « Contacter » toujours visible sur mobile. |
| F03 | Skip intro | Lien « Aller au contact » / « Passer la visite ». |
| F04 | Remplacer placeholders | Brand réel, photo, liens LinkedIn/Facebook/mail. |
| F05 | Preuves | Logos clients, pays, types de missions (même anonymisés). |

### 8.2 P1 — Expérience 3D & design cool

| ID | Fonctionnalité | Description |
|----|----------------|-------------|
| F10 | Progress rail | Barre de progression scroll + labels (Façade / Porte / Étage / Contact). |
| F11 | Hotspots plans | Clic dans la maison → overlay image/PDF d’un plan 2D (ancre métier). |
| F12 | Son ambient optionnel | Ambiance très basse (vent / chantier soft), mute par défaut, bouton. |
| F13 | Porte cinematic | Son léger + ralentissement caméra au moment d’ouverture. |
| F14 | GLB maison | Remplacer primitives par modèle pro ; garder la même timeline. |
| F15 | Heure du jour | Slider ou auto : éclairage golden hour → jour → bleu. |
| F16 | Grain + vignette | Post-process léger (ou CSS) pour look cinéma architectural. |
| F17 | Transition Contact | Maison se « dissout » en traits de plan (effet blueprint) avant disparition. |
| F18 | Loading 3D | Écran splash brand + barre de chargement assets, puis fade-in façade. |

### 8.3 P1 — Contenu & navigation

| ID | Fonctionnalité | Description |
|----|----------------|-------------|
| F20 | Page `/projets` | Liste SEO + pages `/projets/[slug]`. |
| F21 | Filtres projets | Type : permis / exécution / offshore / relevé. |
| F22 | Timeline visuelle | Frise 15 ans entreprise → freelance → international. |
| F23 | FAQ | 5–6 questions délais, tarifs indicatifs, zones, types de plans. |
| F24 | Téléchargement | Plaquette PDF ou exemple de plan (filigrané). |

### 8.4 P2 — Technique & croissance

| ID | Fonctionnalité | Description |
|----|----------------|-------------|
| F30 | i18n FR/EN | Switch langue (audience internationale). |
| F31 | Analytics | Plausible ou GA4 + bandeau cookies RGPD. |
| F32 | CMS léger | Admin pour ajouter un projet sans code (phase 2). |
| F33 | Mode offline assets | Service worker cache images projets. |
| F34 | Tests e2e | Playwright : scroll + présence CTA contact. |

---

## 9. Spécifications UI détaillées (écrans)

### 9.1 Header
- Gauche : sigle + nom  
- Droite : Projets | LinkedIn | bouton **Me contacter**  
- Fond transparent → léger blur quand scroll > 5%

### 9.2 Hero (viewport 1)
Contient **uniquement** :
- Brand (grand)
- 1 tagline
- 1 groupe CTA (Contacter / Découvrir)
- Maison 3D full-bleed en fond  
**Interdit dans le hero :** stats, adresse, grille de cards, badges flottants, collages d’images.

### 9.3 Overlays scroll
- Coin / bande gauche ou bas selon breakpoint  
- Titre display grand, texte court  
- Apparition/disparition par plages de `progress`  
- Sur mobile : texte plus court, overlays moins denses

### 9.4 Contact
- Fond uni `ink` (plus de distraction 3D)  
- Titre fort « Parlons de votre projet »  
- Boutons mail / LinkedIn / Facebook  
- Formulaire (à venir) à droite ou dessous  
- Footer : © + mentions légales

---

## 10. Responsive

| Breakpoint | Comportement |
|------------|--------------|
| Desktop ≥ 1024 | 3D pleine qualité, overlays riches |
| Tablet | 3D DPR réduit, moins d’hotspots |
| Mobile | DPR ≤ 1.5, désactiver Environment lourd si FPS < 30, textes simplifiés, CTA sticky |

Détection perf simple recommandée : si `navigator.hardwareConcurrency ≤ 4` ou WebGL fail → mode allégé.

---

## 11. Accessibilité & RGPD

- `lang="fr"`
- Skip link / CTA contact clavier
- `prefers-reduced-motion` : pas d’auto-tour ni WebGL obligatoire
- Focus visible sur liens/boutons
- Alt texts sur images projets
- Mentions légales + politique cookies si tracking
- Pas de secrets dans le client

---

## 12. SEO

- Title / description FR (déjà partiellement en place)
- Open Graph image (à créer : rendu façade maison + logo)
- Contenu textuel **réel dans le DOM** (pas uniquement canvas) — déjà le cas pour contact/overlays
- JSON-LD `Person` ou `ProfessionalService`
- Sitemap + `robots.txt`
- URL canonique domaine `.fr` recommandé

---

## 13. Critères d’acceptation (recette)

1. Au load : façade maison visible + brand lisible.  
2. Scroll bas → zoom fluide vers la porte.  
3. Seuil → porte s’ouvre ; sans scroll, visite continue un temps.  
4. La visite atteint le 1er étage.  
5. Textes expérience / projets visibles pendant le parcours.  
6. Section Contact : maison absente ou opacity ~0.  
7. Liens mail / LinkedIn / Facebook cliquables.  
8. Bouton Contact accessible depuis le header.  
9. Reduced-motion : site utilisable sans 3D.  
10. `npm run build` OK.

---

## 14. Données à fournir par le client (checklist)

- [ ] Nom commercial définitif + slogan  
- [ ] Photo professionnelle  
- [ ] E-mail / LinkedIn / Facebook / téléphone  
- [ ] Liste exacte des types de plans  
- [ ] 4–8 projets (visuels + droits d’utilisation)  
- [ ] Modèle 3D ou brief pour un modeleur  
- [ ] Domaine + hébergement  
- [ ] Mentions légales réelles (SIRET, etc.)

---

## 15. Jalons suggérés

| Jalon | Contenu |
|-------|---------|
| J0 | CDC validé + contenus fournis |
| J1 | Polish design + formulaire + vrais textes |
| J2 | GLB maison + hotspots plans |
| J3 | Pages projets + SEO + analytics |
| J4 | i18n EN + perf mobile |
| J5 | Mise en production domaine |

---

## 16. Contraintes pour toute IA qui modifie le code

1. **Ne pas casser** le mapping scroll → `sceneTimeline` sans mettre à jour ce CDC.  
2. Garder les **textes marketing** dans `src/data/content.ts`.  
3. Respecter la **palette / typos** (Syne + Manrope, tons acier/sable).  
4. Pas de redesign « template startup purple ».  
5. Toute nouvelle animation doit servir la **narration maison** ou la **conversion contact**.  
6. Préférer des améliorations **mesurables** (clics contact, temps jusqu’au contact).  
7. Documenter dans le README si un nouveau script/commande apparaît.

---

## 17. Exemples d’améliorations design « cool » (inspirations concrètes)

Ces idées sont **autorisées** et souhaitées si bien exécutées :

1. **Effet blueprint** : au moment Contact, la maison se transforme brièvement en lignes de plan bleu avant fade.  
2. **Découpe façade** : pendant l’approche, un léger « x-ray » montre la structure (walls → wireframe soft).  
3. **Plan qui flotte** : dans le salon 3D, un plan A0 semi-transparent sur une table, cliquable.  
4. **Numérotation cartouche** : petits cartouches style dessin technique (éch. 1/100, ind. A-01) en overlay.  
5. **Transition porte** : depth of field / blur qui se resserre sur la poignée avant ouverture.  
6. **Chapitres scroll** : snap optionnel (léger) aux chapitres Façade / Porte / Étage / Contact.  
7. **Footer plan masse** : mini plan 2D SVG animé au survol des projets.  
8. **Mode « visite libre »** : après l’auto-tour, bouton pour orbit controls 15 secondes (desktop only).

---

## 18. Hors scope (V1)

- Espace client / login  
- Devis automatique / paiement  
- Chatbot  
- App mobile native  
- Multilingue complet dès le jour 1 (EN = phase 2 OK)

---

## 19. Glossaire

| Terme | Sens |
|-------|------|
| Scroll-driven | Animation pilotée par la position de scroll |
| Auto-tour | Suite d’animation sans nouveau scroll |
| R3F | React Three Fiber |
| GLB | Format modèle 3D web |
| Overlay | Texte/UI par-dessus la scène 3D |
| MVP | Version minimale déjà en ligne dans le repo |

---

## 20. Résumé exécutif

Construire / faire évoluer une **vitrine Next.js** pour un expert plans BTP/offshore, où le **scroll raconte une entrée dans une maison 3D**, vend l’expérience professionnelle, et se termine sur un **Contact** clair pendant que la **3D disparaît**. Le design doit être **architectural, premium, mémorable**, sans tomber dans les clichés IA. Le repo contient déjà un MVP fonctionnel : la priorité est le **polish**, les **vrais contenus**, le **formulaire**, et les **features design** listées en section 8 et 17.

---

*Document vivant — mettre à jour quand la timeline 3D ou le backlog change.*
