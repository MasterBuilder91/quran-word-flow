import { useState, useMemo } from "react";
import { GrammarWord } from "@/data/grammarModules";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioButton } from "@/components/ui/AudioButton";

interface GrammarPracticeModeProps {
  words: GrammarWord[];
  onComplete: () => void;
}

type ExerciseType = "match-arabic" | "match-english" | "identify-category";

interface Exercise {
  type: ExerciseType;
  question: string;
  questionArabic?: string;
  correctAnswer: string;
  options: string[];
  wordId: number;
}

export const GrammarPracticeMode = ({ words, onComplete }: GrammarPracticeModeProps) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  // Generate exercises from words
  const exercises = useMemo(() => {
    const exerciseList: Exercise[] = [];
    
    words.forEach(word => {
      // Match Arabic to English
      exerciseList.push({
        type: "match-arabic",
        question: word.arabic,
        correctAnswer: word.english,
        options: shuffleArray([
          word.english,
          ...getRandomOptions(words, word.id, "english", 3)
        ]),
        wordId: word.id
      });

      // Match English to Arabic
      exerciseList.push({
        type: "match-english",
        question: `What is "${word.english}" in Arabic?`,
        correctAnswer: word.arabic,
        options: shuffleArray([
          word.arabic,
          ...getRandomOptions(words, word.id, "arabic", 3)
        ]),
        wordId: word.id
      });
    });

    return shuffleArray(exerciseList).slice(0, Math.min(15, exerciseList.length));
  }, [words]);

  const currentExercise = exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / exercises.length) * 100;

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return; // Already answered
    
    setSelectedAnswer(answer);
    const correct = answer === currentExercise.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      onComplete();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <span>Practice Progress</span>
          <span className="flex items-center gap-4">
            <span>Score: {score}/{currentExerciseIndex + (selectedAnswer ? 1 : 0)}</span>
            <span>{currentExerciseIndex + 1} of {exercises.length}</span>
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Exercise Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentExerciseIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-card border border-border rounded-2xl p-8 mb-8"
        >
          {/* Question */}
          <div className="text-center mb-8">
            {currentExercise.type === "match-arabic" ? (
              <>
                <p className="text-sm text-muted-foreground mb-2">What does this mean?</p>
                <p className="text-5xl font-arabic text-primary mb-2">
                  {currentExercise.question}
                </p>
                <AudioButton 
                  text={currentExercise.question} 
                  showLabel
                  label="Listen"
                  variant="ghost"
                  size="sm"
                />
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-2">Select the correct answer</p>
                <p className="text-xl font-english text-foreground">
                  {currentExercise.question}
                </p>
              </>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {currentExercise.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = option === currentExercise.correctAnswer;
              const showResult = selectedAnswer !== null;

              let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all ";
              
              if (showResult) {
                if (isCorrectAnswer) {
                  buttonClass += "border-green-500 bg-green-500/10 text-green-600";
                } else if (isSelected && !isCorrectAnswer) {
                  buttonClass += "border-red-500 bg-red-500/10 text-red-600";
                } else {
                  buttonClass += "border-border opacity-50";
                }
              } else {
                buttonClass += "border-border hover:border-primary hover:bg-primary/5";
              }

              return (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={buttonClass}
                >
                  <div className="flex items-center justify-between">
                    <span className={`${currentExercise.type === "match-english" ? "text-2xl font-arabic" : "text-lg"}`}>
                      {option}
                    </span>
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

          {/* Feedback */}
          {selectedAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-lg text-center ${
                isCorrect ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
              }`}
            >
              {isCorrect ? (
                <p className="font-medium">✓ Correct!</p>
              ) : (
                <p className="font-medium">
                  ✗ The correct answer is: <span className={currentExercise.type === "match-english" ? "font-arabic text-xl" : ""}>{currentExercise.correctAnswer}</span>
                </p>
              )}
            </motion.div>
          )}
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
            {currentExerciseIndex === exercises.length - 1 ? "Complete Practice" : "Next Question"}
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
  field: "arabic" | "english",
  count: number
): string[] {
  const filtered = words.filter(w => w.id !== excludeId);
  const shuffled = shuffleArray(filtered);
  return shuffled.slice(0, count).map(w => w[field]);
}
