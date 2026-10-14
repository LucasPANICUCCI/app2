import type { FsDir, FsFile, FsNode } from "./types";

type Meta = { perms?: string; owner?: string; group?: string };

/** Raccourcis pour déclarer les systèmes de fichiers fictifs des exercices. */
export const file = (name: string, content: string, meta: Meta = {}): FsFile => ({ type: "file", name, content, ...meta });
export const dir = (name: string, children: FsNode[], meta: Meta = {}): FsDir => ({ type: "dir", name, children, ...meta });

/** Arborescence standard /home/<user> enveloppée dans une racine. */
export function homeRoot(user: string, children: FsNode[], extraRoot: FsNode[] = []): FsDir {
  return dir("", [dir("home", [dir(user, children)], { owner: "root" }), ...extraRoot], { owner: "root" });
}
