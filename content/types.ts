/**
 * Types du contenu pédagogique.
 *
 * Tout le contenu est déclaré en données statiques typées : aucune séance n'est
 * chargée à distance. Les textes acceptent une syntaxe légère (voir lib/rich.tsx) :
 *   **gras**, `code`, [[idGlossaire]] ou [[idGlossaire|texte affiché]].
 */

export type WeekNumber = 1 | 2 | 3 | 4 | 5 | 6;
export type SessionKind = "apprentissage" | "defi" | "revision";

export type CompetenceId =
  | "internet"
  | "url"
  | "comptes"
  | "phishing"
  | "terminal"
  | "web"
  | "acces"
  | "journaux"
  | "enquete"
  | "chronologie";

export interface Competence {
  id: CompetenceId;
  label: string;
  description: string;
}

export interface GlossaryEntry {
  id: string;
  term: string;
  definition: string;
  example?: string;
  seeAlso?: string[];
}

export interface Week {
  number: WeekNumber;
  title: string;
  theme: string;
  goal: string;
}

export interface Option {
  id: string;
  text: string;
}

/* ------------------------------------------------------------------ */
/* Exercices                                                          */
/* ------------------------------------------------------------------ */

interface ExerciseBase {
  /** Consigne affichée au-dessus de l'exercice. */
  instructions: string;
  /** Présent si l'exercice est une simulation : texte qui le rappelle explicitement. */
  simulation?: string;
  /**
   * Raisonnement proposé en cas d'erreur. Il guide sans donner la réponse,
   * et s'affiche à côté du bouton « Réessayer ».
   */
  retry: string;
}

/** Question à choix (une ou plusieurs bonnes réponses). Format minoritaire. */
export interface ChoiceQuestion {
  id: string;
  prompt: string;
  /** Bloc de données techniques à afficher en police à chasse fixe. */
  context?: string;
  options: Option[];
  /** Identifiants des bonnes réponses. Plusieurs = cases à cocher. */
  answers: string[];
  explanation: string;
}

export interface ChoiceExercise extends ExerciseBase {
  type: "choice";
  questions: ChoiceQuestion[];
}

/** Élément inspectable d'un message fictif. */
export interface MessageFlag {
  id: string;
  text: string;
  suspicious: boolean;
  why: string;
  /** Adresse réelle d'un lien, révélée par « Inspecter le lien ». */
  link?: string;
}

export type MessagePart = string | MessageFlag;

export interface MessageExercise extends ExerciseBase {
  type: "message";
  channel: "email" | "sms" | "messagerie";
  fields: { label: string; value: MessagePart[] }[];
  body: MessagePart[][];
  /** Bouton d'action affiché dans le message (inspectable). */
  button?: MessageFlag;
  verdict: { prompt: string; options: Option[]; answer: string; explanation: string };
}

export interface UrlItem {
  id: string;
  url: string;
  /** Contexte : qui prétend envoyer ce lien. */
  claim: string;
  choices: string[];
  /** Le véritable domaine (doit correspondre au calcul de lib/url.ts). */
  answer: string;
  /** Le lien mène-t-il vraiment là où il le prétend ? */
  legit: boolean;
  why: string;
}

export interface UrlExercise extends ExerciseBase {
  type: "url";
  items: UrlItem[];
}

export interface OrderItem {
  id: string;
  text: string;
  /** Précision affichée sous l'étape (source, heure, etc.). */
  detail?: string;
  mono?: boolean;
  /** Explication affichée dans la correction. */
  note?: string;
}

export interface OrderExercise extends ExerciseBase {
  type: "order";
  variant: "steps" | "timeline" | "rank";
  /** Pour le classement : libellés du haut et du bas de la liste. */
  rankLabels?: { top: string; bottom: string };
  /** Les éléments sont déclarés dans le bon ordre ; l'affichage les mélange. */
  items: OrderItem[];
}

export interface MatchItem {
  id: string;
  text: string;
  mono?: boolean;
  answer: string;
  why: string;
}

export interface MatchExercise extends ExerciseBase {
  type: "match";
  /** associate : relier chaque élément à sa description ; categorize : ranger dans des catégories. */
  variant: "associate" | "categorize";
  options: { id: string; label: string; description?: string }[];
  items: MatchItem[];
}

export interface JustifyChoice {
  id: string;
  text: string;
  /** Réaction affichée si cette option est choisie (sans révéler la bonne). */
  feedback: string;
}

export interface JustifyExercise extends ExerciseBase {
  type: "justify";
  situation: string[];
  question: string;
  choices: JustifyChoice[];
  answer: string;
  justificationPrompt: string;
  criteria: string[];
  reference: string[];
}

export interface ReflectionExercise extends ExerciseBase {
  type: "reflection";
  context?: string[];
  prompts: { id: string; label: string; placeholder?: string }[];
  criteria: string[];
  reference: string[];
}

export interface ShortQuestion {
  id: string;
  prompt: string;
  context?: string;
  /** Réponses acceptées, comparées après normalisation (casse, espaces, accents). */
  accept: string[];
  placeholder?: string;
  explanation: string;
}

export interface ShortAnswerExercise extends ExerciseBase {
  type: "short";
  /** Données communes à toutes les questions (tableau, extrait…), en police à chasse fixe. */
  context?: string;
  contextLabel?: string;
  questions: ShortQuestion[];
}

