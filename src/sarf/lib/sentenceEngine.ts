import type { Tense, Voice, Verb } from '@/sarf/data/types';

const PRONOUN_SUBJECTS: Record<number, { en: string; enPresent: string }> = {
  1: { en: 'He', enPresent: 'He' }, 2: { en: 'The two of them (m)', enPresent: 'The two of them (m)' },
  3: { en: 'They (m)', enPresent: 'They (m)' }, 4: { en: 'She', enPresent: 'She' },
  5: { en: 'The two of them (f)', enPresent: 'The two of them (f)' }, 6: { en: 'They (f)', enPresent: 'They (f)' },
  7: { en: 'You (m)', enPresent: 'You (m)' }, 8: { en: 'You two (m)', enPresent: 'You two (m)' },
  9: { en: 'You all (m)', enPresent: 'You all (m)' }, 10: { en: 'You (f)', enPresent: 'You (f)' },
  11: { en: 'You two (f)', enPresent: 'You two (f)' }, 12: { en: 'You all (f)', enPresent: 'You all (f)' },
  13: { en: 'I', enPresent: 'I' }, 14: { en: 'We', enPresent: 'We' },
};

interface VerbForms {
  pastBase: string; presentSingular: string; presentPlural: string; presentI: string; imperative: string; gerund: string;
}

const PASSIVE_PARTICIPLES: Record<string, string> = {
  'wrote': 'written', 'helped': 'helped', 'opened': 'opened', 'sat': 'sat upon', 'went': 'gone to',
  'exited': 'exited', 'entered': 'entered', 'knew': 'known', 'heard': 'heard', 'struck': 'struck',
  'sought': 'sought', 'rode': 'ridden', 'worshipped': 'worshipped', 'praised': 'praised', 'thanked': 'thanked',
  'was patient': 'endured', 'descended': 'sent down', 'judged': 'judged', 'forgave': 'forgiven',
  'drank': 'drunk', 'killed': 'killed', 'carried': 'carried', 'worked': 'done', 'cut': 'cut',
  'gathered': 'gathered', 'planted': 'planted', 'occupied': 'occupied', 'did': 'done', 'made': 'made',
  'wore': 'worn', 'returned': 'returned', 'memorized': 'memorized', 'left': 'left', 'earned': 'earned',
  'recognized': 'recognized', 'manufactured': 'manufactured', 'provided': 'provided', 'played': 'played',
  'searched': 'searched', 'cooked': 'cooked', 'prevented': 'prevented', 'understood': 'understood',
  'washed': 'washed', 'accepted': 'accepted', 'presented': 'presented', 'obtained': 'obtained',
  'revealed': 'revealed', 'dwelt': 'dwelt in', 'wondered': 'wondered at', 'created': 'created',
  'attended': 'attended', 'spread': 'spread', 'tied': 'tied', 'imprisoned': 'imprisoned',
  'watched': 'watched', 'sent': 'sent', 'imposed': 'imposed', 'drew': 'drawn', 'rebuked': 'rebuked',
  'caught up': 'caught up with', 'was truthful': 'believed', 'lied': 'lied about', 'disbelieved': 'disbelieved',
  'oppressed': 'oppressed', 'tormented': 'tormented', 'had mercy': 'shown mercy', 'intended': 'intended',
  'plowed': 'plowed', 'seized': 'seized', 'separated': 'separated', 'sealed': 'sealed', 'spent': 'spent',
  'freed': 'freed', 'crossed': 'crossed', 'thought': 'thought of', 'raised': 'raised', 'shortened': 'shortened',
  'transferred': 'transferred', 'prostrated': 'prostrated before', 'grew great': 'magnified',
  'was righteous': 'treated righteously', 'surpassed': 'surpassed', 'was stingy': 'withheld from',
  'was far': 'kept far', 'was near': 'brought near', 'harvested': 'harvested', 'perished': 'destroyed',
  'tampered': 'tampered with', 'witnessed': 'witnessed', 'buried': 'buried', 'grieved': 'grieved',
  'rejoiced': 'rejoiced at', 'was angry': 'angered', 'compelled': 'compelled', 'preceded': 'preceded',
  'looked': 'looked at', 'remembered': 'remembered', 'explained': 'explained', 'divided': 'divided',
  'knocked': 'knocked', 'sat down': 'sat upon', 'gave a sermon': 'preached to', 'held a grudge': 'grudged',
  'stoned': 'stoned', 'reached': 'reached', 'dug': 'dug', 'claimed': 'claimed', 'protected': 'protected',
  'succeeded': 'succeeded', 'was generous': 'honored', 'swore': 'sworn', 'struck wildly': 'struck',
  'thundered': 'thundered upon', 'flashed': 'flashed upon', 'squeezed': 'squeezed', 'turned over': 'turned over',
  'clung': 'clung to', 'humbled himself': 'humbled',
};

