"use client";

import type { ReactNode } from "react";
import type { Exercise } from "@/content/types";
import { IconCheck, IconCross, IconSimulation } from "@/components/ui/icons";
import { Rich } from "@/components/ui/rich";

export type Verdict = "idle" | "right" | "wrong";

export interface ExerciseProps<E extends Exercise> {
  exercise: E;
  /** Identifiant unique (sert au mélange déterministe et aux identifiants HTML). */
  uid: string;
  /** La correction est demandée : afficher la solution. */
  revealed: boolean;
  onCheck: (correct: boolean, score?: number) => void;
}

export function SimulationBanner({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="mb-4 flex items-start gap-2.5 rounded-xl border border-dashed border-line-strong bg-paper px-3.5 py-2.5 text-[0.95rem] text-ink-soft">
      <IconSimulation size={20} className="mt-0.5 flex-none text-deep" />
      <span>
        <strong className="font-semibold text-ink">Simulation.</strong> <Rich text={text} />
      </span>
    </p>
  );
}

/** Repère juste / à revoir sur un élément : icône + texte, jamais la couleur seule. */
export function ItemMark({ ok, labelOk = "Juste", labelKo = "À revoir" }: { ok: boolean; labelOk?: string; labelKo?: string }) {
  return ok ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-tint px-2 py-0.5 text-sm font-semibold text-green-strong">
      <IconCheck size={15} />
      {labelOk}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-tint px-2 py-0.5 text-sm font-semibold text-red">
      <IconCross size={15} />
      {labelKo}
    </span>
  );
}

/**
 * Barre de vérification commune : bouton « Vérifier », retour global, et message de raisonnement
 * en cas d'erreur. Une nouvelle tentative est toujours possible, sans pénalité.
 */
export function CheckBar({
  verdict,
  onCheck,
  disabled,
  disabledReason,
  retry,
  summary,
  revealed,
  checkLabel = "Vérifier",
}: {
  verdict: Verdict;
  onCheck: () => void;
  disabled?: boolean;
  disabledReason?: string;
  retry: string;
  summary?: ReactNode;
  revealed: boolean;
  checkLabel?: string;
}) {
  return (
    <div className="mt-6 space-y-3">
      {!revealed && verdict !== "right" && (
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary" onClick={onCheck} disabled={disabled}>
            {verdict === "wrong" ? "Vérifier à nouveau" : checkLabel}
          </button>
          {disabled && disabledReason && <span className="text-sm text-ink-soft">{disabledReason}</span>}
        </div>
      )}
      <div aria-live="polite">
        {verdict === "right" && (
          <div className="reveal flex items-start gap-3 rounded-xl border border-green/30 bg-green-tint px-4 py-3">
            <IconCheck size={22} className="mt-0.5 flex-none text-green-strong" />
            <div>
              <p className="font-semibold text-green-strong">C'est juste.</p>
              {summary && <div className="mt-0.5">{summary}</div>}
              <p className="mt-1 text-[0.95rem]">La correction détaillée est disponible juste en dessous.</p>
            </div>
          </div>
        )}
        {verdict === "wrong" && !revealed && (
          <div className="reveal rounded-xl border border-amber/30 bg-amber-tint px-4 py-3">
            <p className="font-semibold text-amber">Pas encore. {summary}</p>
            <p className="mt-1">
              <Rich text={retry} />
            </p>
            <p className="mt-2 text-sm text-ink-soft">Modifie tes réponses et vérifie à nouveau : aucune pénalité. Les indices et la correction restent disponibles.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function ExplanationNote({ children }: { children: ReactNode }) {
  return <div className="mt-2 rounded-lg bg-paper px-3 py-2 text-[0.95rem] text-ink">{children}</div>;
}
