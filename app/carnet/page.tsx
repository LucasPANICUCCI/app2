import type { Metadata } from "next";
import { SESSIONS, SESSION_METAS } from "@/content/index";
import { CarnetView } from "@/components/views/CarnetView";

export const metadata: Metadata = { title: "Carnet" };

function promptLabels() {
  const out: Record<string, Record<string, string>> = {};
  for (const s of SESSIONS) {
    if (s.exercise.type === "reflection") out[s.id] = Object.fromEntries(s.exercise.prompts.map((p) => [p.id, p.label]));
    if (s.exercise.type === "justify") out[s.id] = { justification: s.exercise.justificationPrompt };
  }
  return out;
}

export default function CarnetPage() {
  return <CarnetView metas={SESSION_METAS} promptLabels={promptLabels()} />;
}
