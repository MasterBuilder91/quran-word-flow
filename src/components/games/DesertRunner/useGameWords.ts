import { useMemo } from 'react';
import { quranicWords } from '@/data/quranicWords';
import { GameWord } from './types';

// Shuffle helper
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useGameWords = () => {
  const words = useMemo<GameWord[]>(() => {
    return quranicWords.map(w => ({
      id: `word-${w.id}`,
      arabic: w.arabic,
      english: w.english,
      transliteration: w.transliteration,
    }));
  }, []);

  const getRandomWord = (): GameWord => {
    return words[Math.floor(Math.random() * words.length)];
  };

  const getQuestion = (): { question: GameWord; correctAnswer: GameWord; wrongAnswers: GameWord[] } => {
    const shuffled = shuffleArray(words);
    const question = shuffled[0];
    const wrongAnswers = shuffled.slice(1, 4);
    
    return {
      question,
      correctAnswer: question,
      wrongAnswers,
    };
  };

  const getWordOptions = (correctWord: GameWord, count: number = 3): GameWord[] => {
    const others = words.filter(w => w.id !== correctWord.id);
    const shuffled = shuffleArray(others).slice(0, count - 1);
    return shuffleArray([correctWord, ...shuffled]);
  };

  return {
    words,
    getRandomWord,
    getQuestion,
    getWordOptions,
  };
};
