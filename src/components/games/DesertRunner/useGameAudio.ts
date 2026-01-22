import { useRef, useCallback, useEffect, useState } from 'react';

interface AudioSettings {
  musicEnabled: boolean;
  sfxEnabled: boolean;
}

// Create oscillator-based retro sounds
const createRetroSound = (
  type: 'collect' | 'wrong' | 'jump' | 'gameOver' | 'streak',
  audioContext: AudioContext
) => {
  const gainNode = audioContext.createGain();
  gainNode.connect(audioContext.destination);
  
  const oscillator = audioContext.createOscillator();
  
  switch (type) {
    case 'collect':
      // Coin collect sound - ascending arpeggio
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.05); // E5
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.1); // G5
      oscillator.frequency.setValueAtTime(1047, audioContext.currentTime + 0.15); // C6
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.connect(gainNode);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
      break;
      
    case 'wrong':
      // Buzzer/error sound
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(100, audioContext.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.connect(gainNode);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
      break;
      
    case 'jump':
      // Jump whoosh sound
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.01, audioContext.currentTime + 0.15);
      oscillator.connect(gainNode);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.15);
      break;
      
    case 'gameOver':
      // Sad descending sound
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(392, audioContext.currentTime + 0.2);
      oscillator.frequency.setValueAtTime(330, audioContext.currentTime + 0.4);
      oscillator.frequency.setValueAtTime(262, audioContext.currentTime + 0.6);
      oscillator.frequency.setValueAtTime(196, audioContext.currentTime + 0.8);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.01, audioContext.currentTime + 1);
      oscillator.connect(gainNode);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 1);
      break;
      
    case 'streak':
      // Fanfare for streaks
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      osc1.type = 'square';
      osc2.type = 'square';
      osc1.frequency.setValueAtTime(523, audioContext.currentTime);
      osc2.frequency.setValueAtTime(659, audioContext.currentTime);
      osc1.frequency.setValueAtTime(784, audioContext.currentTime + 0.1);
      osc2.frequency.setValueAtTime(988, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.01, audioContext.currentTime + 0.25);
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      osc1.start();
      osc2.start();
      osc1.stop(audioContext.currentTime + 0.25);
      osc2.stop(audioContext.currentTime + 0.25);
      break;
  }
};

