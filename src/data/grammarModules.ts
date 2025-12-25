// Grammar-focused modules for Qur'anic Arabic
// Based on classical Arabic grammar (النحو) structure
// Each module builds on the previous, teaching language piece by piece

export interface GrammarWord {
  id: number;
  arabic: string;
  transliteration: string;
  english: string;
  category: string;
  occurrences?: number;
  examples: {
    arabic: string;
    english: string;
    reference: string;
  }[];
  forms?: {
    arabic: string;
    transliteration: string;
    meaning: string;
  }[];
  notes?: string;
}

export interface GrammarModule {
  id: number;
  title: string;
  titleArabic: string;
  description: string;
  descriptionArabic: string;
  grammarRule?: string;
  wordIds: number[];
  coveragePercentage: number;
  prerequisiteModuleId?: number;
}

// =============================================
// MODULE 1: الضمائر المنفصلة - Detached Pronouns
// =============================================

const detachedPronouns: GrammarWord[] = [
  {
    id: 101,
    arabic: "أَنَا",
    transliteration: "anā",
    english: "I",
    category: "pronoun-detached",
    occurrences: 68,
    examples: [
      {
        arabic: "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ",
        english: "Nor am I a worshipper of what you worship",
        reference: "Qur'an 109:4"
      },
      {
        arabic: "إِنَّنِي أَنَا اللَّهُ لَا إِلَٰهَ إِلَّا أَنَا",
        english: "Indeed, I am Allah. There is no deity except Me",
        reference: "Qur'an 20:14"
      }
    ],
    notes: "First person singular - used when speaking about oneself"
  },
  {
    id: 102,
    arabic: "نَحْنُ",
    transliteration: "naḥnu",
    english: "we",
    category: "pronoun-detached",
    occurrences: 86,
    examples: [
      {
        arabic: "إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ",
        english: "Indeed, it is We who sent down the Reminder",
        reference: "Qur'an 15:9"
      },
      {
        arabic: "نَحْنُ أَوْلِيَاؤُكُمْ فِي الْحَيَاةِ الدُّنْيَا",
        english: "We are your allies in worldly life",
        reference: "Qur'an 41:31"
      }
    ],
    notes: "First person plural - Allah often uses this for Majesty"
  },
  {
    id: 103,
    arabic: "أَنْتَ",
    transliteration: "anta",
    english: "you (masculine singular)",
    category: "pronoun-detached",
    occurrences: 81,
    examples: [
      {
        arabic: "سُبْحَانَكَ لَا عِلْمَ لَنَا إِلَّا مَا عَلَّمْتَنَا إِنَّكَ أَنتَ الْعَلِيمُ الْحَكِيمُ",
        english: "Exalted are You; we have no knowledge except what You have taught us. Indeed, it is You who is the Knowing, the Wise",
        reference: "Qur'an 2:32"
      },
      {
        arabic: "أَنتَ وَلِيُّنَا",
        english: "You are our Protector",
        reference: "Qur'an 2:286"
      }
    ],
    notes: "Second person masculine singular - addressing one male"
  },
  {
    id: 104,
    arabic: "أَنْتِ",
    transliteration: "anti",
    english: "you (feminine singular)",
    category: "pronoun-detached",
    occurrences: 12,
    examples: [
      {
        arabic: "يَا مَرْيَمُ اقْنُتِي لِرَبِّكِ",
        english: "O Mary, be devoutly obedient to your Lord",
        reference: "Qur'an 3:43"
      },
      {
        arabic: "وَأَنتِ حِلٌّ بِهَٰذَا الْبَلَدِ",
        english: "And you are free of restriction in this city",
        reference: "Qur'an 90:2"
      }
    ],
    notes: "Second person feminine singular - addressing one female"
  },
  {
    id: 105,
    arabic: "أَنْتُمَا",
    transliteration: "antumā",
    english: "you two (dual)",
    category: "pronoun-detached",
    occurrences: 5,
    examples: [
      {
        arabic: "قَالَ لَا تَخَافَا إِنَّنِي مَعَكُمَا أَسْمَعُ وَأَرَىٰ",
        english: "He said: Fear not. Indeed, I am with you both; I hear and I see",
        reference: "Qur'an 20:46"
      }
    ],
    notes: "Second person dual - addressing exactly two people"
  },
  {
    id: 106,
    arabic: "أَنْتُمْ",
    transliteration: "antum",
    english: "you all (masculine plural)",
    category: "pronoun-detached",
    occurrences: 135,
    examples: [
      {
        arabic: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ",
        english: "Nor are you worshippers of what I worship",
        reference: "Qur'an 109:3"
      },
      {
        arabic: "أَنتُمُ الْفُقَرَاءُ إِلَى اللَّهِ",
        english: "You are the ones in need of Allah",
        reference: "Qur'an 35:15"
      }
    ],
    notes: "Second person masculine plural - addressing a group"
  },
  {
    id: 107,
    arabic: "أَنْتُنَّ",
    transliteration: "antunna",
    english: "you all (feminine plural)",
    category: "pronoun-detached",
    occurrences: 3,
    examples: [
      {
        arabic: "يَا نِسَاءَ النَّبِيِّ لَسْتُنَّ كَأَحَدٍ مِّنَ النِّسَاءِ",
        english: "O wives of the Prophet, you are not like anyone among women",
        reference: "Qur'an 33:32"
      }
    ],
    notes: "Second person feminine plural - addressing a group of females"
  },
  {
    id: 108,
    arabic: "هُوَ",
    transliteration: "huwa",
    english: "he / it",
    category: "pronoun-detached",
    occurrences: 481,
    examples: [
      {
        arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        english: "Say: He is Allah, the One",
        reference: "Qur'an 112:1"
      },
      {
        arabic: "هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ",
        english: "He is the First and the Last, the Manifest and the Hidden",
        reference: "Qur'an 57:3"
      }
    ],
    notes: "Third person masculine singular - most frequent pronoun in Qur'an"
  },
  {
    id: 109,
    arabic: "هِيَ",
    transliteration: "hiya",
    english: "she / it",
    category: "pronoun-detached",
    occurrences: 74,
    examples: [
      {
        arabic: "وَمَا الْحَيَاةُ الدُّنْيَا إِلَّا لَعِبٌ وَلَهْوٌ",
        english: "And the worldly life is nothing but play and amusement",
        reference: "Qur'an 6:32"
      },
      {
        arabic: "وَهِيَ تَجْرِي بِهِمْ فِي مَوْجٍ كَالْجِبَالِ",
        english: "And it sailed with them through waves like mountains",
        reference: "Qur'an 11:42"
      }
    ],
    notes: "Third person feminine singular"
  },
  {
    id: 110,
    arabic: "هُمَا",
    transliteration: "humā",
    english: "they two (dual)",
    category: "pronoun-detached",
    occurrences: 15,
    examples: [
      {
        arabic: "وَلَا تَقُل لَّهُمَا أُفٍّ",
        english: "And do not say to them a word of disrespect",
        reference: "Qur'an 17:23"
      }
    ],
    notes: "Third person dual - referring to exactly two"
  },
  {
    id: 111,
    arabic: "هُمْ",
    transliteration: "hum",
    english: "they (masculine plural)",
    category: "pronoun-detached",
    occurrences: 444,
    examples: [
      {
        arabic: "أُولَٰئِكَ هُمُ الْمُفْلِحُونَ",
        english: "It is those who are the successful",
        reference: "Qur'an 2:5"
      },
      {
        arabic: "أُولَٰئِكَ هُمُ الْكَافِرُونَ حَقًّا",
        english: "Those are the disbelievers, truly",
        reference: "Qur'an 4:151"
      }
    ],
    notes: "Third person masculine plural - very common"
  },
  {
    id: 112,
    arabic: "هُنَّ",
    transliteration: "hunna",
    english: "they (feminine plural)",
    category: "pronoun-detached",
    occurrences: 18,
    examples: [
      {
        arabic: "هُنَّ لِبَاسٌ لَّكُمْ وَأَنتُمْ لِبَاسٌ لَّهُنَّ",
        english: "They are clothing for you and you are clothing for them",
        reference: "Qur'an 2:187"
      }
    ],
    notes: "Third person feminine plural"
  }
];

// =============================================
// MODULE 2: أسماء الإشارة - Demonstrative Nouns
// =============================================

