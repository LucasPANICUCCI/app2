/** Normalise une réponse courte : casse, accents, espaces, ponctuation finale. */
export function normalizeAnswer(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[«»"'’`]/g, "")
    .replace(/\s+/g, " ")
    .replace(/[.!;,]+$/, "")
    .trim();
}

export function matchesAnswer(value: string, accepted: string[]): boolean {
  const v = normalizeAnswer(value);
  if (!v) return false;
  return accepted.some((a) => normalizeAnswer(a) === v);
}

/** Mélange déterministe (même ordre côté serveur et navigateur). */
export function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const rand = () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  // Évite de présenter une liste déjà dans le bon ordre.
  if (out.length > 1 && out.every((x, i) => x === items[i])) out.push(out.shift() as T);
  return out;
}

export function plural(n: number, singular: string, pluralForm?: string): string {
  return `${n} ${n > 1 ? pluralForm ?? singular + "s" : singular}`;
}
