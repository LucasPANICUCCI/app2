"use client";

/**
 * Gestion de la progression.
 *
 * Les données restent dans le navigateur (localStorage). Pendant le rendu serveur,
 * localStorage n'existe pas : on fournit alors un état vide constant, et l'interface
 * attend l'hydratation (`hydrated`) avant d'afficher les informations personnelles.
 */
import { useSyncExternalStore } from "react";
import type { SessionMeta } from "@/content/types";

export const STORAGE_KEY = "vigie:progression:v1";
export const EXPORT_APP_ID = "vigie-cybersecurite";

export type SessionStatus = "a_decouvrir" | "en_cours" | "termine" | "a_revoir";

export interface SessionRecord {
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
  attempts: number;
  solved: boolean;
  /** true : réussi du premier coup ; false : erreur au premier essai ; null : pas encore tenté. */
  firstTry: boolean | null;
  hintsUsed: number;
  correctionViewed: boolean;
  /** Score entre 0 et 1 (autoévaluation ou réussite partielle). */
  score?: number;
  recall?: { correct: boolean; attempts: number };
  flagged: boolean;
}

export interface NoteRecord {
  understood: string;
  review: string;
  updatedAt: string;
}

export interface ProgressState {
  version: 1;
  sessions: Record<string, SessionRecord>;
  notes: Record<string, NoteRecord>;
  /** Réponses rédigées (exercices à réponse libre), par séance puis par question. */
  reflections: Record<string, Record<string, string>>;
  /** Notions revues avec succès dans l'écran de révision (date ISO). */
  notionsResolved: Record<string, string>;
  confidence: {
    start?: Record<string, number>;
    end?: Record<string, number>;
    startSkipped?: boolean;
  };
  lastSessionId?: string;
}

export function emptyState(): ProgressState {
  return { version: 1, sessions: {}, notes: {}, reflections: {}, notionsResolved: {}, confidence: {} };
}

const SERVER_STATE: ProgressState = emptyState();

let state: ProgressState = SERVER_STATE;
let loaded = false;
let storageOk = true;
const listeners = new Set<() => void>();

function now() {
  return new Date().toISOString();
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    state = raw ? sanitize(JSON.parse(raw)) ?? emptyState() : emptyState();
    const probe = "vigie:test";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
  } catch {
    storageOk = false;
    state = emptyState();
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    storageOk = true;
  } catch {
    storageOk = false;
  }
}

function emit() {
  for (const l of listeners) l();
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    try {
      state = e.newValue ? sanitize(JSON.parse(e.newValue)) ?? emptyState() : emptyState();
    } catch {
      state = emptyState();
    }
    emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return state;
}

function getServerSnapshot() {
  return SERVER_STATE;
}

const noopSubscribe = () => () => {};

/** Lecture de la progression. `hydrated` vaut false pendant le rendu serveur et la première passe d'hydratation. */
export function useProgress() {
  const s = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  return { state: s, hydrated, storageOk };
}

export function isStorageAvailable() {
  load();
  return storageOk;
}

function update(mutator: (draft: ProgressState) => ProgressState) {
  load();
  state = mutator(state);
  persist();
  emit();
}

/* ------------------------------------------------------------------ */
/* Actions                                                            */
/* ------------------------------------------------------------------ */

function baseRecord(): SessionRecord {
  const t = now();
  return { startedAt: t, updatedAt: t, attempts: 0, solved: false, firstTry: null, hintsUsed: 0, correctionViewed: false, flagged: false };
}

function patchSession(id: string, patch: (r: SessionRecord) => Partial<SessionRecord>) {
  update((s) => {
    const current = s.sessions[id] ?? baseRecord();
    const next = { ...current, ...patch(current), updatedAt: now() };
    return { ...s, sessions: { ...s.sessions, [id]: next }, lastSessionId: id };
  });
}