const demonstrativeNouns: GrammarWord[] = [
  {
    id: 201,
    arabic: "هَٰذَا",
    transliteration: "hādhā",
    english: "this (masculine singular)",
    category: "demonstrative",
    occurrences: 398,
    examples: [
      {
        arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ",
        english: "This is the Book about which there is no doubt",
        reference: "Qur'an 2:2"
      },
      {
        arabic: "هَٰذَا صِرَاطِي مُسْتَقِيمًا",
        english: "This is My path, which is straight",
        reference: "Qur'an 6:153"
      }
    ],
    notes: "Used to point to something near (masculine)"
  },
  {
    id: 202,
    arabic: "هَٰذِهِ",
    transliteration: "hādhihi",
    english: "this (feminine singular)",
    category: "demonstrative",
    occurrences: 89,
    examples: [
      {
        arabic: "وَلَا تَقْرَبَا هَٰذِهِ الشَّجَرَةَ",
        english: "And do not approach this tree",
        reference: "Qur'an 2:35"
      },
      {
        arabic: "إِنَّ هَٰذِهِ أُمَّتُكُمْ أُمَّةً وَاحِدَةً",
        english: "Indeed, this nation of yours is one nation",
        reference: "Qur'an 21:92"
      }
    ],
    notes: "Used to point to something near (feminine)"
  },
  {
    id: 203,
    arabic: "هَٰذَانِ",
    transliteration: "hādhāni",
    english: "these two (masculine dual)",
    category: "demonstrative",
    occurrences: 7,
    examples: [
      {
        arabic: "هَٰذَانِ خَصْمَانِ اخْتَصَمُوا فِي رَبِّهِمْ",
        english: "These are two adversaries who have disputed over their Lord",
        reference: "Qur'an 22:19"
      }
    ],
    notes: "Dual form for two masculine things nearby"
  },
  {
    id: 204,
    arabic: "هَاتَانِ",
    transliteration: "hātāni",
    english: "these two (feminine dual)",
    category: "demonstrative",
    occurrences: 2,
    examples: [
      {
        arabic: "قَالَ إِنِّي أُرِيدُ أَنْ أُنكِحَكَ إِحْدَى ابْنَتَيَّ هَاتَيْنِ",
        english: "He said: I wish to wed you to one of these two daughters of mine",
        reference: "Qur'an 28:27"
      }
    ],
    notes: "Dual form for two feminine things nearby"
  },
  {
    id: 205,
    arabic: "هَٰؤُلَاءِ",
    transliteration: "hāʾulāʾi",
    english: "these (plural)",
    category: "demonstrative",
    occurrences: 60,
    examples: [
      {
        arabic: "هَٰأَنتُمْ هَٰؤُلَاءِ جَادَلْتُمْ عَنْهُمْ",
        english: "Here you are - those who argue on their behalf",
        reference: "Qur'an 4:109"
      },
      {
        arabic: "فَمَا لِهَٰؤُلَاءِ الْقَوْمِ لَا يَكَادُونَ يَفْقَهُونَ حَدِيثًا",
        english: "So what is wrong with these people that they can hardly understand any statement?",
        reference: "Qur'an 4:78"
      }
    ],
    notes: "Plural demonstrative for things nearby"
  },
  {
    id: 206,
    arabic: "ذَٰلِكَ",
    transliteration: "dhālika",
    english: "that (masculine singular)",
    category: "demonstrative",
    occurrences: 510,
    examples: [
      {
        arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ",
        english: "That is the Book about which there is no doubt",
        reference: "Qur'an 2:2"
      },
      {
        arabic: "ذَٰلِكَ فَضْلُ اللَّهِ يُؤْتِيهِ مَن يَشَاءُ",
        english: "That is the bounty of Allah which He gives to whom He wills",
        reference: "Qur'an 5:54"
      }
    ],
    notes: "Used to point to something far (masculine)"
  },
  {
    id: 207,
    arabic: "تِلْكَ",
    transliteration: "tilka",
    english: "that (feminine singular)",
    category: "demonstrative",
    occurrences: 78,
    examples: [
      {
        arabic: "تِلْكَ الدَّارُ الْآخِرَةُ نَجْعَلُهَا لِلَّذِينَ لَا يُرِيدُونَ عُلُوًّا فِي الْأَرْضِ",
        english: "That home of the Hereafter We assign to those who do not desire superiority on earth",
        reference: "Qur'an 28:83"
      },
      {
        arabic: "تِلْكَ آيَاتُ اللَّهِ نَتْلُوهَا عَلَيْكَ بِالْحَقِّ",
        english: "These are the verses of Allah which We recite to you in truth",
        reference: "Qur'an 2:252"
      }
    ],
    notes: "Used to point to something far (feminine)"
  },
  {
    id: 208,
    arabic: "أُولَٰئِكَ",
    transliteration: "ulāʾika",
    english: "those (plural)",
    category: "demonstrative",
    occurrences: 198,
    examples: [
      {
        arabic: "أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ",
        english: "Those are upon guidance from their Lord",
        reference: "Qur'an 2:5"
      },
      {
        arabic: "أُولَٰئِكَ هُمُ الْمُفْلِحُونَ",
        english: "Those are the successful ones",
        reference: "Qur'an 2:5"
      }
    ],
    notes: "Plural demonstrative for things far away"
  }
];

// =============================================
// MODULE 3: الأسماء الموصولة - Relative Pronouns
// =============================================

const relativePronouns: GrammarWord[] = [
  {
    id: 301,
    arabic: "الَّذِي",
    transliteration: "alladhī",
    english: "who, which, that (masculine singular)",
    category: "relative",
    occurrences: 1236,
    examples: [
      {
        arabic: "الْحَمْدُ لِلَّهِ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ",
        english: "Praise to Allah, who created the heavens and the earth",
        reference: "Qur'an 6:1"
      },
      {
        arabic: "رَبُّنَا الَّذِي أَعْطَىٰ كُلَّ شَيْءٍ خَلْقَهُ ثُمَّ هَدَىٰ",
        english: "Our Lord is He who gave each thing its form and then guided it",
        reference: "Qur'an 20:50"
      }
    ],
    notes: "Most common relative pronoun - connects sentences"
  },
  {
    id: 302,
    arabic: "الَّتِي",
    transliteration: "allatī",
    english: "who, which, that (feminine singular)",
    category: "relative",
    occurrences: 148,
    examples: [
      {
        arabic: "وَأَنَّ هَٰذَا صِرَاطِي مُسْتَقِيمًا",
        english: "And that this is My path, straight",
        reference: "Qur'an 6:153"
      },
      {
        arabic: "وَلَا تَقْرَبُوا الصَّلَاةَ وَأَنتُمْ سُكَارَىٰ حَتَّىٰ تَعْلَمُوا مَا تَقُولُونَ وَلَا جُنُبًا إِلَّا عَابِرِي سَبِيلٍ حَتَّىٰ تَغْتَسِلُوا",
        english: "And do not approach prayer while you are intoxicated until you know what you are saying or in a state of janabah except those passing through until you have washed",
        reference: "Qur'an 4:43"
      }
    ],
    notes: "Feminine form of الذي"
  },
  {
    id: 303,
    arabic: "اللَّذَانِ",
    transliteration: "alladhāni",
    english: "the two who (masculine dual)",
    category: "relative",
    occurrences: 3,
    examples: [
      {
        arabic: "وَاللَّذَانِ يَأْتِيَانِهَا مِنكُمْ فَآذُوهُمَا",
        english: "And the two who commit it among you, dishonor them both",
        reference: "Qur'an 4:16"
      }
    ],
    notes: "Dual masculine form - used for exactly two males"
  },
  {
    id: 304,
    arabic: "اللَّتَانِ",
    transliteration: "allatāni",
    english: "the two who (feminine dual)",
    category: "relative",
    occurrences: 1,
    examples: [
      {
        arabic: "فَاسْتَشْهِدُوا عَلَيْهِنَّ أَرْبَعَةً مِّنكُمْ",
        english: "Call upon four witnesses from among you against them",
        reference: "Qur'an 4:15"
      }
    ],
    notes: "Dual feminine form - used for exactly two females"
  },
  {
    id: 305,
    arabic: "الَّذِينَ",
    transliteration: "alladhīna",
    english: "those who (masculine plural)",
    category: "relative",
    occurrences: 935,
    examples: [
      {
        arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ",
        english: "The path of those upon whom You have bestowed favor",
        reference: "Qur'an 1:7"
      },
      {
        arabic: "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ",
        english: "Indeed, those who believe and do righteous deeds",
        reference: "Qur'an 2:277"
      }
    ],
    notes: "Extremely common - second most frequent word pattern"
  },
  {
    id: 306,
    arabic: "اللَّاتِي",
    transliteration: "allātī",
    english: "those who (feminine plural)",
    category: "relative",
    occurrences: 11,
    examples: [
      {
        arabic: "وَاللَّاتِي يَأْتِينَ الْفَاحِشَةَ مِن نِّسَائِكُمْ",
        english: "Those who commit unlawful sexual intercourse of your women",
        reference: "Qur'an 4:15"
      }
    ],
    notes: "Feminine plural form"
  },
  {
    id: 307,
    arabic: "مَنْ",
    transliteration: "man",
    english: "who, whoever, he who",
    category: "relative",
    occurrences: 744,
    examples: [
      {
        arabic: "مَنْ عَمِلَ صَالِحًا فَلِنَفْسِهِ",
        english: "Whoever does righteousness - it is for his own soul",
        reference: "Qur'an 45:15"
      },
      {
        arabic: "وَمَن يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا",
        english: "And whoever is given wisdom has certainly been given much good",
        reference: "Qur'an 2:269"
      }
    ],
    notes: "General relative for rational beings (humans)"
  },
  {
    id: 308,
    arabic: "مَا",
    transliteration: "mā",
    english: "what, that which",
    category: "relative",
    occurrences: 2400,
    examples: [
      {
        arabic: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ",
        english: "The Messenger has believed in what was revealed to him from his Lord",
        reference: "Qur'an 2:285"
      },
      {
        arabic: "وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ",
        english: "And I did not create the jinn and mankind except to worship Me",
        reference: "Qur'an 51:56"
      }
    ],
    notes: "General relative for non-rational things"
  }
];

// =============================================
// MODULE 4: حروف الجر - Prepositions
// =============================================

const prepositions: GrammarWord[] = [
  {
    id: 401,
    arabic: "مِنْ",
    transliteration: "min",
    english: "from, of, some of",
    category: "preposition",
    occurrences: 3226,
    examples: [
      {
        arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
        english: "I seek refuge in Allah from the accursed Satan",
        reference: "Qur'an 16:98"
      },
      {
        arabic: "خَلَقَ الْإِنسَانَ مِن طِينٍ",
        english: "He created man from clay",
        reference: "Qur'an 6:2"
      },
      {
        arabic: "وَمِنَ النَّاسِ مَن يَقُولُ آمَنَّا بِاللَّهِ",
        english: "And of the people are some who say, 'We believe in Allah'",
        reference: "Qur'an 2:8"
      }
    ],
    notes: "Most common preposition - indicates origin, source, or partitive"
  },
  {
    id: 402,
    arabic: "إِلَىٰ",
    transliteration: "ilā",
    english: "to, towards, until",
    category: "preposition",
    occurrences: 702,
    examples: [
      {
        arabic: "ثُمَّ إِلَىٰ رَبِّكُم مَّرْجِعُكُمْ",
        english: "Then to your Lord is your return",
        reference: "Qur'an 6:164"
      },
      {
        arabic: "فَأَوْحَيْنَا إِلَىٰ مُوسَىٰ",
        english: "So We inspired to Moses",
        reference: "Qur'an 26:63"
      }
    ],
    notes: "Indicates direction, destination, or end point"
  },
  {
    id: 403,
    arabic: "عَنْ",
    transliteration: "ʿan",
    english: "from, about, away from",
    category: "preposition",
    occurrences: 615,
    examples: [
      {
        arabic: "وَيَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ",
        english: "And He forbids immorality and wrongdoing",
        reference: "Qur'an 16:90"
      },
      {
        arabic: "فَاسْأَلُوا أَهْلَ الذِّكْرِ إِن كُنتُمْ لَا تَعْلَمُونَ",
        english: "So ask the people of knowledge if you do not know",
        reference: "Qur'an 16:43"
      }
    ],
    notes: "Indicates separation, source of information, or concerning"
  },
  {
    id: 404,
    arabic: "عَلَىٰ",
    transliteration: "ʿalā",
    english: "on, upon, over, against",
    category: "preposition",
    occurrences: 1445,
    examples: [
      {
        arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ",
        english: "The path of those upon whom You have bestowed favor",
        reference: "Qur'an 1:7"
      },
      {
        arabic: "وَعَلَى اللَّهِ فَتَوَكَّلُوا إِن كُنتُم مُّؤْمِنِينَ",
        english: "And upon Allah rely, if you should be believers",
        reference: "Qur'an 5:23"
      }
    ],
    notes: "Indicates position above, obligation, or against"
  },
  {
    id: 405,
    arabic: "فِي",
    transliteration: "fī",
    english: "in, within, among",
    category: "preposition",
    occurrences: 1686,
    examples: [
      {
        arabic: "فِي قُلُوبِهِم مَّرَضٌ",
        english: "In their hearts is disease",
        reference: "Qur'an 2:10"
      },
      {
        arabic: "هُوَ اللَّهُ الَّذِي لَا إِلَٰهَ إِلَّا هُوَ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ",
        english: "He is Allah, other than whom there is no deity, Knower of the unseen and the witnessed",
        reference: "Qur'an 59:22"
      }
    ],
    notes: "Indicates location, time, or state"
  },
  {
    id: 406,
    arabic: "بِ",
    transliteration: "bi",
    english: "with, by, in",
    category: "preposition",
    occurrences: 2288,
    examples: [
      {
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        english: "In the name of Allah, the Most Gracious, the Most Merciful",
        reference: "Qur'an 1:1"
      },
      {
        arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
        english: "And seek help through patience and prayer",
        reference: "Qur'an 2:45"
      }
    ],
    notes: "Indicates means, accompaniment, or oath"
  },
  {
    id: 407,
    arabic: "لِ",
    transliteration: "li",
    english: "for, to, belonging to",
    category: "preposition",
    occurrences: 4195,
    examples: [
      {
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        english: "All praise is for Allah, Lord of all the worlds",
        reference: "Qur'an 1:2"
      },
      {
        arabic: "وَلِلَّهِ الْمَشْرِقُ وَالْمَغْرِبُ",
        english: "And to Allah belongs the east and the west",
        reference: "Qur'an 2:115"
      }
    ],
    notes: "Most frequent preposition - indicates possession, purpose, or benefit"
  },
  {
    id: 408,
    arabic: "كَ",
    transliteration: "ka",
    english: "like, as, such as",
    category: "preposition",
    occurrences: 123,
    examples: [
      {
        arabic: "لَيْسَ كَمِثْلِهِ شَيْءٌ",
        english: "There is nothing like unto Him",
        reference: "Qur'an 42:11"
      },
      {
        arabic: "وَإِذَا مَسَّهُ الشَّرُّ كَانَ يَئُوسًا",
        english: "And when evil touches him, he is despairing",
        reference: "Qur'an 17:83"
      }
    ],
    notes: "Indicates similarity or comparison"
  },
  {
    id: 409,
    arabic: "رُبَّ",
    transliteration: "rubba",
    english: "perhaps, many a",
    category: "preposition",
    occurrences: 5,
    examples: [
      {
        arabic: "رُّبَمَا يَوَدُّ الَّذِينَ كَفَرُوا لَوْ كَانُوا مُسْلِمِينَ",
        english: "Perhaps those who disbelieve will wish that they had been Muslims",
        reference: "Qur'an 15:2"
      }
    ],
    notes: "Expresses possibility or many instances"
  }
];

