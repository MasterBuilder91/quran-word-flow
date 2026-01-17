// Qur'anic Arabic Heritage - Functional Core Vocabulary
// Based on AAC research: high-frequency words that can be combined to communicate in any situation
// All phrases are in Classical Qur'anic Arabic (Fuṣḥā)

export interface HeritagePhrase {
  id: number;
  arabic: string;
  transliteration: string;
  english: string;
  category: HeritageCategory;
  subcategory?: string;
  frequency: 'core' | 'essential' | 'common';
  quranicExample?: {
    arabic: string;
    english: string;
    reference: string;
  };
  usage: string; // When/how to use this phrase
  audioTip?: string;
  // Gender-specific forms for phrases about oneself
  genderForms?: {
    masculine: {
      arabic: string;
      transliteration: string;
    };
    feminine: {
      arabic: string;
      transliteration: string;
    };
  };
}

export type HeritageCategory = 
  | 'core-requests'
  | 'core-actions'
  | 'core-responses'
  | 'core-descriptions'
  | 'core-questions'
  | 'dua-starters'
  | 'emotions'
  | 'time-place'
  | 'people-relations'
  | 'daily-actions'
  | 'learning-knowledge'
  | 'gratitude-praise'
  | 'seeking-asking'
  | 'giving-sharing'
  | 'movement-direction'
  | 'affirmation-negation'
  | 'urgent-needs'
  | 'physical-states'
  | 'pain-medical'
  | 'comfort-reassurance'
  | 'social-greetings'
  | 'choices-preferences'
  | 'places-objects'
  | 'safety-emergency';

export interface HeritageModule {
  id: string;
  title: string;
  titleArabic: string;
  description: string;
  icon: string;
  category: 'core' | 'functional';
  phraseIds: number[];
  isCore?: boolean; // Core vocabulary = foundational building blocks
}

// =============================================
// CORE VOCABULARY - The 50 Most Essential Words
// These are the building blocks of communication
// =============================================

