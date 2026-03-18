import { KATABA_CONJUGATIONS, CONJUGATION_SLOTS } from '@/sarf/data/seed';
import type { Conjugation, Verb, Tense, Voice } from '@/sarf/data/types';

const KATABA_ROOT = ['ك', 'ت', 'ب'];

function stripDiacritics(text: string): string {
  return text.replace(/[\u064B-\u065F\u0670]/g, '');
}

function extractRootLetters(verb: Verb): string[] {
  return verb.root.split('-').map(l => l.trim());
}

export function generateConjugationsForVerb(verb: Verb, tense: Tense, voice: Voice): Conjugation[] {
  const templates = KATABA_CONJUGATIONS.filter(
    c => c.verbId === 'v1' && c.tense === tense && c.voice === voice
  );
  if (verb.id === 'v1') return templates;
  const targetRoot = extractRootLetters(verb);
  if (targetRoot.length !== 3) return [];
  return templates.map(template => {
    let newText = template.formText;
    for (let i = 0; i < 3; i++) {
      newText = replaceRootLetter(newText, KATABA_ROOT[i], targetRoot[i]);
    }
    return { ...template, verbId: verb.id, formText: newText };
  });
}

function replaceRootLetter(text: string, source: string, target: string): string {
  const idx = text.indexOf(source);
  if (idx === -1) return text;
  return text.substring(0, idx) + target + text.substring(idx + source.length);
}

export interface FormSegment {
  text: string;
  type: 'root' | 'pattern';
}

export function decomposeForm(formText: string, verb: Verb): FormSegment[] {
  const rootLetters = extractRootLetters(verb);
  const stripped = stripDiacritics(formText);
  const segments: FormSegment[] = [];
  let remaining = formText;
  let strippedRemaining = stripped;
  let rootIdx = 0;
  while (remaining.length > 0) {
    if (rootIdx < rootLetters.length) {
      const rootLetter = rootLetters[rootIdx];
      const pos = strippedRemaining.indexOf(rootLetter);
      if (pos > 0) {
        const patternChars = getOriginalChars(remaining, formText, pos);
        segments.push({ text: patternChars, type: 'pattern' });
        remaining = remaining.substring(patternChars.length);
        strippedRemaining = stripDiacritics(remaining);
      }
      if (pos >= 0) {
        const rootChars = getNextLetterWithDiacritics(remaining);
        segments.push({ text: rootChars, type: 'root' });
        remaining = remaining.substring(rootChars.length);
        strippedRemaining = stripDiacritics(remaining);
        rootIdx++;
      } else {
        segments.push({ text: remaining, type: 'pattern' });
        remaining = '';
      }
    } else {
      segments.push({ text: remaining, type: 'pattern' });
      remaining = '';
    }
  }
  return segments;
}

function getOriginalChars(original: string, _full: string, strippedCount: number): string {
  let count = 0;
  let i = 0;
  while (i < original.length && count < strippedCount) {
    const char = original[i];
    if (!isDiacritic(char)) count++;
    i++;
    while (i < original.length && isDiacritic(original[i])) i++;
  }
  return original.substring(0, i);
}

function getNextLetterWithDiacritics(text: string): string {
  if (text.length === 0) return '';
  let i = 1;
  while (i < text.length && isDiacritic(text[i])) i++;
  return text.substring(0, i);
}

function isDiacritic(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= 0x064B && code <= 0x065F || code === 0x0670;
}
