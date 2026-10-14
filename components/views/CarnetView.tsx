"use client";

import Link from "next/link";
import { useState } from "react";
import type { SessionMeta } from "@/content/types";
import { useProgress } from "@/lib/progress";
import { IconDownload } from "@/components/ui/icons";
import { plainText } from "@/components/ui/rich";

export function CarnetView({ metas, promptLabels }: { metas: SessionMeta[]; promptLabels: Record<string, Record<string, string>> }) {
  const { state, hydrated } = useProgress();
  const [onlyReview, setOnlyReview] = useState(false);

  if (!hydrated) return <div className="mx-auto max-w-3xl px-4 py-12 text-ink-soft sm:px-6">Chargement de ton carnet…</div>;

  const entries = metas
    .map((m) => ({ meta: m, note: state.notes[m.id], reflection: state.reflections[m.id] }))
    .filter((e) => {
      const hasReflection = e.reflection && Object.values(e.reflection).some((v) => v.trim());
      if (onlyReview) return Boolean(e.note?.review.trim());
      return Boolean(e.note || hasReflection);
    });

  const download = () => {
    const lines: string[] = ["# Mon carnet de cybersécurité", ""];
    for (const e of entries) {
      lines.push(`## Jour ${e.meta.day} : ${e.meta.title}`, "");
      if (e.note?.understood.trim()) lines.push("Ce que j'ai compris :", e.note.understood.trim(), "");
      if (e.note?.review.trim()) lines.push("Ce que je veux revoir :", e.note.review.trim(), "");
      if (e.reflection)
        for (const [k, v] of Object.entries(e.reflection))
          if (v.trim()) lines.push(`${plainText(promptLabels[e.meta.id]?.[k] ?? "Ma réponse")} :`, v.trim(), "");
    }
    const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "carnet-cybersecurite.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12">
      <h1 className="text-[2.1rem] sm:text-[2.6rem]">Mon carnet</h1>
      <p className="mt-2 text-[1.08rem] text-ink-soft">Tes notes de fin de séance et tes réponses rédigées, dans l'ordre du programme.</p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2.5">
          <input type="checkbox" className="h-[1.1rem] w-[1.1rem] accent-deep" checked={onlyReview} onChange={(e) => setOnlyReview(e.target.checked)} />
          Afficher seulement « Ce que je veux revoir »
        </label>
        <button type="button" className="btn btn-secondary" onClick={download} disabled={entries.length === 0}>
          <IconDownload size={18} />
          Télécharger mon carnet
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="card mt-6 p-6">
          <p className="font-semibold">{onlyReview ? "Aucun point à revoir noté pour l'instant." : "Ton carnet est encore vide."}</p>
          <p className="mt-1 text-ink-soft">À la fin de chaque séance, la zone « Noter pour moi » t'invite à écrire ce que tu as compris et ce que tu veux revoir.</p>
          <Link href="/" className="btn btn-primary mt-4">
            Aller à ma séance du jour
          </Link>
        </div>
      ) : (
        <ol className="mt-6 space-y-4">
          {entries.map(({ meta, note, reflection }) => (
            <li key={meta.id} className="card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl">
                  <span className="mr-2 font-sans text-sm font-semibold text-ink-soft">Jour {meta.day}</span>
                  {meta.title}
                </h2>
                <Link href={`/seance/${meta.id}#noter`} className="text-sm font-semibold text-deep underline underline-offset-4">
                  Modifier
                </Link>
              </div>
              <dl className="mt-3 space-y-3">
                {!onlyReview && note?.understood.trim() && (
                  <div>
                    <dt className="text-sm font-semibold text-green-strong">Ce que j'ai compris</dt>
                    <dd className="whitespace-pre-wrap">{note.understood}</dd>
                  </div>
                )}
                {note?.review.trim() && (
                  <div>
                    <dt className="text-sm font-semibold text-amber">Ce que je veux revoir</dt>
                    <dd className="whitespace-pre-wrap">{note.review}</dd>
                  </div>
                )}
                {!onlyReview &&
                  reflection &&
                  Object.entries(reflection)
                    .filter(([, v]) => v.trim())
                    .map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-sm font-semibold text-deep">{plainText(promptLabels[meta.id]?.[k] ?? "Ma réponse rédigée")}</dt>
                        <dd className="whitespace-pre-wrap">{v}</dd>
                      </div>
                    ))}
              </dl>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
