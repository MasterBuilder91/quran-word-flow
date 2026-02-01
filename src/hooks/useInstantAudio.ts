import { useState, useCallback, useRef } from 'react';

/**
 * Instant Arabic audio using browser's Web Speech API
 * - Free, no API key required
 * - Instant playback (no network latency)
 * - Works offline
 */
export const useInstantAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentText, setCurrentText] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    utteranceRef.current = null;
    setIsPlaying(false);
    setCurrentText(null);
  }, []);

  const speak = useCallback((text: string) => {
    return new Promise<void>((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        reject(new Error('Web Speech API not supported'));
        return;
      }

      // Stop any current playback
      stop();

      setCurrentText(text);
      setIsPlaying(true);

      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;
      
      // Configure for Arabic
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85; // Slightly slower for learning
      utterance.pitch = 1;
      utterance.volume = 1;

      // Try to find the best Arabic voice
      const voices = window.speechSynthesis.getVoices();
      const arabicVoices = voices.filter(v => v.lang.startsWith('ar'));
      
      // Prefer Google Arabic voices if available (higher quality)
      const googleArabic = arabicVoices.find(v => 
        v.name.toLowerCase().includes('google') || 
        v.name.toLowerCase().includes('premium')
      );
      const bestVoice = googleArabic || arabicVoices[0];
      
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.onend = () => {
        setIsPlaying(false);
        setCurrentText(null);
        utteranceRef.current = null;
        resolve();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error:', e);
        setIsPlaying(false);
        setCurrentText(null);
        utteranceRef.current = null;
        // Don't reject on common "interrupted" errors
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          reject(e);
        } else {
          resolve();
        }
      };

      // Chrome requires voices to be loaded first
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          const updatedVoices = window.speechSynthesis.getVoices();
          const arabicV = updatedVoices.filter(v => v.lang.startsWith('ar'));
          const googleV = arabicV.find(v => 
            v.name.toLowerCase().includes('google') || 
            v.name.toLowerCase().includes('premium')
          );
          if (googleV || arabicV[0]) {
            utterance.voice = googleV || arabicV[0];
          }
          window.speechSynthesis.speak(utterance);
        };
      } else {
        window.speechSynthesis.speak(utterance);
      }
    });
  }, [stop]);

  // Check if specific text is currently playing
  const isTextPlaying = useCallback((text: string) => {
    return isPlaying && currentText === text;
  }, [isPlaying, currentText]);

  return {
    speak,
    stop,
    isPlaying,
    currentText,
    isTextPlaying,
  };
};
