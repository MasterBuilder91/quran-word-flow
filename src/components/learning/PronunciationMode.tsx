import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PronunciationPractice } from './PronunciationPractice';

interface WordItem {
  arabic: string;
  transliteration?: string;
  english?: string;
}

interface PronunciationModeProps {
  words: WordItem[];
  onComplete: () => void;
}

export const PronunciationMode = ({ words, onComplete }: PronunciationModeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [direction, setDirection] = useState(0);

  const currentWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;
  const averageScore = scores.length > 0 
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;

  const handleWordComplete = (score: number, isCorrect: boolean) => {
    setScores(prev => [...prev, score]);
  };

  const goNext = () => {
    if (currentIndex < words.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-[70vh] flex flex-col max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <span>Pronunciation Practice</span>
          <span className="flex items-center gap-4">
            {scores.length > 0 && (
              <span>Avg Score: {averageScore}%</span>
            )}
            <span>{currentIndex + 1} of {words.length}</span>
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Current Word */}
      <div className="flex-1">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="mb-4 text-center">
              {currentWord.english && (
                <p className="text-lg text-muted-foreground mb-2">
                  Pronounce: <span className="font-medium text-foreground">{currentWord.english}</span>
                </p>
              )}
            </div>
            
            <PronunciationPractice
              arabicText={currentWord.arabic}
              transliteration={currentWord.transliteration}
              onComplete={handleWordComplete}
              showHints={currentIndex === 0}
              autoPlayFirst={true}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {scores.length > 0 
              ? `${scores.filter(s => s >= 70).length}/${scores.length} passed`
              : 'Practice each word'}
          </p>
        </div>

        {currentIndex === words.length - 1 ? (
          <Button onClick={onComplete}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Complete
          </Button>
        ) : (
          <Button onClick={goNext}>
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>

      {/* Keyboard hints */}
      <div className="text-center text-sm text-muted-foreground pt-4">
        <span>Use arrow keys to navigate between words</span>
      </div>
    </div>
  );
};