export const heritageCorePhrases: HeritagePhrase[] = [
  // CORE REQUESTS (like "I want", "give me", "help me")
  {
    id: 1,
    arabic: "أُرِيدُ",
    transliteration: "urīdu",
    english: "I want",
    category: 'core-requests',
    frequency: 'core',
    quranicExample: {
      arabic: "إِنِّي أُرِيدُ أَنْ أُنكِحَكَ",
      english: "Indeed, I wish to wed you",
      reference: "Qur'an 28:27"
    },
    usage: "Express any desire or want. Combine with nouns: 'I want water' = أُرِيدُ مَاءً"
  },
  {
    id: 2,
    arabic: "أَعْطِنِي",
    transliteration: "aʿṭinī",
    english: "Give me",
    category: 'core-requests',
    frequency: 'core',
    quranicExample: {
      arabic: "رَبِّ هَبْ لِي حُكْمًا",
      english: "My Lord, grant me authority",
      reference: "Qur'an 26:83"
    },
    usage: "Request anything. 'Give me the book' = أَعْطِنِي الكِتَابَ"
  },
  {
    id: 3,
    arabic: "سَاعِدْنِي",
    transliteration: "sāʿidnī",
    english: "Help me",
    category: 'core-requests',
    frequency: 'core',
    usage: "Ask for assistance in any situation"
  },
  {
    id: 4,
    arabic: "زِدْنِي",
    transliteration: "zidnī",
    english: "Give me more / Increase me",
    category: 'core-requests',
    frequency: 'core',
    quranicExample: {
      arabic: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
      english: "And say: My Lord, increase me in knowledge",
      reference: "Qur'an 20:114"
    },
    usage: "Ask for more of anything. One of the most powerful du'a phrases."
  },
  {
    id: 5,
    arabic: "أَحْتَاجُ",
    transliteration: "aḥtāju",
    english: "I need",
    category: 'core-requests',
    frequency: 'core',
    usage: "Express necessity. 'I need help' = أَحْتَاجُ مُسَاعَدَةً"
  },
  {
    id: 6,
    arabic: "مِنْ فَضْلِكَ",
    transliteration: "min faḍlika",
    english: "Please (lit: from your grace)",
    category: 'core-requests',
    frequency: 'core',
    usage: "Polite request. Add to any request for courtesy."
  },

  // CORE ACTIONS (verbs that combine with anything)
  {
    id: 7,
    arabic: "اِذْهَبْ",
    transliteration: "idhhab",
    english: "Go",
    category: 'core-actions',
    frequency: 'core',
    quranicExample: {
      arabic: "اذْهَبْ إِلَىٰ فِرْعَوْنَ",
      english: "Go to Pharaoh",
      reference: "Qur'an 20:24"
    },
    usage: "Command to go. Add destination: 'Go home' = اِذْهَبْ إِلَى البَيْتِ"
  },
  {
    id: 8,
    arabic: "تَعَالَ",
    transliteration: "taʿāla",
    english: "Come",
    category: 'core-actions',
    frequency: 'core',
    quranicExample: {
      arabic: "قُلْ تَعَالَوْا أَتْلُ",
      english: "Say: Come, I will recite",
      reference: "Qur'an 6:151"
    },
    usage: "Call someone to come. 'Come here' = تَعَالَ هُنَا"
  },
  {
    id: 9,
    arabic: "اُنْظُرْ",
    transliteration: "unẓur",
    english: "Look / See",
    category: 'core-actions',
    frequency: 'core',
    quranicExample: {
      arabic: "انظُرْ كَيْفَ ضَرَبُوا لَكَ الْأَمْثَالَ",
      english: "Look how they strike examples for you",
      reference: "Qur'an 17:48"
    },
    usage: "Direct attention. 'Look at this' = اُنْظُرْ إِلَى هٰذَا"
  },
  {
    id: 10,
    arabic: "اِسْمَعْ",
    transliteration: "ismaʿ",
    english: "Listen / Hear",
    category: 'core-actions',
    frequency: 'core',
    quranicExample: {
      arabic: "وَإِذَا قُرِئَ الْقُرْآنُ فَاسْتَمِعُوا لَهُ",
      english: "When the Qur'an is recited, listen to it",
      reference: "Qur'an 7:204"
    },
    usage: "Get someone's attention for listening"
  },
  {
    id: 11,
    arabic: "قُلْ",
    transliteration: "qul",
    english: "Say",
    category: 'core-actions',
    frequency: 'core',
    quranicExample: {
      arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
      english: "Say: He is Allah, the One",
      reference: "Qur'an 112:1"
    },
    usage: "Most common Qur'anic command. 'Say...' introduces statements."
  },
  {
    id: 12,
    arabic: "اِفْعَلْ",
    transliteration: "ifʿal",
    english: "Do (it)",
    category: 'core-actions',
    frequency: 'core',
    usage: "General command to do something"
  },
  {
    id: 13,
    arabic: "خُذْ",
    transliteration: "khudh",
    english: "Take",
    category: 'core-actions',
    frequency: 'core',
    quranicExample: {
      arabic: "خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً",
      english: "Take from their wealth a charity",
      reference: "Qur'an 9:103"
    },
    usage: "Offer something or command taking"
  },
  {
    id: 14,
    arabic: "اِقْرَأْ",
    transliteration: "iqra'",
    english: "Read / Recite",
    category: 'core-actions',
    frequency: 'core',
    quranicExample: {
      arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
      english: "Read in the name of your Lord who created",
      reference: "Qur'an 96:1"
    },
    usage: "The first revelation. Command to read/recite."
  },
  {
    id: 15,
    arabic: "اُكْتُبْ",
    transliteration: "uktub",
    english: "Write",
    category: 'core-actions',
    frequency: 'core',
    usage: "Command to write something"
  },
  {
    id: 16,
    arabic: "كُلْ",
    transliteration: "kul",
    english: "Eat",
    category: 'core-actions',
    frequency: 'core',
    quranicExample: {
      arabic: "كُلُوا مِن طَيِّبَاتِ مَا رَزَقْنَاكُمْ",
      english: "Eat from the good things We have provided you",
      reference: "Qur'an 2:57"
    },
    usage: "Command or invitation to eat"
  },
  {
    id: 17,
    arabic: "اِشْرَبْ",
    transliteration: "ishrab",
    english: "Drink",
    category: 'core-actions',
    frequency: 'core',
    quranicExample: {
      arabic: "كُلُوا وَاشْرَبُوا",
      english: "Eat and drink",
      reference: "Qur'an 2:60"
    },
    usage: "Command or invitation to drink"
  },

  // CORE RESPONSES
  {
    id: 18,
    arabic: "نَعَمْ",
    transliteration: "naʿam",
    english: "Yes",
    category: 'core-responses',
    frequency: 'core',
    usage: "Affirmative response"
  },
  {
    id: 19,
    arabic: "لَا",
    transliteration: "lā",
    english: "No",
    category: 'core-responses',
    frequency: 'core',
    quranicExample: {
      arabic: "لَا إِكْرَاهَ فِي الدِّينِ",
      english: "There is no compulsion in religion",
      reference: "Qur'an 2:256"
    },
    usage: "Negation. Most common negative particle."
  },
  {
    id: 20,
    arabic: "حَسَنٌ",
    transliteration: "ḥasan",
    english: "Good / Okay",
    category: 'core-responses',
    frequency: 'core',
    usage: "Agreement or approval"
  },
  {
    id: 21,
    arabic: "إِنْ شَاءَ اللَّهُ",
    transliteration: "in shā'a Allāh",
    english: "If Allah wills",
    category: 'core-responses',
    frequency: 'core',
    quranicExample: {
      arabic: "وَلَا تَقُولَنَّ لِشَيْءٍ إِنِّي فَاعِلٌ ذَٰلِكَ غَدًا إِلَّا أَن يَشَاءَ اللَّهُ",
      english: "And never say of anything, 'I shall do that tomorrow' except [with] 'If Allah wills'",
      reference: "Qur'an 18:23-24"
    },
    usage: "Used when speaking about future intentions"
  },
  {
    id: 22,
    arabic: "مَا شَاءَ اللَّهُ",
    transliteration: "mā shā'a Allāh",
    english: "What Allah has willed (expressing wonder/appreciation)",
    category: 'core-responses',
    frequency: 'core',
    quranicExample: {
      arabic: "مَا شَاءَ اللَّهُ لَا قُوَّةَ إِلَّا بِاللَّهِ",
      english: "What Allah has willed; there is no power except in Allah",
      reference: "Qur'an 18:39"
    },
    usage: "Express appreciation without envy. Protects from evil eye."
  },
  {
    id: 23,
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "subḥāna Allāh",
    english: "Glory be to Allah",
    category: 'core-responses',
    frequency: 'core',
    quranicExample: {
      arabic: "سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ",
      english: "Exalted is He who took His servant by night",
      reference: "Qur'an 17:1"
    },
    usage: "Express amazement, glorify Allah, or respond to something wonderful"
  },
  {
    id: 24,
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "al-ḥamdu lillāh",
    english: "All praise is for Allah",
    category: 'core-responses',
    frequency: 'core',
    quranicExample: {
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      english: "All praise is for Allah, Lord of all worlds",
      reference: "Qur'an 1:2"
    },
    usage: "Express gratitude. Response to 'How are you?' = الحمد لله"
  },
  {
    id: 25,
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allāhu akbar",
    english: "Allah is the Greatest",
    category: 'core-responses',
    frequency: 'core',
    usage: "Express that Allah is greater than all. Used in prayer and exclamation."
  },

  // CORE DESCRIPTIONS
  {
    id: 26,
    arabic: "هٰذَا",
    transliteration: "hādhā",
    english: "This (masculine)",
    category: 'core-descriptions',
    frequency: 'core',
    quranicExample: {
      arabic: "هَٰذَا صِرَاطٌ مُّسْتَقِيمٌ",
      english: "This is a straight path",
      reference: "Qur'an 36:61"
    },
    usage: "Point to something near. 'This is a book' = هٰذَا كِتَابٌ"
  },
  {
    id: 27,
    arabic: "هٰذِهِ",
    transliteration: "hādhihi",
    english: "This (feminine)",
    category: 'core-descriptions',
    frequency: 'core',
    usage: "Point to feminine noun. 'This is a house' = هٰذِهِ دَارٌ"
  },
  {
    id: 28,
    arabic: "ذٰلِكَ",
    transliteration: "dhālika",
    english: "That (masculine)",
    category: 'core-descriptions',
    frequency: 'core',
    quranicExample: {
      arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ",
      english: "That is the Book about which there is no doubt",
      reference: "Qur'an 2:2"
    },
    usage: "Point to something far or abstract"
  },
  {
    id: 29,
    arabic: "كَبِيرٌ",
    transliteration: "kabīr",
    english: "Big / Great",
    category: 'core-descriptions',
    frequency: 'core',
    usage: "Describe size or importance"
  },
  {
    id: 30,
    arabic: "صَغِيرٌ",
    transliteration: "ṣaghīr",
    english: "Small / Little",
    category: 'core-descriptions',
    frequency: 'core',
    usage: "Describe small size"
  },
  {
    id: 31,
    arabic: "كَثِيرٌ",
    transliteration: "kathīr",
    english: "Many / Much",
    category: 'core-descriptions',
    frequency: 'core',
    quranicExample: {
      arabic: "وَذَكَرَ اللَّهَ كَثِيرًا",
      english: "And remembers Allah much",
      reference: "Qur'an 33:21"
    },
    usage: "Describe quantity"
  },
  {
    id: 32,
    arabic: "قَلِيلٌ",
    transliteration: "qalīl",
    english: "Few / Little",
    category: 'core-descriptions',
    frequency: 'core',
    usage: "Describe small quantity"
  },
  {
    id: 33,
    arabic: "جَيِّدٌ",
    transliteration: "jayyid",
    english: "Good / Excellent",
    category: 'core-descriptions',
    frequency: 'core',
    usage: "Positive quality description"
  },
  {
    id: 34,
    arabic: "جَمِيلٌ",
    transliteration: "jamīl",
    english: "Beautiful",
    category: 'core-descriptions',
    frequency: 'core',
    quranicExample: {
      arabic: "فَصَبْرٌ جَمِيلٌ",
      english: "So patience is most fitting (beautiful)",
      reference: "Qur'an 12:18"
    },
    usage: "Describe beauty - physical or abstract"
  },
  {
    id: 35,
    arabic: "سَهْلٌ",
    transliteration: "sahl",
    english: "Easy",
    category: 'core-descriptions',
    frequency: 'core',
    usage: "Describe ease or simplicity"
  },
  {
    id: 36,
    arabic: "صَعْبٌ",
    transliteration: "ṣaʿb",
    english: "Difficult / Hard",
    category: 'core-descriptions',
    frequency: 'core',
    usage: "Describe difficulty"
  },

  // CORE QUESTIONS
  {
    id: 37,
    arabic: "مَا",
    transliteration: "mā",
    english: "What?",
    category: 'core-questions',
    frequency: 'core',
    quranicExample: {
      arabic: "مَا هَٰذَا",
      english: "What is this?",
      reference: "Qur'an 21:36"
    },
    usage: "Ask about things. 'What is this?' = مَا هٰذَا؟"
  },
  {
    id: 38,
    arabic: "مَنْ",
    transliteration: "man",
    english: "Who?",
    category: 'core-questions',
    frequency: 'core',
    quranicExample: {
      arabic: "مَن ذَا الَّذِي يَشْفَعُ عِندَهُ",
      english: "Who is it that can intercede with Him?",
      reference: "Qur'an 2:255"
    },
    usage: "Ask about people. 'Who is he?' = مَنْ هُوَ؟"
  },
  {
    id: 39,
    arabic: "أَيْنَ",
    transliteration: "ayna",
    english: "Where?",
    category: 'core-questions',
    frequency: 'core',
    quranicExample: {
      arabic: "أَيْنَ مَا تَكُونُوا يَأْتِ بِكُمُ اللَّهُ",
      english: "Wherever you may be, Allah will bring you forth",
      reference: "Qur'an 2:148"
    },
    usage: "Ask about location. 'Where is the masjid?' = أَيْنَ المَسْجِدُ؟"
  },
  {
    id: 40,
    arabic: "مَتَىٰ",
    transliteration: "matā",
    english: "When?",
    category: 'core-questions',
    frequency: 'core',
    quranicExample: {
      arabic: "مَتَىٰ نَصْرُ اللَّهِ",
      english: "When is the help of Allah?",
      reference: "Qur'an 2:214"
    },
    usage: "Ask about time"
  },
  {
    id: 41,
    arabic: "كَيْفَ",
    transliteration: "kayfa",
    english: "How?",
    category: 'core-questions',
    frequency: 'core',
    quranicExample: {
      arabic: "كَيْفَ تَكْفُرُونَ بِاللَّهِ",
      english: "How can you disbelieve in Allah?",
      reference: "Qur'an 2:28"
    },
    usage: "Ask about manner. 'How are you?' = كَيْفَ حَالُكَ؟"
  },
  {
    id: 42,
    arabic: "لِمَاذَا",
    transliteration: "limādhā",
    english: "Why?",
    category: 'core-questions',
    frequency: 'core',
    usage: "Ask for reason. 'Why did you do this?' = لِمَاذَا فَعَلْتَ هٰذَا؟"
  },
  {
    id: 43,
    arabic: "كَمْ",
    transliteration: "kam",
    english: "How many? / How much?",
    category: 'core-questions',
    frequency: 'core',
    quranicExample: {
      arabic: "كَمْ لَبِثْتُمْ فِي الْأَرْضِ",
      english: "How long did you remain on earth?",
      reference: "Qur'an 23:112"
    },
    usage: "Ask about quantity or duration"
  },
  {
    id: 44,
    arabic: "هَلْ",
    transliteration: "hal",
    english: "Is? / Does? (yes/no question)",
    category: 'core-questions',
    frequency: 'core',
    quranicExample: {
      arabic: "هَلْ أَتَىٰ عَلَى الْإِنسَانِ حِينٌ",
      english: "Has there come upon man a period of time?",
      reference: "Qur'an 76:1"
    },
    usage: "Form yes/no questions. 'Is this correct?' = هَلْ هٰذَا صَحِيحٌ؟"
  },

  // DU'A STARTERS
  {
    id: 45,
    arabic: "رَبِّ",
    transliteration: "rabbi",
    english: "My Lord",
    category: 'dua-starters',
    frequency: 'core',
    quranicExample: {
      arabic: "رَبِّ اغْفِرْ لِي",
      english: "My Lord, forgive me",
      reference: "Qur'an 38:35"
    },
    usage: "Address Allah in supplication. Most intimate form."
  },
  {
    id: 46,
    arabic: "اللَّهُمَّ",
    transliteration: "Allāhumma",
    english: "O Allah",
    category: 'dua-starters',
    frequency: 'core',
    quranicExample: {
      arabic: "اللَّهُمَّ مَالِكَ الْمُلْكِ",
      english: "O Allah, Owner of Sovereignty",
      reference: "Qur'an 3:26"
    },
    usage: "Formal way to address Allah in du'a"
  },
  {
    id: 47,
    arabic: "اِغْفِرْ لِي",
    transliteration: "ighfir lī",
    english: "Forgive me",
    category: 'dua-starters',
    frequency: 'core',
    quranicExample: {
      arabic: "رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ",
      english: "My Lord, forgive me and my parents",
      reference: "Qur'an 71:28"
    },
    usage: "Seek forgiveness from Allah"
  },
  {
    id: 48,
    arabic: "اِهْدِنِي",
    transliteration: "ihdinī",
    english: "Guide me",
    category: 'dua-starters',
    frequency: 'core',
    quranicExample: {
      arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      english: "Guide us to the straight path",
      reference: "Qur'an 1:6"
    },
    usage: "Ask for guidance"
  },
  {
    id: 49,
    arabic: "اِرْحَمْنِي",
    transliteration: "irḥamnī",
    english: "Have mercy on me",
    category: 'dua-starters',
    frequency: 'core',
    quranicExample: {
      arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
      english: "My Lord, have mercy upon them as they brought me up when I was small",
      reference: "Qur'an 17:24"
    },
    usage: "Ask for Allah's mercy"
  },
  {
    id: 50,
    arabic: "أَعُوذُ بِاللَّهِ",
    transliteration: "aʿūdhu billāh",
    english: "I seek refuge in Allah",
    category: 'dua-starters',
    frequency: 'core',
    quranicExample: {
      arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
      english: "Say: I seek refuge in the Lord of daybreak",
      reference: "Qur'an 113:1"
    },
    usage: "Seek protection from harm or evil"
  }
];

// =============================================
// FUNCTIONAL PHRASES LIBRARY
// Organized by situation and use case
// =============================================

