// Enhanced Quranic Arabic Morphology Analysis
// Provides detailed grammatical analysis for verbs, nouns, and particles

export interface MorphologyDetails {
  partOfSpeech: 'verb' | 'noun' | 'particle' | 'unknown';
  // Verb-specific
  tense?: 'past' | 'present' | 'imperative' | 'jussive' | 'subjunctive';
  verbForm?: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X';
  voice?: 'active' | 'passive';
  // Noun-specific
  gender?: 'masculine' | 'feminine';
  number?: 'singular' | 'dual' | 'plural';
  definiteness?: 'definite' | 'indefinite';
  case?: 'nominative' | 'accusative' | 'genitive';
  morphability?: 'triptote' | 'diptote' | 'indeclinable';
  nounType?: 'proper' | 'common' | 'verbal-noun' | 'active-participle' | 'passive-participle' | 'pronoun' | 'demonstrative' | 'relative';
  // Common
  person?: '1st' | '2nd' | '3rd';
  root?: string;
  translation?: string;
  transliteration?: string;
}

// Analyze Arabic word morphology using pattern matching
export function analyzeWordMorphology(word: string): MorphologyDetails {
  const details: MorphologyDetails = {
    partOfSpeech: 'unknown'
  };

  // Remove common prefixes for analysis
  let stem = word;
  const hasAl = stem.startsWith('ٱلْ') || stem.startsWith('ال') || stem.startsWith('ٱل');
  if (hasAl) {
    details.definiteness = 'definite';
    stem = stem.replace(/^(ٱلْ|ال|ٱل)/, '');
  }

  // Check for tanween (indefinite marker)
  if (word.includes('ً') || word.includes('ٌ') || word.includes('ٍ')) {
    details.definiteness = 'indefinite';
    details.morphability = 'triptote';
  }

  // Determine case from endings
  if (word.endsWith('ُ') || word.endsWith('ٌ') || word.endsWith('ونَ') || word.endsWith('انِ')) {
    details.case = 'nominative';
  } else if (word.endsWith('َ') || word.endsWith('ً') || word.endsWith('ينَ')) {
    details.case = 'accusative';
  } else if (word.endsWith('ِ') || word.endsWith('ٍ') || word.endsWith('ينَ')) {
    details.case = 'genitive';
  }

  // Check for pronouns
  if (isPersonalPronoun(word)) {
    details.partOfSpeech = 'noun';
    details.nounType = 'pronoun';
    details.morphability = 'indeclinable';
    Object.assign(details, getPronounDetails(word));
    return details;
  }

  // Check for demonstratives
  if (isDemonstrative(word)) {
    details.partOfSpeech = 'noun';
    details.nounType = 'demonstrative';
    details.morphability = 'indeclinable';
    Object.assign(details, getDemonstrativeDetails(word));
    return details;
  }

  // Check for relative pronouns
  if (isRelativePronoun(word)) {
    details.partOfSpeech = 'noun';
    details.nounType = 'relative';
    details.morphability = 'indeclinable';
    Object.assign(details, getRelativeDetails(word));
    return details;
  }

  // Check for particles
  if (isParticle(word)) {
    details.partOfSpeech = 'particle';
    details.morphability = 'indeclinable';
    return details;
  }

  // Analyze as verb or noun
  const verbAnalysis = analyzeAsVerb(word, stem);
  if (verbAnalysis.isVerb) {
    details.partOfSpeech = 'verb';
    Object.assign(details, verbAnalysis);
    return details;
  }

  // Analyze as noun
  const nounAnalysis = analyzeAsNoun(word, stem, hasAl);
  details.partOfSpeech = 'noun';
  Object.assign(details, nounAnalysis);
  
  return details;
}

function isPersonalPronoun(word: string): boolean {
  const pronouns = ['هُوَ', 'هِيَ', 'هُمْ', 'هُنَّ', 'هُمَا', 'أَنْتَ', 'أَنْتِ', 'أَنْتُمْ', 'أَنْتُمَا', 'أَنْتُنَّ', 'أَنَا', 'نَحْنُ'];
  return pronouns.some(p => word.includes(p) || word === p);
}

