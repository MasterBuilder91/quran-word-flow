import { useState, useEffect } from "react";
import { GrammarWord } from "@/data/grammarModules";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Eye, EyeOff, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AudioButton } from "@/components/ui/AudioButton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useInstantAudio } from "@/hooks/useInstantAudio";

interface GrammarLearnModeProps {
  words: GrammarWord[];
  onComplete: () => void;
}

export const GrammarLearnMode = ({ words, onComplete }: GrammarLearnModeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [direction, setDirection] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  const { speak, stop } = useInstantAudio();

  const currentWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;

  // Auto-play audio when word changes
  useEffect(() => {
    if (autoPlay && currentWord) {
      const timer = setTimeout(() => {
        speak(currentWord.arabic);
      }, 400);
      return () => {
        clearTimeout(timer);
        stop();
      };
    }
  }, [currentIndex, autoPlay, currentWord?.arabic]);

  const goNext = () => {
    if (currentIndex < words.length - 1) {
      setDirection(1);
      setShowDetails(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setShowDetails(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "e" || e.key === "E") {
        setShowDetails(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, words.length]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Learning Progress</span>
          <span>{currentIndex + 1} of {words.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Auto-play Toggle */}
      <div className="flex items-center justify-end gap-2 mb-4">
        <Switch 
          id="grammar-autoplay" 
          checked={autoPlay} 
          onCheckedChange={setAutoPlay}
        />
        <Label htmlFor="grammar-autoplay" className="text-sm text-muted-foreground cursor-pointer">
          <Volume2 className="w-4 h-4 inline mr-1" />
          Auto-play
        </Label>
      </div>

      {/* Word Card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-card border border-border rounded-2xl p-8 mb-8"
        >
          {/* Category Badge */}
          <div className="flex justify-center mb-4">
            <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
              {currentWord.category.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>

          {/* Arabic */}
          <div className="text-center mb-6">
            <p className="text-5xl md:text-6xl font-arabic text-primary leading-relaxed mb-2">
              {currentWord.arabic}
            </p>
            <div className="flex items-center justify-center gap-3">
              <p className="text-lg text-muted-foreground italic">
                {currentWord.transliteration}
              </p>
              <AudioButton 
                text={currentWord.arabic} 
                iconOnly 
              />
            </div>
          </div>

          {/* English */}
          <div className="text-center mb-6">
            <p className="text-2xl font-english font-medium text-foreground">
              {currentWord.english}
            </p>
            {currentWord.occurrences && (
              <p className="text-sm text-muted-foreground mt-1">
                Occurs {currentWord.occurrences}× in the Qur'an
              </p>
            )}
          </div>

          {/* Notes */}
          {currentWord.notes && (
            <p className="text-sm text-muted-foreground text-center bg-muted/50 rounded-lg p-3 mb-6">
              💡 {currentWord.notes}
            </p>
          )}

          {/* Toggle Details Button */}
          <div className="text-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-muted-foreground"
            >
              {showDetails ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showDetails ? "Hide Details" : "Show Examples & Forms"}
            </Button>
          </div>

          {/* Expanded Details */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                {/* Forms */}
                {currentWord.forms && currentWord.forms.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm font-medium text-foreground mb-3">Related Forms:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentWord.forms.map((form, idx) => (
                        <div key={idx} className="bg-muted/50 rounded-lg p-3">
                          <p className="text-xl font-arabic text-primary">{form.arabic}</p>
                          <p className="text-xs text-muted-foreground italic">{form.transliteration}</p>
                          <p className="text-sm text-foreground">{form.meaning}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Examples */}
                {currentWord.examples.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-foreground mb-3">Qur'anic Examples:</p>
                    <div className="space-y-4">
                      {currentWord.examples.slice(0, 2).map((example, idx) => (
                        <div key={idx} className="bg-muted/30 rounded-lg p-4 border-l-4 border-primary/50">
                          <p className="text-xl font-arabic text-foreground leading-relaxed mb-2 text-right">
                            {example.arabic}
                          </p>
                          <p className="text-sm text-muted-foreground italic mb-1">
                            "{example.english}"
                          </p>
                          <p className="text-xs text-primary">{example.reference}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="flex-1 max-w-[150px]"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground text-center hidden md:block">
          Press <kbd className="px-1.5 py-0.5 rounded bg-muted text-xs">E</kbd> to toggle details
        </div>

        <Button
          onClick={goNext}
          className="flex-1 max-w-[150px]"
        >
          {currentIndex === words.length - 1 ? "Complete" : "Next"}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};
