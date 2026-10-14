import type { Metadata } from "next";
import { RECALL_NOTIONS, SESSIONS, SESSION_METAS } from "@/content/index";
import { GLOSSARY, GLOSSARY_BY_ID } from "@/content/glossaire";
import { seededShuffle } from "@/lib/text";
import { RevisionView, type RevisionQuestion } from "@/components/views/RevisionView";

export const metadata: Metadata = { title: "Révision" };

/** Une question par notion : un rappel rédigé s'il en existe un, sinon une question de définition générée à partir du glossaire. */
function buildQuestions(): Record<string, RevisionQuestion> {
  const out: Record<string, RevisionQuestion> = {};
  for (const s of [...SESSIONS].reverse()) {
    if (s.recall && !out[s.recall.notion]) {
      const { fromDay: _omit, ...rest } = s.recall;
      void _omit;
      out[s.recall.notion] = { ...rest, source: "rappel" };
    }
  }
  const allNotions = new Set(SESSIONS.flatMap((s) => s.notions));
  for (const n of allNotions) {
    if (out[n] || !GLOSSARY_BY_ID[n]) continue;
    const entry = GLOSSARY_BY_ID[n];
    const distractors = seededShuffle(
      GLOSSARY.filter((g) => g.id !== n),
      n,
    ).slice(0, 2);
    const options = seededShuffle(
      [{ id: "a", text: entry.definition }, ...distractors.map((d, i) => ({ id: `d${i}`, text: d.definition }))],
      n + "opts",
    );
    out[n] = {
      notion: n,
      prompt: `Quelle phrase définit « ${entry.term} » ?`,
      options,
      answer: "a",
      explanation: entry.example ? `${entry.definition} Exemple : ${entry.example}` : entry.definition,
      source: "definition",
    };
  }
  return out;
}

export default function RevisionPage() {
  return <RevisionView metas={SESSION_METAS} recallNotions={RECALL_NOTIONS} questions={buildQuestions()} glossary={GLOSSARY_BY_ID} />;
}
