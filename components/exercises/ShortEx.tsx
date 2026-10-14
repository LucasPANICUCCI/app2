"use client";

import { useState } from "react";
import type { ShortAnswerExercise } from "@/content/types";
import { matchesAnswer } from "@/lib/text";
import { Rich } from "@/components/ui/rich";
import { CheckBar, ExplanationNote, ItemMark, SimulationBanner, type ExerciseProps } from "./shared";
import { useCheck } from "./useCheck";

export function ShortEx({ exercise, uid, revealed, onCheck }: ExerciseProps<ShortAnswerExercise>) {
  const [values, setValues] = useState<Record<string, string>>({});
  const { verdict, checked, check, touch, solved } = useCheck(onCheck);
  const showSolution = revealed || solved;
  const complete = exercise.questions.every((q) => (values[q.id] ?? "").trim());
  const correct = exercise.questions.filter((q) => matchesAnswer(values[q.id] ?? "", q.accept)).length;

  return (
    <div>
      <SimulationBanner text={exercise.simulation} />
      {exercise.context && (
        <figure className="mb-6">
          {exercise.contextLabel && <figcaption className="mb-1.5 text-sm font-semibold text-ink-soft">{exercise.contextLabel}</figcaption>}
          <pre className="mono-block text-[0.86rem] break-all sm:break-normal">{exercise.context}</pre>
        </figure>
      )}
      <ol className="space-y-6">
        {exercise.questions.map((q, i) => {
          const ok = matchesAnswer(values[q.id] ?? "", q.accept);
          return (
            <li key={q.id}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <label htmlFor={`${uid}-${q.id}`} className="font-semibold">
                  <span className="mr-1.5 text-ink-soft">{i + 1}.</span>
                  <Rich text={q.prompt} />
                </label>
                {checked && !showSolution && <ItemMark ok={ok} />}
              </div>
              {q.context && <pre className="mono-block mt-2">{q.context}</pre>}
              <input
                id={`${uid}-${q.id}`}
                type="text"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                className="field mt-2 font-mono"
                placeholder={q.placeholder ?? "Ta réponse"}
                value={values[q.id] ?? ""}
                disabled={showSolution}
                onChange={(e) => {
                  setValues((s) => ({ ...s, [q.id]: e.target.value }));
                  touch();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && complete && !showSolution) check(correct === exercise.questions.length, correct / exercise.questions.length);
                }}
              />
              {showSolution && (
                <ExplanationNote>
                  <strong className="font-semibold text-green-strong">Réponse attendue : </strong>
                  <code className="inline">{q.accept[0]}</code>
                  <span className="mt-1 block">
                    <Rich text={q.explanation} />
                  </span>
                </ExplanationNote>
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-sm text-ink-soft">Les majuscules, les accents et les espaces en trop ne comptent pas.</p>
      <CheckBar
        verdict={verdict}
        revealed={revealed}
        retry={exercise.retry}
        disabled={!complete}
        disabledReason="Réponds à chaque question pour vérifier."
        summary={`${correct} réponse${correct > 1 ? "s" : ""} juste${correct > 1 ? "s" : ""} sur ${exercise.questions.length}.`}
        onCheck={() => check(correct === exercise.questions.length, correct / exercise.questions.length)}
      />
    </div>
  );
}
