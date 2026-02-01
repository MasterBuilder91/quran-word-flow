import { useState, useMemo } from "react";
import { GrammarWord } from "@/data/grammarModules";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Check, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioButton } from "@/components/ui/AudioButton";

interface GrammarQuizModeProps {
  words: GrammarWord[];
  onComplete: (passed: boolean) => void;
  passingScore?: number;
}

interface Question {
  word: GrammarWord;
  options: string[];
}

export const GrammarQuizMode = ({ words, onComplete, passingScore = 70 }: GrammarQuizModeProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<{ correct: boolean; wordId: number }[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Generate quiz questions
  const questions = useMemo(() => {
    return shuffleArray(words).slice(0, Math.min(10, words.length)).map(word => ({
      word,
      options: shuffleArray([
        word.english,
        ...getRandomOptions(words, word.id, 3)
      ])
    }));
  }, [words]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.word.english;
    setAnswers(prev => [...prev, { correct: isCorrect, wordId: currentQuestion.word.id }]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    const correct = answers.filter(a => a.correct).length;
    return Math.round((correct / questions.length) * 100);
  };

  const finalScore = showResults ? calculateScore() : 0;
  const passed = finalScore >= passingScore;

  // Results Screen
  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center py-8"
      >
        <div className="mb-8">
          <ProgressRing progress={finalScore} size={160} strokeWidth={12}>
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">{finalScore}%</p>
              <p className="text-sm text-muted-foreground">Score</p>
            </div>
          </ProgressRing>
        </div>


        <h2 className="text-3xl font-english font-semibold text-foreground mb-2">
          {passed ? "Congratulations! 🎉" : "Keep Practicing!"}
        </h2>
        <p className="text-muted-foreground mb-8">
          {passed 
            ? "You've demonstrated mastery of this grammar lesson!"
            : `You need ${passingScore}% to pass. Review the material and try again.`
          }
        </p>

        {/* Score Breakdown */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-2xl font-semibold text-green-500">
                {answers.filter(a => a.correct).length}
              </p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold text-red-500">
                {answers.filter(a => !a.correct).length}
              </p>
              <p className="text-sm text-muted-foreground">Incorrect</p>
            </div>
          </div>
        </div>

        <Button size="lg" onClick={() => onComplete(passed)} className="px-12">
          {passed ? "Continue" : "Try Again"}
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <span>Quiz Progress</span>
          <span>{currentQuestionIndex + 1} of {questions.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-card border border-border rounded-2xl p-8 mb-8"
        >
          {/* Question */}
          <div className="text-center mb-8">
            <p className="text-sm text-muted-foreground mb-4">
              What does this mean?
            </p>
            <p className="text-5xl md:text-6xl font-arabic text-primary mb-2">
              {currentQuestion.word.arabic}
            </p>
            <div className="flex items-center justify-center gap-3">
              <p className="text-sm text-muted-foreground italic">
                {currentQuestion.word.transliteration}
              </p>
              <AudioButton 
                text={currentQuestion.word.arabic} 
                iconOnly 
              />
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = option === currentQuestion.word.english;
              const showResult = selectedAnswer !== null;

              let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all ";
              
              if (showResult) {
                if (isCorrectAnswer) {
                  buttonClass += "border-green-500 bg-green-500/10";
                } else if (isSelected && !isCorrectAnswer) {
                  buttonClass += "border-red-500 bg-red-500/10";
                } else {
                  buttonClass += "border-border opacity-50";
                }
              } else {
                buttonClass += "border-border hover:border-primary hover:bg-primary/5";
              }

              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">{option}</span>
                    {showResult && isCorrectAnswer && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                    {showResult && isSelected && !isCorrectAnswer && (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next Button */}
      {selectedAnswer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Button onClick={handleNext} size="lg">
            {currentQuestionIndex === questions.length - 1 ? "See Results" : "Next Question"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

// Helper functions
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomOptions(
  words: GrammarWord[],
  excludeId: number,
  count: number
): string[] {
  const filtered = words.filter(w => w.id !== excludeId);
  const shuffled = shuffleArray(filtered);
  return shuffled.slice(0, count).map(w => w.english);
}
