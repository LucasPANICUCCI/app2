import type { Session } from "./types";

export const KIND_LABEL: Record<Session["kind"], string> = {
  apprentissage: "Séance",
  defi: "Défi pratique",
  revision: "Révision",
};

export const EXERCISE_LABEL: Record<Session["exercise"]["type"], string> = {
  choice: "Questions à choix",
  message: "Message à examiner",
  url: "Adresses à décomposer",
  order: "Remise en ordre",
  match: "Association",
  justify: "Choix à justifier",
  reflection: "Réponse rédigée",
  short: "Réponses courtes",
  terminal: "Terminal simulé",
  logs: "Journal à examiner",
  investigation: "Mini-enquête",
  access: "Simulation d'accès",
};