function getPassiveParticiple(pastBase: string): string {
  return PASSIVE_PARTICIPLES[pastBase] || pastBase;
}

function extractVerbForms(meaningEn: string): VerbForms {
  const past = meaningEn.replace(/^he |^she |^it |^they /i, '').trim();
  const irregulars: Record<string, VerbForms> = {
    'wrote': { pastBase: 'wrote', presentSingular: 'writes', presentPlural: 'write', presentI: 'write', imperative: 'Write', gerund: 'writing' },
    'helped': { pastBase: 'helped', presentSingular: 'helps', presentPlural: 'help', presentI: 'help', imperative: 'Help', gerund: 'helping' },
    'opened': { pastBase: 'opened', presentSingular: 'opens', presentPlural: 'open', presentI: 'open', imperative: 'Open', gerund: 'opening' },
    'sat': { pastBase: 'sat', presentSingular: 'sits', presentPlural: 'sit', presentI: 'sit', imperative: 'Sit', gerund: 'sitting' },
    'went': { pastBase: 'went', presentSingular: 'goes', presentPlural: 'go', presentI: 'go', imperative: 'Go', gerund: 'going' },
    'knew': { pastBase: 'knew', presentSingular: 'knows', presentPlural: 'know', presentI: 'know', imperative: 'Know', gerund: 'knowing' },
    'heard': { pastBase: 'heard', presentSingular: 'hears', presentPlural: 'hear', presentI: 'hear', imperative: 'Hear', gerund: 'hearing' },
    'struck': { pastBase: 'struck', presentSingular: 'strikes', presentPlural: 'strike', presentI: 'strike', imperative: 'Strike', gerund: 'striking' },
    'sought': { pastBase: 'sought', presentSingular: 'seeks', presentPlural: 'seek', presentI: 'seek', imperative: 'Seek', gerund: 'seeking' },
    'rode': { pastBase: 'rode', presentSingular: 'rides', presentPlural: 'ride', presentI: 'ride', imperative: 'Ride', gerund: 'riding' },
    'drank': { pastBase: 'drank', presentSingular: 'drinks', presentPlural: 'drink', presentI: 'drink', imperative: 'Drink', gerund: 'drinking' },
    'cut': { pastBase: 'cut', presentSingular: 'cuts', presentPlural: 'cut', presentI: 'cut', imperative: 'Cut', gerund: 'cutting' },
    'did': { pastBase: 'did', presentSingular: 'does', presentPlural: 'do', presentI: 'do', imperative: 'Do', gerund: 'doing' },
    'made': { pastBase: 'made', presentSingular: 'makes', presentPlural: 'make', presentI: 'make', imperative: 'Make', gerund: 'making' },
    'wore': { pastBase: 'wore', presentSingular: 'wears', presentPlural: 'wear', presentI: 'wear', imperative: 'Wear', gerund: 'wearing' },
    'left': { pastBase: 'left', presentSingular: 'leaves', presentPlural: 'leave', presentI: 'leave', imperative: 'Leave', gerund: 'leaving' },
    'spread': { pastBase: 'spread', presentSingular: 'spreads', presentPlural: 'spread', presentI: 'spread', imperative: 'Spread', gerund: 'spreading' },
    'drew': { pastBase: 'drew', presentSingular: 'draws', presentPlural: 'draw', presentI: 'draw', imperative: 'Draw', gerund: 'drawing' },
    'sent': { pastBase: 'sent', presentSingular: 'sends', presentPlural: 'send', presentI: 'send', imperative: 'Send', gerund: 'sending' },
    'thought': { pastBase: 'thought', presentSingular: 'thinks', presentPlural: 'think', presentI: 'think', imperative: 'Think', gerund: 'thinking' },
    'swore': { pastBase: 'swore', presentSingular: 'swears', presentPlural: 'swear', presentI: 'swear', imperative: 'Swear', gerund: 'swearing' },
    'dug': { pastBase: 'dug', presentSingular: 'digs', presentPlural: 'dig', presentI: 'dig', imperative: 'Dig', gerund: 'digging' },
    'was patient': { pastBase: 'was patient', presentSingular: 'is patient', presentPlural: 'are patient', presentI: 'am patient', imperative: 'Be patient', gerund: 'being patient' },
    'was truthful': { pastBase: 'was truthful', presentSingular: 'is truthful', presentPlural: 'are truthful', presentI: 'am truthful', imperative: 'Be truthful', gerund: 'being truthful' },
    'was angry': { pastBase: 'was angry', presentSingular: 'is angry', presentPlural: 'are angry', presentI: 'am angry', imperative: 'Be angry', gerund: 'being angry' },
    'was righteous': { pastBase: 'was righteous', presentSingular: 'is righteous', presentPlural: 'are righteous', presentI: 'am righteous', imperative: 'Be righteous', gerund: 'being righteous' },
    'was stingy': { pastBase: 'was stingy', presentSingular: 'is stingy', presentPlural: 'are stingy', presentI: 'am stingy', imperative: 'Be stingy', gerund: 'being stingy' },
    'was far': { pastBase: 'was far', presentSingular: 'is far', presentPlural: 'are far', presentI: 'am far', imperative: 'Be far', gerund: 'being far' },
    'was near': { pastBase: 'was near', presentSingular: 'is near', presentPlural: 'are near', presentI: 'am near', imperative: 'Be near', gerund: 'being near' },
    'was generous': { pastBase: 'was generous', presentSingular: 'is generous', presentPlural: 'are generous', presentI: 'am generous', imperative: 'Be generous', gerund: 'being generous' },
    'grew great': { pastBase: 'grew great', presentSingular: 'grows great', presentPlural: 'grow great', presentI: 'grow great', imperative: 'Grow great', gerund: 'growing great' },
    'had mercy': { pastBase: 'had mercy', presentSingular: 'has mercy', presentPlural: 'have mercy', presentI: 'have mercy', imperative: 'Have mercy', gerund: 'having mercy' },
    'caught up': { pastBase: 'caught up', presentSingular: 'catches up', presentPlural: 'catch up', presentI: 'catch up', imperative: 'Catch up', gerund: 'catching up' },
    'sat down': { pastBase: 'sat down', presentSingular: 'sits down', presentPlural: 'sit down', presentI: 'sit down', imperative: 'Sit down', gerund: 'sitting down' },
    'gave a sermon': { pastBase: 'gave a sermon', presentSingular: 'gives a sermon', presentPlural: 'give a sermon', presentI: 'give a sermon', imperative: 'Give a sermon', gerund: 'giving a sermon' },
    'held a grudge': { pastBase: 'held a grudge', presentSingular: 'holds a grudge', presentPlural: 'hold a grudge', presentI: 'hold a grudge', imperative: 'Hold a grudge', gerund: 'holding a grudge' },
    'struck wildly': { pastBase: 'struck wildly', presentSingular: 'strikes wildly', presentPlural: 'strike wildly', presentI: 'strike wildly', imperative: 'Strike wildly', gerund: 'striking wildly' },
    'turned over': { pastBase: 'turned over', presentSingular: 'turns over', presentPlural: 'turn over', presentI: 'turn over', imperative: 'Turn over', gerund: 'turning over' },
    'humbled himself': { pastBase: 'humbled himself', presentSingular: 'humbles himself', presentPlural: 'humble themselves', presentI: 'humble myself', imperative: 'Humble yourself', gerund: 'humbling' },
    'clung': { pastBase: 'clung', presentSingular: 'clings', presentPlural: 'cling', presentI: 'cling', imperative: 'Cling', gerund: 'clinging' },
  };

  if (irregulars[past]) return irregulars[past];

  // Regular fallback
  let stem = past; let present = past; let presentS = past; let gerund = past;
  if (past.endsWith('ied')) {
    stem = past.slice(0, -3) + 'y'; present = stem; presentS = stem.slice(0, -1) + 'ies'; gerund = stem.slice(0, -1) + 'ying';
  } else if (past.endsWith('ed')) {
    stem = past.slice(0, -2);
    if (stem.length > 2 && stem[stem.length - 1] === stem[stem.length - 2]) stem = stem.slice(0, -1);
    present = stem;
    presentS = stem.endsWith('e') ? stem + 's' : (stem.endsWith('s') || stem.endsWith('sh') || stem.endsWith('ch') || stem.endsWith('x') || stem.endsWith('z')) ? stem + 'es' : stem + 's';
    gerund = stem.endsWith('e') ? stem.slice(0, -1) + 'ing' : stem + 'ing';
  }
  const imp = stem.charAt(0).toUpperCase() + stem.slice(1);
  return { pastBase: past, presentSingular: presentS, presentPlural: present, presentI: present, imperative: imp, gerund };
}

