import { useCallback, useState } from 'react';

export const useArabicPronunciation = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLetter, setCurrentLetter] = useState<string | null>(null);

  const speak = useCallback((text: string, letterId?: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA'; // Arabic (Saudi Arabia)
      utterance.rate = 0.7; // Slower for learning
      utterance.pitch = 1;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        setCurrentLetter(letterId || text);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentLetter(null);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentLetter(null);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentLetter(null);
    }
  }, []);

  return { speak, stop, isSpeaking, currentLetter };
};
