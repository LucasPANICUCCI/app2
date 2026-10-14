import type { Competence, Week } from "./types";

export const WEEKS: Week[] = [
  {
    number: 1,
    title: "Comprendre les ordinateurs et Internet",
    theme: "Ce qui se passe entre ton écran et un site web",
    goal: "Savoir nommer les acteurs d'une visite sur un site et lire une adresse web sans se faire piéger.",
  },
  {
    number: 2,
    title: "Protéger ses comptes",
    theme: "Mots de passe, double authentification et manipulations",
    goal: "Mettre en place des protections solides et reconnaître un message conçu pour te tromper.",
  },
  {
    number: 3,
    title: "Découvrir le terminal",
    theme: "Explorer des dossiers et des fichiers en écrivant des commandes",
    goal: "Te déplacer, lire et chercher dans des fichiers avec quelques commandes, et comprendre les permissions.",
  },
  {
    number: 4,
    title: "Comprendre la sécurité des sites",
    theme: "Requêtes, cookies, sessions et contrôle des accès",
    goal: "Comprendre comment un site te reconnaît et décide de ce que tu as le droit de voir.",
  },
  {
    number: 5,
    title: "Découvrir l'enquête numérique",
    theme: "Journaux, indices et chronologie d'un incident",
    goal: "Lire des traces, séparer les faits des suppositions et reconstituer le déroulé d'un incident.",
  },
  {
    number: 6,
    title: "Consolider les acquis",
    theme: "Scénarios complets, enquête finale et bilan",
    goal: "Combiner tout ce que tu as appris dans des situations réalistes, puis mesurer ton chemin.",
  },
];

export const COMPETENCES: Competence[] = [
  { id: "internet", label: "Comprendre Internet", description: "Nommer les acteurs d'une visite sur un site : navigateur, serveur, adresse IP, DNS." },
  { id: "url", label: "Lire une adresse web", description: "Décomposer une URL, trouver le véritable domaine et savoir ce que garantit HTTPS." },
  { id: "comptes", label: "Sécuriser ses comptes", description: "Choisir des mots de passe solides, utiliser un gestionnaire et la double authentification." },
  { id: "phishing", label: "Déjouer les manipulations", description: "Repérer un message piège et les ressorts de l'ingénierie sociale." },
  { id: "terminal", label: "Utiliser le terminal", description: "Se déplacer, lire et chercher dans des fichiers, lire des permissions." },
  { id: "web", label: "Comprendre les échanges web", description: "Requêtes, réponses, cookies et sessions." },
  { id: "acces", label: "Raisonner sur les accès", description: "Distinguer authentification et autorisation, appliquer le moindre privilège." },
  { id: "journaux", label: "Lire des journaux", description: "Extraire les informations utiles d'une trace et repérer ce qui sort de l'ordinaire." },
  { id: "enquete", label: "Raisonner en enquête", description: "Séparer observation, hypothèse et conclusion ; croiser les indices." },
  { id: "chronologie", label: "Reconstituer une chronologie", description: "Ordonner des événements venus de sources différentes." },
];

/** Formulations de l'autoévaluation de départ et de fin (échelle de 1 à 4). */
export const CONFIDENCE_SCALE = [
  { value: 1, label: "Pas du tout" },
  { value: 2, label: "Un peu" },
  { value: 3, label: "Plutôt" },
  { value: 4, label: "Tout à fait" },
];

export const CONFIDENCE_STATEMENTS: { id: string; text: string }[] = [
  { id: "internet", text: "Je peux expliquer ce qui se passe quand j'ouvre une page web." },
  { id: "url", text: "Je sais trouver le véritable site derrière un lien." },
  { id: "comptes", text: "Mes comptes importants sont protégés correctement." },
  { id: "phishing", text: "Je repère un message qui cherche à me manipuler." },
  { id: "terminal", text: "Je suis à l'aise pour taper quelques commandes dans un terminal." },
  { id: "enquete", text: "Face à des traces, je sais distinguer un fait d'une supposition." },
];
