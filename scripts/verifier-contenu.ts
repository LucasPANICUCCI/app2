/**
 * Vérification automatique du contenu pédagogique.
 *   npm run verifier
 *
 * Contrôle : structure des 42 séances, cohérence des réponses, rejouabilité des solutions
 * du terminal simulé, configurations d'accès, références au glossaire, et usage exclusif
 * de domaines et d'adresses IP réservés aux exemples.
 */
import { SESSIONS } from "../content/index";
import { GLOSSARY, GLOSSARY_BY_ID } from "../content/glossaire";
import { COMPETENCES, WEEKS } from "../content/programme";
import type { AccessExercise, ChoiceQuestion, Exercise, MessagePart, Session, TerminalExercise } from "../content/types";
import { runCommand, type CommandResult, type TerminalContext } from "../lib/terminal";
import { taskSatisfied } from "../lib/terminal-tasks";
import { decide } from "../lib/access";
import { registrableDomain } from "../lib/url";

const errors: string[] = [];
const warnings: string[] = [];
const err = (s: Session | null, msg: string) => errors.push(`${s ? s.id : "global"} : ${msg}`);

/* ------------------------------------------------------------------ */
/* Structure du programme                                             */
/* ------------------------------------------------------------------ */

if (SESSIONS.length !== 42) err(null, `42 séances attendues, ${SESSIONS.length} trouvées`);
if (WEEKS.length !== 6) err(null, "6 semaines attendues");
const ids = new Set<string>();

SESSIONS.forEach((s, i) => {
  const day = i + 1;
  if (s.day !== day) err(s, `jour ${s.day} au lieu de ${day}`);
  if (s.id !== `j${String(day).padStart(2, "0")}`) err(s, "identifiant inattendu");
  if (ids.has(s.id)) err(s, "identifiant en double");
  ids.add(s.id);
  if (s.week !== Math.ceil(day / 7)) err(s, "numéro de semaine incohérent");
  const expectedKind = day % 7 === 6 ? "defi" : day % 7 === 0 ? "revision" : "apprentissage";
  if (s.kind !== expectedKind) err(s, `type ${s.kind} au lieu de ${expectedKind}`);
  if (!s.title.trim() || !s.objective.trim()) err(s, "titre ou objectif vide");
  if (s.duration < 10 || s.duration > 20) err(s, `durée ${s.duration} min hors de la plage 10-20`);
  if (s.learn.paragraphs.length < 2) err(s, "explication trop courte");
  if (!s.learn.example.title || s.learn.example.paragraphs.length < 1) err(s, "exemple du quotidien manquant");
  if (s.hints.length !== 2 || s.hints.some((h) => h.trim().length < 15)) err(s, "deux indices consistants attendus");
  if (s.summary.length !== 3 || s.summary.some((h) => !h.trim())) err(s, "résumé en trois points attendu");
  if (s.correction.length < 1 || s.correction.some((c) => c.trim().length < 20)) err(s, "correction manquante");
  if (!s.exercise.instructions.trim() || !s.exercise.retry.trim()) err(s, "consigne ou raisonnement d'erreur manquant");
  for (const n of s.notions) if (!GLOSSARY_BY_ID[n]) err(s, `notion inconnue du glossaire : ${n}`);
  for (const c of s.competences) if (!COMPETENCES.some((x) => x.id === c)) err(s, `compétence inconnue : ${c}`);
  if (day >= 2) {
    if (!s.recall) err(s, "question de rappel manquante");
    else {
      if (s.recall.fromDay >= day) err(s, "le rappel doit porter sur un jour précédent");
      if (!GLOSSARY_BY_ID[s.recall.notion]) err(s, `notion de rappel inconnue : ${s.recall.notion}`);
      if (!s.recall.options.some((o) => o.id === s.recall!.answer)) err(s, "réponse du rappel absente des options");
      const fromSession = SESSIONS[s.recall.fromDay - 1];
      if (fromSession && !fromSession.notions.includes(s.recall.notion) && !SESSIONS.slice(0, day - 1).some((x) => x.notions.includes(s.recall!.notion)))
        warnings.push(`${s.id} : la notion rappelée « ${s.recall.notion} » n'a été travaillée dans aucune séance précédente`);
    }
  } else if (s.recall) err(s, "le premier jour ne doit pas avoir de rappel");
  checkExercise(s, s.exercise);
});

