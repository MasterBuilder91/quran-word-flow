import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuranicWord } from "@/data/quranicWords";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { AudioButton } from "@/components/ui/AudioButton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useInstantAudio } from "@/hooks/useInstantAudio";
interface LearnModeProps {
  words: QuranicWord[];
  onComplete: () => void;
}

export const LearnMode = ({ words, onComplete }: LearnModeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEnglish, setShowEnglish] = useState(false);
  const [direction, setDirection] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  const { speak, stop } = useInstantAudio();

  const currentWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;

  // Auto-play audio when word changes
  useEffect(() => {
    if (autoPlay && currentWord) {
      // Small delay for animation to complete
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
      setCurrentIndex(currentIndex + 1);
      setShowEnglish(false);
    } else {
      onComplete();
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
      setShowEnglish(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      } else if (e.key === "e" || e.key === "E") {
        setShowEnglish(!showEnglish);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, showEnglish]);

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
    <div className="min-h-[80vh] flex flex-col">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-muted rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Word Counter & Auto-play Toggle */}
      <div className="flex items-center justify-between mb-4 px-4">
        <span className="text-muted-foreground font-ui">
          Word {currentIndex + 1} of {words.length}
        </span>
        <div className="flex items-center gap-2">
          <Switch 
            id="autoplay" 
            checked={autoPlay} 
            onCheckedChange={setAutoPlay}
          />
          <Label htmlFor="autoplay" className="text-sm text-muted-foreground cursor-pointer">
            <Volume2 className="w-4 h-4 inline mr-1" />
            Auto-play
          </Label>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full max-w-2xl mx-auto px-4"
          >
            {/* Word Card */}
            <div className="bg-card rounded-3xl border border-border p-8 md:p-12 text-center shadow-medium">
              {/* Arabic Word */}
              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="font-arabic text-6xl md:text-8xl text-foreground mb-4 leading-normal"
              >
                {currentWord.arabic}
              </motion.h1>

              {/* Transliteration + Audio Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <p className="text-lg text-gold font-ui italic">
                  {currentWord.transliteration}
                </p>
                <AudioButton 
                  text={currentWord.arabic} 
                  showLabel 
                  label="Listen"
                  variant="ghost"
                  size="sm"
                />
              </motion.div>

              {/* English (toggleable) */}
              <AnimatePresence>
                {showEnglish && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-2xl font-english text-foreground mb-2">
                      {currentWord.english}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Occurs {currentWord.occurrences.toLocaleString()} times in the Qur'an
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <OrnamentalDivider symbol="◆" className="my-8" />

              {/* Example Sentence */}
              <div className="space-y-4">
                <p className="font-arabic arabic-large text-foreground leading-loose">
                  {currentWord.example.arabic}
                </p>
                <AnimatePresence>
                  {showEnglish && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-english text-muted-foreground italic"
                    >
                      {currentWord.example.english}
                    </motion.p>
                  )}
                </AnimatePresence>
                <p className="text-sm text-gold">{currentWord.example.reference}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8 pb-8">
        <Button
          variant="outline"
          size="icon"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="w-12 h-12 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        <Button
          variant="outline"
          onClick={() => setShowEnglish(!showEnglish)}
          className="px-6"
        >
          {showEnglish ? (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              Hide English
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Show English
            </>
          )}
        </Button>

        <Button
          size="icon"
          onClick={goNext}
          className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Keyboard hints */}
      <div className="text-center text-sm text-muted-foreground pb-4">
        <span>Use arrow keys to navigate • Press E to toggle English</span>
      </div>
    </div>
  );
};
