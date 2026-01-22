import { useMemo } from 'react';
import { quranicWords, QuranicWord } from '@/data/quranicWords';
import { allGrammarWords, GrammarWord } from '@/data/grammarModules';
import { heritageCorePhrases, heritageFunctionalPhrases, HeritagePhrase } from '@/data/heritagePhrasesData';
import { arabicLetters, ArabicLetter } from '@/data/arabicReadingCourse';
import { PracticeWord, ContentSource, Difficulty } from './types';

// Convert QuranicWord to PracticeWord
const convertQuranicWord = (word: QuranicWord): PracticeWord => ({
  id: `vocab-${word.id}`,
  arabic: word.arabic,
  transliteration: word.transliteration,
  english: word.english,
  source: 'vocabulary',
  category: word.type,
  difficulty: word.occurrences > 200 ? 'easy' : word.occurrences > 50 ? 'medium' : 'hard',
});

// Convert GrammarWord to PracticeWord
const convertGrammarWord = (word: GrammarWord): PracticeWord => ({
  id: `grammar-${word.id}`,
  arabic: word.arabic,
  transliteration: word.transliteration,
  english: word.english,
  source: 'grammar',
  category: word.category,
  difficulty: 'medium',
});

// Convert HeritagePhrase to PracticeWord
const convertHeritagePhrase = (phrase: HeritagePhrase): PracticeWord => ({
  id: `heritage-${phrase.id}`,
  arabic: phrase.arabic,
  transliteration: phrase.transliteration,
  english: phrase.english,
  source: 'heritage',
  category: phrase.category,
  difficulty: phrase.frequency === 'core' ? 'easy' : phrase.frequency === 'essential' ? 'medium' : 'hard',
});

// Convert ArabicLetter to PracticeWord
const convertArabicLetter = (letter: ArabicLetter): PracticeWord => ({
  id: `letter-${letter.id}`,
  arabic: letter.arabic,
  transliteration: letter.transliteration,
  english: letter.name,
  source: 'letters',
  category: 'alphabet',
  difficulty: 'easy',
});

export const usePlaygroundData = () => {
  const allWords = useMemo(() => {
    const vocabWords = quranicWords.map(convertQuranicWord);
    const grammarWordsConverted = allGrammarWords.map(convertGrammarWord);
    const heritageWords = [...heritageCorePhrases, ...heritageFunctionalPhrases].map(convertHeritagePhrase);
    const letterWords = arabicLetters.map(convertArabicLetter);
    
    return {
      vocabulary: vocabWords,
      grammar: grammarWordsConverted,
      heritage: heritageWords,
      letters: letterWords,
      all: [...vocabWords, ...grammarWordsConverted, ...heritageWords, ...letterWords],
    };
  }, []);

  const getWordsBySource = (sources: ContentSource[]): PracticeWord[] => {
    if (sources.includes('all')) {
      return allWords.all;
    }
    
    const words: PracticeWord[] = [];
    sources.forEach(source => {
      if (source !== 'all' && allWords[source]) {
        words.push(...allWords[source]);
      }
    });
    return words;
  };

  const getWordsByDifficulty = (words: PracticeWord[], difficulty: Difficulty): PracticeWord[] => {
    if (difficulty === 'mixed') {
      return words;
    }
    return words.filter(w => w.difficulty === difficulty);
  };

  const stats = useMemo(() => ({
    vocabulary: allWords.vocabulary.length,
    grammar: allWords.grammar.length,
    heritage: allWords.heritage.length,
    letters: allWords.letters.length,
    total: allWords.all.length,
  }), [allWords]);

  return {
    allWords,
    getWordsBySource,
    getWordsByDifficulty,
    stats,
  };
};
