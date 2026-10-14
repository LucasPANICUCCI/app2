"use client";

import { useMemo, useState } from "react";
import type { MessageExercise, MessageFlag, MessagePart } from "@/content/types";
import { IconCheck, IconEye, IconFlag } from "@/components/ui/icons";
import { Rich } from "@/components/ui/rich";
import { CheckBar, ExplanationNote, SimulationBanner, type ExerciseProps } from "./shared";
import { useCheck } from "./useCheck";

const CHANNEL_LABEL = { email: "E-mail", sms: "SMS", messagerie: "Messagerie" } as const;

export function MessageEx({ exercise, uid, revealed, onCheck }: ExerciseProps<MessageExercise>) {
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [inspected, setInspected] = useState<Set<string>>(new Set());
  const [verdictChoice, setVerdictChoice] = useState<string>("");
  const { verdict, checked, check, touch, solved } = useCheck(onCheck);
  const showSolution = revealed || solved;

  const allFlags = useMemo(() => {
    const list: MessageFlag[] = [];
    const visit = (p: MessagePart) => {
      if (typeof p !== "string") list.push(p);
    };
    exercise.fields.forEach((f) => f.value.forEach(visit));
    exercise.body.forEach((para) => para.forEach(visit));
    if (exercise.button) list.push(exercise.button);
    return list;
  }, [exercise]);

  const suspicious = allFlags.filter((f) => f.suspicious);
  const found = suspicious.filter((f) => flagged.has(f.id)).length;
  const falseAlarms = allFlags.filter((f) => !f.suspicious && flagged.has(f.id)).length;

  const toggle = (id: string) => {
    if (showSolution) return;
    setFlagged((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
    touch();
  };

  const renderFlag = (f: MessageFlag, asButton = false) => {
    const isFlagged = flagged.has(f.id);
    const solutionTone = showSolution ? (f.suspicious ? "bg-amber-tint ring-2 ring-amber/60" : "") : "";
    const stateTone = !showSolution && isFlagged ? "bg-amber-tint ring-2 ring-amber" : "";
    const index = suspicious.findIndex((s) => s.id === f.id);
    return (
      <span key={f.id} className="inline">
        {(() => {
          const content = (
            <>
          {isFlagged && !showSolution && <IconFlag size={14} className="mr-1 inline align-[-2px] text-amber" />}
          {showSolution && f.suspicious && (
            <span className="mr-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-amber px-1 align-[1px] text-xs font-bold text-white">
              {index + 1}
            </span>
          )}
          {f.text}
          <span className="sr-only">{isFlagged ? " (signalé comme suspect)" : ""}</span>
            </>
          );
          const common = {
            "aria-pressed": isFlagged,
            "aria-disabled": showSolution || undefined,
            onClick: () => toggle(f.id),
          };
          // Un vrai <button> ne peut pas s'afficher « en ligne » : pour les passages de texte,
          // on utilise un élément en ligne doté du rôle et du comportement clavier d'un bouton.
          return asButton ? (
            <button type="button" {...common} className={`my-1 inline-flex rounded-lg bg-deep px-4 py-2 text-left font-semibold text-white ${stateTone} ${solutionTone}`}>
              {content}
            </button>
          ) : (
            <span
              role="button"
              tabIndex={0}
              {...common}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(f.id);
                }
              }}
              className={`cursor-pointer rounded-md bg-deep-tint/45 px-1 py-0.5 leading-[1.9] underline decoration-line-strong decoration-dotted decoration-2 underline-offset-4 [box-decoration-break:clone] hover:bg-deep-tint focus-visible:outline-3 focus-visible:outline-focus ${stateTone} ${solutionTone}`}
            >
              {content}
            </span>
          );
        })()}
        {f.link && (
          <button
            type="button"
            className="ml-1 inline-flex items-center gap-1 rounded-md border border-line-strong bg-surface px-1.5 py-0.5 align-middle text-xs font-semibold text-deep hover:bg-deep-tint"
            aria-expanded={inspected.has(f.id)}
            aria-controls={`${uid}-link-${f.id}`}
            onClick={() => setInspected((s) => new Set(s).add(f.id))}
          >
            <IconEye size={13} />
            Inspecter le lien
          </button>
        )}
        {f.link && inspected.has(f.id) && (
          <span id={`${uid}-link-${f.id}`} className="mt-1 block rounded-md bg-console px-2.5 py-1.5 font-mono text-[0.85rem] break-all text-console-ink">
            Destination réelle : {f.link}
          </span>
        )}
      </span>
    );
  };

  const renderParts = (parts: MessagePart[]) => parts.map((p, i) => (typeof p === "string" ? <span key={i}>{p}</span> : renderFlag(p)));

  return (
    <div>
      <SimulationBanner text={exercise.simulation} />
      <p className="mb-3 text-[0.95rem] text-ink-soft">
        Appuie sur un passage souligné pour le signaler comme suspect, appuie à nouveau pour annuler. « Inspecter le lien » simule le survol d'un lien avec la souris.
      </p>

      <article aria-label={`${CHANNEL_LABEL[exercise.channel]} fictif`} className="overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-sm">
        <div className="flex items-center justify-between border-b border-line bg-paper px-4 py-2 text-sm text-ink-soft">
          <span className="font-semibold">{CHANNEL_LABEL[exercise.channel]} reçu</span>
          <span>Message fictif</span>
        </div>
        <dl className="space-y-1 border-b border-line px-4 py-3 text-[0.97rem]">
          {exercise.fields.map((f) => (
            <div key={f.label} className="flex gap-2">
              <dt className="w-14 flex-none text-ink-soft">{f.label}</dt>
              <dd className="min-w-0 break-words">{renderParts(f.value)}</dd>
            </div>
          ))}
        </dl>
        <div className="space-y-3 px-4 py-4 leading-relaxed">
          {exercise.body.map((para, i) => (
            <p key={i}>{renderParts(para)}</p>
          ))}
          {exercise.button && <div>{renderFlag(exercise.button, true)}</div>}
        </div>
      </article>

      <fieldset className="mt-6">
        <legend className="mb-2 font-semibold">
          <Rich text={exercise.verdict.prompt} />
        </legend>
        <div className="grid gap-2">
          {exercise.verdict.options.map((o) => (
            <label key={o.id} className={`choice-tile ${showSolution && o.id === exercise.verdict.answer ? "!border-green !bg-green-tint" : ""}`}>
              <input
                type="radio"
                name={`${uid}-verdict`}
                checked={verdictChoice === o.id}
                disabled={showSolution}
                onChange={() => {
                  setVerdictChoice(o.id);
                  touch();
                }}
              />
              <span className="flex-1">
                <Rich text={o.text} />
              </span>
              {showSolution && o.id === exercise.verdict.answer && (
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-strong">
                  <IconCheck size={16} /> Bonne réponse
                </span>
              )}
            </label>
          ))}
        </div>
        {showSolution && (
          <ExplanationNote>
            <Rich text={exercise.verdict.explanation} />
          </ExplanationNote>
        )}
      </fieldset>

      <CheckBar
        verdict={verdict}
        revealed={revealed}
        retry={exercise.retry}
        disabled={!verdictChoice}
        disabledReason="Choisis une réponse à la dernière question pour vérifier."
        summary={
          checked || verdict === "right" ? (
            <span>
              {suspicious.length > 0
                ? `${found} élément${found > 1 ? "s" : ""} suspect${found > 1 ? "s" : ""} repéré${found > 1 ? "s" : ""} sur ${suspicious.length}`
                : falseAlarms > 0
                  ? "Des éléments ont été signalés"
                  : "Aucun élément signalé"}
              {falseAlarms > 0 ? `, ${falseAlarms} signalé${falseAlarms > 1 ? "s" : ""} sans raison suffisante` : ""}
              {verdictChoice !== exercise.verdict.answer ? ", et la dernière question est à revoir" : ""}.
            </span>
          ) : undefined
        }
        onCheck={() => {
          const ok = found === suspicious.length && falseAlarms === 0 && verdictChoice === exercise.verdict.answer;
          check(ok, suspicious.length ? (found - falseAlarms * 0.5) / suspicious.length : falseAlarms ? 0.5 : 1);
        }}
      />

      {showSolution && (
        <div className="reveal mt-6 space-y-4">
          {suspicious.length > 0 && (
          <div>
            <h4 className="mb-2 font-sans font-bold">Les éléments suspects</h4>
            <ol className="space-y-2">
              {suspicious.map((f, i) => (
                <li key={f.id} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 min-w-6 flex-none items-center justify-center rounded-full bg-amber text-sm font-bold text-white">{i + 1}</span>
                  <span>
                    <strong className="font-semibold">« {f.text} »</strong> : <Rich text={f.why} />
                    {f.link && <span className="mt-0.5 block font-mono text-sm break-all text-ink-soft">Destination réelle : {f.link}</span>}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          )}
          {allFlags.some((f) => !f.suspicious) && (
            <div>
              <h4 className="mb-2 font-sans font-bold">{suspicious.length ? "Ce qui n'est pas suspect en soi" : "Pourquoi ces éléments sont rassurants"}</h4>
              <ul className="space-y-2">
                {allFlags
                  .filter((f) => !f.suspicious)
                  .map((f) => (
                    <li key={f.id} className="border-l-4 border-line-strong pl-3">
                      <strong className="font-semibold">« {f.text} »</strong> : <Rich text={f.why} />
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
