import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, RotateCcw, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useSpeechRecognition, calculatePronunciationScore } from '@/hooks/useSpeechRecognition';
import { useElevenLabsTTS } from '@/hooks/useElevenLabsTTS';
import { cn } from '@/lib/utils';

interface PronunciationPracticeProps {
  arabicText: string;
  transliteration?: string;
  onComplete?: (score: number, isCorrect: boolean) => void;
  showHints?: boolean;
  autoPlayFirst?: boolean;
}

export const PronunciationPractice = ({
  arabicText,
  transliteration,
  onComplete,
  showHints = true,
  autoPlayFirst = true,
}: PronunciationPracticeProps) => {
  const [result, setResult] = useState<{
    score: number;
    feedback: string;
    isCorrect: boolean;
  } | null>(null);
  const [hasListenedFirst, setHasListenedFirst] = useState(!autoPlayFirst);
  const [attempts, setAttempts] = useState(0);

  const { speak, isPlaying, isLoading: ttsLoading } = useElevenLabsTTS();
  
  const {
    isListening,
    transcript,
    confidence,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    language: 'ar-SA',
    onResult: (res) => {
      if (res.isFinal && res.transcript) {
        const pronunciationResult = calculatePronunciationScore(
          arabicText,
          res.transcript,
          res.confidence
        );
        setResult(pronunciationResult);
        setAttempts(prev => prev + 1);
        onComplete?.(pronunciationResult.score, pronunciationResult.isCorrect);
      }
    },
  });

  // Auto-play pronunciation on mount
  useEffect(() => {
    if (autoPlayFirst && !hasListenedFirst) {
      const timer = setTimeout(() => {
        speak(arabicText);
        setHasListenedFirst(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [arabicText, autoPlayFirst, hasListenedFirst, speak]);

  const handleListen = async () => {
    try {
      await speak(arabicText);
      setHasListenedFirst(true);
    } catch (err) {
      console.error('TTS failed:', err);
    }
  };

  const handleRecord = () => {
    if (isListening) {
      stopListening();
    } else {
      setResult(null);
      resetTranscript();
      startListening();
    }
  };

  const handleReset = () => {
    setResult(null);
    resetTranscript();
    setAttempts(0);
  };

  if (!isSupported) {
    return (
      <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-center">
        <p className="text-yellow-600 dark:text-yellow-400 text-sm">
          Speech recognition is not supported in your browser. 
          Try Chrome or Edge for the best experience.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Target word */}
      <div className="text-center p-6 rounded-2xl bg-card border border-border">
        <p className="font-arabic text-4xl md:text-5xl text-primary mb-2">
          {arabicText}
        </p>
        {transliteration && (
          <p className="text-muted-foreground italic">{transliteration}</p>
        )}
        
        {/* Listen button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleListen}
          disabled={isPlaying || ttsLoading}
          className="mt-4 gap-2"
        >
          {ttsLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Volume2 className={cn("w-4 h-4", isPlaying && "text-primary animate-pulse")} />
          )}
          {hasListenedFirst ? 'Listen Again' : 'Listen First'}
        </Button>
      </div>

      {/* Recording section */}
      <div className="text-center space-y-4">
        {showHints && !hasListenedFirst && (
          <p className="text-sm text-muted-foreground">
            👆 Listen to the pronunciation first, then try to repeat it
          </p>
        )}

        {/* Record button */}
        <motion.div
          animate={isListening ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
        >
          <Button
            size="lg"
            onClick={handleRecord}
            disabled={!hasListenedFirst && autoPlayFirst}
            className={cn(
              "w-20 h-20 rounded-full transition-all",
              isListening 
                ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                : "bg-primary hover:bg-primary/90"
            )}
          >
            {isListening ? (
              <MicOff className="w-8 h-8" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </Button>
        </motion.div>

        <p className="text-sm text-muted-foreground">
          {isListening ? 'Listening... Click to stop' : 'Click to start recording'}
        </p>

        {/* Live transcript */}
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-muted/50"
          >
            <p className="text-xs text-muted-foreground mb-1">You said:</p>
            <p className="font-arabic text-2xl text-foreground">{transcript}</p>
          </motion.div>
        )}

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}
      </div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "p-6 rounded-2xl border text-center",
              result.isCorrect 
                ? "bg-green-500/10 border-green-500/30" 
                : "bg-orange-500/10 border-orange-500/30"
            )}
          >
            <div className="flex justify-center mb-4">
              {result.isCorrect ? (
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              ) : (
                <XCircle className="w-12 h-12 text-orange-500" />
              )}
            </div>

            <p className={cn(
              "text-lg font-semibold mb-2",
              result.isCorrect ? "text-green-600" : "text-orange-600"
            )}>
              {result.feedback}
            </p>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                Pronunciation Score
              </p>
              <div className="flex items-center justify-center gap-3">
                <Progress 
                  value={result.score} 
                  className="w-32 h-2"
                />
                <span className="text-2xl font-bold text-foreground">
                  {result.score}%
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button variant="ghost" size="sm" onClick={handleListen}>
                <Volume2 className="w-4 h-4 mr-2" />
                Listen
              </Button>
            </div>

            {attempts > 1 && (
              <p className="text-xs text-muted-foreground mt-4">
                Attempts: {attempts}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
