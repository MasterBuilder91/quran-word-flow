import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, ArrowUp } from 'lucide-react';

interface MobileControlsProps {
  onMoveUp: () => void;
  onMoveDown: () => void;
  onJump: () => void;
  isJumping: boolean;
}

export const MobileControls = ({ onMoveUp, onMoveDown, onJump, isJumping }: MobileControlsProps) => {
  return (
    <div className="absolute bottom-4 left-0 right-0 z-40 flex justify-between items-end px-4 md:hidden">
      {/* Lane controls - Left side */}
      <div className="flex flex-col gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onMoveUp}
          className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center active:bg-white/40 touch-manipulation"
          aria-label="Move up"
        >
          <ChevronUp className="w-8 h-8 text-white" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onMoveDown}
          className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center active:bg-white/40 touch-manipulation"
          aria-label="Move down"
        >
          <ChevronDown className="w-8 h-8 text-white" />
        </motion.button>
      </div>

      {/* Jump button - Right side */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onJump}
        disabled={isJumping}
        className={`w-20 h-20 rounded-full flex items-center justify-center touch-manipulation ${
          isJumping 
            ? 'bg-stone-500/40 border-stone-400/30' 
            : 'bg-emerald-500/40 backdrop-blur-sm border-emerald-400/50 active:bg-emerald-400/60'
        } border`}
        aria-label="Jump"
      >
        <ArrowUp className={`w-10 h-10 ${isJumping ? 'text-stone-400' : 'text-white'}`} />
      </motion.button>
    </div>
  );
};
