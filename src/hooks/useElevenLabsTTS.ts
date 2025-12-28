import { useState, useRef, useCallback } from 'react';

const TTS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`;

export const useElevenLabsTTS = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentText, setCurrentText] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
    setIsPlaying(false);
    setCurrentText(null);
  }, []);

  const speak = useCallback(async (text: string, voiceId?: string) => {
    // Stop any currently playing audio
    stop();
    
    setIsLoading(true);
    setCurrentText(text);

    try {
      const response = await fetch(TTS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ text, voiceId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("TTS request failed:", response.status, errorData);
        throw new Error(`TTS request failed: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      audioUrlRef.current = audioUrl;

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        setCurrentText(null);
        if (audioUrlRef.current) {
          URL.revokeObjectURL(audioUrlRef.current);
          audioUrlRef.current = null;
        }
      };

      audio.onerror = (e) => {
        console.error("Audio playback error:", e);
        setIsPlaying(false);
        setIsLoading(false);
        setCurrentText(null);
      };

      setIsLoading(false);
      setIsPlaying(true);
      await audio.play();
    } catch (error) {
      console.error("TTS error:", error);
      setIsLoading(false);
      setIsPlaying(false);
      setCurrentText(null);
      throw error;
    }
  }, [stop]);

  return {
    speak,
    stop,
    isPlaying,
    isLoading,
    currentText,
  };
};
