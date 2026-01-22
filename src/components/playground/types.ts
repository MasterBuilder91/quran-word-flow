// Practice Playground Types

export type ExerciseType = 
  | 'arabic-to-english'    // Show Arabic, pick English
  | 'english-to-arabic'    // Show English, pick Arabic
  | 'listening'            // Hear word, pick Arabic/English
  | 'fill-blank'           // Fill in missing word
  | 'typing'               // Type the Arabic word
  | 'root-match'           // Match words with same root
  | 'sentence-order'       // Arrange words in order
  | 'speed-flash'          // Quick recognition
  | 'letter-recognition'   // Identify Arabic letters
  | 'transliteration';     // Match Arabic to transliteration

export type GameMode = 
  | 'classic'      // Standard practice
  | 'speed'        // Timed challenges
  | 'survival'     // Lives-based
  | 'marathon'     // Endless mode
  | 'review';      // Focus on missed words

export type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed';

export type ContentSource = 
  | 'vocabulary'   // Qur'anic words
  | 'grammar'      // Grammar modules
  | 'heritage'     // Heritage phrases
  | 'letters'      // Arabic alphabet
  | 'all';         // All sources combined

export interface PracticeWord {
  id: string;
  arabic: string;
  transliteration: string;
  english: string;
  source: ContentSource;
  category?: string;
  difficulty?: Difficulty;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: PracticeWord;
  options: ExerciseOption[];
  correctAnswer: string;
  timeLimit?: number; // in seconds
  points: number;
}

export interface ExerciseOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface SessionStats {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  streak: number;
  longestStreak: number;
  averageTime: number;
  totalTime: number;
  pointsEarned: number;
  exerciseTypeBreakdown: Record<ExerciseType, { correct: number; total: number }>;
  missedWords: PracticeWord[];
}

export interface SessionConfig {
  exerciseCount: number;
  exerciseTypes: ExerciseType[];
  contentSources: ContentSource[];
  difficulty: Difficulty;
  gameMode: GameMode;
  timeLimit?: number;
  lives?: number;
}

export const EXERCISE_TYPE_LABELS: Record<ExerciseType, { name: string; icon: string; description: string }> = {
  'arabic-to-english': { name: 'Arabic → English', icon: '🔤', description: 'See Arabic, choose English meaning' },
  'english-to-arabic': { name: 'English → Arabic', icon: '🔠', description: 'See English, choose Arabic word' },
  'listening': { name: 'Listening', icon: '👂', description: 'Hear the word, identify it' },
  'fill-blank': { name: 'Fill in Blank', icon: '✏️', description: 'Complete the sentence' },
  'typing': { name: 'Typing', icon: '⌨️', description: 'Type the Arabic word' },
  'root-match': { name: 'Root Patterns', icon: '🌳', description: 'Match words with same root' },
  'sentence-order': { name: 'Word Order', icon: '📝', description: 'Arrange words correctly' },
  'speed-flash': { name: 'Speed Flash', icon: '⚡', description: 'Quick recognition challenge' },
  'letter-recognition': { name: 'Letters', icon: 'أ', description: 'Identify Arabic letters' },
  'transliteration': { name: 'Transliteration', icon: '🔊', description: 'Match Arabic to pronunciation' },
};

export const GAME_MODE_CONFIG: Record<GameMode, { name: string; icon: string; description: string }> = {
  'classic': { name: 'Classic', icon: '📚', description: 'Standard practice at your own pace' },
  'speed': { name: 'Speed Challenge', icon: '⏱️', description: 'Race against the clock' },
  'survival': { name: 'Survival', icon: '❤️', description: '3 lives - how far can you go?' },
  'marathon': { name: 'Marathon', icon: '🏃', description: 'Endless practice session' },
  'review': { name: 'Review Mode', icon: '🔄', description: 'Focus on words you missed' },
};

export const DIFFICULTY_CONFIG: Record<Difficulty, { name: string; color: string; multiplier: number }> = {
  'easy': { name: 'Easy', color: 'text-green-500', multiplier: 1 },
  'medium': { name: 'Medium', color: 'text-yellow-500', multiplier: 1.5 },
  'hard': { name: 'Hard', color: 'text-red-500', multiplier: 2 },
  'mixed': { name: 'Mixed', color: 'text-purple-500', multiplier: 1.5 },
};

export const CONTENT_SOURCE_LABELS: Record<ContentSource, { name: string; icon: string; count?: number }> = {
  'vocabulary': { name: 'Vocabulary', icon: '📖' },
  'grammar': { name: 'Grammar', icon: '📐' },
  'heritage': { name: 'Heritage', icon: '🏛️' },
  'letters': { name: 'Letters', icon: 'أ' },
  'all': { name: 'All Sources', icon: '🌟' },
};
