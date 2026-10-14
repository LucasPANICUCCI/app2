import { Fragment, type ReactNode } from "react";
import { Term } from "./glossary";

const TOKEN = /\*\*(.+?)\*\*|`([^`]+)`|\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;

/**
 * Texte enrichi minimal : **gras**, `code`, [[terme]] ou [[terme|texte]] (lien vers le glossaire).
 */
export function Rich({ text }: { text: string }) {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(TOKEN)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(<Fragment key={key++}>{text.slice(last, idx)}</Fragment>);
    if (m[1] !== undefined) out.push(<strong key={key++} className="font-bold">{m[1]}</strong>);
    else if (m[2] !== undefined) out.push(<code key={key++} className="inline">{m[2]}</code>);
    else if (m[3] !== undefined) out.push(<Term key={key++} id={m[3]}>{m[4] ?? m[3]}</Term>);
    last = idx + m[0].length;
  }
  if (last < text.length) out.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return <>{out}</>;
}

export function RichParas({ paras, className = "" }: { paras: string[]; className?: string }) {
  return (
    <div className={`prose-vigie ${className}`}>
      {paras.map((p, i) => (
        <p key={i}>
          <Rich text={p} />
        </p>
      ))}
    </div>
  );
}

/** Retire la syntaxe enrichie (pour les textes courts, attributs, recherches). */
export function plainText(text: string) {
  return text.replace(TOKEN, (_m, b, c, id, label) => b ?? c ?? label ?? id);
}
