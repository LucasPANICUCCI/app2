"use client";

import Link from "next/link";
import { useState } from "react";
import type { SessionMeta, Week } from "@/content/types";
import { EXERCISE_LABEL, KIND_LABEL } from "@/content/labels";
import { difficultNotions, isDone, nextSession, progressActions, useProgress } from "@/lib/progress";
import { DayThread } from "@/components/ui/DayThread";
import { IconClock } from "@/components/ui/icons";
import { Rich } from "@/components/ui/rich";
import { ProgressBar } from "@/components/ui/status";
import { ConfidenceForm } from "./ConfidenceForm";

export function HomeView({ metas, weeks, recallNotions }: { metas: SessionMeta[]; weeks: Week[]; recallNotions: Record<string, string> }) {
  const { state, hydrated, storageOk } = useProgress();
  const [confidenceOpen, setConfidenceOpen] = useState(false);
  const doneCount = metas.filter((m) => isDone(state, m.id)).length;
  const next = nextSession(state, metas);
  const isNew = Object.keys(state.sessions).length === 0;
  const toReview = hydrated ? difficultNotions(state, metas, recallNotions).length : 0;
  const notesCount = Object.keys(state.notes).length;
  const showConfidence = hydrated && isNew && !state.confidence.start && !state.confidence.startSkipped;
  const allDone = hydrated && !next;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12">
      <div className="max-w-3xl">
        {isNew || !hydrated ? (
          <>
            <h1 className="text-[2.1rem] leading-[1.12] sm:text-[2.9rem]">Comprendre la cybersécurité, quinze minutes par jour.</h1>
            <p className="mt-4 max-w-2xl text-[1.1rem] text-ink-soft">
              Quarante-deux séances courtes, en six semaines, pour comprendre comment fonctionnent Internet et tes comptes, puis mener une petite enquête. Aucune
              connaissance en programmation n'est nécessaire, et chaque terme technique est expliqué.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-[2.1rem] leading-[1.12] sm:text-[2.9rem]">{allDone ? "Programme terminé." : "Te revoilà."}</h1>
            <p className="mt-3 text-[1.1rem] text-ink-soft">
              {doneCount} séance{doneCount > 1 ? "s" : ""} terminée{doneCount > 1 ? "s" : ""} sur 42.{" "}
              {allDone ? "Ton bilan final t'attend." : "Tu reprends là où tu en étais, sans date à rattraper."}
            </p>
          </>
        )}
      </div>

      {allDone ? (
        <section className="mt-8 rounded-[22px] bg-deep p-6 text-white sm:p-8">
          <h2 className="text-2xl text-white sm:text-3xl">Six semaines parcourues</h2>
          <p className="mt-2 max-w-xl text-white/85">Compare tes premiers acquis à tes derniers exercices, et mesure le chemin parcouru depuis le premier jour.</p>
          <Link href="/bilan/final" className="btn mt-6 bg-white text-deep hover:bg-deep-tint">
            Voir mon bilan final
          </Link>
        </section>
      ) : (
        next && (
          <section aria-labelledby="seance-du-jour" className="mt-8 rounded-[22px] bg-deep p-6 text-white shadow-[0_18px_40px_-24px_rgb(14_42_82/0.8)] sm:p-8">
            <p className="text-[0.95rem] font-semibold text-white/75">
              Jour {next.meta.day} sur 42, semaine {next.meta.week}
              {next.meta.kind !== "apprentissage" && <span className="ml-2 rounded-full bg-white/15 px-2.5 py-0.5 text-white">{KIND_LABEL[next.meta.kind]}</span>}
            </p>
            <h2 id="seance-du-jour" className="mt-2 max-w-2xl text-[1.75rem] leading-tight text-white sm:text-[2.2rem]">
              {next.meta.title}
            </h2>
            <p className="mt-3 max-w-2xl text-[1.05rem] text-white/85">
              À la fin, tu sauras <Rich text={next.meta.objective} />
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link href={`/seance/${next.meta.id}`} className="btn bg-white px-6 text-[1.05rem] text-deep hover:bg-deep-tint">
                {next.resume ? "Reprendre ma séance" : "Commencer ma séance"}
              </Link>
              <span className="inline-flex items-center gap-1.5 text-white/80">
                <IconClock size={18} /> Environ {next.meta.duration} minutes, {EXERCISE_LABEL[next.meta.exerciseType].toLowerCase()}
              </span>
            </div>
          </section>
        )
      )}

      {showConfidence && (
        <section aria-labelledby="point-depart" className="card mt-6 p-5 sm:p-7">
          <h2 id="point-depart" className="text-2xl">
            Ton point de départ, en une minute
          </h2>
          <p className="mt-1 max-w-2xl text-ink-soft">
            Six affirmations pour indiquer où tu en es aujourd'hui. Tu répondras aux mêmes à la fin du programme pour mesurer ce qui a changé. Facultatif.
          </p>
          {confidenceOpen ? (
            <div className="mt-5">
              <ConfidenceForm
                id="start"
                submitLabel="Enregistrer mon point de départ"
                onSubmit={(v) => progressActions.setConfidence("start", v)}
                onSkip={() => progressActions.skipStartConfidence()}
              />
            </div>
          ) : (
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className="btn btn-secondary" onClick={() => setConfidenceOpen(true)}>
                Indiquer mon point de départ
              </button>
              <button type="button" className="btn btn-quiet" onClick={() => progressActions.skipStartConfidence()}>
                Passer cette étape
              </button>
            </div>
          )}
        </section>
      )}

      {hydrated && !storageOk && (
        <p role="alert" className="mt-6 rounded-xl border border-amber/40 bg-amber-tint px-4 py-3">
          La sauvegarde locale semble bloquée dans ce navigateur (navigation privée ou réglages de confidentialité). Ta progression sera perdue à la fermeture de
          l'onglet : pense à l'exporter depuis <Link href="/donnees" className="font-semibold underline">Mes données</Link>.
        </p>
      )}

      <section aria-labelledby="fil" className="mt-12">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="fil" className="text-2xl">
            Le fil des 42 jours
          </h2>
          <Link href="/programme" className="font-semibold text-deep underline-offset-4 hover:underline">
            Voir le programme détaillé
          </Link>
        </div>
        <div className="card p-5 sm:p-6">
          <DayThread metas={metas} state={state} currentId={next?.meta.id} />
        </div>
      </section>

      <div className="mt-8 grid items-start gap-5 lg:grid-cols-[1.6fr_1fr]">
        <section aria-labelledby="progression" className="card p-5 sm:p-6">
          <h2 id="progression" className="text-xl">
            Progression
          </h2>
          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-[0.95rem]">
              <span className="font-semibold">Ensemble du programme</span>
              <span className="text-ink-soft">{doneCount} sur 42</span>
            </div>
            <ProgressBar value={doneCount} max={42} label="Progression globale" tone="green" />
          </div>
          <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {weeks.map((w) => {
              const list = metas.filter((m) => m.week === w.number);
              const d = list.filter((m) => isDone(state, m.id)).length;
              return (
                <li key={w.number}>
                  <div className="mb-1 flex justify-between gap-2 text-sm">
                    <Link href={`/programme#semaine-${w.number}`} className="truncate font-semibold hover:text-deep">
                      {w.number}. {w.title}
                    </Link>
                    <span className="flex-none text-ink-soft">
                      {d}/{list.length}
                    </span>
                  </div>
                  <ProgressBar value={d} max={list.length} label={`Semaine ${w.number}`} />
                </li>
              );
            })}
          </ul>
        </section>

        <div className="grid content-start gap-5">
          <Link href="/revision" className="card block p-5 hover:border-line-strong">
            <h2 className="text-xl">Révision</h2>
            <p className="mt-1 text-ink-soft">
              {toReview > 0
                ? `${toReview} notion${toReview > 1 ? "s" : ""} t'${toReview > 1 ? "ont" : "a"} posé difficulté. Quelques minutes suffisent pour les reprendre.`
                : "Les notions qui te posent difficulté apparaîtront ici, prêtes à être reprises."}
            </p>
          </Link>
          <Link href="/carnet" className="card block p-5 hover:border-line-strong">
            <h2 className="text-xl">Carnet</h2>
            <p className="mt-1 text-ink-soft">
              {notesCount > 0 ? `${notesCount} séance${notesCount > 1 ? "s" : ""} annotée${notesCount > 1 ? "s" : ""}.` : "Tes notes personnelles de chaque séance, réunies au même endroit."}
            </p>
          </Link>
          <Link href="/donnees" className="card block p-5 hover:border-line-strong">
            <h2 className="text-xl">Mes données</h2>
            <p className="mt-1 text-ink-soft">Exporter, importer ou réinitialiser ta progression.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
