import { useState, useRef, useCallback } from 'react';

// Mapping from Arabic letters to the audio file names
// Using a reliable CDN-hosted source for Arabic letter sounds
const letterToAudioName: Record<string, string> = {
  // Throat letters
  'ء': 'hamza',
  'أ': 'hamza',
  'إ': 'hamza',
  'ؤ': 'hamza',
  'ئ': 'hamza',
  'ه': 'haa',
  'ع': 'ayn',
  'ح': 'hha',
  'غ': 'ghayn',
  'خ': 'khaa',
  // Back of tongue
  'ق': 'qaaf',
  'ك': 'kaaf',
  'ج': 'jiim',
  'ش': 'shiin',
  'ي': 'yaa',
  'ض': 'daad',
  // Tongue tip
  'ل': 'laam',
  'ن': 'nuun',
  'ر': 'raa',
  'ط': 'taa-heavy',
  'د': 'daal',
  'ت': 'taa',
  // Teeth
  'ص': 'saad',
  'ز': 'zaay',
  'س': 'siin',
  'ظ': 'dhaa-heavy',
  'ذ': 'dhaal',
  'ث': 'thaa',
  // Lips
  'ف': 'faa',
  'و': 'waaw',
  'ب': 'baa',
  'م': 'miim',
  // Alif variations
  'ا': 'alif',
  'آ': 'alif',
  'ى': 'alif-maqsuura',
  // Taa Marbuta
  'ة': 'taa-marbuuta',
};

// Diacritic Unicode values for stripping
const DIACRITICS_REGEX = /[\u064B-\u065F\u0670]/g;

// Extract the base letter (without diacritics)
const getBaseLetter = (text: string): string => {
  return text.replace(DIACRITICS_REGEX, '').charAt(0);
};

// Use Web Speech API as the primary audio source for reliability
const speakLetter = (letter: string, type: 'name' | 'sound'): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Web Speech API not supported'));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.lang = 'ar-SA';
    utterance.rate = type === 'name' ? 0.7 : 0.8; // Slower for names
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find an Arabic voice
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      reject(e);
    };

    window.speechSynthesis.speak(utterance);
  });
};

export const useArabicAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLetter, setCurrentLetter] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsPlaying(false);
    setCurrentLetter(null);
  }, []);

  // Play a single letter (name or sound)
  const playLetter = useCallback((letter: string, type: 'name' | 'sound' = 'sound') => {
    const baseLetter = getBaseLetter(letter);
    
    if (!baseLetter) {
      console.warn('No valid letter to play');
      return;
    }

    // Stop any currently playing audio
    stop();
    
    setCurrentLetter(baseLetter);
    setIsPlaying(true);

    // Ensure voices are loaded (needed on some browsers)
    const playAudio = () => {
      speakLetter(baseLetter, type)
        .then(() => {
          setIsPlaying(false);
          setCurrentLetter(null);
        })
        .catch((error) => {
          console.warn('Failed to play letter audio:', error);
          setIsPlaying(false);
          setCurrentLetter(null);
        });
    };

    // Chrome requires voices to be loaded first
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        playAudio();
      };
      // Fallback timeout if voices don't load
      timeoutRef.current = window.setTimeout(playAudio, 100);
    } else {
      playAudio();
    }
  }, [stop]);

  // Helper to check if a specific letter is currently playing
  const isLetterPlaying = useCallback((letter: string): boolean => {
    const baseLetter = getBaseLetter(letter);
    return isPlaying && currentLetter === baseLetter;
  }, [isPlaying, currentLetter]);

  return {
    playLetter,
    stop,
    isPlaying,
    currentLetter,
    isLetterPlaying,
  };
};