export const heritageFunctionalPhrases: HeritagePhrase[] = [
  // EMOTIONS
  {
    id: 101,
    arabic: "أَنَا سَعِيدٌ",
    transliteration: "anā saʿīd",
    english: "I am happy",
    category: 'emotions',
    frequency: 'essential',
    usage: "Express happiness",
    genderForms: {
      masculine: { arabic: "أَنَا سَعِيدٌ", transliteration: "anā saʿīd" },
      feminine: { arabic: "أَنَا سَعِيدَةٌ", transliteration: "anā saʿīda" }
    }
  },
  {
    id: 102,
    arabic: "أَنَا حَزِينٌ",
    transliteration: "anā ḥazīn",
    english: "I am sad",
    category: 'emotions',
    frequency: 'essential',
    usage: "Express sadness",
    genderForms: {
      masculine: { arabic: "أَنَا حَزِينٌ", transliteration: "anā ḥazīn" },
      feminine: { arabic: "أَنَا حَزِينَةٌ", transliteration: "anā ḥazīna" }
    }
  },
  {
    id: 103,
    arabic: "أَنَا مُتْعَبٌ",
    transliteration: "anā mutʿab",
    english: "I am tired",
    category: 'emotions',
    frequency: 'essential',
    usage: "Express fatigue",
    genderForms: {
      masculine: { arabic: "أَنَا مُتْعَبٌ", transliteration: "anā mutʿab" },
      feminine: { arabic: "أَنَا مُتْعَبَةٌ", transliteration: "anā mutʿaba" }
    }
  },
  {
    id: 104,
    arabic: "أَنَا جَائِعٌ",
    transliteration: "anā jāʾiʿ",
    english: "I am hungry",
    category: 'emotions',
    frequency: 'essential',
    usage: "Express hunger",
    genderForms: {
      masculine: { arabic: "أَنَا جَائِعٌ", transliteration: "anā jāʾiʿ" },
      feminine: { arabic: "أَنَا جَائِعَةٌ", transliteration: "anā jāʾiʿa" }
    }
  },
  {
    id: 105,
    arabic: "أَنَا عَطْشَانٌ",
    transliteration: "anā ʿaṭshān",
    english: "I am thirsty",
    category: 'emotions',
    frequency: 'essential',
    usage: "Express thirst",
    genderForms: {
      masculine: { arabic: "أَنَا عَطْشَانٌ", transliteration: "anā ʿaṭshān" },
      feminine: { arabic: "أَنَا عَطْشَانَةٌ", transliteration: "anā ʿaṭshāna" }
    }
  },
  {
    id: 106,
    arabic: "أَنَا خَائِفٌ",
    transliteration: "anā khāʾif",
    english: "I am afraid",
    category: 'emotions',
    frequency: 'essential',
    quranicExample: {
      arabic: "لَا تَخَفْ",
      english: "Do not be afraid",
      reference: "Qur'an 20:68"
    },
    usage: "Express fear",
    genderForms: {
      masculine: { arabic: "أَنَا خَائِفٌ", transliteration: "anā khāʾif" },
      feminine: { arabic: "أَنَا خَائِفَةٌ", transliteration: "anā khāʾifa" }
    }
  },
  {
    id: 107,
    arabic: "أَنَا فَرِحٌ",
    transliteration: "anā fariḥ",
    english: "I am joyful",
    category: 'emotions',
    frequency: 'essential',
    usage: "Express joy",
    genderForms: {
      masculine: { arabic: "أَنَا فَرِحٌ", transliteration: "anā fariḥ" },
      feminine: { arabic: "أَنَا فَرِحَةٌ", transliteration: "anā fariḥa" }
    }
  },
  {
    id: 108,
    arabic: "أُحِبُّ",
    transliteration: "uḥibbu",
    english: "I love",
    category: 'emotions',
    frequency: 'essential',
    quranicExample: {
      arabic: "وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ",
      english: "And Allah loves the doers of good",
      reference: "Qur'an 3:134"
    },
    usage: "Express love for something or someone"
  },
  {
    id: 109,
    arabic: "لَا أُحِبُّ",
    transliteration: "lā uḥibbu",
    english: "I don't like",
    category: 'emotions',
    frequency: 'essential',
    usage: "Express dislike"
  },
  {
    id: 110,
    arabic: "أَنَا مَرِيضٌ",
    transliteration: "anā marīḍ",
    english: "I am sick",
    category: 'emotions',
    frequency: 'essential',
    usage: "Express illness",
    genderForms: {
      masculine: { arabic: "أَنَا مَرِيضٌ", transliteration: "anā marīḍ" },
      feminine: { arabic: "أَنَا مَرِيضَةٌ", transliteration: "anā marīḍa" }
    }
  },

  // TIME & PLACE
  {
    id: 111,
    arabic: "الآنَ",
    transliteration: "al-āna",
    english: "Now",
    category: 'time-place',
    frequency: 'essential',
    usage: "Indicate present time"
  },
  {
    id: 112,
    arabic: "غَدًا",
    transliteration: "ghadan",
    english: "Tomorrow",
    category: 'time-place',
    frequency: 'essential',
    quranicExample: {
      arabic: "إِنِّي فَاعِلٌ ذَٰلِكَ غَدًا",
      english: "Indeed, I will do that tomorrow",
      reference: "Qur'an 18:23"
    },
    usage: "Indicate tomorrow"
  },
  {
    id: 113,
    arabic: "أَمْسِ",
    transliteration: "amsi",
    english: "Yesterday",
    category: 'time-place',
    frequency: 'essential',
    usage: "Indicate yesterday"
  },
  {
    id: 114,
    arabic: "اليَوْمَ",
    transliteration: "al-yawma",
    english: "Today",
    category: 'time-place',
    frequency: 'essential',
    quranicExample: {
      arabic: "الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ",
      english: "Today I have perfected for you your religion",
      reference: "Qur'an 5:3"
    },
    usage: "Indicate today"
  },
  {
    id: 115,
    arabic: "هُنَا",
    transliteration: "hunā",
    english: "Here",
    category: 'time-place',
    frequency: 'essential',
    usage: "Indicate this location"
  },
  {
    id: 116,
    arabic: "هُنَاكَ",
    transliteration: "hunāka",
    english: "There",
    category: 'time-place',
    frequency: 'essential',
    usage: "Indicate that location"
  },
  {
    id: 117,
    arabic: "قَبْلَ",
    transliteration: "qabla",
    english: "Before",
    category: 'time-place',
    frequency: 'essential',
    quranicExample: {
      arabic: "مِن قَبْلُ",
      english: "From before",
      reference: "Qur'an 2:25"
    },
    usage: "Indicate preceding time or position"
  },
  {
    id: 118,
    arabic: "بَعْدَ",
    transliteration: "baʿda",
    english: "After",
    category: 'time-place',
    frequency: 'essential',
    quranicExample: {
      arabic: "مِن بَعْدِ",
      english: "From after",
      reference: "Qur'an 2:27"
    },
    usage: "Indicate following time or position"
  },
  {
    id: 119,
    arabic: "فَوْقَ",
    transliteration: "fawqa",
    english: "Above / Over",
    category: 'time-place',
    frequency: 'essential',
    usage: "Indicate position above"
  },
  {
    id: 120,
    arabic: "تَحْتَ",
    transliteration: "taḥta",
    english: "Under / Below",
    category: 'time-place',
    frequency: 'essential',
    quranicExample: {
      arabic: "تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ",
      english: "Rivers flow beneath it",
      reference: "Qur'an 2:25"
    },
    usage: "Indicate position below"
  },

  // PEOPLE & RELATIONS
  {
    id: 121,
    arabic: "أَبِي",
    transliteration: "abī",
    english: "My father",
    category: 'people-relations',
    frequency: 'essential',
    usage: "Refer to one's father"
  },
  {
    id: 122,
    arabic: "أُمِّي",
    transliteration: "ummī",
    english: "My mother",
    category: 'people-relations',
    frequency: 'essential',
    usage: "Refer to one's mother"
  },
  {
    id: 123,
    arabic: "أَخِي",
    transliteration: "akhī",
    english: "My brother",
    category: 'people-relations',
    frequency: 'essential',
    quranicExample: {
      arabic: "وَأَخِي هَارُونُ",
      english: "And my brother Harun",
      reference: "Qur'an 20:30"
    },
    usage: "Refer to one's brother"
  },
  {
    id: 124,
    arabic: "أُخْتِي",
    transliteration: "ukhtī",
    english: "My sister",
    category: 'people-relations',
    frequency: 'essential',
    usage: "Refer to one's sister"
  },
  {
    id: 125,
    arabic: "اِبْنِي",
    transliteration: "ibnī",
    english: "My son",
    category: 'people-relations',
    frequency: 'essential',
    quranicExample: {
      arabic: "يَا بُنَيَّ",
      english: "O my son",
      reference: "Qur'an 31:13"
    },
    usage: "Refer to one's son"
  },
  {
    id: 126,
    arabic: "بِنْتِي",
    transliteration: "bintī",
    english: "My daughter",
    category: 'people-relations',
    frequency: 'essential',
    usage: "Refer to one's daughter"
  },
  {
    id: 127,
    arabic: "صَدِيقِي",
    transliteration: "ṣadīqī",
    english: "My friend",
    category: 'people-relations',
    frequency: 'essential',
    usage: "Refer to one's friend"
  },
  {
    id: 128,
    arabic: "أُسْتَاذِي",
    transliteration: "ustādhī",
    english: "My teacher",
    category: 'people-relations',
    frequency: 'essential',
    usage: "Refer to one's teacher"
  },

  // DAILY ACTIONS
  {
    id: 129,
    arabic: "أَسْتَيْقِظُ",
    transliteration: "astayqiẓu",
    english: "I wake up",
    category: 'daily-actions',
    frequency: 'common',
    usage: "Describe waking up"
  },
  {
    id: 130,
    arabic: "أَنَامُ",
    transliteration: "anāmu",
    english: "I sleep",
    category: 'daily-actions',
    frequency: 'common',
    usage: "Describe sleeping"
  },
  {
    id: 131,
    arabic: "آكُلُ",
    transliteration: "ākulu",
    english: "I eat",
    category: 'daily-actions',
    frequency: 'common',
    usage: "Describe eating (first person)"
  },
  {
    id: 132,
    arabic: "أَشْرَبُ",
    transliteration: "ashrabu",
    english: "I drink",
    category: 'daily-actions',
    frequency: 'common',
    usage: "Describe drinking (first person)"
  },
  {
    id: 133,
    arabic: "أُصَلِّي",
    transliteration: "uṣallī",
    english: "I pray",
    category: 'daily-actions',
    frequency: 'common',
    usage: "Describe praying"
  },
  {
    id: 134,
    arabic: "أَقْرَأُ",
    transliteration: "aqra'u",
    english: "I read",
    category: 'daily-actions',
    frequency: 'common',
    usage: "Describe reading"
  },
  {
    id: 135,
    arabic: "أَكْتُبُ",
    transliteration: "aktubu",
    english: "I write",
    category: 'daily-actions',
    frequency: 'common',
    usage: "Describe writing"
  },
  {
    id: 136,
    arabic: "أَتَكَلَّمُ",
    transliteration: "atakallamu",
    english: "I speak",
    category: 'daily-actions',
    frequency: 'common',
    usage: "Describe speaking"
  },
  {
    id: 137,
    arabic: "أَسْتَمِعُ",
    transliteration: "astamiʿu",
    english: "I listen",
    category: 'daily-actions',
    frequency: 'common',
    usage: "Describe listening"
  },
  {
    id: 138,
    arabic: "أَفْهَمُ",
    transliteration: "afhamu",
    english: "I understand",
    category: 'daily-actions',
    frequency: 'common',
    usage: "Express understanding"
  },
  {
    id: 139,
    arabic: "لَا أَفْهَمُ",
    transliteration: "lā afhamu",
    english: "I don't understand",
    category: 'daily-actions',
    frequency: 'common',
    usage: "Express lack of understanding"
  },
  {
    id: 140,
    arabic: "أَعْرِفُ",
    transliteration: "aʿrifu",
    english: "I know",
    category: 'daily-actions',
    frequency: 'common',
    usage: "Express knowledge"
  },
  {
    id: 141,
    arabic: "لَا أَعْرِفُ",
    transliteration: "lā aʿrifu",
    english: "I don't know",
    category: 'daily-actions',
    frequency: 'common',
    usage: "Express lack of knowledge"
  },

  // LEARNING & KNOWLEDGE
  {
    id: 142,
    arabic: "عَلِّمْنِي",
    transliteration: "ʿallimnī",
    english: "Teach me",
    category: 'learning-knowledge',
    frequency: 'essential',
    quranicExample: {
      arabic: "وَعَلَّمَ آدَمَ الْأَسْمَاءَ كُلَّهَا",
      english: "And He taught Adam the names - all of them",
      reference: "Qur'an 2:31"
    },
    usage: "Request to be taught something"
  },
  {
    id: 143,
    arabic: "أُرِيدُ أَنْ أَتَعَلَّمَ",
    transliteration: "urīdu an ataʿallama",
    english: "I want to learn",
    category: 'learning-knowledge',
    frequency: 'essential',
    usage: "Express desire to learn"
  },
  {
    id: 144,
    arabic: "أَفَهِمْتَ؟",
    transliteration: "afahimta?",
    english: "Did you understand?",
    category: 'learning-knowledge',
    frequency: 'common',
    usage: "Check understanding"
  },
  {
    id: 145,
    arabic: "أَعِدْ مِنْ فَضْلِكَ",
    transliteration: "aʿid min faḍlik",
    english: "Please repeat",
    category: 'learning-knowledge',
    frequency: 'common',
    usage: "Request repetition"
  },
  {
    id: 146,
    arabic: "مَا مَعْنَى هٰذَا",
    transliteration: "mā maʿnā hādhā",
    english: "What does this mean?",
    category: 'learning-knowledge',
    frequency: 'common',
    usage: "Ask for meaning"
  },
  {
    id: 147,
    arabic: "تَكَلَّمْ بِبُطْءٍ",
    transliteration: "takallam bibuṭ'in",
    english: "Speak slowly",
    category: 'learning-knowledge',
    frequency: 'common',
    usage: "Request slower speech"
  },

  // GRATITUDE & PRAISE
  {
    id: 148,
    arabic: "شُكْرًا",
    transliteration: "shukran",
    english: "Thank you",
    category: 'gratitude-praise',
    frequency: 'essential',
    usage: "Express thanks"
  },
  {
    id: 149,
    arabic: "جَزَاكَ اللَّهُ خَيْرًا",
    transliteration: "jazāka Allāhu khayran",
    english: "May Allah reward you with good",
    category: 'gratitude-praise',
    frequency: 'essential',
    usage: "Islamic expression of deep thanks"
  },
  {
    id: 150,
    arabic: "بَارَكَ اللَّهُ فِيكَ",
    transliteration: "bāraka Allāhu fīka",
    english: "May Allah bless you",
    category: 'gratitude-praise',
    frequency: 'essential',
    usage: "Blessing for someone"
  },
  {
    id: 151,
    arabic: "أَحْسَنْتَ",
    transliteration: "aḥsanta",
    english: "Well done! / Excellent!",
    category: 'gratitude-praise',
    frequency: 'common',
    usage: "Praise someone's action"
  },
  {
    id: 152,
    arabic: "مَاشَاءَ اللَّهُ تَبَارَكَ اللَّهُ",
    transliteration: "mā shā'a Allāh tabāraka Allāh",
    english: "What Allah willed, blessed is Allah",
    category: 'gratitude-praise',
    frequency: 'essential',
    usage: "Express admiration while protecting from evil eye"
  },

  // SEEKING & ASKING
  {
    id: 153,
    arabic: "أَسْأَلُكَ",
    transliteration: "as'aluka",
    english: "I ask you",
    category: 'seeking-asking',
    frequency: 'essential',
    usage: "Begin a request"
  },
  {
    id: 154,
    arabic: "اِنْتَظِرْ",
    transliteration: "intaẓir",
    english: "Wait",
    category: 'seeking-asking',
    frequency: 'essential',
    usage: "Ask someone to wait"
  },
  {
    id: 155,
    arabic: "لَحْظَةً",
    transliteration: "laḥẓatan",
    english: "One moment",
    category: 'seeking-asking',
    frequency: 'common',
    usage: "Request a brief wait"
  },
  {
    id: 156,
    arabic: "أَيْنَ الحَمَّامُ",
    transliteration: "ayna al-ḥammām",
    english: "Where is the bathroom?",
    category: 'seeking-asking',
    frequency: 'common',
    usage: "Ask for bathroom location"
  },

  // GIVING & SHARING
  {
    id: 157,
    arabic: "تَفَضَّلْ",
    transliteration: "tafaḍḍal",
    english: "Please (offering) / Go ahead",
    category: 'giving-sharing',
    frequency: 'essential',
    usage: "Offer something or invite someone"
  },
  {
    id: 158,
    arabic: "هٰذَا لَكَ",
    transliteration: "hādhā laka",
    english: "This is for you",
    category: 'giving-sharing',
    frequency: 'common',
    usage: "Give something to someone"
  },
  {
    id: 159,
    arabic: "نَحْنُ مَعًا",
    transliteration: "naḥnu maʿan",
    english: "We are together",
    category: 'giving-sharing',
    frequency: 'common',
    usage: "Express togetherness"
  },

  // MOVEMENT & DIRECTION
  {
    id: 160,
    arabic: "قِفْ",
    transliteration: "qif",
    english: "Stop",
    category: 'movement-direction',
    frequency: 'essential',
    usage: "Command to stop"
  },
  {
    id: 161,
    arabic: "اِمْشِ",
    transliteration: "imshi",
    english: "Walk",
    category: 'movement-direction',
    frequency: 'common',
    usage: "Command to walk"
  },
  {
    id: 162,
    arabic: "اُجْلِسْ",
    transliteration: "ujlis",
    english: "Sit down",
    category: 'movement-direction',
    frequency: 'essential',
    usage: "Command to sit"
  },
  {
    id: 163,
    arabic: "قُمْ",
    transliteration: "qum",
    english: "Stand up / Get up",
    category: 'movement-direction',
    frequency: 'essential',
    quranicExample: {
      arabic: "قُمِ اللَّيْلَ",
      english: "Stand (in prayer) at night",
      reference: "Qur'an 73:2"
    },
    usage: "Command to stand or get up"
  },
  {
    id: 164,
    arabic: "اِفْتَحْ",
    transliteration: "iftaḥ",
    english: "Open",
    category: 'movement-direction',
    frequency: 'common',
    quranicExample: {
      arabic: "رَبَّنَا افْتَحْ بَيْنَنَا",
      english: "Our Lord, decide between us",
      reference: "Qur'an 7:89"
    },
    usage: "Command to open"
  },
  {
    id: 165,
    arabic: "أَغْلِقْ",
    transliteration: "aghliq",
    english: "Close",
    category: 'movement-direction',
    frequency: 'common',
    usage: "Command to close"
  },
  {
    id: 166,
    arabic: "يَمِينًا",
    transliteration: "yamīnan",
    english: "To the right",
    category: 'movement-direction',
    frequency: 'common',
    usage: "Indicate right direction"
  },
  {
    id: 167,
    arabic: "شِمَالًا",
    transliteration: "shimālan",
    english: "To the left",
    category: 'movement-direction',
    frequency: 'common',
    usage: "Indicate left direction"
  },
  {
    id: 168,
    arabic: "أَمَامَكَ",
    transliteration: "amāmaka",
    english: "In front of you",
    category: 'movement-direction',
    frequency: 'common',
    usage: "Indicate forward direction"
  },
  {
    id: 169,
    arabic: "وَرَاءَكَ",
    transliteration: "warā'aka",
    english: "Behind you",
    category: 'movement-direction',
    frequency: 'common',
    usage: "Indicate backward direction"
  },

  // AFFIRMATION & NEGATION
  {
    id: 170,
    arabic: "صَحِيحٌ",
    transliteration: "ṣaḥīḥ",
    english: "Correct / Right",
    category: 'affirmation-negation',
    frequency: 'essential',
    usage: "Affirm correctness"
  },
  {
    id: 171,
    arabic: "خَطَأٌ",
    transliteration: "khaṭa'",
    english: "Wrong / Mistake",
    category: 'affirmation-negation',
    frequency: 'essential',
    usage: "Indicate error"
  },
  {
    id: 172,
    arabic: "أُوَافِقُ",
    transliteration: "uwāfiqu",
    english: "I agree",
    category: 'affirmation-negation',
    frequency: 'common',
    usage: "Express agreement"
  },
  {
    id: 173,
    arabic: "لَا أُوَافِقُ",
    transliteration: "lā uwāfiqu",
    english: "I disagree",
    category: 'affirmation-negation',
    frequency: 'common',
    usage: "Express disagreement"
  },
  {
    id: 174,
    arabic: "رُبَّمَا",
    transliteration: "rubbamā",
    english: "Maybe / Perhaps",
    category: 'affirmation-negation',
    frequency: 'common',
    usage: "Express uncertainty"
  },
  {
    id: 175,
    arabic: "بِالتَّأْكِيدِ",
    transliteration: "bit-ta'kīd",
    english: "Certainly / Definitely",
    category: 'affirmation-negation',
    frequency: 'common',
    usage: "Express certainty"
  },
  {
    id: 176,
    arabic: "لَيْسَ كَذٰلِكَ",
    transliteration: "laysa kadhālik",
    english: "It's not like that",
    category: 'affirmation-negation',
    frequency: 'common',
    usage: "Correct a misunderstanding"
  },
  {
    id: 177,
    arabic: "عَفْوًا",
    transliteration: "ʿafwan",
    english: "Excuse me / Sorry",
    category: 'affirmation-negation',
    frequency: 'essential',
    usage: "Apologize or get attention"
  },
  {
    id: 178,
    arabic: "لَا بَأْسَ",
    transliteration: "lā ba's",
    english: "No problem / It's okay",
    category: 'affirmation-negation',
    frequency: 'essential',
    usage: "Dismiss a minor issue"
  },
  {
    id: 179,
    arabic: "كَفَىٰ",
    transliteration: "kafā",
    english: "Enough",
    category: 'affirmation-negation',
    frequency: 'essential',
    quranicExample: {
      arabic: "وَكَفَىٰ بِاللَّهِ شَهِيدًا",
      english: "And sufficient is Allah as Witness",
      reference: "Qur'an 4:79"
    },
    usage: "Indicate sufficiency or to stop"
  },
  {
    id: 180,
    arabic: "أُرِيدُ المَزِيدَ",
    transliteration: "urīdu al-mazīd",
    english: "I want more",
    category: 'affirmation-negation',
    frequency: 'essential',
    usage: "Request more of something"
  }
];