// =============================================
// MODULE 5: أدوات الاستفهام - Interrogative Particles
// =============================================

const interrogativeParticles: GrammarWord[] = [
  {
    id: 501,
    arabic: "هَلْ",
    transliteration: "hal",
    english: "do/does? is/are? (yes/no question)",
    category: "interrogative",
    occurrences: 90,
    examples: [
      {
        arabic: "هَلْ أَتَىٰ عَلَى الْإِنسَانِ حِينٌ مِّنَ الدَّهْرِ",
        english: "Has there not come upon man a period of time?",
        reference: "Qur'an 76:1"
      },
      {
        arabic: "هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ",
        english: "Are those who know equal to those who do not know?",
        reference: "Qur'an 39:9"
      }
    ],
    notes: "Used for yes/no questions - expects a response"
  },
  {
    id: 502,
    arabic: "أَيْنَ",
    transliteration: "ayna",
    english: "where?",
    category: "interrogative",
    occurrences: 22,
    examples: [
      {
        arabic: "أَيْنَ شُرَكَاؤُكُمُ الَّذِينَ كُنتُمْ تَزْعُمُونَ",
        english: "Where are your partners which you used to claim?",
        reference: "Qur'an 6:22"
      },
      {
        arabic: "أَيْنَمَا تَكُونُوا يُدْرِككُّمُ الْمَوْتُ",
        english: "Wherever you may be, death will overtake you",
        reference: "Qur'an 4:78"
      }
    ],
    notes: "Asks about location or place"
  },
  {
    id: 503,
    arabic: "مَتَىٰ",
    transliteration: "matā",
    english: "when?",
    category: "interrogative",
    occurrences: 12,
    examples: [
      {
        arabic: "مَتَىٰ نَصْرُ اللَّهِ",
        english: "When is the help of Allah?",
        reference: "Qur'an 2:214"
      },
      {
        arabic: "يَسْأَلُونَكَ عَنِ السَّاعَةِ أَيَّانَ مُرْسَاهَا",
        english: "They ask you about the Hour: when is its arrival?",
        reference: "Qur'an 7:187"
      }
    ],
    notes: "Asks about time"
  },
  {
    id: 504,
    arabic: "كَيْفَ",
    transliteration: "kayfa",
    english: "how?",
    category: "interrogative",
    occurrences: 83,
    examples: [
      {
        arabic: "كَيْفَ تَكْفُرُونَ بِاللَّهِ وَكُنتُمْ أَمْوَاتًا فَأَحْيَاكُمْ",
        english: "How can you disbelieve in Allah when you were lifeless and He brought you to life?",
        reference: "Qur'an 2:28"
      },
      {
        arabic: "انظُرْ كَيْفَ ضَرَبُوا لَكَ الْأَمْثَالَ",
        english: "Look how they strike for you comparisons",
        reference: "Qur'an 17:48"
      }
    ],
    notes: "Asks about manner, method, or condition"
  },
  {
    id: 505,
    arabic: "مَاذَا",
    transliteration: "mādhā",
    english: "what?",
    category: "interrogative",
    occurrences: 52,
    examples: [
      {
        arabic: "مَاذَا أَرَادَ اللَّهُ بِهَٰذَا مَثَلًا",
        english: "What did Allah intend by this as an example?",
        reference: "Qur'an 2:26"
      },
      {
        arabic: "يَسْأَلُونَكَ مَاذَا يُنفِقُونَ",
        english: "They ask you what they should spend",
        reference: "Qur'an 2:215"
      }
    ],
    notes: "Asks about things or actions - combines مَا + ذَا"
  },
  {
    id: 506,
    arabic: "لِمَاذَا",
    transliteration: "limādhā",
    english: "why? for what reason?",
    category: "interrogative",
    occurrences: 15,
    examples: [
      {
        arabic: "لِمَ تَقُولُونَ مَا لَا تَفْعَلُونَ",
        english: "Why do you say what you do not do?",
        reference: "Qur'an 61:2"
      },
      {
        arabic: "لِمَ تَصُدُّونَ عَن سَبِيلِ اللَّهِ",
        english: "Why do you turn away from the path of Allah?",
        reference: "Qur'an 3:99"
      }
    ],
    notes: "Asks about reason or purpose"
  },
  {
    id: 507,
    arabic: "كَمْ",
    transliteration: "kam",
    english: "how many? how much?",
    category: "interrogative",
    occurrences: 37,
    examples: [
      {
        arabic: "كَمْ لَبِثْتُمْ فِي الْأَرْضِ عَدَدَ سِنِينَ",
        english: "How many years did you remain on earth?",
        reference: "Qur'an 23:112"
      },
      {
        arabic: "كَمْ أَهْلَكْنَا مِن قَبْلِهِم مِّن قَرْنٍ",
        english: "How many generations We destroyed before them!",
        reference: "Qur'an 19:74"
      }
    ],
    notes: "Asks about quantity or number"
  },
  {
    id: 508,
    arabic: "أَيُّ",
    transliteration: "ayyu",
    english: "which? what kind of?",
    category: "interrogative",
    occurrences: 25,
    examples: [
      {
        arabic: "أَيُّكُمْ يَأْتِينِي بِعَرْشِهَا",
        english: "Which of you will bring me her throne?",
        reference: "Qur'an 27:38"
      },
      {
        arabic: "بِأَيِّ ذَنبٍ قُتِلَتْ",
        english: "For what sin she was killed",
        reference: "Qur'an 81:9"
      }
    ],
    notes: "Asks to specify from a group"
  },
  {
    id: 509,
    arabic: "أَنَّىٰ",
    transliteration: "annā",
    english: "how? from where?",
    category: "interrogative",
    occurrences: 16,
    examples: [
      {
        arabic: "أَنَّىٰ لَكِ هَٰذَا",
        english: "From where is this for you?",
        reference: "Qur'an 3:37"
      },
      {
        arabic: "أَنَّىٰ يُحْيِي هَٰذِهِ اللَّهُ بَعْدَ مَوْتِهَا",
        english: "How will Allah bring this to life after its death?",
        reference: "Qur'an 2:259"
      }
    ],
    notes: "Can mean 'how' or 'from where' depending on context"
  }
];

// =============================================
// MODULE 6: الضمائر المتصلة - Attached Pronouns
// =============================================

