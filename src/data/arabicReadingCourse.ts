// Comprehensive Arabic Reading Course Data
// Based on traditional Tajweed science and makhaarij al-huruf

export interface ArabicLetter {
  id: string;
  arabic: string;
  name: string;
  transliteration: string;
  sound: string; // English approximation
  makhrajId: string;
  forms: {
    isolated: string;
    initial: string;
    medial: string;
    final: string;
  };
  connectorType: 'both' | 'right-only'; // whether it connects to the next letter
  tips: string; // pronunciation tips for English speakers
}

export interface Makhraj {
  id: string;
  name: string;
  nameArabic: string;
  description: string;
  location: string;
  englishComparison?: string; // comparison to English sounds
  letters: string[]; // letter IDs
  diagramPosition: { x: number; y: number }; // for SVG diagram
}

export interface ReadingLesson {
  id: number;
  title: string;
  titleArabic: string;
  description: string;
  type: 'alphabet' | 'makhaarij' | 'harakat' | 'connecting' | 'practice';
  content: LessonContent[];
  isUnlocked?: boolean;
}

export interface LessonContent {
  type: 'text' | 'letters' | 'diagram' | 'chart' | 'practice' | 'audio-note' | 'drill';
  data: any;
}

// ==========================================
// MAKHAARIJ AL-HURUF (Articulation Points)
// Based on classical Arabic phonetics
// ==========================================

export const makhaarij: Makhraj[] = [
  {
    id: 'jawf',
    name: 'The Empty Space (Al-Jawf)',
    nameArabic: 'الجَوْف',
    description: 'The empty space in the mouth and throat where the long vowels (madd letters) originate.',
    location: 'Empty space of mouth/throat',
    englishComparison: 'Like the long "a" in "father", long "ee" in "see", or long "oo" in "moon".',
    letters: ['alif-madd', 'waw-madd', 'ya-madd'],
    diagramPosition: { x: 50, y: 40 },
  },
  {
    id: 'halq-aqsa',
    name: 'Deepest Throat (Al-Halq Al-Aqsa)',
    nameArabic: 'أقصى الحَلْق',
    description: 'The deepest part of the throat, closest to the chest. These sounds do not exist in English.',
    location: 'Deepest throat',
    englishComparison: 'No English equivalent. Hamza is a glottal stop like the pause in "uh-oh".',
    letters: ['hamza', 'ha-deep'],
    diagramPosition: { x: 50, y: 75 },
  },
  {
    id: 'halq-wasat',
    name: 'Middle Throat (Wasat Al-Halq)',
    nameArabic: 'وَسَط الحَلْق',
    description: 'The middle of the throat. These are strong, aspirated sounds.',
    location: 'Middle throat',
    englishComparison: 'ع (Ayn) has no English equivalent - a deep, muscular sound. ح (Haa) is like a breathy "h".',
    letters: ['ayn', 'haa'],
    diagramPosition: { x: 50, y: 65 },
  },
  {
    id: 'halq-adna',
    name: 'Upper Throat (Adna Al-Halq)',
    nameArabic: 'أدنى الحَلْق',
    description: 'The upper part of the throat, near the back of the mouth.',
    location: 'Upper throat',
    englishComparison: 'غ (Ghayn) is like the French "r". خ (Khaa) is like "ch" in Scottish "loch".',
    letters: ['ghayn', 'khaa'],
    diagramPosition: { x: 50, y: 55 },
  },
  {
    id: 'lisan-aqsa',
    name: 'Back of Tongue (Aqsa Al-Lisan)',
    nameArabic: 'أقصى اللِّسان',
    description: 'The back of the tongue touching the soft palate.',
    location: 'Back tongue to soft palate',
    englishComparison: 'ق (Qaf) is deeper than English "k". ك (Kaf) is like English "k".',
    letters: ['qaf', 'kaf'],
    diagramPosition: { x: 55, y: 45 },
  },
  {
    id: 'lisan-wasat',
    name: 'Middle of Tongue (Wasat Al-Lisan)',
    nameArabic: 'وَسَط اللِّسان',
    description: 'The middle of the tongue touching the hard palate.',
    location: 'Middle tongue to hard palate',
    englishComparison: 'ج (Jeem) like "j" in "jam". ش (Sheen) like "sh" in "ship". ي (Ya) like "y" in "yes".',
    letters: ['jeem', 'sheen', 'ya'],
    diagramPosition: { x: 60, y: 35 },
  },
  {
    id: 'lisan-haffa',
    name: 'Edge of Tongue (Hafat Al-Lisan)',
    nameArabic: 'حافَّة اللِّسان',
    description: 'The edge of the tongue touching the upper molars.',
    location: 'Tongue edge to molars',
    englishComparison: 'ض (Daad) is unique to Arabic - the "letter of Daad" that defines the language.',
    letters: ['daad'],
    diagramPosition: { x: 70, y: 30 },
  },
  {
    id: 'lisan-taraf-lam',
    name: 'Tongue Tip - Laam Area',
    nameArabic: 'طَرَف اللِّسان (لام)',
    description: 'The tip of the tongue touching the gum ridge behind the front teeth.',
    location: 'Tongue tip to gum ridge',
    englishComparison: 'ل (Laam) is like English "l" but lighter and crisper.',
    letters: ['lam'],
    diagramPosition: { x: 75, y: 22 },
  },
  {
    id: 'lisan-taraf-nun',
    name: 'Tongue Tip - Noon Area',
    nameArabic: 'طَرَف اللِّسان (نون)',
    description: 'The tip of the tongue touching slightly lower on the gum ridge.',
    location: 'Tongue tip, slightly lower',
    englishComparison: 'ن (Noon) is like English "n".',
    letters: ['nun'],
    diagramPosition: { x: 76, y: 24 },
  },
  {
    id: 'lisan-taraf-ra',
    name: 'Tongue Tip - Raa Area',
    nameArabic: 'طَرَف اللِّسان (راء)',
    description: 'The tip of the tongue with a slight trill or tap.',
    location: 'Tongue tip with vibration',
    englishComparison: 'ر (Raa) is a rolled/trilled "r" like Spanish "rr", not like English "r".',
    letters: ['ra'],
    diagramPosition: { x: 74, y: 26 },
  },
  {
    id: 'lisan-taraf-emphatic',
    name: 'Tongue Tip - Emphatic Letters',
    nameArabic: 'طَرَف اللِّسان (مُفَخَّمة)',
    description: 'The tip of the tongue for emphatic (heavy) letters with the tongue raised.',
    location: 'Tongue tip, raised back',
    englishComparison: 'ط (Taa), د (Daal), ت (Taa), ظ (Dhaa) - heavier versions with raised tongue back.',
    letters: ['taa-emphatic', 'daal', 'taa', 'thaa-emphatic'],
    diagramPosition: { x: 78, y: 20 },
  },
  {
    id: 'lisan-taraf-thin',
    name: 'Tongue Tip - Thin Letters',
    nameArabic: 'طَرَف اللِّسان (رقيقة)',
    description: 'The tip of the tongue touching the edge of the front teeth.',
    location: 'Tongue tip to teeth edge',
    englishComparison: 'ث (Thaa) like "th" in "think". ذ (Dhaal) like "th" in "this". ظ (Dhaa) emphatic "th".',
    letters: ['thaa', 'dhaal', 'dhaa'],
    diagramPosition: { x: 82, y: 18 },
  },
  {
    id: 'shafataan',
    name: 'The Two Lips (Ash-Shafataan)',
    nameArabic: 'الشَّفَتان',
    description: 'Both lips coming together or the lower lip touching the upper teeth.',
    location: 'Lips',
    englishComparison: 'ب (Baa) like "b", م (Meem) like "m", و (Waw) like "w", ف (Faa) like "f".',
    letters: ['baa', 'meem', 'waw', 'faa'],
    diagramPosition: { x: 90, y: 15 },
  },
  {
    id: 'khayshum',
    name: 'The Nasal Passage (Al-Khayshum)',
    nameArabic: 'الخَيْشوم',
    description: 'The nasal cavity used for ghunnah (nasalization) in noon and meem.',
    location: 'Nasal cavity',
    englishComparison: 'The nasalized sound when noon or meem are held, like humming.',
    letters: ['nun-ghunnah', 'meem-ghunnah'],
    diagramPosition: { x: 65, y: 10 },
  },
];