// =============================================
// AAC-STYLE ESSENTIAL PHRASES
// For non-verbal communication needs
// =============================================

export const heritageAACPhrases: HeritagePhrase[] = [
  // URGENT NEEDS - Critical for immediate communication
  {
    id: 201,
    arabic: "أُرِيدُ الحَمَّامَ",
    transliteration: "urīdu al-ḥammām",
    english: "I need the bathroom",
    category: 'urgent-needs',
    frequency: 'essential',
    usage: "Express urgent bathroom need"
  },
  {
    id: 202,
    arabic: "أَنَا بَارِدٌ",
    transliteration: "anā bārid",
    english: "I am cold",
    category: 'urgent-needs',
    frequency: 'essential',
    usage: "Express feeling cold",
    genderForms: {
      masculine: { arabic: "أَنَا بَارِدٌ", transliteration: "anā bārid" },
      feminine: { arabic: "أَنَا بَارِدَةٌ", transliteration: "anā bārida" }
    }
  },
  {
    id: 203,
    arabic: "أَنَا حَارٌّ",
    transliteration: "anā ḥārr",
    english: "I am hot",
    category: 'urgent-needs',
    frequency: 'essential',
    usage: "Express feeling hot",
    genderForms: {
      masculine: { arabic: "أَنَا حَارٌّ", transliteration: "anā ḥārr" },
      feminine: { arabic: "أَنَا حَارَّةٌ", transliteration: "anā ḥārra" }
    }
  },
  {
    id: 204,
    arabic: "أُرِيدُ مَاءً",
    transliteration: "urīdu mā'an",
    english: "I want water",
    category: 'urgent-needs',
    frequency: 'essential',
    usage: "Request water"
  },
  {
    id: 205,
    arabic: "أُرِيدُ طَعَامًا",
    transliteration: "urīdu ṭaʿāman",
    english: "I want food",
    category: 'urgent-needs',
    frequency: 'essential',
    usage: "Request food"
  },
  {
    id: 206,
    arabic: "أُرِيدُ أَنْ أَنَامَ",
    transliteration: "urīdu an anāma",
    english: "I want to sleep",
    category: 'urgent-needs',
    frequency: 'essential',
    usage: "Express need for sleep"
  },
  {
    id: 207,
    arabic: "أُرِيدُ أَنْ أَخْرُجَ",
    transliteration: "urīdu an akhruja",
    english: "I want to go out",
    category: 'urgent-needs',
    frequency: 'essential',
    usage: "Express need to leave/exit"
  },
  {
    id: 208,
    arabic: "دَعْنِي وَحْدِي",
    transliteration: "daʿnī waḥdī",
    english: "Leave me alone",
    category: 'urgent-needs',
    frequency: 'essential',
    usage: "Request personal space"
  },
  {
    id: 209,
    arabic: "لَا تَذْهَبْ",
    transliteration: "lā tadhhab",
    english: "Don't go",
    category: 'urgent-needs',
    frequency: 'essential',
    usage: "Ask someone to stay"
  },
  {
    id: 210,
    arabic: "اِبْقَ مَعِي",
    transliteration: "ibqa maʿī",
    english: "Stay with me",
    category: 'urgent-needs',
    frequency: 'essential',
    usage: "Request companionship"
  },

  // PHYSICAL STATES - Body awareness
  {
    id: 211,
    arabic: "أَنَا نَعْسَانٌ",
    transliteration: "anā naʿsān",
    english: "I am sleepy",
    category: 'physical-states',
    frequency: 'essential',
    usage: "Express drowsiness",
    genderForms: {
      masculine: { arabic: "أَنَا نَعْسَانٌ", transliteration: "anā naʿsān" },
      feminine: { arabic: "أَنَا نَعْسَانَةٌ", transliteration: "anā naʿsāna" }
    }
  },
  {
    id: 212,
    arabic: "أَنَا قَوِيٌّ",
    transliteration: "anā qawiyy",
    english: "I am strong",
    category: 'physical-states',
    frequency: 'common',
    usage: "Express feeling strong",
    genderForms: {
      masculine: { arabic: "أَنَا قَوِيٌّ", transliteration: "anā qawiyy" },
      feminine: { arabic: "أَنَا قَوِيَّةٌ", transliteration: "anā qawiyya" }
    }
  },
  {
    id: 213,
    arabic: "أَنَا ضَعِيفٌ",
    transliteration: "anā ḍaʿīf",
    english: "I am weak",
    category: 'physical-states',
    frequency: 'essential',
    usage: "Express feeling weak",
    genderForms: {
      masculine: { arabic: "أَنَا ضَعِيفٌ", transliteration: "anā ḍaʿīf" },
      feminine: { arabic: "أَنَا ضَعِيفَةٌ", transliteration: "anā ḍaʿīfa" }
    }
  },
  {
    id: 214,
    arabic: "لَسْتُ جَائِعًا",
    transliteration: "lastu jāʿian",
    english: "I am not hungry",
    category: 'physical-states',
    frequency: 'common',
    usage: "Decline food",
    genderForms: {
      masculine: { arabic: "لَسْتُ جَائِعًا", transliteration: "lastu jāʿian" },
      feminine: { arabic: "لَسْتُ جَائِعَةً", transliteration: "lastu jāʿiatan" }
    }
  },
  {
    id: 215,
    arabic: "لَسْتُ عَطْشَانًا",
    transliteration: "lastu ʿaṭshānan",
    english: "I am not thirsty",
    category: 'physical-states',
    frequency: 'common',
    usage: "Decline drink",
    genderForms: {
      masculine: { arabic: "لَسْتُ عَطْشَانًا", transliteration: "lastu ʿaṭshānan" },
      feminine: { arabic: "لَسْتُ عَطْشَانَةً", transliteration: "lastu ʿaṭshānatan" }
    }
  },
  {
    id: 216,
    arabic: "أَنَا شَبْعَانٌ",
    transliteration: "anā shabʿān",
    english: "I am full (not hungry)",
    category: 'physical-states',
    frequency: 'common',
    usage: "Express satiation",
    genderForms: {
      masculine: { arabic: "أَنَا شَبْعَانٌ", transliteration: "anā shabʿān" },
      feminine: { arabic: "أَنَا شَبْعَانَةٌ", transliteration: "anā shabʿāna" }
    }
  },
  {
    id: 217,
    arabic: "أَنَا مُرْتَاحٌ",
    transliteration: "anā murtāḥ",
    english: "I am comfortable",
    category: 'physical-states',
    frequency: 'common',
    usage: "Express comfort",
    genderForms: {
      masculine: { arabic: "أَنَا مُرْتَاحٌ", transliteration: "anā murtāḥ" },
      feminine: { arabic: "أَنَا مُرْتَاحَةٌ", transliteration: "anā murtāḥa" }
    }
  },
  {
    id: 218,
    arabic: "لَسْتُ مُرْتَاحًا",
    transliteration: "lastu murtāḥan",
    english: "I am not comfortable",
    category: 'physical-states',
    frequency: 'essential',
    usage: "Express discomfort",
    genderForms: {
      masculine: { arabic: "لَسْتُ مُرْتَاحًا", transliteration: "lastu murtāḥan" },
      feminine: { arabic: "لَسْتُ مُرْتَاحَةً", transliteration: "lastu murtāḥatan" }
    }
  },
  {
    id: 219,
    arabic: "أَشْعُرُ بِالدَّوَارِ",
    transliteration: "ashʿuru bid-dawār",
    english: "I feel dizzy",
    category: 'physical-states',
    frequency: 'essential',
    usage: "Express dizziness"
  },
  {
    id: 220,
    arabic: "أَنَا بِخَيْرٍ",
    transliteration: "anā bikhayr",
    english: "I am fine/okay",
    category: 'physical-states',
    frequency: 'essential',
    usage: "Express being okay",
    genderForms: {
      masculine: { arabic: "أَنَا بِخَيْرٍ", transliteration: "anā bikhayr" },
      feminine: { arabic: "أَنَا بِخَيْرٍ", transliteration: "anā bikhayr" }
    }
  },

  // PAIN & MEDICAL - Critical for health communication
  {
    id: 221,
    arabic: "يُؤْلِمُنِي",
    transliteration: "yu'limunī",
    english: "It hurts me",
    category: 'pain-medical',
    frequency: 'essential',
    usage: "Express pain"
  },
  {
    id: 222,
    arabic: "رَأْسِي يُؤْلِمُنِي",
    transliteration: "ra'sī yu'limunī",
    english: "My head hurts",
    category: 'pain-medical',
    frequency: 'essential',
    usage: "Express headache"
  },
  {
    id: 223,
    arabic: "بَطْنِي يُؤْلِمُنِي",
    transliteration: "baṭnī yu'limunī",
    english: "My stomach hurts",
    category: 'pain-medical',
    frequency: 'essential',
    usage: "Express stomach pain"
  },
  {
    id: 224,
    arabic: "ظَهْرِي يُؤْلِمُنِي",
    transliteration: "ẓahrī yu'limunī",
    english: "My back hurts",
    category: 'pain-medical',
    frequency: 'essential',
    usage: "Express back pain"
  },
  {
    id: 225,
    arabic: "أَحْتَاجُ دَوَاءً",
    transliteration: "aḥtāju dawā'an",
    english: "I need medicine",
    category: 'pain-medical',
    frequency: 'essential',
    usage: "Request medication"
  },
  {
    id: 226,
    arabic: "أَحْتَاجُ طَبِيبًا",
    transliteration: "aḥtāju ṭabīban",
    english: "I need a doctor",
    category: 'pain-medical',
    frequency: 'essential',
    usage: "Request medical help"
  },
  {
    id: 227,
    arabic: "لَا أَسْتَطِيعُ التَّنَفُّسَ",
    transliteration: "lā astaṭīʿu at-tanaffus",
    english: "I can't breathe",
    category: 'pain-medical',
    frequency: 'essential',
    usage: "Express breathing difficulty - URGENT"
  },
  {
    id: 228,
    arabic: "أَشْعُرُ بِالْغَثَيَانِ",
    transliteration: "ashʿuru bil-ghathayān",
    english: "I feel nauseous",
    category: 'pain-medical',
    frequency: 'essential',
    usage: "Express nausea"
  },
  {
    id: 229,
    arabic: "يَدِي",
    transliteration: "yadī",
    english: "My hand",
    category: 'pain-medical',
    frequency: 'common',
    usage: "Point to hand - combine with pain phrases"
  },
  {
    id: 230,
    arabic: "رِجْلِي",
    transliteration: "rijlī",
    english: "My leg/foot",
    category: 'pain-medical',
    frequency: 'common',
    usage: "Point to leg/foot - combine with pain phrases"
  },
  {
    id: 231,
    arabic: "عَيْنِي",
    transliteration: "ʿaynī",
    english: "My eye",
    category: 'pain-medical',
    frequency: 'common',
    usage: "Point to eye - combine with pain phrases"
  },
  {
    id: 232,
    arabic: "أُذُنِي",
    transliteration: "udhunī",
    english: "My ear",
    category: 'pain-medical',
    frequency: 'common',
    usage: "Point to ear - combine with pain phrases"
  },
  {
    id: 233,
    arabic: "صَدْرِي",
    transliteration: "ṣadrī",
    english: "My chest",
    category: 'pain-medical',
    frequency: 'essential',
    usage: "Point to chest - combine with pain phrases"
  },
  {
    id: 234,
    arabic: "حَلْقِي",
    transliteration: "ḥalqī",
    english: "My throat",
    category: 'pain-medical',
    frequency: 'common',
    usage: "Point to throat - combine with pain phrases"
  },

  // COMFORT & REASSURANCE
  {
    id: 235,
    arabic: "لَا تَخَفْ",
    transliteration: "lā takhaf",
    english: "Don't be afraid",
    category: 'comfort-reassurance',
    frequency: 'essential',
    quranicExample: {
      arabic: "لَا تَخَفْ إِنَّكَ أَنتَ الْأَعْلَىٰ",
      english: "Fear not. Indeed, it is you who are superior",
      reference: "Qur'an 20:68"
    },
    usage: "Comfort someone who is scared"
  },
  {
    id: 236,
    arabic: "لَا تَحْزَنْ",
    transliteration: "lā taḥzan",
    english: "Don't be sad",
    category: 'comfort-reassurance',
    frequency: 'essential',
    quranicExample: {
      arabic: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا",
      english: "Do not grieve, indeed Allah is with us",
      reference: "Qur'an 9:40"
    },
    usage: "Comfort someone who is sad"
  },
  {
    id: 237,
    arabic: "كُلُّ شَيْءٍ بِخَيْرٍ",
    transliteration: "kullu shay'in bikhayr",
    english: "Everything is okay",
    category: 'comfort-reassurance',
    frequency: 'essential',
    usage: "Reassure that things are fine"
  },
  {
    id: 238,
    arabic: "أَنَا هُنَا",
    transliteration: "anā hunā",
    english: "I am here",
    category: 'comfort-reassurance',
    frequency: 'essential',
    usage: "Reassure presence",
    genderForms: {
      masculine: { arabic: "أَنَا هُنَا", transliteration: "anā hunā" },
      feminine: { arabic: "أَنَا هُنَا", transliteration: "anā hunā" }
    }
  },
  {
    id: 239,
    arabic: "اللَّهُ مَعَنَا",
    transliteration: "Allāhu maʿanā",
    english: "Allah is with us",
    category: 'comfort-reassurance',
    frequency: 'essential',
    usage: "Express faith and comfort"
  },
  {
    id: 240,
    arabic: "سَيَكُونُ خَيْرًا",
    transliteration: "sayakūnu khayran",
    english: "It will be good",
    category: 'comfort-reassurance',
    frequency: 'common',
    usage: "Express hope for the future"
  },
  {
    id: 241,
    arabic: "أُحِبُّكَ",
    transliteration: "uḥibbuka",
    english: "I love you (to male)",
    category: 'comfort-reassurance',
    frequency: 'essential',
    usage: "Express love"
  },
  {
    id: 242,
    arabic: "أُحِبُّكِ",
    transliteration: "uḥibbuki",
    english: "I love you (to female)",
    category: 'comfort-reassurance',
    frequency: 'essential',
    usage: "Express love"
  },
  {
    id: 243,
    arabic: "أَنْتَ لَسْتَ وَحْدَكَ",
    transliteration: "anta lasta waḥdaka",
    english: "You are not alone",
    category: 'comfort-reassurance',
    frequency: 'essential',
    usage: "Reassure someone"
  },
  {
    id: 244,
    arabic: "سَامَحْتُكَ",
    transliteration: "sāmaḥtuka",
    english: "I forgive you",
    category: 'comfort-reassurance',
    frequency: 'common',
    usage: "Express forgiveness"
  },

  // SOCIAL GREETINGS - Essential for connection
  {
    id: 245,
    arabic: "السَّلَامُ عَلَيْكُمْ",
    transliteration: "as-salāmu ʿalaykum",
    english: "Peace be upon you",
    category: 'social-greetings',
    frequency: 'essential',
    usage: "Islamic greeting"
  },
  {
    id: 246,
    arabic: "وَعَلَيْكُمُ السَّلَامُ",
    transliteration: "wa ʿalaykum as-salām",
    english: "And upon you be peace",
    category: 'social-greetings',
    frequency: 'essential',
    usage: "Response to greeting"
  },
  {
    id: 247,
    arabic: "أَهْلًا وَسَهْلًا",
    transliteration: "ahlan wa sahlan",
    english: "Welcome",
    category: 'social-greetings',
    frequency: 'essential',
    usage: "Welcome someone"
  },
  {
    id: 248,
    arabic: "صَبَاحُ الخَيْرِ",
    transliteration: "ṣabāḥ al-khayr",
    english: "Good morning",
    category: 'social-greetings',
    frequency: 'essential',
    usage: "Morning greeting"
  },
  {
    id: 249,
    arabic: "مَسَاءُ الخَيْرِ",
    transliteration: "masā' al-khayr",
    english: "Good evening",
    category: 'social-greetings',
    frequency: 'essential',
    usage: "Evening greeting"
  },
  {
    id: 250,
    arabic: "مَعَ السَّلَامَةِ",
    transliteration: "maʿa as-salāma",
    english: "Goodbye (go with safety)",
    category: 'social-greetings',
    frequency: 'essential',
    usage: "Say goodbye"
  },
  {
    id: 251,
    arabic: "تُشَرِّفْنَا",
    transliteration: "tusharrifnā",
    english: "You honor us",
    category: 'social-greetings',
    frequency: 'common',
    usage: "Welcome an honored guest"
  },
  {
    id: 252,
    arabic: "كَيْفَ حَالُكَ",
    transliteration: "kayfa ḥāluka",
    english: "How are you? (to male)",
    category: 'social-greetings',
    frequency: 'essential',
    usage: "Ask about wellbeing"
  },
  {
    id: 253,
    arabic: "كَيْفَ حَالُكِ",
    transliteration: "kayfa ḥāluki",
    english: "How are you? (to female)",
    category: 'social-greetings',
    frequency: 'essential',
    usage: "Ask about wellbeing"
  },
  {
    id: 254,
    arabic: "أَنَا اِسْمِي",
    transliteration: "anā ismī...",
    english: "My name is...",
    category: 'social-greetings',
    frequency: 'essential',
    usage: "Introduce yourself",
    genderForms: {
      masculine: { arabic: "أَنَا اِسْمِي", transliteration: "anā ismī..." },
      feminine: { arabic: "أَنَا اِسْمِي", transliteration: "anā ismī..." }
    }
  },

  // CHOICES & PREFERENCES
  {
    id: 255,
    arabic: "أُفَضِّلُ هٰذَا",
    transliteration: "ufaḍḍilu hādhā",
    english: "I prefer this",
    category: 'choices-preferences',
    frequency: 'essential',
    usage: "Express preference"
  },
  {
    id: 256,
    arabic: "لَا أُرِيدُ هٰذَا",
    transliteration: "lā urīdu hādhā",
    english: "I don't want this",
    category: 'choices-preferences',
    frequency: 'essential',
    usage: "Decline something"
  },
  {
    id: 257,
    arabic: "أُرِيدُ هٰذَا",
    transliteration: "urīdu hādhā",
    english: "I want this",
    category: 'choices-preferences',
    frequency: 'essential',
    usage: "Choose something"
  },
  {
    id: 258,
    arabic: "الأَوَّلُ",
    transliteration: "al-awwal",
    english: "The first one",
    category: 'choices-preferences',
    frequency: 'common',
    usage: "Select first option"
  },
  {
    id: 259,
    arabic: "الثَّانِي",
    transliteration: "ath-thānī",
    english: "The second one",
    category: 'choices-preferences',
    frequency: 'common',
    usage: "Select second option"
  },
  {
    id: 260,
    arabic: "الآخَرُ",
    transliteration: "al-ākhar",
    english: "The other one",
    category: 'choices-preferences',
    frequency: 'essential',
    usage: "Select alternative"
  },
  {
    id: 261,
    arabic: "كِلَاهُمَا",
    transliteration: "kilāhumā",
    english: "Both of them",
    category: 'choices-preferences',
    frequency: 'common',
    usage: "Choose both options"
  },
  {
    id: 262,
    arabic: "لَا شَيْءَ",
    transliteration: "lā shay'a",
    english: "Nothing",
    category: 'choices-preferences',
    frequency: 'essential',
    usage: "Decline all options"
  },
  {
    id: 263,
    arabic: "أَيُّ شَيْءٍ",
    transliteration: "ayyu shay'in",
    english: "Anything",
    category: 'choices-preferences',
    frequency: 'common',
    usage: "Accept any option"
  },
  {
    id: 264,
    arabic: "غَيِّرْهُ",
    transliteration: "ghayyirhu",
    english: "Change it",
    category: 'choices-preferences',
    frequency: 'common',
    usage: "Request a change"
  },

  // PLACES & OBJECTS - Navigate environment
  {
    id: 265,
    arabic: "البَيْتُ",
    transliteration: "al-bayt",
    english: "The house/home",
    category: 'places-objects',
    frequency: 'essential',
    usage: "Refer to home"
  },
  {
    id: 266,
    arabic: "الغُرْفَةُ",
    transliteration: "al-ghurfa",
    english: "The room",
    category: 'places-objects',
    frequency: 'essential',
    usage: "Refer to a room"
  },
  {
    id: 267,
    arabic: "السَّرِيرُ",
    transliteration: "as-sarīr",
    english: "The bed",
    category: 'places-objects',
    frequency: 'essential',
    usage: "Refer to bed"
  },
  {
    id: 268,
    arabic: "الكُرْسِيُّ",
    transliteration: "al-kursiyy",
    english: "The chair",
    category: 'places-objects',
    frequency: 'essential',
    usage: "Refer to chair"
  },
  {
    id: 269,
    arabic: "الطَّاوِلَةُ",
    transliteration: "aṭ-ṭāwila",
    english: "The table",
    category: 'places-objects',
    frequency: 'common',
    usage: "Refer to table"
  },
  {
    id: 270,
    arabic: "البَابُ",
    transliteration: "al-bāb",
    english: "The door",
    category: 'places-objects',
    frequency: 'essential',
    usage: "Refer to door"
  },
  {
    id: 271,
    arabic: "النَّافِذَةُ",
    transliteration: "an-nāfidha",
    english: "The window",
    category: 'places-objects',
    frequency: 'common',
    usage: "Refer to window"
  },
  {
    id: 272,
    arabic: "المَاءُ",
    transliteration: "al-mā'",
    english: "The water",
    category: 'places-objects',
    frequency: 'essential',
    usage: "Refer to water"
  },
  {
    id: 273,
    arabic: "الطَّعَامُ",
    transliteration: "aṭ-ṭaʿām",
    english: "The food",
    category: 'places-objects',
    frequency: 'essential',
    usage: "Refer to food"
  },
  {
    id: 274,
    arabic: "الهَاتِفُ",
    transliteration: "al-hātif",
    english: "The phone",
    category: 'places-objects',
    frequency: 'essential',
    usage: "Refer to phone"
  },
  {
    id: 275,
    arabic: "الكِتَابُ",
    transliteration: "al-kitāb",
    english: "The book",
    category: 'places-objects',
    frequency: 'essential',
    quranicExample: {
      arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ",
      english: "That is the Book about which there is no doubt",
      reference: "Qur'an 2:2"
    },
    usage: "Refer to book"
  },
  {
    id: 276,
    arabic: "المَسْجِدُ",
    transliteration: "al-masjid",
    english: "The mosque",
    category: 'places-objects',
    frequency: 'essential',
    usage: "Refer to mosque"
  },
  {
    id: 277,
    arabic: "السَّيَّارَةُ",
    transliteration: "as-sayyāra",
    english: "The car",
    category: 'places-objects',
    frequency: 'common',
    usage: "Refer to car"
  },
  {
    id: 278,
    arabic: "المِفْتَاحُ",
    transliteration: "al-miftāḥ",
    english: "The key",
    category: 'places-objects',
    frequency: 'common',
    usage: "Refer to key"
  },
  {
    id: 279,
    arabic: "النُّورُ",
    transliteration: "an-nūr",
    english: "The light",
    category: 'places-objects',
    frequency: 'essential',
    quranicExample: {
      arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
      english: "Allah is the Light of the heavens and the earth",
      reference: "Qur'an 24:35"
    },
    usage: "Refer to light"
  },
  {
    id: 280,
    arabic: "المُصْحَفُ",
    transliteration: "al-muṣḥaf",
    english: "The Qur'an (physical copy)",
    category: 'places-objects',
    frequency: 'essential',
    usage: "Refer to Qur'an"
  },

  // SAFETY & EMERGENCY
  {
    id: 281,
    arabic: "خَطَرٌ",
    transliteration: "khaṭar",
    english: "Danger!",
    category: 'safety-emergency',
    frequency: 'essential',
    usage: "Warn of danger"
  },
  {
    id: 282,
    arabic: "اِتَّصِلْ بِالشُّرْطَةِ",
    transliteration: "ittaṣil bish-shurṭa",
    english: "Call the police",
    category: 'safety-emergency',
    frequency: 'essential',
    usage: "Request police help"
  },
  {
    id: 283,
    arabic: "اِتَّصِلْ بِالإِسْعَافِ",
    transliteration: "ittaṣil bil-isʿāf",
    english: "Call an ambulance",
    category: 'safety-emergency',
    frequency: 'essential',
    usage: "Request ambulance"
  },
  {
    id: 284,
    arabic: "حَرِيقٌ",
    transliteration: "ḥarīq",
    english: "Fire!",
    category: 'safety-emergency',
    frequency: 'essential',
    usage: "Warn of fire"
  },
  {
    id: 285,
    arabic: "أَنَا ضَائِعٌ",
    transliteration: "anā ḍā'iʿ",
    english: "I am lost",
    category: 'safety-emergency',
    frequency: 'essential',
    usage: "Express being lost",
    genderForms: {
      masculine: { arabic: "أَنَا ضَائِعٌ", transliteration: "anā ḍā'iʿ" },
      feminine: { arabic: "أَنَا ضَائِعَةٌ", transliteration: "anā ḍā'iʿa" }
    }
  },
  {
    id: 286,
    arabic: "أَحْتَاجُ مُسَاعَدَةً فَوْرًا",
    transliteration: "aḥtāju musāʿadatan fawran",
    english: "I need help immediately",
    category: 'safety-emergency',
    frequency: 'essential',
    usage: "Urgent help request"
  },
  {
    id: 287,
    arabic: "لَا تَلْمِسْنِي",
    transliteration: "lā talmisnī",
    english: "Don't touch me",
    category: 'safety-emergency',
    frequency: 'essential',
    usage: "Set physical boundary"
  },
  {
    id: 288,
    arabic: "اِبْتَعِدْ عَنِّي",
    transliteration: "ibtaʿid ʿannī",
    english: "Get away from me",
    category: 'safety-emergency',
    frequency: 'essential',
    usage: "Request distance - safety"
  },
  {
    id: 289,
    arabic: "هٰذَا خَطَأٌ",
    transliteration: "hādhā khaṭa'",
    english: "This is wrong",
    category: 'safety-emergency',
    frequency: 'essential',
    usage: "Express something is wrong/bad"
  },
  {
    id: 290,
    arabic: "أَيْنَ أُمِّي",
    transliteration: "ayna ummī",
    english: "Where is my mother?",
    category: 'safety-emergency',
    frequency: 'essential',
    usage: "Find mother - safety/comfort"
  },
  {
    id: 291,
    arabic: "أَيْنَ أَبِي",
    transliteration: "ayna abī",
    english: "Where is my father?",
    category: 'safety-emergency',
    frequency: 'essential',
    usage: "Find father - safety/comfort"
  },
  {
    id: 292,
    arabic: "أُرِيدُ الذَّهَابَ إِلَى البَيْتِ",
    transliteration: "urīdu adh-dhahāba ilā al-bayt",
    english: "I want to go home",
    category: 'safety-emergency',
    frequency: 'essential',
    usage: "Express need to go home"
  },

  // ADDITIONAL EMOTIONS - Expanded set
  {
    id: 293,
    arabic: "أَنَا غَاضِبٌ",
    transliteration: "anā ghāḍib",
    english: "I am angry",
    category: 'emotions',
    frequency: 'essential',
    usage: "Express anger",
    genderForms: {
      masculine: { arabic: "أَنَا غَاضِبٌ", transliteration: "anā ghāḍib" },
      feminine: { arabic: "أَنَا غَاضِبَةٌ", transliteration: "anā ghāḍiba" }
    }
  },
  {
    id: 294,
    arabic: "أَنَا مُتَحَمِّسٌ",
    transliteration: "anā mutaḥammis",
    english: "I am excited",
    category: 'emotions',
    frequency: 'common',
    usage: "Express excitement",
    genderForms: {
      masculine: { arabic: "أَنَا مُتَحَمِّسٌ", transliteration: "anā mutaḥammis" },
      feminine: { arabic: "أَنَا مُتَحَمِّسَةٌ", transliteration: "anā mutaḥammisa" }
    }
  },
  {
    id: 295,
    arabic: "أَنَا مَلْآنُ",
    transliteration: "anā mal'ān",
    english: "I am bored",
    category: 'emotions',
    frequency: 'common',
    usage: "Express boredom",
    genderForms: {
      masculine: { arabic: "أَنَا مَلْآنُ", transliteration: "anā mal'ān" },
      feminine: { arabic: "أَنَا مَلْآنَةٌ", transliteration: "anā mal'āna" }
    }
  },
  {
    id: 296,
    arabic: "أَنَا قَلِقٌ",
    transliteration: "anā qaliq",
    english: "I am worried",
    category: 'emotions',
    frequency: 'essential',
    usage: "Express worry/anxiety",
    genderForms: {
      masculine: { arabic: "أَنَا قَلِقٌ", transliteration: "anā qaliq" },
      feminine: { arabic: "أَنَا قَلِقَةٌ", transliteration: "anā qaliqa" }
    }
  },
  {
    id: 297,
    arabic: "أَنَا مُحْرَجٌ",
    transliteration: "anā muḥraj",
    english: "I am embarrassed",
    category: 'emotions',
    frequency: 'common',
    usage: "Express embarrassment",
    genderForms: {
      masculine: { arabic: "أَنَا مُحْرَجٌ", transliteration: "anā muḥraj" },
      feminine: { arabic: "أَنَا مُحْرَجَةٌ", transliteration: "anā muḥraja" }
    }
  },
  {
    id: 298,
    arabic: "أَنَا مُحْتَارٌ",
    transliteration: "anā muḥtār",
    english: "I am confused",
    category: 'emotions',
    frequency: 'essential',
    usage: "Express confusion",
    genderForms: {
      masculine: { arabic: "أَنَا مُحْتَارٌ", transliteration: "anā muḥtār" },
      feminine: { arabic: "أَنَا مُحْتَارَةٌ", transliteration: "anā muḥtāra" }
    }
  },
  {
    id: 299,
    arabic: "أَنَا وَحِيدٌ",
    transliteration: "anā waḥīd",
    english: "I am lonely",
    category: 'emotions',
    frequency: 'essential',
    usage: "Express loneliness",
    genderForms: {
      masculine: { arabic: "أَنَا وَحِيدٌ", transliteration: "anā waḥīd" },
      feminine: { arabic: "أَنَا وَحِيدَةٌ", transliteration: "anā waḥīda" }
    }
  },
  {
    id: 300,
    arabic: "أَفْتَقِدُكَ",
    transliteration: "aftaqiduka",
    english: "I miss you",
    category: 'emotions',
    frequency: 'essential',
    usage: "Express missing someone",
    genderForms: {
      masculine: { arabic: "أَفْتَقِدُكَ", transliteration: "aftaqiduka" },
      feminine: { arabic: "أَفْتَقِدُكِ", transliteration: "aftaqiduki" }
    }
  }
];

