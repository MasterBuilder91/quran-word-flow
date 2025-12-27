import { useState, useRef, useCallback } from 'react';

// Mapping from Arabic letters to the audio file names used by arabicreadingcourse.com
const letterToAudioName: Record<string, string> = {
  // Throat letters
  'ء': 'alif',
  'ه': 'ha',
  'ع': 'ayn',
  'ح': 'hha',
  'غ': 'ghayn',
  'خ': 'kha',
  // Back of tongue
  'ق': 'qaf',
  'ك': 'kaf',
  'ج': 'jiim',
  'ش': 'shiin',
  'ي': 'ya',
  'ض': 'daad',
  // Tongue tip
  'ل': 'lam',
  'ن': 'nuun',
  'ر': 'ra',
  'ط': 'taa',
  'د': 'daal',
  'ت': 'ta',
  // Teeth
  'ص': 'saad',
  'ز': 'zay',
  'س': 'siin',
  'ظ': 'thaa',
  'ذ': 'thaal',
  'ث': 'tha',
  // Lips
  'ف': 'fa',
  'و': 'waw',
  'ب': 'ba',
  'م': 'miim',
  // Additional letters
  'ا': 'alif',
};

// Diacritic Unicode values
const FATHA = '\u064E';     // َ (a sound)
const KASRA = '\u0650';     // ِ (i sound)
const DAMMA = '\u064F';     // ُ (u sound)
const SUKUN = '\u0652';     // ْ (no vowel)
const SHADDA = '\u0651';    // ّ (doubling)
const FATHATAN = '\u064B';  // ً (an sound)
const KASRATAN = '\u064D';  // ٍ (in sound)
const DAMMATAN = '\u064C';  // ٌ (un sound)

const AUDIO_BASE_URL = 'https://www.arabicreadingcourse.com/audio';

// Get the vowel suffix based on diacritic
const getVowelSuffix = (text: string): string => {
  if (text.includes(FATHA)) return 'a';
  if (text.includes(KASRA)) return 'i';
  if (text.includes(DAMMA)) return 'u';
  if (text.includes(FATHATAN)) return 'an';
  if (text.includes(KASRATAN)) return 'in';
  if (text.includes(DAMMATAN)) return 'un';
  return '';
};

// Extract the base letter (without diacritics)
const getBaseLetter = (text: string): string => {
  return text.replace(/[\u064B-\u0652\u0670]/g, '').charAt(0);
};

export const useArabicAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLetter, setCurrentLetter] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentLetter(null);
  }, []);

  const playAudio = useCallback((url: string, identifier: string) => {
    stop();

    const audio = new Audio(url);
    audioRef.current = audio;
    setCurrentLetter(identifier);
    setIsPlaying(true);

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentLetter(null);
      audioRef.current = null;
    };

    audio.onerror = () => {
      console.warn(`Failed to load audio: ${url}`);
      setIsPlaying(false);
      setCurrentLetter(null);
      audioRef.current = null;
    };

    audio.play().catch((error) => {
      console.warn(`Failed to play audio: ${url}`, error);
      setIsPlaying(false);
      setCurrentLetter(null);
      audioRef.current = null;
    });
  }, [stop]);

  // Play a single letter (name or sound)
  const playLetter = useCallback((letter: string, type: 'name' | 'sound' = 'sound') => {
    const baseLetter = getBaseLetter(letter);
    const audioName = letterToAudioName[baseLetter];
    
    if (!audioName) {
      console.warn(`No audio mapping for letter: ${baseLetter}`);
      return;
    }

    const url = type === 'name' 
      ? `${AUDIO_BASE_URL}/isolated-letters/${audioName}.mp3`
      : `${AUDIO_BASE_URL}/${audioName}.mp3`;

    playAudio(url, baseLetter);
  }, [playAudio]);

  return {
    playLetter,
    stop,
    isPlaying,
    currentLetter,
  };
};