const attachedPronouns: GrammarWord[] = [
  {
    id: 601,
    arabic: "ـي / ـنِي",
    transliteration: "-ī / -nī",
    english: "me, my",
    category: "pronoun-attached",
    occurrences: 980,
    examples: [
      {
        arabic: "رَبِّي أَعْلَمُ",
        english: "My Lord knows best",
        reference: "Qur'an 18:22"
      },
      {
        arabic: "اهْدِنِي الصِّرَاطَ الْمُسْتَقِيمَ",
        english: "Guide me to the straight path",
        reference: "Qur'an 1:6"
      }
    ],
    forms: [
      { arabic: "قَلْبِي", transliteration: "qalbī", meaning: "my heart" },
      { arabic: "رَبِّي", transliteration: "rabbī", meaning: "my Lord" },
      { arabic: "أَعْطَانِي", transliteration: "aʿṭānī", meaning: "He gave me" }
    ],
    notes: "First person singular - attaches to nouns (possession) and verbs (object)"
  },
  {
    id: 602,
    arabic: "ـنَا",
    transliteration: "-nā",
    english: "us, our",
    category: "pronoun-attached",
    occurrences: 1245,
    examples: [
      {
        arabic: "رَبَّنَا لَا تُؤَاخِذْنَا",
        english: "Our Lord, do not impose blame upon us",
        reference: "Qur'an 2:286"
      },
      {
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        english: "Guide us to the straight path",
        reference: "Qur'an 1:6"
      }
    ],
    forms: [
      { arabic: "رَبَّنَا", transliteration: "rabbanā", meaning: "our Lord" },
      { arabic: "خَلَقَنَا", transliteration: "khalaqanā", meaning: "He created us" },
      { arabic: "إِلَيْنَا", transliteration: "ilaynā", meaning: "to us" }
    ],
    notes: "First person plural - very common in Qur'anic du'as"
  },
  {
    id: 603,
    arabic: "ـكَ",
    transliteration: "-ka",
    english: "you, your (masculine singular)",
    category: "pronoun-attached",
    occurrences: 856,
    examples: [
      {
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        english: "You alone we worship and You alone we ask for help",
        reference: "Qur'an 1:5"
      },
      {
        arabic: "رَبُّكَ الْأَعْلَىٰ",
        english: "Your Lord, the Most High",
        reference: "Qur'an 87:1"
      }
    ],
    forms: [
      { arabic: "رَبُّكَ", transliteration: "rabbuka", meaning: "your Lord" },
      { arabic: "عَلَيْكَ", transliteration: "ʿalayka", meaning: "upon you" },
      { arabic: "مِنكَ", transliteration: "minka", meaning: "from you" }
    ],
    notes: "Second person masculine singular"
  },
  {
    id: 604,
    arabic: "ـكِ",
    transliteration: "-ki",
    english: "you, your (feminine singular)",
    category: "pronoun-attached",
    occurrences: 45,
    examples: [
      {
        arabic: "اقْنُتِي لِرَبِّكِ",
        english: "Be devoutly obedient to your Lord",
        reference: "Qur'an 3:43"
      },
      {
        arabic: "وَهُزِّي إِلَيْكِ بِجِذْعِ النَّخْلَةِ",
        english: "And shake toward you the trunk of the palm tree",
        reference: "Qur'an 19:25"
      }
    ],
    forms: [
      { arabic: "رَبِّكِ", transliteration: "rabbiki", meaning: "your Lord (f.)" },
      { arabic: "إِلَيْكِ", transliteration: "ilayki", meaning: "to you (f.)" }
    ],
    notes: "Second person feminine singular"
  },
  {
    id: 605,
    arabic: "ـكُمْ",
    transliteration: "-kum",
    english: "you all, your (plural)",
    category: "pronoun-attached",
    occurrences: 1892,
    examples: [
      {
        arabic: "رَبُّكُمْ أَعْلَمُ بِمَا فِي نُفُوسِكُمْ",
        english: "Your Lord is most knowing of what is within yourselves",
        reference: "Qur'an 17:25"
      },
      {
        arabic: "وَمَا خَلَقْتُكُمْ عَبَثًا",
        english: "And We did not create you in vain",
        reference: "Qur'an 23:115"
      }
    ],
    forms: [
      { arabic: "رَبُّكُمْ", transliteration: "rabbukum", meaning: "your Lord" },
      { arabic: "أَنفُسُكُمْ", transliteration: "anfusakum", meaning: "yourselves" },
      { arabic: "عَلَيْكُمْ", transliteration: "ʿalaykum", meaning: "upon you" }
    ],
    notes: "Second person masculine plural - very common"
  },
  {
    id: 606,
    arabic: "ـهُ / ـهِ",
    transliteration: "-hu / -hi",
    english: "him, his, it, its",
    category: "pronoun-attached",
    occurrences: 4125,
    examples: [
      {
        arabic: "لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
        english: "To Him belongs whatever is in the heavens and whatever is on the earth",
        reference: "Qur'an 2:255"
      },
      {
        arabic: "بِسْمِهِ الرَّحْمَٰنِ الرَّحِيمِ",
        english: "In His name, the Most Gracious, the Most Merciful",
        reference: "Qur'an 27:30"
      }
    ],
    forms: [
      { arabic: "لَهُ", transliteration: "lahu", meaning: "for him/to him" },
      { arabic: "بِهِ", transliteration: "bihi", meaning: "with him/by it" },
      { arabic: "رَبُّهُ", transliteration: "rabbuhu", meaning: "his Lord" }
    ],
    notes: "Third person masculine singular - most common attached pronoun"
  },
  {
    id: 607,
    arabic: "ـهَا",
    transliteration: "-hā",
    english: "her, hers, it, its (feminine)",
    category: "pronoun-attached",
    occurrences: 1456,
    examples: [
      {
        arabic: "وَالشَّمْسِ وَضُحَاهَا",
        english: "By the sun and its brightness",
        reference: "Qur'an 91:1"
      },
      {
        arabic: "خَلَقَهَا وَالْأَرْضَ",
        english: "He created it and the earth",
        reference: "Qur'an 79:30"
      }
    ],
    forms: [
      { arabic: "فِيهَا", transliteration: "fīhā", meaning: "in it (f.)" },
      { arabic: "عَلَيْهَا", transliteration: "ʿalayhā", meaning: "upon it/her" },
      { arabic: "لَهَا", transliteration: "lahā", meaning: "for her/it" }
    ],
    notes: "Third person feminine singular"
  },
  {
    id: 608,
    arabic: "ـهُمْ",
    transliteration: "-hum",
    english: "them, their (masculine plural)",
    category: "pronoun-attached",
    occurrences: 2890,
    examples: [
      {
        arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ",
        english: "The path of those upon whom You have bestowed favor",
        reference: "Qur'an 1:7"
      },
      {
        arabic: "وَلَهُمْ عَذَابٌ عَظِيمٌ",
        english: "And for them is a great punishment",
        reference: "Qur'an 2:7"
      }
    ],
    forms: [
      { arabic: "لَهُمْ", transliteration: "lahum", meaning: "for them" },
      { arabic: "رَبُّهُمْ", transliteration: "rabbuhum", meaning: "their Lord" },
      { arabic: "عَلَيْهِمْ", transliteration: "ʿalayhim", meaning: "upon them" }
    ],
    notes: "Third person masculine plural - very frequent"
  },
  {
    id: 609,
    arabic: "ـهُنَّ",
    transliteration: "-hunna",
    english: "them, their (feminine plural)",
    category: "pronoun-attached",
    occurrences: 64,
    examples: [
      {
        arabic: "وَلَهُنَّ مِثْلُ الَّذِي عَلَيْهِنَّ بِالْمَعْرُوفِ",
        english: "And due to them is similar to what is expected of them, according to what is reasonable",
        reference: "Qur'an 2:228"
      }
    ],
    forms: [
      { arabic: "لَهُنَّ", transliteration: "lahunna", meaning: "for them (f.)" },
      { arabic: "عَلَيْهِنَّ", transliteration: "ʿalayhinna", meaning: "upon them (f.)" }
    ],
    notes: "Third person feminine plural"
  }
];

// =============================================
// MODULE 7: المثنى - The Dual Form
// =============================================

const dualForms: GrammarWord[] = [
  {
    id: 701,
    arabic: "ـانِ / ـيْنِ",
    transliteration: "-āni / -ayni",
    english: "dual suffix (two of something)",
    category: "dual",
    occurrences: 350,
    examples: [
      {
        arabic: "خَلَقَ الزَّوْجَيْنِ الذَّكَرَ وَالْأُنثَىٰ",
        english: "And that He creates the two mates - the male and female",
        reference: "Qur'an 53:45"
      }
    ],
    forms: [
      { arabic: "رَجُلٌ → رَجُلَانِ", transliteration: "rajul → rajulāni", meaning: "man → two men (nominative)" },
      { arabic: "رَجُلٌ → رَجُلَيْنِ", transliteration: "rajul → rajulayni", meaning: "man → two men (accusative/genitive)" }
    ],
    notes: "ـانِ in nominative case, ـيْنِ in accusative and genitive cases"
  },
  {
    id: 702,
    arabic: "وَلَدَانِ / وَلَدَيْنِ",
    transliteration: "waladāni / waladayni",
    english: "two children",
    category: "dual",
    occurrences: 8,
    examples: [
      {
        arabic: "وَكَانَ تَحْتَهُ كَنزٌ لَّهُمَا",
        english: "And there was beneath it a treasure for them",
        reference: "Qur'an 18:82"
      }
    ],
    forms: [
      { arabic: "وَلَدٌ", transliteration: "walad", meaning: "child (singular)" },
      { arabic: "وَلَدَانِ", transliteration: "waladāni", meaning: "two children (nominative)" },
      { arabic: "وَلَدَيْنِ", transliteration: "waladayni", meaning: "two children (accusative/genitive)" }
    ],
    notes: "Example showing singular to dual transformation"
  },
  {
    id: 703,
    arabic: "يَدَانِ / يَدَيْنِ",
    transliteration: "yadāni / yadayni",
    english: "two hands",
    category: "dual",
    occurrences: 12,
    examples: [
      {
        arabic: "بَلْ يَدَاهُ مَبْسُوطَتَانِ",
        english: "Rather, both His hands are extended",
        reference: "Qur'an 5:64"
      },
      {
        arabic: "قَالَ يَا إِبْلِيسُ مَا مَنَعَكَ أَن تَسْجُدَ لِمَا خَلَقْتُ بِيَدَيَّ",
        english: "Allah said: O Iblees, what prevented you from prostrating to that which I created with My hands?",
        reference: "Qur'an 38:75"
      }
    ],
    forms: [
      { arabic: "يَدٌ", transliteration: "yad", meaning: "hand (singular)" },
      { arabic: "يَدَانِ", transliteration: "yadāni", meaning: "two hands (nominative)" },
      { arabic: "يَدَيَّ", transliteration: "yadayya", meaning: "my two hands" }
    ],
    notes: "Body parts often appear in dual form"
  },
  {
    id: 704,
    arabic: "عَيْنَانِ / عَيْنَيْنِ",
    transliteration: "ʿaynāni / ʿaynayni",
    english: "two eyes",
    category: "dual",
    occurrences: 6,
    examples: [
      {
        arabic: "أَلَمْ نَجْعَل لَّهُ عَيْنَيْنِ",
        english: "Have We not made for him two eyes?",
        reference: "Qur'an 90:8"
      },
      {
        arabic: "فِيهِمَا عَيْنَانِ تَجْرِيَانِ",
        english: "In both of them are two springs, flowing",
        reference: "Qur'an 55:50"
      }
    ],
    forms: [
      { arabic: "عَيْنٌ", transliteration: "ʿayn", meaning: "eye (singular)" },
      { arabic: "عَيْنَانِ", transliteration: "ʿaynāni", meaning: "two eyes (nominative)" },
      { arabic: "عَيْنَيْنِ", transliteration: "ʿaynayni", meaning: "two eyes (accusative/genitive)" }
    ],
    notes: "Paired body parts naturally use dual"
  },
  {
    id: 705,
    arabic: "جَنَّتَانِ / جَنَّتَيْنِ",
    transliteration: "jannatāni / jannatayni",
    english: "two gardens",
    category: "dual",
    occurrences: 8,
    examples: [
      {
        arabic: "وَلِمَنْ خَافَ مَقَامَ رَبِّهِ جَنَّتَانِ",
        english: "And for he who fears the position of his Lord are two gardens",
        reference: "Qur'an 55:46"
      }
    ],
    forms: [
      { arabic: "جَنَّةٌ", transliteration: "janna", meaning: "garden (singular)" },
      { arabic: "جَنَّتَانِ", transliteration: "jannatāni", meaning: "two gardens (nominative)" },
      { arabic: "جَنَّتَيْنِ", transliteration: "jannatayni", meaning: "two gardens (accusative/genitive)" }
    ],
    notes: "Feminine noun with dual suffix"
  },
  {
    id: 706,
    arabic: "بَحْرَانِ / بَحْرَيْنِ",
    transliteration: "baḥrāni / baḥrayni",
    english: "two seas",
    category: "dual",
    occurrences: 5,
    examples: [
      {
        arabic: "مَرَجَ الْبَحْرَيْنِ يَلْتَقِيَانِ",
        english: "He released the two seas, meeting side by side",
        reference: "Qur'an 55:19"
      },
      {
        arabic: "وَمَا يَسْتَوِي الْبَحْرَانِ",
        english: "And not alike are the two seas",
        reference: "Qur'an 35:12"
      }
    ],
    forms: [
      { arabic: "بَحْرٌ", transliteration: "baḥr", meaning: "sea (singular)" },
      { arabic: "الْبَحْرَانِ", transliteration: "al-baḥrāni", meaning: "the two seas (nominative)" },
      { arabic: "الْبَحْرَيْنِ", transliteration: "al-baḥrayni", meaning: "the two seas (accusative/genitive)" }
    ],
    notes: "Famous verse about the two seas that don't mix"
  }
];

