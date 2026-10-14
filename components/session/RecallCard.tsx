"use client";

import { useState } from "react";
import type { Recall } from "@/content/types";
import { GLOSSARY_BY_ID } from "@/content/glossaire";
import { IconCheck } from "@/components/ui/icons";
import { Rich } from "@/components/ui/rich";
import { Term } from "@/components/ui/glossary";

/** Question de rappel : une notion vue un jour précédent. Nouvelle tentative possible. */
export function RecallCard({ recall, uid, onAnswer }: { recall: Recall; uid: string; onAnswer: (correct: boolean) => void }) {
  const [choice, setChoice] = useState("");
  const [result, setResult] = useState<"idle" | "right" | "wrong">("idle");
  const notion = GLOSSARY_BY_ID[recall.notion];

  return (
    <div>
      <p className="mb-3 text-[0.95rem] text-ink-soft">
        Notion vue au jour {recall.fromDay}
        {notion && (
          <>
            {" "}
            : <Term id={notion.id}>{notion.term}</Term>
          </>
        )}
        . Réponds de mémoire, sans relire.
      </p>
      <fieldset>
        <legend className="mb-2 font-semibold">
          <Rich text={recall.prompt} />
        </legend>
        <div className="grid gap-2">
          {recall.options.map((o) => {
            const good = result === "right" && o.id === recall.answer;
            return (
              <label key={o.id} className={`choice-tile ${good ? "!border-green !bg-green-tint" : ""}`}>
                <input
                  type="radio"
                  name={`${uid}-recall`}
                  checked={choice === o.id}
                  disabled={result === "right"}
                  onChange={() => {
                    setChoice(o.id);
                    if (result === "wrong") setResult("idle");
                  }}
                />
                <span className="flex-1">
                  <Rich text={o.text} />
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
      {result !== "right" && (
        <button
          type="button"
          className="btn btn-secondary mt-4"
          disabled={!choice}
          onClick={() => {
            const ok = choice === recall.answer;
            setResult(ok ? "right" : "wrong");
            onAnswer(ok);
          }}
        >
          {result === "wrong" ? "Vérifier à nouveau" : "Vérifier"}
        </button>
      )}
      <div aria-live="polite">
        {result === "right" && (
          <div className="reveal mt-4 flex items-start gap-3 rounded-xl bg-green-tint px-4 py-3">
            <IconCheck size={20} className="mt-0.5 flex-none text-green-strong" />
            <p>
              <strong className="font-semibold text-green-strong">C'est juste. </strong>
              <Rich text={recall.explanation} />
            </p>
          </div>
        )}
        {result === "wrong" && (
          <div className="reveal mt-4 rounded-xl bg-amber-tint px-4 py-3">
            <p>
              <strong className="font-semibold text-amber">Pas tout à fait. </strong>
              Repense à la définition{notion ? <> de « {notion.term} »</> : null} : {notion ? <Rich text={notion.definition} /> : null} Choisis une autre réponse et vérifie à nouveau.
            </p>
            <p className="mt-1 text-sm text-ink-soft">Cette notion sera proposée dans ta révision.</p>
          </div>
        )}
      </div>
    </div>
  );
}
