import { STARTER_VERBS, KATABA_CONJUGATIONS } from '@/sarf/data/seed';
import type { Verb } from '@/sarf/data/types';

export function getRandomVerbForDrill(form: number, verbType: string, excludeIds: string[] = []): Verb | null {
  const candidates = STARTER_VERBS.filter(v => v.form === form && v.verbType === verbType && !excludeIds.includes(v.id));
  if (candidates.length === 0) {
    const fallback = STARTER_VERBS.filter(v => v.form === form && v.verbType === verbType);
    if (fallback.length === 0) return null;
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export function hasConjugationData(verbId: string): boolean {
  return KATABA_CONJUGATIONS.some(c => c.verbId === verbId);
}

export function getAvailableScales(): { form: number; verbType: string; count: number }[] {
  const scaleMap = new Map<string, { form: number; verbType: string; count: number }>();
  for (const v of STARTER_VERBS) {
    const key = `${v.form}_${v.verbType}`;
    const existing = scaleMap.get(key);
    if (existing) existing.count++;
    else scaleMap.set(key, { form: v.form, verbType: v.verbType, count: 1 });
  }
  return Array.from(scaleMap.values());
}