// =============================================
// MODULE 8: جمع المذكر السالم - Sound Masculine Plural
// =============================================

const soundMasculinePlural: GrammarWord[] = [
  {
    id: 801,
    arabic: "ـونَ / ـينَ",
    transliteration: "-ūna / -īna",
    english: "masculine plural suffix",
    category: "plural-masculine",
    occurrences: 4500,
    examples: [
      {
        arabic: "الْمُؤْمِنُونَ",
        english: "the believers",
        reference: "Qur'an 23:1"
      }
    ],
    forms: [
      { arabic: "مُسْلِمٌ → مُسْلِمُونَ", transliteration: "muslim → muslimūna", meaning: "Muslim → Muslims (nominative)" },
      { arabic: "مُسْلِمٌ → مُسْلِمِينَ", transliteration: "muslim → muslimīna", meaning: "Muslim → Muslims (accusative/genitive)" }
    ],
    notes: "ـونَ in nominative case, ـينَ in accusative and genitive cases"
  },
  {
    id: 802,
    arabic: "الْمُؤْمِنُونَ",
    transliteration: "al-muʾminūna",
    english: "the believers",
    category: "plural-masculine",
    occurrences: 179,
    examples: [
      {
        arabic: "قَدْ أَفْلَحَ الْمُؤْمِنُونَ",
        english: "Certainly the believers have succeeded",
        reference: "Qur'an 23:1"
      },
      {
        arabic: "إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ",
        english: "The believers are but brothers",
        reference: "Qur'an 49:10"
      }
    ],
    forms: [
      { arabic: "مُؤْمِنٌ", transliteration: "muʾmin", meaning: "believer (singular)" },
      { arabic: "الْمُؤْمِنُونَ", transliteration: "al-muʾminūna", meaning: "the believers (nominative)" },
      { arabic: "الْمُؤْمِنِينَ", transliteration: "al-muʾminīna", meaning: "the believers (accusative/genitive)" }
    ],
    notes: "One of the most frequent plural forms in the Qur'an"
  },
  {
    id: 803,
    arabic: "الْمُسْلِمُونَ",
    transliteration: "al-muslimūna",
    english: "the Muslims, those who submit",
    category: "plural-masculine",
    occurrences: 42,
    examples: [
      {
        arabic: "وَأَنَا أَوَّلُ الْمُسْلِمِينَ",
        english: "And I am the first of the Muslims",
        reference: "Qur'an 6:163"
      },
      {
        arabic: "هُوَ سَمَّاكُمُ الْمُسْلِمِينَ",
        english: "He named you Muslims",
        reference: "Qur'an 22:78"
      }
    ],
    forms: [
      { arabic: "مُسْلِمٌ", transliteration: "muslim", meaning: "Muslim (singular)" },
      { arabic: "الْمُسْلِمُونَ", transliteration: "al-muslimūna", meaning: "the Muslims (nominative)" },
      { arabic: "الْمُسْلِمِينَ", transliteration: "al-muslimīna", meaning: "the Muslims (accusative/genitive)" }
    ],
    notes: "Comes from the root س-ل-م (peace, submission)"
  },
  {
    id: 804,
    arabic: "الصَّالِحُونَ",
    transliteration: "aṣ-ṣāliḥūna",
    english: "the righteous ones",
    category: "plural-masculine",
    occurrences: 45,
    examples: [
      {
        arabic: "وَأُولَٰئِكَ مِنَ الصَّالِحِينَ",
        english: "And those will be among the righteous",
        reference: "Qur'an 3:114"
      },
      {
        arabic: "وَأَدْخِلْنَا فِي رَحْمَتِكَ مَعَ عِبَادِكَ الصَّالِحِينَ",
        english: "And admit us into Your mercy with Your righteous servants",
        reference: "Qur'an 27:19"
      }
    ],
    forms: [
      { arabic: "صَالِحٌ", transliteration: "ṣāliḥ", meaning: "righteous one (singular)" },
      { arabic: "الصَّالِحُونَ", transliteration: "aṣ-ṣāliḥūna", meaning: "the righteous (nominative)" },
      { arabic: "الصَّالِحِينَ", transliteration: "aṣ-ṣāliḥīna", meaning: "the righteous (accusative/genitive)" }
    ],
    notes: "Important quality mentioned throughout the Qur'an"
  },
  {
    id: 805,
    arabic: "الْعَالِمُونَ",
    transliteration: "al-ʿālimūna",
    english: "the knowledgeable, the scholars",
    category: "plural-masculine",
    occurrences: 28,
    examples: [
      {
        arabic: "وَمَا يَعْقِلُهَا إِلَّا الْعَالِمُونَ",
        english: "And none will understand them except those of knowledge",
        reference: "Qur'an 29:43"
      },
      {
        arabic: "إِنَّمَا يَخْشَى اللَّهَ مِنْ عِبَادِهِ الْعُلَمَاءُ",
        english: "Only those fear Allah, from among His servants, who have knowledge",
        reference: "Qur'an 35:28"
      }
    ],
    forms: [
      { arabic: "عَالِمٌ", transliteration: "ʿālim", meaning: "scholar (singular)" },
      { arabic: "الْعَالِمُونَ", transliteration: "al-ʿālimūna", meaning: "the scholars (nominative)" },
      { arabic: "الْعُلَمَاءُ", transliteration: "al-ʿulamāʾ", meaning: "the scholars (broken plural)" }
    ],
    notes: "Can also form broken plural عُلَمَاء"
  },
  {
    id: 806,
    arabic: "الظَّالِمُونَ",
    transliteration: "aẓ-ẓālimūna",
    english: "the wrongdoers, the unjust",
    category: "plural-masculine",
    occurrences: 115,
    examples: [
      {
        arabic: "وَاللَّهُ لَا يَهْدِي الْقَوْمَ الظَّالِمِينَ",
        english: "And Allah does not guide the wrongdoing people",
        reference: "Qur'an 2:258"
      },
      {
        arabic: "إِنَّهُ لَا يُفْلِحُ الظَّالِمُونَ",
        english: "Indeed, the wrongdoers will not succeed",
        reference: "Qur'an 6:21"
      }
    ],
    forms: [
      { arabic: "ظَالِمٌ", transliteration: "ẓālim", meaning: "wrongdoer (singular)" },
      { arabic: "الظَّالِمُونَ", transliteration: "aẓ-ẓālimūna", meaning: "the wrongdoers (nominative)" },
      { arabic: "الظَّالِمِينَ", transliteration: "aẓ-ẓālimīna", meaning: "the wrongdoers (accusative/genitive)" }
    ],
    notes: "Opposite of الصالحون - an important contrast in Qur'an"
  }
];

// =============================================
// MODULE 9: جمع المؤنث السالم - Sound Feminine Plural
// =============================================