// 8-bit style background music using Web Audio API
const createBackgroundMusic = (audioContext: AudioContext): {
  start: () => void;
  stop: () => void;
  gainNode: GainNode;
} => {
  const masterGain = audioContext.createGain();
  masterGain.gain.value = 0.15;
  masterGain.connect(audioContext.destination);
  
  let intervalId: number | null = null;
  let isPlaying = false;
  
  // Simple melody notes (frequencies)
  const melody = [
    262, 294, 330, 349, 392, 349, 330, 294, // C D E F G F E D
    262, 330, 392, 523, 392, 330, 262, 294, // C E G C5 G E C D
    349, 392, 440, 392, 349, 330, 294, 262, // F G A G F E D C
    330, 349, 392, 440, 523, 440, 392, 349, // E F G A C5 A G F
  ];
  
  const bass = [
    131, 131, 165, 165, 196, 196, 165, 165, // C2 C2 E2 E2 G2 G2 E2 E2
    131, 131, 165, 165, 196, 196, 220, 220, // etc
    175, 175, 196, 196, 220, 220, 196, 196,
    165, 175, 196, 220, 262, 220, 196, 175,
  ];
  
  let noteIndex = 0;
  
  const playNote = () => {
    if (!isPlaying) return;
    
    // Melody
    const melodyOsc = audioContext.createOscillator();
    const melodyGain = audioContext.createGain();
    melodyOsc.type = 'square';
    melodyOsc.frequency.value = melody[noteIndex % melody.length];
    melodyGain.gain.setValueAtTime(0.3, audioContext.currentTime);
    melodyGain.gain.setValueAtTime(0.01, audioContext.currentTime + 0.15);
    melodyOsc.connect(melodyGain);
    melodyGain.connect(masterGain);
    melodyOsc.start();
    melodyOsc.stop(audioContext.currentTime + 0.18);
    
    // Bass
    const bassOsc = audioContext.createOscillator();
    const bassGain = audioContext.createGain();
    bassOsc.type = 'triangle';
    bassOsc.frequency.value = bass[noteIndex % bass.length];
    bassGain.gain.setValueAtTime(0.4, audioContext.currentTime);
    bassGain.gain.setValueAtTime(0.01, audioContext.currentTime + 0.15);
    bassOsc.connect(bassGain);
    bassGain.connect(masterGain);
    bassOsc.start();
    bassOsc.stop(audioContext.currentTime + 0.18);
    
    // Drums (simple kick/snare pattern)
    if (noteIndex % 4 === 0) {
      // Kick
      const kickOsc = audioContext.createOscillator();
      const kickGain = audioContext.createGain();
      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(150, audioContext.currentTime);
      kickOsc.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.1);
      kickGain.gain.setValueAtTime(0.5, audioContext.currentTime);
      kickGain.gain.setValueAtTime(0.01, audioContext.currentTime + 0.1);
      kickOsc.connect(kickGain);
      kickGain.connect(masterGain);
      kickOsc.start();
      kickOsc.stop(audioContext.currentTime + 0.1);
    }
    if (noteIndex % 4 === 2) {
      // Snare (noise-ish)
      const snareOsc = audioContext.createOscillator();
      const snareGain = audioContext.createGain();
      snareOsc.type = 'sawtooth';
      snareOsc.frequency.value = 200;
      snareGain.gain.setValueAtTime(0.2, audioContext.currentTime);
      snareGain.gain.setValueAtTime(0.01, audioContext.currentTime + 0.08);
      snareOsc.connect(snareGain);
      snareGain.connect(masterGain);
      snareOsc.start();
      snareOsc.stop(audioContext.currentTime + 0.08);
    }
    
    noteIndex++;
  };
  
  return {
    start: () => {
      if (isPlaying) return;
      isPlaying = true;
      noteIndex = 0;
      playNote();
      intervalId = window.setInterval(playNote, 200); // 150 BPM roughly
    },
    stop: () => {
      isPlaying = false;
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    },
    gainNode: masterGain,
  };
};

export const useGameAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const musicRef = useRef<ReturnType<typeof createBackgroundMusic> | null>(null);
  const [settings, setSettings] = useState<AudioSettings>(() => {
    if (typeof window === 'undefined') return { musicEnabled: true, sfxEnabled: true };
    const saved = localStorage.getItem('desertRunnerAudio');
    return saved ? JSON.parse(saved) : { musicEnabled: true, sfxEnabled: true };
  });

  // Initialize audio context on first interaction
  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  }, []);

  // Play sound effect
  const playSfx = useCallback((type: 'collect' | 'wrong' | 'jump' | 'gameOver' | 'streak') => {
    if (!settings.sfxEnabled) return;
    const ctx = initAudio();
    createRetroSound(type, ctx);
  }, [settings.sfxEnabled, initAudio]);

  // Start background music
  const startMusic = useCallback(() => {
    if (!settings.musicEnabled) return;
    const ctx = initAudio();
    if (!musicRef.current) {
      musicRef.current = createBackgroundMusic(ctx);
    }
    musicRef.current.start();
  }, [settings.musicEnabled, initAudio]);

  // Stop background music
  const stopMusic = useCallback(() => {
    if (musicRef.current) {
      musicRef.current.stop();
    }
  }, []);

  // Toggle music
  const toggleMusic = useCallback(() => {
    setSettings(prev => {
      const newSettings = { ...prev, musicEnabled: !prev.musicEnabled };
      localStorage.setItem('desertRunnerAudio', JSON.stringify(newSettings));
      if (!newSettings.musicEnabled) {
        stopMusic();
      }
      return newSettings;
    });
  }, [stopMusic]);

  // Toggle SFX
  const toggleSfx = useCallback(() => {
    setSettings(prev => {
      const newSettings = { ...prev, sfxEnabled: !prev.sfxEnabled };
      localStorage.setItem('desertRunnerAudio', JSON.stringify(newSettings));
      return newSettings;
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMusic();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopMusic]);

  return {
    playSfx,
    startMusic,
    stopMusic,
    toggleMusic,
    toggleSfx,
    musicEnabled: settings.musicEnabled,
    sfxEnabled: settings.sfxEnabled,
    initAudio,
  };
};
