"use client";

import { Fragment, useMemo, useState } from "react";
import type { LogExercise } from "@/content/types";
import { IconFlag, IconSearch } from "@/components/ui/icons";
import { Rich } from "@/components/ui/rich";
import { ChoiceQuestionBlock, isChoiceCorrect } from "./ChoiceQuestion";
import { CheckBar, ItemMark, SimulationBanner, type ExerciseProps } from "./shared";
import { useCheck } from "./useCheck";

export function LogsEx({ exercise, uid, revealed, onCheck }: ExerciseProps<LogExercise>) {
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<{ key: string; dir: 1 | -1 } | null>(null);
  const [values, setValues] = useState<Record<string, string[]>>({});
  const { verdict, checked, check, touch, solved } = useCheck(onCheck);
  const showSolution = revealed || solved;

  const rows = useMemo(() => {
    const q = filter.trim().toLowerCase();
    let r = exercise.rows.filter((row) => !q || Object.values(row.cells).some((v) => v.toLowerCase().includes(q)));
    if (sort) r = [...r].sort((a, b) => (a.cells[sort.key] ?? "").localeCompare(b.cells[sort.key] ?? "", "fr", { numeric: true }) * sort.dir);
    return r;
  }, [exercise.rows, filter, sort]);

  const suspicious = exercise.rows.filter((r) => r.suspicious);
  const found = suspicious.filter((r) => flagged.has(r.id)).length;
  const falseAlarms = exercise.rows.filter((r) => !r.suspicious && flagged.has(r.id)).length;
  const rowsOk = found === suspicious.length && falseAlarms === 0;
  const followOk = exercise.followUp.filter((q) => isChoiceCorrect(q, values[q.id] ?? [])).length;
  const followComplete = exercise.followUp.every((q) => (values[q.id] ?? []).length);

  const toggle = (id: string) => {
    setFlagged((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
    touch();
  };

  return (
    <div>
      <SimulationBanner text={exercise.simulation} />
      <p className="mb-3 text-[0.95rem] text-ink-soft">
        Coche les lignes qui méritent d'être examinées de plus près. Tu peux filtrer et trier les lignes.
      </p>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-xs">
          <label htmlFor={`${uid}-filter`} className="sr-only">
            Filtrer les lignes
          </label>
          <IconSearch size={17} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-soft" />
          <input id={`${uid}-filter`} type="search" className="field py-2 pl-9" placeholder="Filtrer (ex. un nom, une IP)" value={filter} onChange={(e) => setFilter(e.target.value)} />
        </div>
        <div className="w-full sm:hidden">
          <label htmlFor={`${uid}-sort`} className="sr-only">
            Trier les lignes
          </label>
          <select
            id={`${uid}-sort`}
            className="field py-2"
            value={sort?.key ?? ""}
            onChange={(e) => setSort(e.target.value ? { key: e.target.value, dir: 1 } : null)}
          >
            <option value="">Ordre d'origine</option>
            {exercise.columns.map((c) => (
              <option key={c.key} value={c.key}>
                Trier par : {c.label}
              </option>
            ))}
          </select>
        </div>
        <span className="text-sm text-ink-soft">
          {rows.length} ligne{rows.length > 1 ? "s" : ""} affichée{rows.length > 1 ? "s" : ""} sur {exercise.rows.length}, {flagged.size} cochée{flagged.size > 1 ? "s" : ""}
        </span>
      </div>

      {/* Petit écran : une carte par ligne, toutes les colonnes visibles. */}
      <ul className="space-y-2.5 sm:hidden" aria-label={exercise.source}>
        {rows.map((row) => {
          const isFlagged = flagged.has(row.id);
          const solutionRow = showSolution && row.suspicious;
          return (
            <li key={row.id} className={`rounded-xl border p-3 ${solutionRow ? "border-amber/50 bg-amber-tint" : isFlagged ? "border-deep bg-deep-tint" : "border-line bg-surface"}`}>
              <label className="mb-1.5 flex items-center gap-2.5 font-semibold">
                <input type="checkbox" className="h-[1.1rem] w-[1.1rem] accent-deep" checked={isFlagged} disabled={showSolution} onChange={() => toggle(row.id)} />
                À examiner
              </label>
              <dl className="grid grid-cols-[7rem_1fr] gap-x-2 gap-y-0.5 text-[0.9rem]">
                {exercise.columns.map((c) => (
                  <div key={c.key} className="contents">
                    <dt className="text-ink-soft">{c.label}</dt>
                    <dd className="font-mono text-[0.84rem] break-words">{row.cells[c.key]}</dd>
                  </div>
                ))}
              </dl>
              {showSolution && (row.suspicious || isFlagged) && (
                <p className="mt-2 text-[0.92rem]">
                  <span className={`mr-1.5 font-semibold ${row.suspicious ? "text-amber" : "text-ink-soft"}`}>{row.suspicious ? "À examiner :" : "Pas suspect en soi :"}</span>
                  <Rich text={row.why} />
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <div className="hidden overflow-x-auto rounded-2xl border border-line bg-surface sm:block">
        <table className="w-full min-w-[36rem] border-collapse text-left text-[0.92rem]">
          <caption className="sr-only">{exercise.source}</caption>
          <thead className="bg-paper text-ink-soft">
            <tr>
              <th scope="col" className="w-12 px-3 py-2.5 font-semibold">
                <span className="sr-only">À examiner</span>
                <IconFlag size={16} />
              </th>
              {exercise.columns.map((c) => {
                const active = sort?.key === c.key;
                return (
                  <th key={c.key} scope="col" aria-sort={active ? (sort!.dir === 1 ? "ascending" : "descending") : "none"} className="px-3 py-2.5 font-semibold">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 hover:text-deep"
                      onClick={() => setSort((s) => (s?.key === c.key ? { key: c.key, dir: s.dir === 1 ? -1 : 1 } : { key: c.key, dir: 1 }))}
                    >
                      {c.label}
                      <span aria-hidden className="text-xs">
                        {active ? (sort!.dir === 1 ? "▲" : "▼") : "↕"}
                      </span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isFlagged = flagged.has(row.id);
              const solutionRow = showSolution && row.suspicious;
              return (
                <Fragment key={row.id}>
                  <tr className={`border-t border-line ${solutionRow ? "bg-amber-tint" : isFlagged ? "bg-deep-tint" : ""}`}>
                    <td className="px-3 py-2 align-top">
                      <input
                        type="checkbox"
                        aria-label={`Examiner la ligne ${exercise.columns.map((c) => row.cells[c.key]).join(", ")}`}
                        className="h-[1.1rem] w-[1.1rem] accent-deep"
                        checked={isFlagged}
                        disabled={showSolution}
                        onChange={() => toggle(row.id)}
                      />
                    </td>
                    {exercise.columns.map((c) => (
                      <td key={c.key} className="px-3 py-2 align-top font-mono text-[0.86rem] whitespace-nowrap">
                        {row.cells[c.key]}
                      </td>
                    ))}
                  </tr>
                  {showSolution && (row.suspicious || isFlagged) && (
                    <tr className={row.suspicious ? "bg-amber-tint" : ""}>
                      <td />
                      <td colSpan={exercise.columns.length} className="px-3 pb-2.5 text-[0.92rem]">
                        <span className={`mr-1.5 font-semibold ${row.suspicious ? "text-amber" : "text-ink-soft"}`}>{row.suspicious ? "À examiner :" : "Pas suspect en soi :"}</span>
                        <Rich text={row.why} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-ink-soft">Source : {exercise.source}. Données fictives.</p>
      {checked && !showSolution && (
        <div className="mt-2">
          <ItemMark ok={rowsOk} labelOk="Sélection des lignes juste" labelKo="Sélection des lignes à revoir" />
        </div>
      )}

      {exercise.followUp.length > 0 && (
        <div className="mt-6 space-y-6">
          {exercise.followUp.map((q, i) => (
            <ChoiceQuestionBlock
              key={q.id}
              q={q}
              uid={uid}
              index={exercise.followUp.length > 1 ? i + 1 : undefined}
              value={values[q.id] ?? []}
              onChange={(v) => {
                setValues((s) => ({ ...s, [q.id]: v }));
                touch();
              }}
              checked={checked}
              revealed={showSolution}
              locked={showSolution}
            />
          ))}
        </div>
      )}

      <CheckBar
        verdict={verdict}
        revealed={revealed}
        retry={exercise.retry}
        disabled={!followComplete || flagged.size === 0}
        disabledReason="Coche au moins une ligne et réponds aux questions pour vérifier."
        summary={`${found} ligne${found > 1 ? "s" : ""} à examiner repérée${found > 1 ? "s" : ""} sur ${suspicious.length}${falseAlarms ? `, ${falseAlarms} cochée${falseAlarms > 1 ? "s" : ""} sans raison suffisante` : ""} ; ${followOk} question${followOk > 1 ? "s" : ""} juste${followOk > 1 ? "s" : ""} sur ${exercise.followUp.length}.`}
        onCheck={() => check(rowsOk && followOk === exercise.followUp.length, (found - falseAlarms * 0.5 + followOk) / (suspicious.length + exercise.followUp.length))}
      />
    </div>
  );
}
