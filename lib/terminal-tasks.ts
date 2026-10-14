import type { TerminalTask } from "@/content/types";
import { matchesAnswer } from "./text";
import type { CommandResult } from "./terminal";

export interface TerminalTrace {
  results: CommandResult[];
  visited: Set<string>;
}

/** Une tâche « cwd » ou « ran » est atteinte dès qu'elle l'a été une fois ; une tâche « answer » dépend de la réponse saisie. */
export function taskSatisfied(task: TerminalTask, trace: TerminalTrace, answer?: string): boolean {
  const c = task.check;
  if (c.kind === "cwd") return trace.visited.has(c.path);
  if (c.kind === "answer") return matchesAnswer(answer ?? "", c.accept);
  return trace.results.some(
    (r) =>
      r.command === c.command &&
      !r.error &&
      (!c.outputIncludes || r.output.includes(c.outputIncludes)) &&
      (!c.argIncludes || r.args.some((a) => a.includes(c.argIncludes!))),
  );
}
