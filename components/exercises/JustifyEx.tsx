"use client";

import { useEffect, useRef, useState } from "react";
import type { JustifyExercise } from "@/content/types";
import { progressActions, useProgress } from "@/lib/progress";
import { IconCheck } from "@/components/ui/icons";
import { Rich, RichParas } from "@/components/ui/rich";
import { CheckBar, ExplanationNote, SimulationBanner, type ExerciseProps } from "./shared";
import { SelfAssessment } from "./SelfAssessment";
import { useCheck } from "./useCheck";

export function JustifyEx({ exercise, uid, revealed, onCheck }: ExerciseProps<JustifyExercise>) {
  const { state, hydrated } = useProgress();
  const [choice, setChoice] = useState("");
  const [lastWrong, setLastWrong] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [assessed, setAssessed] = useState(false);
  const restored = useRef(false);
  const { verdict, check, touch, solved } = useCheck(onCheck);
  const showSolution = revealed || solved;

  useEffect(() => {
    if (!hydrated || restored.current) return;
    restored.current = true;
    const saved = state.reflections[uid]?.justification;
    if (saved) setText(saved);
  }, [hydrated, state.reflections, uid]);

  const wrongFeedback = lastWrong ? exercise.choices.find((c) => c.id === lastWrong)?.feedback : undefined;

  return (
    <div>
      <SimulationBanner text={exercise.simulation} />
      <RichParas paras={exercise.situation} className="mb-5 rounded-xl border border-line bg-paper p-4" />
      <fieldset>
        <legend className="mb-2 font-semibold">
          <Rich text={exercise.question} />
        </legend>
        <div className="grid gap-2">
          {exercise.choices.map((c) => {
            const good = showSolution && c.id === exercise.answer;
            return (
              <label key={c.id} className={`choice-tile ${good ? "!border-green !bg-green-tint" : ""}`}>
                <input
                  type="radio"
                  name={`${uid}-choice`}
                  checked={choice === c.id}
                  disabled={showSolution}
                  onChange={() => {
                    setChoice(c.id);
                    touch();
                  }}
                />
                <span className="flex-1">
                  <Rich text={c.text} />
                </span>
                {good && (
                  <span className="inline-flex flex-none items-center gap-1 text-sm font-semibold text-green-strong">
                    <IconCheck size={16} /> Choix recommandé
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-5">
        <label htmlFor={`${uid}-justif`} className="mb-1.5 block font-semibold">
          <Rich text={exercise.justificationPrompt} />
        </label>
        <textarea
          id={`${uid}-justif`}
          className="field min-h-28 resize-y"
          placeholder="Explique ton choix en une ou deux phrases."
          value={text}
          disabled={assessed}
          onChange={(e) => {
            setText(e.target.value);
            progressActions.saveReflection(uid, { justification: e.target.value });
          }}
        />
      </div>

      {verdict === "wrong" && wrongFeedback && !showSolution && (
        <ExplanationNote>
          <strong className="font-semibold">À propos de ce choix : </strong>
          <Rich text={wrongFeedback} />
        </ExplanationNote>
      )}

      <CheckBar
        verdict={verdict}
        revealed={revealed}
        retry={exercise.retry}
        disabled={!choice || text.trim().length < 15}
        disabledReason="Choisis une option et écris ta justification pour vérifier."
        checkLabel="Vérifier mon choix"
        onCheck={() => {
          const ok = choice === exercise.answer;
          setLastWrong(ok ? null : choice);
          check(ok);
        }}
      />

      {showSolution && (
        <>
          {exercise.choices
            .filter((c) => c.id !== exercise.answer)
            .map((c) => (
              <p key={c.id} className="reveal mt-3 border-l-4 border-line-strong pl-3 text-[0.95rem]">
                <strong className="font-semibold">
                  <Rich text={c.text} />
                </strong>{" "}
                : <Rich text={c.feedback} />
              </p>
            ))}
          <SelfAssessment uid={uid} criteria={exercise.criteria} reference={exercise.reference} done={assessed} onDone={() => setAssessed(true)} />
        </>
      )}
    </div>
  );
}
