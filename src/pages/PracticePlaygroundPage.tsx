import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, RotateCcw, Shuffle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { quranicWords, QuranicWord } from "@/data/quranicWords";
import { allGrammarWords, GrammarWord } from "@/data/grammarModules";
import { useAccess } from "@/hooks/useAccess";
import { Paywall } from "@/components/Paywall";

// Unified word type for practice
interface PracticeWord {
  id: string;
  arabic: string;
  transliteration: string;
  english: string;
  source: "vocabulary" | "grammar";
}

interface Exercise {
  type: "match" | "select";
  question: PracticeWord;
  options: { text: string; isCorrect: boolean; id: string }[];
}

// Convert QuranicWord to PracticeWord
const convertQuranicWord = (word: QuranicWord): PracticeWord => ({
  id: `q-${word.id}`,
  arabic: word.arabic,
  transliteration: word.transliteration,
  english: word.english,
  source: "vocabulary",
});

// Convert GrammarWord to PracticeWord
const convertGrammarWord = (word: GrammarWord): PracticeWord => ({
  id: `g-${word.id}`,
  arabic: word.arabic,
  transliteration: word.transliteration,
  english: word.english,
  source: "grammar",
});

// Shuffle array helper
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function PracticePlaygroundPage() {
  const { user, hasAccess, loading: accessLoading, redeemCode } = useAccess();
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(20);
  const [sessionKey, setSessionKey] = useState(0);

  // Combine all words from both sources
  const allWords = useMemo(() => {
    const vocabWords = quranicWords.map(convertQuranicWord);
    const grammarWordsConverted = allGrammarWords.map(convertGrammarWord);
    return [...vocabWords, ...grammarWordsConverted];
  }, []);

  // Generate exercises
  const exercises = useMemo(() => {
    const shuffledWords = shuffleArray(allWords);
    const selectedWords = shuffledWords.slice(0, Math.min(exerciseCount, shuffledWords.length));
    const generated: Exercise[] = [];

    selectedWords.forEach((word) => {
      const otherWords = allWords.filter((w) => w.id !== word.id);
      const randomOptions = shuffleArray(otherWords)
        .slice(0, 3)
        .map((w) => ({ text: w.english, isCorrect: false, id: w.id }));

      const options = shuffleArray([
        { text: word.english, isCorrect: true, id: word.id },
        ...randomOptions,
      ]);

      generated.push({
        type: "match",
        question: word,
        options,
      });

      // Add select type (Arabic for English)
      const arabicOptions = shuffleArray([
        { text: word.arabic, isCorrect: true, id: word.id },
        ...shuffleArray(otherWords)
          .slice(0, 3)
          .map((w) => ({ text: w.arabic, isCorrect: false, id: w.id })),
      ]);

      generated.push({
        type: "select",
        question: word,
        options: arabicOptions,
      });
    });

    return shuffleArray(generated).slice(0, exerciseCount);
  }, [allWords, exerciseCount, sessionKey]);

  const currentExercise = exercises[currentExerciseIndex];
  const progress = exercises.length > 0 ? ((currentExerciseIndex + 1) / exercises.length) * 100 : 0;

  const handleAnswer = (optionId: string) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(optionId);
    const correct = currentExercise.options.find((o) => o.id === optionId)?.isCorrect || false;
    setIsCorrect(correct);
    if (correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const handleRestart = () => {
    setSessionKey((k) => k + 1);
    setCurrentExerciseIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
  };

  const handleStartSession = () => {
    setSessionStarted(true);
    handleRestart();
  };

  const isComplete = currentExerciseIndex === exercises.length - 1 && selectedAnswer !== null;
  const finalScore = Math.round((score / exercises.length) * 100);

  if (accessLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="text-center mb-8">
              <h1 className="font-arabic text-4xl text-primary mb-2">ملعب الممارسة</h1>
              <h2 className="font-english text-2xl text-foreground mb-4">Practice Playground</h2>
              <p className="text-muted-foreground">
                Practice all vocabulary from every module in one place.
              </p>
            </div>
            <Paywall onRedeem={redeemCode} isLoggedIn={!!user} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {!sessionStarted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              {/* Title */}
              <div className="mb-8">
                <h1 className="font-arabic text-5xl md:text-6xl text-primary mb-3">ملعب الممارسة</h1>
                <h2 className="font-english text-2xl md:text-3xl text-foreground mb-4">
                  Practice Playground
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Practice vocabulary from all modules combined. Test your recognition of{" "}
                  <span className="text-primary font-semibold">{allWords.length}</span> words.
                </p>
              </div>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-4 my-8">
                <div className="h-px w-16 bg-border" />
                <BookOpen className="w-5 h-5 text-gold" />
                <div className="h-px w-16 bg-border" />
              </div>

              {/* Exercise count selector */}
              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-3">Number of questions:</p>
                <div className="flex justify-center gap-3 flex-wrap">
                  {[10, 20, 30, 50].map((count) => (
                    <Button
                      key={count}
                      variant={exerciseCount === count ? "default" : "outline"}
                      onClick={() => setExerciseCount(count)}
                      className="min-w-[60px]"
                    >
                      {count}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Start button */}
              <Button onClick={handleStartSession} size="lg" className="px-12">
                <Shuffle className="w-4 h-4 mr-2" />
                Start Practice
              </Button>
            </motion.div>
          ) : isComplete ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              {/* Completion screen */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-12 h-12 text-primary" />
              </div>

              <h2 className="font-arabic text-3xl text-primary mb-2">أحسنت</h2>
              <h3 className="font-english text-xl text-foreground mb-6">Practice Complete!</h3>

              <div className="bg-card border border-border rounded-xl p-6 max-w-sm mx-auto mb-8">
                <p className="text-muted-foreground mb-2">Your Score</p>
                <p className="text-5xl font-semibold text-foreground mb-1">{finalScore}%</p>
                <p className="text-sm text-muted-foreground">
                  {score} correct out of {exercises.length}
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <Button onClick={handleRestart} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Practice Again
                </Button>
                <Button onClick={() => setSessionStarted(false)}>
                  New Session
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="min-h-[70vh] flex flex-col">
              {/* Progress Bar */}
              <div className="w-full h-1 bg-muted rounded-full overflow-hidden mb-6">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-gold"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Score and Counter */}
              <div className="flex justify-between items-center mb-6 px-2">
                <span className="text-muted-foreground font-ui text-sm">
                  Question {currentExerciseIndex + 1} of {exercises.length}
                </span>
                <span className="text-primary font-ui font-semibold text-sm">
                  Score: {score}/{currentExerciseIndex + (selectedAnswer !== null ? 1 : 0)}
                </span>
              </div>

              {/* Exercise Content */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${sessionKey}-${currentExerciseIndex}`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Question */}
                      <div className="text-center mb-8">
                        {currentExercise?.type === "match" ? (
                          <>
                            <p className="text-muted-foreground font-ui mb-3 text-sm">
                              What does this word mean?
                            </p>
                            <h2 className="font-arabic text-5xl md:text-7xl text-foreground">
                              {currentExercise.question.arabic}
                            </h2>
                            <p className="text-gold font-ui italic mt-2">
                              {currentExercise.question.transliteration}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-muted-foreground font-ui mb-3 text-sm">
                              Select the Arabic word for:
                            </p>
                            <h2 className="font-english text-2xl md:text-3xl text-foreground">
                              "{currentExercise?.question.english}"
                            </h2>
                          </>
                        )}
                      </div>

                      {/* Options */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentExercise?.options.map((option) => {
                          const isSelected = selectedAnswer === option.id;
                          const showResult = selectedAnswer !== null;

                          let bgClass = "bg-card border-border hover:border-primary/50";
                          if (showResult) {
                            if (option.isCorrect) {
                              bgClass = "bg-primary/10 border-primary";
                            } else if (isSelected && !option.isCorrect) {
                              bgClass = "bg-destructive/10 border-destructive";
                            } else {
                              bgClass = "bg-card border-border opacity-50";
                            }
                          }

                          return (
                            <motion.button
                              key={option.id}
                              whileHover={!showResult ? { scale: 1.02 } : {}}
                              whileTap={!showResult ? { scale: 0.98 } : {}}
                              onClick={() => handleAnswer(option.id)}
                              disabled={selectedAnswer !== null}
                              className={`p-5 rounded-xl border transition-all duration-200 ${bgClass} ${
                                currentExercise?.type === "select"
                                  ? "font-arabic text-2xl md:text-3xl"
                                  : "font-ui text-base"
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

                      {/* Feedback */}
                      <AnimatePresence>
                        {selectedAnswer !== null && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 text-center"
                          >
                            <p
                              className={`text-base font-ui ${
                                isCorrect ? "text-primary" : "text-destructive"
                              }`}
                            >
                              {isCorrect ? "Excellent! ✓" : "Not quite. Keep practicing."}
                            </p>

                            <Button onClick={handleNext} className="mt-4 px-8" size="lg">
                              {currentExerciseIndex < exercises.length - 1 ? (
                                <>
                                  Next
                                  <ArrowRight className="ml-2 w-4 h-4" />
                                </>
                              ) : (
                                "See Results"
                              )}
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