/* Terminal simulé ---------------------------------------------------- */

export interface FsFile {
  type: "file";
  name: string;
  content: string;
  perms?: string;
  owner?: string;
  group?: string;
}

export interface FsDir {
  type: "dir";
  name: string;
  children: FsNode[];
  perms?: string;
  owner?: string;
  group?: string;
}

export type FsNode = FsFile | FsDir;

export type TerminalCheck =
  | { kind: "cwd"; path: string }
  | { kind: "ran"; command: string; outputIncludes?: string; argIncludes?: string }
  | { kind: "answer"; accept: string[]; placeholder?: string };

export interface TerminalTask {
  id: string;
  text: string;
  check: TerminalCheck;
}

export interface TerminalExercise extends ExerciseBase {
  type: "terminal";
  user: string;
  /** Groupes de l'utilisateur fictif (par défaut : un groupe portant son nom). */
  groups?: string[];
  host: string;
  home: string;
  startDir: string;
  root: FsDir;
  tasks: TerminalTask[];
  /** Suite de commandes qui résout l'exercice (correction + vérification automatique). */
  solution: string[];
  /** Réponses attendues pour les tâches « answer », dans l'ordre (vérification automatique). */
  solutionAnswers?: Record<string, string>;
}

/* Journaux ----------------------------------------------------------- */

export interface LogRow {
  id: string;
  cells: Record<string, string>;
  suspicious: boolean;
  why: string;
}

export interface LogExercise extends ExerciseBase {
  type: "logs";
  source: string;
  columns: { key: string; label: string }[];
  rows: LogRow[];
  followUp: ChoiceQuestion[];
}

/* Mini-enquête ------------------------------------------------------- */

export interface Clue {
  id: string;
  title: string;
  source: string;
  kind: "text" | "log" | "email";
  content: string;
}

export interface InvestigationExercise extends ExerciseBase {
  type: "investigation";
  brief: string[];
  clues: Clue[];
  questions: ChoiceQuestion[];
}

/* Contrôle d'accès --------------------------------------------------- */

export type AccessAction = "lire" | "modifier" | "supprimer";

export interface AccessRequest {
  id: string;
  userId: string;
  action: AccessAction;
  resourceId: string;
  /** Propriétaire de l'élément visé, pour les ressources limitées à leur propriétaire. */
  ownerId?: string;
  why: string;
}

export interface AccessScenario {
  id: string;
  text: string;
  userId: string;
  action: AccessAction;
  resourceId: string;
  expected: boolean;
}

export interface AccessExercise extends ExerciseBase {
  type: "access";
  mode: "predict" | "configure";
  roles: { id: string; label: string; description: string }[];
  users: { id: string; name: string; role: string }[];
  resources: { id: string; label: string; description?: string }[];
  actions: AccessAction[];
  /** Permissions par rôle, sous la forme "ressource:action". En mode configure : point de départ. */
  perms: Record<string, string[]>;
  /** Ressources dont chaque élément n'est accessible qu'à son propriétaire (sauf rôles listés dans bypassRoles). */
  ownerScoped?: string[];
  bypassRoles?: string[];
  requests?: AccessRequest[];
  scenarios?: AccessScenario[];
  /** Mode configure : texte qui explique la solution minimale. */
  solutionNote?: string;
  /** Mode configure : une configuration correcte (vérification automatique et correction). */
  solutionPerms?: Record<string, string[]>;
}

export type Exercise =
  | ChoiceExercise
  | MessageExercise
  | UrlExercise
  | OrderExercise
  | MatchExercise
  | JustifyExercise
  | ReflectionExercise
  | ShortAnswerExercise
  | TerminalExercise
  | LogExercise
  | InvestigationExercise
  | AccessExercise;

export type ExerciseType = Exercise["type"];

/* ------------------------------------------------------------------ */
/* Séance                                                             */
/* ------------------------------------------------------------------ */

export interface Recall {
  /** Identifiant de glossaire de la notion rappelée. */
  notion: string;
  /** Jour où la notion a été rencontrée. */
  fromDay: number;
  prompt: string;
  options: Option[];
  answer: string;
  explanation: string;
}

export interface Session {
  id: string;
  day: number;
  week: WeekNumber;
  kind: SessionKind;
  title: string;
  /** Durée estimée en minutes. */
  duration: number;
  /** Suite de la phrase « À la fin, tu sauras… ». */
  objective: string;
  /** Notions travaillées (identifiants du glossaire). */
  notions: string[];
  competences: CompetenceId[];
  learn: {
    paragraphs: string[];
    example: { title: string; paragraphs: string[] };
    callout?: { title: string; text: string };
  };
  exercise: Exercise;
  hints: [string, string];
  correction: string[];
  recall?: Recall;
  summary: [string, string, string];
}

/** Données légères d'une séance, transmises aux vues qui n'ont pas besoin du contenu complet. */
export interface SessionMeta {
  id: string;
  day: number;
  week: WeekNumber;
  kind: SessionKind;
  title: string;
  duration: number;
  objective: string;
  notions: string[];
  competences: CompetenceId[];
  exerciseType: ExerciseType;
}
