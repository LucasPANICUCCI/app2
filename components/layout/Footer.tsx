import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Ta progression et tes notes restent dans ce navigateur, rien n'est envoyé ailleurs.{" "}
          <Link href="/donnees" className="font-semibold text-deep underline underline-offset-4">
            Exporter pour les conserver ou les transférer
          </Link>
        </p>
        <p>Exercices fictifs, domaines réservés aux exemples.</p>
      </div>
    </footer>
  );
}
