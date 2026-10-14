import { RECALL_NOTIONS, SESSION_METAS } from "@/content/index";
import { WEEKS } from "@/content/programme";
import { HomeView } from "@/components/views/HomeView";

export default function HomePage() {
  return <HomeView metas={SESSION_METAS} weeks={WEEKS} recallNotions={RECALL_NOTIONS} />;
}
