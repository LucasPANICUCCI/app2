"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { GLOSSARY, GLOSSARY_BY_ID } from "@/content/glossaire";
import { IconCross, IconSearch } from "./icons";

interface GlossaryCtx {
  open: (termId?: string) => void;
}

const Ctx = createContext<GlossaryCtx>({ open: () => {} });

export function useGlossary() {
  return useContext(Ctx);
}

function strip(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function GlossaryProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [focusId, setFocusId] = useState<string | undefined>();
  const [query, setQuery] = useState("");

  const open = useCallback((termId?: string) => {
    setFocusId(termId);
    setQuery("");
    const d = dialogRef.current;
    if (d && !d.open) d.showModal();
  }, []);

  useEffect(() => {
    if (!focusId) return;
    const el = document.getElementById(`gl-${focusId}`);
    if (el) {
      el.scrollIntoView({ block: "start" });
      el.focus({ preventScroll: true });
    }
  }, [focusId]);

  const results = useMemo(() => {
    const q = strip(query.trim());
    if (!q) return GLOSSARY;
    return GLOSSARY.filter((g) => strip(g.term).includes(q) || strip(g.definition).includes(q));
  }, [query]);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="glossary-title"
        className="sheet m-0 ml-auto h-dvh max-h-dvh w-full max-w-md border-l border-line bg-surface p-0 text-ink shadow-xl"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
            <h2 id="glossary-title" className="text-xl">
              Glossaire
            </h2>
            <button type="button" className="btn btn-quiet" onClick={() => dialogRef.current?.close()}>
              <IconCross size={18} />
              Fermer
            </button>
          </div>
          <div className="border-b border-line px-5 py-3">
            <label htmlFor="glossary-search" className="sr-only">
              Chercher un terme
            </label>
            <div className="relative">
              <IconSearch size={18} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-soft" />
              <input
                id="glossary-search"
                type="search"
                className="field pl-10"
                placeholder="Chercher un terme"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setFocusId(undefined);
                }}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {results.length === 0 && <p className="text-ink-soft">Aucun terme ne correspond à « {query} ».</p>}
            <dl className="space-y-5">
              {results.map((g) => (
                <div
                  key={g.id}
                  id={`gl-${g.id}`}
                  tabIndex={-1}
                  className={`rounded-xl p-3 outline-none ${focusId === g.id ? "bg-deep-tint ring-2 ring-sky" : ""}`}
                >
                  <dt className="font-serif text-lg font-semibold">{g.term}</dt>
                  <dd className="mt-1 text-[0.98rem]">{g.definition}</dd>
                  {g.example && <dd className="mt-1.5 text-[0.95rem] text-ink-soft">Exemple : {g.example}</dd>}
                  {g.seeAlso && (
                    <dd className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-sm">
                      <span className="text-ink-soft">Voir aussi :</span>
                      {g.seeAlso.map((s) => (
                        <button key={s} type="button" className="term-link" onClick={() => setFocusId(s)}>
                          {GLOSSARY_BY_ID[s]?.term ?? s}
                        </button>
                      ))}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
          <div className="border-t border-line px-5 py-3 text-sm">
            <Link href="/glossaire" className="font-semibold text-deep underline underline-offset-4" onClick={() => dialogRef.current?.close()}>
              Ouvrir le glossaire en pleine page
            </Link>
          </div>
        </div>
      </dialog>
    </Ctx.Provider>
  );
}

/** Mot du texte relié au glossaire. */
export function Term({ id, children }: { id: string; children: ReactNode }) {
  const { open } = useGlossary();
  const entry = GLOSSARY_BY_ID[id];
  if (!entry) return <>{children}</>;
  return (
    <button type="button" className="term-link" onClick={() => open(id)} aria-label={`${typeof children === "string" ? children : entry.term} : voir la définition`}>
      {children}
    </button>
  );
}
