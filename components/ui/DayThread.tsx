"use client";

import Link from "next/link";
import type { SessionMeta } from "@/content/types";
import type { ProgressState } from "@/lib/progress";
import { sessionStatus } from "@/lib/progress";
import { STATUS_LABEL, StatusMark } from "./status";
import { KIND_LABEL } from "@/content/labels";

/** Le fil des 42 jours : une marque par séance, la forme indique le type, le remplissage l'état. */
export function DayThread({ metas, state, currentId }: { metas: SessionMeta[]; state: ProgressState; currentId?: string }) {
  const weeks = [1, 2, 3, 4, 5, 6].map((w) => metas.filter((m) => m.week === w));
  return (
    <div>
      <ol className="grid gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
        {weeks.map((list, wi) => (
          <li key={wi}>
            <p className="mb-1.5 text-sm font-semibold text-ink-soft">Semaine {wi + 1}</p>
            <ol className="relative flex items-center justify-between gap-1">
              <span aria-hidden className="absolute top-1/2 right-3 left-3 h-px -translate-y-1/2 bg-line-strong" />
              {list.map((m) => {
                const st = sessionStatus(state, m.id);
                const current = m.id === currentId;
                return (
                  <li key={m.id} className="relative">
                    <Link
                      href={`/seance/${m.id}`}
                      aria-label={`Jour ${m.day}, ${KIND_LABEL[m.kind].toLowerCase()} : ${m.title}. ${STATUS_LABEL[st]}${current ? ", séance du jour" : ""}`}
                      title={`Jour ${m.day} : ${m.title} (${STATUS_LABEL[st]})`}
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-paper transition-transform hover:scale-110 ${current ? "ring-2 ring-deep ring-offset-2 ring-offset-paper" : ""}`}
                    >
                      <StatusMark status={st} kind={m.kind} size={26} />
                    </Link>
                  </li>
                );
              })}
            </ol>
          </li>
        ))}
      </ol>
      <dl className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
        {(["a_decouvrir", "en_cours", "termine", "a_revoir"] as const).map((s) => (
          <div key={s} className="flex items-center gap-1.5">
            <dt>
              <StatusMark status={s} size={16} />
            </dt>
            <dd>{STATUS_LABEL[s]}</dd>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <dt>
            <StatusMark status="a_decouvrir" kind="defi" size={16} />
          </dt>
          <dd>Défi</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt>
            <StatusMark status="a_decouvrir" kind="revision" size={16} />
          </dt>
          <dd>Révision</dd>
        </div>
      </dl>
    </div>
  );
}
