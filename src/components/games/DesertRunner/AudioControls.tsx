import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music, Music2 } from 'lucide-react';

interface AudioControlsProps {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  onToggleMusic: () => void;
  onToggleSfx: () => void;
}

export const AudioControls = ({ 
  musicEnabled, 
  sfxEnabled, 
  onToggleMusic, 
  onToggleSfx 
}: AudioControlsProps) => {
  return (
    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-40 flex gap-2">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggleMusic}
        className={`p-2 sm:p-2.5 rounded-full backdrop-blur-sm transition-colors ${
          musicEnabled 
            ? 'bg-emerald-500/80 text-white' 
            : 'bg-black/50 text-white/50'
        }`}
        title={musicEnabled ? 'Mute Music' : 'Enable Music'}
      >
        {musicEnabled ? (
          <Music className="w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <Music2 className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onToggleSfx}
        className={`p-2 sm:p-2.5 rounded-full backdrop-blur-sm transition-colors ${
          sfxEnabled 
            ? 'bg-emerald-500/80 text-white' 
            : 'bg-black/50 text-white/50'
        }`}
        title={sfxEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
      >
        {sfxEnabled ? (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
        ) : (
          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </motion.button>
    </div>
  );
};
