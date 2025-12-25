// High-frequency Qur'anic words data
// Based on Dr. Abdulazeez Abdulraheem's "125 Words of the Qur'an"
// These 125 words cover 50% of the Qur'an's vocabulary

export interface QuranicWord {
  id: number;
  arabic: string;
  transliteration: string;
  english: string;
  occurrences: number;
  type: 'noun' | 'verb' | 'particle' | 'pronoun';
  example: {
    arabic: string;
    english: string;
    reference: string;
  };
  forms?: string[];
}

export interface Module {
  id: number;
  title: string;
  titleArabic: string;
  description: string;
  wordIds: number[];
  coveragePercentage: number;
}

export const quranicWords: QuranicWord[] = [
  {
    id: 1,
    arabic: "ٱللَّهُ",
    transliteration: "Allāh",
    english: "Allah, God",
    occurrences: 2550,
    type: "noun",
    example: {
      arabic: "أَعُوذُ بِٱللَّهِ مِنَ ٱلشَّيْطَٰنِ ٱلرَّجِيمِ",
      english: "I seek refuge in Allah from the outcast Satan",
      reference: "Qur'an"
    },
    forms: ["بِاللَّهِ", "وَاللَّهُ", "فَاللَّهُ", "لِلَّهِ"]
  },
  {
    id: 2,
    arabic: "ٱلشَّيْطَٰنُ",
    transliteration: "ash-shayṭān",
    english: "Satan, the devil",
    occurrences: 88,
    type: "noun",
    example: {
      arabic: "أَعُوذُ بِٱللَّهِ مِنَ ٱلشَّيْطَٰنِ ٱلرَّجِيمِ",
      english: "I seek refuge in Allah from the outcast Satan",
      reference: "Qur'an"
    },
    forms: ["الشَّيَاطِينَ", "لِلشَّيَاطِينِ"]
  },
  {
    id: 3,
    arabic: "هُوَ",
    transliteration: "huwa",
    english: "he, it",
    occurrences: 481,
    type: "pronoun",
    example: {
      arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
      english: "Say: He is Allah, the One",
      reference: "Qur'an 112:1"
    },
    forms: ["فَهُوَ", "لَهُوَ"]
  },
  {
    id: 4,
    arabic: "هُمْ",
    transliteration: "hum",
    english: "they",
    occurrences: 444,
    type: "pronoun",
    example: {
      arabic: "أُولَٰئِكَ أَصْحَابُ ٱلْجَنَّةِ هُمْ فِيهَا خَالِدُونَ",
      english: "Those are the companions of Paradise; they will abide in it",
      reference: "Qur'an 2:82"
    },
    forms: ["فَهُمْ", "أَهُمْ", "لَهُمْ"]
  },
  {
    id: 5,
    arabic: "أَنتَ",
    transliteration: "anta",
    english: "you (masculine singular)",
    occurrences: 81,
    type: "pronoun",
    example: {
      arabic: "سُبْحَانَكَ لَا إِلَٰهَ إِلَّا أَنتَ",
      english: "Glory be to You! There is no god except You",
      reference: "Qur'an 21:87"
    }
  },
  {
    id: 6,
    arabic: "أَنَا",
    transliteration: "anā",
    english: "I",
    occurrences: 68,
    type: "pronoun",
    example: {
      arabic: "وَلَا أَنَا عَابِدٌ مَّا عَبَدتُّمْ",
      english: "And I am not a worshipper of what you worship",
      reference: "Qur'an 109:4"
    },
    forms: ["فَأَنَا"]
  },
  {
    id: 7,
    arabic: "أَنتُمْ",
    transliteration: "antum",
    english: "you all (plural)",
    occurrences: 135,
    type: "pronoun",
    example: {
      arabic: "وَلَا أَنتُمْ عَابِدُونَ مَا أَعْبُدُ",
      english: "And you are not worshippers of what I worship",
      reference: "Qur'an 109:3"
    }
  },
  {
    id: 8,
    arabic: "نَحْنُ",
    transliteration: "naḥnu",
    english: "we",
    occurrences: 86,
    type: "pronoun",
    example: {
      arabic: "إِنَّا نَحْنُ نَزَّلْنَا ٱلذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ",
      english: "Indeed, We have sent down the Reminder and We are its Guardian",
      reference: "Qur'an 15:9"
    },
    forms: ["نَحْنُ", "لَنَحْنُ", "أَنَحْنُ"]
  },
  {
    id: 9,
    arabic: "مِن",
    transliteration: "min",
    english: "from, of",
    occurrences: 831,
    type: "particle",
    example: {
      arabic: "أَعُوذُ بِٱللَّهِ مِنَ ٱلشَّيْطَٰنِ",
      english: "I seek refuge in Allah from Satan",
      reference: "Qur'an"
    }
  },
  {
    id: 10,
    arabic: "إِلَىٰ",
    transliteration: "ilā",
    english: "to, towards",
    occurrences: 702,
    type: "particle",
    example: {
      arabic: "ٱهْدِنَا ٱلصِّرَاطَ ٱلْمُسْتَقِيمَ",
      english: "Guide us to the straight path",
      reference: "Qur'an 1:6"
    }
  },
  {
    id: 11,
    arabic: "فِي",
    transliteration: "fī",
    english: "in, within",
    occurrences: 1686,
    type: "particle",
    example: {
      arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَالَمِينَ",
      english: "All praise is for Allah, Lord of all worlds",
      reference: "Qur'an 1:2"
    }
  },
  {
    id: 12,
    arabic: "عَلَىٰ",
    transliteration: "ʿalā",
    english: "on, upon, over",
    occurrences: 640,
    type: "particle",
    example: {
      arabic: "صِرَاطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ",
      english: "The path of those upon whom You have bestowed favor",
      reference: "Qur'an 1:7"
    }
  },
  {
    id: 13,
    arabic: "الَّذِي",
    transliteration: "alladhī",
    english: "who, which, that (masculine)",
    occurrences: 1236,
    type: "pronoun",
    example: {
      arabic: "ٱلْحَمْدُ لِلَّهِ ٱلَّذِي خَلَقَ ٱلسَّمَاوَاتِ وَٱلْأَرْضَ",
      english: "Praise to Allah, who created the heavens and the earth",
      reference: "Qur'an 6:1"
    },
    forms: ["الَّذِينَ", "الَّتِي", "اللَّاتِي"]
  },
  {
    id: 14,
    arabic: "رَبّ",
    transliteration: "rabb",
    english: "Lord, Master, Sustainer",
    occurrences: 980,
    type: "noun",
    example: {
      arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَالَمِينَ",
      english: "All praise is for Allah, Lord of all worlds",
      reference: "Qur'an 1:2"
    },
    forms: ["رَبُّنَا", "رَبُّكَ", "رَبُّكُمْ", "رَبِّي"]
  },
  {
    id: 15,
    arabic: "قَالَ",
    transliteration: "qāla",
    english: "he said",
    occurrences: 1618,
    type: "verb",
    example: {
      arabic: "قَالَ رَبِّ ٱغْفِرْ لِي",
      english: "He said: My Lord, forgive me",
      reference: "Qur'an 38:35"
    },
    forms: ["قَالُوا", "قُلْ", "قِيلَ", "يَقُولُ", "يَقُولُونَ"]
  },
  {
    id: 16,
    arabic: "حَمِدَ",
    transliteration: "ḥamida",
    english: "to praise",
    occurrences: 63,
    type: "verb",
    example: {
      arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَالَمِينَ",
      english: "All praise is for Allah, Lord of all worlds",
      reference: "Qur'an 1:2"
    },
    forms: ["الْحَمْدُ", "يَحْمَدُونَ", "مَحْمُود"]
  },
  {
    id: 17,
    arabic: "كَانَ",
    transliteration: "kāna",
    english: "he was, to be",
    occurrences: 1358,
    type: "verb",
    example: {
      arabic: "وَكَانَ ٱللَّهُ غَفُورًا رَّحِيمًا",
      english: "And Allah is ever Forgiving and Merciful",
      reference: "Qur'an 33:73"
    },
    forms: ["يَكُونُ", "كُونُوا", "تَكُنْ", "كَانُوا"]
  },
  {
    id: 18,
    arabic: "عَالَمِينَ",
    transliteration: "ʿālamīn",
    english: "worlds, all beings",
    occurrences: 73,
    type: "noun",
    example: {
      arabic: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَالَمِينَ",
      english: "All praise is for Allah, Lord of all worlds",
      reference: "Qur'an 1:2"
    }
  },
  {
    id: 19,
    arabic: "مُسْلِم",
    transliteration: "muslim",
    english: "one who submits, Muslim",
    occurrences: 42,
    type: "noun",
    example: {
      arabic: "وَأَنَا أَوَّلُ ٱلْمُسْلِمِينَ",
      english: "And I am the first of the Muslims",
      reference: "Qur'an 6:163"
    },
    forms: ["الْمُسْلِمِينَ", "الْمُسْلِمَاتِ"]
  },
  {
    id: 20,
    arabic: "مُؤْمِن",
    transliteration: "muʾmin",
    english: "believer",
    occurrences: 179,
    type: "noun",
    example: {
      arabic: "إِنَّمَا ٱلْمُؤْمِنُونَ إِخْوَةٌ",
      english: "The believers are but brothers",
      reference: "Qur'an 49:10"
    },
    forms: ["الْمُؤْمِنِينَ", "الْمُؤْمِنَاتِ"]
  },
  {
    id: 21,
    arabic: "مُشْرِك",
    transliteration: "mushrik",
    english: "one who associates partners (with Allah)",
    occurrences: 44,
    type: "noun",
    example: {
      arabic: "وَلَا تَنكِحُوا ٱلْمُشْرِكَاتِ",
      english: "And do not marry polytheistic women",
      reference: "Qur'an 2:221"
    },
    forms: ["الْمُشْرِكِينَ", "الْمُشْرِكَاتِ"]
  },
  {
    id: 22,
    arabic: "كَافِر",
    transliteration: "kāfir",
    english: "disbeliever, one who rejects",
    occurrences: 525,
    type: "noun",
    example: {
      arabic: "إِنَّ ٱلَّذِينَ كَفَرُوا سَوَاءٌ عَلَيْهِمْ",
      english: "Indeed, those who disbelieve – it is all the same for them",
      reference: "Qur'an 2:6"
    },
    forms: ["الْكَافِرِينَ", "الْكَفَرَةِ", "كَفَرُوا"]
  },
  {
    id: 23,
    arabic: "صَالِح",
    transliteration: "ṣāliḥ",
    english: "righteous, good",
    occurrences: 180,
    type: "noun",
    example: {
      arabic: "وَعَمِلُوا ٱلصَّالِحَاتِ",
      english: "And did righteous deeds",
      reference: "Qur'an 2:25"
    },
    forms: ["الصَّالِحِينَ", "الصَّالِحَاتِ"]
  },
  {
    id: 24,
    arabic: "يَوْم",
    transliteration: "yawm",
    english: "day",
    occurrences: 405,
    type: "noun",
    example: {
      arabic: "مَالِكِ يَوْمِ ٱلدِّينِ",
      english: "Master of the Day of Judgment",
      reference: "Qur'an 1:4"
    },
    forms: ["الْيَوْمَ", "أَيَّامٍ"]
  },
  {
    id: 25,
    arabic: "دِين",
    transliteration: "dīn",
    english: "religion, way of life, judgment",
    occurrences: 101,
    type: "noun",
    example: {
      arabic: "مَالِكِ يَوْمِ ٱلدِّينِ",
      english: "Master of the Day of Judgment",
      reference: "Qur'an 1:4"
    }
  },
  {
    id: 26,
    arabic: "عَبَدَ",
    transliteration: "ʿabada",
    english: "to worship, to serve",
    occurrences: 275,
    type: "verb",
    example: {
      arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      english: "You alone we worship and You alone we ask for help",
      reference: "Qur'an 1:5"
    },
    forms: ["نَعْبُدُ", "يَعْبُدُونَ", "اعْبُدُوا", "عِبَادَة"]
  },
  {
    id: 27,
    arabic: "هَدَى",
    transliteration: "hadā",
    english: "to guide",
    occurrences: 316,
    type: "verb",
    example: {
      arabic: "ٱهْدِنَا ٱلصِّرَاطَ ٱلْمُسْتَقِيمَ",
      english: "Guide us to the straight path",
      reference: "Qur'an 1:6"
    },
    forms: ["اهْدِنَا", "يَهْدِي", "هُدًى", "هَادٍ"]
  },
  {
    id: 28,
    arabic: "صِرَاط",
    transliteration: "ṣirāṭ",
    english: "path, way",
    occurrences: 45,
    type: "noun",
    example: {
      arabic: "ٱهْدِنَا ٱلصِّرَاطَ ٱلْمُسْتَقِيمَ",
      english: "Guide us to the straight path",
      reference: "Qur'an 1:6"
    }
  },
  {
    id: 29,
    arabic: "نَعَمَ",
    transliteration: "naʿama",
    english: "to bestow favor",
    occurrences: 143,
    type: "verb",
    example: {
      arabic: "صِرَاطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ",
      english: "The path of those upon whom You have bestowed favor",
      reference: "Qur'an 1:7"
    },
    forms: ["أَنْعَمْتَ", "نِعْمَة", "نِعَم"]
  },
  {
    id: 30,
    arabic: "غَضَبَ",
    transliteration: "ghaḍiba",
    english: "to be angry",
    occurrences: 24,
    type: "verb",
    example: {
      arabic: "غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ",
      english: "Not of those who have evoked [Your] anger",
      reference: "Qur'an 1:7"
    },
    forms: ["الْمَغْضُوبِ", "غَضَب"]
  },
  {
    id: 31,
    arabic: "ضَلَّ",
    transliteration: "ḍalla",
    english: "to go astray",
    occurrences: 191,
    type: "verb",
    example: {
      arabic: "وَلَا ٱلضَّالِّينَ",
      english: "Nor of those who go astray",
      reference: "Qur'an 1:7"
    },
    forms: ["الضَّالِّينَ", "يَضِلُّ", "ضَلَالَة"]
  },
  {
    id: 32,
    arabic: "آمَنَ",
    transliteration: "āmana",
    english: "to believe",
    occurrences: 811,
    type: "verb",
    example: {
      arabic: "آمَنَ ٱلرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ",
      english: "The Messenger has believed in what was revealed to him",
      reference: "Qur'an 2:285"
    },
    forms: ["يُؤْمِنُ", "آمَنُوا", "إِيمَان"]
  },
  {
    id: 33,
    arabic: "كَفَرَ",
    transliteration: "kafara",
    english: "to disbelieve, to reject",
    occurrences: 525,
    type: "verb",
    example: {
      arabic: "إِنَّ ٱلَّذِينَ كَفَرُوا",
      english: "Indeed, those who disbelieve",
      reference: "Qur'an 2:6"
    },
    forms: ["كَفَرُوا", "يَكْفُرُ", "كُفْر"]
  },
  {
    id: 34,
    arabic: "كِتَاب",
    transliteration: "kitāb",
    english: "book, scripture",
    occurrences: 260,
    type: "noun",
    example: {
      arabic: "ذَٰلِكَ ٱلْكِتَابُ لَا رَيْبَ فِيهِ",
      english: "This is the Book about which there is no doubt",
      reference: "Qur'an 2:2"
    },
    forms: ["الْكُتُب"]
  },
  {
    id: 35,
    arabic: "قُرْآن",
    transliteration: "qurʾān",
    english: "recitation, the Qur'an",
    occurrences: 68,
    type: "noun",
    example: {
      arabic: "شَهْرُ رَمَضَانَ ٱلَّذِي أُنزِلَ فِيهِ ٱلْقُرْآنُ",
      english: "The month of Ramadan in which was revealed the Qur'an",
      reference: "Qur'an 2:185"
    }
  },
  {
    id: 36,
    arabic: "آيَة",
    transliteration: "āyah",
    english: "sign, verse, miracle",
    occurrences: 382,
    type: "noun",
    example: {
      arabic: "إِنَّ فِي خَلْقِ ٱلسَّمَاوَاتِ وَٱلْأَرْضِ لَآيَاتٍ",
      english: "Indeed, in the creation of the heavens and the earth are signs",
      reference: "Qur'an 3:190"
    },
    forms: ["آيَات", "آيَاتِنَا"]
  },
  {
    id: 37,
    arabic: "أَرْض",
    transliteration: "arḍ",
    english: "earth, land",
    occurrences: 461,
    type: "noun",
    example: {
      arabic: "خَلَقَ ٱلسَّمَاوَاتِ وَٱلْأَرْضَ",
      english: "He created the heavens and the earth",
      reference: "Qur'an 6:1"
    }
  },
  {
    id: 38,
    arabic: "سَمَاء",
    transliteration: "samāʾ",
    english: "sky, heaven",
    occurrences: 381,
    type: "noun",
    example: {
      arabic: "خَلَقَ ٱلسَّمَاوَاتِ وَٱلْأَرْضَ",
      english: "He created the heavens and the earth",
      reference: "Qur'an 6:1"
    },
    forms: ["السَّمَاوَات"]
  },
  {
    id: 39,
    arabic: "خَلَقَ",
    transliteration: "khalaqa",
    english: "to create",
    occurrences: 252,
    type: "verb",
    example: {
      arabic: "خَلَقَ ٱلسَّمَاوَاتِ وَٱلْأَرْضَ",
      english: "He created the heavens and the earth",
      reference: "Qur'an 6:1"
    },
    forms: ["يَخْلُقُ", "خَلْق", "خَالِق"]
  },
  {
    id: 40,
    arabic: "أَوْ",
    transliteration: "aw",
    english: "or",
    occurrences: 280,
    type: "particle",
    example: {
      arabic: "فَمَن شَاءَ فَلْيُؤْمِن وَمَن شَاءَ فَلْيَكْفُرْ",
      english: "So whoever wills - let him believe; and whoever wills - let him disbelieve",
      reference: "Qur'an 18:29"
    }
  },
  {
    id: 41,
    arabic: "أَوَّل",
    transliteration: "awwal",
    english: "first",
    occurrences: 64,
    type: "noun",
    example: {
      arabic: "وَأَنَا أَوَّلُ ٱلْمُسْلِمِينَ",
      english: "And I am the first of the Muslims",
      reference: "Qur'an 6:163"
    }
  },
  {
    id: 42,
    arabic: "لَوْ",
    transliteration: "law",
    english: "if (hypothetical)",
    occurrences: 238,
    type: "particle",
    example: {
      arabic: "وَلَوْ شَاءَ ٱللَّهُ لَجَمَعَهُمْ عَلَى ٱلْهُدَىٰ",
      english: "And if Allah had willed, He would have gathered them upon guidance",
      reference: "Qur'an 6:35"
    }
  },
  {
    id: 43,
    arabic: "قُلْ",
    transliteration: "qul",
    english: "say! (command)",
    occurrences: 332,
    type: "verb",
    example: {
      arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
      english: "Say: He is Allah, the One",
      reference: "Qur'an 112:1"
    }
  },
  {
    id: 44,
    arabic: "مَنْ",
    transliteration: "man",
    english: "who, whoever",
    occurrences: 744,
    type: "particle",
    example: {
      arabic: "مَنْ عَمِلَ صَالِحًا فَلِنَفْسِهِ",
      english: "Whoever does righteousness – it is for his [own] soul",
      reference: "Qur'an 45:15"
    }
  },
  {
    id: 45,
    arabic: "عَنْ",
    transliteration: "ʿan",
    english: "from, about, away from",
    occurrences: 615,
    type: "particle",
    example: {
      arabic: "وَيَنْهَىٰ عَنِ ٱلْفَحْشَاءِ",
      english: "And He forbids immorality",
      reference: "Qur'an 16:90"
    }
  },
  {
    id: 46,
    arabic: "قَدْ",
    transliteration: "qad",
    english: "indeed, already, certainly",
    occurrences: 406,
    type: "particle",
    example: {
      arabic: "قَدْ أَفْلَحَ ٱلْمُؤْمِنُونَ",
      english: "Indeed, the believers have succeeded",
      reference: "Qur'an 23:1"
    }
  },
  {
    id: 47,
    arabic: "قُرْآن",
    transliteration: "qurʾān",
    english: "Qur'an, recitation",
    occurrences: 68,
    type: "noun",
    example: {
      arabic: "وَلَقَدْ يَسَّرْنَا ٱلْقُرْآنَ لِلذِّكْرِ",
      english: "And We have certainly made the Qur'an easy for remembrance",
      reference: "Qur'an 54:17"
    }
  },
  {
    id: 48,
    arabic: "أَنَّ",
    transliteration: "anna",
    english: "that (conjunction)",
    occurrences: 770,
    type: "particle",
    example: {
      arabic: "وَٱعْلَمُوا أَنَّ ٱللَّهَ غَفُورٌ رَّحِيمٌ",
      english: "And know that Allah is Forgiving and Merciful",
      reference: "Qur'an 2:235"
    }
  },
  {
    id: 49,
    arabic: "شَاءَ",
    transliteration: "shāʾa",
    english: "to will, to wish",
    occurrences: 236,
    type: "verb",
    example: {
      arabic: "وَمَا تَشَاءُونَ إِلَّا أَن يَشَاءَ ٱللَّهُ",
      english: "And you do not will except that Allah wills",
      reference: "Qur'an 76:30"
    },
    forms: ["يَشَاءُ", "تَشَاءُونَ", "مَشِيئَة"]
  },
  {
    id: 50,
    arabic: "إِنَّ",
    transliteration: "inna",
    english: "indeed, verily",
    occurrences: 1531,
    type: "particle",
    example: {
      arabic: "إِنَّ ٱللَّهَ غَفُورٌ رَّحِيمٌ",
      english: "Indeed, Allah is Forgiving and Merciful",
      reference: "Qur'an 2:226"
    }
  },
  {
    id: 51,
    arabic: "لَا",
    transliteration: "lā",
    english: "no, not",
    occurrences: 1738,
    type: "particle",
    example: {
      arabic: "لَا إِلَٰهَ إِلَّا ٱللَّهُ",
      english: "There is no god but Allah",
      reference: "Qur'an 47:19"
    }
  },
  {
    id: 52,
    arabic: "إِلَّا",
    transliteration: "illā",
    english: "except, but",
    occurrences: 663,
    type: "particle",
    example: {
      arabic: "لَا إِلَٰهَ إِلَّا ٱللَّهُ",
      english: "There is no god but Allah",
      reference: "Qur'an 47:19"
    }
  },
  {
    id: 53,
    arabic: "إِلَٰه",
    transliteration: "ilāh",
    english: "god, deity",
    occurrences: 147,
    type: "noun",
    example: {
      arabic: "لَا إِلَٰهَ إِلَّا ٱللَّهُ",
      english: "There is no god but Allah",
      reference: "Qur'an 47:19"
    },
    forms: ["آلِهَة"]
  },
  {
    id: 54,
    arabic: "وَاحِد",
    transliteration: "wāḥid",
    english: "one, single",
    occurrences: 69,
    type: "noun",
    example: {
      arabic: "وَإِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ",
      english: "And your god is one God",
      reference: "Qur'an 2:163"
    }
  },
  {
    id: 55,
    arabic: "أَحَد",
    transliteration: "aḥad",
    english: "one, anyone",
    occurrences: 85,
    type: "noun",
    example: {
      arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ",
      english: "Say: He is Allah, the One",
      reference: "Qur'an 112:1"
    }
  },
  {
    id: 56,
    arabic: "رَحْمَٰن",
    transliteration: "raḥmān",
    english: "The Most Merciful",
    occurrences: 57,
    type: "noun",
    example: {
      arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      english: "In the name of Allah, the Most Merciful, the Most Compassionate",
      reference: "Qur'an 1:1"
    }
  },
  {
    id: 57,
    arabic: "رَحِيم",
    transliteration: "raḥīm",
    english: "The Most Compassionate",
    occurrences: 227,
    type: "noun",
    example: {
      arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
      english: "In the name of Allah, the Most Merciful, the Most Compassionate",
      reference: "Qur'an 1:1"
    }
  },
  {
    id: 58,
    arabic: "رَحِمَ",
    transliteration: "raḥima",
    english: "to have mercy",
    occurrences: 339,
    type: "verb",
    example: {
      arabic: "وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ",
      english: "And My mercy encompasses all things",
      reference: "Qur'an 7:156"
    },
    forms: ["رَحْمَة", "يَرْحَمُ"]
  },
  {
    id: 59,
    arabic: "نَفْس",
    transliteration: "nafs",
    english: "soul, self",
    occurrences: 295,
    type: "noun",
    example: {
      arabic: "كُلُّ نَفْسٍ ذَائِقَةُ ٱلْمَوْتِ",
      english: "Every soul shall taste death",
      reference: "Qur'an 3:185"
    },
    forms: ["أَنفُس", "أَنفُسِكُمْ"]
  },
  {
    id: 60,
    arabic: "قَلْب",
    transliteration: "qalb",
    english: "heart",
    occurrences: 132,
    type: "noun",
    example: {
      arabic: "إِنَّ فِي ذَٰلِكَ لَذِكْرَىٰ لِمَن كَانَ لَهُ قَلْبٌ",
      english: "Indeed in that is a reminder for whoever has a heart",
      reference: "Qur'an 50:37"
    },
    forms: ["قُلُوب"]
  },
];

