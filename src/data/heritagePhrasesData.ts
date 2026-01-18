// Qur'anic Arabic Heritage - Functional Core Vocabulary
// Based on AAC research: high-frequency words that can be combined to communicate in any situation
// All phrases are in Classical Qur'anic Arabic (Fuṣḥā)

// Addressee types for imperative (command) verbs
export type AddresseeType = 
  | 'masculine_singular'    // أنتَ - one male
  | 'feminine_singular'     // أنتِ - one female
  | 'dual'                  // أنتما - two people (any gender)
  | 'masculine_plural'      // أنتم - group of males or mixed
  | 'feminine_plural';      // أنتن - group of females only

export interface ImperativeForm {
  arabic: string;
  transliteration: string;
}

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
  // Imperative forms for command verbs (who you're addressing)
  imperativeForms?: {
    masculine_singular: ImperativeForm;    // أنتَ - to one male
    feminine_singular: ImperativeForm;     // أنتِ - to one female
    dual: ImperativeForm;                  // أنتما - to two people
    masculine_plural: ImperativeForm;      // أنتم - to group of males or mixed
    feminine_plural: ImperativeForm;       // أنتن - to group of females only
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
  | 'safety-emergency'
  | 'countries'
  | 'body-parts'
  | 'colors'
  | 'numbers'
  | 'days-months'
  | 'weather-nature'
  | 'food-drink'
  | 'clothing';

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
    usage: "Command to go. Add destination: 'Go home' = اِذْهَبْ إِلَى البَيْتِ",
    imperativeForms: {
      masculine_singular: { arabic: "اِذْهَبْ", transliteration: "idhhab" },
      feminine_singular: { arabic: "اِذْهَبِي", transliteration: "idhhabī" },
      dual: { arabic: "اِذْهَبَا", transliteration: "idhhabā" },
      masculine_plural: { arabic: "اِذْهَبُوا", transliteration: "idhhabū" },
      feminine_plural: { arabic: "اِذْهَبْنَ", transliteration: "idhhabna" }
    }
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
    usage: "Call someone to come. 'Come here' = تَعَالَ هُنَا",
    imperativeForms: {
      masculine_singular: { arabic: "تَعَالَ", transliteration: "taʿāla" },
      feminine_singular: { arabic: "تَعَالَيْ", transliteration: "taʿālay" },
      dual: { arabic: "تَعَالَيَا", transliteration: "taʿālayā" },
      masculine_plural: { arabic: "تَعَالَوْا", transliteration: "taʿālaw" },
      feminine_plural: { arabic: "تَعَالَيْنَ", transliteration: "taʿālayna" }
    }
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
    usage: "Direct attention. 'Look at this' = اُنْظُرْ إِلَى هٰذَا",
    imperativeForms: {
      masculine_singular: { arabic: "اُنْظُرْ", transliteration: "unẓur" },
      feminine_singular: { arabic: "اُنْظُرِي", transliteration: "unẓurī" },
      dual: { arabic: "اُنْظُرَا", transliteration: "unẓurā" },
      masculine_plural: { arabic: "اُنْظُرُوا", transliteration: "unẓurū" },
      feminine_plural: { arabic: "اُنْظُرْنَ", transliteration: "unẓurna" }
    }
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
    usage: "Get someone's attention for listening",
    imperativeForms: {
      masculine_singular: { arabic: "اِسْمَعْ", transliteration: "ismaʿ" },
      feminine_singular: { arabic: "اِسْمَعِي", transliteration: "ismaʿī" },
      dual: { arabic: "اِسْمَعَا", transliteration: "ismaʿā" },
      masculine_plural: { arabic: "اِسْمَعُوا", transliteration: "ismaʿū" },
      feminine_plural: { arabic: "اِسْمَعْنَ", transliteration: "ismaʿna" }
    }
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
    usage: "Most common Qur'anic command. 'Say...' introduces statements.",
    imperativeForms: {
      masculine_singular: { arabic: "قُلْ", transliteration: "qul" },
      feminine_singular: { arabic: "قُولِي", transliteration: "qūlī" },
      dual: { arabic: "قُولَا", transliteration: "qūlā" },
      masculine_plural: { arabic: "قُولُوا", transliteration: "qūlū" },
      feminine_plural: { arabic: "قُلْنَ", transliteration: "qulna" }
    }
  },
  {
    id: 12,
    arabic: "اِفْعَلْ",
    transliteration: "ifʿal",
    english: "Do (it)",
    category: 'core-actions',
    frequency: 'core',
    usage: "General command to do something",
    imperativeForms: {
      masculine_singular: { arabic: "اِفْعَلْ", transliteration: "ifʿal" },
      feminine_singular: { arabic: "اِفْعَلِي", transliteration: "ifʿalī" },
      dual: { arabic: "اِفْعَلَا", transliteration: "ifʿalā" },
      masculine_plural: { arabic: "اِفْعَلُوا", transliteration: "ifʿalū" },
      feminine_plural: { arabic: "اِفْعَلْنَ", transliteration: "ifʿalna" }
    }
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
    usage: "Offer something or command taking",
    imperativeForms: {
      masculine_singular: { arabic: "خُذْ", transliteration: "khudh" },
      feminine_singular: { arabic: "خُذِي", transliteration: "khudhī" },
      dual: { arabic: "خُذَا", transliteration: "khudhā" },
      masculine_plural: { arabic: "خُذُوا", transliteration: "khudhū" },
      feminine_plural: { arabic: "خُذْنَ", transliteration: "khudhna" }
    }
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
    usage: "The first revelation. Command to read/recite.",
    imperativeForms: {
      masculine_singular: { arabic: "اِقْرَأْ", transliteration: "iqra'" },
      feminine_singular: { arabic: "اِقْرَئِي", transliteration: "iqra'ī" },
      dual: { arabic: "اِقْرَآ", transliteration: "iqra'ā" },
      masculine_plural: { arabic: "اِقْرَؤُوا", transliteration: "iqra'ū" },
      feminine_plural: { arabic: "اِقْرَأْنَ", transliteration: "iqra'na" }
    }
  },
  {
    id: 15,
    arabic: "اُكْتُبْ",
    transliteration: "uktub",
    english: "Write",
    category: 'core-actions',
    frequency: 'core',
    usage: "Command to write something",
    imperativeForms: {
      masculine_singular: { arabic: "اُكْتُبْ", transliteration: "uktub" },
      feminine_singular: { arabic: "اُكْتُبِي", transliteration: "uktubī" },
      dual: { arabic: "اُكْتُبَا", transliteration: "uktubā" },
      masculine_plural: { arabic: "اُكْتُبُوا", transliteration: "uktubū" },
      feminine_plural: { arabic: "اُكْتُبْنَ", transliteration: "uktubna" }
    }
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
    usage: "Command or invitation to eat",
    imperativeForms: {
      masculine_singular: { arabic: "كُلْ", transliteration: "kul" },
      feminine_singular: { arabic: "كُلِي", transliteration: "kulī" },
      dual: { arabic: "كُلَا", transliteration: "kulā" },
      masculine_plural: { arabic: "كُلُوا", transliteration: "kulū" },
      feminine_plural: { arabic: "كُلْنَ", transliteration: "kulna" }
    }
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
    usage: "Command or invitation to drink",
    imperativeForms: {
      masculine_singular: { arabic: "اِشْرَبْ", transliteration: "ishrab" },
      feminine_singular: { arabic: "اِشْرَبِي", transliteration: "ishrabī" },
      dual: { arabic: "اِشْرَبَا", transliteration: "ishrabā" },
      masculine_plural: { arabic: "اِشْرَبُوا", transliteration: "ishrabū" },
      feminine_plural: { arabic: "اِشْرَبْنَ", transliteration: "ishrabna" }
    }
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
    english: "What? (with nouns)",
    category: 'core-questions',
    frequency: 'core',
    quranicExample: {
      arabic: "مَا هَٰذَا",
      english: "What is this?",
      reference: "Qur'an 21:36"
    },
    usage: "Ask about things using nouns. 'What is this?' = مَا هٰذَا؟ Used before nouns and pronouns."
  },
  {
    id: 3701,
    arabic: "مَاذَا",
    transliteration: "mādhā",
    english: "What? (with verbs)",
    category: 'core-questions',
    frequency: 'core',
    quranicExample: {
      arabic: "مَاذَا أَنزَلَ رَبُّكُمْ",
      english: "What has your Lord revealed?",
      reference: "Qur'an 16:24"
    },
    usage: "Ask about actions using verbs. 'What are you doing?' = مَاذَا تَفْعَلُ؟ 'What did you say?' = مَاذَا قُلْتَ؟"
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
    usage: "Ask someone to stay",
    imperativeForms: {
      masculine_singular: { arabic: "لَا تَذْهَبْ", transliteration: "lā tadhhab" },
      feminine_singular: { arabic: "لَا تَذْهَبِي", transliteration: "lā tadhhabī" },
      dual: { arabic: "لَا تَذْهَبَا", transliteration: "lā tadhhabā" },
      masculine_plural: { arabic: "لَا تَذْهَبُوا", transliteration: "lā tadhhabū" },
      feminine_plural: { arabic: "لَا تَذْهَبْنَ", transliteration: "lā tadhhabna" }
    }
  },
  {
    id: 210,
    arabic: "اِبْقَ مَعِي",
    transliteration: "ibqa maʿī",
    english: "Stay with me",
    category: 'urgent-needs',
    frequency: 'essential',
    usage: "Request companionship",
    imperativeForms: {
      masculine_singular: { arabic: "اِبْقَ مَعِي", transliteration: "ibqa maʿī" },
      feminine_singular: { arabic: "اِبْقَيْ مَعِي", transliteration: "ibqay maʿī" },
      dual: { arabic: "اِبْقَيَا مَعِي", transliteration: "ibqayā maʿī" },
      masculine_plural: { arabic: "اِبْقَوْا مَعِي", transliteration: "ibqaw maʿī" },
      feminine_plural: { arabic: "اِبْقَيْنَ مَعِي", transliteration: "ibqayna maʿī" }
    }
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
    usage: "Comfort someone who is scared",
    imperativeForms: {
      masculine_singular: { arabic: "لَا تَخَفْ", transliteration: "lā takhaf" },
      feminine_singular: { arabic: "لَا تَخَافِي", transliteration: "lā takhāfī" },
      dual: { arabic: "لَا تَخَافَا", transliteration: "lā takhāfā" },
      masculine_plural: { arabic: "لَا تَخَافُوا", transliteration: "lā takhāfū" },
      feminine_plural: { arabic: "لَا تَخَفْنَ", transliteration: "lā takhafna" }
    }
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
    usage: "Comfort someone who is sad",
    imperativeForms: {
      masculine_singular: { arabic: "لَا تَحْزَنْ", transliteration: "lā taḥzan" },
      feminine_singular: { arabic: "لَا تَحْزَنِي", transliteration: "lā taḥzanī" },
      dual: { arabic: "لَا تَحْزَنَا", transliteration: "lā taḥzanā" },
      masculine_plural: { arabic: "لَا تَحْزَنُوا", transliteration: "lā taḥzanū" },
      feminine_plural: { arabic: "لَا تَحْزَنَّ", transliteration: "lā taḥzanna" }
    }
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
  },

  // =============================================
  // COUNTRIES - Extended list
  // =============================================
  
  // Arab Countries
  {
    id: 301,
    arabic: "أَنَا مِنْ مِصْرَ",
    transliteration: "anā min miṣr",
    english: "I am from Egypt",
    category: 'countries',
    frequency: 'essential',
    usage: "State your origin"
  },
  {
    id: 302,
    arabic: "مِصْرُ",
    transliteration: "miṣr",
    english: "Egypt",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Egypt"
  },
  {
    id: 303,
    arabic: "السَّعُودِيَّةُ",
    transliteration: "as-saʿūdiyyah",
    english: "Saudi Arabia",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Saudi Arabia"
  },
  {
    id: 304,
    arabic: "الأُرْدُنُّ",
    transliteration: "al-urdunn",
    english: "Jordan",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Jordan"
  },
  {
    id: 305,
    arabic: "سُورِيَا",
    transliteration: "sūriyā",
    english: "Syria",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Syria"
  },
  {
    id: 306,
    arabic: "العِرَاقُ",
    transliteration: "al-ʿirāq",
    english: "Iraq",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Iraq"
  },
  {
    id: 307,
    arabic: "فِلَسْطِينُ",
    transliteration: "filasṭīn",
    english: "Palestine",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Palestine"
  },
  {
    id: 308,
    arabic: "لُبْنَانُ",
    transliteration: "lubnān",
    english: "Lebanon",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Lebanon"
  },
  {
    id: 309,
    arabic: "المَغْرِبُ",
    transliteration: "al-maghrib",
    english: "Morocco",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Morocco"
  },
  {
    id: 310,
    arabic: "الجَزَائِرُ",
    transliteration: "al-jazāʾir",
    english: "Algeria",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Algeria"
  },
  {
    id: 311,
    arabic: "تُونِسُ",
    transliteration: "tūnis",
    english: "Tunisia",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Tunisia"
  },
  {
    id: 312,
    arabic: "لِيبْيَا",
    transliteration: "lībiyā",
    english: "Libya",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Libya"
  },
  {
    id: 313,
    arabic: "السُّودَانُ",
    transliteration: "as-sūdān",
    english: "Sudan",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Sudan"
  },
  {
    id: 314,
    arabic: "اليَمَنُ",
    transliteration: "al-yaman",
    english: "Yemen",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Yemen"
  },
  {
    id: 315,
    arabic: "عُمَانُ",
    transliteration: "ʿumān",
    english: "Oman",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Oman"
  },
  {
    id: 316,
    arabic: "الإِمَارَاتُ",
    transliteration: "al-imārāt",
    english: "UAE (Emirates)",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to UAE"
  },
  {
    id: 317,
    arabic: "قَطَرُ",
    transliteration: "qaṭar",
    english: "Qatar",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Qatar"
  },
  {
    id: 318,
    arabic: "البَحْرَيْنُ",
    transliteration: "al-baḥrayn",
    english: "Bahrain",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Bahrain"
  },
  {
    id: 319,
    arabic: "الكُوَيْتُ",
    transliteration: "al-kuwayt",
    english: "Kuwait",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Kuwait"
  },
  {
    id: 320,
    arabic: "مُورِيتَانِيَا",
    transliteration: "mūrītāniyā",
    english: "Mauritania",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Mauritania"
  },
  {
    id: 321,
    arabic: "جِيبُوتِي",
    transliteration: "jībūtī",
    english: "Djibouti",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Djibouti"
  },
  {
    id: 322,
    arabic: "الصُّومَالُ",
    transliteration: "aṣ-ṣūmāl",
    english: "Somalia",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Somalia"
  },
  {
    id: 323,
    arabic: "جُزُرُ القَمَرِ",
    transliteration: "juzur al-qamar",
    english: "Comoros",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Comoros"
  },
  
  // Muslim-majority non-Arab countries
  {
    id: 324,
    arabic: "تُرْكِيَا",
    transliteration: "turkiyā",
    english: "Turkey",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Turkey"
  },
  {
    id: 325,
    arabic: "إِيرَانُ",
    transliteration: "īrān",
    english: "Iran",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Iran"
  },
  {
    id: 326,
    arabic: "بَاكِسْتَانُ",
    transliteration: "bākistān",
    english: "Pakistan",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Pakistan"
  },
  {
    id: 327,
    arabic: "أَفْغَانِسْتَانُ",
    transliteration: "afghānistān",
    english: "Afghanistan",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Afghanistan"
  },
  {
    id: 328,
    arabic: "بَنْغْلَادِيشُ",
    transliteration: "banghladīsh",
    english: "Bangladesh",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Bangladesh"
  },
  {
    id: 329,
    arabic: "إِنْدُونِيسِيَا",
    transliteration: "indūnīsiyā",
    english: "Indonesia",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Indonesia"
  },
  {
    id: 330,
    arabic: "مَالِيزِيَا",
    transliteration: "mālīziyā",
    english: "Malaysia",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Malaysia"
  },
  {
    id: 331,
    arabic: "بُرُونَايُ",
    transliteration: "brūnāy",
    english: "Brunei",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Brunei"
  },
  {
    id: 332,
    arabic: "أُوزْبَكِسْتَانُ",
    transliteration: "ūzbakistān",
    english: "Uzbekistan",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Uzbekistan"
  },
  {
    id: 333,
    arabic: "كَازَاخِسْتَانُ",
    transliteration: "kāzākhstān",
    english: "Kazakhstan",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Kazakhstan"
  },
  {
    id: 334,
    arabic: "طَاجِيكِسْتَانُ",
    transliteration: "ṭājīkistān",
    english: "Tajikistan",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Tajikistan"
  },
  {
    id: 335,
    arabic: "تُرْكِمَانِسْتَانُ",
    transliteration: "turkmānistān",
    english: "Turkmenistan",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Turkmenistan"
  },
  {
    id: 336,
    arabic: "قِيرْغِيزِسْتَانُ",
    transliteration: "qīrghīzistān",
    english: "Kyrgyzstan",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Kyrgyzstan"
  },
  {
    id: 337,
    arabic: "أَذَرْبَيْجَانُ",
    transliteration: "adharbījān",
    english: "Azerbaijan",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Azerbaijan"
  },
  {
    id: 338,
    arabic: "مَالِي",
    transliteration: "mālī",
    english: "Mali",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Mali"
  },
  {
    id: 339,
    arabic: "السِّنِغَالُ",
    transliteration: "as-sinighāl",
    english: "Senegal",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Senegal"
  },
  {
    id: 340,
    arabic: "نَيْجِيرِيَا",
    transliteration: "nayjīriyā",
    english: "Nigeria",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Nigeria"
  },
  {
    id: 341,
    arabic: "غَامْبِيَا",
    transliteration: "ghāmbiyā",
    english: "Gambia",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Gambia"
  },
  {
    id: 342,
    arabic: "غِينِيَا",
    transliteration: "ghīniyā",
    english: "Guinea",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Guinea"
  },
  {
    id: 343,
    arabic: "النَّيْجَرُ",
    transliteration: "an-nayjar",
    english: "Niger",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Niger"
  },
  {
    id: 344,
    arabic: "تْشَادُ",
    transliteration: "tshād",
    english: "Chad",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Chad"
  },
  {
    id: 345,
    arabic: "سِيرَالِيُونُ",
    transliteration: "sīrāliyūn",
    english: "Sierra Leone",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Sierra Leone"
  },
  {
    id: 346,
    arabic: "بُورْكِينَا فَاسُو",
    transliteration: "būrkīnā fāsū",
    english: "Burkina Faso",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Burkina Faso"
  },
  
  // Western countries
  {
    id: 347,
    arabic: "أَمْرِيكَا",
    transliteration: "amrīkā",
    english: "America (USA)",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to USA"
  },
  {
    id: 348,
    arabic: "الوِلَايَاتُ المُتَّحِدَةُ",
    transliteration: "al-wilāyāt al-muttaḥida",
    english: "United States",
    category: 'countries',
    frequency: 'essential',
    usage: "Formal name for USA"
  },
  {
    id: 349,
    arabic: "كَنَدَا",
    transliteration: "kanadā",
    english: "Canada",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Canada"
  },
  {
    id: 350,
    arabic: "بْرِيطَانِيَا",
    transliteration: "brīṭāniyā",
    english: "Britain",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Britain/UK"
  },
  {
    id: 351,
    arabic: "إِنْجِلْتِرَا",
    transliteration: "injiltirā",
    english: "England",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to England"
  },
  {
    id: 352,
    arabic: "فَرَنْسَا",
    transliteration: "faransā",
    english: "France",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to France"
  },
  {
    id: 353,
    arabic: "أَلْمَانِيَا",
    transliteration: "almāniyā",
    english: "Germany",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Germany"
  },
  {
    id: 354,
    arabic: "إِسْبَانِيَا",
    transliteration: "isbāniyā",
    english: "Spain",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Spain"
  },
  {
    id: 355,
    arabic: "إِيطَالِيَا",
    transliteration: "īṭāliyā",
    english: "Italy",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Italy"
  },
  {
    id: 356,
    arabic: "هُولَنْدَا",
    transliteration: "hūlandā",
    english: "Netherlands",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Netherlands"
  },
  {
    id: 357,
    arabic: "بَلْجِيكَا",
    transliteration: "baljīkā",
    english: "Belgium",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Belgium"
  },
  {
    id: 358,
    arabic: "السُّوِيدُ",
    transliteration: "as-suwīd",
    english: "Sweden",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Sweden"
  },
  {
    id: 359,
    arabic: "النُّرْوِيجُ",
    transliteration: "an-nurwīj",
    english: "Norway",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Norway"
  },
  {
    id: 360,
    arabic: "الدَّانِمَارْكُ",
    transliteration: "ad-dānimārk",
    english: "Denmark",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Denmark"
  },
  {
    id: 361,
    arabic: "أُسْتُرَالِيَا",
    transliteration: "usturāliyā",
    english: "Australia",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Australia"
  },
  {
    id: 362,
    arabic: "نْيُوزِيلَانْدَا",
    transliteration: "nyūzīlandā",
    english: "New Zealand",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to New Zealand"
  },
  {
    id: 363,
    arabic: "سُوِيسْرَا",
    transliteration: "suwīsrā",
    english: "Switzerland",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Switzerland"
  },
  {
    id: 364,
    arabic: "النَّمْسَا",
    transliteration: "an-namsā",
    english: "Austria",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Austria"
  },
  {
    id: 365,
    arabic: "بُولَنْدَا",
    transliteration: "būlandā",
    english: "Poland",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Poland"
  },
  {
    id: 366,
    arabic: "رُوسِيَا",
    transliteration: "rūsiyā",
    english: "Russia",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Russia"
  },
  {
    id: 367,
    arabic: "أُوكْرَانِيَا",
    transliteration: "ūkrāniyā",
    english: "Ukraine",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Ukraine"
  },
  {
    id: 368,
    arabic: "اليُونَانُ",
    transliteration: "al-yūnān",
    english: "Greece",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Greece"
  },
  {
    id: 369,
    arabic: "البُرْتُغَالُ",
    transliteration: "al-burtuġhāl",
    english: "Portugal",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Portugal"
  },
  {
    id: 370,
    arabic: "إِيرْلَنْدَا",
    transliteration: "īrlandā",
    english: "Ireland",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Ireland"
  },
  {
    id: 371,
    arabic: "اِسْكُتْلَنْدَا",
    transliteration: "iskutlandā",
    english: "Scotland",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Scotland"
  },
  
  // Asian countries
  {
    id: 372,
    arabic: "الهِنْدُ",
    transliteration: "al-hind",
    english: "India",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to India"
  },
  {
    id: 373,
    arabic: "الصِّينُ",
    transliteration: "aṣ-ṣīn",
    english: "China",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to China"
  },
  {
    id: 374,
    arabic: "اليَابَانُ",
    transliteration: "al-yābān",
    english: "Japan",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Japan"
  },
  {
    id: 375,
    arabic: "كُورِيَا",
    transliteration: "kūriyā",
    english: "Korea",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Korea"
  },
  {
    id: 376,
    arabic: "تَايْلَانْدُ",
    transliteration: "tāylandū",
    english: "Thailand",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Thailand"
  },
  {
    id: 377,
    arabic: "الفِلِبِّينُ",
    transliteration: "al-filibīn",
    english: "Philippines",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Philippines"
  },
  {
    id: 378,
    arabic: "سِنْغَافُورَةُ",
    transliteration: "singhāfūra",
    english: "Singapore",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Singapore"
  },
  {
    id: 379,
    arabic: "فِيتْنَامُ",
    transliteration: "fītnām",
    english: "Vietnam",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Vietnam"
  },
  {
    id: 380,
    arabic: "سِرِيلَانْكَا",
    transliteration: "sirīlānkā",
    english: "Sri Lanka",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Sri Lanka"
  },
  {
    id: 381,
    arabic: "نِيبَالُ",
    transliteration: "nībāl",
    english: "Nepal",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Nepal"
  },
  
  // African countries
  {
    id: 382,
    arabic: "إِثْيُوبِيَا",
    transliteration: "ithyūbiyā",
    english: "Ethiopia",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Ethiopia"
  },
  {
    id: 383,
    arabic: "كِينْيَا",
    transliteration: "kīnyā",
    english: "Kenya",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Kenya"
  },
  {
    id: 384,
    arabic: "تَنْزَانِيَا",
    transliteration: "tanzāniyā",
    english: "Tanzania",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Tanzania"
  },
  {
    id: 385,
    arabic: "أُوغَنْدَا",
    transliteration: "ūghandā",
    english: "Uganda",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Uganda"
  },
  {
    id: 386,
    arabic: "جَنُوبُ أَفْرِيقِيَا",
    transliteration: "janūb afrīqiyā",
    english: "South Africa",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to South Africa"
  },
  {
    id: 387,
    arabic: "غَانَا",
    transliteration: "ghānā",
    english: "Ghana",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Ghana"
  },
  {
    id: 388,
    arabic: "إِرِيتْرِيَا",
    transliteration: "irītriyā",
    english: "Eritrea",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Eritrea"
  },
  
  // Latin American countries
  {
    id: 389,
    arabic: "المَكْسِيكُ",
    transliteration: "al-maksīk",
    english: "Mexico",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Mexico"
  },
  {
    id: 390,
    arabic: "البْرَازِيلُ",
    transliteration: "al-brāzīl",
    english: "Brazil",
    category: 'countries',
    frequency: 'essential',
    usage: "Refer to Brazil"
  },
  {
    id: 391,
    arabic: "الأَرْجَنْتِينُ",
    transliteration: "al-arjantīn",
    english: "Argentina",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Argentina"
  },
  {
    id: 392,
    arabic: "كُولُومْبِيَا",
    transliteration: "kūlūmbiyā",
    english: "Colombia",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Colombia"
  },
  {
    id: 393,
    arabic: "تْشِيلِي",
    transliteration: "tshīlī",
    english: "Chile",
    category: 'countries',
    frequency: 'common',
    usage: "Refer to Chile"
  },
  
  // =============================================
  // BODY PARTS - Extended for medical/AAC
  // =============================================
  {
    id: 401,
    arabic: "رَأْسٌ",
    transliteration: "ra's",
    english: "Head",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to head"
  },
  {
    id: 402,
    arabic: "وَجْهٌ",
    transliteration: "wajh",
    english: "Face",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to face"
  },
  {
    id: 403,
    arabic: "عَيْنٌ",
    transliteration: "ʿayn",
    english: "Eye",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to eye"
  },
  {
    id: 404,
    arabic: "عَيْنَانِ",
    transliteration: "ʿaynān",
    english: "Eyes (dual)",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to both eyes"
  },
  {
    id: 405,
    arabic: "أُذُنٌ",
    transliteration: "udhun",
    english: "Ear",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to ear"
  },
  {
    id: 406,
    arabic: "أُذُنَانِ",
    transliteration: "udhunān",
    english: "Ears (dual)",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to both ears"
  },
  {
    id: 407,
    arabic: "أَنْفٌ",
    transliteration: "anf",
    english: "Nose",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to nose"
  },
  {
    id: 408,
    arabic: "فَمٌ",
    transliteration: "fam",
    english: "Mouth",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to mouth"
  },
  {
    id: 409,
    arabic: "شَفَةٌ",
    transliteration: "shafa",
    english: "Lip",
    category: 'body-parts',
    frequency: 'common',
    usage: "Refer to lip"
  },
  {
    id: 410,
    arabic: "لِسَانٌ",
    transliteration: "lisān",
    english: "Tongue",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to tongue"
  },
  {
    id: 411,
    arabic: "أَسْنَانٌ",
    transliteration: "asnān",
    english: "Teeth",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to teeth"
  },
  {
    id: 412,
    arabic: "سِنٌّ",
    transliteration: "sinn",
    english: "Tooth",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to a tooth"
  },
  {
    id: 413,
    arabic: "حَلْقٌ",
    transliteration: "ḥalq",
    english: "Throat",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to throat"
  },
  {
    id: 414,
    arabic: "رَقَبَةٌ",
    transliteration: "raqaba",
    english: "Neck",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to neck"
  },
  {
    id: 415,
    arabic: "كَتِفٌ",
    transliteration: "katif",
    english: "Shoulder",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to shoulder"
  },
  {
    id: 416,
    arabic: "ذِرَاعٌ",
    transliteration: "dhirāʿ",
    english: "Arm",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to arm"
  },
  {
    id: 417,
    arabic: "مِرْفَقٌ",
    transliteration: "mirfaq",
    english: "Elbow",
    category: 'body-parts',
    frequency: 'common',
    usage: "Refer to elbow"
  },
  {
    id: 418,
    arabic: "يَدٌ",
    transliteration: "yad",
    english: "Hand",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to hand"
  },
  {
    id: 419,
    arabic: "يَدَانِ",
    transliteration: "yadān",
    english: "Hands (dual)",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to both hands"
  },
  {
    id: 420,
    arabic: "مِعْصَمٌ",
    transliteration: "miʿṣam",
    english: "Wrist",
    category: 'body-parts',
    frequency: 'common',
    usage: "Refer to wrist"
  },
  {
    id: 421,
    arabic: "أَصَابِعُ",
    transliteration: "aṣābiʿ",
    english: "Fingers",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to fingers"
  },
  {
    id: 422,
    arabic: "إِصْبَعٌ",
    transliteration: "iṣbaʿ",
    english: "Finger",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to a finger"
  },
  {
    id: 423,
    arabic: "إِبْهَامٌ",
    transliteration: "ibhām",
    english: "Thumb",
    category: 'body-parts',
    frequency: 'common',
    usage: "Refer to thumb"
  },
  {
    id: 424,
    arabic: "صَدْرٌ",
    transliteration: "ṣadr",
    english: "Chest",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to chest"
  },
  {
    id: 425,
    arabic: "قَلْبٌ",
    transliteration: "qalb",
    english: "Heart",
    category: 'body-parts',
    frequency: 'essential',
    quranicExample: {
      arabic: "أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ أَمْ عَلَىٰ قُلُوبٍ أَقْفَالُهَا",
      english: "Do they not reflect upon the Qur'an, or are there locks upon their hearts?",
      reference: "Qur'an 47:24"
    },
    usage: "Refer to heart"
  },
  {
    id: 426,
    arabic: "بَطْنٌ",
    transliteration: "baṭn",
    english: "Stomach/Belly",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to stomach"
  },
  {
    id: 427,
    arabic: "ظَهْرٌ",
    transliteration: "ẓahr",
    english: "Back",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to back"
  },
  {
    id: 428,
    arabic: "رِجْلٌ",
    transliteration: "rijl",
    english: "Leg/Foot",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to leg or foot"
  },
  {
    id: 429,
    arabic: "رِجْلَانِ",
    transliteration: "rijlān",
    english: "Legs (dual)",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to both legs"
  },
  {
    id: 430,
    arabic: "رُكْبَةٌ",
    transliteration: "rukba",
    english: "Knee",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to knee"
  },
  {
    id: 431,
    arabic: "كَاحِلٌ",
    transliteration: "kāḥil",
    english: "Ankle",
    category: 'body-parts',
    frequency: 'common',
    usage: "Refer to ankle"
  },
  {
    id: 432,
    arabic: "قَدَمٌ",
    transliteration: "qadam",
    english: "Foot",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to foot"
  },
  {
    id: 433,
    arabic: "أَصَابِعُ القَدَمِ",
    transliteration: "aṣābiʿ al-qadam",
    english: "Toes",
    category: 'body-parts',
    frequency: 'common',
    usage: "Refer to toes"
  },
  {
    id: 434,
    arabic: "جِلْدٌ",
    transliteration: "jild",
    english: "Skin",
    category: 'body-parts',
    frequency: 'common',
    usage: "Refer to skin"
  },
  {
    id: 435,
    arabic: "شَعْرٌ",
    transliteration: "shaʿr",
    english: "Hair",
    category: 'body-parts',
    frequency: 'essential',
    usage: "Refer to hair"
  },
  {
    id: 436,
    arabic: "جَبْهَةٌ",
    transliteration: "jabha",
    english: "Forehead",
    category: 'body-parts',
    frequency: 'common',
    usage: "Refer to forehead"
  },
  {
    id: 437,
    arabic: "حَاجِبٌ",
    transliteration: "ḥājib",
    english: "Eyebrow",
    category: 'body-parts',
    frequency: 'common',
    usage: "Refer to eyebrow"
  },
  {
    id: 438,
    arabic: "خَدٌّ",
    transliteration: "khadd",
    english: "Cheek",
    category: 'body-parts',
    frequency: 'common',
    usage: "Refer to cheek"
  },
  {
    id: 439,
    arabic: "ذَقْنٌ",
    transliteration: "dhaqn",
    english: "Chin",
    category: 'body-parts',
    frequency: 'common',
    usage: "Refer to chin"
  },
  {
    id: 440,
    arabic: "لِحْيَةٌ",
    transliteration: "liḥya",
    english: "Beard",
    category: 'body-parts',
    frequency: 'common',
    usage: "Refer to beard"
  },
  
  // =============================================
  // COLORS
  // =============================================
  {
    id: 451,
    arabic: "أَبْيَضُ",
    transliteration: "abyaḍ",
    english: "White",
    category: 'colors',
    frequency: 'essential',
    usage: "Describe white color",
    genderForms: {
      masculine: { arabic: "أَبْيَضُ", transliteration: "abyaḍ" },
      feminine: { arabic: "بَيْضَاءُ", transliteration: "bayḍā'" }
    }
  },
  {
    id: 452,
    arabic: "أَسْوَدُ",
    transliteration: "aswad",
    english: "Black",
    category: 'colors',
    frequency: 'essential',
    usage: "Describe black color",
    genderForms: {
      masculine: { arabic: "أَسْوَدُ", transliteration: "aswad" },
      feminine: { arabic: "سَوْدَاءُ", transliteration: "sawdā'" }
    }
  },
  {
    id: 453,
    arabic: "أَحْمَرُ",
    transliteration: "aḥmar",
    english: "Red",
    category: 'colors',
    frequency: 'essential',
    usage: "Describe red color",
    genderForms: {
      masculine: { arabic: "أَحْمَرُ", transliteration: "aḥmar" },
      feminine: { arabic: "حَمْرَاءُ", transliteration: "ḥamrā'" }
    }
  },
  {
    id: 454,
    arabic: "أَخْضَرُ",
    transliteration: "akhḍar",
    english: "Green",
    category: 'colors',
    frequency: 'essential',
    quranicExample: {
      arabic: "مُتَّكِئِينَ عَلَىٰ رَفْرَفٍ خُضْرٍ",
      english: "Reclining on green cushions",
      reference: "Qur'an 55:76"
    },
    usage: "Describe green color",
    genderForms: {
      masculine: { arabic: "أَخْضَرُ", transliteration: "akhḍar" },
      feminine: { arabic: "خَضْرَاءُ", transliteration: "khaḍrā'" }
    }
  },
  {
    id: 455,
    arabic: "أَزْرَقُ",
    transliteration: "azraq",
    english: "Blue",
    category: 'colors',
    frequency: 'essential',
    usage: "Describe blue color",
    genderForms: {
      masculine: { arabic: "أَزْرَقُ", transliteration: "azraq" },
      feminine: { arabic: "زَرْقَاءُ", transliteration: "zarqā'" }
    }
  },
  {
    id: 456,
    arabic: "أَصْفَرُ",
    transliteration: "aṣfar",
    english: "Yellow",
    category: 'colors',
    frequency: 'essential',
    quranicExample: {
      arabic: "بَقَرَةٌ صَفْرَاءُ فَاقِعٌ لَّوْنُهَا",
      english: "A yellow cow, bright in color",
      reference: "Qur'an 2:69"
    },
    usage: "Describe yellow color",
    genderForms: {
      masculine: { arabic: "أَصْفَرُ", transliteration: "aṣfar" },
      feminine: { arabic: "صَفْرَاءُ", transliteration: "ṣafrā'" }
    }
  },
  {
    id: 457,
    arabic: "بُرْتُقَالِيٌّ",
    transliteration: "burtuqāliyy",
    english: "Orange",
    category: 'colors',
    frequency: 'common',
    usage: "Describe orange color",
    genderForms: {
      masculine: { arabic: "بُرْتُقَالِيٌّ", transliteration: "burtuqāliyy" },
      feminine: { arabic: "بُرْتُقَالِيَّةٌ", transliteration: "burtuqāliyya" }
    }
  },
  {
    id: 458,
    arabic: "بَنَفْسَجِيٌّ",
    transliteration: "banafsajiyy",
    english: "Purple",
    category: 'colors',
    frequency: 'common',
    usage: "Describe purple color",
    genderForms: {
      masculine: { arabic: "بَنَفْسَجِيٌّ", transliteration: "banafsajiyy" },
      feminine: { arabic: "بَنَفْسَجِيَّةٌ", transliteration: "banafsajiyya" }
    }
  },
  {
    id: 459,
    arabic: "وَرْدِيٌّ",
    transliteration: "wardiyy",
    english: "Pink",
    category: 'colors',
    frequency: 'common',
    usage: "Describe pink color",
    genderForms: {
      masculine: { arabic: "وَرْدِيٌّ", transliteration: "wardiyy" },
      feminine: { arabic: "وَرْدِيَّةٌ", transliteration: "wardiyya" }
    }
  },
  {
    id: 460,
    arabic: "بُنِّيٌّ",
    transliteration: "bunniyy",
    english: "Brown",
    category: 'colors',
    frequency: 'common',
    usage: "Describe brown color",
    genderForms: {
      masculine: { arabic: "بُنِّيٌّ", transliteration: "bunniyy" },
      feminine: { arabic: "بُنِّيَّةٌ", transliteration: "bunniyya" }
    }
  },
  {
    id: 461,
    arabic: "رَمَادِيٌّ",
    transliteration: "ramādiyy",
    english: "Gray",
    category: 'colors',
    frequency: 'common',
    usage: "Describe gray color",
    genderForms: {
      masculine: { arabic: "رَمَادِيٌّ", transliteration: "ramādiyy" },
      feminine: { arabic: "رَمَادِيَّةٌ", transliteration: "ramādiyya" }
    }
  },
  {
    id: 462,
    arabic: "ذَهَبِيٌّ",
    transliteration: "dhahabiyy",
    english: "Gold/Golden",
    category: 'colors',
    frequency: 'common',
    usage: "Describe gold color",
    genderForms: {
      masculine: { arabic: "ذَهَبِيٌّ", transliteration: "dhahabiyy" },
      feminine: { arabic: "ذَهَبِيَّةٌ", transliteration: "dhahabiyya" }
    }
  },
  {
    id: 463,
    arabic: "فِضِّيٌّ",
    transliteration: "fiḍḍiyy",
    english: "Silver",
    category: 'colors',
    frequency: 'common',
    usage: "Describe silver color",
    genderForms: {
      masculine: { arabic: "فِضِّيٌّ", transliteration: "fiḍḍiyy" },
      feminine: { arabic: "فِضِّيَّةٌ", transliteration: "fiḍḍiyya" }
    }
  },
  
  // =============================================
  // NUMBERS
  // =============================================
  {
    id: 471,
    arabic: "صِفْرٌ",
    transliteration: "ṣifr",
    english: "Zero",
    category: 'numbers',
    frequency: 'essential',
    usage: "The number 0"
  },
  {
    id: 472,
    arabic: "وَاحِدٌ",
    transliteration: "wāḥid",
    english: "One",
    category: 'numbers',
    frequency: 'essential',
    quranicExample: {
      arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
      english: "Say: He is Allah, the One",
      reference: "Qur'an 112:1"
    },
    usage: "The number 1"
  },
  {
    id: 473,
    arabic: "اِثْنَانِ",
    transliteration: "ithnān",
    english: "Two",
    category: 'numbers',
    frequency: 'essential',
    usage: "The number 2"
  },
  {
    id: 474,
    arabic: "ثَلَاثَةٌ",
    transliteration: "thalātha",
    english: "Three",
    category: 'numbers',
    frequency: 'essential',
    usage: "The number 3"
  },
  {
    id: 475,
    arabic: "أَرْبَعَةٌ",
    transliteration: "arbaʿa",
    english: "Four",
    category: 'numbers',
    frequency: 'essential',
    usage: "The number 4"
  },
  {
    id: 476,
    arabic: "خَمْسَةٌ",
    transliteration: "khamsa",
    english: "Five",
    category: 'numbers',
    frequency: 'essential',
    usage: "The number 5"
  },
  {
    id: 477,
    arabic: "سِتَّةٌ",
    transliteration: "sitta",
    english: "Six",
    category: 'numbers',
    frequency: 'essential',
    usage: "The number 6"
  },
  {
    id: 478,
    arabic: "سَبْعَةٌ",
    transliteration: "sabʿa",
    english: "Seven",
    category: 'numbers',
    frequency: 'essential',
    quranicExample: {
      arabic: "سَبْعَ سَمَاوَاتٍ",
      english: "Seven heavens",
      reference: "Qur'an 2:29"
    },
    usage: "The number 7"
  },
  {
    id: 479,
    arabic: "ثَمَانِيَةٌ",
    transliteration: "thamāniya",
    english: "Eight",
    category: 'numbers',
    frequency: 'essential',
    usage: "The number 8"
  },
  {
    id: 480,
    arabic: "تِسْعَةٌ",
    transliteration: "tisʿa",
    english: "Nine",
    category: 'numbers',
    frequency: 'essential',
    usage: "The number 9"
  },
  {
    id: 481,
    arabic: "عَشَرَةٌ",
    transliteration: "ʿashara",
    english: "Ten",
    category: 'numbers',
    frequency: 'essential',
    usage: "The number 10"
  },
  {
    id: 482,
    arabic: "أَحَدَ عَشَرَ",
    transliteration: "aḥada ʿashar",
    english: "Eleven",
    category: 'numbers',
    frequency: 'common',
    usage: "The number 11"
  },
  {
    id: 483,
    arabic: "اِثْنَا عَشَرَ",
    transliteration: "ithnā ʿashar",
    english: "Twelve",
    category: 'numbers',
    frequency: 'common',
    usage: "The number 12"
  },
  {
    id: 484,
    arabic: "عِشْرُونَ",
    transliteration: "ʿishrūn",
    english: "Twenty",
    category: 'numbers',
    frequency: 'common',
    usage: "The number 20"
  },
  {
    id: 485,
    arabic: "ثَلَاثُونَ",
    transliteration: "thalāthūn",
    english: "Thirty",
    category: 'numbers',
    frequency: 'common',
    usage: "The number 30"
  },
  {
    id: 486,
    arabic: "أَرْبَعُونَ",
    transliteration: "arbaʿūn",
    english: "Forty",
    category: 'numbers',
    frequency: 'common',
    usage: "The number 40"
  },
  {
    id: 487,
    arabic: "خَمْسُونَ",
    transliteration: "khamsūn",
    english: "Fifty",
    category: 'numbers',
    frequency: 'common',
    usage: "The number 50"
  },
  {
    id: 488,
    arabic: "مِائَةٌ",
    transliteration: "mi'a",
    english: "One hundred",
    category: 'numbers',
    frequency: 'essential',
    usage: "The number 100"
  },
  {
    id: 489,
    arabic: "أَلْفٌ",
    transliteration: "alf",
    english: "One thousand",
    category: 'numbers',
    frequency: 'essential',
    quranicExample: {
      arabic: "لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ",
      english: "The Night of Decree is better than a thousand months",
      reference: "Qur'an 97:3"
    },
    usage: "The number 1000"
  },
  {
    id: 490,
    arabic: "الأَوَّلُ",
    transliteration: "al-awwal",
    english: "First",
    category: 'numbers',
    frequency: 'essential',
    usage: "Ordinal: first",
    genderForms: {
      masculine: { arabic: "الأَوَّلُ", transliteration: "al-awwal" },
      feminine: { arabic: "الأُولَى", transliteration: "al-ūlā" }
    }
  },
  {
    id: 491,
    arabic: "الثَّانِي",
    transliteration: "ath-thānī",
    english: "Second",
    category: 'numbers',
    frequency: 'essential',
    usage: "Ordinal: second",
    genderForms: {
      masculine: { arabic: "الثَّانِي", transliteration: "ath-thānī" },
      feminine: { arabic: "الثَّانِيَةُ", transliteration: "ath-thāniya" }
    }
  },
  {
    id: 492,
    arabic: "الثَّالِثُ",
    transliteration: "ath-thālith",
    english: "Third",
    category: 'numbers',
    frequency: 'essential',
    usage: "Ordinal: third",
    genderForms: {
      masculine: { arabic: "الثَّالِثُ", transliteration: "ath-thālith" },
      feminine: { arabic: "الثَّالِثَةُ", transliteration: "ath-thālitha" }
    }
  },
  {
    id: 493,
    arabic: "الأَخِيرُ",
    transliteration: "al-akhīr",
    english: "Last",
    category: 'numbers',
    frequency: 'essential',
    usage: "Ordinal: last",
    genderForms: {
      masculine: { arabic: "الأَخِيرُ", transliteration: "al-akhīr" },
      feminine: { arabic: "الأَخِيرَةُ", transliteration: "al-akhīra" }
    }
  },
  
  // =============================================
  // DAYS & MONTHS
  // =============================================
  {
    id: 501,
    arabic: "يَوْمُ الأَحَدِ",
    transliteration: "yawm al-aḥad",
    english: "Sunday",
    category: 'days-months',
    frequency: 'essential',
    usage: "Day of the week"
  },
  {
    id: 502,
    arabic: "يَوْمُ الاِثْنَيْنِ",
    transliteration: "yawm al-ithnayn",
    english: "Monday",
    category: 'days-months',
    frequency: 'essential',
    usage: "Day of the week"
  },
  {
    id: 503,
    arabic: "يَوْمُ الثُّلَاثَاءِ",
    transliteration: "yawm ath-thulāthā'",
    english: "Tuesday",
    category: 'days-months',
    frequency: 'essential',
    usage: "Day of the week"
  },
  {
    id: 504,
    arabic: "يَوْمُ الأَرْبِعَاءِ",
    transliteration: "yawm al-arbiʿā'",
    english: "Wednesday",
    category: 'days-months',
    frequency: 'essential',
    usage: "Day of the week"
  },
  {
    id: 505,
    arabic: "يَوْمُ الخَمِيسِ",
    transliteration: "yawm al-khamīs",
    english: "Thursday",
    category: 'days-months',
    frequency: 'essential',
    usage: "Day of the week"
  },
  {
    id: 506,
    arabic: "يَوْمُ الجُمُعَةِ",
    transliteration: "yawm al-jumuʿa",
    english: "Friday",
    category: 'days-months',
    frequency: 'essential',
    quranicExample: {
      arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا نُودِيَ لِلصَّلَاةِ مِن يَوْمِ الْجُمُعَةِ",
      english: "O you who believe, when the call is made for prayer on Friday",
      reference: "Qur'an 62:9"
    },
    usage: "Day of the week - special in Islam"
  },
  {
    id: 507,
    arabic: "يَوْمُ السَّبْتِ",
    transliteration: "yawm as-sabt",
    english: "Saturday",
    category: 'days-months',
    frequency: 'essential',
    usage: "Day of the week"
  },
  
  // Islamic months
  {
    id: 511,
    arabic: "مُحَرَّمٌ",
    transliteration: "muḥarram",
    english: "Muharram (1st month)",
    category: 'days-months',
    frequency: 'essential',
    usage: "First Islamic month - sacred"
  },
  {
    id: 512,
    arabic: "صَفَرٌ",
    transliteration: "ṣafar",
    english: "Safar (2nd month)",
    category: 'days-months',
    frequency: 'common',
    usage: "Second Islamic month"
  },
  {
    id: 513,
    arabic: "رَبِيعُ الأَوَّلِ",
    transliteration: "rabīʿ al-awwal",
    english: "Rabi al-Awwal (3rd month)",
    category: 'days-months',
    frequency: 'essential',
    usage: "Third Islamic month - Prophet's birthday"
  },
  {
    id: 514,
    arabic: "رَبِيعُ الآخِرِ",
    transliteration: "rabīʿ al-ākhir",
    english: "Rabi al-Akhir (4th month)",
    category: 'days-months',
    frequency: 'common',
    usage: "Fourth Islamic month"
  },
  {
    id: 515,
    arabic: "جُمَادَى الأُولَى",
    transliteration: "jumādā al-ūlā",
    english: "Jumada al-Ula (5th month)",
    category: 'days-months',
    frequency: 'common',
    usage: "Fifth Islamic month"
  },
  {
    id: 516,
    arabic: "جُمَادَى الآخِرَةِ",
    transliteration: "jumādā al-ākhira",
    english: "Jumada al-Akhira (6th month)",
    category: 'days-months',
    frequency: 'common',
    usage: "Sixth Islamic month"
  },
  {
    id: 517,
    arabic: "رَجَبٌ",
    transliteration: "rajab",
    english: "Rajab (7th month)",
    category: 'days-months',
    frequency: 'essential',
    usage: "Seventh Islamic month - sacred"
  },
  {
    id: 518,
    arabic: "شَعْبَانُ",
    transliteration: "shaʿbān",
    english: "Sha'ban (8th month)",
    category: 'days-months',
    frequency: 'essential',
    usage: "Eighth Islamic month - before Ramadan"
  },
  {
    id: 519,
    arabic: "رَمَضَانُ",
    transliteration: "ramaḍān",
    english: "Ramadan (9th month)",
    category: 'days-months',
    frequency: 'essential',
    quranicExample: {
      arabic: "شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ",
      english: "The month of Ramadan in which the Qur'an was revealed",
      reference: "Qur'an 2:185"
    },
    usage: "Ninth Islamic month - fasting"
  },
  {
    id: 520,
    arabic: "شَوَّالٌ",
    transliteration: "shawwāl",
    english: "Shawwal (10th month)",
    category: 'days-months',
    frequency: 'essential',
    usage: "Tenth Islamic month - Eid al-Fitr"
  },
  {
    id: 521,
    arabic: "ذُو القَعْدَةِ",
    transliteration: "dhū al-qaʿda",
    english: "Dhu al-Qa'dah (11th month)",
    category: 'days-months',
    frequency: 'common',
    usage: "Eleventh Islamic month - sacred"
  },
  {
    id: 522,
    arabic: "ذُو الحِجَّةِ",
    transliteration: "dhū al-ḥijja",
    english: "Dhu al-Hijjah (12th month)",
    category: 'days-months',
    frequency: 'essential',
    usage: "Twelfth Islamic month - Hajj, Eid al-Adha"
  },
  
  // =============================================
  // WEATHER & NATURE
  // =============================================
  {
    id: 531,
    arabic: "الشَّمْسُ",
    transliteration: "ash-shams",
    english: "The sun",
    category: 'weather-nature',
    frequency: 'essential',
    quranicExample: {
      arabic: "وَالشَّمْسِ وَضُحَاهَا",
      english: "By the sun and its brightness",
      reference: "Qur'an 91:1"
    },
    usage: "Refer to sun"
  },
  {
    id: 532,
    arabic: "القَمَرُ",
    transliteration: "al-qamar",
    english: "The moon",
    category: 'weather-nature',
    frequency: 'essential',
    quranicExample: {
      arabic: "وَالْقَمَرِ إِذَا تَلَاهَا",
      english: "And the moon when it follows it",
      reference: "Qur'an 91:2"
    },
    usage: "Refer to moon"
  },
  {
    id: 533,
    arabic: "النُّجُومُ",
    transliteration: "an-nujūm",
    english: "The stars",
    category: 'weather-nature',
    frequency: 'essential',
    quranicExample: {
      arabic: "وَالنَّجْمِ إِذَا هَوَىٰ",
      english: "By the star when it descends",
      reference: "Qur'an 53:1"
    },
    usage: "Refer to stars"
  },
  {
    id: 534,
    arabic: "السَّمَاءُ",
    transliteration: "as-samā'",
    english: "The sky",
    category: 'weather-nature',
    frequency: 'essential',
    usage: "Refer to sky"
  },
  {
    id: 535,
    arabic: "الأَرْضُ",
    transliteration: "al-arḍ",
    english: "The earth",
    category: 'weather-nature',
    frequency: 'essential',
    usage: "Refer to earth"
  },
  {
    id: 536,
    arabic: "السَّحَابُ",
    transliteration: "as-saḥāb",
    english: "The clouds",
    category: 'weather-nature',
    frequency: 'essential',
    usage: "Refer to clouds"
  },
  {
    id: 537,
    arabic: "المَطَرُ",
    transliteration: "al-maṭar",
    english: "The rain",
    category: 'weather-nature',
    frequency: 'essential',
    quranicExample: {
      arabic: "وَهُوَ الَّذِي يُنَزِّلُ الْغَيْثَ",
      english: "And it is He who sends down the rain",
      reference: "Qur'an 42:28"
    },
    usage: "Refer to rain"
  },
  {
    id: 538,
    arabic: "الثَّلْجُ",
    transliteration: "ath-thalj",
    english: "The snow",
    category: 'weather-nature',
    frequency: 'common',
    usage: "Refer to snow"
  },
  {
    id: 539,
    arabic: "الرِّيحُ",
    transliteration: "ar-rīḥ",
    english: "The wind",
    category: 'weather-nature',
    frequency: 'essential',
    quranicExample: {
      arabic: "وَأَرْسَلْنَا الرِّيَاحَ لَوَاقِحَ",
      english: "And We have sent the winds as pollinators",
      reference: "Qur'an 15:22"
    },
    usage: "Refer to wind"
  },
  {
    id: 540,
    arabic: "حَارٌّ",
    transliteration: "ḥārr",
    english: "Hot (weather)",
    category: 'weather-nature',
    frequency: 'essential',
    usage: "Describe hot weather"
  },
  {
    id: 541,
    arabic: "بَارِدٌ",
    transliteration: "bārid",
    english: "Cold (weather)",
    category: 'weather-nature',
    frequency: 'essential',
    usage: "Describe cold weather"
  },
  {
    id: 542,
    arabic: "مُشْمِسٌ",
    transliteration: "mushmis",
    english: "Sunny",
    category: 'weather-nature',
    frequency: 'common',
    usage: "Describe sunny weather"
  },
  {
    id: 543,
    arabic: "غَائِمٌ",
    transliteration: "ghā'im",
    english: "Cloudy",
    category: 'weather-nature',
    frequency: 'common',
    usage: "Describe cloudy weather"
  },
  {
    id: 544,
    arabic: "مُمْطِرٌ",
    transliteration: "mumṭir",
    english: "Rainy",
    category: 'weather-nature',
    frequency: 'common',
    usage: "Describe rainy weather"
  },
  {
    id: 545,
    arabic: "البَحْرُ",
    transliteration: "al-baḥr",
    english: "The sea",
    category: 'weather-nature',
    frequency: 'essential',
    usage: "Refer to sea"
  },
  {
    id: 546,
    arabic: "النَّهْرُ",
    transliteration: "an-nahr",
    english: "The river",
    category: 'weather-nature',
    frequency: 'essential',
    usage: "Refer to river"
  },
  {
    id: 547,
    arabic: "الجَبَلُ",
    transliteration: "al-jabal",
    english: "The mountain",
    category: 'weather-nature',
    frequency: 'essential',
    usage: "Refer to mountain"
  },
  {
    id: 548,
    arabic: "الشَّجَرَةُ",
    transliteration: "ash-shajara",
    english: "The tree",
    category: 'weather-nature',
    frequency: 'essential',
    usage: "Refer to tree"
  },
  {
    id: 549,
    arabic: "الوَرْدَةُ",
    transliteration: "al-warda",
    english: "The flower/rose",
    category: 'weather-nature',
    frequency: 'common',
    usage: "Refer to flower"
  },
  {
    id: 550,
    arabic: "الحَدِيقَةُ",
    transliteration: "al-ḥadīqa",
    english: "The garden",
    category: 'weather-nature',
    frequency: 'essential',
    quranicExample: {
      arabic: "وَلِمَنْ خَافَ مَقَامَ رَبِّهِ جَنَّتَانِ",
      english: "But for he who fears the position of his Lord are two gardens",
      reference: "Qur'an 55:46"
    },
    usage: "Refer to garden"
  },
  
  // =============================================
  // FOOD & DRINK
  // =============================================
  {
    id: 561,
    arabic: "خُبْزٌ",
    transliteration: "khubz",
    english: "Bread",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to bread"
  },
  {
    id: 562,
    arabic: "أَرُزٌّ",
    transliteration: "aruzz",
    english: "Rice",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to rice"
  },
  {
    id: 563,
    arabic: "لَحْمٌ",
    transliteration: "laḥm",
    english: "Meat",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to meat"
  },
  {
    id: 564,
    arabic: "دَجَاجٌ",
    transliteration: "dajāj",
    english: "Chicken",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to chicken"
  },
  {
    id: 565,
    arabic: "سَمَكٌ",
    transliteration: "samak",
    english: "Fish",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to fish"
  },
  {
    id: 566,
    arabic: "بَيْضٌ",
    transliteration: "bayḍ",
    english: "Eggs",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to eggs"
  },
  {
    id: 567,
    arabic: "حَلِيبٌ",
    transliteration: "ḥalīb",
    english: "Milk",
    category: 'food-drink',
    frequency: 'essential',
    quranicExample: {
      arabic: "لَبَنًا خَالِصًا سَائِغًا لِّلشَّارِبِينَ",
      english: "Pure milk, palatable to those who drink",
      reference: "Qur'an 16:66"
    },
    usage: "Refer to milk"
  },
  {
    id: 568,
    arabic: "جُبْنٌ",
    transliteration: "jubn",
    english: "Cheese",
    category: 'food-drink',
    frequency: 'common',
    usage: "Refer to cheese"
  },
  {
    id: 569,
    arabic: "زُبْدَةٌ",
    transliteration: "zubda",
    english: "Butter",
    category: 'food-drink',
    frequency: 'common',
    usage: "Refer to butter"
  },
  {
    id: 570,
    arabic: "عَسَلٌ",
    transliteration: "ʿasal",
    english: "Honey",
    category: 'food-drink',
    frequency: 'essential',
    quranicExample: {
      arabic: "فِيهِ شِفَاءٌ لِّلنَّاسِ",
      english: "In it is healing for people",
      reference: "Qur'an 16:69"
    },
    usage: "Refer to honey"
  },
  {
    id: 571,
    arabic: "تُفَّاحٌ",
    transliteration: "tuffāḥ",
    english: "Apple",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to apple"
  },
  {
    id: 572,
    arabic: "مَوْزٌ",
    transliteration: "mawz",
    english: "Banana",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to banana"
  },
  {
    id: 573,
    arabic: "بُرْتُقَالٌ",
    transliteration: "burtuqāl",
    english: "Orange",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to orange"
  },
  {
    id: 574,
    arabic: "عِنَبٌ",
    transliteration: "ʿinab",
    english: "Grapes",
    category: 'food-drink',
    frequency: 'essential',
    quranicExample: {
      arabic: "وَأَعْنَابًا وَقَضْبًا",
      english: "And grapes and fresh vegetation",
      reference: "Qur'an 80:28"
    },
    usage: "Refer to grapes"
  },
  {
    id: 575,
    arabic: "تَمْرٌ",
    transliteration: "tamr",
    english: "Dates",
    category: 'food-drink',
    frequency: 'essential',
    quranicExample: {
      arabic: "وَهُزِّي إِلَيْكِ بِجِذْعِ النَّخْلَةِ تُسَاقِطْ عَلَيْكِ رُطَبًا جَنِيًّا",
      english: "Shake toward you the trunk of the palm tree; it will drop upon you ripe, fresh dates",
      reference: "Qur'an 19:25"
    },
    usage: "Refer to dates"
  },
  {
    id: 576,
    arabic: "زَيْتُونٌ",
    transliteration: "zaytūn",
    english: "Olives",
    category: 'food-drink',
    frequency: 'essential',
    quranicExample: {
      arabic: "وَالتِّينِ وَالزَّيْتُونِ",
      english: "By the fig and the olive",
      reference: "Qur'an 95:1"
    },
    usage: "Refer to olives"
  },
  {
    id: 577,
    arabic: "تِينٌ",
    transliteration: "tīn",
    english: "Figs",
    category: 'food-drink',
    frequency: 'common',
    usage: "Refer to figs"
  },
  {
    id: 578,
    arabic: "رُمَّانٌ",
    transliteration: "rummān",
    english: "Pomegranate",
    category: 'food-drink',
    frequency: 'common',
    quranicExample: {
      arabic: "فِيهِمَا فَاكِهَةٌ وَنَخْلٌ وَرُمَّانٌ",
      english: "In both are fruit and palm trees and pomegranates",
      reference: "Qur'an 55:68"
    },
    usage: "Refer to pomegranate"
  },
  {
    id: 579,
    arabic: "شَايٌ",
    transliteration: "shāy",
    english: "Tea",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to tea"
  },
  {
    id: 580,
    arabic: "قَهْوَةٌ",
    transliteration: "qahwa",
    english: "Coffee",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to coffee"
  },
  {
    id: 581,
    arabic: "عَصِيرٌ",
    transliteration: "ʿaṣīr",
    english: "Juice",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to juice"
  },
  {
    id: 582,
    arabic: "سُكَّرٌ",
    transliteration: "sukkar",
    english: "Sugar",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to sugar"
  },
  {
    id: 583,
    arabic: "مِلْحٌ",
    transliteration: "milḥ",
    english: "Salt",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to salt"
  },
  {
    id: 584,
    arabic: "زَيْتٌ",
    transliteration: "zayt",
    english: "Oil",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to oil"
  },
  {
    id: 585,
    arabic: "خُضَارٌ",
    transliteration: "khuḍār",
    english: "Vegetables",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to vegetables"
  },
  {
    id: 586,
    arabic: "فَوَاكِهُ",
    transliteration: "fawākih",
    english: "Fruits",
    category: 'food-drink',
    frequency: 'essential',
    usage: "Refer to fruits"
  },
  
  // =============================================
  // CLOTHING
  // =============================================
  {
    id: 601,
    arabic: "ثَوْبٌ",
    transliteration: "thawb",
    english: "Garment/Thobe",
    category: 'clothing',
    frequency: 'essential',
    usage: "Refer to garment"
  },
  {
    id: 602,
    arabic: "قَمِيصٌ",
    transliteration: "qamīṣ",
    english: "Shirt",
    category: 'clothing',
    frequency: 'essential',
    quranicExample: {
      arabic: "وَجَاءُوا عَلَىٰ قَمِيصِهِ بِدَمٍ كَذِبٍ",
      english: "And they brought upon his shirt false blood",
      reference: "Qur'an 12:18"
    },
    usage: "Refer to shirt"
  },
  {
    id: 603,
    arabic: "بَنْطَلُونٌ",
    transliteration: "banṭalūn",
    english: "Pants/Trousers",
    category: 'clothing',
    frequency: 'essential',
    usage: "Refer to pants"
  },
  {
    id: 604,
    arabic: "فُسْتَانٌ",
    transliteration: "fustān",
    english: "Dress",
    category: 'clothing',
    frequency: 'essential',
    usage: "Refer to dress"
  },
  {
    id: 605,
    arabic: "تَنُّورَةٌ",
    transliteration: "tannūra",
    english: "Skirt",
    category: 'clothing',
    frequency: 'common',
    usage: "Refer to skirt"
  },
  {
    id: 606,
    arabic: "جَاكِيتٌ",
    transliteration: "jākīt",
    english: "Jacket",
    category: 'clothing',
    frequency: 'common',
    usage: "Refer to jacket"
  },
  {
    id: 607,
    arabic: "مِعْطَفٌ",
    transliteration: "miʿṭaf",
    english: "Coat",
    category: 'clothing',
    frequency: 'common',
    usage: "Refer to coat"
  },
  {
    id: 608,
    arabic: "حِذَاءٌ",
    transliteration: "ḥidhā'",
    english: "Shoes",
    category: 'clothing',
    frequency: 'essential',
    usage: "Refer to shoes"
  },
  {
    id: 609,
    arabic: "جَوْرَبٌ",
    transliteration: "jawrab",
    english: "Socks",
    category: 'clothing',
    frequency: 'common',
    usage: "Refer to socks"
  },
  {
    id: 610,
    arabic: "حِجَابٌ",
    transliteration: "ḥijāb",
    english: "Hijab",
    category: 'clothing',
    frequency: 'essential',
    usage: "Refer to hijab"
  },
  {
    id: 611,
    arabic: "عَبَايَةٌ",
    transliteration: "ʿabāya",
    english: "Abaya",
    category: 'clothing',
    frequency: 'essential',
    usage: "Refer to abaya"
  },
  {
    id: 612,
    arabic: "نِقَابٌ",
    transliteration: "niqāb",
    english: "Niqab",
    category: 'clothing',
    frequency: 'common',
    usage: "Refer to niqab"
  },
  {
    id: 613,
    arabic: "قُبَّعَةٌ",
    transliteration: "qubbaʿa",
    english: "Hat/Cap",
    category: 'clothing',
    frequency: 'common',
    usage: "Refer to hat"
  },
  {
    id: 614,
    arabic: "كُوفِيَّةٌ",
    transliteration: "kūfiyya",
    english: "Kufi (cap)",
    category: 'clothing',
    frequency: 'common',
    usage: "Refer to kufi cap"
  },
  {
    id: 615,
    arabic: "نَظَّارَاتٌ",
    transliteration: "naẓẓārāt",
    english: "Glasses",
    category: 'clothing',
    frequency: 'common',
    usage: "Refer to glasses"
  },
  {
    id: 616,
    arabic: "سَاعَةٌ",
    transliteration: "sāʿa",
    english: "Watch",
    category: 'clothing',
    frequency: 'common',
    usage: "Refer to watch"
  },
  {
    id: 617,
    arabic: "حَقِيبَةٌ",
    transliteration: "ḥaqība",
    english: "Bag",
    category: 'clothing',
    frequency: 'essential',
    usage: "Refer to bag"
  },
  {
    id: 618,
    arabic: "خَاتَمٌ",
    transliteration: "khātam",
    english: "Ring",
    category: 'clothing',
    frequency: 'common',
    usage: "Refer to ring"
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
    phraseIds: [37, 3701, 38, 39, 40, 41, 42, 43, 44],
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
    'safety-emergency': 'Safety & Emergency',
    'countries': 'Countries',
    'body-parts': 'Body Parts',
    'colors': 'Colors',
    'numbers': 'Numbers',
    'days-months': 'Days & Months',
    'weather-nature': 'Weather & Nature',
    'food-drink': 'Food & Drink',
    'clothing': 'Clothing'
  };
  return labels[category] || category;
};
