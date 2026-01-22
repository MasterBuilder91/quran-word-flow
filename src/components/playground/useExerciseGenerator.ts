import { useMemo, useCallback } from 'react';
import { 
  Exercise, 
  ExerciseType, 
  PracticeWord, 
  SessionConfig,
  ExerciseOption,
  Difficulty,
  DIFFICULTY_CONFIG
} from './types';

// Shuffle array helper
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

export const useExerciseGenerator = (words: PracticeWord[]) => {
  const generateOptions = useCallback((
    correctWord: PracticeWord,
    allWords: PracticeWord[],
    field: 'arabic' | 'english' | 'transliteration',
    count: number = 4
  ): ExerciseOption[] => {
    const otherWords = allWords.filter(w => w.id !== correctWord.id);
    const distractors = shuffleArray(otherWords)
      .slice(0, count - 1)
      .map(w => ({
        id: w.id,
        text: w[field],
        isCorrect: false,
      }));

    return shuffleArray([
      { id: correctWord.id, text: correctWord[field], isCorrect: true },
      ...distractors,
    ]);
  }, []);

  const generateArabicToEnglish = useCallback((word: PracticeWord, allWords: PracticeWord[]): Exercise => ({
    id: generateId(),
    type: 'arabic-to-english',
    question: word,
    options: generateOptions(word, allWords, 'english'),
    correctAnswer: word.id,
    points: 10,
  }), [generateOptions]);

  const generateEnglishToArabic = useCallback((word: PracticeWord, allWords: PracticeWord[]): Exercise => ({
    id: generateId(),
    type: 'english-to-arabic',
    question: word,
    options: generateOptions(word, allWords, 'arabic'),
    correctAnswer: word.id,
    points: 10,
  }), [generateOptions]);

  const generateTransliteration = useCallback((word: PracticeWord, allWords: PracticeWord[]): Exercise => ({
    id: generateId(),
    type: 'transliteration',
    question: word,
    options: generateOptions(word, allWords, 'transliteration'),
    correctAnswer: word.id,
    points: 15,
  }), [generateOptions]);

  const generateSpeedFlash = useCallback((word: PracticeWord, allWords: PracticeWord[]): Exercise => ({
    id: generateId(),
    type: 'speed-flash',
    question: word,
    options: generateOptions(word, allWords, 'english'),
    correctAnswer: word.id,
    timeLimit: 5,
    points: 20,
  }), [generateOptions]);

  const generateLetterRecognition = useCallback((word: PracticeWord, allWords: PracticeWord[]): Exercise => ({
    id: generateId(),
    type: 'letter-recognition',
    question: word,
    options: generateOptions(word, allWords, 'english'),
    correctAnswer: word.id,
    points: 5,
  }), [generateOptions]);

  const generateTyping = useCallback((word: PracticeWord): Exercise => ({
    id: generateId(),
    type: 'typing',
    question: word,
    options: [],
    correctAnswer: word.arabic,
    points: 25,
  }), []);

  const generateExercise = useCallback((
    word: PracticeWord, 
    type: ExerciseType, 
    allWords: PracticeWord[]
  ): Exercise => {
    switch (type) {
      case 'arabic-to-english':
        return generateArabicToEnglish(word, allWords);
      case 'english-to-arabic':
        return generateEnglishToArabic(word, allWords);
      case 'transliteration':
        return generateTransliteration(word, allWords);
      case 'speed-flash':
        return generateSpeedFlash(word, allWords);
      case 'letter-recognition':
        return generateLetterRecognition(word, allWords);
      case 'typing':
        return generateTyping(word);
      default:
        return generateArabicToEnglish(word, allWords);
    }
  }, [generateArabicToEnglish, generateEnglishToArabic, generateTransliteration, generateSpeedFlash, generateLetterRecognition, generateTyping]);

  const generateSession = useCallback((config: SessionConfig): Exercise[] => {
    if (words.length === 0) return [];

    const shuffledWords = shuffleArray(words);
    const selectedWords = shuffledWords.slice(0, Math.min(config.exerciseCount, shuffledWords.length));
    const exercises: Exercise[] = [];

    // Get available exercise types (filter out types that need special content)
    let availableTypes = config.exerciseTypes.filter(type => {
      if (type === 'letter-recognition') {
        return words.some(w => w.source === 'letters');
      }
      return true;
    });

    // Fallback to basic types if no types available
    if (availableTypes.length === 0) {
      availableTypes = ['arabic-to-english', 'english-to-arabic'];
    }

    selectedWords.forEach((word, index) => {
      // Rotate through available exercise types
      const type = availableTypes[index % availableTypes.length];
      const exercise = generateExercise(word, type, words);
      
      // Apply difficulty multiplier to points
      const multiplier = DIFFICULTY_CONFIG[config.difficulty].multiplier;
      exercise.points = Math.round(exercise.points * multiplier);
      
      // Apply time limits for speed mode
      if (config.gameMode === 'speed' && !exercise.timeLimit) {
        exercise.timeLimit = config.difficulty === 'easy' ? 15 : config.difficulty === 'medium' ? 10 : 7;
      }
      
      exercises.push(exercise);
    });

    return shuffleArray(exercises);
  }, [words, generateExercise]);

  return {
    generateSession,
    generateExercise,
  };
};
