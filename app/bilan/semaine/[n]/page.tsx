import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SESSION_METAS } from "@/content/index";
import { COMPETENCES, WEEKS } from "@/content/programme";
import { BilanSemaineView } from "@/components/views/BilanSemaineView";

export const dynamicParams = false;

export function generateStaticParams() {
  return WEEKS.map((w) => ({ n: String(w.number) }));
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }): Promise<Metadata> {
  const { n } = await params;
  return { title: `Bilan de la semaine ${n}` };
}

export default async function BilanSemainePage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const week = WEEKS.find((w) => String(w.number) === n);
  if (!week) notFound();
  return (
    <BilanSemaineView
      week={week}
      metas={SESSION_METAS.filter((m) => m.week === week.number)}
      competences={COMPETENCES}
      hasNext={week.number < 6}
    />
  );
}