for (const w of WEEKS) if (SESSIONS.filter((s) => s.week === w.number).length !== 7) err(null, `semaine ${w.number} : 7 séances attendues`);

/* Variété des formats : les QCM restent minoritaires. */
const typeCount: Record<string, number> = {};
for (const s of SESSIONS) typeCount[s.exercise.type] = (typeCount[s.exercise.type] ?? 0) + 1;
if ((typeCount.choice ?? 0) > 6) err(null, `trop de QCM : ${typeCount.choice}`);

/* ------------------------------------------------------------------ */
/* Exercices                                                          */
/* ------------------------------------------------------------------ */

function checkChoice(s: Session, q: ChoiceQuestion, where: string) {
  const optIds = q.options.map((o) => o.id);
  if (new Set(optIds).size !== optIds.length) err(s, `${where} : options en double`);
  if (q.options.length < 2) err(s, `${where} : au moins deux options`);
  if (!q.answers.length || q.answers.some((a) => !optIds.includes(a))) err(s, `${where} : réponse absente des options`);
  if (!q.explanation.trim()) err(s, `${where} : explication manquante`);
}

function flagsOf(parts: MessagePart[]) {
  return parts.filter((p): p is Exclude<MessagePart, string> => typeof p !== "string");
}

function checkExercise(s: Session, ex: Exercise) {
  switch (ex.type) {
    case "choice":
      ex.questions.forEach((q) => checkChoice(s, q, `question ${q.id}`));
      break;
    case "message": {
      const flags = [...ex.fields.flatMap((f) => flagsOf(f.value)), ...ex.body.flatMap(flagsOf), ...(ex.button ? [ex.button] : [])];
      if (new Set(flags.map((f) => f.id)).size !== flags.length) err(s, "éléments de message en double");
      if (flags.length < 4) err(s, "au moins quatre éléments inspectables");
      if (!flags.some((f) => !f.suspicious)) err(s, "le message doit contenir des éléments neutres");
      if (!ex.verdict.options.some((o) => o.id === ex.verdict.answer)) err(s, "verdict sans bonne réponse");
      break;
    }
    case "url":
      for (const item of ex.items) {
        if (!item.choices.includes(item.answer)) err(s, `${item.id} : réponse absente des choix`);
        let host = "";
        try {
          host = new URL(item.url).hostname;
        } catch {
          err(s, `${item.id} : URL invalide`);
        }
        if (host && registrableDomain(host) !== item.answer) err(s, `${item.id} : domaine calculé ${registrableDomain(host)} ≠ réponse ${item.answer}`);
      }
      break;
    case "order":
      if (ex.items.length < 3) err(s, "au moins trois éléments à ordonner");
      if (new Set(ex.items.map((i) => i.id)).size !== ex.items.length) err(s, "éléments en double");
      if (ex.variant === "rank" && !ex.rankLabels) err(s, "libellés de classement manquants");
      break;
    case "match": {
      const optIds = ex.options.map((o) => o.id);
      for (const it of ex.items) if (!optIds.includes(it.answer)) err(s, `${it.id} : réponse inconnue`);
      if (ex.variant === "associate" && new Set(ex.items.map((i) => i.answer)).size !== ex.items.length) err(s, "association non bijective");
      if (new Set(ex.items.map((i) => i.id)).size !== ex.items.length) err(s, "éléments en double");
      break;
    }
    case "justify":
      if (!ex.choices.some((c) => c.id === ex.answer)) err(s, "bonne réponse absente");
      if (ex.criteria.length < 2 || !ex.reference.length) err(s, "grille ou référence manquante");
      break;
    case "reflection":
      if (ex.criteria.length < 2 || !ex.reference.length || !ex.prompts.length) err(s, "grille, référence ou questions manquantes");
      break;
    case "short":
      for (const q of ex.questions) if (!q.accept.length) err(s, `${q.id} : aucune réponse acceptée`);
      break;
    case "terminal":
      checkTerminal(s, ex);
      break;
    case "logs":
      if (!ex.rows.some((r) => r.suspicious)) err(s, "aucune ligne à examiner");
      if (new Set(ex.rows.map((r) => r.id)).size !== ex.rows.length) err(s, "lignes en double");
      for (const r of ex.rows) for (const c of ex.columns) if (r.cells[c.key] === undefined) err(s, `${r.id} : cellule ${c.key} manquante`);
      ex.followUp.forEach((q) => checkChoice(s, q, `question ${q.id}`));
      break;
    case "investigation":
      if (ex.clues.length < 2) err(s, "au moins deux indices");
      ex.questions.forEach((q) => checkChoice(s, q, `question ${q.id}`));
      break;
    case "access":
      checkAccess(s, ex);
      break;
  }
}

