"use client";

import { useRef, useState } from "react";
import { exportJson, parseImport, progressActions, useProgress, type ProgressState } from "@/lib/progress";
import { IconCheck, IconDownload, IconUpload } from "@/components/ui/icons";

function summarize(s: ProgressState) {
  const done = Object.values(s.sessions).filter((r) => r.completedAt).length;
  const notes = Object.keys(s.notes).length;
  return `${done} séance${done > 1 ? "s" : ""} terminée${done > 1 ? "s" : ""}, ${notes} séance${notes > 1 ? "s" : ""} annotée${notes > 1 ? "s" : ""}`;
}

export function DonneesView() {
  const { state, hydrated, storageOk } = useProgress();
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<{ state: ProgressState; name: string } | null>(null);
  const [message, setMessage] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const download = () => {
    const blob = new Blob([exportJson(state)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vigie-progression-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage({ tone: "ok", text: "Export téléchargé. Garde ce fichier : il permet de retrouver ta progression ici ou sur un autre appareil." });
  };

  const onFile = async (file: File | undefined) => {
    setMessage(null);
    setPending(null);
    if (!file) return;
    if (file.size > 2_000_000) {
      setMessage({ tone: "error", text: "Ce fichier est trop volumineux pour être un export de progression." });
      return;
    }
    const result = parseImport(await file.text());
    if (!result.ok) setMessage({ tone: "error", text: result.error });
    else setPending({ state: result.state, name: file.name });
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12">
      <h1 className="text-[2.1rem] sm:text-[2.6rem]">Mes données</h1>
      <p className="mt-2 text-[1.08rem] text-ink-soft">
        Ta progression, tes notes et tes réponses sont enregistrées uniquement dans ce navigateur, sur cet appareil. Aucun compte, aucun serveur : rien n'est
        envoyé ailleurs. En contrepartie, effacer les données du navigateur efface aussi ta progression. L'export te permet de la conserver ou de la transférer.
      </p>

      {hydrated && (
        <p className="mt-4 rounded-xl border border-line bg-surface px-4 py-3">
          <span className="font-semibold">Actuellement : </span>
          {summarize(state)}.{!storageOk && " La sauvegarde locale semble bloquée dans ce navigateur : exporte avant de fermer l'onglet."}
        </p>
      )}

      <div aria-live="polite" className="mt-4">
        {message && (
          <p className={`rounded-xl px-4 py-3 ${message.tone === "ok" ? "bg-green-tint text-green-strong" : "bg-red-tint text-red"}`}>
            {message.tone === "ok" && <IconCheck size={18} className="mr-1.5 inline align-[-3px]" />}
            {message.text}
          </p>
        )}
      </div>

      <section aria-labelledby="export" className="card mt-6 p-5 sm:p-6">
        <h2 id="export" className="text-xl">
          Exporter
        </h2>
        <p className="mt-1 text-ink-soft">Télécharge un fichier JSON contenant toute ta progression. Il ne contient que ce que tu as fait dans cette application.</p>
        <button type="button" className="btn btn-primary mt-4" onClick={download} disabled={!hydrated}>
          <IconDownload size={18} />
          Exporter ma progression
        </button>
      </section>

      <section aria-labelledby="import" className="card mt-5 p-5 sm:p-6">
        <h2 id="import" className="text-xl">
          Importer
        </h2>
        <p className="mt-1 text-ink-soft">Choisis un fichier produit par « Exporter ». Tu pourras vérifier son contenu avant de remplacer ta progression actuelle.</p>
        <label className="btn btn-secondary mt-4 cursor-pointer has-[input:focus-visible]:outline-3 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-focus">
          <IconUpload size={18} />
          Choisir un fichier
          <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
        </label>
        {pending && (
          <div className="reveal mt-4 rounded-xl border border-amber/40 bg-amber-tint p-4">
            <p className="font-semibold">Fichier « {pending.name} » valide.</p>
            <p className="mt-1">
              Il contient : {summarize(pending.state)}. L'importer remplacera ta progression actuelle ({summarize(state)}).
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  progressActions.replace(pending.state);
                  setPending(null);
                  setMessage({ tone: "ok", text: "Progression importée." });
                }}
              >
                Remplacer par ce fichier
              </button>
              <button type="button" className="btn btn-quiet" onClick={() => setPending(null)}>
                Annuler
              </button>
            </div>
          </div>
        )}
      </section>

      <section aria-labelledby="reset" className="mt-5 rounded-[18px] border border-red/30 bg-surface p-5 sm:p-6">
        <h2 id="reset" className="text-xl">
          Réinitialiser
        </h2>
        <p className="mt-1 text-ink-soft">Efface toute la progression, les notes et les réponses de ce navigateur, pour recommencer au jour 1.</p>
        {!confirmReset ? (
          <button type="button" className="btn btn-secondary mt-4 !border-red/50 !text-red" onClick={() => setConfirmReset(true)}>
            Réinitialiser ma progression
          </button>
        ) : (
          <div role="alertdialog" aria-labelledby="reset-confirm" className="reveal mt-4 rounded-xl bg-red-tint p-4">
            <p id="reset-confirm" className="font-semibold text-red">
              Tout effacer ? Cette action est définitive.
            </p>
            <p className="mt-1">Si tu veux pouvoir revenir en arrière, exporte d'abord ta progression.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  progressActions.reset();
                  setConfirmReset(false);
                  setMessage({ tone: "ok", text: "Progression réinitialisée. Tu repars du jour 1." });
                }}
              >
                Oui, tout effacer
              </button>
              <button type="button" className="btn btn-secondary" onClick={download}>
                Exporter d'abord
              </button>
              <button type="button" className="btn btn-quiet" autoFocus onClick={() => setConfirmReset(false)}>
                Annuler
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
