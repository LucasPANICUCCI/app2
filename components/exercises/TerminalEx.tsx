"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { TerminalExercise } from "@/content/types";
import { complete, promptLabel, runCommand, SUPPORTED_COMMANDS, type CommandResult, type TerminalContext } from "@/lib/terminal";
import { taskSatisfied } from "@/lib/terminal-tasks";
import { IconCheck, IconChevronDown } from "@/components/ui/icons";
import { Rich } from "@/components/ui/rich";
import { CheckBar, SimulationBanner, type ExerciseProps } from "./shared";
import { useCheck } from "./useCheck";

interface Line {
  kind: "input" | "output" | "error" | "info";
  text: string;
  prompt?: string;
}

export function TerminalEx({ exercise, uid, revealed, onCheck }: ExerciseProps<TerminalExercise>) {
  const initialCtx = (): TerminalContext => ({
    root: exercise.root,
    user: exercise.user,
    groups: exercise.groups,
    home: exercise.home,
    cwd: exercise.startDir,
  });
  const [ctx, setCtx] = useState<TerminalContext>(initialCtx);
  const welcome: Line[] = [
    { kind: "info", text: "Terminal simulé : aucune commande n'est réellement exécutée sur ton appareil. Tape help pour voir les commandes disponibles." },
  ];
  const [lines, setLines] = useState<Line[]>(welcome);
  const [results, setResults] = useState<CommandResult[]>([]);
  const [visited, setVisited] = useState<Set<string>>(() => new Set([exercise.startDir]));
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const { verdict, checked, check, touch, solved } = useCheck(onCheck);
  const showSolution = revealed || solved;

  const trace = useMemo(() => ({ results, visited }), [results, visited]);
  const status = exercise.tasks.map((t) => taskSatisfied(t, trace, answers[t.id]));
  const liveDone = exercise.tasks.filter((t, i) => t.check.kind !== "answer" && status[i]).length;
  const doneCount = status.filter(Boolean).length;
  const answerTasks = exercise.tasks.filter((t) => t.check.kind === "answer");

  useEffect(() => {
    const el = screenRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const submit = () => {
    const line = input;
    const prompt = promptLabel(ctx, exercise.host);
    const res = runCommand(ctx, line);
    setInput("");
    setHistoryIndex(null);
    if (line.trim()) setHistory((h) => [...h, line]);
    if (res.clear) {
      setLines([]);
    } else {
      setLines((l) => [
        ...l,
        { kind: "input", text: line, prompt },
        ...(res.output ? [{ kind: res.error ? ("error" as const) : ("output" as const), text: res.output }] : []),
      ]);
    }
    if (res.command) {
      setResults((r) => [...r, res]);
      touch();
    }
    if (res.cwd !== ctx.cwd) {
      setCtx((c) => ({ ...c, cwd: res.cwd, previousDir: res.previousDir }));
      setVisited((v) => new Set(v).add(res.cwd));
    }
  };

  const reset = () => {
    setCtx(initialCtx());
    setLines(welcome);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div>
      <SimulationBanner text={exercise.simulation ?? "Ce terminal est entièrement simulé dans la page, avec un petit système de fichiers fictif. Rien n'est exécuté sur ton appareil."} />

      <div className="mb-4 rounded-2xl border border-line bg-surface p-4">
        <h4 className="mb-2 font-sans font-bold">Ta mission</h4>
        <ol className="space-y-2.5">
          {exercise.tasks.map((t, i) => {
            const done = status[i];
            const isAnswer = t.check.kind === "answer";
            const showDone = done && (!isAnswer || checked || showSolution);
            return (
              <li key={t.id} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full border-2 ${
                    showDone ? "border-green bg-green text-white" : "border-line-strong text-ink-soft"
                  }`}
                >
                  {showDone ? <IconCheck size={14} /> : <span className="text-xs font-bold">{i + 1}</span>}
                </span>
                <div className="min-w-0 flex-1">
                  <p>
                    <Rich text={t.text} />
                    <span className="sr-only">{showDone ? " (fait)" : ""}</span>
                  </p>
                  {isAnswer && t.check.kind === "answer" && (
                    <div className="mt-1.5">
                      <label className="sr-only" htmlFor={`${uid}-ans-${t.id}`}>
                        Réponse à la tâche {i + 1}
                      </label>
                      <input
                        id={`${uid}-ans-${t.id}`}
                        className="field max-w-sm py-1.5 font-mono text-[0.95rem]"
                        placeholder={t.check.placeholder ?? "Ta réponse"}
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck={false}
                        value={showSolution && !done ? t.check.accept[0] : answers[t.id] ?? ""}
                        disabled={showSolution}
                        onChange={(e) => {
                          setAnswers((s) => ({ ...s, [t.id]: e.target.value }));
                          touch();
                        }}
                      />
                      {checked && !done && !showSolution && <span className="ml-2 text-sm font-semibold text-red">Pas encore</span>}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-3 text-sm text-ink-soft" aria-live="polite">
          {liveDone} action{liveDone > 1 ? "s" : ""} réalisée{liveDone > 1 ? "s" : ""} dans le terminal
          {answerTasks.length ? `, ${answerTasks.length} réponse${answerTasks.length > 1 ? "s" : ""} à saisir` : ""}.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-console bg-console text-console-ink shadow-sm">
        <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-2 text-sm">
          <span className="font-semibold text-console-dim">Terminal simulé, machine fictive « {exercise.host} »</span>
          <button type="button" onClick={reset} className="rounded-md px-2 py-1 font-semibold text-console-ink hover:bg-white/10">
            Réinitialiser
          </button>
        </div>
        <div
          ref={screenRef}
          role="log"
          aria-live="polite"
          aria-label="Sortie du terminal"
          className="h-72 overflow-y-auto px-4 py-3 font-mono text-[0.9rem] leading-relaxed sm:h-80"
          onClick={() => {
            if (!window.getSelection()?.toString()) inputRef.current?.focus();
          }}
        >
          {lines.map((l, i) => (
            <div key={i} className="whitespace-pre-wrap break-words">
              {l.kind === "input" && (
                <>
                  <span className="text-[#8fc1a6]">{l.prompt}</span> {l.text}
                </>
              )}
              {l.kind === "output" && <span>{l.text}</span>}
              {l.kind === "error" && <span className="text-[#f2c48d]">{l.text}</span>}
              {l.kind === "info" && <span className="text-console-dim">{l.text}</span>}
            </div>
          ))}
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <label htmlFor={`${uid}-cmd`} className="flex-none text-[#8fc1a6]">
              <span aria-hidden>{promptLabel(ctx, exercise.host)}</span>
              <span className="sr-only">Commande, dossier actuel {ctx.cwd}</span>
            </label>
            <input
              id={`${uid}-cmd`}
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" && history.length) {
                  e.preventDefault();
                  const idx = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
                  setHistoryIndex(idx);
                  setInput(history[idx]);
                } else if (e.key === "ArrowDown" && historyIndex !== null) {
                  e.preventDefault();
                  const idx = historyIndex + 1;
                  if (idx >= history.length) {
                    setHistoryIndex(null);
                    setInput("");
                  } else {
                    setHistoryIndex(idx);
                    setInput(history[idx]);
                  }
                } else if (e.key === "Tab" && input.trim()) {
                  const completed = complete(ctx, input);
                  if (completed !== input) {
                    e.preventDefault();
                    setInput(completed);
                  }
                }
              }}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="send"
              className="min-w-0 flex-1 bg-transparent text-console-ink caret-[#8fc1a6] outline-none"
            />
          </form>
        </div>
      </div>
      <p className="mt-2 text-sm text-ink-soft">Entrée pour valider une commande. Flèches haut et bas : commandes précédentes. Tab : compléter un nom.</p>

      <details className="group mt-3 rounded-xl border border-line bg-surface">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-2.5 font-semibold text-deep">
          Commandes disponibles dans cette simulation
          <IconChevronDown size={18} className="transition-transform group-open:rotate-180" />
        </summary>
        <dl className="grid gap-1.5 px-4 pb-4 text-[0.95rem]">
          {SUPPORTED_COMMANDS.map((c) => (
            <div key={c.name} className="grid gap-x-3 sm:grid-cols-[14rem_1fr]">
              <dt>
                <code className="inline">{c.usage}</code>
              </dt>
              <dd className="text-ink-soft">{c.description}</dd>
            </div>
          ))}
        </dl>
      </details>

      <CheckBar
        verdict={verdict}
        revealed={revealed}
        retry={exercise.retry}
        summary={`${doneCount} tâche${doneCount > 1 ? "s" : ""} accomplie${doneCount > 1 ? "s" : ""} sur ${exercise.tasks.length}.`}
        disabled={answerTasks.some((t) => !(answers[t.id] ?? "").trim()) || results.length === 0}
        disabledReason={results.length === 0 ? "Commence par taper une commande dans le terminal." : "Saisis tes réponses pour vérifier."}
        checkLabel="Vérifier ma mission"
        onCheck={() => check(doneCount === exercise.tasks.length, doneCount / exercise.tasks.length)}
      />

      {showSolution && (
        <div className="reveal mt-6 rounded-2xl border border-line bg-paper p-4">
          <h4 className="font-sans font-bold">Une suite de commandes qui résout la mission</h4>
          <ol className="mt-2 space-y-1">
            {exercise.solution.map((cmd, i) => (
              <li key={i} className="font-mono text-[0.92rem]">
                <span className="mr-2 text-ink-soft">{i + 1}.</span>
                {cmd}
              </li>
            ))}
          </ol>
          {exercise.solutionAnswers && (
            <dl className="mt-3 space-y-1 text-[0.95rem]">
              {exercise.tasks
                .filter((t) => exercise.solutionAnswers?.[t.id])
                .map((t) => (
                  <div key={t.id}>
                    <dt className="inline text-ink-soft">
                      <Rich text={t.text} />
                    </dt>{" "}
                    <dd className="inline font-mono font-semibold">{exercise.solutionAnswers![t.id]}</dd>
                  </div>
                ))}
            </dl>
          )}
          <p className="mt-3 text-sm text-ink-soft">Tu peux rejouer ces commandes dans le terminal ci-dessus : il reste utilisable.</p>
        </div>
      )}
    </div>
  );
}
