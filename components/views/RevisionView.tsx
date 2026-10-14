"use client";

import Link from "next/link";
import { useState } from "react";
import type { GlossaryEntry, Recall, SessionMeta } from "@/content/types";
import { difficultNotions, isDone, progressActions, sessionStatus, useProgress, type NotionDifficulty } from "@/lib/progress";
import { IconCheck } from "@/components/ui/icons";
import { Rich } from "@/components/ui/rich";
import { StatusBadge } from "@/components/ui/status";

export interface RevisionQuestion extends Omit<Recall, "fromDay"> {
  source: "rappel" | "definition";
}

function NotionCard({
  entry,
  question,
  sessions,
  metas,
  onResolved,
}: {
  entry: GlossaryEntry;
  question: RevisionQuestion;
  sessions: string[];
  metas: SessionMeta[];
  onResolved?: () => void;
}) {
  const [choice, setChoice] = useState("");
  const [result, setResult] = useState<"idle" | "right" | "wrong">("idle");
  const days = sessions.map((id) => metas.find((m) => m.id === id)).filter(Boolean) as SessionMeta[];

  return (
    <li className="card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl">{entry.term}</h3>
        {days.length > 0 && (
          <p className="text-sm text-ink-soft">
            Rencontrée{" "}
            {days.map((d, i) => (
              <span key={d.id}>
                {i > 0 && (i === days.length - 1 ? " et " : ", ")}
                <Link href={`/seance/${d.id}`} className="font-semibold text-deep underline underline-offset-4">
                  jour {d.day}
                </Link>
              </span>
            ))}
          </p>
        )}
      </div>
      <fieldset className="mt-3">
        <legend className="mb-2 font-semibold">
          <Rich text={question.prompt} />
        </legend>
        <div className="grid gap-2">
          {question.options.map((o) => (
            <label key={o.id} className={`choice-tile ${result === "right" && o.id === question.answer ? "!border-green !bg-green-tint" : ""}`}>
              <input
                type="radio"
                name={`rev-${entry.id}`}
                checked={choice === o.id}
                disabled={result === "right"}
                onChange={() => {
                  setChoice(o.id);
                  if (result === "wrong") setResult("idle");
                }}
              />
              <span>
                <Rich text={o.text} />
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      {result !== "right" && (
        <button
          type="button"
          className="btn btn-secondary mt-3"
          disabled={!choice}
          onClick={() => {
            const ok = choice === question.answer;
            setResult(ok ? "right" : "wrong");
            if (ok) onResolved?.();
          }}
        >
          Vérifier
        </button>
      )}
      <div aria-live="polite">
        {result === "right" && (
          <div className="reveal mt-3 rounded-xl bg-green-tint px-4 py-3">
            <p className="flex items-center gap-2 font-semibold text-green-strong">
              <IconCheck size={18} /> Notion reprise.
            </p>
            <p className="mt-1">
              <Rich text={question.explanation} />
            </p>
          </div>
        )}
        {result === "wrong" && (
          <div className="reveal mt-3 rounded-xl bg-amber-tint px-4 py-3">
            <p>
              <strong className="font-semibold text-amber">Pas encore. </strong>
              Relis la définition : <Rich text={entry.definition} />
            </p>
            {entry.example && <p className="mt-1 text-[0.95rem] text-ink-soft">Exemple : {entry.example}</p>}
            <p className="mt-1 text-[0.95rem]">Puis choisis une autre réponse.</p>
          </div>
        )}
      </div>
    </li>
  );
}

export function RevisionView({
  metas,
  recallNotions,
  questions,
  glossary,
}: {
  metas: SessionMeta[];
  recallNotions: Record<string, string>;
  questions: Record<string, RevisionQuestion>;
  glossary: Record<string, GlossaryEntry>;
}) {
  const { state, hydrated } = useProgress();
  const [freeMode, setFreeMode] = useState(false);
  const [resolvedHere, setResolvedHere] = useState<NotionDifficulty[]>([]);
  const [limit, setLimit] = useState(5);

  if (!hydrated) {
    return <div className="mx-auto max-w-3xl px-4 py-12 text-ink-soft sm:px-6">Chargement de ta progression…</div>;
  }

  const pending = difficultNotions(state, metas, recallNotions).filter((d) => glossary[d.notion] && questions[d.notion]);
  // Les notions reprises pendant cette visite restent affichées (avec leur confirmation) jusqu'au prochain passage.
  const difficult = [...pending, ...resolvedHere.filter((r) => !pending.some((p) => p.notion === r.notion))];
  const toReviewSessions = metas.filter((m) => sessionStatus(state, m.id) === "a_revoir");
  const seenNotions = [...new Set(metas.filter((m) => isDone(state, m.id)).flatMap((m) => m.notions))].filter(
    (n) => glossary[n] && questions[n] && !difficult.some((d) => d.notion === n),
  );
  const freeList = seenNotions.slice(-6);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12">
      <h1 className="text-[2.1rem] sm:text-[2.6rem]">Révision</h1>
      <p className="mt-2 text-[1.08rem] text-ink-soft">
        Les notions qui t'ont posé difficulté : une erreur au premier essai, une correction consultée, un rappel manqué ou une séance que tu as marquée. Une bonne
        réponse ici les retire de la liste.
      </p>

      {toReviewSessions.length > 0 && (
        <section aria-labelledby="seances-a-revoir" className="mt-8">
          <h2 id="seances-a-revoir" className="text-xl">
            Séances marquées « À revoir »
          </h2>
          <ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
            {toReviewSessions.map((m) => (
              <li key={m.id}>
                <Link href={`/seance/${m.id}`} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 hover:bg-paper">
                  <span>
                    <span className="mr-2 text-sm font-semibold text-ink-soft">Jour {m.day}</span>
                    <span className="font-semibold">{m.title}</span>
                  </span>
                  <StatusBadge status="a_revoir" kind={m.kind} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="notions" className="mt-10">
        <h2 id="notions" className="text-xl">
          Notions à reprendre {pending.length > 0 && <span className="text-ink-soft">({pending.length})</span>}
        </h2>
        {difficult.length === 0 ? (
          <div className="card mt-3 p-5">
            <p className="font-semibold">Aucune notion en difficulté pour l'instant.</p>
            <p className="mt-1 text-ink-soft">
              {seenNotions.length
                ? "Tu peux tout de même réviser les dernières notions vues, pour les ancrer."
                : "Termine une première séance : les notions travaillées apparaîtront ici si elles te posent difficulté."}
            </p>
            {seenNotions.length > 0 && !freeMode && (
              <button type="button" className="btn btn-primary mt-4" onClick={() => setFreeMode(true)}>
                Réviser les dernières notions vues
              </button>
            )}
          </div>
        ) : (
          <>
          <p className="mt-1 text-[0.95rem] text-ink-soft">Les plus récentes d'abord, cinq à la fois : inutile de tout reprendre d'un coup.</p>
          <ul className="mt-3 space-y-4">
            {difficult.slice(0, limit).map((d) => (
              <NotionCard
                key={d.notion}
                entry={glossary[d.notion]}
                question={questions[d.notion]}
                sessions={d.sessions}
                metas={metas}
                onResolved={() => {
                  setResolvedHere((r) => [...r, d]);
                  progressActions.resolveNotion(d.notion);
                }}
              />
            ))}
          </ul>
          {difficult.length > limit && (
            <button type="button" className="btn btn-secondary mt-4" onClick={() => setLimit((l) => l + 5)}>
              Afficher d'autres notions ({difficult.length - limit} restantes)
            </button>
          )}
          </>
        )}
        {freeMode && (
          <ul className="mt-4 space-y-4">
            {freeList.map((n) => (
              <NotionCard key={n} entry={glossary[n]} question={questions[n]} sessions={metas.filter((m) => m.notions.includes(n)).map((m) => m.id)} metas={metas} />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
