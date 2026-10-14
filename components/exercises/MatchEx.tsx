"use client";

import { useMemo, useState } from "react";
import type { MatchExercise } from "@/content/types";
import { seededShuffle } from "@/lib/text";
import { Rich } from "@/components/ui/rich";
import { CheckBar, ItemMark, SimulationBanner, type ExerciseProps } from "./shared";
import { useCheck } from "./useCheck";

export function MatchEx({ exercise, uid, revealed, onCheck }: ExerciseProps<MatchExercise>) {
  const items = useMemo(() => seededShuffle(exercise.items, uid), [exercise.items, uid]);
  const options = useMemo(
    () => (exercise.variant === "associate" ? seededShuffle(exercise.options, uid + "o") : exercise.options),
    [exercise.options, exercise.variant, uid],
  );
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { verdict, checked, check, touch, solved } = useCheck(onCheck);
  const showSolution = revealed || solved;
  const labelOf = (id: string) => exercise.options.find((o) => o.id === id)?.label ?? id;
  const complete = items.every((i) => answers[i.id]);
  const correct = items.filter((i) => answers[i.id] === i.answer).length;
  const categorize = exercise.variant === "categorize";

  return (
    <div>
      <SimulationBanner text={exercise.simulation} />
      {categorize && exercise.options.some((o) => o.description) && (
        <dl className={`mb-5 grid gap-2 ${exercise.options.length === 3 ? "sm:grid-cols-3" : exercise.options.length === 4 ? "grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2"}`}>
          {exercise.options.map((o) => (
            <div key={o.id} className="rounded-xl border border-line bg-paper px-3 py-2">
              <dt className="font-semibold">{o.label}</dt>
              {o.description && <dd className="text-[0.93rem] text-ink-soft">{o.description}</dd>}
            </div>
          ))}
        </dl>
      )}
      <ul className="space-y-3">
        {items.map((item) => {
          const value = answers[item.id] ?? "";
          const ok = value === item.answer;
          return (
            <li key={item.id} className="rounded-xl border border-line bg-surface p-3.5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className={`min-w-0 flex-1 ${item.mono ? "font-mono text-[0.92rem] break-words" : "font-medium"}`} id={`${uid}-${item.id}-label`}>
                  <Rich text={item.text} />
                </p>
                {checked && !showSolution && <ItemMark ok={ok} />}
              </div>
              {categorize ? (
                <div role="radiogroup" aria-labelledby={`${uid}-${item.id}-label`} className="mt-2.5 flex flex-wrap gap-2">
                  {exercise.options.map((o) => {
                    const sel = value === o.id;
                    const good = showSolution && o.id === item.answer;
                    return (
                      <label
                        key={o.id}
                        className={`cursor-pointer rounded-full border-[1.5px] px-3 py-1.5 text-[0.95rem] font-semibold has-[input:focus-visible]:outline-3 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-focus ${
                          good ? "border-green bg-green-tint text-green-strong" : sel ? "border-deep bg-deep text-white" : "border-line-strong bg-surface text-ink"
                        }`}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          name={`${uid}-${item.id}`}
                          checked={sel}
                          disabled={showSolution}
                          onChange={() => {
                            setAnswers((s) => ({ ...s, [item.id]: o.id }));
                            touch();
                          }}
                        />
                        {good && <span className="sr-only">Bonne réponse : </span>}
                        {o.label}
                      </label>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-2.5">
                  <label className="sr-only" htmlFor={`${uid}-${item.id}-select`}>
                    Associer à
                  </label>
                  <select
                    id={`${uid}-${item.id}-select`}
                    className="field cursor-pointer"
                    value={showSolution ? item.answer : value}
                    disabled={showSolution}
                    aria-describedby={`${uid}-${item.id}-label`}
                    onChange={(e) => {
                      setAnswers((s) => ({ ...s, [item.id]: e.target.value }));
                      touch();
                    }}
                  >
                    <option value="">Choisir…</option>
                    {options.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {showSolution && (
                <p className="reveal mt-2 text-[0.95rem]">
                  {!categorize && <strong className="font-semibold text-green-strong">{labelOf(item.answer)}. </strong>}
                  <Rich text={item.why} />
                </p>
              )}
            </li>
          );
        })}
      </ul>
      <CheckBar
        verdict={verdict}
        revealed={revealed}
        retry={exercise.retry}
        disabled={!complete}
        disabledReason="Associe chaque élément pour vérifier."
        summary={`${correct} association${correct > 1 ? "s" : ""} juste${correct > 1 ? "s" : ""} sur ${items.length}.`}
        onCheck={() => check(correct === items.length, correct / items.length)}
      />
    </div>
  );
}