export function getSlotTranslation(verb: Verb, slotId: number, tense: Tense, voice: Voice): string {
  const forms = extractVerbForms(verb.meaningEn);
  const pronoun = PRONOUN_SUBJECTS[slotId];
  if (!pronoun) return '';
  const isSingular = [1, 4, 7, 10, 13].includes(slotId);
  const isI = slotId === 13;
  const pp = getPassiveParticiple(forms.pastBase);
  const isPlural = [3, 6, 9, 12, 14].includes(slotId);
  const isDual = [2, 5, 8, 11].includes(slotId);
  const wasWere = (isPlural || isDual) ? 'were' : 'was';
  const isAre = (isPlural || isDual) ? 'are being' : 'is being';
  const PASSIVE_SUBJECTS: Record<number, string> = {
    1: 'It', 2: 'The two (m)', 3: 'They (m)', 4: 'It (f) / They (non-human pl)',
    5: 'The two (f)', 6: 'They (f)', 7: 'You (m)', 8: 'You two (m)', 9: 'You all (m)',
    10: 'You (f)', 11: 'You two (f)', 12: 'You all (f)', 13: 'I', 14: 'We',
  };
  if (tense === 'madi') {
    if (voice === 'passive') return `${PASSIVE_SUBJECTS[slotId] || pronoun.en} ${wasWere} ${pp}`;
    return `${pronoun.en} ${forms.pastBase}`;
  }
  if (tense === 'mudari') {
    if (voice === 'passive') return `${PASSIVE_SUBJECTS[slotId] || pronoun.en} ${isAre} ${pp}`;
    if (isI) return `I ${forms.presentI}`;
    return `${pronoun.en} ${isSingular ? forms.presentSingular : forms.presentPlural}`;
  }
  if (tense === 'amr') return `${forms.imperative}!`;
  return '';
}