// Combine all phrases
export const allHeritgePhrases: HeritagePhrase[] = [
  ...heritageCorePhrases,
  ...heritageFunctionalPhrases,
  ...heritageAACPhrases
];

// =============================================
// MODULES ORGANIZATION
// =============================================

export const heritageModules: HeritageModule[] = [
  // CORE MODULES (Foundation - learn first)
  {
    id: 'core-requests',
    title: 'Core Requests',
    titleArabic: 'الطَّلَبَات الأَسَاسِيَّة',
    description: 'I want, give me, help me - the foundation of expressing needs',
    icon: '🙋',
    category: 'core',
    phraseIds: [1, 2, 3, 4, 5, 6],
    isCore: true
  },
  {
    id: 'core-actions',
    title: 'Core Actions',
    titleArabic: 'الأَفْعَال الأَسَاسِيَّة',
    description: 'Go, come, look, listen, read - verbs that combine with anything',
    icon: '🏃',
    category: 'core',
    phraseIds: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    isCore: true
  },
  {
    id: 'core-responses',
    title: 'Core Responses',
    titleArabic: 'الرُّدُود الأَسَاسِيَّة',
    description: 'Yes, no, and essential Islamic phrases for daily use',
    icon: '💬',
    category: 'core',
    phraseIds: [18, 19, 20, 21, 22, 23, 24, 25],
    isCore: true
  },
  {
    id: 'core-descriptions',
    title: 'Core Descriptions',
    titleArabic: 'الأَوْصَاف الأَسَاسِيَّة',
    description: 'This, that, big, small - describe anything',
    icon: '📝',
    category: 'core',
    phraseIds: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    isCore: true
  },
  {
    id: 'core-questions',
    title: 'Core Questions',
    titleArabic: 'الأَسْئِلَة الأَسَاسِيَّة',
    description: 'What, who, where, when, how, why - ask about anything',
    icon: '❓',
    category: 'core',
    phraseIds: [37, 38, 39, 40, 41, 42, 43, 44],
    isCore: true
  },
  {
    id: 'dua-starters',
    title: 'Du\'a Starters',
    titleArabic: 'بِدَايَات الدُّعَاء',
    description: 'Begin your supplications with Qur\'anic phrases',
    icon: '🤲',
    category: 'core',
    phraseIds: [45, 46, 47, 48, 49, 50],
    isCore: true
  },

  // FUNCTIONAL MODULES (Build fluency)
  {
    id: 'emotions',
    title: 'Express Emotions',
    titleArabic: 'التَّعْبِير عَن المَشَاعِر',
    description: 'Happy, sad, tired, hungry - express how you feel',
    icon: '😊',
    category: 'functional',
    phraseIds: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110]
  },
  {
    id: 'time-place',
    title: 'Time & Place',
    titleArabic: 'الزَّمَان وَالمَكَان',
    description: 'Now, tomorrow, here, there - orient in time and space',
    icon: '🗓️',
    category: 'functional',
    phraseIds: [111, 112, 113, 114, 115, 116, 117, 118, 119, 120]
  },
  {
    id: 'people-relations',
    title: 'People & Family',
    titleArabic: 'النَّاس وَالعَائِلَة',
    description: 'Father, mother, brother, sister, friend, teacher',
    icon: '👨‍👩‍👧‍👦',
    category: 'functional',
    phraseIds: [121, 122, 123, 124, 125, 126, 127, 128]
  },
  {
    id: 'daily-actions',
    title: 'Daily Actions',
    titleArabic: 'الأَفْعَال اليَوْمِيَّة',
    description: 'I eat, I sleep, I read, I understand - describe your day',
    icon: '☀️',
    category: 'functional',
    phraseIds: [129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141]
  },
  {
    id: 'learning-knowledge',
    title: 'Learning & Knowledge',
    titleArabic: 'التَّعَلُّم وَالمَعْرِفَة',
    description: 'Teach me, I want to learn, what does this mean?',
    icon: '📚',
    category: 'functional',
    phraseIds: [142, 143, 144, 145, 146, 147]
  },
  {
    id: 'gratitude-praise',
    title: 'Gratitude & Praise',
    titleArabic: 'الشُّكْر وَالثَّنَاء',
    description: 'Thank you, may Allah reward you, well done!',
    icon: '🌟',
    category: 'functional',
    phraseIds: [148, 149, 150, 151, 152]
  },
  {
    id: 'movement-direction',
    title: 'Movement & Direction',
    titleArabic: 'الحَرَكَة وَالاِتِّجَاه',
    description: 'Stop, sit, stand, left, right, open, close',
    icon: '🧭',
    category: 'functional',
    phraseIds: [160, 161, 162, 163, 164, 165, 166, 167, 168, 169]
  },
  {
    id: 'affirmation-negation',
    title: 'Agree & Disagree',
    titleArabic: 'المُوَافَقَة وَالرَّفْض',
    description: 'Correct, wrong, I agree, maybe, enough',
    icon: '✅',
    category: 'functional',
    phraseIds: [170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180]
  },
  {
    id: 'seeking-giving',
    title: 'Asking & Giving',
    titleArabic: 'السُّؤَال وَالعَطَاء',
    description: 'Wait, please, this is for you',
    icon: '🎁',
    category: 'functional',
    phraseIds: [153, 154, 155, 156, 157, 158, 159]
  },

  // AAC MODULES (Essential for non-verbal communication)
  {
    id: 'urgent-needs',
    title: 'Urgent Needs',
    titleArabic: 'الحَاجَات العَاجِلَة',
    description: 'Bathroom, water, food, sleep - express immediate needs',
    icon: '🚨',
    category: 'functional',
    phraseIds: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210]
  },
  {
    id: 'physical-states',
    title: 'Physical States',
    titleArabic: 'الحَالَات الجِسْمِيَّة',
    description: 'Sleepy, strong, weak, comfortable - describe your body',
    icon: '💪',
    category: 'functional',
    phraseIds: [211, 212, 213, 214, 215, 216, 217, 218, 219, 220]
  },
  {
    id: 'pain-medical',
    title: 'Pain & Medical',
    titleArabic: 'الأَلَم وَالصِّحَّة',
    description: 'It hurts, I need medicine, body parts - communicate health needs',
    icon: '🏥',
    category: 'functional',
    phraseIds: [221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234]
  },
  {
    id: 'comfort-reassurance',
    title: 'Comfort & Reassurance',
    titleArabic: 'الرَّاحَة وَالطُّمَأْنِينَة',
    description: "Don't be afraid, I love you, everything is okay",
    icon: '🤗',
    category: 'functional',
    phraseIds: [235, 236, 237, 238, 239, 240, 241, 242, 243, 244]
  },
  {
    id: 'social-greetings',
    title: 'Social Greetings',
    titleArabic: 'التَّحِيَّات الاِجْتِمَاعِيَّة',
    description: 'Salam, welcome, goodbye, how are you',
    icon: '👋',
    category: 'functional',
    phraseIds: [245, 246, 247, 248, 249, 250, 251, 252, 253, 254]
  },
  {
    id: 'choices-preferences',
    title: 'Choices & Preferences',
    titleArabic: 'الخَيَارَات وَالتَّفْضِيلَات',
    description: 'I want this, I prefer that, nothing, anything',
    icon: '🤔',
    category: 'functional',
    phraseIds: [255, 256, 257, 258, 259, 260, 261, 262, 263, 264]
  },
  {
    id: 'places-objects',
    title: 'Places & Objects',
    titleArabic: 'الأَمَاكِن وَالأَشْيَاء',
    description: 'Home, room, bed, door, water, phone, book',
    icon: '🏠',
    category: 'functional',
    phraseIds: [265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280]
  },
  {
    id: 'safety-emergency',
    title: 'Safety & Emergency',
    titleArabic: 'السَّلَامَة وَالطَّوَارِئ',
    description: 'Danger, help, call police, where is my mother',
    icon: '⚠️',
    category: 'functional',
    phraseIds: [281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292]
  },
  {
    id: 'emotions-expanded',
    title: 'More Emotions',
    titleArabic: 'مَشَاعِر إِضَافِيَّة',
    description: 'Angry, excited, bored, worried, confused, lonely',
    icon: '😤',
    category: 'functional',
    phraseIds: [293, 294, 295, 296, 297, 298, 299, 300]
  }
];

