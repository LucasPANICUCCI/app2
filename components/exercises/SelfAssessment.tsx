"use client";

import { useState } from "react";
import { Rich, RichParas } from "@/components/ui/rich";
import { IconCheck } from "@/components/ui/icons";

/**
 * Grille d'autoévaluation + réponse de référence.
 * Aucune correction automatique du sens : c'est la personne qui compare sa réponse.
 */
export function SelfAssessment({
  uid,
  criteria,
  reference,
  onDone,
  done,
}: {
  uid: string;
  criteria: string[];
  reference: string[];
  onDone: (score: number) => void;
  done: boolean;
}) {
  const [ticks, setTicks] = useState<Set<number>>(new Set());
  const count = ticks.size;

  return (
    <div className="reveal mt-6 space-y-5">
      <div className="rounded-2xl border border-line bg-paper p-4">
        <h4 className="font-sans font-bold">Réponse de référence</h4>
        <p className="mb-2 text-sm text-ink-soft">Une réponse possible parmi d'autres. Compare les idées, pas les mots.</p>
        <RichParas paras={reference} />
      </div>
      <fieldset className="rounded-2xl border border-line bg-surface p-4">
        <legend className="px-1 font-bold">Grille d'autoévaluation</legend>
        <p className="mb-3 text-sm text-ink-soft">
          Cette réponse n'est pas corrigée automatiquement : coche ce que ta réponse contient vraiment. C'est toi qui juges.
        </p>
        <div className="grid gap-2">
          {criteria.map((c, i) => (
            <label key={i} className="choice-tile">
              <input
                type="checkbox"
                name={`${uid}-crit-${i}`}
                checked={ticks.has(i)}
                disabled={done}
                onChange={(e) =>
                  setTicks((s) => {
                    const n = new Set(s);
                    if (e.target.checked) n.add(i);
                    else n.delete(i);
                    return n;
                  })
                }
              />
              <span>
                <Rich text={c} />
              </span>
            </label>
          ))}
        </div>
        {!done ? (
          <button type="button" className="btn btn-primary mt-4" onClick={() => onDone(count / criteria.length)}>
            Enregistrer mon autoévaluation
          </button>
        ) : (
          <p className="mt-4 flex items-start gap-2 rounded-xl bg-green-tint px-3 py-2 text-green-strong" aria-live="polite">
            <IconCheck size={20} className="mt-0.5 flex-none" />
            <span>
              Autoévaluation enregistrée : {count} critère{count > 1 ? "s" : ""} sur {criteria.length}.
              {count < criteria.length
                ? " Ce qui manque est une piste pour ta zone « Ce que je veux revoir »."
                : " Ta réponse couvre l'essentiel."}
            </span>
          </p>
        )}
      </fieldset>
    </div>
  );
}
