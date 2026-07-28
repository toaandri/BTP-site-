export const brand = {
  name: "Atelier Plans Offshore",
  shortName: "APO",
  tagline: "Plans & conception BTP — 35 ans d'expertise",
  description:
    "Conception de plans pour le bâtiment et l'offshore. Collaborations France et internationales.",
};

export const contacts = {
  email: "contact@exemple-btp.fr",
  linkedin: "https://www.linkedin.com/",
  facebook: "https://www.facebook.com/",
  phone: "",
};

export const experience = [
  {
    years: "15 ans",
    label: "En entreprise",
    detail: "Conception et production de plans au sein d'équipes BTP structurées.",
  },
  {
    years: "20 ans",
    label: "En freelance",
    detail: "Missions autonomes, réactivité et suivi direct avec les donneurs d'ordre.",
  },
  {
    years: "International",
    label: "Collaborations",
    detail: "Projets menés avec des entreprises étrangères, process et livrables adaptés.",
  },
];

export const projects = [
  {
    id: "p1",
    title: "Villa côtière — plans d'exécution",
    type: "Plans d'exécution",
    year: "2024",
    summary: "Dossier complet : architecture, détails techniques et coordination corps d'état.",
  },
  {
    id: "p2",
    title: "Bâtiment tertiaire — APS / APD",
    type: "Études",
    year: "2023",
    summary: "Études préliminaires et avant-projet pour un programme de bureaux.",
  },
  {
    id: "p3",
    title: "Extension résidentielle",
    type: "Plans permis",
    year: "2023",
    summary: "Plans de permis de construire et notice descriptive pour extension.",
  },
  {
    id: "p4",
    title: "Support offshore — plans techniques",
    type: "Offshore",
    year: "2022",
    summary: "Production de plans techniques pour un partenaire industriel à l'étranger.",
  },
  {
    id: "p5",
    title: "Réhabilitation immeuble",
    type: "Relevé & plans",
    year: "2021",
    summary: "Relevé, plans existants et projet de réhabilitation partielle.",
  },
  {
    id: "p6",
    title: "Lotissements — calepinage",
    type: "VRD / massifs",
    year: "2020",
    summary: "Plans de masse et calepinage pour un ensemble de lots.",
  },
];

export const scrollSections = [
  {
    id: "hero",
    range: [0, 0.12] as const,
    title: brand.name,
    body: "Tous types de plans. Une vitrine pour me contacter depuis la France.",
  },
  {
    id: "about",
    range: [0.12, 0.28] as const,
    title: "Conception précise, livrables clairs",
    body: "Du permis aux plans d'exécution : une méthode rodée, orientée délais et qualité.",
  },
  {
    id: "experience",
    range: [0.28, 0.45] as const,
    title: "35 ans d'expérience terrain",
    body: "15 ans en entreprise, 20 ans en freelance, collaborations avec des sociétés étrangères.",
  },
  {
    id: "projects",
    range: [0.45, 0.72] as const,
    title: "Une sélection de projets",
    body: "Échantillons représentatifs — architecture, études, offshore et réhabilitation.",
  },
  {
    id: "offer",
    range: [0.72, 0.88] as const,
    title: "Ce que je propose",
    body: "Plans architecturaux, techniques, d'exécution — adaptés à votre projet et votre contexte.",
  },
];
