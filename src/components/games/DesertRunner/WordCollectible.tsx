import { motion } from 'framer-motion';
import { CollectibleWord, LANE_POSITIONS } from './types';

interface WordCollectibleProps {
  word: CollectibleWord;
  targetWord: string;
  onCollect: (word: CollectibleWord) => void;
}

export const WordCollectible = ({ word, targetWord, onCollect }: WordCollectibleProps) => {
  if (word.collected) return null;

  const isCorrect = word.english === targetWord;
  
  return (
    <motion.div
      className="absolute z-10 cursor-pointer select-none"
      style={{
        left: `${word.x}%`,
        top: `${word.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: [0, -5, 0],
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ 
        scale: { duration: 0.3 },
        y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
      }}
      whileHover={{ scale: 1.1 }}
      onClick={() => onCollect(word)}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-xl blur-lg ${
        isCorrect ? 'bg-emerald-400/50' : 'bg-gold/30'
      }`} />
      
      {/* Word container */}
      <div className={`
        relative px-4 py-2 rounded-xl border-2 backdrop-blur-sm
        ${isCorrect 
          ? 'bg-emerald-900/80 border-emerald-400 shadow-lg shadow-emerald-400/30' 
          : 'bg-stone-900/80 border-gold/60 shadow-lg shadow-gold/20'
        }
      `}>
        {/* Arabic text */}
        <span className="arabic text-xl font-bold text-white drop-shadow-lg">
          {word.arabic}
        </span>
        
        {/* Sparkle effects */}
        <motion.div
          className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() }}
        />
      </div>
    </motion.div>
  );
};
