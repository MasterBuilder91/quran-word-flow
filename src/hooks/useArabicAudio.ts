import { useState, useRef, useCallback } from 'react';

// Mapping from Arabic letters to the audio file names used by arabicreadingcourse.com
const letterToAudioName: Record<string, string> = {
  // Throat letters
  'ء': 'alif', // hamza is on alif
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

const AUDIO_BASE_URL = 'https://www.arabicreadingcourse.com/audio';

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

  const playLetter = useCallback((letter: string, type: 'name' | 'sound' = 'sound') => {
    const audioName = letterToAudioName[letter];
    
    if (!audioName) {
      console.warn(`No audio mapping for letter: ${letter}`);
      return;
    }

    // Stop any currently playing audio
    stop();

    // Build URL - 'name' plays the letter name, 'sound' plays the sound it makes
    const url = type === 'name' 
      ? `${AUDIO_BASE_URL}/isolated-letters/${audioName}.mp3`
      : `${AUDIO_BASE_URL}/${audioName}.mp3`;

    const audio = new Audio(url);
    audioRef.current = audio;
    setCurrentLetter(letter);
    setIsPlaying(true);

    audio.onended = () => {
      setIsPlaying(false);
      setCurrentLetter(null);
      audioRef.current = null;
    };

    audio.onerror = () => {
      console.warn(`Failed to load audio for letter: ${letter}`);
      setIsPlaying(false);
      setCurrentLetter(null);
      audioRef.current = null;
    };

    audio.play().catch((error) => {
      console.warn(`Failed to play audio for letter: ${letter}`, error);
      setIsPlaying(false);
      setCurrentLetter(null);
      audioRef.current = null;
    });
  }, [stop]);

  return {
    playLetter,
    stop,
    isPlaying,
    currentLetter,
  };
};