function getPronounDetails(word: string): Partial<MorphologyDetails> {
  if (word.includes('أَنَا') || word === 'أَنَا') return { person: '1st', number: 'singular' };
  if (word.includes('نَحْنُ') || word === 'نَحْنُ') return { person: '1st', number: 'plural' };
  if (word.includes('أَنْتَ') || word === 'أَنْتَ') return { person: '2nd', number: 'singular', gender: 'masculine' };
  if (word.includes('أَنْتِ') || word === 'أَنْتِ') return { person: '2nd', number: 'singular', gender: 'feminine' };
  if (word.includes('أَنْتُمْ') || word === 'أَنْتُمْ') return { person: '2nd', number: 'plural', gender: 'masculine' };
  if (word.includes('أَنْتُنَّ') || word === 'أَنْتُنَّ') return { person: '2nd', number: 'plural', gender: 'feminine' };
  if (word.includes('هُوَ') || word === 'هُوَ') return { person: '3rd', number: 'singular', gender: 'masculine' };
  if (word.includes('هِيَ') || word === 'هِيَ') return { person: '3rd', number: 'singular', gender: 'feminine' };
  if (word.includes('هُمْ') || word === 'هُمْ') return { person: '3rd', number: 'plural', gender: 'masculine' };
  if (word.includes('هُنَّ') || word === 'هُنَّ') return { person: '3rd', number: 'plural', gender: 'feminine' };
  if (word.includes('هُمَا')) return { person: '3rd', number: 'dual' };
  return {};
}

function isDemonstrative(word: string): boolean {
  const demonstratives = ['هَٰذَا', 'هَٰذِهِ', 'ذَٰلِكَ', 'تِلْكَ', 'هَٰؤُلَاءِ', 'أُولَٰئِكَ', 'هذا', 'هذه', 'ذلك', 'تلك'];
  return demonstratives.some(d => word.includes(d) || word === d);
}

function getDemonstrativeDetails(word: string): Partial<MorphologyDetails> {
  if (word.includes('هَٰذَا') || word.includes('هذا')) return { gender: 'masculine', number: 'singular' };
  if (word.includes('هَٰذِهِ') || word.includes('هذه')) return { gender: 'feminine', number: 'singular' };
  if (word.includes('ذَٰلِكَ') || word.includes('ذلك')) return { gender: 'masculine', number: 'singular' };
  if (word.includes('تِلْكَ') || word.includes('تلك')) return { gender: 'feminine', number: 'singular' };
  if (word.includes('هَٰؤُلَاءِ') || word.includes('أُولَٰئِكَ')) return { number: 'plural' };
  return {};
}

function isRelativePronoun(word: string): boolean {
  const relatives = ['ٱلَّذِي', 'ٱلَّتِي', 'ٱلَّذِينَ', 'ٱللَّاتِي', 'ٱللَّوَاتِي', 'الذي', 'التي', 'الذين', 'اللاتي', 'مَنْ', 'مَا'];
  return relatives.some(r => word.includes(r) || word === r);
}

function getRelativeDetails(word: string): Partial<MorphologyDetails> {
  if (word.includes('ٱلَّذِي') || word.includes('الذي')) return { gender: 'masculine', number: 'singular' };
  if (word.includes('ٱلَّتِي') || word.includes('التي')) return { gender: 'feminine', number: 'singular' };
  if (word.includes('ٱلَّذِينَ') || word.includes('الذين')) return { gender: 'masculine', number: 'plural' };
  if (word.includes('ٱللَّاتِي') || word.includes('ٱللَّوَاتِي')) return { gender: 'feminine', number: 'plural' };
  return {};
}