// ==========================================
// THE ARABIC ALPHABET
// ==========================================

export const arabicLetters: ArabicLetter[] = [
  {
    id: 'alif',
    arabic: 'ا',
    name: 'Alif',
    transliteration: 'a/aa',
    sound: 'Like "a" in "father"',
    makhrajId: 'jawf',
    forms: { isolated: 'ا', initial: 'ا', medial: 'ـا', final: 'ـا' },
    connectorType: 'right-only',
    tips: 'Alif is a carrier for vowels and doesn\'t have its own sound. It extends the "a" sound.',
  },
  {
    id: 'baa',
    arabic: 'ب',
    name: 'Baa',
    transliteration: 'b',
    sound: 'Like "b" in "book"',
    makhrajId: 'shafataan',
    forms: { isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب' },
    connectorType: 'both',
    tips: 'Exactly like English "b". One dot below distinguishes it from similar letters.',
  },
  {
    id: 'taa',
    arabic: 'ت',
    name: 'Taa',
    transliteration: 't',
    sound: 'Like "t" in "tea"',
    makhrajId: 'lisan-taraf-emphatic',
    forms: { isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت' },
    connectorType: 'both',
    tips: 'Light "t" sound with the tip of tongue touching the gum ridge. Two dots above.',
  },
  {
    id: 'thaa',
    arabic: 'ث',
    name: 'Thaa',
    transliteration: 'th',
    sound: 'Like "th" in "think"',
    makhrajId: 'lisan-taraf-thin',
    forms: { isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث' },
    connectorType: 'both',
    tips: 'Tongue tip visible between teeth. Three dots above. Like "th" in "three".',
  },
  {
    id: 'jeem',
    arabic: 'ج',
    name: 'Jeem',
    transliteration: 'j',
    sound: 'Like "j" in "jam"',
    makhrajId: 'lisan-wasat',
    forms: { isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج' },
    connectorType: 'both',
    tips: 'Like English "j" in most dialects. One dot in the middle.',
  },
  {
    id: 'haa',
    arabic: 'ح',
    name: 'Haa',
    transliteration: 'ḥ',
    sound: 'Breathy "h" from mid-throat',
    makhrajId: 'halq-wasat',
    forms: { isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح' },
    connectorType: 'both',
    tips: 'NO English equivalent. A strong, aspirated "h" from the middle of the throat. Not like "h" in "hello".',
  },
  {
    id: 'khaa',
    arabic: 'خ',
    name: 'Khaa',
    transliteration: 'kh',
    sound: 'Like "ch" in Scottish "loch"',
    makhrajId: 'halq-adna',
    forms: { isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ' },
    connectorType: 'both',
    tips: 'Like clearing your throat gently. Similar to German "ch" in "Bach". One dot above.',
  },
  {
    id: 'daal',
    arabic: 'د',
    name: 'Daal',
    transliteration: 'd',
    sound: 'Like "d" in "door"',
    makhrajId: 'lisan-taraf-emphatic',
    forms: { isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد' },
    connectorType: 'right-only',
    tips: 'Light "d" with tongue tip at gum ridge. Does not connect to the letter after it.',
  },
  {
    id: 'dhaal',
    arabic: 'ذ',
    name: 'Dhaal',
    transliteration: 'dh',
    sound: 'Like "th" in "this"',
    makhrajId: 'lisan-taraf-thin',
    forms: { isolated: 'ذ', initial: 'ذ', medial: 'ـذ', final: 'ـذ' },
    connectorType: 'right-only',
    tips: 'Tongue between teeth, voiced. Like "th" in "the" or "that". One dot above.',
  },
  {
    id: 'ra',
    arabic: 'ر',
    name: 'Raa',
    transliteration: 'r',
    sound: 'Rolled/trilled "r"',
    makhrajId: 'lisan-taraf-ra',
    forms: { isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر' },
    connectorType: 'right-only',
    tips: 'NOT like English "r". It is trilled/rolled like Spanish "rr". Tongue tip vibrates.',
  },
  {
    id: 'zay',
    arabic: 'ز',
    name: 'Zaay',
    transliteration: 'z',
    sound: 'Like "z" in "zoo"',
    makhrajId: 'lisan-taraf-thin',
    forms: { isolated: 'ز', initial: 'ز', medial: 'ـز', final: 'ـز' },
    connectorType: 'right-only',
    tips: 'Like English "z". One dot above. Same shape as Raa but with a dot.',
  },
  {
    id: 'seen',
    arabic: 'س',
    name: 'Seen',
    transliteration: 's',
    sound: 'Like "s" in "sun"',
    makhrajId: 'lisan-taraf-thin',
    forms: { isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس' },
    connectorType: 'both',
    tips: 'Light "s" sound. The three "teeth" pattern is distinctive.',
  },
  {
    id: 'sheen',
    arabic: 'ش',
    name: 'Sheen',
    transliteration: 'sh',
    sound: 'Like "sh" in "ship"',
    makhrajId: 'lisan-wasat',
    forms: { isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش' },
    connectorType: 'both',
    tips: 'Like English "sh". Same shape as Seen but with three dots above.',
  },
  {
    id: 'saad',
    arabic: 'ص',
    name: 'Saad',
    transliteration: 'ṣ',
    sound: 'Emphatic/heavy "s"',
    makhrajId: 'lisan-taraf-emphatic',
    forms: { isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص' },
    connectorType: 'both',
    tips: 'NO English equivalent. Heavy "s" with back of tongue raised. Makes surrounding vowels sound deeper.',
  },
  {
    id: 'daad',
    arabic: 'ض',
    name: 'Daad',
    transliteration: 'ḍ',
    sound: 'Emphatic/heavy "d"',
    makhrajId: 'lisan-haffa',
    forms: { isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض' },
    connectorType: 'both',
    tips: 'The "Letter of Daad" - unique to Arabic! Heavy "d" with tongue edge pressing against molars. Arabic is called "the language of Daad".',
  },
  {
    id: 'taa-emphatic',
    arabic: 'ط',
    name: 'Taa (Emphatic)',
    transliteration: 'ṭ',
    sound: 'Emphatic/heavy "t"',
    makhrajId: 'lisan-taraf-emphatic',
    forms: { isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ـط' },
    connectorType: 'both',
    tips: 'Heavy "t" with back of tongue raised. Creates a deeper, fuller sound than regular Taa.',
  },
  {
    id: 'dhaa',
    arabic: 'ظ',
    name: 'Dhaa (Emphatic)',
    transliteration: 'ẓ',
    sound: 'Emphatic "th" in "this"',
    makhrajId: 'lisan-taraf-thin',
    forms: { isolated: 'ظ', initial: 'ظـ', medial: 'ـظـ', final: 'ـظ' },
    connectorType: 'both',
    tips: 'Heavy version of Dhaal. Tongue between teeth with back raised. Very rare in English.',
  },
  {
    id: 'ayn',
    arabic: 'ع',
    name: 'Ayn',
    transliteration: 'ʿ',
    sound: 'Deep throat constriction',
    makhrajId: 'halq-wasat',
    forms: { isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع' },
    connectorType: 'both',
    tips: 'NO English equivalent. A deep, muscular sound from squeezing the middle of the throat. Practice by saying "ah" while constricting.',
  },
  {
    id: 'ghayn',
    arabic: 'غ',
    name: 'Ghayn',
    transliteration: 'gh',
    sound: 'Like French "r"',
    makhrajId: 'halq-adna',
    forms: { isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ' },
    connectorType: 'both',
    tips: 'Like gargling gently. Similar to French "r" or saying "g" while gargling. One dot above.',
  },
  {
    id: 'faa',
    arabic: 'ف',
    name: 'Faa',
    transliteration: 'f',
    sound: 'Like "f" in "fun"',
    makhrajId: 'shafataan',
    forms: { isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف' },
    connectorType: 'both',
    tips: 'Like English "f". Upper teeth on lower lip. One dot above.',
  },
  {
    id: 'qaf',
    arabic: 'ق',
    name: 'Qaf',
    transliteration: 'q',
    sound: 'Deep "k" from throat',
    makhrajId: 'lisan-aqsa',
    forms: { isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق' },
    connectorType: 'both',
    tips: 'NOT like English "k". Much deeper, from the very back of the throat. Two dots above.',
  },
  {
    id: 'kaf',
    arabic: 'ك',
    name: 'Kaf',
    transliteration: 'k',
    sound: 'Like "k" in "king"',
    makhrajId: 'lisan-aqsa',
    forms: { isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك' },
    connectorType: 'both',
    tips: 'Like English "k" but lighter. Has a small hamza-like stroke inside.',
  },
  {
    id: 'lam',
    arabic: 'ل',
    name: 'Laam',
    transliteration: 'l',
    sound: 'Like "l" in "light"',
    makhrajId: 'lisan-taraf-lam',
    forms: { isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل' },
    connectorType: 'both',
    tips: 'Similar to English "l" but lighter and crisper. Tip of tongue touches gum ridge.',
  },
  {
    id: 'meem',
    arabic: 'م',
    name: 'Meem',
    transliteration: 'm',
    sound: 'Like "m" in "moon"',
    makhrajId: 'shafataan',
    forms: { isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم' },
    connectorType: 'both',
    tips: 'Like English "m". Lips pressed together.',
  },
  {
    id: 'nun',
    arabic: 'ن',
    name: 'Noon',
    transliteration: 'n',
    sound: 'Like "n" in "noon"',
    makhrajId: 'lisan-taraf-nun',
    forms: { isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن' },
    connectorType: 'both',
    tips: 'Like English "n". One dot above.',
  },
  {
    id: 'ha-light',
    arabic: 'ه',
    name: 'Haa (Light)',
    transliteration: 'h',
    sound: 'Like "h" in "hello"',
    makhrajId: 'halq-aqsa',
    forms: { isolated: 'ه', initial: 'هـ', medial: 'ـهـ', final: 'ـه' },
    connectorType: 'both',
    tips: 'From the deepest part of throat. Lighter than Haa (ح) but deeper than English "h".',
  },
  {
    id: 'waw',
    arabic: 'و',
    name: 'Waw',
    transliteration: 'w/oo',
    sound: 'Like "w" in "water" or "oo" in "moon"',
    makhrajId: 'shafataan',
    forms: { isolated: 'و', initial: 'و', medial: 'ـو', final: 'ـو' },
    connectorType: 'right-only',
    tips: 'Can be a consonant "w" or a long vowel "oo". Lips rounded.',
  },
  {
    id: 'ya',
    arabic: 'ي',
    name: 'Yaa',
    transliteration: 'y/ee',
    sound: 'Like "y" in "yes" or "ee" in "see"',
    makhrajId: 'lisan-wasat',
    forms: { isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي' },
    connectorType: 'both',
    tips: 'Can be a consonant "y" or a long vowel "ee". Two dots below.',
  },
  {
    id: 'hamza',
    arabic: 'ء',
    name: 'Hamza',
    transliteration: 'ʾ',
    sound: 'Glottal stop',
    makhrajId: 'halq-aqsa',
    forms: { isolated: 'ء', initial: 'أ', medial: 'ـئـ', final: 'ـأ' },
    connectorType: 'both',
    tips: 'A catch in the throat, like the pause between "uh" and "oh" in "uh-oh". Written on different carriers.',
  },
  {
    id: 'taa-marbuta',
    arabic: 'ة',
    name: 'Taa Marbuta',
    transliteration: 'h/t',
    sound: 'Like "h" at end of words',
    makhrajId: 'halq-aqsa',
    forms: { isolated: 'ة', initial: '-', medial: '-', final: 'ـة' },
    connectorType: 'right-only',
    tips: 'Only appears at the end of words. Usually silent or sounds like "h", but becomes "t" when connected to another word.',
  },
];

// ==========================================
// HARAKAT (VOWEL MARKS)
// ==========================================

export interface Harakah {
  id: string;
  name: string;
  nameArabic: string;
  symbol: string;
  sound: string;
  description: string;
  example: { arabic: string; transliteration: string };
}

export const harakat: Harakah[] = [
  {
    id: 'fatha',
    name: 'Fatha',
    nameArabic: 'فَتْحة',
    symbol: 'َ',
    sound: 'Short "a" as in "cat"',
    description: 'A small diagonal line above the letter. Opens the mouth.',
    example: { arabic: 'بَ', transliteration: 'ba' },
  },
  {
    id: 'kasra',
    name: 'Kasra',
    nameArabic: 'كَسْرة',
    symbol: 'ِ',
    sound: 'Short "i" as in "sit"',
    description: 'A small diagonal line below the letter. Brings the sound forward.',
    example: { arabic: 'بِ', transliteration: 'bi' },
  },
  {
    id: 'damma',
    name: 'Damma',
    nameArabic: 'ضَمّة',
    symbol: 'ُ',
    sound: 'Short "u" as in "put"',
    description: 'A small curl above the letter. Rounds the lips.',
    example: { arabic: 'بُ', transliteration: 'bu' },
  },
  {
    id: 'sukun',
    name: 'Sukun',
    nameArabic: 'سُكون',
    symbol: 'ْ',
    sound: 'No vowel (letter is silent)',
    description: 'A small circle above the letter. The consonant is stopped.',
    example: { arabic: 'بْ', transliteration: 'b (stopped)' },
  },
  {
    id: 'shadda',
    name: 'Shadda',
    nameArabic: 'شَدّة',
    symbol: 'ّ',
    sound: 'Doubled consonant',
    description: 'A w-shaped mark above the letter. The letter is pronounced twice.',
    example: { arabic: 'بَّ', transliteration: 'bba' },
  },
  {
    id: 'tanwin-fath',
    name: 'Tanween Fatha',
    nameArabic: 'تَنوين فَتح',
    symbol: 'ً',
    sound: '"an" sound at word end',
    description: 'Double fatha. Adds "n" sound at the end.',
    example: { arabic: 'كِتابًا', transliteration: 'kitaaban' },
  },
  {
    id: 'tanwin-kasr',
    name: 'Tanween Kasra',
    nameArabic: 'تَنوين كَسر',
    symbol: 'ٍ',
    sound: '"in" sound at word end',
    description: 'Double kasra. Adds "n" sound at the end.',
    example: { arabic: 'كِتابٍ', transliteration: 'kitaabin' },
  },
  {
    id: 'tanwin-damm',
    name: 'Tanween Damma',
    nameArabic: 'تَنوين ضَمّ',
    symbol: 'ٌ',
    sound: '"un" sound at word end',
    description: 'Double damma. Adds "n" sound at the end.',
    example: { arabic: 'كِتابٌ', transliteration: 'kitaabun' },
  },
];

// ==========================================
// READING LESSONS
// ==========================================

export const readingLessons: ReadingLesson[] = [
  {
    id: 1,
    title: 'Introduction to Arabic Script',
    titleArabic: 'مُقَدِّمة',
    description: 'Understand how Arabic differs from English and the basics of the writing system.',
    type: 'alphabet',
    isUnlocked: true,
    content: [
      {
        type: 'text',
        data: {
          title: 'Arabic is Different - And That\'s Okay',
          paragraphs: [
            'Arabic is written from RIGHT to LEFT. This might feel strange at first, but your brain will adapt quickly.',
            'Arabic letters change shape depending on their position in a word. Each letter has up to 4 forms: isolated, beginning, middle, and end.',
            'There are no capital letters in Arabic. The script is always the same.',
            'Most vowels are written as small marks above or below letters, not as separate letters.',
          ],
        },
      },
      {
        type: 'text',
        data: {
          title: 'What You\'ll Learn',
          paragraphs: [
            '1. The 28 letters of the Arabic alphabet',
            '2. Where each sound comes from in your mouth/throat (makhaarij)',
            '3. How letters connect to form words',
            '4. The vowel marks (harakat) that give letters their sounds',
            '5. Practice reading real Arabic text',
          ],
        },
      },
    ],
  },
  {
    id: 2,
    title: 'The Arabic Alphabet Overview',
    titleArabic: 'الحُروف',
    description: 'Meet all 28 letters with their names and basic sounds.',
    type: 'alphabet',
    isUnlocked: true,
    content: [
      {
        type: 'chart',
        data: { chartType: 'alphabet-full' },
      },
      {
        type: 'text',
        data: {
          title: 'Letter Groups for English Speakers',
          paragraphs: [
            'FAMILIAR SOUNDS: ب (b), ت (t), ث (th), ج (j), د (d), ذ (th), ر (r), ز (z), س (s), ش (sh), ف (f), ك (k), ل (l), م (m), ن (n)',
            'NEW BUT LEARNABLE: خ (kh - like Scottish "loch"), غ (gh - like French "r"), ق (q - deep k)',
            'UNIQUE TO ARABIC: ح (deep h), ع (throat squeeze), ص ض ط ظ (emphatic versions)',
          ],
        },
      },
    ],
  },
  {
    id: 3,
    title: 'Where Sounds Come From',
    titleArabic: 'المَخارِج',
    description: 'Learn where each Arabic letter originates - from the throat, tongue, or lips.',
    type: 'makhaarij',
    content: [
      {
        type: 'text',
        data: {
          title: 'Articulation Points (Makhaarij)',
          paragraphs: [
            'Every Arabic letter has a specific place in the mouth or throat where it is produced. Mastering these points is essential for proper Quranic recitation.',
            'The letters are grouped by their articulation point. Click each group to see the letters with their three vowel forms (fatha, kasra, damma) and a diagram showing where to place your tongue.',
          ],
        },
      },
      {
        type: 'diagram',
        data: { diagramType: 'articulation-chart' },
      },
    ],
  },
  {
    id: 4,
    title: 'Throat Letters',
    titleArabic: 'حُروف الحَلق',
    description: 'Master the six throat letters that challenge English speakers.',
    type: 'makhaarij',
    content: [
      {
        type: 'text',
        data: {
          title: 'The Throat Letters',
          paragraphs: [
            'These letters come from the throat and are challenging for English speakers because most don\'t exist in English.',
            'Practice tip: Place your hand on your throat and feel it vibrate differently for each letter.',
          ],
        },
      },
      {
        type: 'letters',
        data: {
          letterIds: ['hamza', 'ha-light', 'ayn', 'haa', 'ghayn', 'khaa'],
          focus: 'throat',
        },
      },
    ],
  },
  {
    id: 5,
    title: 'The Short Vowels (Harakat)',
    titleArabic: 'الحَرَكات',
    description: 'Learn fatha, kasra, and damma - the three short vowels.',
    type: 'harakat',
    content: [
      {
        type: 'chart',
        data: { chartType: 'harakat' },
      },
    ],
  },
  // ==========================================
  // QAAIDA-STYLE DRILLS: Fatha Practice
  // ==========================================
  {
    id: 6,
    title: 'Fatha Drill: Single Letters',
    titleArabic: 'تَدريب الفَتحة',
    description: 'Practice reading letters with fatha (the "a" sound).',
    type: 'practice',
    content: [
      {
        type: 'text',
        data: {
          title: 'Fatha (فَتحة) - The "a" Sound',
          paragraphs: [
            'Fatha is a small diagonal stroke above a letter. It gives the letter a short "a" sound like in "cat".',
            'Read each syllable aloud, row by row. Focus on pronunciation, not meaning.',
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'Single Letter Fatha Drill',
          titleArabic: 'تَدريب الحُروف بالفَتحة',
          rows: [
            ['بَ', 'تَ', 'ثَ', 'جَ', 'حَ', 'خَ'],
            ['دَ', 'ذَ', 'رَ', 'زَ', 'سَ', 'شَ'],
            ['صَ', 'ضَ', 'طَ', 'ظَ', 'عَ', 'غَ'],
            ['فَ', 'قَ', 'كَ', 'لَ', 'مَ', 'نَ'],
            ['هَ', 'وَ', 'يَ', 'ءَ', 'أَ', 'إِ'],
          ],
        },
      },
    ],
  },
  {
    id: 7,
    title: 'Kasra Drill: Single Letters',
    titleArabic: 'تَدريب الكَسرة',
    description: 'Practice reading letters with kasra (the "i" sound).',
    type: 'practice',
    content: [
      {
        type: 'text',
        data: {
          title: 'Kasra (كَسرة) - The "i" Sound',
          paragraphs: [
            'Kasra is a small diagonal stroke below a letter. It gives the letter a short "i" sound like in "sit".',
            'Read each syllable aloud. Notice how your mouth position changes from fatha.',
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'Single Letter Kasra Drill',
          titleArabic: 'تَدريب الحُروف بالكَسرة',
          rows: [
            ['بِ', 'تِ', 'ثِ', 'جِ', 'حِ', 'خِ'],
            ['دِ', 'ذِ', 'رِ', 'زِ', 'سِ', 'شِ'],
            ['صِ', 'ضِ', 'طِ', 'ظِ', 'عِ', 'غِ'],
            ['فِ', 'قِ', 'كِ', 'لِ', 'مِ', 'نِ'],
            ['هِ', 'وِ', 'يِ', 'ءِ', 'أِ', 'إِ'],
          ],
        },
      },
    ],
  },
  {
    id: 8,
    title: 'Damma Drill: Single Letters',
    titleArabic: 'تَدريب الضَّمة',
    description: 'Practice reading letters with damma (the "u" sound).',
    type: 'practice',
    content: [
      {
        type: 'text',
        data: {
          title: 'Damma (ضَمّة) - The "u" Sound',
          paragraphs: [
            'Damma is a small curl above a letter. It gives the letter a short "u" sound like in "put".',
            'Round your lips when pronouncing damma.',
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'Single Letter Damma Drill',
          titleArabic: 'تَدريب الحُروف بالضَّمة',
          rows: [
            ['بُ', 'تُ', 'ثُ', 'جُ', 'حُ', 'خُ'],
            ['دُ', 'ذُ', 'رُ', 'زُ', 'سُ', 'شُ'],
            ['صُ', 'ضُ', 'طُ', 'ظُ', 'عُ', 'غُ'],
            ['فُ', 'قُ', 'كُ', 'لُ', 'مُ', 'نُ'],
            ['هُ', 'وُ', 'يُ', 'ءُ', 'أُ', 'إُ'],
          ],
        },
      },
    ],
  },
  // ==========================================
  // TWO-LETTER COMBINATIONS
  // ==========================================
  {
    id: 9,
    title: 'Two-Letter Combinations',
    titleArabic: 'تَركيب حَرفَين',
    description: 'Read two-letter syllables with mixed vowels.',
    type: 'practice',
    content: [
      {
        type: 'text',
        data: {
          title: 'Combining Letters',
          paragraphs: [
            'Now we combine two letters. Read smoothly without pausing between letters.',
            'These are practice syllables - they may or may not be real words.',
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'Two-Letter Drill - Fatha + Fatha',
          titleArabic: 'فَتحة + فَتحة',
          rows: [
            ['بَرَ', 'كَتَ', 'نَصَ', 'جَلَ', 'حَمَ', 'سَمَ'],
            ['فَتَ', 'قَرَ', 'عَلَ', 'ذَهَ', 'خَلَ', 'طَبَ'],
            ['رَكَ', 'مَشَ', 'صَدَ', 'ضَرَ', 'غَفَ', 'ثَبَ'],
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'Two-Letter Drill - Mixed Vowels',
          titleArabic: 'حَركات مُختَلِفة',
          rows: [
            ['بِرُ', 'كَتِ', 'نُصَ', 'جِلُ', 'حُمَ', 'سِمُ'],
            ['فَتِ', 'قُرَ', 'عِلُ', 'ذِهَ', 'خُلَ', 'طِبُ'],
            ['رِكُ', 'مُشَ', 'صِدُ', 'ضَرِ', 'غُفِ', 'ثُبَ'],
          ],
        },
      },
    ],
  },
  // ==========================================
  // SUKUN PRACTICE
  // ==========================================
  {
    id: 10,
    title: 'Sukun: Stopping Consonants',
    titleArabic: 'السُّكون',
    description: 'Learn to stop a consonant with sukun (no vowel).',
    type: 'practice',
    content: [
      {
        type: 'text',
        data: {
          title: 'Sukun (سُكون) - The Stop',
          paragraphs: [
            'Sukun is a small circle above a letter. It means the consonant has NO vowel and stops.',
            'Example: أَبْ (ab) - the ب has sukun so you stop after "b".',
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'Sukun Drill - Two Letters',
          titleArabic: 'تَدريب السُّكون',
          rows: [
            ['أَبْ', 'أَتْ', 'أَثْ', 'أَجْ', 'أَحْ', 'أَخْ'],
            ['أَدْ', 'أَذْ', 'أَرْ', 'أَزْ', 'أَسْ', 'أَشْ'],
            ['أَصْ', 'أَضْ', 'أَطْ', 'أَظْ', 'أَعْ', 'أَغْ'],
            ['أَفْ', 'أَقْ', 'أَكْ', 'أَلْ', 'أَمْ', 'أَنْ'],
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'Three-Letter with Sukun',
          titleArabic: 'ثَلاثة أحرُف مَع سُكون',
          rows: [
            ['بَرْكَ', 'كَتْبَ', 'نَصْرَ', 'جَلْسَ', 'حَمْدَ', 'سَمْعَ'],
            ['فَتْحَ', 'قَرْبَ', 'عَلْمَ', 'ذَهْبَ', 'خَلْقَ', 'طَبْعَ'],
            ['رَكْضَ', 'مَشْيَ', 'صَدْقَ', 'ضَرْبَ', 'غَفْرَ', 'ثَبْتَ'],
          ],
        },
      },
    ],
  },
  // ==========================================
  // MADD (LONG VOWELS)
  // ==========================================
  {
    id: 11,
    title: 'Madd: Long Vowels',
    titleArabic: 'حُروف المَدّ',
    description: 'Stretch the vowel sound with alif, waw, and ya.',
    type: 'practice',
    content: [
      {
        type: 'text',
        data: {
          title: 'Madd (مَدّ) - Stretching the Vowel',
          paragraphs: [
            'Madd means to stretch the vowel sound. There are three madd letters:',
            'ا (Alif) after fatha = "aa" as in "father"',
            'و (Waw) after damma = "oo" as in "moon"',
            'ي (Ya) after kasra = "ee" as in "see"',
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'Alif Madd (aa)',
          titleArabic: 'مَدّ الألِف',
          rows: [
            ['بَا', 'تَا', 'ثَا', 'جَا', 'حَا', 'خَا'],
            ['دَا', 'ذَا', 'رَا', 'زَا', 'سَا', 'شَا'],
            ['صَا', 'ضَا', 'طَا', 'ظَا', 'عَا', 'غَا'],
            ['فَا', 'قَا', 'كَا', 'لَا', 'مَا', 'نَا'],
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'Waw Madd (oo)',
          titleArabic: 'مَدّ الواو',
          rows: [
            ['بُو', 'تُو', 'ثُو', 'جُو', 'حُو', 'خُو'],
            ['دُو', 'ذُو', 'رُو', 'زُو', 'سُو', 'شُو'],
            ['صُو', 'ضُو', 'طُو', 'ظُو', 'عُو', 'غُو'],
            ['فُو', 'قُو', 'كُو', 'لُو', 'مُو', 'نُو'],
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'Ya Madd (ee)',
          titleArabic: 'مَدّ الياء',
          rows: [
            ['بِي', 'تِي', 'ثِي', 'جِي', 'حِي', 'خِي'],
            ['دِي', 'ذِي', 'رِي', 'زِي', 'سِي', 'شِي'],
            ['صِي', 'ضِي', 'طِي', 'ظِي', 'عِي', 'غِي'],
            ['فِي', 'قِي', 'كِي', 'لِي', 'مِي', 'نِي'],
          ],
        },
      },
    ],
  },
  // ==========================================
  // SHADDA (DOUBLED LETTERS)
  // ==========================================
  {
    id: 12,
    title: 'Shadda: Doubled Letters',
    titleArabic: 'الشَّدّة',
    description: 'Learn to pronounce doubled consonants.',
    type: 'practice',
    content: [
      {
        type: 'text',
        data: {
          title: 'Shadda (شَدّة) - Doubling',
          paragraphs: [
            'Shadda looks like a small "w" above a letter. It means the letter is pronounced twice.',
            'Hold the consonant slightly longer. Example: رَبَّ (rabba) - hold the "b" sound.',
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'Shadda Drill',
          titleArabic: 'تَدريب الشَّدّة',
          rows: [
            ['رَبَّ', 'سَمَّ', 'حَقَّ', 'ضَلَّ', 'مَرَّ', 'فَرَّ'],
            ['جَنَّ', 'شَكَّ', 'هَمَّ', 'عَمَّ', 'ظَنَّ', 'قَصَّ'],
            ['رَبِّ', 'سُمِّ', 'حُقِّ', 'ضُلِّ', 'مُرِّ', 'فُرِّ'],
            ['رَبُّ', 'سَمُّ', 'حَقُّ', 'ضَلُّ', 'مَرُّ', 'فَرُّ'],
          ],
        },
      },
    ],
  },
  // ==========================================
  // TANWEEN (NUNATION)
  // ==========================================
  {
    id: 13,
    title: 'Tanween: Nunation',
    titleArabic: 'التَّنوين',
    description: 'Add the "n" sound at the end of words.',
    type: 'practice',
    content: [
      {
        type: 'text',
        data: {
          title: 'Tanween (تَنوين) - The "n" Ending',
          paragraphs: [
            'Tanween adds an "n" sound to the end of a word. There are three types:',
            'Tanween Fatha (ـًا) = "an" | Tanween Kasra (ـٍ) = "in" | Tanween Damma (ـٌ) = "un"',
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'Tanween Drill',
          titleArabic: 'تَدريب التَّنوين',
          rows: [
            ['كِتَابًا', 'بَابًا', 'قَلَمًا', 'وَلَدًا', 'بِنْتًا', 'بَيْتًا'],
            ['كِتَابٍ', 'بَابٍ', 'قَلَمٍ', 'وَلَدٍ', 'بِنْتٍ', 'بَيْتٍ'],
            ['كِتَابٌ', 'بَابٌ', 'قَلَمٌ', 'وَلَدٌ', 'بِنْتٌ', 'بَيْتٌ'],
          ],
        },
      },
    ],
  },
  // ==========================================
  // COMPREHENSIVE READING DRILLS
  // ==========================================
  {
    id: 14,
    title: 'Multi-Syllable Reading',
    titleArabic: 'قِراءة مُتَعَدِّدة المَقاطِع',
    description: 'Practice reading longer combinations.',
    type: 'practice',
    content: [
      {
        type: 'text',
        data: {
          title: 'Putting It All Together',
          paragraphs: [
            'Now practice reading longer syllable combinations. Read smoothly from right to left.',
            'These may or may not be real words - focus on smooth pronunciation.',
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'Three-Syllable Drill',
          titleArabic: 'تَدريب ثُلاثي المَقاطِع',
          rows: [
            ['بَرَكَ', 'كَتَبَ', 'نَصَرَ', 'جَلَسَ', 'حَمَدَ', 'سَمِعَ'],
            ['فَتَحَ', 'قَرَأَ', 'عَلِمَ', 'ذَهَبَ', 'خَلَقَ', 'طَبَعَ'],
            ['رَكَضَ', 'مَشَى', 'صَدَقَ', 'ضَرَبَ', 'غَفَرَ', 'ثَبَتَ'],
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'Four-Syllable Drill',
          titleArabic: 'تَدريب رُباعي المَقاطِع',
          rows: [
            ['يَكْتُبُ', 'يَنْصُرُ', 'يَجْلِسُ', 'يَحْمَدُ', 'يَسْمَعُ', 'يَفْتَحُ'],
            ['مَكْتَبَة', 'مَدْرَسَة', 'مَسْجِدَة', 'مَعْرِفَة', 'مَغْفِرَة', 'مَحَبَّة'],
            ['كَاتِبُونَ', 'نَاصِرُونَ', 'جَالِسُونَ', 'حَامِدُونَ', 'سَامِعُونَ', 'فَاتِحُونَ'],
          ],
        },
      },
    ],
  },
  // ==========================================
  // SIMILAR LETTER DISTINCTION
  // ==========================================
  {
    id: 15,
    title: 'Distinguishing Similar Letters',
    titleArabic: 'تَمييز الحُروف المُتَشابِهة',
    description: 'Train your eye and tongue to tell apart similar letters.',
    type: 'practice',
    content: [
      {
        type: 'text',
        data: {
          title: 'Similar Letters - Different Sounds',
          paragraphs: [
            'Many Arabic letters look similar but sound different. Practice reading these pairs carefully.',
            'Focus on: dot positions, heavy vs light pronunciation.',
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'ب ت ث ن ي - Dot Differences',
          titleArabic: 'فَرق النُّقَط',
          rows: [
            ['بَنَ', 'تَنَ', 'ثَنَ', 'نَبَ', 'يَبَ', 'بَيَ'],
            ['بِيْتَ', 'تِيْنَ', 'ثِيْرَ', 'نِيْلَ', 'يِيْنَ', 'بِيْنَ'],
            ['نَبْتَ', 'بَنْتَ', 'تَبَنَّ', 'ثَبَتَ', 'يَنْبُتْ', 'نَيَّبَ'],
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'س ش - The "s" vs "sh" Sounds',
          titleArabic: 'السين والشين',
          rows: [
            ['سَمَ', 'شَمَ', 'سِمَ', 'شِمَ', 'سُمَ', 'شُمَ'],
            ['سَمْسَ', 'شَمْشَ', 'سَاشَ', 'شَاسَ', 'سِيشَ', 'شِيسَ'],
            ['مَسَّ', 'مَشَّ', 'سَشَّ', 'شَسَّ', 'سُوشَ', 'شُوسَ'],
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'ص س - Light vs Heavy "s"',
          titleArabic: 'السين والصاد',
          rows: [
            ['سَبَ', 'صَبَ', 'سِبَ', 'صِبَ', 'سُبَ', 'صُبَ'],
            ['سَالَ', 'صَالَ', 'سِيرَ', 'صِيرَ', 'سُورَ', 'صُورَ'],
            ['بَسَّ', 'بَصَّ', 'نَسَّ', 'نَصَّ', 'فَسَّ', 'فَصَّ'],
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'ح خ ج - Similar Shapes',
          titleArabic: 'الحاء والخاء والجيم',
          rows: [
            ['حَمَ', 'خَمَ', 'جَمَ', 'حِمَ', 'خِمَ', 'جِمَ'],
            ['حَالَ', 'خَالَ', 'جَالَ', 'حُولَ', 'خُولَ', 'جُولَ'],
            ['مَحَّ', 'مَخَّ', 'مَجَّ', 'رَحَّ', 'رَخَّ', 'رَجَّ'],
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'ط ت - Light vs Heavy "t"',
          titleArabic: 'التاء والطاء',
          rows: [
            ['تَبَ', 'طَبَ', 'تِبَ', 'طِبَ', 'تُبَ', 'طُبَ'],
            ['تَابَ', 'طَابَ', 'تِينَ', 'طِينَ', 'تُورَ', 'طُورَ'],
            ['بَتَّ', 'بَطَّ', 'مَتَّ', 'مَطَّ', 'فَتَّ', 'فَطَّ'],
          ],
        },
      },
      {
        type: 'drill',
        data: {
          title: 'د ذ ض - D Variations',
          titleArabic: 'الدال والذال والضاد',
          rows: [
            ['دَرَ', 'ذَرَ', 'ضَرَ', 'دِرَ', 'ذِرَ', 'ضِرَ'],
            ['دَامَ', 'ذَامَ', 'ضَامَ', 'دِيمَ', 'ذِيمَ', 'ضِيمَ'],
            ['رَدَّ', 'رَذَّ', 'رَضَّ', 'مَدَّ', 'مَذَّ', 'مَضَّ'],
          ],
        },
      },
    ],
  },
  {
    id: 16,
    title: 'Letters That Don\'t Connect',
    titleArabic: 'الحُروف غَير المُتَّصِلة',
    description: 'Six letters only connect to the letter before them.',
    type: 'connecting',
    content: [
      {
        type: 'letters',
        data: {
          letterIds: ['alif', 'daal', 'dhaal', 'ra', 'zay', 'waw'],
          focus: 'non-connectors',
        },
      },
      {
        type: 'text',
        data: {
          title: 'The Non-Connecting Six',
          paragraphs: [
            'These letters NEVER connect to the letter that follows them. They only connect to the letter before.',
            'Remember them by the mnemonic: "ا د ذ ر ز و" (Alif, Daal, Dhaal, Raa, Zaay, Waw)',
            'When writing, after one of these letters, you lift your pen and start the next letter fresh.',
          ],
        },
      },
    ],
  },
  {
    id: 17,
    title: 'Letter Forms & Connections',
    titleArabic: 'أشكال الحُروف',
    description: 'See how each letter transforms based on its position.',
    type: 'connecting',
    content: [
      {
        type: 'chart',
        data: { chartType: 'letter-forms' },
      },
    ],
  },
  {
    id: 18,
    title: 'The Emphatic Letters',
    titleArabic: 'حُروف التَّفخيم',
    description: 'Master the heavy letters unique to Arabic: ص ض ط ظ',
    type: 'makhaarij',
    content: [
      {
        type: 'text',
        data: {
          title: 'The Art of Tafkheem (Heaviness)',
          paragraphs: [
            'These four letters are "emphatic" or "heavy". They require raising the back of your tongue while pronouncing.',
            'When you pronounce them, the surrounding vowels become deeper and fuller.',
            'ض (Daad) is SO unique that Arabic is called "لُغة الضّاد" - the Language of Daad!',
            'Practice tip: Say "s" and feel your tongue flat. Now try to say "s" while keeping the back of your tongue raised toward your soft palate. That\'s the emphatic quality.',
          ],
        },
      },
      {
        type: 'letters',
        data: {
          letterIds: ['saad', 'daad', 'taa-emphatic', 'dhaa'],
          focus: 'emphatic',
        },
      },
    ],
  },
  // ==========================================
  // COMPREHENSIVE PRACTICE WORDS
  // ==========================================
  {
    id: 19,
    title: 'Reading Practice: Simple Words',
    titleArabic: 'تَدريب القِراءة',
    description: 'Put it all together and read your first Arabic words.',
    type: 'practice',
    content: [
      {
        type: 'text',
        data: {
          title: 'Real Words',
          paragraphs: [
            'Now read actual Arabic words. These are common vocabulary.',
          ],
        },
      },
      {
        type: 'practice',
        data: {
          words: [
            { arabic: 'كِتَاب', transliteration: 'kitaab', meaning: 'book' },
            { arabic: 'قَلَم', transliteration: 'qalam', meaning: 'pen' },
            { arabic: 'بَيْت', transliteration: 'bayt', meaning: 'house' },
            { arabic: 'مَاء', transliteration: 'maaʾ', meaning: 'water' },
            { arabic: 'سَمَاء', transliteration: 'samaaʾ', meaning: 'sky' },
            { arabic: 'شَمْس', transliteration: 'shams', meaning: 'sun' },
            { arabic: 'قَمَر', transliteration: 'qamar', meaning: 'moon' },
            { arabic: 'نَجْم', transliteration: 'najm', meaning: 'star' },
            { arabic: 'أَرْض', transliteration: 'ard', meaning: 'earth' },
            { arabic: 'نَار', transliteration: 'naar', meaning: 'fire' },
          ],
        },
      },
    ],
  },
  {
    id: 20,
    title: 'Words with All Diacritics',
    titleArabic: 'كَلِماتٌ بِجَميعِ الحَرَكات',
    description: 'Practice reading single words with every type of diacritic mark.',
    type: 'practice',
    content: [
      {
        type: 'text',
        data: {
          title: 'Read Each Word Carefully',
          paragraphs: [
            'Each word below demonstrates different diacritics. Take your time pronouncing each one.',
          ],
        },
      },
      {
        type: 'practice',
        data: {
          words: [
            // Fatha examples
            { arabic: 'كَتَبَ', transliteration: 'kataba', meaning: 'he wrote' },
            { arabic: 'ذَهَبَ', transliteration: 'dhahaba', meaning: 'he went' },
            { arabic: 'نَصَرَ', transliteration: 'nasara', meaning: 'he helped' },
            // Kasra examples
            { arabic: 'عِلْمٌ', transliteration: 'ʿilm', meaning: 'knowledge' },
            { arabic: 'كِتَابٌ', transliteration: 'kitaab', meaning: 'a book' },
            { arabic: 'فِيهِ', transliteration: 'feehi', meaning: 'in it' },
            // Damma examples
            { arabic: 'كُتُبٌ', transliteration: 'kutub', meaning: 'books' },
            { arabic: 'رُسُلٌ', transliteration: 'rusul', meaning: 'messengers' },
            { arabic: 'نُورٌ', transliteration: 'noor', meaning: 'light' },
            // Sukun examples
            { arabic: 'مِنْ', transliteration: 'min', meaning: 'from' },
            { arabic: 'عَنْ', transliteration: 'ʿan', meaning: 'about' },
            { arabic: 'قَبْلَ', transliteration: 'qabla', meaning: 'before' },
            // Shadda examples
            { arabic: 'رَبَّ', transliteration: 'rabba', meaning: 'Lord (acc.)' },
            { arabic: 'إِنَّ', transliteration: 'inna', meaning: 'indeed' },
            { arabic: 'ثُمَّ', transliteration: 'thumma', meaning: 'then' },
            // Tanween examples
            { arabic: 'كِتَابًا', transliteration: 'kitaaban', meaning: 'a book (acc.)' },
            { arabic: 'عَلِيمٌ', transliteration: 'ʿaleem', meaning: 'All-Knowing' },
            { arabic: 'رَحِيمٍ', transliteration: 'raheem', meaning: 'merciful (gen.)' },
            // Madd (long vowel) examples
            { arabic: 'قَالَ', transliteration: 'qaala', meaning: 'he said' },
            { arabic: 'يَقُولُ', transliteration: 'yaqoolu', meaning: 'he says' },
            { arabic: 'فِي', transliteration: 'fee', meaning: 'in' },
            // Mixed examples
            { arabic: 'الْحَمْدُ', transliteration: 'al-hamd', meaning: 'the praise' },
            { arabic: 'اللَّهِ', transliteration: 'Allaahi', meaning: 'of Allah' },
            { arabic: 'الْعَالَمِينَ', transliteration: 'al-ʿaalameen', meaning: 'the worlds' },
          ],
        },
      },
    ],
  },
  {
    id: 21,
    title: 'Reading Quranic Text',
    titleArabic: 'قِراءة القُرآن',
    description: 'Apply your skills to read actual Quranic verses.',
    type: 'practice',
    content: [
      {
        type: 'text',
        data: {
          title: 'Al-Fatiha - The Opening',
          paragraphs: [
            'Practice reading Surah Al-Fatiha, the most recited chapter of the Quran.',
          ],
        },
      },
      {
        type: 'practice',
        data: {
          quranic: true,
          verses: [
            {
              arabic: 'بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ',
              transliteration: 'Bismillaahir-Rahmaanir-Raheem',
              meaning: 'In the name of Allah, the Most Gracious, the Most Merciful',
            },
            {
              arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
              transliteration: 'Alhamdulillaahi Rabbil-ʿAalameen',
              meaning: 'All praise is due to Allah, Lord of the worlds',
            },
            {
              arabic: 'الرَّحْمَـٰنِ الرَّحِيمِ',
              transliteration: 'Ar-Rahmaanir-Raheem',
              meaning: 'The Most Gracious, the Most Merciful',
            },
            {
              arabic: 'مَالِكِ يَوْمِ الدِّينِ',
              transliteration: 'Maaliki Yawmid-Deen',
              meaning: 'Master of the Day of Judgment',
            },
            {
              arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
              transliteration: 'Iyyaaka naʿbudu wa iyyaaka nastaʿeen',
              meaning: 'You alone we worship, and You alone we ask for help',
            },
            {
              arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
              transliteration: 'Ihdinas-Siraatal-Mustaqeem',
              meaning: 'Guide us to the straight path',
            },
            {
              arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ',
              transliteration: 'Siraatal-ladheena anʿamta ʿalayhim',
              meaning: 'The path of those upon whom You have bestowed favor',
            },
            {
              arabic: 'غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
              transliteration: 'Ghayril-maghdoobi ʿalayhim wa lad-daaalleen',
              meaning: 'Not of those who have earned anger or of those who are astray',
            },
          ],
        },
      },
    ],
  },
];
