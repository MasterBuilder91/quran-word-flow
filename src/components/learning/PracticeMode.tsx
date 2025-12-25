import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuranicWord } from "@/data/quranicWords";

interface PracticeModeProps {
  words: QuranicWord[];
  onComplete: () => void;
}

type ExerciseType = "match" | "select" | "context";

interface Exercise {
  type: ExerciseType;
  question: QuranicWord;
  options: { text: string; isCorrect: boolean; id: number }[];
}

export const PracticeMode = ({ words, onComplete }: PracticeModeProps) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  // Generate exercises from words
  const exercises = useMemo(() => {
    const generated: Exercise[] = [];
    
    words.forEach((word, idx) => {
      // Match Arabic to English
      const otherWords = words.filter((_, i) => i !== idx);
      const randomOptions = otherWords
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => ({ text: w.english, isCorrect: false, id: w.id }));
      
      const options = [
        { text: word.english, isCorrect: true, id: word.id },
        ...randomOptions
      ].sort(() => Math.random() - 0.5);

      generated.push({
        type: "match",
        question: word,
        options,
      });

      // Select Arabic for English (if we have enough words)
      if (words.length >= 4) {
        const arabicOptions = [
          { text: word.arabic, isCorrect: true, id: word.id },
          ...otherWords
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(w => ({ text: w.arabic, isCorrect: false, id: w.id }))
        ].sort(() => Math.random() - 0.5);

        generated.push({
          type: "select",
          question: word,
          options: arabicOptions,
        });
      }
    });

    return generated.sort(() => Math.random() - 0.5).slice(0, Math.min(15, generated.length));
  }, [words]);

  const currentExercise = exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / exercises.length) * 100;

  const handleAnswer = (optionId: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(optionId);
    const correct = currentExercise.options.find(o => o.id === optionId)?.isCorrect || false;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      onComplete();
    }
  };

  if (!currentExercise) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">Loading exercises...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-muted rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-gold"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Score and Counter */}
      <div className="flex justify-between items-center mb-8 px-4">
        <span className="text-muted-foreground font-ui">
          Question {currentExerciseIndex + 1} of {exercises.length}
        </span>
        <span className="text-primary font-ui font-semibold">
          Score: {score}/{currentExerciseIndex + (selectedAnswer !== null ? 1 : 0)}
        </span>
      </div>

      {/* Exercise Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExerciseIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question */}
              <div className="text-center mb-10">
                {currentExercise.type === "match" ? (
                  <>
                    <p className="text-muted-foreground font-ui mb-4">
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
                    <p className="text-muted-foreground font-ui mb-4">
                      Select the Arabic word for:
                    </p>
                    <h2 className="font-english text-3xl md:text-4xl text-foreground">
                      "{currentExercise.question.english}"
                    </h2>
                  </>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentExercise.options.map((option) => {
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
                      className={`p-6 rounded-xl border transition-all duration-200 ${bgClass} ${
                        currentExercise.type === "select" ? "font-arabic text-3xl" : "font-ui text-lg"
                      } text-foreground`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option.text}</span>
                        {showResult && option.isCorrect && (
                          <Check className="w-6 h-6 text-primary" />
                        )}
                        {showResult && isSelected && !option.isCorrect && (
                          <X className="w-6 h-6 text-destructive" />
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
                    className="mt-8 text-center"
                  >
                    <p className={`text-lg font-ui ${isCorrect ? 'text-primary' : 'text-destructive'}`}>
                      {isCorrect ? "Excellent! ✓" : "Not quite. Try to remember this one."}
                    </p>
                    
                    <Button onClick={handleNext} className="mt-6 px-8" size="lg">
                      {currentExerciseIndex < exercises.length - 1 ? (
                        <>
                          Next
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      ) : (
                        "Complete Practice"
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
  );
};