const soundFemininePlural: GrammarWord[] = [
  {
    id: 901,
    arabic: "ـاتٌ",
    transliteration: "-āt",
    english: "feminine plural suffix",
    category: "plural-feminine",
    occurrences: 3200,
    examples: [
      {
        arabic: "الْمُؤْمِنَاتِ",
        english: "the believing women",
        reference: "Qur'an 33:35"
      }
    ],
    forms: [
      { arabic: "مُؤْمِنَةٌ → مُؤْمِنَاتٌ", transliteration: "muʾmina → muʾmināt", meaning: "believing woman → believing women" },
      { arabic: "صَالِحَةٌ → صَالِحَاتٌ", transliteration: "ṣāliḥa → ṣāliḥāt", meaning: "righteous woman → righteous women" }
    ],
    notes: "Replaces ـة with ـات for feminine words"
  },
  {
    id: 902,
    arabic: "الْمُؤْمِنَاتُ",
    transliteration: "al-muʾminātu",
    english: "the believing women",
    category: "plural-feminine",
    occurrences: 16,
    examples: [
      {
        arabic: "إِنَّ الْمُسْلِمِينَ وَالْمُسْلِمَاتِ وَالْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ",
        english: "Indeed, the Muslim men and Muslim women, the believing men and believing women",
        reference: "Qur'an 33:35"
      },
      {
        arabic: "وَالْمُؤْمِنَاتِ",
        english: "and the believing women",
        reference: "Qur'an 33:73"
      }
    ],
    forms: [
      { arabic: "مُؤْمِنَةٌ", transliteration: "muʾmina", meaning: "believing woman (singular)" },
      { arabic: "الْمُؤْمِنَاتُ", transliteration: "al-muʾminātu", meaning: "the believing women (nominative)" },
      { arabic: "الْمُؤْمِنَاتِ", transliteration: "al-muʾmināti", meaning: "the believing women (genitive)" }
    ],
    notes: "Feminine counterpart to المؤمنون"
  },
  {
    id: 903,
    arabic: "الصَّالِحَاتُ",
    transliteration: "aṣ-ṣāliḥātu",
    english: "righteous deeds / righteous women",
    category: "plural-feminine",
    occurrences: 62,
    examples: [
      {
        arabic: "الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ",
        english: "Those who believe and do righteous deeds",
        reference: "Qur'an 2:25"
      },
      {
        arabic: "وَبَشِّرِ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ",
        english: "And give good tidings to those who believe and do righteous deeds",
        reference: "Qur'an 2:25"
      }
    ],
    forms: [
      { arabic: "صَالِحَةٌ", transliteration: "ṣāliḥa", meaning: "righteous deed/woman (singular)" },
      { arabic: "الصَّالِحَاتُ", transliteration: "aṣ-ṣāliḥātu", meaning: "righteous deeds (nominative)" },
      { arabic: "الصَّالِحَاتِ", transliteration: "aṣ-ṣāliḥāti", meaning: "righteous deeds (genitive)" }
    ],
    notes: "Often paired with آمَنُوا - 'believed and did righteous deeds'"
  },
  {
    id: 904,
    arabic: "السَّمَاوَاتُ",
    transliteration: "as-samāwātu",
    english: "the heavens",
    category: "plural-feminine",
    occurrences: 190,
    examples: [
      {
        arabic: "خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ",
        english: "He created the heavens and the earth",
        reference: "Qur'an 6:1"
      },
      {
        arabic: "لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ",
        english: "To Him belongs whatever is in the heavens and whatever is on the earth",
        reference: "Qur'an 2:255"
      }
    ],
    forms: [
      { arabic: "سَمَاءٌ", transliteration: "samāʾ", meaning: "sky/heaven (singular)" },
      { arabic: "السَّمَاوَاتُ", transliteration: "as-samāwātu", meaning: "the heavens (nominative)" },
      { arabic: "السَّمَاوَاتِ", transliteration: "as-samāwāti", meaning: "the heavens (genitive)" }
    ],
    notes: "One of the most frequent words in Qur'an"
  },
  {
    id: 905,
    arabic: "الْآيَاتُ",
    transliteration: "al-āyātu",
    english: "the signs, the verses",
    category: "plural-feminine",
    occurrences: 382,
    examples: [
      {
        arabic: "تِلْكَ آيَاتُ اللَّهِ نَتْلُوهَا عَلَيْكَ بِالْحَقِّ",
        english: "These are the verses of Allah. We recite them to you in truth",
        reference: "Qur'an 2:252"
      },
      {
        arabic: "وَمَا تُغْنِي الْآيَاتُ وَالنُّذُرُ عَن قَوْمٍ لَّا يُؤْمِنُونَ",
        english: "But of what avail will be signs and warnings to a people who do not believe?",
        reference: "Qur'an 10:101"
      }
    ],
    forms: [
      { arabic: "آيَةٌ", transliteration: "āya", meaning: "sign/verse (singular)" },
      { arabic: "الْآيَاتُ", transliteration: "al-āyātu", meaning: "the signs (nominative)" },
      { arabic: "الْآيَاتِ", transliteration: "al-āyāti", meaning: "the signs (genitive)" }
    ],
    notes: "Means both Qur'anic verses and signs in creation"
  },
  {
    id: 906,
    arabic: "الْحَسَنَاتُ",
    transliteration: "al-ḥasanātu",
    english: "the good deeds",
    category: "plural-feminine",
    occurrences: 28,
    examples: [
      {
        arabic: "إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ",
        english: "Indeed, good deeds remove bad deeds",
        reference: "Qur'an 11:114"
      },
      {
        arabic: "فَأُولَٰئِكَ يُبَدِّلُ اللَّهُ سَيِّئَاتِهِمْ حَسَنَاتٍ",
        english: "Those - Allah will replace their evil deeds with good",
        reference: "Qur'an 25:70"
      }
    ],
    forms: [
      { arabic: "حَسَنَةٌ", transliteration: "ḥasana", meaning: "good deed (singular)" },
      { arabic: "الْحَسَنَاتُ", transliteration: "al-ḥasanātu", meaning: "good deeds (nominative)" },
      { arabic: "حَسَنَاتٍ", transliteration: "ḥasanātin", meaning: "good deeds (indefinite genitive)" }
    ],
    notes: "Opposite of السيئات (bad deeds)"
  }
];

// =============================================
// MODULE 10: جمع التكسير - Broken Plural
// =============================================

const brokenPlural: GrammarWord[] = [
  {
    id: 1001,
    arabic: "رِجَالٌ ← رَجُلٌ",
    transliteration: "rajul → rijāl",
    english: "man → men",
    category: "plural-broken",
    occurrences: 55,
    examples: [
      {
        arabic: "رِجَالٌ لَّا تُلْهِيهِمْ تِجَارَةٌ وَلَا بَيْعٌ عَن ذِكْرِ اللَّهِ",
        english: "Men whom neither commerce nor sale distracts from the remembrance of Allah",
        reference: "Qur'an 24:37"
      },
      {
        arabic: "مِّنَ الْمُؤْمِنِينَ رِجَالٌ صَدَقُوا مَا عَاهَدُوا اللَّهَ عَلَيْهِ",
        english: "Among the believers are men true to what they promised Allah",
        reference: "Qur'an 33:23"
      }
    ],
    forms: [
      { arabic: "رَجُلٌ", transliteration: "rajul", meaning: "man (singular)" },
      { arabic: "رِجَالٌ", transliteration: "rijāl", meaning: "men (broken plural)" }
    ],
    notes: "The word structure changes internally - not just a suffix"
  },
  {
    id: 1002,
    arabic: "كُتُبٌ ← كِتَابٌ",
    transliteration: "kitāb → kutub",
    english: "book → books",
    category: "plural-broken",
    occurrences: 260,
    examples: [
      {
        arabic: "وَأَنزَلَ مَعَهُمُ الْكِتَابَ بِالْحَقِّ",
        english: "And He sent down with them the Scripture in truth",
        reference: "Qur'an 2:213"
      },
      {
        arabic: "يُؤْمِنُونَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَالْكُتُبِ",
        english: "They believe in Allah and the Last Day and the Books",
        reference: "Qur'an 3:114"
      }
    ],
    forms: [
      { arabic: "كِتَابٌ", transliteration: "kitāb", meaning: "book (singular)" },
      { arabic: "كُتُبٌ", transliteration: "kutub", meaning: "books (broken plural)" }
    ],
    notes: "Pattern changes from فِعَال to فُعُل"
  },
  {
    id: 1003,
    arabic: "قُلُوبٌ ← قَلْبٌ",
    transliteration: "qalb → qulūb",
    english: "heart → hearts",
    category: "plural-broken",
    occurrences: 132,
    examples: [
      {
        arabic: "أَفَلَمْ يَسِيرُوا فِي الْأَرْضِ فَتَكُونَ لَهُمْ قُلُوبٌ يَعْقِلُونَ بِهَا",
        english: "Have they not traveled through the land and have hearts by which to reason?",
        reference: "Qur'an 22:46"
      },
      {
        arabic: "يَوْمَ لَا يَنفَعُ مَالٌ وَلَا بَنُونَ إِلَّا مَنْ أَتَى اللَّهَ بِقَلْبٍ سَلِيمٍ",
        english: "The Day when there will not benefit wealth or children, except one who comes to Allah with a sound heart",
        reference: "Qur'an 26:88-89"
      }
    ],
    forms: [
      { arabic: "قَلْبٌ", transliteration: "qalb", meaning: "heart (singular)" },
      { arabic: "قُلُوبٌ", transliteration: "qulūb", meaning: "hearts (broken plural)" }
    ],
    notes: "Pattern changes from فَعْل to فُعُول"
  },
  {
    id: 1004,
    arabic: "أَنْفُسٌ ← نَفْسٌ",
    transliteration: "nafs → anfus",
    english: "soul → souls",
    category: "plural-broken",
    occurrences: 295,
    examples: [
      {
        arabic: "كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ",
        english: "Every soul will taste death",
        reference: "Qur'an 3:185"
      },
      {
        arabic: "يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ",
        english: "O soul at peace",
        reference: "Qur'an 89:27"
      }
    ],
    forms: [
      { arabic: "نَفْسٌ", transliteration: "nafs", meaning: "soul (singular)" },
      { arabic: "أَنْفُسٌ", transliteration: "anfus", meaning: "souls (broken plural)" }
    ],
    notes: "Pattern changes from فَعْل to أَفْعُل"
  },
  {
    id: 1005,
    arabic: "أَنْبِيَاءٌ ← نَبِيٌّ",
    transliteration: "nabiyy → anbiyāʾ",
    english: "prophet → prophets",
    category: "plural-broken",
    occurrences: 75,
    examples: [
      {
        arabic: "وَإِذْ أَخَذْنَا مِنَ النَّبِيِّينَ مِيثَاقَهُمْ",
        english: "And when We took from the prophets their covenant",
        reference: "Qur'an 33:7"
      },
      {
        arabic: "وَلَقَدْ آتَيْنَا مُوسَى الْكِتَابَ وَقَفَّيْنَا مِن بَعْدِهِ بِالرُّسُلِ",
        english: "And We gave Moses the Scripture and followed up after him with messengers",
        reference: "Qur'an 2:87"
      }
    ],
    forms: [
      { arabic: "نَبِيٌّ", transliteration: "nabiyy", meaning: "prophet (singular)" },
      { arabic: "أَنْبِيَاءٌ", transliteration: "anbiyāʾ", meaning: "prophets (broken plural)" },
      { arabic: "النَّبِيِّينَ", transliteration: "an-nabiyyīna", meaning: "the prophets (sound plural)" }
    ],
    notes: "Has both broken and sound plural forms"
  },
  {
    id: 1006,
    arabic: "رُسُلٌ ← رَسُولٌ",
    transliteration: "rasūl → rusul",
    english: "messenger → messengers",
    category: "plural-broken",
    occurrences: 332,
    examples: [
      {
        arabic: "آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ",
        english: "The Messenger has believed in what was revealed to him from his Lord",
        reference: "Qur'an 2:285"
      },
      {
        arabic: "تِلْكَ الرُّسُلُ فَضَّلْنَا بَعْضَهُمْ عَلَىٰ بَعْضٍ",
        english: "Those messengers - some of them We caused to exceed others",
        reference: "Qur'an 2:253"
      }
    ],
    forms: [
      { arabic: "رَسُولٌ", transliteration: "rasūl", meaning: "messenger (singular)" },
      { arabic: "رُسُلٌ", transliteration: "rusul", meaning: "messengers (broken plural)" }
    ],
    notes: "Pattern changes from فَعُول to فُعُل"
  },
  {
    id: 1007,
    arabic: "مَلَائِكَةٌ ← مَلَكٌ",
    transliteration: "malak → malāʾika",
    english: "angel → angels",
    category: "plural-broken",
    occurrences: 88,
    examples: [
      {
        arabic: "وَالْمَلَائِكَةُ يَدْخُلُونَ عَلَيْهِم مِّن كُلِّ بَابٍ",
        english: "And the angels will enter upon them from every gate",
        reference: "Qur'an 13:23"
      },
      {
        arabic: "الْحَمْدُ لِلَّهِ فَاطِرِ السَّمَاوَاتِ وَالْأَرْضِ جَاعِلِ الْمَلَائِكَةِ رُسُلًا",
        english: "Praise to Allah, Creator of the heavens and the earth, who made the angels messengers",
        reference: "Qur'an 35:1"
      }
    ],
    forms: [
      { arabic: "مَلَكٌ", transliteration: "malak", meaning: "angel (singular)" },
      { arabic: "مَلَائِكَةٌ", transliteration: "malāʾika", meaning: "angels (broken plural)" }
    ],
    notes: "Unique broken plural pattern"
  }
];

