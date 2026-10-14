/**
 * Anatomie d'une adresse web (URL), calculée localement. Aucune requête n'est envoyée.
 */
export interface UrlAnatomy {
  scheme: string;
  userinfo: string;
  subdomain: string;
  domain: string;
  port: string;
  path: string;
  query: string;
  fragment: string;
}

/** Domaine « enregistré » : les deux derniers éléments du nom d'hôte (suffisant pour les domaines fictifs utilisés ici). */
export function registrableDomain(host: string): string {
  const labels = host.replace(/\.$/, "").split(".");
  if (labels.length <= 2) return labels.join(".");
  return labels.slice(-2).join(".");
}

export function anatomy(raw: string): UrlAnatomy | null {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }
  const host = u.hostname;
  const domain = registrableDomain(host);
  const subdomain = host.length > domain.length ? host.slice(0, host.length - domain.length - 1) : "";
  const userinfo = u.username ? decodeURIComponent(u.username) + (u.password ? ":" + decodeURIComponent(u.password) : "") : "";
  return {
    scheme: u.protocol.replace(/:$/, ""),
    userinfo,
    subdomain,
    domain,
    port: u.port,
    path: u.pathname === "/" ? "" : u.pathname,
    query: u.search.replace(/^\?/, ""),
    fragment: u.hash.replace(/^#/, ""),
  };
}
