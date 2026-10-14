import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SESSIONS, getSession } from "@/content/index";
import { WEEKS } from "@/content/programme";
import { SessionView } from "@/components/session/SessionView";

export const dynamicParams = false;

export function generateStaticParams() {
  return SESSIONS.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const s = getSession(id);
  return { title: s ? `Jour ${s.day} : ${s.title}` : "Séance" };
}

export default async function SeancePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = SESSIONS.findIndex((s) => s.id === id);
  if (index < 0) notFound();
  const session = SESSIONS[index];
  const nav = (i: number) => (SESSIONS[i] ? { id: SESSIONS[i].id, day: SESSIONS[i].day, title: SESSIONS[i].title } : undefined);
  const week = WEEKS.find((w) => w.number === session.week)!;
  return <SessionView session={session} weekTitle={week.title} prev={nav(index - 1)} next={nav(index + 1)} />;
}
