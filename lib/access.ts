import type { AccessExercise, AccessRequest } from "@/content/types";

/** Décision simulée d'accès : autorisé si le rôle possède la permission, et si l'élément appartient à l'utilisateur quand la ressource l'exige. */
export function decide(
  ex: Pick<AccessExercise, "users" | "ownerScoped" | "bypassRoles">,
  perms: Record<string, string[]>,
  req: Pick<AccessRequest, "userId" | "action" | "resourceId" | "ownerId">,
): boolean {
  const user = ex.users.find((u) => u.id === req.userId);
  if (!user) return false;
  const granted = (perms[user.role] ?? []).includes(`${req.resourceId}:${req.action}`);
  if (!granted) return false;
  const scoped = ex.ownerScoped?.includes(req.resourceId);
  if (scoped && req.ownerId && req.ownerId !== user.id && !ex.bypassRoles?.includes(user.role)) return false;
  return true;
}
