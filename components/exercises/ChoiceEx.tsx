"use client";

import { useState } from "react";
import type { ChoiceExercise } from "@/content/types";
import { ChoiceQuestionBlock, isChoiceCorrect } from "./ChoiceQuestion";
import { CheckBar, SimulationBanner, type ExerciseProps } from "./shared";
import { useCheck } from "./useCheck";

export function ChoiceEx({ exercise, uid, revealed, onCheck }: ExerciseProps<ChoiceExercise>) {
  const [values, setValues] = useState<Record<string, string[]>>({});
  const { verdict, checked, check, touch, solved } = useCheck(onCheck);
  const answered = exercise.questions.every((q) => (values[q.id] ?? []).length > 0);
  const correctCount = exercise.questions.filter((q) => isChoiceCorrect(q, values[q.id] ?? [])).length;

  return (
    <div>
      <SimulationBanner text={exercise.simulation} />
      <div className="space-y-7">
        {exercise.questions.map((q, i) => (
          <ChoiceQuestionBlock
            key={q.id}
            q={q}
            uid={uid}
            index={exercise.questions.length > 1 ? i + 1 : undefined}
            value={values[q.id] ?? []}
            onChange={(v) => {
              setValues((s) => ({ ...s, [q.id]: v }));
              touch();
            }}
            checked={checked}
            revealed={revealed || solved}
            locked={revealed || solved}
          />
        ))}
      </div>
      <CheckBar
        verdict={verdict}
        revealed={revealed}
        retry={exercise.retry}
        disabled={!answered}
        disabledReason="Réponds à chaque question pour vérifier."
        summary={exercise.questions.length > 1 ? `${correctCount} réponse${correctCount > 1 ? "s" : ""} juste${correctCount > 1 ? "s" : ""} sur ${exercise.questions.length}.` : undefined}
        onCheck={() => check(correctCount === exercise.questions.length, correctCount / exercise.questions.length)}
      />
    </div>
  );
}
