import type { Metadata } from "next";
import { SESSION_METAS } from "@/content/index";
import { WEEKS } from "@/content/programme";
import { ProgrammeView } from "@/components/views/ProgrammeView";

export const metadata: Metadata = { title: "Programme" };

export default function ProgrammePage() {
  return <ProgrammeView metas={SESSION_METAS} weeks={WEEKS} />;
}
