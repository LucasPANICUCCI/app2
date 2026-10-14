/**
 * Terminal SIMULÉ.
 *
 * Ce module ne fait qu'interpréter du texte sur un petit système de fichiers fictif,
 * déclaré dans le contenu des séances. Il n'exécute aucune commande réelle, n'accède
 * ni au disque ni au réseau, et ne modifie jamais le système de fichiers fictif.
 */
import type { FsDir, FsFile, FsNode } from "@/content/types";

export interface TerminalContext {
  root: FsDir;
  user: string;
  home: string;
  cwd: string;
  previousDir?: string;
  /** Groupes de l'utilisateur (par défaut : un groupe du même nom). */
  groups?: string[];
}

export interface CommandResult {
  output: string;
  error: boolean;
  cwd: string;
  previousDir?: string;
  clear?: boolean;
  command: string;
  args: string[];
}

export const SUPPORTED_COMMANDS: { name: string; usage: string; description: string }[] = [
  { name: "help", usage: "help", description: "affiche cette liste" },
  { name: "pwd", usage: "pwd", description: "affiche le dossier dans lequel tu te trouves" },
  { name: "ls", usage: "ls [-l] [-a] [dossier]", description: "liste le contenu d'un dossier (-l : détails et permissions, -a : fichiers cachés)" },
  { name: "cd", usage: "cd dossier", description: "change de dossier (.. remonte d'un niveau, ~ revient au dossier personnel)" },
  { name: "cat", usage: "cat fichier", description: "affiche le contenu d'un fichier" },
  { name: "head", usage: "head [-n N] fichier", description: "affiche les premières lignes (10 par défaut)" },
  { name: "tail", usage: "tail [-n N] fichier", description: "affiche les dernières lignes (10 par défaut)" },
  { name: "grep", usage: "grep [-i] [-n] [-c] [-r] motif fichier", description: "cherche un texte dans un fichier (-i : sans tenir compte des majuscules, -n : numéros de ligne, -c : compte, -r : dans tout un dossier)" },
  { name: "wc", usage: "wc -l fichier", description: "compte les lignes d'un fichier" },
  { name: "whoami", usage: "whoami", description: "affiche ton nom d'utilisateur" },
  { name: "clear", usage: "clear", description: "efface l'écran" },
];

const EXPLAINED_UNSUPPORTED: Record<string, string> = {
  sudo: "sudo permet d'agir avec les droits d'administrateur. Il n'est volontairement pas disponible ici : cet exercice se fait avec les droits d'un utilisateur ordinaire.",
  rm: "rm supprime des fichiers. Cette simulation est en lecture seule : rien ne peut être supprimé.",
  mv: "mv déplace ou renomme des fichiers. Cette simulation est en lecture seule.",
  cp: "cp copie des fichiers. Cette simulation est en lecture seule.",
  touch: "touch crée un fichier vide. Cette simulation est en lecture seule.",
  mkdir: "mkdir crée un dossier. Cette simulation est en lecture seule.",
  chmod: "chmod modifie les permissions. Dans cette simulation, on observe les permissions sans les changer.",
  chown: "chown change le propriétaire d'un fichier. Ce n'est pas disponible dans cette simulation.",
  nano: "nano est un éditeur de texte. Pour lire un fichier ici, utilise cat.",
  vi: "vi est un éditeur de texte. Pour lire un fichier ici, utilise cat.",
  vim: "vim est un éditeur de texte. Pour lire un fichier ici, utilise cat.",
  less: "less affiche un fichier page par page. Ici, utilise cat, head ou tail.",
  more: "more affiche un fichier page par page. Ici, utilise cat, head ou tail.",
  find: "find cherche des fichiers par leur nom. Ici, utilise ls dans chaque dossier, ou grep -r pour chercher un texte.",
  ping: "ping envoie des paquets à une machine du réseau. Ce terminal n'a aucun accès au réseau.",
  curl: "curl télécharge une page web. Ce terminal n'a aucun accès au réseau.",
  wget: "wget télécharge un fichier. Ce terminal n'a aucun accès au réseau.",
  ssh: "ssh ouvre une session sur une autre machine. Ce terminal n'a aucun accès au réseau.",
  exit: "Il n'y a rien à quitter : ce terminal est une simulation intégrée à la page.",
  echo: "echo affiche un texte. Il n'est pas nécessaire pour ces exercices.",
  history: "Utilise les flèches haut et bas du clavier pour retrouver tes commandes précédentes.",
  man: "man affiche le manuel d'une commande. Ici, tape help pour voir les commandes et leurs options.",
};