// Module definitions - grouping words by theme and frequency
export const modules: Module[] = [
  {
    id: 1,
    title: "Foundation",
    titleArabic: "الأساس",
    description: "Core words: Allah, pronouns, and essential particles",
    wordIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    coveragePercentage: 8.5
  },
  {
    id: 2,
    title: "Al-Fatiha Vocabulary",
    titleArabic: "مفردات الفاتحة",
    description: "Words from the Opening Chapter",
    wordIds: [14, 16, 18, 24, 25, 26, 27, 28, 29, 30, 31],
    coveragePercentage: 12.3
  },
  {
    id: 3,
    title: "Faith & Belief",
    titleArabic: "الإيمان والعقيدة",
    description: "Words of faith, belief, and divine attributes",
    wordIds: [19, 20, 21, 22, 23, 32, 33, 53, 54, 55],
    coveragePercentage: 16.7
  },
  {
    id: 4,
    title: "Divine Names",
    titleArabic: "الأسماء الحسنى",
    description: "Names and attributes of Allah",
    wordIds: [56, 57, 58, 59, 60, 11, 12, 13, 15, 17],
    coveragePercentage: 22.4
  },
  {
    id: 5,
    title: "Creation & Signs",
    titleArabic: "الخلق والآيات",
    description: "Words about creation and divine signs",
    wordIds: [34, 35, 36, 37, 38, 39, 40, 41, 42, 43],
    coveragePercentage: 28.1
  },
  {
    id: 6,
    title: "Essential Particles",
    titleArabic: "الحروف الأساسية",
    description: "Key particles and conjunctions",
    wordIds: [44, 45, 46, 47, 48, 49, 50, 51, 52],
    coveragePercentage: 35.0
  }
];

export const getWordById = (id: number): QuranicWord | undefined => {
  return quranicWords.find(word => word.id === id);
};

export const getModuleWords = (moduleId: number): QuranicWord[] => {
  const module = modules.find(m => m.id === moduleId);
  if (!module) return [];
  return module.wordIds.map(id => getWordById(id)).filter(Boolean) as QuranicWord[];
};

export const getTotalCoverage = (completedModuleIds: number[]): number => {
  const completedModules = modules.filter(m => completedModuleIds.includes(m.id));
  if (completedModules.length === 0) return 0;
  return completedModules[completedModules.length - 1]?.coveragePercentage || 0;
};
