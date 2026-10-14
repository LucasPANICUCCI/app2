"use client";

import Link from "next/link";
import { useCallback, useState, type ReactNode } from "react";
import type { Session } from "@/content/types";
import { EXERCISE_LABEL, KIND_LABEL } from "@/content/labels";
import { progressActions, sessionStatus, useProgress } from "@/lib/progress";
import { ExerciseRunner } from "@/components/exercises/ExerciseRunner";
import { IconBulb, IconCheck, IconChevronLeft, IconChevronRight, IconClock, IconLoop } from "@/components/ui/icons";
import { Rich, RichParas } from "@/components/ui/rich";
import { StatusBadge } from "@/components/ui/status";
import { RecallCard } from "./RecallCard";
import { NotesPanel } from "./NotesPanel";

interface NavMeta {
  id: string;
  day: number;
  title: string;
}

function Section({ n, id, title, children }: { n: number; id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <div className="mb-4 flex items-baseline gap-3">
        <span aria-hidden className="font-serif text-2xl font-semibold text-sky">
          {n}
        </span>
        <h2 id={id} className="text-2xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export function SessionView({ session, weekTitle, prev, next }: { session: Session; weekTitle: string; prev?: NavMeta; next?: NavMeta }) {
  const { state, hydrated } = useProgress();
  const record = state.sessions[session.id];
  const status = sessionStatus(state, session.id);
  const [hints, setHints] = useState(0);
  const [attemptsHere, setAttemptsHere] = useState(0);
  const [solvedHere, setSolvedHere] = useState(false);
  const [correctionShown, setCorrectionShown] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const [justFinished, setJustFinished] = useState(false);

  const attempted = attemptsHere > 0 || (record?.attempts ?? 0) > 0;
  const canSeeCorrection = attempted;
  const done = Boolean(record?.completedAt);
  let sectionNumber = 0;

  const onCheck = useCallback(
    (correct: boolean, score?: number) => {
      progressActions.recordAttempt(session.id, correct, score);
      setAttemptsHere((n) => n + 1);
      if (correct) {
        setSolvedHere(true);
        setCorrectionShown(true);
      }
    },
    [session.id],
  );

  const showHint = (level: number) => {
    setHints(level);
    progressActions.useHint(session.id, level);
  };

  const restart = () => {
    setRunKey((k) => k + 1);
    setAttemptsHere(0);
    setSolvedHere(false);
    setCorrectionShown(false);
    setHints(0);
  };

  const finish = () => {
    progressActions.complete(session.id);
    setJustFinished(true);
  };

  const weekEnd = session.day % 7 === 0;

  return (
    <article className="mx-auto max-w-3xl px-4 pt-6 pb-16 sm:px-6 sm:pt-10">
      <nav aria-label="Fil d'Ariane" className="mb-5 text-[0.95rem]">
        <Link href={`/programme#semaine-${session.week}`} className="font-semibold text-deep underline-offset-4 hover:underline">
          Semaine {session.week} : {weekTitle}
        </Link>
      </nav>

      <header className="mb-8">
        <p className="mb-2 text-[0.95rem] font-semibold text-ink-soft">
          Jour {session.day} sur 42{session.kind !== "apprentissage" && <span className="ml-2 rounded-full bg-deep-tint px-2.5 py-0.5 text-deep">{KIND_LABEL[session.kind]}</span>}
        </p>
        <h1 className="text-[2rem] leading-tight sm:text-[2.5rem]">{session.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-[0.95rem] text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <IconClock size={18} /> Environ {session.duration} minutes
          </span>
          {hydrated && <StatusBadge status={status} kind={session.kind} />}
        </div>
        <div className="mt-6 rounded-2xl border-l-4 border-green bg-surface px-5 py-4 shadow-[0_1px_0_var(--color-line)]">
          <p className="text-[1.08rem]">
            <span className="font-semibold">À la fin, tu sauras </span>
            <Rich text={session.objective} />
          </p>
        </div>
      </header>

      <div className="space-y-14">
        <Section n={++sectionNumber} id="comprendre" title="Comprendre">
          <RichParas paras={session.learn.paragraphs} className="text-[1.06rem] leading-[1.7]" />
          <aside className="mt-6 rounded-2xl bg-deep-tint px-5 py-4">
            <h3 className="mb-1.5 font-sans text-[1.02rem] font-bold text-deep">Dans la vie de tous les jours : {session.learn.example.title}</h3>
            <RichParas paras={session.learn.example.paragraphs} />
          </aside>
          {session.learn.callout && (
            <aside className="mt-4 rounded-2xl border-[1.5px] border-amber/40 bg-amber-tint px-5 py-4">
              <h3 className="mb-1 font-sans text-[1.02rem] font-bold text-amber">{session.learn.callout.title}</h3>
              <p>
                <Rich text={session.learn.callout.text} />
              </p>
            </aside>
          )}
        </Section>

        <Section n={++sectionNumber} id="pratiquer" title="Pratiquer">
          <div className="card p-4 sm:p-6">
            <p className="mb-1 text-sm font-semibold text-ink-soft">{EXERCISE_LABEL[session.exercise.type]}</p>
            <p className="mb-5 text-[1.05rem] font-semibold">
              <Rich text={session.exercise.instructions} />
            </p>
            <ExerciseRunner key={runKey} exercise={session.exercise} uid={session.id} revealed={correctionShown} onCheck={onCheck} />
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex flex-wrap gap-2">
              {hints < 2 && !solvedHere && !correctionShown && (
                <button type="button" className="btn btn-secondary" onClick={() => showHint(hints + 1)}>
                  <IconBulb size={18} />
                  {hints === 0 ? "Afficher un indice" : "Afficher le second indice"}
                </button>
              )}
              {canSeeCorrection && !correctionShown && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setCorrectionShown(true);
                    progressActions.viewCorrection(session.id);
                  }}
                >
                  Voir la correction
                </button>
              )}
              {(correctionShown || solvedHere) && (
                <button type="button" className="btn btn-quiet" onClick={restart}>
                  <IconLoop size={18} />
                  Refaire l'exercice
                </button>
              )}
            </div>
            {!canSeeCorrection && <p className="text-sm text-ink-soft">La correction s'ouvre après une première tentative.</p>}
            {hints > 0 && !correctionShown && (
              <ol className="space-y-2" aria-live="polite">
                {session.hints.slice(0, hints).map((h, i) => (
                  <li key={i} className="reveal flex items-start gap-3 rounded-xl border border-line bg-surface px-4 py-3">
                    <IconBulb size={20} className="mt-0.5 flex-none text-sky" />
                    <p>
                      <span className="font-semibold">Indice {i + 1}. </span>
                      <Rich text={h} />
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </div>

          {correctionShown && (
            <div className="reveal mt-6 rounded-2xl border border-green/30 bg-surface p-5">
              <h3 className="mb-2 text-xl">Correction expliquée</h3>
              <RichParas paras={session.correction} />
            </div>
          )}
        </Section>

        {session.recall && (
          <Section n={++sectionNumber} id="rappel" title="Se rappeler">
            <div className="card p-4 sm:p-6">
              <RecallCard recall={session.recall} uid={session.id} onAnswer={(ok) => progressActions.recordRecall(session.id, ok)} />
            </div>
          </Section>
        )}

        <Section n={++sectionNumber} id="retenir" title="Retenir">
          <ul className="space-y-3">
            {session.summary.map((s, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl bg-surface px-4 py-3 shadow-[0_1px_0_var(--color-line)]">
                <IconCheck size={20} className="mt-0.5 flex-none text-green" />
                <span>
                  <Rich text={s} />
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section n={++sectionNumber} id="noter" title="Noter pour moi">
          <NotesPanel sessionId={session.id} />
        </Section>

        <section aria-label="Fin de séance" className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
          {hydrated && (done || justFinished) ? (
            <div aria-live="polite">
              <p className="flex items-center gap-2 text-lg font-semibold text-green-strong">
                <IconCheck size={22} />
                Séance terminée.
              </p>
              <p className="mt-1 text-ink-soft">
                {status === "a_revoir"
                  ? "Elle apparaît comme « À revoir » dans ton programme : tu pourras y revenir quand tu veux."
                  : "Bravo pour la régularité. Tu peux revenir sur cette séance à tout moment."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {weekEnd && (
                  <Link href={session.day === 42 ? "/bilan/final" : `/bilan/semaine/${session.week}`} className="btn btn-success">
                    {session.day === 42 ? "Voir mon bilan final" : `Voir le bilan de la semaine ${session.week}`}
                  </Link>
                )}
                {next && (
                  <Link href={`/seance/${next.id}`} className={`btn ${weekEnd ? "btn-secondary" : "btn-primary"}`}>
                    Passer au jour {next.day}
                  </Link>
                )}
                <Link href="/" className="btn btn-quiet">
                  Retour à l'accueil
                </Link>
              </div>
              <label className="mt-4 flex items-center gap-2.5 text-[0.95rem]">
                <input type="checkbox" className="h-[1.1rem] w-[1.1rem] accent-deep" checked={record?.flagged ?? false} onChange={(e) => progressActions.setFlag(session.id, e.target.checked)} />
                Je veux revoir cette séance
              </label>
            </div>
          ) : (
            <div>
              <h2 className="text-xl">Terminer la séance</h2>
              <p className="mt-1 text-ink-soft">Ta progression avance quand tu termines une séance, quel que soit le jour. Rien n'est perdu si tu fais une pause.</p>
              <label className="mt-4 flex items-center gap-2.5">
                <input
                  type="checkbox"
                  className="h-[1.1rem] w-[1.1rem] accent-deep"
                  checked={record?.flagged ?? false}
                  disabled={!hydrated}
                  onChange={(e) => progressActions.setFlag(session.id, e.target.checked)}
                />
                Je veux revoir cette séance plus tard
              </label>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button type="button" className="btn btn-success" disabled={!hydrated || !attempted} onClick={finish}>
                  <IconCheck size={18} />
                  Terminer la séance
                </button>
                {!attempted && <span className="text-sm text-ink-soft">Fais au moins une tentative de l'exercice pour terminer.</span>}
              </div>
            </div>
          )}
        </section>
      </div>

      <nav aria-label="Séances voisines" className="mt-10 grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link href={`/seance/${prev.id}`} className="card flex items-center gap-3 p-4 hover:border-line-strong">
            <IconChevronLeft size={20} className="flex-none text-deep" />
            <span>
              <span className="block text-sm text-ink-soft">Jour {prev.day}</span>
              <span className="font-semibold">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/seance/${next.id}`} className="card flex items-center justify-end gap-3 p-4 text-right hover:border-line-strong">
            <span>
              <span className="block text-sm text-ink-soft">Jour {next.day}</span>
              <span className="font-semibold">{next.title}</span>
            </span>
            <IconChevronRight size={20} className="flex-none text-deep" />
          </Link>
        )}
      </nav>
    </article>
  );
}
