"use client";

import { useState } from "react";
import type { AccessExercise, AccessScenario } from "@/content/types";
import { decide } from "@/lib/access";
import { IconCheck, IconCross } from "@/components/ui/icons";
import { Rich } from "@/components/ui/rich";
import { CheckBar, ExplanationNote, ItemMark, SimulationBanner, type ExerciseProps } from "./shared";
import { useCheck } from "./useCheck";

const ACTION_LABEL = { lire: "lire", modifier: "modifier", supprimer: "supprimer" } as const;

function Decision({ allowed }: { allowed: boolean }) {
  return allowed ? (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-tint px-2 py-0.5 text-sm font-semibold text-green-strong">
      <IconCheck size={14} /> Autorisé
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-tint px-2 py-0.5 text-sm font-semibold text-red">
      <IconCross size={14} /> Refusé
    </span>
  );
}

export function AccessEx({ exercise, uid, revealed, onCheck }: ExerciseProps<AccessExercise>) {
  const [perms, setPerms] = useState<Record<string, string[]>>(() => structuredClone(exercise.perms));
  const [predictions, setPredictions] = useState<Record<string, "oui" | "non">>({});
  const [simulated, setSimulated] = useState(false);
  const { verdict, checked, check, touch, solved } = useCheck(onCheck);
  const showSolution = revealed || solved;
  const configure = exercise.mode === "configure";
  const userName = (id: string) => exercise.users.find((u) => u.id === id)?.name ?? id;
  const roleOf = (userId: string) => exercise.roles.find((r) => r.id === exercise.users.find((u) => u.id === userId)?.role);
  const resLabel = (id: string) => exercise.resources.find((r) => r.id === id)?.label ?? id;
  const shownPerms = configure && showSolution && exercise.solutionPerms ? exercise.solutionPerms : perms;

  const togglePerm = (role: string, key: string) => {
    setPerms((p) => {
      const list = p[role] ?? [];
      return { ...p, [role]: list.includes(key) ? list.filter((k) => k !== key) : [...list, key] };
    });
    setSimulated(false);
    touch();
  };

  /* --- évaluation --- */
  const requests = exercise.requests ?? [];
  const scenarios = exercise.scenarios ?? [];
  const predictOk = requests.filter((r) => (predictions[r.id] === "oui") === decide(exercise, exercise.perms, r) && predictions[r.id]).length;
  const scenarioPass = (s: AccessScenario, p = perms) => decide(exercise, p, s) === s.expected;
  const passCount = scenarios.filter((s) => scenarioPass(s)).length;
  const superfluous = configure && exercise.solutionPerms
    ? exercise.roles.flatMap((r) => (perms[r.id] ?? []).filter((k) => !(exercise.solutionPerms![r.id] ?? []).includes(k)).map((k) => `${r.label} : ${k.replace(":", ", ")}`))
    : [];

  /* Sur petit écran, le tableau devient une carte par rôle (même état, mêmes contrôles). */
  const stacked = (
    <div className="space-y-3 sm:hidden">
      <p className="font-semibold">{configure ? "Droits par rôle (modifiables)" : "Droits par rôle, tels que configurés sur le site"}</p>
      {exercise.roles.map((r) => (
        <fieldset key={r.id} className="rounded-2xl border border-line bg-surface p-4">
          <legend className="px-1 font-bold">{r.label}</legend>
          <ul className="space-y-1.5">
            {exercise.resources.flatMap((res) =>
              exercise.actions.map((action) => {
                const key = `${res.id}:${action}`;
                const has = (shownPerms[r.id] ?? []).includes(key);
                const text = `${res.label.charAt(0).toUpperCase()}${res.label.slice(1)}, ${ACTION_LABEL[action]}`;
                return (
                  <li key={key}>
                    {configure ? (
                      <label className="flex items-center gap-2.5 py-1">
                        <input type="checkbox" className="h-[1.15rem] w-[1.15rem] accent-deep" checked={has} disabled={showSolution} onChange={() => togglePerm(r.id, key)} />
                        <span>{text}</span>
                      </label>
                    ) : (
                      <span className="flex items-center justify-between gap-2 py-0.5">
                        <span>{text}</span>
                        {has ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-green-strong">
                            <IconCheck size={16} />
                            Oui
                          </span>
                        ) : (
                          <span className="text-ink-soft">Non</span>
                        )}
                      </span>
                    )}
                  </li>
                );
              }),
            )}
          </ul>
        </fieldset>
      ))}
    </div>
  );

  const matrix = (
    <div className="hidden overflow-x-auto rounded-2xl border border-line bg-surface sm:block">
      <table className="w-full min-w-[30rem] border-collapse text-[0.92rem]">
        <caption className="px-4 pt-3 text-left font-semibold">
          {configure ? "Droits par rôle (modifiables)" : "Droits par rôle, tels que configurés sur le site"}
        </caption>
        <thead>
          <tr className="text-ink-soft">
            <th scope="col" className="px-3 py-2 text-left font-semibold">
              Ressource et action
            </th>
            {exercise.roles.map((r) => (
              <th key={r.id} scope="col" className="px-3 py-2 text-center font-semibold">
                {r.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {exercise.resources.flatMap((res) =>
            exercise.actions.map((action) => {
              const key = `${res.id}:${action}`;
              return (
                <tr key={key} className="border-t border-line">
                  <th scope="row" className="px-3 py-2 text-left font-normal">
                    <span className="font-semibold">{res.label}</span>, {ACTION_LABEL[action]}
                  </th>
                  {exercise.roles.map((r) => {
                    const has = (shownPerms[r.id] ?? []).includes(key);
                    return (
                      <td key={r.id} className="px-3 py-2 text-center">
                        {configure ? (
                          <input
                            type="checkbox"
                            className="h-[1.15rem] w-[1.15rem] accent-deep"
                            aria-label={`${r.label} peut ${ACTION_LABEL[action]} : ${res.label}`}
                            checked={has}
                            disabled={showSolution}
                            onChange={() => togglePerm(r.id, key)}
                          />
                        ) : has ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-green-strong">
                            <IconCheck size={16} />
                            Oui
                          </span>
                        ) : (
                          <span className="text-ink-soft">Non</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            }),
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <SimulationBanner text={exercise.simulation ?? "Ce site et ses utilisateurs sont fictifs. Les décisions sont calculées dans la page à partir du tableau des droits."} />

      <div className="mb-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-4">
          <h4 className="mb-2 font-sans font-bold">Les rôles</h4>
          <dl className="space-y-1.5 text-[0.95rem]">
            {exercise.roles.map((r) => (
              <div key={r.id}>
                <dt className="inline font-semibold">{r.label} : </dt>
                <dd className="inline">
                  <Rich text={r.description} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-4">
          <h4 className="mb-2 font-sans font-bold">Les utilisateurs</h4>
          <ul className="space-y-1 text-[0.95rem]">
            {exercise.users.map((u) => (
              <li key={u.id}>
                <span className="font-semibold">{u.name}</span>, rôle {exercise.roles.find((r) => r.id === u.role)?.label}
              </li>
            ))}
          </ul>
          {exercise.ownerScoped?.length ? (
            <p className="mt-3 rounded-lg bg-paper px-3 py-2 text-sm">
              Règle supplémentaire : chaque élément de « {exercise.ownerScoped.map(resLabel).join(", ")} » n'est accessible qu'à son propriétaire
              {exercise.bypassRoles?.length ? `, sauf pour le rôle ${exercise.bypassRoles.map((b) => exercise.roles.find((r) => r.id === b)?.label).join(", ")}` : ""}.
            </p>
          ) : null}
        </div>
      </div>

      {matrix}
      {stacked}

      {!configure && (
        <div className="mt-6">
          <h4 className="mb-3 font-sans font-bold">Les demandes reçues par le site</h4>
          <ol className="space-y-3">
            {requests.map((r, i) => {
              const actual = decide(exercise, exercise.perms, r);
              const ok = predictions[r.id] !== undefined && (predictions[r.id] === "oui") === actual;
              return (
                <li key={r.id} className="rounded-xl border border-line bg-surface p-3.5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p id={`${uid}-req-${r.id}`}>
                      <span className="mr-1.5 text-ink-soft">{i + 1}.</span>
                      <strong className="font-semibold">{userName(r.userId)}</strong> ({roleOf(r.userId)?.label}) veut <strong className="font-semibold">{ACTION_LABEL[r.action]}</strong> : {resLabel(r.resourceId)}
                      {r.ownerId && (r.ownerId === r.userId ? ", qui lui appartient" : `, appartenant à ${userName(r.ownerId)}`)}.
                    </p>
                    {checked && !showSolution && <ItemMark ok={ok} />}
                  </div>
                  <div role="radiogroup" aria-labelledby={`${uid}-req-${r.id}`} className="mt-2.5 flex flex-wrap gap-2">
                    {(["oui", "non"] as const).map((v) => (
                      <label key={v} className={`choice-tile py-2 ${showSolution && (v === "oui") === actual ? "!border-green !bg-green-tint" : ""}`}>
                        <input
                          type="radio"
                          name={`${uid}-req-${r.id}`}
                          checked={predictions[r.id] === v}
                          disabled={showSolution}
                          onChange={() => {
                            setPredictions((p) => ({ ...p, [r.id]: v }));
                            touch();
                          }}
                        />
                        <span>{v === "oui" ? "Autorisé" : "Refusé"}</span>
                      </label>
                    ))}
                  </div>
                  {showSolution && (
                    <ExplanationNote>
                      <span className="mr-2">
                        Décision simulée : <Decision allowed={actual} />
                      </span>
                      <Rich text={r.why} />
                    </ExplanationNote>
                  )}
                </li>
              );
            })}
          </ol>
          <CheckBar
            verdict={verdict}
            revealed={revealed}
            retry={exercise.retry}
            disabled={requests.some((r) => !predictions[r.id])}
            disabledReason="Donne ta prédiction pour chaque demande."
            checkLabel="Comparer avec la simulation"
            summary={`${predictOk} prédiction${predictOk > 1 ? "s" : ""} juste${predictOk > 1 ? "s" : ""} sur ${requests.length}.`}
            onCheck={() => check(predictOk === requests.length, predictOk / requests.length)}
          />
        </div>
      )}

      {configure && (
        <div className="mt-6">
          <h4 className="mb-3 font-sans font-bold">Ce que le site doit permettre, et refuser</h4>
          <ol className="space-y-2.5">
            {scenarios.map((s, i) => {
              const result = decide(exercise, shownPerms, s);
              const pass = result === s.expected;
              return (
                <li key={s.id} className="flex flex-wrap items-start justify-between gap-2 rounded-xl border border-line bg-surface p-3.5">
                  <p className="min-w-0 flex-1">
                    <span className="mr-1.5 text-ink-soft">{i + 1}.</span>
                    <Rich text={s.text} />
                    <span className="ml-1 text-sm text-ink-soft">(attendu : {s.expected ? "autorisé" : "refusé"})</span>
                  </p>
                  {(simulated || showSolution) && (
                    <span className="flex flex-none items-center gap-2">
                      <Decision allowed={result} />
                      <ItemMark ok={pass} labelOk="Conforme" labelKo="Non conforme" />
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
          {simulated && !showSolution && superfluous.length > 0 && passCount === scenarios.length && (
            <p className="mt-3 rounded-xl border border-amber/30 bg-amber-tint px-4 py-3">
              Toutes les demandes obtiennent la bonne réponse, mais {superfluous.length} droit{superfluous.length > 1 ? "s" : ""} accordé{superfluous.length > 1 ? "s" : ""} ne
              {superfluous.length > 1 ? " servent" : " sert"} à aucune demande légitime : {superfluous.join(" ; ")}. Le principe du moindre privilège demande de {superfluous.length > 1 ? "les" : "le"} retirer.
            </p>
          )}
          <CheckBar
            verdict={verdict}
            revealed={revealed}
            retry={exercise.retry}
            checkLabel="Lancer la simulation"
            summary={`${passCount} demande${passCount > 1 ? "s" : ""} conforme${passCount > 1 ? "s" : ""} sur ${scenarios.length}${superfluous.length ? `, ${superfluous.length} droit${superfluous.length > 1 ? "s" : ""} superflu${superfluous.length > 1 ? "s" : ""}` : ""}.`}
            onCheck={() => {
              setSimulated(true);
              check(passCount === scenarios.length && superfluous.length === 0, passCount / scenarios.length);
            }}
          />
          {showSolution && exercise.solutionNote && (
            <ExplanationNote>
              <Rich text={exercise.solutionNote} />
            </ExplanationNote>
          )}
        </div>
      )}
    </div>
  );
}
