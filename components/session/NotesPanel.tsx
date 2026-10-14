"use client";

import { useEffect, useRef, useState } from "react";
import { progressActions, useProgress } from "@/lib/progress";

/** Zone personnelle « Ce que j'ai compris / Ce que je veux revoir », enregistrée à chaque frappe. */
export function NotesPanel({ sessionId }: { sessionId: string }) {
  const { state, hydrated } = useProgress();
  const saved = state.notes[sessionId];
  const [understood, setUnderstood] = useState("");
  const [review, setReview] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const restored = useRef(false);

  useEffect(() => {
    if (!hydrated || restored.current) return;
    restored.current = true;
    if (saved) {
      setUnderstood(saved.understood);
      setReview(saved.review);
    }
  }, [hydrated, saved]);

  const save = (field: "understood" | "review", value: string) => {
    progressActions.saveNote(sessionId, field, value);
    progressActions.touch(sessionId);
    setSavedAt(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <label htmlFor={`${sessionId}-understood`} className="mb-1.5 block font-semibold">
          Ce que j'ai compris
        </label>
        <textarea
          id={`${sessionId}-understood`}
          className="field min-h-36 resize-y"
          placeholder="Avec tes propres mots, l'idée principale du jour."
          value={understood}
          disabled={!hydrated}
          onChange={(e) => {
            setUnderstood(e.target.value);
            save("understood", e.target.value);
          }}
        />
      </div>
      <div>
        <label htmlFor={`${sessionId}-review`} className="mb-1.5 block font-semibold">
          Ce que je veux revoir
        </label>
        <textarea
          id={`${sessionId}-review`}
          className="field min-h-36 resize-y"
          placeholder="Une question, un point encore flou."
          value={review}
          disabled={!hydrated}
          onChange={(e) => {
            setReview(e.target.value);
            save("review", e.target.value);
          }}
        />
      </div>
      <p className="text-sm text-ink-soft md:col-span-2" aria-live="polite">
        {savedAt ? `Enregistré dans ce navigateur à ${savedAt}.` : "Tes notes sont enregistrées automatiquement dans ce navigateur et regroupées dans ton carnet."}
      </p>
    </div>
  );
}