function checkTerminal(s: Session, ex: TerminalExercise) {
  let ctx: TerminalContext = { root: ex.root, user: ex.user, groups: ex.groups, home: ex.home, cwd: ex.startDir };
  const results: CommandResult[] = [];
  const visited = new Set([ex.startDir]);
  for (const line of ex.solution) {
    const r = runCommand(ctx, line);
    results.push(r);
    ctx = { ...ctx, cwd: r.cwd, previousDir: r.previousDir };
    visited.add(r.cwd);
  }
  for (const t of ex.tasks) {
    const answer = ex.solutionAnswers?.[t.id];
    if (t.check.kind === "answer" && !answer) err(s, `tâche ${t.id} : réponse de solution manquante`);
    if (!taskSatisfied(t, { results, visited }, answer)) err(s, `tâche ${t.id} non résolue par la solution`);
  }
  // Les commandes inconnues ou mal formées doivent produire un message compréhensible.
  const probe = runCommand(ctx, "rm -rf /");
  if (!probe.error || !probe.output.includes("simulation")) err(s, "le terminal doit refuser rm avec une explication");
  const unknown = runCommand(ctx, "sl");
  if (!unknown.error || !unknown.output.includes("ls")) err(s, "suggestion attendue pour une faute de frappe");
}

function checkAccess(s: Session, ex: AccessExercise) {
  const resIds = ex.resources.map((r) => r.id);
  const roleIds = ex.roles.map((r) => r.id);
  for (const u of ex.users) if (!roleIds.includes(u.role)) err(s, `utilisateur ${u.id} : rôle inconnu`);
  const validPerm = (p: string) => {
    const [res, action] = p.split(":");
    return resIds.includes(res) && ex.actions.includes(action as never);
  };
  for (const [role, perms] of Object.entries(ex.perms)) {
    if (!roleIds.includes(role)) err(s, `rôle inconnu dans perms : ${role}`);
    for (const p of perms) if (!validPerm(p)) err(s, `permission invalide : ${p}`);
  }
  if (ex.mode === "predict") {
    if (!ex.requests?.length) err(s, "demandes manquantes");
    const outcomes = new Set((ex.requests ?? []).map((r) => decide(ex, ex.perms, r)));
    if (outcomes.size < 2) err(s, "les demandes doivent comporter des autorisations et des refus");
    for (const r of ex.requests ?? []) {
      if (!ex.users.some((u) => u.id === r.userId) || !resIds.includes(r.resourceId)) err(s, `demande ${r.id} : référence invalide`);
      if (!r.why.trim()) err(s, `demande ${r.id} : explication manquante`);
    }
  } else {
    if (!ex.scenarios?.length || !ex.solutionPerms) err(s, "scénarios ou solution manquants");
    const sol = ex.solutionPerms ?? {};
    for (const sc of ex.scenarios ?? []) if (decide(ex, sol, sc) !== sc.expected) err(s, `scénario ${sc.id} non respecté par la solution`);
    // Minimalité : retirer n'importe quel droit de la solution doit casser un scénario.
    for (const [role, perms] of Object.entries(sol))
      for (const p of perms) {
        const reduced = { ...sol, [role]: perms.filter((x) => x !== p) };
        if ((ex.scenarios ?? []).every((sc) => decide(ex, reduced, sc) === sc.expected)) err(s, `droit superflu dans la solution : ${role} ${p}`);
      }
    if ((ex.scenarios ?? []).every((sc) => decide(ex, ex.perms, sc) === sc.expected)) err(s, "la configuration de départ résout déjà l'exercice");
  }
}

