import type { Metadata } from "next";
import Link from "next/link";
import { WEEKS } from "@/content/programme";

export const metadata: Metadata = { title: "Bilans" };

export default function BilansPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 pb-16 sm:px-6 sm:pt-12">
      <h1 className="text-[2.1rem] sm:text-[2.6rem]">Bilans</h1>
      <p className="mt-2 text-[1.08rem] text-ink-soft">
        Un bilan par semaine pour voir les compétences travaillées, et un bilan final qui compare tes débuts à tes derniers exercices.
      </p>
      <ol className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
        {WEEKS.map((w) => (
          <li key={w.number}>
            <Link href={`/bilan/semaine/${w.number}`} className="block px-5 py-4 hover:bg-paper">
              <span className="block text-sm font-semibold text-ink-soft">Semaine {w.number}</span>
              <span className="font-serif text-lg font-semibold">{w.title}</span>
            </Link>
          </li>
        ))}
      </ol>
      <Link href="/bilan/final" className="card mt-5 block border-green/40 p-5 hover:border-green">
        <span className="font-serif text-xl font-semibold text-green-strong">Bilan final</span>
        <span className="mt-1 block text-ink-soft">Premiers acquis, derniers exercices et évolution de ta confiance.</span>
      </Link>
    </div>
  );
}
