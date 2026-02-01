import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Trophy, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuranicWord } from "@/data/quranicWords";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { AudioButton } from "@/components/ui/AudioButton";

interface QuizModeProps {
  words: QuranicWord[];
  onComplete: (passed: boolean, score: number) => void;
  passingScore?: number;
}

interface Question {
  word: QuranicWord;
  options: { text: string; isCorrect: boolean; id: number }[];
  weight: number; // Based on frequency
}

export const QuizMode = ({ words, onComplete, passingScore = 70 }: QuizModeProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ correct: boolean; weight: number }[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Generate frequency-weighted questions
  const questions = useMemo(() => {
    const maxOccurrences = Math.max(...words.map(w => w.occurrences));
    
    return words.map((word) => {
      const otherWords = words.filter(w => w.id !== word.id);
      const options = [
        { text: word.english, isCorrect: true, id: word.id },
        ...otherWords
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(w => ({ text: w.english, isCorrect: false, id: w.id }))
      ].sort(() => Math.random() - 0.5);

      return {
        word,
        options,
        weight: word.occurrences / maxOccurrences, // Normalize to 0-1
      };
    }).sort(() => Math.random() - 0.5);
  }, [words]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (optionId: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(optionId);
    const correct = currentQuestion.options.find(o => o.id === optionId)?.isCorrect || false;
    setAnswers([...answers, { correct, weight: currentQuestion.weight }]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  // Calculate weighted score
  const calculateScore = () => {
    if (answers.length === 0) return 0;
    
    const totalWeight = answers.reduce((sum, a) => sum + a.weight, 0);
    const correctWeight = answers
      .filter(a => a.correct)
      .reduce((sum, a) => sum + a.weight, 0);
    
    return Math.round((correctWeight / totalWeight) * 100);
  };

  const finalScore = calculateScore();
  const passed = finalScore >= passingScore;

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[80vh] flex items-center justify-center"
      >
        <div className="text-center px-4">
          {/* Result Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
              passed ? 'bg-primary/10' : 'bg-muted'
            }`}
          >
            {passed ? (
              <Trophy className="w-12 h-12 text-primary" />
            ) : (
              <span className="text-4xl">📚</span>
            )}
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-english font-semibold text-foreground mb-2"
          >
            {passed ? "Congratulations!" : "Keep Learning"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground font-ui mb-8"
          >
            {passed 
              ? "You've demonstrated strong recognition of these words." 
              : "A bit more practice will help these words become familiar."}
          </motion.p>

          {/* Score Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <ProgressRing progress={finalScore} size={160} strokeWidth={12}>
              <div className="text-center">
                <p className="text-4xl font-semibold text-foreground">{finalScore}%</p>
                <p className="text-sm text-muted-foreground">Score</p>
              </div>
            </ProgressRing>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-8 mb-8"
          >
            <div>
              <p className="text-2xl font-semibold text-primary">
                {answers.filter(a => a.correct).length}
              </p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-muted-foreground">
                {answers.filter(a => !a.correct).length}
              </p>
              <p className="text-sm text-muted-foreground">Incorrect</p>
            </div>
          </motion.div>

          <OrnamentalDivider symbol="۞" />

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Button
              onClick={() => onComplete(passed, finalScore)}
              size="lg"
              className={passed ? "bg-primary" : "bg-muted text-muted-foreground"}
            >
              {passed ? "Continue to Next Module" : "Review Words Again"}
            </Button>
          </motion.div>

          {!passed && (
            <p className="text-sm text-muted-foreground mt-4">
              You need {passingScore}% to unlock the next module
            </p>
          )}
        </div>
      </motion.div>
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

      {/* Question Counter */}
      <div className="text-center mb-8">
        <span className="text-muted-foreground font-ui">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
        {currentQuestion && (
          <span className="ml-4 text-gold text-sm">
            Weight: {Math.round(currentQuestion.weight * 100)}%
          </span>
        )}
      </div>

      {/* Question Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question */}
              <div className="text-center mb-10">
                <p className="text-muted-foreground font-ui mb-4">
                  What does this word mean?
                </p>
                <h2 className="font-arabic text-5xl md:text-7xl text-foreground">
                  {currentQuestion.word.arabic}
                </h2>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <AudioButton 
                    text={currentQuestion.word.arabic} 
                    showLabel
                    label="Listen"
                    variant="ghost"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option) => {
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
                      className={`p-6 rounded-xl border transition-all duration-200 ${bgClass} font-ui text-lg text-foreground`}
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

              {/* Next Button */}
              <AnimatePresence>
                {selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-8 text-center"
                  >
                    <Button onClick={handleNext} className="px-8" size="lg">
                      {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
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
