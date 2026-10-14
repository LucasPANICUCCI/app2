import type { SessionMeta } from "@/content/types";
import type { ProgressState, SessionRecord } from "@/lib/progress";

export type ResultTone = "good" | "ok" | "weak" | "none";

/** Décrit le résultat d'une séance en langage clair. */
export function describeResult(r: SessionRecord | undefined, meta: SessionMeta): { label: string; tone: ResultTone } {
  if (!r || r.attempts === 0) return { label: "Pas encore tenté", tone: "none" };
  if (meta.exerciseType === "reflection") {
    const pct = Math.round((r.score ?? 0) * 100);
    return { label: `Autoévaluation : ${pct} % des critères`, tone: pct >= 75 ? "good" : pct >= 40 ? "ok" : "weak" };
  }
  if (r.firstTry) return { label: r.hintsUsed ? "Réussi du premier coup, avec indice" : "Réussi du premier coup", tone: "good" };
  if (r.solved) return { label: `Réussi en ${r.attempts} essais`, tone: "ok" };
  return { label: r.correctionViewed ? "Correction consultée" : "Pas encore réussi", tone: "weak" };
}

export function toneValue(t: ResultTone) {
  return t === "good" ? 3 : t === "ok" ? 2 : t === "weak" ? 1 : 0;
}

export interface Stats {
  attempted: number;
  done: number;
  firstTry: number;
  recallOk: number;
  recallTotal: number;
  hints: number;
}

export function stats(state: ProgressState, metas: SessionMeta[]): Stats {
  const s: Stats = { attempted: 0, done: 0, firstTry: 0, recallOk: 0, recallTotal: 0, hints: 0 };
  for (const m of metas) {
    const r = state.sessions[m.id];
    if (!r) continue;
    if (r.completedAt) s.done++;
    if (r.attempts > 0) {
      s.attempted++;
      if (describeResult(r, m).tone === "good") s.firstTry++;
    }
    if (r.recall) {
      s.recallTotal++;
      if (r.recall.correct) s.recallOk++;
    }
    s.hints += r.hintsUsed;
  }
  return s;
}

export function pct(n: number, d: number) {
  return d ? Math.round((n / d) * 100) : 0;
}