export const progressActions = {
  /** Marque la séance « en cours » au premier geste (indice, vérification, note). */
  touch(id: string) {
    if (state.sessions[id] && state.lastSessionId === id) return;
    patchSession(id, () => ({}));
  },
  recordAttempt(id: string, correct: boolean, score?: number) {
    patchSession(id, (r) => ({
      attempts: r.attempts + 1,
      solved: r.solved || correct,
      firstTry: r.firstTry === null ? correct : r.firstTry,
      score: score ?? (correct ? Math.max(r.score ?? 0, 1) : r.score ?? 0),
    }));
  },
  useHint(id: string, level: number) {
    patchSession(id, (r) => ({ hintsUsed: Math.max(r.hintsUsed, level) }));
  },
  viewCorrection(id: string) {
    patchSession(id, () => ({ correctionViewed: true }));
  },
  recordRecall(id: string, correct: boolean) {
    patchSession(id, (r) => ({
      recall: { correct: r.recall?.correct === undefined ? correct : r.recall.correct, attempts: (r.recall?.attempts ?? 0) + 1 },
    }));
  },
  setFlag(id: string, flagged: boolean) {
    patchSession(id, () => ({ flagged }));
  },
  complete(id: string) {
    patchSession(id, (r) => ({ completedAt: r.completedAt ?? now() }));
  },
  reopen(id: string) {
    patchSession(id, () => ({ completedAt: undefined }));
  },
  saveNote(id: string, field: "understood" | "review", value: string) {
    update((s) => {
      const current = s.notes[id] ?? { understood: "", review: "", updatedAt: now() };
      const next = { ...current, [field]: value.slice(0, 5000), updatedAt: now() };
      const notes = { ...s.notes };
      if (!next.understood.trim() && !next.review.trim()) delete notes[id];
      else notes[id] = next;
      return { ...s, notes };
    });
  },
  saveReflection(id: string, answers: Record<string, string>) {
    update((s) => ({
      ...s,
      reflections: { ...s.reflections, [id]: Object.fromEntries(Object.entries(answers).map(([k, v]) => [k, v.slice(0, 5000)])) },
    }));
  },
  resolveNotion(notion: string) {
    update((s) => ({ ...s, notionsResolved: { ...s.notionsResolved, [notion]: now() } }));
  },
  setConfidence(moment: "start" | "end", values: Record<string, number>) {
    update((s) => ({ ...s, confidence: { ...s.confidence, [moment]: values } }));
  },
  skipStartConfidence() {
    update((s) => ({ ...s, confidence: { ...s.confidence, startSkipped: true } }));
  },
  reset() {
    update(() => emptyState());
  },
  replace(next: ProgressState) {
    update(() => next);
  },
};

/* ------------------------------------------------------------------ */
/* Lecture dérivée                                                    */
/* ------------------------------------------------------------------ */

export function sessionStatus(s: ProgressState, id: string): SessionStatus {
  const r = s.sessions[id];
  if (!r) return "a_decouvrir";
  if (!r.completedAt) return "en_cours";
  if (r.flagged || !r.solved || r.recall?.correct === false) return "a_revoir";
  return "termine";
}

export function isDone(s: ProgressState, id: string) {
  return Boolean(s.sessions[id]?.completedAt);
}

export function nextSession(s: ProgressState, metas: SessionMeta[]): { meta: SessionMeta; resume: boolean } | null {
  const last = s.lastSessionId ? metas.find((m) => m.id === s.lastSessionId) : undefined;
  if (last && !isDone(s, last.id)) return { meta: last, resume: true };
  const next = metas.find((m) => !isDone(s, m.id));
  if (!next) return null;
  return { meta: next, resume: Boolean(s.sessions[next.id]) };
}

export interface NotionDifficulty {
  notion: string;
  sessions: string[];
  lastAt: string;
}

/** Notions qui ont posé problème : erreur au premier essai, exercice non résolu, rappel manqué ou séance marquée « à revoir ». */
export function difficultNotions(s: ProgressState, metas: SessionMeta[], recallNotions: Record<string, string>): NotionDifficulty[] {
  const map = new Map<string, NotionDifficulty>();
  const add = (notion: string, sessionId: string, at: string) => {
    const resolved = s.notionsResolved[notion];
    if (resolved && resolved >= at) return;
    const entry = map.get(notion) ?? { notion, sessions: [], lastAt: at };
    if (!entry.sessions.includes(sessionId)) entry.sessions.push(sessionId);
    if (at > entry.lastAt) entry.lastAt = at;
    map.set(notion, entry);
  };
  for (const m of metas) {
    const r = s.sessions[m.id];
    if (!r) continue;
    const struggled = r.firstTry === false || (r.attempts > 0 && !r.solved) || r.flagged || (r.correctionViewed && !r.solved);
    if (struggled) for (const n of m.notions) add(n, m.id, r.updatedAt);
    if (r.recall?.correct === false && recallNotions[m.id]) add(recallNotions[m.id], m.id, r.updatedAt);
  }
  return [...map.values()].sort((a, b) => b.lastAt.localeCompare(a.lastAt));
}