function isParticle(word: string): boolean {
  const particles = [
    'بِ', 'وَ', 'فَ', 'ثُمَّ', 'أَوْ', 'إِنَّ', 'أَنَّ', 'كَأَنَّ', 'لَكِنَّ', 'لَيْتَ', 'لَعَلَّ',
    'إِلَى', 'عَلَى', 'عَنْ', 'فِي', 'مِنْ', 'لِ', 'كَ', 'لَا', 'مَا', 'لَمْ', 'لَنْ', 'قَدْ',
    'سَ', 'سَوْفَ', 'إِذَا', 'إِذْ', 'لَوْ', 'لَوْلَا', 'أَمْ', 'بَلْ', 'حَتَّى', 'إِلَّا',
    'كَيْ', 'أَنْ', 'لَمَّا', 'هَلْ', 'أَ', 'يَا', 'أَيُّهَا', 'أَيَّتُهَا'
  ];
  return particles.includes(word) || particles.some(p => word === p);
}

interface VerbAnalysis {
  isVerb: boolean;
  tense?: 'past' | 'present' | 'imperative' | 'jussive' | 'subjunctive';
  verbForm?: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X';
  voice?: 'active' | 'passive';
  person?: '1st' | '2nd' | '3rd';
  gender?: 'masculine' | 'feminine';
  number?: 'singular' | 'dual' | 'plural';
}

function analyzeAsVerb(word: string, stem: string): VerbAnalysis {
  const result: VerbAnalysis = { isVerb: false };

  // Present tense markers (prefixes)
  const presentPrefixes = [
    { prefix: 'يَ', person: '3rd' as const, gender: 'masculine' as const, number: 'singular' as const },
    { prefix: 'ي', person: '3rd' as const, gender: 'masculine' as const, number: 'singular' as const },
    { prefix: 'تَ', person: '3rd' as const, gender: 'feminine' as const, number: 'singular' as const },
    { prefix: 'ت', person: '2nd' as const, gender: 'masculine' as const, number: 'singular' as const },
    { prefix: 'أَ', person: '1st' as const, number: 'singular' as const },
    { prefix: 'أ', person: '1st' as const, number: 'singular' as const },
    { prefix: 'نَ', person: '1st' as const, number: 'plural' as const },
    { prefix: 'ن', person: '1st' as const, number: 'plural' as const },
  ];

  // Check present tense prefixes
  for (const { prefix, person, gender, number } of presentPrefixes) {
    if (stem.startsWith(prefix)) {
      result.isVerb = true;
      result.tense = 'present';
      result.person = person;
      if (gender) result.gender = gender;
      if (number) result.number = number;
      break;
    }
  }

  // Check for plural verb endings
  if (word.endsWith('ونَ') || word.endsWith('ون')) {
    result.isVerb = true;
    result.tense = 'present';
    result.number = 'plural';
    result.gender = 'masculine';
  }
  if (word.endsWith('نَ') && !word.endsWith('ونَ') && word.length > 3) {
    // Could be feminine plural
    result.gender = 'feminine';
    result.number = 'plural';
  }

  // Check for past tense patterns
  // Past tense typically has pattern فَعَلَ
  if (word.endsWith('وا') || word.endsWith('ُوا')) {
    result.isVerb = true;
    result.tense = 'past';
    result.person = '3rd';
    result.gender = 'masculine';
    result.number = 'plural';
  }
  if (word.endsWith('تَ') && !word.startsWith('تَ') && !word.startsWith('ت')) {
    result.isVerb = true;
    result.tense = 'past';
    result.person = '2nd';
    result.gender = 'masculine';
    result.number = 'singular';
  }
  if (word.endsWith('تُ')) {
    result.isVerb = true;
    result.tense = 'past';
    result.person = '1st';
    result.number = 'singular';
  }
  if (word.endsWith('نَا')) {
    result.isVerb = true;
    result.tense = 'past';
    result.person = '1st';
    result.number = 'plural';
  }

  // Check for imperative - usually starts with اِ or ا and no present prefix
  if ((word.startsWith('ٱ') || word.startsWith('ا') || word.startsWith('اِ')) && 
      !word.startsWith('ال') && !word.startsWith('ٱل') &&
      !presentPrefixes.some(p => word.startsWith(p.prefix))) {
    // Could be imperative
    const couldBeImperative = word.length >= 3 && !word.includes('ٱلْ');
    if (couldBeImperative && !result.isVerb) {
      result.isVerb = true;
      result.tense = 'imperative';
      result.person = '2nd';
    }
  }

  // Detect verb forms (II-X) based on patterns
  if (result.isVerb) {
    result.verbForm = detectVerbForm(word, stem);
    result.voice = detectVoice(word, stem);
  }

  return result;
}