interface SlotExample {
  arBefore: string; arAfter: string; arAmrBefore?: string; arAmrAfter?: string;
  enPast: (v: VerbForms) => string; enPresent: (v: VerbForms) => string; enAmr: (v: VerbForms) => string;
}

const SLOT_EXAMPLES: Record<number, SlotExample> = {
  1: { arBefore: 'الطَّالِبُ', arAfter: 'الدَّرْسَ', enPast: v => `The student ${v.pastBase} the lesson.`, enPresent: v => `The student ${v.presentSingular} the lesson.`, enAmr: v => `${v.imperative} the lesson!` },
  2: { arBefore: 'الأَخَوَانِ', arAfter: 'الدَّرْسَ مَعًا', enPast: v => `The two brothers ${v.pastBase} the lesson together.`, enPresent: v => `The two brothers ${v.presentPlural} the lesson together.`, enAmr: v => `${v.imperative} the lesson together!` },
  3: { arBefore: 'الرِّجَالُ', arAfter: 'فِي المَسْجِدِ', enPast: v => `The men ${v.pastBase} in the masjid.`, enPresent: v => `The men ${v.presentPlural} in the masjid.`, enAmr: v => `${v.imperative} in the masjid!` },
  4: { arBefore: 'المُعَلِّمَةُ', arAfter: 'الرِّسَالَةَ', enPast: v => `The teacher ${v.pastBase} the letter.`, enPresent: v => `The teacher ${v.presentSingular} the letter.`, enAmr: v => `${v.imperative} the letter!` },
  5: { arBefore: 'الأُخْتَانِ', arAfter: 'فِي البَيْتِ', enPast: v => `The two sisters ${v.pastBase} at home.`, enPresent: v => `The two sisters ${v.presentPlural} at home.`, enAmr: v => `${v.imperative} at home!` },
  6: { arBefore: 'النِّسَاءُ', arAfter: 'كَثِيرًا', enPast: v => `The women ${v.pastBase} a lot.`, enPresent: v => `The women ${v.presentPlural} a lot.`, enAmr: v => `${v.imperative} a lot!` },
  7: { arBefore: '', arAfter: 'أَمْسِ', arAmrAfter: 'الآنَ', enPast: v => `You ${v.pastBase} yesterday.`, enPresent: v => `You ${v.presentPlural} every day.`, enAmr: v => `${v.imperative} now!` },
  8: { arBefore: '', arAfter: 'مَعًا', arAmrAfter: 'مَعًا', enPast: v => `You two ${v.pastBase} together.`, enPresent: v => `You two ${v.presentPlural} together.`, enAmr: v => `You two, ${v.imperative.toLowerCase()} together!` },
  9: { arBefore: '', arAfter: 'فِي الصَّفِّ', arAmrAfter: 'فِي الصَّفِّ', enPast: v => `You all ${v.pastBase} in class.`, enPresent: v => `You all ${v.presentPlural} in class.`, enAmr: v => `All of you, ${v.imperative.toLowerCase()} in class!` },
  10: { arBefore: '', arAfter: 'أَمْسِ', arAmrAfter: 'الآنَ', enPast: v => `You ${v.pastBase} yesterday.`, enPresent: v => `You ${v.presentPlural} every day.`, enAmr: v => `${v.imperative} now!` },
  11: { arBefore: '', arAfter: 'مَعًا', arAmrAfter: 'مَعًا', enPast: v => `You two ${v.pastBase} together.`, enPresent: v => `You two ${v.presentPlural} together.`, enAmr: v => `You two, ${v.imperative.toLowerCase()} together!` },
  12: { arBefore: '', arAfter: 'فِي البَيْتِ', arAmrAfter: 'فِي البَيْتِ', enPast: v => `You all ${v.pastBase} at home.`, enPresent: v => `You all ${v.presentPlural} at home.`, enAmr: v => `All of you, ${v.imperative.toLowerCase()} at home!` },
  13: { arBefore: '', arAfter: 'أَمْسِ', enPast: v => `I ${v.pastBase} yesterday.`, enPresent: v => `I ${v.presentI} every day.`, enAmr: v => `${v.imperative} now!` },
  14: { arBefore: '', arAfter: 'مَعًا', enPast: v => `We ${v.pastBase} together.`, enPresent: v => `We ${v.presentPlural} together.`, enAmr: v => `Let's ${v.presentPlural} together!` },
};