/* ------------------------------------------------------------------ */
/* Chemins                                                            */
/* ------------------------------------------------------------------ */

export function normalizePath(path: string): string {
  const parts: string[] = [];
  for (const segment of path.split("/")) {
    if (!segment || segment === ".") continue;
    if (segment === "..") parts.pop();
    else parts.push(segment);
  }
  return "/" + parts.join("/");
}

export function resolvePath(ctx: TerminalContext, input: string): string {
  let target = input;
  if (target === "~" || target.startsWith("~/")) target = ctx.home + target.slice(1);
  if (!target.startsWith("/")) target = (ctx.cwd === "/" ? "" : ctx.cwd) + "/" + target;
  return normalizePath(target);
}

export function findNode(root: FsDir, path: string): FsNode | null {
  const normalized = normalizePath(path);
  if (normalized === "/") return root;
  let node: FsNode = root;
  for (const segment of normalized.slice(1).split("/")) {
    if (node.type !== "dir") return null;
    const next: FsNode | undefined = node.children.find((c) => c.name === segment);
    if (!next) return null;
    node = next;
  }
  return node;
}

function displayPath(ctx: TerminalContext, path: string): string {
  if (path === ctx.home) return "~";
  if (path.startsWith(ctx.home + "/")) return "~" + path.slice(ctx.home.length);
  return path;
}

export function promptLabel(ctx: TerminalContext, host: string): string {
  return `${ctx.user}@${host}:${displayPath(ctx, ctx.cwd)}$`;
}

/* ------------------------------------------------------------------ */
/* Permissions                                                        */
/* ------------------------------------------------------------------ */

function permsOf(node: FsNode): string {
  if (node.perms) return node.perms;
  return node.type === "dir" ? "drwxr-xr-x" : "-rw-r--r--";
}

function ownerOf(node: FsNode, ctx: TerminalContext): string {
  return node.owner ?? ctx.user;
}

function groupOf(node: FsNode, ctx: TerminalContext): string {
  return node.group ?? node.owner ?? ctx.user;
}

/** Vérifie un droit (r, w, x) pour l'utilisateur courant, selon le modèle propriétaire / groupe / autres. */
export function can(node: FsNode, ctx: TerminalContext, right: "r" | "w" | "x"): boolean {
  const perms = permsOf(node);
  const offset = right === "r" ? 0 : right === "w" ? 1 : 2;
  if (ownerOf(node, ctx) === ctx.user) return perms[1 + offset] === right;
  const groups = ctx.groups ?? [ctx.user];
  if (groups.includes(groupOf(node, ctx))) return perms[4 + offset] === right;
  return perms[7 + offset] === right;
}

/* ------------------------------------------------------------------ */
/* Analyse de la ligne de commande                                     */
/* ------------------------------------------------------------------ */

export function tokenize(line: string): { tokens: string[]; error?: string } {
  const tokens: string[] = [];
  let current = "";
  let quote: '"' | "'" | null = null;
  let hasToken = false;
  for (const ch of line) {
    if (quote) {
      if (ch === quote) quote = null;
      else current += ch;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      hasToken = true;
      continue;
    }
    if (/\s/.test(ch)) {
      if (hasToken) tokens.push(current);
      current = "";
      hasToken = false;
      continue;
    }
    current += ch;
    hasToken = true;
  }
  if (quote) return { tokens, error: "Il manque un guillemet fermant. Vérifie que chaque \" ouvert est bien refermé." };
  if (hasToken) tokens.push(current);
  return { tokens };
}

function splitFlags(args: string[]): { flags: Set<string>; rest: string[]; numeric?: number; bad?: string } {
  const flags = new Set<string>();
  const rest: string[] = [];
  let numeric: number | undefined;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "-n" && i + 1 < args.length && /^\d+$/.test(args[i + 1])) {
      flags.add("n");
      numeric = Number(args[i + 1]);
      i++;
      continue;
    }
    if (/^-\d+$/.test(a)) {
      numeric = Number(a.slice(1));
      continue;
    }
    if (a.startsWith("-") && a.length > 1) {
      for (const f of a.slice(1)) flags.add(f);
      continue;
    }
    rest.push(a);
  }
  return { flags, rest, numeric };
}