function detectVerbForm(word: string, stem: string): 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X' {
  // Form X: استفعل pattern
  if (stem.includes('سْتَ') || stem.includes('ست') || word.includes('سْتَ')) return 'X';
  
  // Form VIII: افتعل pattern (with ت after first radical)
  if (stem.match(/^.تَ/) || stem.match(/^ٱ.ْتَ/)) return 'VIII';
  
  // Form VII: انفعل pattern
  if (stem.startsWith('نْ') || word.includes('نفَ')) return 'VII';
  
  // Form V: تفعّل pattern (ت prefix + shadda)
  if ((word.startsWith('تَ') || word.startsWith('ت')) && word.includes('ّ')) return 'V';
  
  // Form VI: تفاعل pattern
  if ((word.startsWith('تَ') || word.startsWith('ت')) && word.includes('ا') && !word.includes('ّ')) return 'VI';
  
  // Form IV: أفعل pattern
  if (word.startsWith('أَ') || word.startsWith('أ') || word.startsWith('يُ')) return 'IV';
  
  // Form III: فاعل pattern (alif after first radical)
  if (stem.match(/^.ا/)) return 'III';
  
  // Form II: فعّل pattern (shadda on second radical)
  if (word.includes('ّ') && !word.startsWith('تَ')) return 'II';
  
  // Form IX: افعلّ (rare, for colors/defects)
  // Default to Form I
  return 'I';
}

function detectVoice(word: string, stem: string): 'active' | 'passive' {
  // Passive patterns have damma on first letter and kasra before last
  // Present passive: يُفْعَلُ
  if (word.match(/^يُ.*َ/) || word.match(/^تُ.*َ/) || word.match(/^أُ.*َ/) || word.match(/^نُ.*َ/)) {
    return 'passive';
  }
  // Past passive: فُعِلَ
  if (word.match(/^.ُ.ِ/)) {
    return 'passive';
  }
  return 'active';
}

interface NounAnalysis {
  gender?: 'masculine' | 'feminine';
  number?: 'singular' | 'dual' | 'plural';
  definiteness?: 'definite' | 'indefinite';
  morphability?: 'triptote' | 'diptote' | 'indeclinable';
  nounType?: 'proper' | 'common' | 'verbal-noun' | 'active-participle' | 'passive-participle';
}

