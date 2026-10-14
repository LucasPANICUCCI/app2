"use client";

import type { Exercise } from "@/content/types";
import { AccessEx } from "./AccessEx";
import { ChoiceEx } from "./ChoiceEx";
import { InvestigationEx } from "./InvestigationEx";
import { JustifyEx } from "./JustifyEx";
import { LogsEx } from "./LogsEx";
import { MatchEx } from "./MatchEx";
import { MessageEx } from "./MessageEx";
import { OrderEx } from "./OrderEx";
import { ReflectionEx } from "./ReflectionEx";
import { ShortEx } from "./ShortEx";
import { TerminalEx } from "./TerminalEx";
import { UrlEx } from "./UrlEx";

interface Props {
  exercise: Exercise;
  uid: string;
  revealed: boolean;
  onCheck: (correct: boolean, score?: number) => void;
}

/** Aiguillage vers le composant de chaque format d'exercice. */
export function ExerciseRunner({ exercise, ...rest }: Props) {
  switch (exercise.type) {
    case "choice":
      return <ChoiceEx exercise={exercise} {...rest} />;
    case "message":
      return <MessageEx exercise={exercise} {...rest} />;
    case "url":
      return <UrlEx exercise={exercise} {...rest} />;
    case "order":
      return <OrderEx exercise={exercise} {...rest} />;
    case "match":
      return <MatchEx exercise={exercise} {...rest} />;
    case "justify":
      return <JustifyEx exercise={exercise} {...rest} />;
    case "reflection":
      return <ReflectionEx exercise={exercise} {...rest} />;
    case "short":
      return <ShortEx exercise={exercise} {...rest} />;
    case "terminal":
      return <TerminalEx exercise={exercise} {...rest} />;
    case "logs":
      return <LogsEx exercise={exercise} {...rest} />;
    case "investigation":
      return <InvestigationEx exercise={exercise} {...rest} />;
    case "access":
      return <AccessEx exercise={exercise} {...rest} />;
  }
}