export function getExampleSentence(verb: Verb, slotId: number, tense: Tense, conjugatedForm?: string): { ar: string; en: string } | null {
  const forms = extractVerbForms(verb.meaningEn);
  const slot = SLOT_EXAMPLES[slotId];
  if (!slot) return null;
  const arVerb = conjugatedForm || (tense === 'madi' ? verb.madi : verb.mudari);
  const arBefore = (tense === 'amr' && slot.arAmrBefore !== undefined) ? slot.arAmrBefore : slot.arBefore;
  const arAfter = (tense === 'amr' && slot.arAmrAfter !== undefined) ? slot.arAmrAfter : slot.arAfter;
  const ar = [arBefore, arVerb, arAfter].filter(Boolean).join(' ');
  let en = '';
  if (tense === 'madi') en = slot.enPast(forms);
  else if (tense === 'mudari') en = slot.enPresent(forms);
  else if (tense === 'amr') en = slot.enAmr(forms);
  return { ar, en };
}

export function getTenseAwareMeaning(verb: Verb, tense: Tense): string {
  const forms = extractVerbForms(verb.meaningEn);
  if (tense === 'madi') return verb.meaningEn;
  if (tense === 'mudari') return `he ${forms.presentSingular} / is ${forms.gerund}`;
  if (tense === 'amr') return `${forms.imperative}!`;
  return verb.meaningEn;
}