function analyzeAsNoun(word: string, stem: string, hasAl: boolean): NounAnalysis {
  const result: NounAnalysis = {};

  // Definiteness
  if (hasAl) {
    result.definiteness = 'definite';
  } else if (word.includes('ً') || word.includes('ٌ') || word.includes('ٍ')) {
    result.definiteness = 'indefinite';
  }

  // Gender detection
  // Feminine markers: ة, اء, ى
  if (word.endsWith('ة') || word.endsWith('ةِ') || word.endsWith('ةً') || word.endsWith('ةٌ') || word.endsWith('ةٍ')) {
    result.gender = 'feminine';
  } else if (word.endsWith('اء') || word.endsWith('اءِ') || word.endsWith('اءَ') || word.endsWith('اءُ')) {
    result.gender = 'feminine';
  } else if (word.endsWith('ى') || word.endsWith('ىٰ')) {
    // Could be feminine or masculine (needs context)
    result.gender = 'feminine'; // Most common
  } else {
    result.gender = 'masculine';
  }

  // Number detection
  // Masculine plural: ون، ين
  if (word.endsWith('ونَ') || word.endsWith('ون') || word.endsWith('ينَ') || word.endsWith('ين')) {
    result.number = 'plural';
    result.gender = 'masculine';
  }
  // Feminine plural: ات
  else if (word.endsWith('ات') || word.endsWith('اتِ') || word.endsWith('اتٍ') || word.endsWith('اتٌ') || word.endsWith('اتً')) {
    result.number = 'plural';
    result.gender = 'feminine';
  }
  // Dual: ان، ين (before case ending analysis)
  else if (word.endsWith('انِ') || word.endsWith('ان') || word.endsWith('يْنِ')) {
    result.number = 'dual';
  }
  else {
    result.number = 'singular';
  }

  // Morphability (triptote vs diptote)
  // Diptotes don't take tanween and have fatha in genitive
  // Common diptote patterns: أَفْعَل, فَعْلَاء, فُعَل, مَفَاعِل, etc.
  const diptotePatterns = [
    /^أَ.ْ.َ/, // أفعل comparative
    /.َعْلَاء$/, // فعلاء feminine
    /^.ُ.َ.$/, // فُعَل broken plural
    /^مَ.َا.ِ/, // مَفَاعِل broken plural
    /^.َ.َا.ِ/, // فَعَائِل broken plural
  ];
  
  const hasTanween = word.includes('ً') || word.includes('ٌ') || word.includes('ٍ');
  if (hasTanween) {
    result.morphability = 'triptote';
  } else if (diptotePatterns.some(p => word.match(p))) {
    result.morphability = 'diptote';
  } else {
    result.morphability = 'triptote'; // Default assumption
  }

  // Noun type patterns
  // Active participle: فَاعِل pattern
  if (stem.match(/^.َا.ِ./)) {
    result.nounType = 'active-participle';
  }
  // Passive participle: مَفْعُول pattern
  else if (stem.match(/^مَ.ْ.ُو./)) {
    result.nounType = 'passive-participle';
  }
  // Verbal noun patterns are varied, default to common
  else {
    result.nounType = 'common';
  }

  return result;
}

// Format morphology details into readable strings
export function formatMorphologyDetails(details: MorphologyDetails): string[] {
  const lines: string[] = [];

  // Part of speech
  lines.push(`Part of Speech: ${details.partOfSpeech.charAt(0).toUpperCase() + details.partOfSpeech.slice(1)}`);

  if (details.partOfSpeech === 'verb') {
    if (details.tense) lines.push(`Tense: ${details.tense.charAt(0).toUpperCase() + details.tense.slice(1)}`);
    if (details.verbForm) lines.push(`Verb Form: ${details.verbForm}`);
    if (details.voice) lines.push(`Voice: ${details.voice.charAt(0).toUpperCase() + details.voice.slice(1)}`);
    if (details.person) lines.push(`Person: ${details.person}`);
    if (details.gender) lines.push(`Gender: ${details.gender.charAt(0).toUpperCase() + details.gender.slice(1)}`);
    if (details.number) lines.push(`Number: ${details.number.charAt(0).toUpperCase() + details.number.slice(1)}`);
  }

  if (details.partOfSpeech === 'noun') {
    if (details.nounType) lines.push(`Type: ${details.nounType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`);
    if (details.gender) lines.push(`Gender: ${details.gender.charAt(0).toUpperCase() + details.gender.slice(1)}`);
    if (details.number) lines.push(`Number: ${details.number.charAt(0).toUpperCase() + details.number.slice(1)}`);
    if (details.definiteness) lines.push(`Definiteness: ${details.definiteness.charAt(0).toUpperCase() + details.definiteness.slice(1)}`);
    if (details.case) lines.push(`Case: ${details.case.charAt(0).toUpperCase() + details.case.slice(1)}`);
    if (details.morphability) {
      const morphDesc = details.morphability === 'triptote' 
        ? 'Triptote (fully declinable)' 
        : details.morphability === 'diptote' 
          ? 'Diptote (partially declinable)' 
          : 'Indeclinable';
      lines.push(`Morphability: ${morphDesc}`);
    }
    if (details.person) lines.push(`Person: ${details.person}`);
  }

  if (details.root) {
    lines.push(`Root: ${details.root}`);
  }

  return lines;
}
