import { KATABA_CONJUGATIONS, CONJUGATION_SLOTS } from '@/sarf/data/seed';
import type { Conjugation, Verb, Tense, Voice } from '@/sarf/data/types';

const KATABA_TEMPLATE_VERB: Verb = {
  id: 'v1',
  root: 'ك-ت-ب',
  form: 1,
  madi: 'كَتَبَ',
  mudari: 'يَكْتُبُ',
  masdar: 'كِتَابَة',
  meaningEn: 'he wrote',
  verbType: 'salim',
  isTransitive: true,
  isQuranic: true,
};

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

  return templates.map((template) => {
    const segments = decomposeForm(template.formText, KATABA_TEMPLATE_VERB);
    let rootLetterIndex = 0;

    const newText = segments
      .map((segment) => {
        if (segment.type !== 'root') return segment.text;

        const targetLetter = targetRoot[rootLetterIndex];
        rootLetterIndex += 1;

        if (!targetLetter) return segment.text;
        return `${targetLetter}${segment.text.slice(1)}`;
      })
      .join('');

    return { ...template, verbId: verb.id, formText: newText };
  });
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