// =============================================
// MODULE 11: الاسم - Nouns (Categories)
// =============================================

const nounCategories: GrammarWord[] = [
  {
    id: 1101,
    arabic: "اِسْمٌ",
    transliteration: "ism",
    english: "noun, name",
    category: "noun-basic",
    examples: [
      {
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        english: "In the name of Allah, the Most Gracious, the Most Merciful",
        reference: "Qur'an 1:1"
      },
      {
        arabic: "وَعَلَّمَ آدَمَ الْأَسْمَاءَ كُلَّهَا",
        english: "And He taught Adam the names - all of them",
        reference: "Qur'an 2:31"
      }
    ],
    forms: [
      { arabic: "أَسْمَاءٌ", transliteration: "asmāʾ", meaning: "names (plural)" }
    ],
    notes: "A noun refers to a person, place, thing, or concept - no tense involved"
  },
  {
    id: 1102,
    arabic: "إِنْسَانٌ",
    transliteration: "insān",
    english: "human being, mankind",
    category: "noun-being",
    occurrences: 65,
    examples: [
      {
        arabic: "وَخُلِقَ الْإِنسَانُ ضَعِيفًا",
        english: "And mankind was created weak",
        reference: "Qur'an 4:28"
      },
      {
        arabic: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
        english: "Indeed, mankind is in loss",
        reference: "Qur'an 103:2"
      }
    ],
    forms: [
      { arabic: "نَاسٌ", transliteration: "nās", meaning: "people" },
      { arabic: "إِنْسٌ", transliteration: "ins", meaning: "mankind" }
    ],
    notes: "From root أ-ن-س meaning intimacy, companionship"
  },
  {
    id: 1103,
    arabic: "جِنٌّ",
    transliteration: "jinn",
    english: "jinn, unseen beings",
    category: "noun-being",
    occurrences: 32,
    examples: [
      {
        arabic: "وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ",
        english: "And I did not create the jinn and mankind except to worship Me",
        reference: "Qur'an 51:56"
      },
      {
        arabic: "قُلْ أُوحِيَ إِلَيَّ أَنَّهُ اسْتَمَعَ نَفَرٌ مِّنَ الْجِنِّ",
        english: "Say: It has been revealed to me that a group of the jinn listened",
        reference: "Qur'an 72:1"
      }
    ],
    notes: "From root ج-ن-ن meaning to conceal, cover"
  },
  {
    id: 1104,
    arabic: "جَنَّةٌ",
    transliteration: "janna",
    english: "garden, paradise",
    category: "noun-place",
    occurrences: 147,
    examples: [
      {
        arabic: "وَبَشِّرِ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ أَنَّ لَهُمْ جَنَّاتٍ",
        english: "And give good tidings to those who believe and do righteous deeds that they will have gardens",
        reference: "Qur'an 2:25"
      },
      {
        arabic: "أُولَٰئِكَ أَصْحَابُ الْجَنَّةِ هُمْ فِيهَا خَالِدُونَ",
        english: "Those are the companions of Paradise; they will abide therein eternally",
        reference: "Qur'an 2:82"
      }
    ],
    forms: [
      { arabic: "جَنَّاتٌ", transliteration: "jannāt", meaning: "gardens (plural)" }
    ],
    notes: "From the same root as جِنّ - a covered, lush place"
  },
  {
    id: 1105,
    arabic: "نَارٌ",
    transliteration: "nār",
    english: "fire, hellfire",
    category: "noun-place",
    occurrences: 145,
    examples: [
      {
        arabic: "وَاتَّقُوا النَّارَ الَّتِي أُعِدَّتْ لِلْكَافِرِينَ",
        english: "And fear the Fire, which has been prepared for the disbelievers",
        reference: "Qur'an 3:131"
      },
      {
        arabic: "نَارُ اللَّهِ الْمُوقَدَةُ",
        english: "It is the fire of Allah, kindled",
        reference: "Qur'an 104:6"
      }
    ],
    notes: "Opposite of جَنَّة in afterlife context"
  },
  {
    id: 1106,
    arabic: "دُنْيَا",
    transliteration: "dunyā",
    english: "worldly life, this world",
    category: "noun-abstract",
    occurrences: 115,
    examples: [
      {
        arabic: "وَمَا الْحَيَاةُ الدُّنْيَا إِلَّا لَعِبٌ وَلَهْوٌ",
        english: "And the worldly life is nothing but play and amusement",
        reference: "Qur'an 6:32"
      },
      {
        arabic: "وَابْتَغِ فِيمَا آتَاكَ اللَّهُ الدَّارَ الْآخِرَةَ وَلَا تَنسَ نَصِيبَكَ مِنَ الدُّنْيَا",
        english: "Seek the home of the Hereafter through what Allah has given you, but do not forget your share of the world",
        reference: "Qur'an 28:77"
      }
    ],
    notes: "From دَنَا meaning 'to be near' - the nearer/lower life"
  },
  {
    id: 1107,
    arabic: "آخِرَةٌ",
    transliteration: "ākhira",
    english: "the hereafter, the next life",
    category: "noun-abstract",
    occurrences: 115,
    examples: [
      {
        arabic: "وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ",
        english: "And the Hereafter is better for you than the first life",
        reference: "Qur'an 93:4"
      },
      {
        arabic: "يُؤْمِنُونَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ",
        english: "They believe in Allah and the Last Day",
        reference: "Qur'an 9:18"
      }
    ],
    notes: "From آخِر meaning 'last' - the final abode"
  }
];

// =============================================
// MODULE 12: الفعل - Verbs (Tenses & Forms)
// =============================================

const verbForms: GrammarWord[] = [
  {
    id: 1201,
    arabic: "فِعْلٌ",
    transliteration: "fiʿl",
    english: "verb, action",
    category: "verb-basic",
    examples: [
      {
        arabic: "فَعَلَ - يَفْعَلُ - اِفْعَلْ",
        english: "he did - he does - do!",
        reference: "verb conjugation pattern"
      }
    ],
    notes: "Verbs express actions or states with tense (past, present, command)"
  },
  {
    id: 1202,
    arabic: "فَعَلَ",
    transliteration: "faʿala",
    english: "he did (past tense pattern)",
    category: "verb-past",
    examples: [
      {
        arabic: "خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ",
        english: "He created the heavens and the earth",
        reference: "Qur'an 6:1"
      },
      {
        arabic: "قَالَ رَبِّ اغْفِرْ لِي",
        english: "He said: My Lord, forgive me",
        reference: "Qur'an 38:35"
      }
    ],
    forms: [
      { arabic: "فَعَلَ", transliteration: "faʿala", meaning: "he did" },
      { arabic: "فَعَلَتْ", transliteration: "faʿalat", meaning: "she did" },
      { arabic: "فَعَلُوا", transliteration: "faʿalū", meaning: "they did" },
      { arabic: "فَعَلْتَ", transliteration: "faʿalta", meaning: "you (m.) did" },
      { arabic: "فَعَلْتُ", transliteration: "faʿaltu", meaning: "I did" }
    ],
    notes: "الفعل الماضي - Past tense, completed action"
  },
  {
    id: 1203,
    arabic: "يَفْعَلُ",
    transliteration: "yafʿalu",
    english: "he does / is doing (present tense pattern)",
    category: "verb-present",
    examples: [
      {
        arabic: "يَعْلَمُ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ",
        english: "He knows what is in the heavens and earth",
        reference: "Qur'an 64:4"
      },
      {
        arabic: "اللَّهُ يَعْلَمُ وَأَنتُمْ لَا تَعْلَمُونَ",
        english: "Allah knows and you do not know",
        reference: "Qur'an 2:216"
      }
    ],
    forms: [
      { arabic: "يَفْعَلُ", transliteration: "yafʿalu", meaning: "he does" },
      { arabic: "تَفْعَلُ", transliteration: "tafʿalu", meaning: "she/you do" },
      { arabic: "يَفْعَلُونَ", transliteration: "yafʿalūna", meaning: "they do" },
      { arabic: "نَفْعَلُ", transliteration: "nafʿalu", meaning: "we do" },
      { arabic: "أَفْعَلُ", transliteration: "afʿalu", meaning: "I do" }
    ],
    notes: "الفعل المضارع - Present/future tense, ongoing action"
  },
  {
    id: 1204,
    arabic: "اِفْعَلْ",
    transliteration: "ifʿal",
    english: "do! (command form)",
    category: "verb-command",
    examples: [
      {
        arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        english: "Say: He is Allah, the One",
        reference: "Qur'an 112:1"
      },
      {
        arabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
        english: "Read in the name of your Lord who created",
        reference: "Qur'an 96:1"
      }
    ],
    forms: [
      { arabic: "اِفْعَلْ", transliteration: "ifʿal", meaning: "do! (m. singular)" },
      { arabic: "اِفْعَلِي", transliteration: "ifʿalī", meaning: "do! (f. singular)" },
      { arabic: "اِفْعَلُوا", transliteration: "ifʿalū", meaning: "do! (plural)" }
    ],
    notes: "فعل الأمر - Command/imperative form"
  },
  {
    id: 1205,
    arabic: "آمَنَ - يُؤْمِنُ",
    transliteration: "āmana - yuʾminu",
    english: "to believe",
    category: "verb-common",
    occurrences: 811,
    examples: [
      {
        arabic: "الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ",
        english: "Those who believed and did righteous deeds",
        reference: "Qur'an 2:25"
      },
      {
        arabic: "وَيُؤْمِنُونَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ",
        english: "And they believe in Allah and the Last Day",
        reference: "Qur'an 3:114"
      }
    ],
    forms: [
      { arabic: "آمَنَ", transliteration: "āmana", meaning: "he believed" },
      { arabic: "آمَنُوا", transliteration: "āmanū", meaning: "they believed" },
      { arabic: "يُؤْمِنُ", transliteration: "yuʾminu", meaning: "he believes" },
      { arabic: "يُؤْمِنُونَ", transliteration: "yuʾminūna", meaning: "they believe" },
      { arabic: "آمِنُوا", transliteration: "āminū", meaning: "believe!" }
    ],
    notes: "One of the most important verbs in the Qur'an"
  },
  {
    id: 1206,
    arabic: "عَمِلَ - يَعْمَلُ",
    transliteration: "ʿamila - yaʿmalu",
    english: "to do, to work, to act",
    category: "verb-common",
    occurrences: 360,
    examples: [
      {
        arabic: "وَعَمِلُوا الصَّالِحَاتِ",
        english: "And did righteous deeds",
        reference: "Qur'an 2:25"
      },
      {
        arabic: "فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ",
        english: "So whoever does an atom's weight of good will see it",
        reference: "Qur'an 99:7"
      }
    ],
    forms: [
      { arabic: "عَمِلَ", transliteration: "ʿamila", meaning: "he did/worked" },
      { arabic: "عَمِلُوا", transliteration: "ʿamilū", meaning: "they did/worked" },
      { arabic: "يَعْمَلُ", transliteration: "yaʿmalu", meaning: "he does/works" },
      { arabic: "اعْمَلُوا", transliteration: "iʿmalū", meaning: "work!/do!" }
    ],
    notes: "Often paired with آمَنَ in 'believed and did good deeds'"
  },
  {
    id: 1207,
    arabic: "عَلِمَ - يَعْلَمُ",
    transliteration: "ʿalima - yaʿlamu",
    english: "to know",
    category: "verb-common",
    occurrences: 382,
    examples: [
      {
        arabic: "وَاللَّهُ بِكُلِّ شَيْءٍ عَلِيمٌ",
        english: "And Allah is Knowing of all things",
        reference: "Qur'an 2:282"
      },
      {
        arabic: "وَيَعْلَمُ مَا تُبْدُونَ وَمَا تَكْتُمُونَ",
        english: "And He knows what you reveal and what you conceal",
        reference: "Qur'an 6:3"
      }
    ],
    forms: [
      { arabic: "عَلِمَ", transliteration: "ʿalima", meaning: "he knew" },
      { arabic: "يَعْلَمُ", transliteration: "yaʿlamu", meaning: "he knows" },
      { arabic: "يَعْلَمُونَ", transliteration: "yaʿlamūna", meaning: "they know" },
      { arabic: "اعْلَمْ", transliteration: "iʿlam", meaning: "know!" },
      { arabic: "عِلْمٌ", transliteration: "ʿilm", meaning: "knowledge (noun)" }
    ],
    notes: "Root ع-ل-م relates to knowledge in many forms"
  },
  {
    id: 1208,
    arabic: "قَالَ - يَقُولُ",
    transliteration: "qāla - yaqūlu",
    english: "to say",
    category: "verb-common",
    occurrences: 1618,
    examples: [
      {
        arabic: "وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ",
        english: "And when your Lord said to the angels",
        reference: "Qur'an 2:30"
      },
      {
        arabic: "يَقُولُونَ رَبَّنَا آمَنَّا",
        english: "They say: Our Lord, we have believed",
        reference: "Qur'an 3:53"
      }
    ],
    forms: [
      { arabic: "قَالَ", transliteration: "qāla", meaning: "he said" },
      { arabic: "قَالُوا", transliteration: "qālū", meaning: "they said" },
      { arabic: "قَالَتْ", transliteration: "qālat", meaning: "she said" },
      { arabic: "يَقُولُ", transliteration: "yaqūlu", meaning: "he says" },
      { arabic: "قُلْ", transliteration: "qul", meaning: "say!" }
    ],
    notes: "Most frequent verb in the Qur'an - used 1618 times"
  }
];

