export interface LessonExample {
  arabic: string;
  transliteration: string;
  translation: string;
  breakdown?: string;
}

export interface LessonSection {
  title: string;
  titleAr: string;
  explanation: string;
  examples: LessonExample[];
  tip?: string;
}

export interface LessonData {
  slug: string;
  name: string;
  nameAr: string;
  intro: string;
  sections: LessonSection[];
  quiz: { question: string; options: string[]; correctIndex: number; explanation: string }[];
}

export const LESSONS: Record<string, LessonData> = {
  // ── STAGE 3: PARTICLES ──
  'jussive-particles': {
    slug: 'jussive-particles',
    name: 'Jussive Particles',
    nameAr: 'حُرُوف الجَزْم',
    intro: 'Jussive particles cause the present-tense verb to take the مجزوم (jazm) form — the shortest form of the verb, often dropping the final ن or vowel.',
    sections: [
      {
        title: 'لَمْ — Negation of the Past',
        titleAr: 'لَمْ',
        explanation: 'لَمْ negates the past from the speaker\'s perspective but uses the present-tense verb in its jussive form. Think of it as "did not."',
        examples: [
          { arabic: 'لَمْ يَكْتُبْ', transliteration: 'lam yaktub', translation: 'He did not write', breakdown: 'يَكْتُبُ → يَكْتُبْ (sukūn on the last letter)' },
          { arabic: 'لَمْ يَذْهَبُوا', transliteration: 'lam yadhhabū', translation: 'They did not go', breakdown: 'يَذْهَبُونَ → يَذْهَبُوا (dropped the ن)' },
          { arabic: 'لَمْ أَفْهَمْ', transliteration: 'lam afham', translation: 'I did not understand', breakdown: 'أَفْهَمُ → أَفْهَمْ' },
        ],
        tip: 'لَمْ always makes the verb jussive (مجزوم). The meaning is past-tense even though the verb looks present-tense.'
      },
      {
        title: 'لَمَّا — "Not Yet"',
        titleAr: 'لَمَّا',
        explanation: 'لَمَّا is like لَمْ but implies the action hasn\'t happened yet but might still happen.',
        examples: [
          { arabic: 'لَمَّا يَصِلْ', transliteration: 'lammā yaṣil', translation: 'He has not arrived yet', breakdown: 'يَصِلُ → يَصِلْ' },
          { arabic: 'لَمَّا يَنْتَهِ', transliteration: 'lammā yantahi', translation: 'It has not finished yet', breakdown: 'يَنْتَهِي → يَنْتَهِ (dropped the ي)' },
        ],
        tip: 'لَمَّا implies expectation — the action is anticipated to happen.'
      },
      {
        title: 'لَا (Prohibitive) — "Don\'t!"',
        titleAr: 'لَا النَّاهِيَة',
        explanation: 'When لَا is used for prohibition (commanding someone NOT to do something), the verb takes the jussive form.',
        examples: [
          { arabic: 'لَا تَكْتُبْ', transliteration: 'lā taktub', translation: 'Don\'t write!', breakdown: 'تَكْتُبُ → تَكْتُبْ' },
          { arabic: 'لَا تَخَفْ', transliteration: 'lā takhaf', translation: 'Don\'t be afraid!', breakdown: 'Qur\'anic usage: لَا تَخَفْ إِنَّكَ أَنْتَ الْأَعْلَى' },
          { arabic: 'لَا تَقْرَبُوا', transliteration: 'lā taqrabū', translation: 'Do not approach!', breakdown: 'تَقْرَبُونَ → تَقْرَبُوا (dropped ن)' },
        ],
      },
    ],
    quiz: [
      { question: 'What does لَمْ do to a present-tense verb?', options: ['Makes it manṣūb', 'Makes it majzūm', 'Makes it marfūʿ', 'No change'], correctIndex: 1, explanation: 'لَمْ is a jussive particle — it makes the verb مجزوم (jazm).' },
      { question: 'What is the difference between لَمْ and لَمَّا?', options: ['No difference', 'لَمَّا implies the action may still happen', 'لَمْ is for future', 'لَمَّا is for commands'], correctIndex: 1, explanation: 'لَمَّا means "not yet" — the action hasn\'t happened but is still expected.' },
      { question: 'Choose the correct jussive form: لَمْ _____ (يَذْهَبُ)', options: ['يَذْهَبُ', 'يَذْهَبَ', 'يَذْهَبْ', 'يَذْهَبِ'], correctIndex: 2, explanation: 'The jussive form takes sukūn: يَذْهَبْ' },
    ],
  },

  'subjunctive-particles': {
    slug: 'subjunctive-particles',
    name: 'Subjunctive Particles',
    nameAr: 'حُرُوف النَّصْب',
    intro: 'Subjunctive (naṣb) particles cause the present-tense verb to take fatḥa on its last letter. These particles express purpose, wish, future negation, or cause.',
    sections: [
      {
        title: 'أَنْ — "To / That"',
        titleAr: 'أَنْ',
        explanation: 'أَنْ turns the verb into a verbal noun concept — "to do" or "that he does." The verb takes the منصوب form.',
        examples: [
          { arabic: 'أُرِيدُ أَنْ أَتَعَلَّمَ', transliteration: 'urīdu an ataʿallama', translation: 'I want to learn', breakdown: 'أَتَعَلَّمُ → أَتَعَلَّمَ (fatḥa ending)' },
          { arabic: 'يَجِبُ أَنْ تَدْرُسَ', transliteration: 'yajibu an tadrusa', translation: 'You must study', breakdown: 'تَدْرُسُ → تَدْرُسَ' },
        ],
      },
      {
        title: 'لَنْ — "Will Never / Shall Not"',
        titleAr: 'لَنْ',
        explanation: 'لَنْ negates the future emphatically. The verb becomes منصوب.',
        examples: [
          { arabic: 'لَنْ أَنْسَى', transliteration: 'lan ansā', translation: 'I will never forget', breakdown: 'أَنْسَى remains (already ends in alif)' },
          { arabic: 'لَنْ يَفْعَلَ ذَلِكَ', transliteration: 'lan yafʿala dhālika', translation: 'He will never do that', breakdown: 'يَفْعَلُ → يَفْعَلَ' },
        ],
      },
      {
        title: 'لِ — Lām of Purpose',
        titleAr: 'لَام التَّعْلِيل',
        explanation: 'The لِ (li) before a present verb means "in order to." The verb becomes منصوب.',
        examples: [
          { arabic: 'جِئْتُ لِأَتَعَلَّمَ', transliteration: 'ji\'tu li-ataʿallama', translation: 'I came to learn', breakdown: 'أَتَعَلَّمُ → أَتَعَلَّمَ' },
          { arabic: 'ادْرُسْ لِتَنْجَحَ', transliteration: 'udrus li-tanjaḥa', translation: 'Study to succeed', breakdown: 'تَنْجَحُ → تَنْجَحَ' },
        ],
      },
      {
        title: 'كَيْ — "So That"',
        titleAr: 'كَيْ',
        explanation: 'كَيْ expresses purpose, similar to لِ. Often combined as لِكَيْ.',
        examples: [
          { arabic: 'ذَاكِرْ كَيْ تَنْجَحَ', transliteration: 'dhākir kay tanjaḥa', translation: 'Study so that you succeed', breakdown: 'تَنْجَحُ → تَنْجَحَ' },
        ],
      },
    ],
    quiz: [
      { question: 'What ending does a verb take after أَنْ?', options: ['Sukūn', 'Ḍamma', 'Fatḥa', 'Kasra'], correctIndex: 2, explanation: 'أَنْ is a naṣb particle — the verb takes fatḥa (منصوب).' },
      { question: 'لَنْ أَذْهَبَ means:', options: ['I did not go', 'I will not go', 'I am not going', 'Don\'t go!'], correctIndex: 1, explanation: 'لَنْ negates the future: "I will not go."' },
      { question: 'جِئْتُ لِ_____ (أَدْرُسُ)', options: ['أَدْرُسُ', 'أَدْرُسَ', 'أَدْرُسْ', 'أَدْرُسِ'], correctIndex: 1, explanation: 'لِ (lām of purpose) makes the verb manṣūb → أَدْرُسَ' },
    ],
  },

  'emphatic-nun': {
    slug: 'emphatic-nun',
    name: 'Emphatic Nūn',
    nameAr: 'نُون التَّوكيد',
    intro: 'Arabic can add special نون endings to verbs for emphasis — "I will DEFINITELY do it!" There are two types: the heavy nūn (نون التوكيد الثقيلة) and the light nūn (نون التوكيد الخفيفة).',
    sections: [
      {
        title: 'Heavy Nūn (نَّ)',
        titleAr: 'نُون التَّوكيد الثَّقِيلَة',
        explanation: 'The heavy emphatic nūn (ـَنَّ) is added to the end of the verb for strong emphasis. The verb becomes مبني (indeclinable).',
        examples: [
          { arabic: 'لَأَكْتُبَنَّ', transliteration: 'la-aktubanna', translation: 'I will SURELY write', breakdown: 'أَكْتُبُ + لَـ + ـَنَّ' },
          { arabic: 'لَيَفْعَلَنَّ', transliteration: 'la-yafʿalanna', translation: 'He will SURELY do it', breakdown: 'Used in oaths and strong promises' },
          { arabic: 'وَاللَّهِ لَأَذْهَبَنَّ', transliteration: 'wallāhi la-adhhabanna', translation: 'By Allah, I will surely go', breakdown: 'Common after oaths (قَسَم)' },
        ],
        tip: 'In the Qur\'an: لَيُسْجَنَنَّ وَلَيَكُونًا مِنَ الصَّاغِرِينَ — "He will surely be imprisoned" (12:32)'
      },
      {
        title: 'Light Nūn (نْ)',
        titleAr: 'نُون التَّوكيد الخَفِيفَة',
        explanation: 'The light nūn (ـَنْ) is less common but serves the same emphatic purpose. It has a sukūn.',
        examples: [
          { arabic: 'لَيَكُونَنْ', transliteration: 'la-yakūnan', translation: 'He will surely be', breakdown: 'Written as ـًا in some Qur\'anic orthography' },
        ],
      },
    ],
    quiz: [
      { question: 'What does the emphatic nūn express?', options: ['Negation', 'Emphasis/certainty', 'Question', 'Condition'], correctIndex: 1, explanation: 'The emphatic nūn adds certainty — "surely" or "definitely."' },
      { question: 'Which is the heavy emphatic nūn?', options: ['ـَنْ', 'ـَنَّ', 'ـِنَّ', 'ـُنْ'], correctIndex: 1, explanation: 'The heavy nūn is ـَنَّ (with shadda), the light nūn is ـَنْ (with sukūn).' },
    ],
  },

  'negation-particles': {
    slug: 'negation-particles',
    name: 'Negation Particles',
    nameAr: 'حُرُوف النَّفي',
    intro: 'Arabic uses different particles to negate different tenses and contexts. Each has specific grammatical effects on the verb.',
    sections: [
      {
        title: 'لَا — General Negation',
        titleAr: 'لَا النَّافِيَة',
        explanation: 'لَا negates the present tense without changing the verb\'s grammatical ending (the verb stays مرفوع).',
        examples: [
          { arabic: 'لَا أَعْرِفُ', transliteration: 'lā aʿrifu', translation: 'I don\'t know', breakdown: 'No change to verb ending' },
          { arabic: 'لَا يَفْهَمُونَ', transliteration: 'lā yafhamūna', translation: 'They don\'t understand', breakdown: 'Verb stays مرفوع' },
        ],
      },
      {
        title: 'مَا — Negation of Past',
        titleAr: 'مَا النَّافِيَة',
        explanation: 'مَا negates the past tense. It doesn\'t change the verb form.',
        examples: [
          { arabic: 'مَا كَتَبْتُ', transliteration: 'mā katabtu', translation: 'I did not write', breakdown: 'Past tense negated by ما' },
          { arabic: 'مَا فَعَلَ شَيْئًا', transliteration: 'mā faʿala shay\'an', translation: 'He did not do anything', breakdown: 'Common in Qur\'anic Arabic' },
        ],
        tip: 'In Ḥijāzī Arabic (the dialect of the Qur\'an), ما can act like لَيْسَ and give the predicate fatḥa.'
      },
      {
        title: 'لَنْ — Emphatic Future Negation',
        titleAr: 'لَنْ',
        explanation: 'لَنْ emphatically negates the future. The verb takes the naṣb (manṣūb) form.',
        examples: [
          { arabic: 'لَنْ تَرَانِي', transliteration: 'lan tarānī', translation: 'You will not see Me', breakdown: 'Qur\'an 7:143 — لَنْ تَرَانِي' },
        ],
      },
      {
        title: 'لَيْسَ — "Is Not"',
        titleAr: 'لَيْسَ',
        explanation: 'لَيْسَ is technically a verb (not a particle) but functions as negation for nominal sentences. Its predicate takes fatḥa.',
        examples: [
          { arabic: 'لَيْسَ صَعْبًا', transliteration: 'laysa ṣaʿban', translation: 'It is not difficult', breakdown: 'صَعْبٌ → صَعْبًا (predicate becomes manṣūb)' },
          { arabic: 'لَيْسُوا سَوَاءً', transliteration: 'laysū sawā\'an', translation: 'They are not equal', breakdown: 'Qur\'an 3:113' },
        ],
      },
    ],
    quiz: [
      { question: 'Which particle negates the past tense simply?', options: ['لَا', 'مَا', 'لَنْ', 'لَيْسَ'], correctIndex: 1, explanation: 'مَا is the standard past-tense negation particle.' },
      { question: 'لَنْ makes the verb:', options: ['مرفوع', 'منصوب', 'مجزوم', 'مبني'], correctIndex: 1, explanation: 'لَنْ is a naṣb particle — the verb takes fatḥa.' },
      { question: 'Which is NOT a particle (حرف)?', options: ['لَا', 'مَا', 'لَنْ', 'لَيْسَ'], correctIndex: 3, explanation: 'لَيْسَ is actually a verb (فعل ماضٍ جامد), not a particle.' },
    ],
  },

  // ── STAGE 4: DERIVATIVES ──
  'active-participle': {
    slug: 'active-participle',
    name: 'Active Participle',
    nameAr: 'اِسْم الفَاعِل',
    intro: 'The active participle (اسم الفاعل) describes the doer of an action. From كَتَبَ (to write), we get كَاتِب (writer). Every verb form has its own pattern.',
    sections: [
      {
        title: 'Form I Pattern: فَاعِل',
        titleAr: 'وَزْن فَاعِل',
        explanation: 'For Form I (ثلاثي مجرّد), the active participle follows the pattern فَاعِل (fāʿil).',
        examples: [
          { arabic: 'كَاتِب', transliteration: 'kātib', translation: 'writer / writing', breakdown: 'كَتَبَ → كَاتِب (فَاعِل pattern)' },
          { arabic: 'عَالِم', transliteration: 'ʿālim', translation: 'scholar / knowing', breakdown: 'عَلِمَ → عَالِم' },
          { arabic: 'قَارِئ', transliteration: 'qāriʾ', translation: 'reader / reciter', breakdown: 'قَرَأَ → قَارِئ' },
          { arabic: 'صَابِر', transliteration: 'ṣābir', translation: 'patient (one)', breakdown: 'صَبَرَ → صَابِر' },
        ],
        tip: 'Many common Arabic names are active participles: خَالِد (Khālid = eternal), صَالِح (Ṣāliḥ = righteous).'
      },
      {
        title: 'Forms II–X: مُـ Pattern',
        titleAr: 'أوزان المزيد',
        explanation: 'For augmented forms (II–X), replace the present-tense يـ prefix with مُـ and put kasra on the second-to-last letter.',
        examples: [
          { arabic: 'مُعَلِّم', transliteration: 'muʿallim', translation: 'teacher', breakdown: 'II: يُعَلِّمُ → مُعَلِّم' },
          { arabic: 'مُسَافِر', transliteration: 'musāfir', translation: 'traveler', breakdown: 'III: يُسَافِرُ → مُسَافِر' },
          { arabic: 'مُسْلِم', transliteration: 'muslim', translation: 'one who submits', breakdown: 'IV: يُسْلِمُ → مُسْلِم' },
          { arabic: 'مُسْتَقْبِل', transliteration: 'mustaqbil', translation: 'one receiving / future', breakdown: 'X: يَسْتَقْبِلُ → مُسْتَقْبِل' },
        ],
      },
    ],
    quiz: [
      { question: 'What is the active participle pattern for Form I?', options: ['فَعِيل', 'فَاعِل', 'مَفْعُول', 'فَعَّال'], correctIndex: 1, explanation: 'Form I active participle follows the فَاعِل pattern.' },
      { question: 'مُعَلِّم comes from which form?', options: ['Form I', 'Form II', 'Form IV', 'Form X'], correctIndex: 1, explanation: 'عَلَّمَ (Form II) → مُعَلِّم (replace يُـ with مُـ, kasra before last radical).' },
      { question: 'What is the active participle of فَتَحَ?', options: ['مَفْتُوح', 'فَاتِح', 'فَتَّاح', 'فَتِيح'], correctIndex: 1, explanation: 'فَتَحَ → فَاتِح (the فَاعِل pattern).' },
    ],
  },

  'passive-participle': {
    slug: 'passive-participle',
    name: 'Passive Participle',
    nameAr: 'اِسْم المَفْعُول',
    intro: 'The passive participle (اسم المفعول) describes the one who receives the action. From كَتَبَ (to write), we get مَكْتُوب (written).',
    sections: [
      {
        title: 'Form I Pattern: مَفْعُول',
        titleAr: 'وَزْن مَفْعُول',
        explanation: 'For Form I, the passive participle follows مَفْعُول (mafʿūl).',
        examples: [
          { arabic: 'مَكْتُوب', transliteration: 'maktūb', translation: 'written / letter', breakdown: 'كَتَبَ → مَكْتُوب' },
          { arabic: 'مَعْلُوم', transliteration: 'maʿlūm', translation: 'known', breakdown: 'عَلِمَ → مَعْلُوم' },
          { arabic: 'مَفْتُوح', transliteration: 'maftūḥ', translation: 'opened', breakdown: 'فَتَحَ → مَفْتُوح' },
          { arabic: 'مَشْهُور', transliteration: 'mashhūr', translation: 'famous (well-known)', breakdown: 'شَهَرَ → مَشْهُور' },
        ],
      },
      {
        title: 'Forms II–X: مُـ...َـ Pattern',
        titleAr: 'أوزان المزيد',
        explanation: 'For augmented forms, replace يـ with مُـ and put fatḥa on the second-to-last letter (instead of kasra for active).',
        examples: [
          { arabic: 'مُسْتَخْدَم', transliteration: 'mustakhdam', translation: 'used / employee', breakdown: 'X: يُسْتَخْدَمُ → مُسْتَخْدَم (fatḥa before last radical)' },
          { arabic: 'مُعَلَّم', transliteration: 'muʿallam', translation: 'marked / taught', breakdown: 'II: compare مُعَلِّم (teacher) vs مُعَلَّم (taught)' },
        ],
        tip: 'The ONLY difference between active and passive participles in Forms II–X is kasra (active) vs fatḥa (passive) on the letter before the last radical.'
      },
    ],
    quiz: [
      { question: 'What is the passive participle of فَهِمَ?', options: ['فَاهِم', 'مَفْهُوم', 'فَهِيم', 'مُفَهَّم'], correctIndex: 1, explanation: 'Form I passive participle: فَهِمَ → مَفْهُوم (مَفْعُول pattern).' },
      { question: 'In Forms II–X, what distinguishes active from passive participle?', options: ['Different prefix', 'Kasra vs fatḥa before last radical', 'Added tāʾ', 'Different root'], correctIndex: 1, explanation: 'Active: مُـ...ِـ (kasra), Passive: مُـ...َـ (fatḥa).' },
    ],
  },

  'verbal-noun': {
    slug: 'verbal-noun',
    name: 'Verbal Noun (Maṣdar)',
    nameAr: 'المَصْدَر',
    intro: 'The verbal noun (مصدر) captures the abstract meaning of the verb — the action itself. From كَتَبَ (to write), we get كِتَابَة (writing). Form I maṣdars are irregular, but Forms II–X follow predictable patterns.',
    sections: [
      {
        title: 'Form I — Irregular Patterns',
        titleAr: 'مصادر الثلاثي المجرد',
        explanation: 'Form I verbal nouns don\'t follow a single pattern — they must be memorized. However, some common patterns exist.',
        examples: [
          { arabic: 'كِتَابَة', transliteration: 'kitāba', translation: 'writing', breakdown: 'كَتَبَ → كِتَابَة (فِعَالَة — common for professions/skills)' },
          { arabic: 'عِلْم', transliteration: 'ʿilm', translation: 'knowledge', breakdown: 'عَلِمَ → عِلْم (فِعْل)' },
          { arabic: 'دُخُول', transliteration: 'dukhūl', translation: 'entering', breakdown: 'دَخَلَ → دُخُول (فُعُول — common for motion verbs)' },
          { arabic: 'فَهْم', transliteration: 'fahm', translation: 'understanding', breakdown: 'فَهِمَ → فَهْم (فَعْل)' },
        ],
        tip: 'For Form I, always learn the maṣdar alongside the verb — there\'s no shortcut!'
      },
      {
        title: 'Forms II–X — Regular Patterns',
        titleAr: 'مصادر المزيد',
        explanation: 'Augmented forms have predictable maṣdar patterns.',
        examples: [
          { arabic: 'تَعْلِيم', transliteration: 'taʿlīm', translation: 'teaching', breakdown: 'II: تَفْعِيل' },
          { arabic: 'مُسَاعَدَة', transliteration: 'musāʿada', translation: 'helping', breakdown: 'III: مُفَاعَلَة' },
          { arabic: 'إِسْلَام', transliteration: 'islām', translation: 'submission', breakdown: 'IV: إِفْعَال' },
          { arabic: 'تَعَلُّم', transliteration: 'taʿallum', translation: 'learning', breakdown: 'V: تَفَعُّل' },
          { arabic: 'اِسْتِقْبَال', transliteration: 'istiqbāl', translation: 'reception', breakdown: 'X: اِسْتِفْعَال' },
        ],
      },
    ],
    quiz: [
      { question: 'Why must Form I maṣdars be memorized?', options: ['They don\'t exist', 'They follow one pattern', 'They are irregular/many patterns', 'They are the same as the verb'], correctIndex: 2, explanation: 'Form I maṣdars have dozens of possible patterns — they must be memorized.' },
      { question: 'What is the maṣdar pattern for Form II?', options: ['إِفْعَال', 'تَفْعِيل', 'مُفَاعَلَة', 'تَفَعُّل'], correctIndex: 1, explanation: 'Form II maṣdar follows تَفْعِيل (e.g., تَعْلِيم).' },
      { question: 'إِسْلَام is the maṣdar of which form?', options: ['Form II', 'Form III', 'Form IV', 'Form X'], correctIndex: 2, explanation: 'إِسْلَام follows إِفْعَال — the Form IV maṣdar pattern.' },
    ],
  },

  'noun-of-place-time': {
    slug: 'noun-of-place-time',
    name: 'Noun of Place & Time',
    nameAr: 'اِسْم المَكَان والزَّمَان',
    intro: 'These nouns indicate WHERE or WHEN an action takes place. From كَتَبَ (to write), we get مَكْتَب (office/desk — the place of writing).',
    sections: [
      {
        title: 'Patterns: مَفْعَل and مَفْعِل',
        titleAr: 'مَفْعَل ومَفْعِل',
        explanation: 'Form I nouns of place/time use either مَفْعَل or مَفْعِل. The choice depends on the middle vowel of the present tense.',
        examples: [
          { arabic: 'مَكْتَب', transliteration: 'maktab', translation: 'office / desk', breakdown: 'كَتَبَ / يَكْتُبُ → مَفْعَل (because middle vowel is ḍamma)' },
          { arabic: 'مَسْجِد', transliteration: 'masjid', translation: 'mosque (place of prostration)', breakdown: 'سَجَدَ / يَسْجُدُ → مَفْعِل' },
          { arabic: 'مَدْرَسَة', transliteration: 'madrasa', translation: 'school', breakdown: 'دَرَسَ → مَفْعَلَة (with tāʾ marbūṭa)' },
          { arabic: 'مَطْبَخ', transliteration: 'maṭbakh', translation: 'kitchen', breakdown: 'طَبَخَ → مَفْعَل' },
          { arabic: 'مَغْرِب', transliteration: 'maghrib', translation: 'west / sunset time', breakdown: 'غَرَبَ → مَفْعِل (both place AND time!)' },
        ],
        tip: 'Many everyday Arabic words are nouns of place: مَكْتَبَة (library), مَطَار (airport), مَلْعَب (playground).'
      },
    ],
    quiz: [
      { question: 'مَسْجِد means:', options: ['One who prostrates', 'Prostration', 'Place of prostration', 'Time of prostration'], correctIndex: 2, explanation: 'مَسْجِد is an اسم مكان — "the place of prostration" (mosque).' },
      { question: 'What pattern do nouns of place follow for Form I?', options: ['فَاعِل', 'مَفْعُول', 'مَفْعَل / مَفْعِل', 'تَفْعِيل'], correctIndex: 2, explanation: 'Form I nouns of place/time follow مَفْعَل or مَفْعِل.' },
    ],
  },

  'noun-of-instrument': {
    slug: 'noun-of-instrument',
    name: 'Noun of Instrument',
    nameAr: 'اِسْم الآلَة',
    intro: 'The noun of instrument describes the TOOL used to perform an action. From فَتَحَ (to open), we get مِفْتَاح (key — the instrument of opening).',
    sections: [
      {
        title: 'Three Main Patterns',
        titleAr: 'الأوزان الثلاثة',
        explanation: 'Nouns of instrument primarily follow three patterns: مِفْعَال, مِفْعَل, and مِفْعَلَة.',
        examples: [
          { arabic: 'مِفْتَاح', transliteration: 'miftāḥ', translation: 'key', breakdown: 'فَتَحَ → مِفْعَال' },
          { arabic: 'مِنْشَار', transliteration: 'minshār', translation: 'saw (tool)', breakdown: 'نَشَرَ → مِفْعَال' },
          { arabic: 'مِقَصّ', transliteration: 'miqaṣṣ', translation: 'scissors', breakdown: 'قَصَّ → مِفْعَل' },
          { arabic: 'مِكْنَسَة', transliteration: 'miknasa', translation: 'broom', breakdown: 'كَنَسَ → مِفْعَلَة' },
          { arabic: 'مِلْعَقَة', transliteration: 'milʿaqa', translation: 'spoon', breakdown: 'لَعِقَ → مِفْعَلَة' },
        ],
        tip: 'Notice all instrument nouns start with مِـ (mīm with kasra) — this distinguishes them from place nouns (مَـ with fatḥa).'
      },
    ],
    quiz: [
      { question: 'What prefix do all nouns of instrument share?', options: ['مَـ (fatḥa)', 'مُـ (ḍamma)', 'مِـ (kasra)', 'تَـ'], correctIndex: 2, explanation: 'Instrument nouns always start with مِـ (kasra on the mīm).' },
      { question: 'مِفْتَاح follows which pattern?', options: ['مِفْعَل', 'مِفْعَلَة', 'مِفْعَال', 'مَفْعُول'], correctIndex: 2, explanation: 'مِفْتَاح follows the مِفْعَال pattern.' },
    ],
  },

  // ── STAGE 5: SENTENCE STRUCTURE ──
  'subject-object-agreement': {
    slug: 'subject-object-agreement',
    name: 'Subject & Object Agreement',
    nameAr: 'المُطَابَقَة',
    intro: 'In Arabic, verbs must agree with their subjects in gender and number — but the rules differ depending on whether the subject comes before or after the verb.',
    sections: [
      {
        title: 'Verb-First (الجملة الفعلية)',
        titleAr: 'الفعل قبل الفاعل',
        explanation: 'When the verb comes first, it only agrees in GENDER with the subject — it stays singular even with a plural subject.',
        examples: [
          { arabic: 'ذَهَبَ الطُّلَّابُ', transliteration: 'dhahaba aṭ-ṭullābu', translation: 'The students went', breakdown: 'Verb is singular masculine even though subject is plural' },
          { arabic: 'جَاءَتِ النِّسَاءُ', transliteration: 'jā\'ati an-nisā\'u', translation: 'The women came', breakdown: 'Verb is singular feminine (gender agreement only)' },
        ],
        tip: 'This is a very common mistake for learners — don\'t say ذَهَبُوا الطُّلَّابُ!'
      },
      {
        title: 'Subject-First (الجملة الاسمية)',
        titleAr: 'الفاعل قبل الفعل',
        explanation: 'When the subject comes first (making it a topic), the verb agrees in BOTH gender AND number.',
        examples: [
          { arabic: 'الطُّلَّابُ ذَهَبُوا', transliteration: 'aṭ-ṭullābu dhahabū', translation: 'The students (they) went', breakdown: 'Full agreement: plural masculine verb' },
          { arabic: 'النِّسَاءُ جِئْنَ', transliteration: 'an-nisā\'u ji\'na', translation: 'The women (they) came', breakdown: 'Full agreement: plural feminine verb' },
        ],
      },
    ],
    quiz: [
      { question: 'ذَهَبَ الطُّلَّابُ — why is the verb singular?', options: ['It\'s wrong', 'Verb-first only agrees in gender', 'Students is singular', 'Past tense is always singular'], correctIndex: 1, explanation: 'When the verb comes first, it only matches gender, not number.' },
      { question: 'Which is correct?', options: ['كَتَبُوا الطُّلَّابُ الدَّرْسَ', 'كَتَبَ الطُّلَّابُ الدَّرْسَ', 'الطُّلَّابُ كَتَبَ الدَّرْسَ', 'كَتَبَتْ الطُّلَّابُ الدَّرْسَ'], correctIndex: 1, explanation: 'Verb-first: singular verb + plural subject (gender agreement only).' },
    ],
  },

  'verbal-sentence': {
    slug: 'verbal-sentence',
    name: 'Verb–Sentence Integration',
    nameAr: 'الجُمْلَة الفِعْلِيَّة',
    intro: 'The verbal sentence (الجملة الفعلية) begins with a verb and has a specific structure: Verb → Subject (فاعل) → Object (مفعول به). Understanding case endings is key.',
    sections: [
      {
        title: 'Core Structure: V + S + O',
        titleAr: 'فعل + فاعل + مفعول به',
        explanation: 'The subject (فاعل) takes ḍamma (مرفوع), and the object (مفعول به) takes fatḥa (منصوب).',
        examples: [
          { arabic: 'كَتَبَ الطَّالِبُ الدَّرْسَ', transliteration: 'kataba aṭ-ṭālibu ad-darsa', translation: 'The student wrote the lesson', breakdown: 'كَتَبَ (verb) + الطَّالِبُ (فاعل-مرفوع) + الدَّرْسَ (مفعول-منصوب)' },
          { arabic: 'قَرَأَ المُعَلِّمُ الكِتَابَ', transliteration: 'qara\'a al-muʿallimu al-kitāba', translation: 'The teacher read the book', breakdown: 'Subject = ḍamma, Object = fatḥa' },
        ],
      },
      {
        title: 'Adding Prepositional Phrases',
        titleAr: 'الجار والمجرور',
        explanation: 'Prepositions (حروف الجر) make their nouns take kasra (مجرور).',
        examples: [
          { arabic: 'ذَهَبَ إِلَى المَسْجِدِ', transliteration: 'dhahaba ilā al-masjidi', translation: 'He went to the mosque', breakdown: 'إِلَى + المَسْجِدِ (kasra = majrūr)' },
          { arabic: 'كَتَبَ بِالقَلَمِ عَلَى الوَرَقِ', transliteration: 'kataba bil-qalami ʿalā al-waraqi', translation: 'He wrote with the pen on the paper', breakdown: 'Both بِـ and عَلَى cause kasra' },
        ],
      },
    ],
    quiz: [
      { question: 'In كَتَبَ أَحْمَدُ رِسَالَةً, what case is رِسَالَةً?', options: ['مرفوع', 'منصوب', 'مجرور', 'مبني'], correctIndex: 1, explanation: 'رِسَالَةً is the مفعول به (object) — it takes fatḥa (منصوب).' },
    ],
  },

  'conditional-sentences': {
    slug: 'conditional-sentences',
    name: 'Conditional Sentences',
    nameAr: 'الشَّرْط',
    intro: 'Conditional sentences in Arabic use special particles that affect verb forms. The two main types are إِنْ (real/possible conditions) and لَوْ (unreal/hypothetical conditions).',
    sections: [
      {
        title: 'إِنْ — Real Conditions',
        titleAr: 'إِنْ الشَّرْطِيَّة',
        explanation: 'إِنْ introduces possible conditions. Both the condition (شرط) and the answer (جواب) verbs are مجزوم.',
        examples: [
          { arabic: 'إِنْ تَدْرُسْ تَنْجَحْ', transliteration: 'in tadrus tanjaḥ', translation: 'If you study, you will succeed', breakdown: 'Both verbs are مجزوم (jussive)' },
          { arabic: 'إِنْ يَشَأِ اللَّهُ', transliteration: 'in yasha\'i Allāhu', translation: 'If Allah wills', breakdown: 'Common Qur\'anic conditional' },
        ],
      },
      {
        title: 'لَوْ — Unreal Conditions',
        titleAr: 'لَوْ',
        explanation: 'لَوْ introduces hypothetical/impossible conditions. The answer often starts with لَـ.',
        examples: [
          { arabic: 'لَوْ كُنْتُ غَنِيًّا لَاشْتَرَيْتُ بَيْتًا', transliteration: 'law kuntu ghaniyyan la-shtaraytu baytan', translation: 'If I were rich, I would buy a house', breakdown: 'لَوْ + past tense (condition) + لَـ + past tense (answer)' },
          { arabic: 'لَوْ أَنَّهُمْ آمَنُوا', transliteration: 'law annahum āmanū', translation: 'If they had believed…', breakdown: 'Qur\'anic hypothetical' },
        ],
        tip: 'لَوْ always implies the condition did NOT happen — it\'s counterfactual.'
      },
      {
        title: 'Other Conditional Particles',
        titleAr: 'أدوات الشرط الأخرى',
        explanation: 'Arabic has other conditional words: مَنْ (whoever), مَا (whatever), مَتَى (whenever), أَيْنَمَا (wherever).',
        examples: [
          { arabic: 'مَنْ يَعْمَلْ خَيْرًا يَجِدْهُ', transliteration: 'man yaʿmal khayran yajidhu', translation: 'Whoever does good will find it', breakdown: 'Both verbs are مجزوم' },
        ],
      },
    ],
    quiz: [
      { question: 'إِنْ makes both verbs:', options: ['منصوب', 'مجزوم', 'مرفوع', 'مبني'], correctIndex: 1, explanation: 'إِنْ is a jussive conditional particle — both verbs become مجزوم.' },
      { question: 'لَوْ indicates:', options: ['A real future condition', 'A past fact', 'A hypothetical/unreal condition', 'A command'], correctIndex: 2, explanation: 'لَوْ introduces counterfactual conditions — things that didn\'t happen.' },
    ],
  },

  'quranic-verb-patterns': {
    slug: 'quranic-verb-patterns',
    name: 'Qur\'anic Verb Patterns',
    nameAr: 'أَوزان القُرآن',
    intro: 'The Qur\'an uses all ten verb forms extensively. Understanding these patterns unlocks deep comprehension of Qur\'anic Arabic. Here we explore the most frequent forms with real Qur\'anic examples.',
    sections: [
      {
        title: 'Most Frequent Forms in the Qur\'an',
        titleAr: 'أكثر الأوزان في القرآن',
        explanation: 'Forms I, IV, VIII, and X are the most common in the Qur\'an. Each carries specific meaning nuances.',
        examples: [
          { arabic: 'آمَنَ (IV)', transliteration: 'āmana', translation: 'to believe', breakdown: 'Root: أ-م-ن → Form IV adds causative meaning: "to make oneself safe" = to believe' },
          { arabic: 'اِسْتَغْفَرَ (X)', transliteration: 'istaghfara', translation: 'to seek forgiveness', breakdown: 'Root: غ-ف-ر → Form X = "to seek" the root meaning' },
          { arabic: 'اِتَّقَى (VIII)', transliteration: 'ittaqā', translation: 'to be conscious of God', breakdown: 'Root: و-ق-ي → Form VIII = reflexive protection' },
          { arabic: 'تَوَكَّلَ (V)', transliteration: 'tawakkala', translation: 'to put trust (in Allah)', breakdown: 'Root: و-ك-ل → Form V = reflexive of Form II' },
        ],
        tip: 'Learning verb forms transforms Qur\'anic reading — you\'ll start seeing patterns everywhere!'
      },
      {
        title: 'Semantic Shifts Across Forms',
        titleAr: 'تحولات المعنى',
        explanation: 'The same root can appear in multiple forms with related but different meanings.',
        examples: [
          { arabic: 'عَلِمَ → عَلَّمَ → تَعَلَّمَ', transliteration: 'ʿalima → ʿallama → taʿallama', translation: 'knew → taught → learned', breakdown: 'I (knew) → II (caused to know = taught) → V (reflexive of II = learned)' },
          { arabic: 'كَتَبَ → كَاتَبَ → اِكْتَتَبَ', transliteration: 'kataba → kātaba → iktataba', translation: 'wrote → corresponded → subscribed', breakdown: 'I → III (reciprocal) → VIII (reflexive)' },
          { arabic: 'نَزَلَ → أَنْزَلَ → نَزَّلَ → تَنَزَّلَ', transliteration: 'nazala → anzala → nazzala → tanazzala', translation: 'descended → sent down → sent down gradually → to descend (of angels)', breakdown: 'All used in Qur\'an for revelation!' },
        ],
      },
    ],
    quiz: [
      { question: 'آمَنَ (to believe) is which form?', options: ['Form I', 'Form II', 'Form IV', 'Form VIII'], correctIndex: 2, explanation: 'آمَنَ follows Form IV (أَفْعَلَ) — from root أ-م-ن.' },
      { question: 'What does Form X (اِسْتَفْعَلَ) generally mean?', options: ['Causing', 'Sharing', 'Seeking/requesting', 'Pretending'], correctIndex: 2, explanation: 'Form X typically means "to seek" the root meaning — اِسْتَغْفَرَ = to seek forgiveness.' },
      { question: 'عَلَّمَ → تَعَلَّمَ shows which relationship?', options: ['I → II', 'II → V', 'III → VI', 'IV → VII'], correctIndex: 1, explanation: 'Form V is the reflexive of Form II: "taught" → "learned (taught oneself)."' },
    ],
  },
};
