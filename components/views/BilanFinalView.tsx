"use client";

import Link from "next/link";
import { useState } from "react";
import type { Competence, SessionMeta } from "@/content/types";
import { CONFIDENCE_SCALE, CONFIDENCE_STATEMENTS } from "@/content/programme";
import { progressActions, useProgress } from "@/lib/progress";
import { plainText } from "@/components/ui/rich";
import { ConfidenceForm } from "./ConfidenceForm";
import { describeResult, pct, stats, toneValue } from "./bilan-utils";

const TONE_CLASS = { good: "text-green-strong", ok: "text-deep", weak: "text-amber", none: "text-ink-soft" } as const;

export function BilanFinalView({ metas, competences, finalPrompts }: { metas: SessionMeta[]; competences: Competence[]; finalPrompts: Record<string, string> }) {
  const { state, hydrated } = useProgress();
  const [editEnd, setEditEnd] = useState(false);
  const [earlyEnd, setEarlyEnd] = useState(false);
  if (!hydrated) return <div className="mx-auto max-w-4xl px-4 py-12 text-ink-soft sm:px-6">Chargement de ton bilan…</div>;

  const early = metas.filter((m) => m.week <= 2);
  const late = metas.filter((m) => m.week >= 5);
  const sEarly = stats(state, early);
  const sLate = stats(state, late);
  const sAll = stats(state, metas);

  const comparisons = competences.map((c) => {
    const tried = metas.filter((m) => m.competences.includes(c.id) && (state.sessions[m.id]?.attempts ?? 0) > 0);
    const first = tried[0];
    const last = tried.length > 1 ? tried[tried.length - 1] : undefined;
    return { c, first, last };
  });

  const start = state.confidence.start;
  const end = state.confidence.end;
  const label = (v?: number) => CONFIDENCE_SCALE.find((c) => c.value === v)?.label ?? "Non renseigné";
  const firstNote = metas.map((m) => ({ m, n: state.notes[m.id]?.understood?.trim() })).find((x) => x.n);
  const lastNote = [...metas].reverse().map((m) => ({ m, n: state.notes[m.id]?.understood?.trim() })).find((x) => x.n);
  const finalReflection = state.reflections["j42"];

  return (
    <div className="mx-auto max-w-4xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12">
      <Link href="/bilan" className="text-[0.95rem] font-semibold text-deep underline-offset-4 hover:underline">
        Tous les bilans
      </Link>
      <h1 className="mt-4 text-[2.1rem] sm:text-[2.6rem]">Bilan final</h1>
      <p className="mt-2 max-w-2xl text-[1.08rem] text-ink-soft">
        Tes premiers acquis comparés à tes derniers exercices, et l'évolution de ta confiance. Ce bilan se calcule à partir des séances réellement faites.
      </p>
      {sAll.done < 42 && (
        <p className="mt-4 rounded-xl border border-line bg-surface px-4 py-3">
          Tu as terminé {sAll.done} séance{sAll.done > 1 ? "s" : ""} sur 42. Le bilan est déjà consultable et se complétera au fil des séances restantes.
        </p>
      )}

      <section aria-labelledby="avant-apres" className="mt-10">
        <h2 id="avant-apres" className="text-2xl">
          Premières semaines et dernières semaines
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {[
            { title: "Semaines 1 et 2", s: sEarly, n: early.length },
            { title: "Semaines 5 et 6", s: sLate, n: late.length },
          ].map((b) => (
            <div key={b.title} className="card p-5">
              <h3 className="font-sans font-bold">{b.title}</h3>
              <dl className="mt-3 space-y-2">
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-soft">Séances tentées</dt>
                  <dd className="font-semibold">
                    {b.s.attempted} sur {b.n}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-soft">Réussites du premier coup</dt>
                  <dd className="font-semibold">{b.s.attempted ? `${pct(b.s.firstTry, b.s.attempted)} %` : "Pas de donnée"}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink-soft">Rappels réussis</dt>
                  <dd className="font-semibold">{b.s.recallTotal ? `${pct(b.s.recallOk, b.s.recallTotal)} %` : "Pas de donnée"}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[0.95rem] text-ink-soft">
          Les exercices de fin de programme combinent plusieurs notions et sont plus exigeants : un taux stable entre le début et la fin est déjà un vrai progrès.
        </p>
      </section>

      <section aria-labelledby="par-competence" className="mt-10">
        <h2 id="par-competence" className="text-2xl">
          Compétence par compétence
        </h2>
        <p className="mt-1 text-ink-soft">La première fois que tu l'as pratiquée, et la dernière.</p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-surface">
          <table className="w-full min-w-[34rem] text-left text-[0.95rem]">
            <thead className="bg-paper text-ink-soft">
              <tr>
                <th scope="col" className="px-4 py-2.5 font-semibold">
                  Compétence
                </th>
                <th scope="col" className="px-4 py-2.5 font-semibold">
                  Première pratique
                </th>
                <th scope="col" className="px-4 py-2.5 font-semibold">
                  Dernière pratique
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map(({ c, first, last }) => {
                const r1 = first ? describeResult(state.sessions[first.id], first) : null;
                const r2 = last ? describeResult(state.sessions[last.id], last) : null;
                const trend = r1 && r2 ? toneValue(r2.tone) - toneValue(r1.tone) : 0;
                return (
                  <tr key={c.id} className="border-t border-line align-top">
                    <th scope="row" className="px-4 py-3 font-semibold">
                      {c.label}
                      {r1 && r2 && (
                        <span className="mt-0.5 block text-sm font-normal text-ink-soft">
                          {trend > 0 ? "En progrès" : trend < 0 ? "À consolider" : "Stable"}
                        </span>
                      )}
                    </th>
                    <td className="px-4 py-3">
                      {first && r1 ? (
                        <>
                          <span className="block text-sm text-ink-soft">Jour {first.day}</span>
                          <span className={`font-semibold ${TONE_CLASS[r1.tone]}`}>{r1.label}</span>
                        </>
                      ) : (
                        <span className="text-ink-soft">Pas encore pratiquée</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {last && r2 ? (
                        <>
                          <span className="block text-sm text-ink-soft">Jour {last.day}</span>
                          <span className={`font-semibold ${TONE_CLASS[r2.tone]}`}>{r2.label}</span>
                        </>
                      ) : (
                        <span className="text-ink-soft">{first ? "Une seule pratique pour l'instant" : ""}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="confiance" className="mt-10">
        <h2 id="confiance" className="text-2xl">
          Ta confiance, avant et après
        </h2>
        {!end && sAll.done < 42 && !earlyEnd ? (
          <div className="card mt-4 p-5">
            <p>
              À la fin du programme, tu répondras aux mêmes affirmations qu'au premier jour{start ? "" : " (ou pour la première fois, si tu avais passé cette étape)"}, pour mesurer
              l'évolution de ta confiance.
            </p>
            <button type="button" className="btn btn-quiet mt-3" onClick={() => setEarlyEnd(true)}>
              Me situer dès maintenant
            </button>
          </div>
        ) : !end || editEnd ? (
          <div className="card mt-4 p-5">
            <p className="mb-4 text-ink-soft">
              {start ? "Réponds aux mêmes affirmations qu'au premier jour, sans regarder tes réponses de départ." : "Tu n'avais pas indiqué de point de départ ; tu peux tout de même te situer aujourd'hui."}
            </p>
            <ConfidenceForm
              id="end"
              initial={end}
              submitLabel="Enregistrer ma confiance actuelle"
              onSubmit={(v) => {
                progressActions.setConfidence("end", v);
                setEditEnd(false);
              }}
            />
          </div>
        ) : (
          <>
            <ul className="mt-4 space-y-3">
              {CONFIDENCE_STATEMENTS.map((st) => {
                const a = start?.[st.id];
                const b = end[st.id];
                return (
                  <li key={st.id} className="card p-4">
                    <p className="font-semibold">{st.text}</p>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {[
                        { k: "Au départ", v: a },
                        { k: "Aujourd'hui", v: b },
                      ].map((x) => (
                        <div key={x.k}>
                          <div className="flex justify-between text-sm">
                            <span className="text-ink-soft">{x.k}</span>
                            <span className="font-semibold">{label(x.v)}</span>
                          </div>
                          <div className="mt-1 flex gap-1" aria-hidden>
                            {[1, 2, 3, 4].map((i) => (
                              <span key={i} className={`h-2 flex-1 rounded-full ${x.v && i <= x.v ? (x.k === "Au départ" ? "bg-sky" : "bg-green") : "bg-sunken"}`} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
            <button type="button" className="btn btn-quiet mt-3" onClick={() => setEditEnd(true)}>
              Modifier mes réponses d'aujourd'hui
            </button>
          </>
        )}
      </section>

      {(firstNote || lastNote) && (
        <section aria-labelledby="mots" className="mt-10">
          <h2 id="mots" className="text-2xl">
            Tes propres mots
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {firstNote && (
              <figure className="card p-5">
                <figcaption className="text-sm font-semibold text-ink-soft">Ta première note, jour {firstNote.m.day}</figcaption>
                <blockquote className="mt-2 font-serif text-[1.1rem] whitespace-pre-wrap">{firstNote.n}</blockquote>
              </figure>
            )}
            {lastNote && lastNote.m.id !== firstNote?.m.id && (
              <figure className="card p-5">
                <figcaption className="text-sm font-semibold text-ink-soft">Ta dernière note, jour {lastNote.m.day}</figcaption>
                <blockquote className="mt-2 font-serif text-[1.1rem] whitespace-pre-wrap">{lastNote.n}</blockquote>
              </figure>
            )}
          </div>
        </section>
      )}

      {finalReflection && Object.values(finalReflection).some((v) => v.trim()) && (
        <section aria-labelledby="bilan-perso" className="mt-10">
          <h2 id="bilan-perso" className="text-2xl">
            Ton bilan personnel du jour 42
          </h2>
          <dl className="card mt-4 space-y-4 p-5">
            {Object.entries(finalReflection)
              .filter(([, v]) => v.trim())
              .map(([k, v]) => (
                <div key={k}>
                  <dt className="font-semibold">{plainText(finalPrompts[k] ?? "Ma réponse")}</dt>
                  <dd className="mt-1 whitespace-pre-wrap">{v}</dd>
                </div>
              ))}
          </dl>
        </section>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/donnees" className="btn btn-primary">
          Exporter ma progression
        </Link>
        <Link href="/carnet" className="btn btn-secondary">
          Relire mon carnet
        </Link>
      </div>
    </div>
  );
}