/* ------------------------------------------------------------------ */
/* Export / import                                                    */
/* ------------------------------------------------------------------ */

export function exportJson(s: ProgressState): string {
  return JSON.stringify({ app: EXPORT_APP_ID, exportedAt: now(), data: s }, null, 2);
}

export function parseImport(text: string): { ok: true; state: ProgressState } | { ok: false; error: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, error: "Ce fichier n'est pas un JSON valide. Choisis le fichier produit par le bouton « Exporter »." };
  }
  if (!isObject(parsed) || parsed.app !== EXPORT_APP_ID || !isObject(parsed.data)) {
    return { ok: false, error: "Ce fichier ne provient pas d'un export de cette application." };
  }
  const state = sanitize(parsed.data);
  if (!state) return { ok: false, error: "Le contenu du fichier est incomplet ou d'une version inconnue." };
  return { ok: true, state };
}

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

const ID_PATTERN = /^j\d{2}$/;

/** Valide et nettoie un état venu du stockage ou d'un fichier : seuls les champs connus et bien typés sont conservés. */
export function sanitize(input: unknown): ProgressState | null {
  if (!isObject(input) || input.version !== 1) return null;
  const out = emptyState();
  const str = (v: unknown) => (typeof v === "string" ? v : undefined);
  const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);

  if (isObject(input.sessions)) {
    for (const [id, raw] of Object.entries(input.sessions)) {
      if (!ID_PATTERN.test(id) || !isObject(raw)) continue;
      const startedAt = str(raw.startedAt) ?? now();
      const rec: SessionRecord = {
        startedAt,
        updatedAt: str(raw.updatedAt) ?? startedAt,
        completedAt: str(raw.completedAt),
        attempts: Math.max(0, Math.floor(num(raw.attempts) ?? 0)),
        solved: raw.solved === true,
        firstTry: raw.firstTry === true ? true : raw.firstTry === false ? false : null,
        hintsUsed: Math.min(2, Math.max(0, Math.floor(num(raw.hintsUsed) ?? 0))),
        correctionViewed: raw.correctionViewed === true,
        score: num(raw.score),
        flagged: raw.flagged === true,
      };
      if (isObject(raw.recall) && typeof raw.recall.correct === "boolean") {
        rec.recall = { correct: raw.recall.correct, attempts: Math.max(1, Math.floor(num(raw.recall.attempts) ?? 1)) };
      }
      out.sessions[id] = rec;
    }
  }
  if (isObject(input.notes)) {
    for (const [id, raw] of Object.entries(input.notes)) {
      if (!ID_PATTERN.test(id) || !isObject(raw)) continue;
      out.notes[id] = {
        understood: (str(raw.understood) ?? "").slice(0, 5000),
        review: (str(raw.review) ?? "").slice(0, 5000),
        updatedAt: str(raw.updatedAt) ?? now(),
      };
    }
  }
  if (isObject(input.reflections)) {
    for (const [id, raw] of Object.entries(input.reflections)) {
      if (!ID_PATTERN.test(id) || !isObject(raw)) continue;
      const r: Record<string, string> = {};
      for (const [k, v] of Object.entries(raw)) if (typeof v === "string" && /^[a-z0-9-]+$/.test(k)) r[k] = v.slice(0, 5000);
      out.reflections[id] = r;
    }
  }
  if (isObject(input.notionsResolved)) {
    for (const [k, v] of Object.entries(input.notionsResolved)) if (typeof v === "string" && /^[a-z0-9-]+$/.test(k)) out.notionsResolved[k] = v;
  }
  if (isObject(input.confidence)) {
    const pick = (v: unknown) => {
      if (!isObject(v)) return undefined;
      const r: Record<string, number> = {};
      for (const [k, n] of Object.entries(v)) if (typeof n === "number" && n >= 1 && n <= 4 && /^[a-z]+$/.test(k)) r[k] = Math.round(n);
      return r;
    };
    out.confidence = {
      start: pick(input.confidence.start),
      end: pick(input.confidence.end),
      startSkipped: input.confidence.startSkipped === true ? true : undefined,
    };
  }
  const last = str(input.lastSessionId);
  if (last && ID_PATTERN.test(last)) out.lastSessionId = last;
  return out;
}
