"use client";

import Link from "next/link";
import type { SessionMeta, Week } from "@/content/types";
import { EXERCISE_LABEL, KIND_LABEL } from "@/content/labels";
import { isDone, sessionStatus, useProgress } from "@/lib/progress";
import { ProgressBar, StatusBadge, StatusMark } from "@/components/ui/status";

export function ProgrammeView({ metas, weeks }: { metas: SessionMeta[]; weeks: Week[] }) {
  const { state, hydrated } = useProgress();
  const total = metas.filter((m) => isDone(state, m.id)).length;

  return (
    <div className="mx-auto max-w-4xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12">
      <h1 className="text-[2.1rem] sm:text-[2.6rem]">Le programme</h1>
      <p className="mt-2 max-w-2xl text-[1.08rem] text-ink-soft">
        Six semaines de sept séances : cinq séances d'apprentissage, un défi pratique et une révision légère. Toutes les séances sont accessibles librement, dans
        l'ordre que tu veux.
      </p>
      <div className="mt-6 max-w-md">
        <div className="mb-1.5 flex justify-between text-[0.95rem]">
          <span className="font-semibold">Séances terminées</span>
          <span className="text-ink-soft">{hydrated ? total : 0} sur 42</span>
        </div>
        <ProgressBar value={hydrated ? total : 0} max={42} label="Progression globale" tone="green" />
      </div>

      <div className="mt-10 space-y-12">
        {weeks.map((w) => {
          const list = metas.filter((m) => m.week === w.number);
          const done = list.filter((m) => isDone(state, m.id)).length;
          return (
            <section key={w.number} id={`semaine-${w.number}`} aria-labelledby={`titre-semaine-${w.number}`} className="scroll-mt-24">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-ink-soft">Semaine {w.number}</p>
                  <h2 id={`titre-semaine-${w.number}`} className="text-2xl sm:text-[1.75rem]">
                    {w.title}
                  </h2>
                  <p className="mt-1 max-w-2xl text-ink-soft">{w.goal}</p>
                </div>
                <Link href={`/bilan/semaine/${w.number}`} className="btn btn-secondary">
                  Bilan de la semaine
                </Link>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="max-w-xs flex-1">
                  <ProgressBar value={hydrated ? done : 0} max={7} label={`Semaine ${w.number}`} />
                </div>
                <span className="text-sm text-ink-soft">{hydrated ? done : 0} sur 7</span>
              </div>
              <ol className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
                {list.map((m) => {
                  const st = sessionStatus(state, m.id);
                  return (
                    <li key={m.id}>
                      <Link href={`/seance/${m.id}`} className="flex items-start gap-3.5 px-4 py-3.5 hover:bg-paper sm:items-center">
                        <StatusMark status={hydrated ? st : "a_decouvrir"} kind={m.kind} size={24} />
                        <span className="w-14 flex-none pt-0.5 text-sm font-semibold text-ink-soft sm:pt-0">Jour {m.day}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold">{m.title}</span>
                          <span className="block text-sm text-ink-soft">
                            {m.kind !== "apprentissage" ? `${KIND_LABEL[m.kind]}, ` : ""}
                            {EXERCISE_LABEL[m.exerciseType].toLowerCase()}, {m.duration} min
                          </span>
                          {hydrated && (
                            <span className="mt-1.5 block sm:hidden">
                              <StatusBadge status={st} kind={m.kind} />
                            </span>
                          )}
                        </span>
                        <span className="hidden flex-none sm:block">{hydrated && <StatusBadge status={st} kind={m.kind} />}</span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
    </div>
  );
}
