import { useState, useRef, useCallback, useEffect } from 'react';

interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  isFinal: boolean;
}

interface UseSpeechRecognitionOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  onResult?: (result: SpeechRecognitionResult) => void;
  onError?: (error: string) => void;
}

// SpeechRecognition types for TypeScript
interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResultItem;
}

interface SpeechRecognitionResultItem {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export const useSpeechRecognition = ({
  language = 'ar-SA',
  continuous = false,
  interimResults = true,
  onResult,
  onError,
}: UseSpeechRecognitionOptions = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognitionAPI);
    
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.lang = language;
      recognitionRef.current.continuous = continuous;
      recognitionRef.current.interimResults = interimResults;

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        let maxConfidence = 0;

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
            maxConfidence = Math.max(maxConfidence, result[0].confidence);
          } else {
            interimTranscript += result[0].transcript;
            maxConfidence = Math.max(maxConfidence, result[0].confidence);
          }
        }

        const currentTranscript = finalTranscript || interimTranscript;
        setTranscript(currentTranscript);
        setConfidence(maxConfidence);
        
        onResult?.({
          transcript: currentTranscript,
          confidence: maxConfidence,
          isFinal: !!finalTranscript,
        });
      };

      recognitionRef.current.onerror = (event) => {
        const errorMessage = getErrorMessage(event.error);
        setError(errorMessage);
        setIsListening(false);
        onError?.(errorMessage);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language, continuous, interimResults, onResult, onError]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setError('Speech recognition not supported');
      return;
    }

    setError(null);
    setTranscript('');
    setConfidence(0);
    
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setError('Failed to start listening');
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setConfidence(0);
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    confidence,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  };
};

function getErrorMessage(error: string): string {
  switch (error) {
    case 'no-speech':
      return 'No speech detected. Please try again.';
    case 'audio-capture':
      return 'No microphone found. Please check your device.';
    case 'not-allowed':
      return 'Microphone permission denied. Please allow access.';
    case 'network':
      return 'Network error. Please check your connection.';
    case 'aborted':
      return 'Listening was stopped.';
    case 'language-not-supported':
      return 'Arabic speech recognition may not be fully supported in your browser.';
    default:
      return `Recognition error: ${error}`;
  }
}

// Calculate similarity between two Arabic strings (basic comparison)
export function calculatePronunciationScore(
  expected: string,
  spoken: string,
  confidence: number
): {
  score: number;
  feedback: string;
  isCorrect: boolean;
} {
  if (!spoken) {
    return { score: 0, feedback: 'No speech detected', isCorrect: false };
  }

  // Normalize Arabic text (remove diacritics for comparison)
  const normalize = (text: string) => 
    text.replace(/[\u064B-\u065F\u0670]/g, '').trim();

  const normalizedExpected = normalize(expected);
  const normalizedSpoken = normalize(spoken);

  // Direct match
  if (normalizedExpected === normalizedSpoken) {
    const score = Math.round(confidence * 100);
    return {
      score: Math.max(score, 85), // Minimum 85% for correct pronunciation
      feedback: score >= 90 ? 'Excellent pronunciation! 🎉' : 'Great job! Keep practicing.',
      isCorrect: true,
    };
  }

  // Partial match (contains the word)
  if (normalizedSpoken.includes(normalizedExpected) || normalizedExpected.includes(normalizedSpoken)) {
    const ratio = Math.min(normalizedSpoken.length, normalizedExpected.length) / 
                  Math.max(normalizedSpoken.length, normalizedExpected.length);
    const score = Math.round(ratio * confidence * 100 * 0.8);
    return {
      score,
      feedback: 'Close! Try to pronounce it more clearly.',
      isCorrect: false,
    };
  }

  // Levenshtein distance for partial similarity
  const distance = levenshteinDistance(normalizedExpected, normalizedSpoken);
  const maxLen = Math.max(normalizedExpected.length, normalizedSpoken.length);
  const similarity = 1 - (distance / maxLen);
  const score = Math.round(similarity * confidence * 100 * 0.7);

  return {
    score,
    feedback: score >= 50 
      ? 'Getting there! Focus on each syllable.' 
      : 'Try again. Listen carefully first.',
    isCorrect: false,
  };
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}