// Helper functions
export const getHeritagePhraseById = (id: number): HeritagePhrase | undefined => {
  return allHeritgePhrases.find(p => p.id === id);
};

export const getHeritageModulePhrases = (moduleId: string): HeritagePhrase[] => {
  const module = heritageModules.find(m => m.id === moduleId);
  if (!module) return [];
  return module.phraseIds.map(id => getHeritagePhraseById(id)).filter(Boolean) as HeritagePhrase[];
};

export const getCoreModules = (): HeritageModule[] => {
  return heritageModules.filter(m => m.category === 'core');
};

export const getFunctionalModules = (): HeritageModule[] => {
  return heritageModules.filter(m => m.category === 'functional');
};

export const getCategoryLabel = (category: HeritageCategory): string => {
  const labels: Record<HeritageCategory, string> = {
    'core-requests': 'Core Requests',
    'core-actions': 'Core Actions',
    'core-responses': 'Core Responses',
    'core-descriptions': 'Core Descriptions',
    'core-questions': 'Core Questions',
    'dua-starters': 'Du\'a Starters',
    'emotions': 'Emotions',
    'time-place': 'Time & Place',
    'people-relations': 'People & Relations',
    'daily-actions': 'Daily Actions',
    'learning-knowledge': 'Learning & Knowledge',
    'gratitude-praise': 'Gratitude & Praise',
    'seeking-asking': 'Seeking & Asking',
    'giving-sharing': 'Giving & Sharing',
    'movement-direction': 'Movement & Direction',
    'affirmation-negation': 'Affirmation & Negation',
    'urgent-needs': 'Urgent Needs',
    'physical-states': 'Physical States',
    'pain-medical': 'Pain & Medical',
    'comfort-reassurance': 'Comfort & Reassurance',
    'social-greetings': 'Social Greetings',
    'choices-preferences': 'Choices & Preferences',
    'places-objects': 'Places & Objects',
    'safety-emergency': 'Safety & Emergency'
  };
  return labels[category] || category;
};