/* ------------------------------------------------------------------ */
/* Textes : références au glossaire, domaines et adresses             */
/* ------------------------------------------------------------------ */

function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === "object") Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}

const FILE_EXT = new Set(["txt", "pdf", "jpg", "exe", "scr", "csv", "log", "md", "json", "xlsx", "docx", "png", "html", "sh", "zip", "verrou"]);
const ALLOWED_TLD = new Set(["test", "example", "invalid", "localhost"]);
const ALLOWED_DOMAINS = ["example.com", "example.org", "example.net"];

function ipAllowed(ip: string) {
  const p = ip.split(".").map(Number);
  if (p.some((n) => n > 255)) return true; // adresse volontairement invalide (exercice)
  if (p[0] === 10 || p[0] === 127) return true;
  if (p[0] === 192 && p[1] === 168) return true;
  if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return true;
  return ip.startsWith("192.0.2.") || ip.startsWith("198.51.100.") || ip.startsWith("203.0.113.");
}

for (const s of SESSIONS) {
  for (const text of collectStrings(s)) {
    for (const m of text.matchAll(/\[\[([a-z0-9-]+)(?:\|[^\]]+)?\]\]/g)) if (!GLOSSARY_BY_ID[m[1]]) err(s, `lien de glossaire inconnu : ${m[1]}`);
    for (const m of text.matchAll(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g)) if (!ipAllowed(m[0])) err(s, `adresse IP hors des plages d'exemple : ${m[0]}`);
    for (const m of text.matchAll(/(?<![\w.-])(?:[a-z0-9][a-z0-9-]*\.)+([a-z]{2,})(?![\w-])/gi)) {
      const domain = m[0].toLowerCase();
      const tld = m[1].toLowerCase();
      if (FILE_EXT.has(tld)) continue;
      if (ALLOWED_TLD.has(tld) || ALLOWED_DOMAINS.some((d) => domain === d || domain.endsWith("." + d))) continue;
      err(s, `domaine non réservé aux exemples : ${domain}`);
    }
    if (/TODO|lorem|à compléter|placeholder/i.test(text)) err(s, `texte provisoire : « ${text.slice(0, 60)} »`);
  }
}
for (const g of GLOSSARY) for (const s of g.seeAlso ?? []) if (!GLOSSARY_BY_ID[s]) err(null, `glossaire ${g.id} : renvoi inconnu ${s}`);

/* ------------------------------------------------------------------ */

console.log(`Séances : ${SESSIONS.length}`);
console.log(`Formats d'exercice : ${Object.entries(typeCount).map(([k, v]) => `${k} ${v}`).join(", ")}`);
console.log(`Termes du glossaire : ${GLOSSARY.length}`);
if (warnings.length) console.log(`\nAvertissements (${warnings.length}) :\n- ` + warnings.join("\n- "));
if (errors.length) {
  console.error(`\nErreurs (${errors.length}) :\n- ` + errors.join("\n- "));
  process.exit(1);
}
console.log("\nContenu vérifié : aucune erreur.");
