"use client";

import Link from "next/link";
import type { Competence, SessionMeta, Week } from "@/content/types";
import { sessionStatus, useProgress } from "@/lib/progress";
import { StatusMark } from "@/components/ui/status";
import { describeResult, pct, stats } from "./bilan-utils";

const TONE_CLASS = {
  good: "text-green-strong",
  ok: "text-deep",
  weak: "text-amber",
  none: "text-ink-soft",
} as const;

export function BilanSemaineView({ week, metas, competences, hasNext }: { week: Week; metas: SessionMeta[]; competences: Competence[]; hasNext: boolean }) {
  const { state, hydrated } = useProgress();
  if (!hydrated) return <div className="mx-auto max-w-4xl px-4 py-12 text-ink-soft sm:px-6">Chargement de ton bilan…</div>;

  const s = stats(state, metas);
  const worked = competences.filter((c) => metas.some((m) => m.competences.includes(c.id)));
  const reviewNotes = metas.map((m) => ({ m, n: state.notes[m.id] })).filter((x) => x.n?.review.trim());
  const understood = metas.map((m) => ({ m, n: state.notes[m.id] })).filter((x) => x.n?.understood.trim());

  return (
    <div className="mx-auto max-w-4xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12">
      <Link href="/bilan" className="text-[0.95rem] font-semibold text-deep underline-offset-4 hover:underline">
        Tous les bilans
      </Link>
      <p className="mt-4 text-sm font-semibold text-ink-soft">Bilan de la semaine {week.number}</p>
      <h1 className="text-[2.1rem] sm:text-[2.6rem]">{week.title}</h1>
      <p className="mt-2 max-w-2xl text-[1.08rem] text-ink-soft">Objectif de la semaine : {week.goal}</p>

      {s.attempted === 0 ? (
        <div className="card mt-8 p-6">
          <p className="font-semibold">Aucune séance de cette semaine n'a encore été tentée.</p>
          <p className="mt-1 text-ink-soft">Le bilan se remplit au fil de tes séances : reviens après en avoir fait quelques-unes.</p>
          <Link href={`/seance/${metas[0].id}`} className="btn btn-primary mt-4">
            Commencer le jour {metas[0].day}
          </Link>
        </div>
      ) : (
        <>
          <dl className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { k: "Séances terminées", v: `${s.done} sur 7` },
              { k: "Réussites du premier coup", v: `${s.firstTry} sur ${s.attempted}` },
              { k: "Rappels réussis", v: s.recallTotal ? `${s.recallOk} sur ${s.recallTotal}` : "Aucun" },
              { k: "Indices utilisés", v: String(s.hints) },
            ].map((x) => (
              <div key={x.k} className="card p-4">
                <dt className="text-sm text-ink-soft">{x.k}</dt>
                <dd className="mt-1 font-serif text-2xl font-semibold">{x.v}</dd>
              </div>
            ))}
          </dl>

          <section aria-labelledby="competences" className="mt-10">
            <h2 id="competences" className="text-2xl">
              Compétences travaillées
            </h2>
            <ul className="mt-4 grid gap-3 md:grid-cols-2">
              {worked.map((c) => {
                const ms = metas.filter((m) => m.competences.includes(c.id));
                const st = stats(state, ms);
                return (
                  <li key={c.id} className="card p-4">
                    <h3 className="font-sans text-[1.05rem] font-bold">{c.label}</h3>
                    <p className="text-[0.95rem] text-ink-soft">{c.description}</p>
                    <p className="mt-2 text-[0.95rem]">
                      {st.attempted
                        ? `Pratiquée dans ${st.attempted} séance${st.attempted > 1 ? "s" : ""} sur ${ms.length}, ${pct(st.firstTry, st.attempted)} % de réussite du premier coup.`
                        : `Prévue dans ${ms.length} séance${ms.length > 1 ? "s" : ""}, pas encore pratiquée.`}
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>

          <section aria-labelledby="detail" className="mt-10">
            <h2 id="detail" className="text-2xl">
              Séance par séance
            </h2>
            <ol className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
              {metas.map((m) => {
                const r = describeResult(state.sessions[m.id], m);
                return (
                  <li key={m.id}>
                    <Link href={`/seance/${m.id}`} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 hover:bg-paper">
                      <StatusMark status={sessionStatus(state, m.id)} kind={m.kind} size={22} />
                      <span className="min-w-0 flex-1">
                        <span className="mr-2 text-sm font-semibold text-ink-soft">Jour {m.day}</span>
                        <span className="font-semibold">{m.title}</span>
                      </span>
                      <span className={`text-[0.95rem] font-semibold ${TONE_CLASS[r.tone]}`}>{r.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>

          {(understood.length > 0 || reviewNotes.length > 0) && (
            <section aria-labelledby="notes-semaine" className="mt-10 grid gap-4 md:grid-cols-2">
              <h2 id="notes-semaine" className="text-2xl md:col-span-2">
                Tes mots de la semaine
              </h2>
              <div className="card p-4">
                <h3 className="font-sans font-bold text-green-strong">Ce que tu as compris</h3>
                {understood.length ? (
                  <ul className="mt-2 space-y-2">
                    {understood.map(({ m, n }) => (
                      <li key={m.id} className="text-[0.97rem]">
                        <span className="text-sm text-ink-soft">Jour {m.day}. </span>
                        {n!.understood}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-ink-soft">Rien de noté cette semaine.</p>
                )}
              </div>
              <div className="card p-4">
                <h3 className="font-sans font-bold text-amber">Ce que tu veux revoir</h3>
                {reviewNotes.length ? (
                  <ul className="mt-2 space-y-2">
                    {reviewNotes.map(({ m, n }) => (
                      <li key={m.id} className="text-[0.97rem]">
                        <span className="text-sm text-ink-soft">Jour {m.day}. </span>
                        {n!.review}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-ink-soft">Rien de noté cette semaine.</p>
                )}
              </div>
            </section>
          )}
        </>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/revision" className="btn btn-secondary">
          Réviser les notions difficiles
        </Link>
        {hasNext ? (
          <Link href={`/bilan/semaine/${week.number + 1}`} className="btn btn-quiet">
            Bilan de la semaine {week.number + 1}
          </Link>
        ) : (
          <Link href="/bilan/final" className="btn btn-quiet">
            Bilan final
          </Link>
        )}
      </div>
    </div>
  );
}
