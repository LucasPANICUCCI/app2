"use client";

import { useRef, useState } from "react";
import type { OrderExercise } from "@/content/types";
import { seededShuffle } from "@/lib/text";
import { IconArrowDown, IconArrowUp } from "@/components/ui/icons";
import { Rich } from "@/components/ui/rich";
import { CheckBar, ItemMark, SimulationBanner, type ExerciseProps } from "./shared";
import { useCheck } from "./useCheck";

export function OrderEx({ exercise, uid, revealed, onCheck }: ExerciseProps<OrderExercise>) {
  const [order, setOrder] = useState(() => seededShuffle(exercise.items.map((i) => i.id), uid));
  const [announce, setAnnounce] = useState("");
  const { verdict, checked, check, touch, solved } = useCheck(onCheck);
  const showSolution = revealed || solved;
  const listRef = useRef<HTMLOListElement>(null);
  const byId = Object.fromEntries(exercise.items.map((i) => [i.id, i]));
  const correctIds = exercise.items.map((i) => i.id);
  const placed = order.filter((id, i) => correctIds[i] === id).length;
  const timeline = exercise.variant === "timeline";

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= order.length) return;
    const next = [...order];
    [next[index], next[target]] = [next[target], next[index]];
    setOrder(next);
    touch();
    setAnnounce(`« ${byId[next[target]].text} » déplacé en position ${target + 1} sur ${next.length}.`);
    requestAnimationFrame(() => {
      const btn = listRef.current?.querySelector<HTMLButtonElement>(`[data-id="${next[target]}"][data-dir="${delta < 0 ? "up" : "down"}"]`);
      if (btn && !btn.disabled) btn.focus();
      else listRef.current?.querySelector<HTMLButtonElement>(`[data-id="${next[target]}"]:not(:disabled)`)?.focus();
    });
  };

  const shown = showSolution ? correctIds : order;

  return (
    <div>
      <SimulationBanner text={exercise.simulation} />
      {!showSolution && (
        <p className="mb-3 text-[0.95rem] text-ink-soft">
          Utilise les boutons Monter et Descendre (ou Tab puis Entrée au clavier) pour placer les éléments {timeline
            ? "du plus ancien (en haut) au plus récent (en bas)"
            : exercise.variant === "rank" && exercise.rankLabels
              ? `du ${exercise.rankLabels.top} (en haut) au ${exercise.rankLabels.bottom} (en bas)`
              : "de la première étape (en haut) à la dernière (en bas)"}.
        </p>
      )}
      {showSolution && <p className="mb-3 font-semibold">{exercise.variant === "rank" ? "Le classement attendu :" : "L'ordre correct :"}</p>}
      <ol ref={listRef} className={`space-y-2.5 ${timeline ? "relative border-l-2 border-line-strong pl-5" : ""}`}>
        {shown.map((id, index) => {
          const item = byId[id];
          const ok = correctIds[index] === id;
          return (
            <li key={id} className={`relative rounded-xl border bg-surface p-3 ${showSolution ? "border-green/40" : "border-line"}`}>
              {timeline && <span aria-hidden className="absolute top-5 -left-[1.69rem] h-3 w-3 rounded-full border-2 border-deep bg-surface" />}
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-deep-tint font-bold text-deep">{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className={item.mono ? "font-mono text-[0.92rem] break-words" : ""}>
                    <Rich text={item.text} />
                  </p>
                  {item.detail && <p className="mt-1 text-sm text-ink-soft">{item.detail}</p>}
                  {showSolution && item.note && (
                    <p className="mt-1.5 text-[0.95rem]">
                      <Rich text={item.note} />
                    </p>
                  )}
                  {checked && !showSolution && (
                    <div className="mt-1.5">
                      <ItemMark ok={ok} labelOk="Bien placé" labelKo="Pas à sa place" />
                    </div>
                  )}
                </div>
                {!showSolution && (
                  <div className="flex flex-none flex-col gap-1 sm:flex-row">
                    <button type="button" data-id={id} data-dir="up" className="btn btn-secondary min-h-10 px-2.5" disabled={index === 0} onClick={() => move(index, -1)}>
                      <IconArrowUp size={18} />
                      <span className="sr-only">Monter « {item.text} »</span>
                    </button>
                    <button
                      type="button"
                      data-id={id}
                      data-dir="down"
                      className="btn btn-secondary min-h-10 px-2.5"
                      disabled={index === order.length - 1}
                      onClick={() => move(index, 1)}
                    >
                      <IconArrowDown size={18} />
                      <span className="sr-only">Descendre « {item.text} »</span>
                    </button>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
      <CheckBar
        verdict={verdict}
        revealed={revealed}
        retry={exercise.retry}
        summary={`${placed} élément${placed > 1 ? "s" : ""} bien placé${placed > 1 ? "s" : ""} sur ${order.length}.`}
        onCheck={() => check(placed === order.length, placed / order.length)}
      />
    </div>
  );
}
