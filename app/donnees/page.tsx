import type { Metadata } from "next";
import { DonneesView } from "@/components/views/DonneesView";

export const metadata: Metadata = { title: "Mes données" };

export default function DonneesPage() {
  return <DonneesView />;
}