// =============================================
// ALL GRAMMAR WORDS COMBINED
// =============================================

export const allGrammarWords: GrammarWord[] = [
  ...detachedPronouns,
  ...demonstrativeNouns,
  ...relativePronouns,
  ...prepositions,
  ...interrogativeParticles,
  ...attachedPronouns,
  ...dualForms,
  ...soundMasculinePlural,
  ...soundFemininePlural,
  ...brokenPlural,
  ...nounCategories,
  ...verbForms
];

// =============================================
// GRAMMAR MODULES DEFINITION
// =============================================

export const grammarModules: GrammarModule[] = [
  {
    id: 101,
    title: "Personal Pronouns",
    titleArabic: "الضمائر المنفصلة",
    description: "Learn the 12 detached pronouns - I, you, he, she, we, they",
    descriptionArabic: "تعلم الضمائر المنفصلة الاثني عشر",
    grammarRule: "Detached pronouns stand alone as independent words. They are used for emphasis or as subjects.",
    wordIds: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],
    coveragePercentage: 4.2
  },
  {
    id: 102,
    title: "Demonstrative Nouns",
    titleArabic: "أسماء الإشارة",
    description: "Point to things near and far - this, that, these, those",
    descriptionArabic: "أسماء تستخدم للإشارة إلى شيء قريب أو بعيد",
    grammarRule: "Demonstratives point to specific things. هذا/هذه for near, ذلك/تلك for far.",
    wordIds: [201, 202, 203, 204, 205, 206, 207, 208],
    coveragePercentage: 8.5,
    prerequisiteModuleId: 101
  },
  {
    id: 103,
    title: "Relative Pronouns",
    titleArabic: "الأسماء الموصولة",
    description: "Connect sentences with 'who', 'which', 'that'",
    descriptionArabic: "ألفاظ تدل على معيّن بواسطة جملة تأتي بعدها",
    grammarRule: "Relative pronouns connect a clause to a noun. الذي for masculine, التي for feminine.",
    wordIds: [301, 302, 303, 304, 305, 306, 307, 308],
    coveragePercentage: 14.2,
    prerequisiteModuleId: 102
  },
  {
    id: 104,
    title: "Prepositions",
    titleArabic: "حروف الجر",
    description: "Master the essential prepositions - from, to, in, on, with",
    descriptionArabic: "حروف تجر الاسم بعدها",
    grammarRule: "Prepositions cause the noun after them to take the genitive case (kasra).",
    wordIds: [401, 402, 403, 404, 405, 406, 407, 408, 409],
    coveragePercentage: 22.8,
    prerequisiteModuleId: 103
  },
  {
    id: 105,
    title: "Question Words",
    titleArabic: "أدوات الاستفهام",
    description: "Ask questions - who, what, when, where, why, how",
    descriptionArabic: "طلب العلم بشيء بأداة مخصوصة",
    grammarRule: "Interrogative particles come at the beginning of questions. هل expects yes/no answers.",
    wordIds: [501, 502, 503, 504, 505, 506, 507, 508, 509],
    coveragePercentage: 26.4,
    prerequisiteModuleId: 104
  },
  {
    id: 106,
    title: "Attached Pronouns",
    titleArabic: "الضمائر المتصلة",
    description: "Pronouns that attach to words - my, your, his, our, their",
    descriptionArabic: "الضمائر التي تتصل بالكلمة",
    grammarRule: "Attached pronouns connect to nouns (possession), verbs (objects), and prepositions.",
    wordIds: [601, 602, 603, 604, 605, 606, 607, 608, 609],
    coveragePercentage: 32.1,
    prerequisiteModuleId: 105
  },
  {
    id: 107,
    title: "The Dual Form",
    titleArabic: "المثنى",
    description: "Express exactly two of something - two hands, two eyes, two seas",
    descriptionArabic: "ما دلّ على اثنين أو اثنتين بزيادة ألف ونون أو ياء ونون",
    grammarRule: "Add ـانِ in nominative case, ـيْنِ in accusative/genitive. Arabic has special forms for 'two'.",
    wordIds: [701, 702, 703, 704, 705, 706],
    coveragePercentage: 35.7,
    prerequisiteModuleId: 106
  },
  {
    id: 108,
    title: "Sound Masculine Plural",
    titleArabic: "جمع المذكر السالم",
    description: "Plurals ending in ـون/ـين for masculine beings",
    descriptionArabic: "ما دلّ على أكثر من اثنين بزيادة واو ونون أو ياء ونون",
    grammarRule: "Add ـونَ (nominative) or ـينَ (accusative/genitive) to the singular form.",
    wordIds: [801, 802, 803, 804, 805, 806],
    coveragePercentage: 41.3,
    prerequisiteModuleId: 107
  },
  {
    id: 109,
    title: "Sound Feminine Plural",
    titleArabic: "جمع المؤنث السالم",
    description: "Plurals ending in ـات for feminine words",
    descriptionArabic: "كل جمع أُضيف إلى مفرده ألف وتاء",
    grammarRule: "Replace the ة with ـاتٌ. This plural is 'sound' because the singular form is preserved.",
    wordIds: [901, 902, 903, 904, 905, 906],
    coveragePercentage: 47.8,
    prerequisiteModuleId: 108
  },
  {
    id: 110,
    title: "Broken Plural",
    titleArabic: "جمع التكسير",
    description: "Plurals that change the word's internal pattern",
    descriptionArabic: "ما دلّ على أكثر من اثنين أو اثنتين بتغيير صورة مفرده",
    grammarRule: "The singular form is 'broken' and rearranged. Patterns must be memorized.",
    wordIds: [1001, 1002, 1003, 1004, 1005, 1006, 1007],
    coveragePercentage: 55.2,
    prerequisiteModuleId: 109
  },
  {
    id: 111,
    title: "Types of Nouns",
    titleArabic: "الاسم",
    description: "Understanding nouns - beings, places, and abstract concepts",
    descriptionArabic: "ما دلّ على مُسمّى إنسان أو حيوان أو نبات أو جماد أو غير ذلك",
    grammarRule: "Nouns name people, places, things, or ideas. They don't carry tense like verbs.",
    wordIds: [1101, 1102, 1103, 1104, 1105, 1106, 1107],
    coveragePercentage: 62.4,
    prerequisiteModuleId: 110
  },
  {
    id: 112,
    title: "Verbs & Tenses",
    titleArabic: "الفعل",
    description: "Past, present, and command forms of verbs",
    descriptionArabic: "ما دلّ على حدثٍ مرتبطٍ بزمنٍ نَحْوِيّ",
    grammarRule: "Verbs express actions with time. Past (فَعَلَ), present (يَفْعَلُ), command (اِفْعَلْ).",
    wordIds: [1201, 1202, 1203, 1204, 1205, 1206, 1207, 1208],
    coveragePercentage: 72.0,
    prerequisiteModuleId: 111
  }
];

// =============================================
// UTILITY FUNCTIONS
// =============================================

export const getGrammarWordById = (id: number): GrammarWord | undefined => {
  return allGrammarWords.find(word => word.id === id);
};

export const getGrammarModuleWords = (moduleId: number): GrammarWord[] => {
  const module = grammarModules.find(m => m.id === moduleId);
  if (!module) return [];
  return module.wordIds.map(id => getGrammarWordById(id)).filter(Boolean) as GrammarWord[];
};

export const getGrammarModuleById = (moduleId: number): GrammarModule | undefined => {
  return grammarModules.find(m => m.id === moduleId);
};

export const getGrammarTotalCoverage = (completedModuleIds: number[]): number => {
  const completedModules = grammarModules.filter(m => completedModuleIds.includes(m.id));
  if (completedModules.length === 0) return 0;
  return completedModules[completedModules.length - 1]?.coveragePercentage || 0;
};