function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

function suggest(name: string): string | null {
  let best: string | null = null;
  let bestScore = Infinity;
  for (const c of SUPPORTED_COMMANDS) {
    const d = levenshtein(name.toLowerCase(), c.name);
    if (d < bestScore) {
      bestScore = d;
      best = c.name;
    }
  }
  return bestScore <= 2 ? best : null;
}

/* ------------------------------------------------------------------ */
/* Exécution simulée                                                  */
/* ------------------------------------------------------------------ */

export function runCommand(ctx: TerminalContext, line: string): CommandResult {
  const base = { cwd: ctx.cwd, previousDir: ctx.previousDir };
  const trimmed = line.trim();
  if (!trimmed) return { ...base, output: "", error: false, command: "", args: [] };

  if (/[|><;&]/.test(trimmed.replace(/"[^"]*"|'[^']*'/g, ""))) {
    return {
      ...base,
      output:
        "Les symboles | > < ; & servent à enchaîner ou rediriger des commandes. Cette simulation ne les prend pas en charge : tape une seule commande à la fois.",
      error: true,
      command: "",
      args: [],
    };
  }

  const { tokens, error } = tokenize(trimmed);
  if (error) return { ...base, output: error, error: true, command: "", args: [] };
  const [command, ...args] = tokens;
  const result = (output: string, isError = false, extra: Partial<CommandResult> = {}): CommandResult => ({
    ...base,
    output,
    error: isError,
    command,
    args,
    ...extra,
  });

  if (command !== command.toLowerCase() && SUPPORTED_COMMANDS.some((c) => c.name === command.toLowerCase())) {
    return result(`${command} : commande introuvable. Le terminal distingue majuscules et minuscules : essaie ${command.toLowerCase()}.`, true);
  }

  switch (command) {
    case "help":
      return result(
        [
          "Commandes disponibles dans ce terminal simulé :",
          ...SUPPORTED_COMMANDS.map((c) => `  ${c.usage.padEnd(38)} ${c.description}`),
          "",
          "Astuces : les flèches haut/bas rappellent tes commandes, Tab complète un nom de fichier.",
          "Les dossiers sont affichés avec un / à la fin.",
        ].join("\n"),
      );

    case "pwd":
      return result(ctx.cwd);

    case "whoami":
      return result(ctx.user);

    case "clear":
      return result("", false, { clear: true });

    case "cd": {
      const { rest } = splitFlags(args);
      if (rest.length > 1) return result("cd : un seul dossier à la fois. Exemple : cd documents", true);
      let targetInput = rest[0] ?? "~";
      if (targetInput === "-") {
        if (!ctx.previousDir) return result("cd : il n'y a pas encore de dossier précédent.", true);
        targetInput = ctx.previousDir;
      }
      const target = resolvePath(ctx, targetInput);
      const node = findNode(ctx.root, target);
      if (!node) return result(`cd : ${targetInput} : dossier introuvable. Tape ls pour voir ce qui existe ici.`, true);
      if (node.type !== "dir") return result(`cd : ${targetInput} est un fichier, pas un dossier. Pour le lire, utilise cat ${targetInput}`, true);
      if (!can(node, ctx, "x"))
        return result(`cd : ${targetInput} : permission refusée. Les permissions de ce dossier ne t'autorisent pas à y entrer (droit x manquant).`, true);
      return result("", false, { cwd: target, previousDir: ctx.cwd });
    }

    case "ls": {
      const { flags, rest } = splitFlags(args);
      const unknown = [...flags].filter((f) => !"la".includes(f));
      if (unknown.length) return result(`ls : option -${unknown[0]} non prise en charge ici. Options disponibles : -l et -a.`, true);
      const targets = rest.length ? rest : ["."];
      const blocks: string[] = [];
      let anyError = false;
      for (const t of targets) {
        const path = resolvePath(ctx, t);
        const node = findNode(ctx.root, path);
        if (!node) {
          blocks.push(`ls : ${t} : aucun fichier ou dossier de ce nom.`);
          anyError = true;
          continue;
        }
        if (node.type === "file") {
          blocks.push(flags.has("l") ? longLine(node, ctx) : node.name);
          continue;
        }
        if (!can(node, ctx, "r")) {
          blocks.push(`ls : ${t} : permission refusée. Tu n'as pas le droit de lire le contenu de ce dossier (droit r manquant).`);
          anyError = true;
          continue;
        }
        const children = node.children
          .filter((c) => flags.has("a") || !c.name.startsWith("."))
          .sort((a, b) => a.name.localeCompare(b.name, "fr"));
        const lines = flags.has("l")
          ? children.map((c) => longLine(c, ctx))
          : [children.map((c) => (c.type === "dir" ? c.name + "/" : c.name)).join("   ")];
        const body = children.length ? lines.join("\n") : "(dossier vide)";
        blocks.push(targets.length > 1 ? `${t} :\n${body}` : body);
      }
      return result(blocks.join("\n\n"), anyError);
    }

    case "cat": {
      const { flags, rest } = splitFlags(args);
      if (flags.size) return result("cat : les options ne sont pas prises en charge ici. Écris simplement : cat nom_du_fichier", true);
      if (!rest.length) return result("cat : indique le fichier à lire. Exemple : cat notes.txt", true);
      const outputs: string[] = [];
      let anyError = false;
      for (const t of rest) {
        const read = readFile(ctx, t, "cat");
        if (typeof read === "string") {
          outputs.push(read);
          anyError = true;
        } else outputs.push(read.content.replace(/\n$/, ""));
      }
      return result(outputs.join("\n"), anyError);
    }

    case "head":
    case "tail": {
      const { flags, rest, numeric } = splitFlags(args);
      const unknown = [...flags].filter((f) => f !== "n");
      if (unknown.length) return result(`${command} : option -${unknown[0]} non prise en charge. Exemple : ${command} -n 5 fichier.txt`, true);
      if (flags.has("n") && numeric === undefined) return result(`${command} : après -n, indique un nombre. Exemple : ${command} -n 5 fichier.txt`, true);
      if (rest.length !== 1) return result(`${command} : indique un seul fichier. Exemple : ${command} -n 5 fichier.txt`, true);
      const read = readFile(ctx, rest[0], command);
      if (typeof read === "string") return result(read, true);
      const n = numeric ?? 10;
      const lines = read.content.replace(/\n$/, "").split("\n");
      return result((command === "head" ? lines.slice(0, n) : lines.slice(-n)).join("\n"));
    }

    case "wc": {
      const { flags, rest } = splitFlags(args);
      if (!flags.has("l") || rest.length !== 1) return result("wc : seule la forme wc -l fichier est disponible ici (elle compte les lignes).", true);
      const read = readFile(ctx, rest[0], "wc");
      if (typeof read === "string") return result(read, true);
      const count = read.content.replace(/\n$/, "").split("\n").length;
      return result(`${count} ${rest[0]}`);
    }

    case "grep": {
      const { flags, rest } = splitFlags(args);
      const unknown = [...flags].filter((f) => !"inrc".includes(f));
      if (unknown.length) return result(`grep : option -${unknown[0]} non prise en charge. Options disponibles : -i, -n, -c, -r.`, true);
      if (rest.length < 2)
        return result("grep : il faut un motif puis un fichier. Exemple : grep erreur journal.log (mets le motif entre guillemets s'il contient des espaces).", true);
      const [pattern, ...targets] = rest;
      const files: { label: string; file: FsFile }[] = [];
      const errors: string[] = [];
      for (const t of targets) {
        const path = resolvePath(ctx, t);
        const node = findNode(ctx.root, path);
        if (!node) {
          errors.push(`grep : ${t} : aucun fichier ou dossier de ce nom.`);
          continue;
        }
        if (node.type === "dir") {
          if (!flags.has("r")) {
            errors.push(`grep : ${t} est un dossier. Pour chercher dans tout un dossier, ajoute l'option -r.`);
            continue;
          }
          collectFiles(node, t.replace(/\/$/, ""), ctx, files, errors);
          continue;
        }
        if (!can(node, ctx, "r")) {
          errors.push(`grep : ${t} : permission refusée.`);
          continue;
        }
        files.push({ label: t, file: node });
      }
      const multi = files.length > 1 || flags.has("r");
      const needle = flags.has("i") ? pattern.toLowerCase() : pattern;
      const out: string[] = [];
      for (const { label, file } of files) {
        const lines = file.content.replace(/\n$/, "").split("\n");
        const matches: string[] = [];
        lines.forEach((l, idx) => {
          const hay = flags.has("i") ? l.toLowerCase() : l;
          if (hay.includes(needle)) matches.push((flags.has("n") ? `${idx + 1}:` : "") + l);
        });
        if (flags.has("c")) out.push(multi ? `${label}:${matches.length}` : String(matches.length));
        else out.push(...matches.map((m) => (multi ? `${label}:${m}` : m)));
      }
      const output = [...errors, ...out].join("\n");
      if (!out.length && !errors.length)
        return result(`(aucune ligne ne contient « ${pattern} »${flags.has("i") ? "" : " ; grep distingue les majuscules, essaie -i"})`);
      return result(output, errors.length > 0 && out.length === 0);
    }

    default: {
      if (EXPLAINED_UNSUPPORTED[command]) return result(`${command} : non disponible dans cette simulation. ${EXPLAINED_UNSUPPORTED[command]}`, true);
      const s = suggest(command);
      return result(
        `${command} : commande introuvable.${s ? ` Voulais-tu écrire ${s} ?` : ""} Tape help pour voir les commandes disponibles.`,
        true,
      );
    }
  }
}

function readFile(ctx: TerminalContext, input: string, command: string): FsFile | string {
  const path = resolvePath(ctx, input);
  const node = findNode(ctx.root, path);
  if (!node) return `${command} : ${input} : aucun fichier de ce nom. Vérifie l'orthographe avec ls.`;
  if (node.type === "dir") return `${command} : ${input} est un dossier. Pour voir son contenu, utilise ls ${input}`;
  if (!can(node, ctx, "r"))
    return `${command} : ${input} : permission refusée. Les permissions de ce fichier ne t'autorisent pas à le lire (vérifie avec ls -l).`;
  return node;
}

function collectFiles(dir: FsDir, label: string, ctx: TerminalContext, acc: { label: string; file: FsFile }[], errors: string[]) {
  if (!can(dir, ctx, "r") || !can(dir, ctx, "x")) {
    errors.push(`grep : ${label} : permission refusée.`);
    return;
  }
  for (const child of [...dir.children].sort((a, b) => a.name.localeCompare(b.name, "fr"))) {
    const childLabel = `${label}/${child.name}`;
    if (child.type === "dir") collectFiles(child, childLabel, ctx, acc, errors);
    else if (can(child, ctx, "r")) acc.push({ label: childLabel, file: child });
    else errors.push(`grep : ${childLabel} : permission refusée.`);
  }
}

function longLine(node: FsNode, ctx: TerminalContext): string {
  const size = node.type === "file" ? new TextEncoder().encode(node.content).length : 4096;
  return [permsOf(node), ownerOf(node, ctx).padEnd(8), groupOf(node, ctx).padEnd(8), String(size).padStart(5), node.type === "dir" ? node.name + "/" : node.name].join("  ");
}

/** Complétion par Tab : complète le dernier mot avec un nom de fichier ou de commande. */
export function complete(ctx: TerminalContext, line: string): string {
  const match = line.match(/^(.*?)(\S*)$/);
  if (!match) return line;
  const [, before, word] = match;
  if (!before.trim()) {
    const cmds = SUPPORTED_COMMANDS.map((c) => c.name).filter((n) => n.startsWith(word));
    return cmds.length === 1 ? before + cmds[0] + " " : line;
  }
  const slash = word.lastIndexOf("/");
  const dirPart = slash >= 0 ? word.slice(0, slash + 1) : "";
  const namePart = slash >= 0 ? word.slice(slash + 1) : word;
  const dirNode = findNode(ctx.root, resolvePath(ctx, dirPart || "."));
  if (!dirNode || dirNode.type !== "dir" || !can(dirNode, ctx, "r")) return line;
  const candidates = dirNode.children.filter((c) => c.name.startsWith(namePart) && (namePart.startsWith(".") || !c.name.startsWith(".")));
  if (candidates.length === 1) {
    const c = candidates[0];
    return before + dirPart + c.name + (c.type === "dir" ? "/" : " ");
  }
  if (candidates.length > 1) {
    let prefix = candidates[0].name;
    for (const c of candidates) while (!c.name.startsWith(prefix)) prefix = prefix.slice(0, -1);
    return before + dirPart + prefix;
  }
  return line;
}
