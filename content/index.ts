import type { Session, SessionMeta } from "./types";
import { SEMAINE_1 } from "./semaines/semaine-1";
import { SEMAINE_2 } from "./semaines/semaine-2";
import { SEMAINE_3 } from "./semaines/semaine-3";
import { SEMAINE_4 } from "./semaines/semaine-4";
import { SEMAINE_5 } from "./semaines/semaine-5";
import { SEMAINE_6 } from "./semaines/semaine-6";

export const SESSIONS: Session[] = [...SEMAINE_1, ...SEMAINE_2, ...SEMAINE_3, ...SEMAINE_4, ...SEMAINE_5, ...SEMAINE_6];

export function getSession(id: string): Session | undefined {
  return SESSIONS.find((s) => s.id === id);
}

export function toMeta(s: Session): SessionMeta {
  return {
    id: s.id,
    day: s.day,
    week: s.week,
    kind: s.kind,
    title: s.title,
    duration: s.duration,
    objective: s.objective,
    notions: s.notions,
    competences: s.competences,
    exerciseType: s.exercise.type,
  };
}

export const SESSION_METAS: SessionMeta[] = SESSIONS.map(toMeta);

/** Notion rappelée par séance (pour la révision des notions manquées au rappel). */
export const RECALL_NOTIONS: Record<string, string> = Object.fromEntries(
  SESSIONS.filter((s) => s.recall).map((s) => [s.id, s.recall!.notion]),
);

export { KIND_LABEL, EXERCISE_LABEL } from "./labels";
