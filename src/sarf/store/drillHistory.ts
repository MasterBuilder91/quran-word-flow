const STORAGE_KEY = 'sarf-drill-history';

interface DrillHistory {
  [formKey: string]: string[];
}

function getHistory(): DrillHistory {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
}

function saveHistory(h: DrillHistory) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(h));
}

export function getFormKey(form: number, verbType: string): string {
  return `form_${form}_${verbType}`;
}

export function getRecentVerbIds(form: number, verbType: string): string[] {
  return getHistory()[getFormKey(form, verbType)] || [];
}

export function addVerbToHistory(form: number, verbType: string, verbId: string) {
  const h = getHistory();
  const key = getFormKey(form, verbType);
  const list = h[key] || [];
  h[key] = [verbId, ...list.filter(id => id !== verbId)].slice(0, 10);
  saveHistory(h);
}

export function getSessionCount(form: number, verbType: string): number {
  return getRecentVerbIds(form, verbType).length;
}

export function getComparisonVerbs(form: number, verbType: string): string[] {
  return getRecentVerbIds(form, verbType).slice(0, 3);
}
