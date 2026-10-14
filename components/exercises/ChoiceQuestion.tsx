"use client";

import type { ChoiceQuestion } from "@/content/types";
import { Rich } from "@/components/ui/rich";
import { IconCheck } from "@/components/ui/icons";
import { ExplanationNote, ItemMark } from "./shared";

export function isChoiceCorrect(q: ChoiceQuestion, value: string[]) {
  return value.length === q.answers.length && q.answers.every((a) => value.includes(a));
}

export function ChoiceQuestionBlock({
  q,
  uid,
  index,
  value,
  onChange,
  checked,
  revealed,
  locked,
}: {
  q: ChoiceQuestion;
  uid: string;
  index?: number;
  value: string[];
  onChange: (v: string[]) => void;
  /** Une vérification a eu lieu et les réponses n'ont pas été modifiées depuis. */
  checked: boolean;
  revealed: boolean;
  locked: boolean;
}) {
  const multiple = q.answers.length > 1;
  const name = `${uid}-${q.id}`;
  const ok = isChoiceCorrect(q, value);
  const showExplanation = revealed || (checked && ok);

  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 w-full">
        <span className="flex flex-wrap items-start justify-between gap-2">
          <span className="font-semibold">
            {index !== undefined && <span className="mr-1.5 text-ink-soft">{index}.</span>}
            <Rich text={q.prompt} />
          </span>
          {checked && !revealed && <ItemMark ok={ok} />}
        </span>
        {multiple && <span className="mt-1 block text-sm text-ink-soft">Plusieurs réponses possibles.</span>}
      </legend>
      {q.context && <pre className="mono-block mb-3">{q.context}</pre>}
      <div className="grid gap-2">
        {q.options.map((o) => {
          const selected = value.includes(o.id);
          const isAnswer = q.answers.includes(o.id);
          return (
            <label key={o.id} className={`choice-tile ${revealed && isAnswer ? "!border-green !bg-green-tint" : ""}`}>
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={o.id}
                checked={selected}
                disabled={locked}
                onChange={(e) => {
                  if (multiple) onChange(e.target.checked ? [...value, o.id] : value.filter((v) => v !== o.id));
                  else onChange([o.id]);
                }}
              />
              <span className="flex-1">
                <Rich text={o.text} />
              </span>
              {revealed && isAnswer && (
                <span className="inline-flex flex-none items-center gap-1 text-sm font-semibold text-green-strong">
                  <IconCheck size={16} />
                  Bonne réponse
                </span>
              )}
            </label>
          );
        })}
      </div>
      {showExplanation && (
        <ExplanationNote>
          <Rich text={q.explanation} />
        </ExplanationNote>
      )}
    </fieldset>
  );
}
