"use client";

import { useEffect, useRef, useState } from "react";
import type { ReflectionExercise } from "@/content/types";
import { progressActions, useProgress } from "@/lib/progress";
import { RichParas, Rich } from "@/components/ui/rich";
import { SimulationBanner, type ExerciseProps } from "./shared";
import { SelfAssessment } from "./SelfAssessment";

const MIN_CHARS = 20;

export function ReflectionEx({ exercise, uid, revealed, onCheck }: ExerciseProps<ReflectionExercise>) {
  const { state, hydrated } = useProgress();
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [assessed, setAssessed] = useState(false);
  const restored = useRef(false);

  useEffect(() => {
    if (!hydrated || restored.current) return;
    restored.current = true;
    const saved = state.reflections[uid];
    if (saved) setTexts(saved);
  }, [hydrated, state.reflections, uid]);

  const ready = exercise.prompts.every((p) => (texts[p.id] ?? "").trim().length >= MIN_CHARS);

  return (
    <div>
      <SimulationBanner text={exercise.simulation} />
      {exercise.context && <RichParas paras={exercise.context} className="mb-5 rounded-xl border border-line bg-paper p-4" />}
      <div className="space-y-5">
        {exercise.prompts.map((p) => (
          <div key={p.id}>
            <label htmlFor={`${uid}-${p.id}`} className="mb-1.5 block font-semibold">
              <Rich text={p.label} />
            </label>
            <textarea
              id={`${uid}-${p.id}`}
              className="field min-h-32 resize-y"
              placeholder={p.placeholder}
              value={texts[p.id] ?? ""}
              disabled={submitted && assessed}
              onChange={(e) => {
                const next = { ...texts, [p.id]: e.target.value };
                setTexts(next);
                progressActions.saveReflection(uid, next);
              }}
            />
          </div>
        ))}
      </div>
      <p className="mt-2 text-sm text-ink-soft">Ta réponse est enregistrée au fur et à mesure dans ce navigateur. Elle apparaîtra aussi dans ton carnet.</p>
      {!submitted && !revealed && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary" disabled={!ready} onClick={() => setSubmitted(true)}>
            J'ai terminé ma réponse
          </button>
          {!ready && <span className="text-sm text-ink-soft">Écris au moins une phrase pour chaque question.</span>}
        </div>
      )}
      {(submitted || revealed) && (
        <SelfAssessment
          uid={uid}
          criteria={exercise.criteria}
          reference={exercise.reference}
          done={assessed}
          onDone={(score) => {
            setAssessed(true);
            onCheck(true, score);
          }}
        />
      )}
    </div>
  );
}
