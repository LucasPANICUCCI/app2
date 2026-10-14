"use client";

import { useState } from "react";
import { CONFIDENCE_SCALE, CONFIDENCE_STATEMENTS } from "@/content/programme";

/** Autoévaluation de confiance (1 à 4), au départ et à la fin du programme. */
export function ConfidenceForm({
  id,
  initial,
  submitLabel,
  onSubmit,
  onSkip,
}: {
  id: string;
  initial?: Record<string, number>;
  submitLabel: string;
  onSubmit: (values: Record<string, number>) => void;
  onSkip?: () => void;
}) {
  const [values, setValues] = useState<Record<string, number>>(initial ?? {});
  const complete = CONFIDENCE_STATEMENTS.every((s) => values[s.id]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (complete) onSubmit(values);
      }}
    >
      <div className="space-y-4">
        {CONFIDENCE_STATEMENTS.map((s) => (
          <fieldset key={s.id}>
            <legend className="mb-2 font-semibold">{s.text}</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {CONFIDENCE_SCALE.map((c) => (
                <label key={c.value} className="choice-tile py-2">
                  <input
                    type="radio"
                    name={`${id}-${s.id}`}
                    checked={values[s.id] === c.value}
                    onChange={() => setValues((v) => ({ ...v, [s.id]: c.value }))}
                  />
                  <span className="text-[0.95rem]">{c.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn btn-primary" disabled={!complete}>
          {submitLabel}
        </button>
        {onSkip && (
          <button type="button" className="btn btn-quiet" onClick={onSkip}>
            Passer cette étape
          </button>
        )}
        {!complete && <span className="text-sm text-ink-soft">Une réponse par ligne, il n'y a pas de bonne ou de mauvaise réponse.</span>}
      </div>
    </form>
  );
}
