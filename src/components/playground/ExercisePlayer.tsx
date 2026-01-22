import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Clock, Heart, Zap, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Exercise, SessionStats, GameMode, ExerciseType, EXERCISE_TYPE_LABELS } from './types';

interface ExercisePlayerProps {
  exercises: Exercise[];
  gameMode: GameMode;
  onComplete: (stats: SessionStats) => void;
  onQuit: () => void;
}

export const ExercisePlayer = ({ exercises, gameMode, onComplete, onQuit }: ExercisePlayerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [totalTime, setTotalTime] = useState(0);
  const [missedWords, setMissedWords] = useState<typeof exercises[0]['question'][]>([]);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [exerciseBreakdown, setExerciseBreakdown] = useState<Record<ExerciseType, { correct: number; total: number }>>({} as any);
  const [sessionStartTime] = useState(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentExercise = exercises[currentIndex];
  const progress = exercises.length > 0 ? ((currentIndex + 1) / exercises.length) * 100 : 0;
  const isComplete = currentIndex >= exercises.length || (gameMode === 'survival' && lives <= 0);

  // Timer effect for speed mode
  useEffect(() => {
    if (gameMode === 'speed' && currentExercise?.timeLimit && selectedAnswer === null) {
      setTimeLeft(currentExercise.timeLimit);
      
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === null || prev <= 0) {
            clearInterval(interval);
            // Auto-fail on timeout
            if (selectedAnswer === null) {
              handleAnswer('__timeout__');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentIndex, gameMode, currentExercise?.timeLimit, selectedAnswer]);

  // Track total time
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTime(Math.floor((Date.now() - sessionStartTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [sessionStartTime]);

  // Reset question start time on new question
  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentIndex]);

  const handleAnswer = useCallback((answerId: string) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerId);
    
    const isTypingExercise = currentExercise.type === 'typing';
    let correct = false;

    if (isTypingExercise) {
      // For typing exercises, compare the typed answer with the correct Arabic
      correct = typedAnswer.trim() === currentExercise.correctAnswer.trim();
    } else {
      correct = currentExercise.options.find(o => o.id === answerId)?.isCorrect || false;
    }

    setIsCorrect(correct);

    // Update exercise breakdown
    setExerciseBreakdown(prev => {
      const type = currentExercise.type;
      const current = prev[type] || { correct: 0, total: 0 };
      return {
        ...prev,
        [type]: {
          correct: current.correct + (correct ? 1 : 0),
          total: current.total + 1,
        },
      };
    });

    if (correct) {
      const streakBonus = Math.min(streak, 5) * 2;
      const timeBonus = timeLeft ? Math.floor(timeLeft * 2) : 0;
      const points = currentExercise.points + streakBonus + timeBonus;
      
      setScore(s => s + points);
      setStreak(s => {
        const newStreak = s + 1;
        setLongestStreak(prev => Math.max(prev, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
      setMissedWords(prev => [...prev, currentExercise.question]);
      
      if (gameMode === 'survival') {
        setLives(l => l - 1);
      }
    }
  }, [selectedAnswer, currentExercise, streak, timeLeft, typedAnswer, gameMode]);

  const handleNext = useCallback(() => {
    if (currentIndex < exercises.length - 1 && !(gameMode === 'survival' && lives <= 0)) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setTypedAnswer('');
      setTimeLeft(null);
    } else {
      // Complete the session
      const stats: SessionStats = {
        totalQuestions: currentIndex + 1,
        correctAnswers: Object.values(exerciseBreakdown).reduce((sum, { correct }) => sum + correct, 0),
        incorrectAnswers: Object.values(exerciseBreakdown).reduce((sum, { correct, total }) => sum + (total - correct), 0),
        streak: streak,
        longestStreak: longestStreak,
        averageTime: totalTime / (currentIndex + 1),
        totalTime: totalTime,
        pointsEarned: score,
        exerciseTypeBreakdown: exerciseBreakdown,
        missedWords: missedWords,
      };
      onComplete(stats);
    }
  }, [currentIndex, exercises.length, gameMode, lives, exerciseBreakdown, streak, longestStreak, totalTime, score, missedWords, onComplete]);

  // Handle keyboard enter for next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && selectedAnswer !== null) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAnswer, handleNext]);

  if (!currentExercise) return null;

  const exerciseInfo = EXERCISE_TYPE_LABELS[currentExercise.type];

  return (
    <div className="min-h-[70vh] flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-4">
          {gameMode === 'survival' && (
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-5 h-5 ${i < lives ? 'text-red-500 fill-red-500' : 'text-muted-foreground'}`}
                />
              ))}
            </div>
          )}
          
          {gameMode === 'speed' && timeLeft !== null && (
            <div className={`flex items-center gap-1 ${timeLeft <= 3 ? 'text-red-500 animate-pulse' : 'text-muted-foreground'}`}>
              <Clock className="w-4 h-4" />
              <span className="font-mono font-semibold">{timeLeft}s</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {exerciseInfo.icon} {exerciseInfo.name}
          </div>
          
          {streak > 0 && (
            <motion.div
              key={streak}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1 text-gold"
            >
              <Zap className="w-4 h-4" />
              <span className="font-semibold">{streak}x</span>
            </motion.div>
          )}
          
          <div className="flex items-center gap-1 text-primary">
            <Trophy className="w-4 h-4" />
            <span className="font-semibold">{score}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-gold"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question Counter */}
      <div className="flex justify-between items-center mb-6 px-2">
        <span className="text-muted-foreground font-ui text-sm">
          Question {currentIndex + 1} of {exercises.length}
        </span>
        <Button variant="ghost" size="sm" onClick={onQuit}>
          Quit
        </Button>
      </div>

      {/* Exercise Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question */}
              <div className="text-center mb-8">
                {currentExercise.type === 'arabic-to-english' || 
                 currentExercise.type === 'speed-flash' ||
                 currentExercise.type === 'letter-recognition' ? (
                  <>
                    <p className="text-muted-foreground font-ui mb-3 text-sm">
                      What does this mean?
                    </p>
                    <h2 className="font-arabic text-5xl md:text-7xl text-foreground mb-2">
                      {currentExercise.question.arabic}
                    </h2>
                    <p className="text-gold font-ui italic">
                      {currentExercise.question.transliteration}
                    </p>
                  </>
                ) : currentExercise.type === 'english-to-arabic' ? (
                  <>
                    <p className="text-muted-foreground font-ui mb-3 text-sm">
                      Select the Arabic for:
                    </p>
                    <h2 className="font-english text-2xl md:text-4xl text-foreground">
                      "{currentExercise.question.english}"
                    </h2>
                  </>
                ) : currentExercise.type === 'transliteration' ? (
                  <>
                    <p className="text-muted-foreground font-ui mb-3 text-sm">
                      Match the pronunciation:
                    </p>
                    <h2 className="font-arabic text-5xl md:text-7xl text-foreground">
                      {currentExercise.question.arabic}
                    </h2>
                  </>
                ) : currentExercise.type === 'typing' ? (
                  <>
                    <p className="text-muted-foreground font-ui mb-3 text-sm">
                      Type the Arabic word for:
                    </p>
                    <h2 className="font-english text-2xl md:text-4xl text-foreground mb-4">
                      "{currentExercise.question.english}"
                    </h2>
                    <p className="text-gold font-ui italic text-lg">
                      ({currentExercise.question.transliteration})
                    </p>
                  </>
                ) : null}
              </div>

              {/* Options or Input */}
              {currentExercise.type === 'typing' ? (
                <div className="max-w-md mx-auto">
                  <input
                    type="text"
                    dir="rtl"
                    value={typedAnswer}
                    onChange={(e) => setTypedAnswer(e.target.value)}
                    disabled={selectedAnswer !== null}
                    placeholder="اكتب هنا..."
                    className="w-full text-3xl font-arabic text-center p-4 rounded-xl border bg-card focus:border-primary focus:outline-none disabled:opacity-50"
                    autoFocus
                  />
                  {selectedAnswer === null && (
                    <Button 
                      onClick={() => handleAnswer('__typed__')} 
                      className="w-full mt-4"
                      disabled={typedAnswer.trim() === ''}
                    >
                      Check Answer
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentExercise.options.map((option) => {
                    const isSelected = selectedAnswer === option.id;
                    const showResult = selectedAnswer !== null;

                    let bgClass = 'bg-card border-border hover:border-primary/50';
                    if (showResult) {
                      if (option.isCorrect) {
                        bgClass = 'bg-primary/10 border-primary';
                      } else if (isSelected && !option.isCorrect) {
                        bgClass = 'bg-destructive/10 border-destructive';
                      } else {
                        bgClass = 'bg-card border-border opacity-50';
                      }
                    }

                    const isArabicText = currentExercise.type === 'english-to-arabic';

                    return (
                      <motion.button
                        key={option.id}
                        whileHover={!showResult ? { scale: 1.02 } : {}}
                        whileTap={!showResult ? { scale: 0.98 } : {}}
                        onClick={() => handleAnswer(option.id)}
                        disabled={selectedAnswer !== null}
                        className={`p-5 rounded-xl border transition-all duration-200 ${bgClass} ${
                          isArabicText ? 'font-arabic text-2xl md:text-3xl' : 'font-ui text-base'
                        } text-foreground`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option.text}</span>
                          {showResult && option.isCorrect && (
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                          )}
                          {showResult && isSelected && !option.isCorrect && (
                            <X className="w-5 h-5 text-destructive flex-shrink-0" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* Feedback */}
              <AnimatePresence>
                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 text-center"
                  >
                    <div className="mb-4">
                      {isCorrect ? (
                        <div className="text-primary">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-4xl mb-2"
                          >
                            ✓
                          </motion.div>
                          <p className="font-semibold">
                            {streak >= 3 ? `${streak}x Streak! 🔥` : 'Correct!'}
                          </p>
                          {currentExercise.type === 'typing' && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {currentExercise.question.arabic}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="text-destructive">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-4xl mb-2"
                          >
                            ✗
                          </motion.div>
                          <p className="font-semibold">Not quite</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            <span className="font-arabic text-foreground text-lg">{currentExercise.question.arabic}</span>
                            {' = '}
                            <span className="text-foreground">{currentExercise.question.english}</span>
                          </p>
                        </div>
                      )}
                    </div>

                    <Button onClick={handleNext} className="px-8" size="lg">
                      {currentIndex < exercises.length - 1 ? (
                        <>
                          Next
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      ) : (
                        'See Results'
                      )}
                    </Button>
                    
                    <p className="text-xs text-muted-foreground mt-2">
                      Press Enter ↵
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
