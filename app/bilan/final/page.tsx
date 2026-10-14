import type { Metadata } from "next";
import { getSession, SESSION_METAS } from "@/content/index";
import { COMPETENCES } from "@/content/programme";
import { BilanFinalView } from "@/components/views/BilanFinalView";

export const metadata: Metadata = { title: "Bilan final" };

export default function BilanFinalPage() {
  const last = getSession("j42");
  const prompts = last?.exercise.type === "reflection" ? Object.fromEntries(last.exercise.prompts.map((p) => [p.id, p.label])) : {};
  return <BilanFinalView metas={SESSION_METAS} competences={COMPETENCES} finalPrompts={prompts} />;
}
