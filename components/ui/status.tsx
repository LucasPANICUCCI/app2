import type { SessionKind } from "@/content/types";
import type { SessionStatus } from "@/lib/progress";

export const STATUS_LABEL: Record<SessionStatus, string> = {
  a_decouvrir: "À découvrir",
  en_cours: "En cours",
  termine: "Terminé",
  a_revoir: "À revoir",
};

const STATUS_STYLE: Record<SessionStatus, string> = {
  a_decouvrir: "text-ink-soft bg-sunken",
  en_cours: "text-deep bg-deep-tint",
  termine: "text-green-strong bg-green-tint",
  a_revoir: "text-amber bg-amber-tint",
};

/**
 * Marque d'état : la forme dit le type de séance (rond : apprentissage, losange : défi,
 * carré arrondi : révision), le remplissage dit l'état. Toujours accompagnée d'un texte.
 */
export function StatusMark({ status, kind = "apprentissage", size = 18 }: { status: SessionStatus; kind?: SessionKind; size?: number }) {
  const stroke = {
    a_decouvrir: "var(--color-line-strong)",
    en_cours: "var(--color-deep)",
    termine: "var(--color-green)",
    a_revoir: "var(--color-amber)",
  }[status];
  const fill = status === "termine" ? "var(--color-green)" : status === "a_revoir" ? "var(--color-amber)" : "var(--color-surface)";

  const shape = (props: { fill: string; clip?: string }) => {
    if (kind === "defi") return <rect x="5" y="5" width="14" height="14" rx="2" transform="rotate(45 12 12)" fill={props.fill} clipPath={props.clip} />;
    if (kind === "revision") return <rect x="4" y="4" width="16" height="16" rx="5" fill={props.fill} clipPath={props.clip} />;
    return <circle cx="12" cy="12" r="8.5" fill={props.fill} clipPath={props.clip} />;
  };
  const clipId = `half-${kind}`;

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="flex-none">
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width="12" height="24" />
        </clipPath>
      </defs>
      <g stroke={stroke} strokeWidth="2">{shape({ fill })}</g>
      {status === "en_cours" && <g>{shape({ fill: "var(--color-deep)", clip: `url(#${clipId})` })}</g>}
      {status === "termine" && <path d="M8 12.3l2.7 2.7L16.2 9.5" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
      {status === "a_revoir" && <path d="M12 7.5v5.2M12 15.8v.4" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" />}
    </svg>
  );
}

export function StatusBadge({ status, kind }: { status: SessionStatus; kind?: SessionKind }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-sm font-semibold ${STATUS_STYLE[status]}`}>
      <StatusMark status={status} kind={kind} size={15} />
      {STATUS_LABEL[status]}
    </span>
  );
}

export function ProgressBar({ value, max, label, tone = "deep" }: { value: number; max: number; label: string; tone?: "deep" | "green" }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value} sur ${max}`}
        className="h-2.5 w-full overflow-hidden rounded-full bg-sunken"
      >
        <div className={`h-full rounded-full ${tone === "green" ? "bg-green" : "bg-deep"} transition-[width] duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
