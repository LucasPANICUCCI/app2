"use client";

import { useState } from "react";
import type { UrlExercise, UrlItem } from "@/content/types";
import { anatomy } from "@/lib/url";
import { Rich } from "@/components/ui/rich";
import { CheckBar, ExplanationNote, ItemMark, SimulationBanner, type ExerciseProps } from "./shared";
import { useCheck } from "./useCheck";

interface Answer {
  domain?: string;
  legit?: "oui" | "non";
}

function isItemCorrect(item: UrlItem, a: Answer | undefined) {
  return a?.domain === item.answer && a?.legit === (item.legit ? "oui" : "non");
}

export function UrlAnatomyView({ url }: { url: string }) {
  const a = anatomy(url);
  if (!a) return null;
  let hostStart = url.indexOf("://") + 3;
  if (a.userinfo) hostStart = url.indexOf("@", hostStart) + 1;
  const domainStart = hostStart + (a.subdomain ? a.subdomain.length + 1 : 0);
  const domainEnd = domainStart + a.domain.length;

  const rows: [string, string, string][] = [
    ["Protocole", a.scheme, a.scheme === "https" ? "Échange chiffré. Ne dit rien de l'honnêteté du site." : "Échange non chiffré."],
    ...(a.userinfo ? ([["Avant le @", a.userinfo, "Ignoré pour la destination : tout ce qui précède @ n'est qu'un identifiant. Piège classique."]] as [string, string, string][]) : []),
    ...(a.subdomain ? ([["Sous-domaine", a.subdomain, "Choisi librement par le propriétaire du domaine."]] as [string, string, string][]) : []),
    ["Domaine", a.domain, "C'est lui qui indique chez qui tu vas vraiment."],
    ...(a.path ? ([["Chemin", a.path, "La page demandée sur ce site. N'importe quel mot peut y figurer."]] as [string, string, string][]) : []),
    ...(a.query ? ([["Paramètres", a.query, "Informations transmises à la page."]] as [string, string, string][]) : []),
  ];

  return (
    <div className="mt-3 rounded-xl border border-line bg-paper p-3">
      <p className="font-mono text-[0.95rem] break-all">
        <span className="text-ink-soft">{url.slice(0, domainStart)}</span>
        <mark className="rounded bg-green-tint px-0.5 font-bold text-green-strong underline decoration-2 underline-offset-4">{url.slice(domainStart, domainEnd)}</mark>
        <span className="text-ink-soft">{url.slice(domainEnd)}</span>
      </p>
      <dl className="mt-3 grid gap-1.5 text-[0.93rem]">
        {rows.map(([label, value, note]) => (
          <div key={label} className="grid gap-x-3 sm:grid-cols-[8.5rem_1fr]">
            <dt className={`font-semibold ${label === "Domaine" ? "text-green-strong" : "text-ink-soft"}`}>{label}</dt>
            <dd>
              <code className="inline">{value}</code> <span className="text-ink-soft">{note}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function UrlEx({ exercise, uid, revealed, onCheck }: ExerciseProps<UrlExercise>) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const { verdict, checked, check, touch, solved } = useCheck(onCheck);
  const showSolution = revealed || solved;
  const complete = exercise.items.every((i) => answers[i.id]?.domain && answers[i.id]?.legit);
  const correct = exercise.items.filter((i) => isItemCorrect(i, answers[i.id])).length;

  const set = (id: string, patch: Answer) => {
    setAnswers((s) => ({ ...s, [id]: { ...s[id], ...patch } }));
    touch();
  };

  return (
    <div>
      <SimulationBanner text={exercise.simulation} />
      <ol className="space-y-6">
        {exercise.items.map((item, idx) => {
          const a = answers[item.id];
          return (
            <li key={item.id} className="rounded-2xl border border-line bg-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <p className="text-[0.95rem] text-ink-soft">
                  Lien {idx + 1} sur {exercise.items.length}. <Rich text={item.claim} />
                </p>
                {checked && !showSolution && <ItemMark ok={isItemCorrect(item, a)} />}
              </div>
              <p className="mt-2 rounded-lg bg-sunken px-3 py-2 font-mono text-[1rem] break-all">{item.url}</p>

              <fieldset className="mt-4">
                <legend className="mb-2 font-semibold">Quel est le véritable nom de domaine ?</legend>
                <div className="flex flex-wrap gap-2">
                  {item.choices.map((c) => {
                    const sel = a?.domain === c;
                    const good = showSolution && c === item.answer;
                    return (
                      <label
                        key={c}
                        className={`cursor-pointer rounded-full border-[1.5px] px-3 py-1.5 font-mono text-[0.9rem] has-[input:focus-visible]:outline-3 has-[input:focus-visible]:outline-focus ${
                          good ? "border-green bg-green-tint text-green-strong" : sel ? "border-deep bg-deep-tint text-deep" : "border-line-strong bg-surface"
                        }`}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          name={`${uid}-${item.id}-domain`}
                          checked={sel}
                          disabled={showSolution}
                          onChange={() => set(item.id, { domain: c })}
                        />
                        {good && <span className="sr-only">Bonne réponse : </span>}
                        {c}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset className="mt-4">
                <legend className="mb-2 font-semibold">Ce lien mène-t-il vraiment là où il le prétend ?</legend>
                <div className="flex flex-wrap gap-2">
                  {(["oui", "non"] as const).map((v) => {
                    const good = showSolution && (item.legit ? "oui" : "non") === v;
                    return (
                      <label key={v} className={`choice-tile min-w-28 ${good ? "!border-green !bg-green-tint" : ""}`}>
                        <input type="radio" name={`${uid}-${item.id}-legit`} checked={a?.legit === v} disabled={showSolution} onChange={() => set(item.id, { legit: v })} />
                        <span>{v === "oui" ? "Oui" : "Non"}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {showSolution && (
                <div className="reveal">
                  <UrlAnatomyView url={item.url} />
                  <ExplanationNote>
                    <Rich text={item.why} />
                  </ExplanationNote>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      <CheckBar
        verdict={verdict}
        revealed={revealed}
        retry={exercise.retry}
        disabled={!complete}
        disabledReason="Réponds aux deux questions pour chaque lien."
        summary={`${correct} lien${correct > 1 ? "s" : ""} correctement analysé${correct > 1 ? "s" : ""} sur ${exercise.items.length}.`}
        onCheck={() => check(correct === exercise.items.length, correct / exercise.items.length)}
      />
    </div>
  );
}
