"use client";

import { useState } from "react";
import type { InvestigationExercise } from "@/content/types";
import { IconCheck, IconChevronDown } from "@/components/ui/icons";
import { RichParas } from "@/components/ui/rich";
import { ChoiceQuestionBlock, isChoiceCorrect } from "./ChoiceQuestion";
import { CheckBar, SimulationBanner, type ExerciseProps } from "./shared";
import { useCheck } from "./useCheck";

const KIND_LABEL = { text: "Note", log: "Extrait de journal", email: "Message" } as const;

export function InvestigationEx({ exercise, uid, revealed, onCheck }: ExerciseProps<InvestigationExercise>) {
  const [opened, setOpened] = useState<Set<string>>(new Set());
  const [values, setValues] = useState<Record<string, string[]>>({});
  const { verdict, checked, check, touch, solved } = useCheck(onCheck);
  const showSolution = revealed || solved;
  const correct = exercise.questions.filter((q) => isChoiceCorrect(q, values[q.id] ?? [])).length;
  const complete = exercise.questions.every((q) => (values[q.id] ?? []).length);

  return (
    <div>
      <SimulationBanner text={exercise.simulation} />
      <div className="mb-5 rounded-2xl border border-deep/20 bg-deep-tint p-4">
        <h4 className="mb-1 font-sans font-bold text-deep">Le dossier</h4>
        <RichParas paras={exercise.brief} />
      </div>

      <div className="mb-2 flex items-center justify-between gap-2">
        <h4 className="font-sans font-bold">Les indices</h4>
        <span className="text-sm text-ink-soft">
          {opened.size} consulté{opened.size > 1 ? "s" : ""} sur {exercise.clues.length}
        </span>
      </div>
      <div className="space-y-2.5">
        {exercise.clues.map((c, i) => (
          <details
            key={c.id}
            className="group rounded-xl border border-line bg-surface open:border-line-strong"
            onToggle={(e) => {
              if ((e.target as HTMLDetailsElement).open) setOpened((s) => new Set(s).add(c.id));
            }}
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-3">
              <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-sunken text-sm font-bold text-deep">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{c.title}</span>
                <span className="block text-sm text-ink-soft">
                  {KIND_LABEL[c.kind]}, source : {c.source}
                </span>
              </span>
              {opened.has(c.id) && <IconCheck size={16} className="flex-none text-green" aria-label="consulté" />}
              <IconChevronDown size={18} className="flex-none text-ink-soft transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-4">
              {c.kind === "log" ? (
                <pre className="mono-block text-[0.84rem] break-all sm:break-normal">{c.content}</pre>
              ) : (
                <div className={`whitespace-pre-wrap rounded-lg p-3 text-[0.97rem] ${c.kind === "email" ? "border border-line bg-paper" : "bg-sunken"}`}>{c.content}</div>
              )}
            </div>
          </details>
        ))}
      </div>

      <h4 className="mt-7 mb-3 font-sans font-bold">Tes conclusions</h4>
      <div className="space-y-7">
        {exercise.questions.map((q, i) => (
          <ChoiceQuestionBlock
            key={q.id}
            q={q}
            uid={uid}
            index={i + 1}
            value={values[q.id] ?? []}
            onChange={(v) => {
              setValues((s) => ({ ...s, [q.id]: v }));
              touch();
            }}
            checked={checked}
            revealed={showSolution}
            locked={showSolution}
          />
        ))}
      </div>
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
