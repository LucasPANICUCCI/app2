import type { Metadata } from "next";
import { GLOSSARY, GLOSSARY_BY_ID } from "@/content/glossaire";

export const metadata: Metadata = { title: "Glossaire" };

export default function GlossairePage() {
  const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term, "fr", { sensitivity: "base" }));
  const letters = [...new Set(sorted.map((g) => g.term[0].toUpperCase().normalize("NFD")[0]))];
  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12">
      <h1 className="text-[2.1rem] sm:text-[2.6rem]">Glossaire</h1>
      <p className="mt-2 text-[1.08rem] text-ink-soft">
        {GLOSSARY.length} termes expliqués simplement. Pendant une séance, le bouton « Glossaire » en haut de l'écran ouvre ces définitions sans quitter l'exercice.
      </p>
      <nav aria-label="Lettres" className="mt-6 flex flex-wrap gap-1.5">
        {letters.map((l) => (
          <a key={l} href={`#lettre-${l}`} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface font-semibold text-deep hover:border-deep">
            {l}
          </a>
        ))}
      </nav>
      <div className="mt-8 space-y-10">
        {letters.map((l) => (
          <section key={l} id={`lettre-${l}`} aria-labelledby={`h-${l}`} className="scroll-mt-24">
            <h2 id={`h-${l}`} className="border-b border-line pb-1 text-2xl text-deep">
              {l}
            </h2>
            <dl className="mt-4 space-y-6">
              {sorted
                .filter((g) => g.term[0].toUpperCase().normalize("NFD")[0] === l)
                .map((g) => (
                  <div key={g.id} id={g.id} className="scroll-mt-24">
                    <dt className="font-serif text-xl font-semibold">{g.term}</dt>
                    <dd className="mt-1">{g.definition}</dd>
                    {g.example && <dd className="mt-1 text-ink-soft">Exemple : {g.example}</dd>}
                    {g.seeAlso && (
                      <dd className="mt-1 text-sm text-ink-soft">
                        Voir aussi :{" "}
                        {g.seeAlso.map((s, i) => (
                          <span key={s}>
                            {i > 0 && ", "}
                            <a href={`#${s}`} className="font-semibold text-deep underline underline-offset-4">
                              {GLOSSARY_BY_ID[s]?.term ?? s}
                            </a>
                          </span>
                        ))}
                      </dd>
                    )}
                  </div>
                ))}
            </dl>
          </section>
        ))}
      </div>
    </div>
  );
}
