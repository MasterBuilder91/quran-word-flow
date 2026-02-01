// Immersive Listening Stories - Progressive Arabic content for listening comprehension

export interface ListeningStory {
  id: string;
  title: string;
  titleArabic: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  description: string;
  segments: StorySegment[];
  comprehensionQuestions: ComprehensionQuestion[];
}

export interface StorySegment {
  id: number;
  arabic: string;
  transliteration: string;
  english: string;
  vocabularyHighlights?: string[]; // Words to highlight
}

export interface ComprehensionQuestion {
  id: number;
  question: string;
  questionArabic: string;
  options: string[];
  correctAnswer: number;
}

export const listeningStories: ListeningStory[] = [
  {
    id: "story-1-greetings",
    title: "A Day of Greetings",
    titleArabic: "يَوْمُ التَّحِيَّاتِ",
    level: "beginner",
    duration: "3 min",
    description: "Learn common greetings through a story about meeting different people throughout the day.",
    segments: [
      {
        id: 1,
        arabic: "السَّلَامُ عَلَيْكُمْ",
        transliteration: "As-salāmu ʿalaykum",
        english: "Peace be upon you",
        vocabularyHighlights: ["السَّلَامُ", "عَلَيْكُمْ"]
      },
      {
        id: 2,
        arabic: "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ",
        transliteration: "Wa ʿalaykum as-salām wa raḥmatu Allāhi wa barakātuh",
        english: "And upon you be peace, and the mercy of Allah, and His blessings",
        vocabularyHighlights: ["رَحْمَةُ", "بَرَكَاتُهُ"]
      },
      {
        id: 3,
        arabic: "كَيْفَ حَالُكَ؟",
        transliteration: "Kayfa ḥāluk?",
        english: "How are you?",
        vocabularyHighlights: ["كَيْفَ", "حَالُكَ"]
      },
      {
        id: 4,
        arabic: "بِخَيْرٍ، اَلْحَمْدُ لِلَّهِ",
        transliteration: "Bi-khayrin, al-ḥamdu lillāh",
        english: "I am well, praise be to Allah",
        vocabularyHighlights: ["بِخَيْرٍ", "اَلْحَمْدُ"]
      },
      {
        id: 5,
        arabic: "مَا شَاءَ اللهُ! يَوْمٌ جَمِيلٌ",
        transliteration: "Mā shāʾa Allāh! Yawmun jamīl",
        english: "As Allah willed! A beautiful day",
        vocabularyHighlights: ["مَا شَاءَ اللهُ", "جَمِيلٌ"]
      },
      {
        id: 6,
        arabic: "إِنْ شَاءَ اللهُ نَلْتَقِي غَدًا",
        transliteration: "In shāʾa Allāh naltaqī ghadan",
        english: "God willing, we will meet tomorrow",
        vocabularyHighlights: ["إِنْ شَاءَ اللهُ", "غَدًا"]
      },
      {
        id: 7,
        arabic: "مَعَ السَّلَامَةِ",
        transliteration: "Maʿa as-salāmah",
        english: "Goodbye (go with safety)",
        vocabularyHighlights: ["مَعَ", "السَّلَامَةِ"]
      }
    ],
    comprehensionQuestions: [
      {
        id: 1,
        question: "What is the full response to 'As-salāmu ʿalaykum'?",
        questionArabic: "ما هو الرد الكامل على 'السلام عليكم'؟",
        options: [
          "وعليكم السلام",
          "وعليكم السلام ورحمة الله وبركاته",
          "شكراً",
          "مع السلامة"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "How do you say 'How are you?' in Arabic?",
        questionArabic: "كيف تقول 'How are you?' بالعربية؟",
        options: [
          "الحمد لله",
          "ما شاء الله",
          "كيف حالك؟",
          "إن شاء الله"
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "What does 'إن شاء الله' (In shāʾa Allāh) mean?",
        questionArabic: "ماذا يعني 'إن شاء الله'؟",
        options: [
          "Thank you",
          "God willing",
          "Goodbye",
          "You're welcome"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "story-2-quran-intro",
    title: "Opening the Qur'an",
    titleArabic: "فَتْحُ الْقُرْآنِ",
    level: "beginner",
    duration: "4 min",
    description: "A beginner's journey into Qur'anic vocabulary with Al-Fatiha.",
    segments: [
      {
        id: 1,
        arabic: "بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Bismillāhi ar-Raḥmāni ar-Raḥīm",
        english: "In the name of Allah, the Most Gracious, the Most Merciful",
        vocabularyHighlights: ["بِسْمِ", "الرَّحْمَٰنِ", "الرَّحِيمِ"]
      },
      {
        id: 2,
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        transliteration: "Al-ḥamdu lillāhi Rabbi al-ʿālamīn",
        english: "All praise is for Allah, Lord of all worlds",
        vocabularyHighlights: ["الْحَمْدُ", "رَبِّ", "الْعَالَمِينَ"]
      },
      {
        id: 3,
        arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Ar-Raḥmāni ar-Raḥīm",
        english: "The Most Gracious, the Most Merciful",
        vocabularyHighlights: ["الرَّحْمَٰنِ", "الرَّحِيمِ"]
      },
      {
        id: 4,
        arabic: "مَالِكِ يَوْمِ الدِّينِ",
        transliteration: "Māliki Yawmi ad-Dīn",
        english: "Master of the Day of Judgment",
        vocabularyHighlights: ["مَالِكِ", "يَوْمِ", "الدِّينِ"]
      },
      {
        id: 5,
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        transliteration: "Iyyāka naʿbudu wa-iyyāka nastaʿīn",
        english: "You alone we worship, and You alone we ask for help",
        vocabularyHighlights: ["نَعْبُدُ", "نَسْتَعِينُ"]
      },
      {
        id: 6,
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        transliteration: "Ihdinā aṣ-ṣirāṭa al-mustaqīm",
        english: "Guide us to the straight path",
        vocabularyHighlights: ["اهْدِنَا", "الصِّرَاطَ", "الْمُسْتَقِيمَ"]
      },
      {
        id: 7,
        arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ",
        transliteration: "Ṣirāṭa alladhīna anʿamta ʿalayhim",
        english: "The path of those You have blessed",
        vocabularyHighlights: ["الَّذِينَ", "أَنْعَمْتَ"]
      },
      {
        id: 8,
        arabic: "غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        transliteration: "Ghayri al-maghḍūbi ʿalayhim wa-lā aḍ-ḍāllīn",
        english: "Not of those who have earned Your anger, nor of those who have gone astray",
        vocabularyHighlights: ["غَيْرِ", "الْمَغْضُوبِ", "الضَّالِّينَ"]
      }
    ],
    comprehensionQuestions: [
      {
        id: 1,
        question: "What does 'Rabb al-ʿālamīn' mean?",
        questionArabic: "ماذا يعني 'رب العالمين'؟",
        options: [
          "The Most Merciful",
          "Lord of all worlds",
          "Master of the Day",
          "The straight path"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What do we ask Allah for in 'Ihdinā aṣ-ṣirāṭa al-mustaqīm'?",
        questionArabic: "ماذا نطلب من الله في 'اهدنا الصراط المستقيم'؟",
        options: [
          "Mercy",
          "Forgiveness",
          "Guidance to the straight path",
          "Blessings"
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "How many times is 'ar-Raḥīm' mentioned in Al-Fatiha?",
        questionArabic: "كم مرة ذُكر 'الرحيم' في الفاتحة؟",
        options: [
          "Once",
          "Twice",
          "Three times",
          "Four times"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: "story-3-prophet-story",
    title: "The Story of Prophet Musa",
    titleArabic: "قِصَّةُ مُوسَىٰ",
    level: "intermediate",
    duration: "6 min",
    description: "Learn Qur'anic vocabulary through the story of Prophet Musa (Moses) from the Qur'an.",
    segments: [
      {
        id: 1,
        arabic: "وَأَوْحَيْنَا إِلَىٰ أُمِّ مُوسَىٰ أَنْ أَرْضِعِيهِ",
        transliteration: "Wa awḥaynā ilā ummi Mūsā an arḍiʿīh",
        english: "And We inspired the mother of Musa to nurse him",
        vocabularyHighlights: ["أَوْحَيْنَا", "أُمِّ", "أَرْضِعِيهِ"]
      },
      {
        id: 2,
        arabic: "فَإِذَا خِفْتِ عَلَيْهِ فَأَلْقِيهِ فِي الْيَمِّ",
        transliteration: "Fa-idhā khifti ʿalayhi fa-alqīhi fī al-yamm",
        english: "When you fear for him, cast him into the river",
        vocabularyHighlights: ["خِفْتِ", "أَلْقِيهِ", "الْيَمِّ"]
      },
      {
        id: 3,
        arabic: "وَلَا تَخَافِي وَلَا تَحْزَنِي",
        transliteration: "Wa-lā takhāfī wa-lā taḥzanī",
        english: "And do not fear and do not grieve",
        vocabularyHighlights: ["تَخَافِي", "تَحْزَنِي"]
      },
      {
        id: 4,
        arabic: "إِنَّا رَادُّوهُ إِلَيْكِ وَجَاعِلُوهُ مِنَ الْمُرْسَلِينَ",
        transliteration: "Innā rāddūhu ilayki wa-jāʿilūhu min al-mursalīn",
        english: "Indeed, We will return him to you and make him one of the messengers",
        vocabularyHighlights: ["رَادُّوهُ", "الْمُرْسَلِينَ"]
      },
      {
        id: 5,
        arabic: "فَالْتَقَطَهُ آلُ فِرْعَوْنَ",
        transliteration: "Fa-iltaqaṭahu ālu Firʿawn",
        english: "Then the family of Pharaoh picked him up",
        vocabularyHighlights: ["الْتَقَطَهُ", "آلُ", "فِرْعَوْنَ"]
      },
      {
        id: 6,
        arabic: "لِيَكُونَ لَهُمْ عَدُوًّا وَحَزَنًا",
        transliteration: "Li-yakūna lahum ʿaduwwan wa-ḥazanan",
        english: "So that he would become to them an enemy and a cause of grief",
        vocabularyHighlights: ["عَدُوًّا", "حَزَنًا"]
      }
    ],
    comprehensionQuestions: [
      {
        id: 1,
        question: "What was the mother of Musa inspired to do?",
        questionArabic: "ماذا أُوحي إلى أم موسى أن تفعل؟",
        options: [
          "Hide him in a house",
          "Nurse him and cast him into the river when afraid",
          "Take him to the palace",
          "Send him to the mountains"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Who picked up baby Musa from the river?",
        questionArabic: "من التقط موسى من النهر؟",
        options: [
          "His mother",
          "His sister",
          "The family of Pharaoh",
          "The people of the village"
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "What did Allah promise the mother of Musa?",
        questionArabic: "ماذا وعد الله أم موسى؟",
        options: [
          "To protect her",
          "To return him to her and make him a messenger",
          "To give her wealth",
          "To take her to safety"
        ],
        correctAnswer: 1
      }
    ]
  }
];

export const getStoryById = (id: string): ListeningStory | undefined => {
  return listeningStories.find(s => s.id === id);
};

export const getStoriesByLevel = (level: 'beginner' | 'intermediate' | 'advanced'): ListeningStory[] => {
  return listeningStories.filter(s => s.level === level);
};
