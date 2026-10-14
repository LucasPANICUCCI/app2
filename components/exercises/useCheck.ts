"use client";

import { useCallback, useState } from "react";
import type { Verdict } from "./shared";

/**
 * État commun d'un exercice : verdict courant, et marquage des éléments
 * visible uniquement tant que les réponses n'ont pas été modifiées.
 */
export function useCheck(onCheck: (correct: boolean, score?: number) => void) {
  const [verdict, setVerdict] = useState<Verdict>("idle");
  const [checked, setChecked] = useState(false);

  const check = useCallback(
    (correct: boolean, score?: number) => {
      setVerdict(correct ? "right" : "wrong");
      setChecked(true);
      onCheck(correct, score);
    },
    [onCheck],
  );

  /** À appeler à chaque modification d'une réponse. */
  const touch = useCallback(() => {
    setChecked(false);
  }, []);

  return { verdict, checked, check, touch, solved: verdict === "right" };
}
