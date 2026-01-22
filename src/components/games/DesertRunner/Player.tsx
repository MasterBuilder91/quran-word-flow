import { motion } from 'framer-motion';
import { PlayerState, LANE_POSITIONS } from './types';

interface PlayerProps {
  player: PlayerState;
  isRunning: boolean;
}

export const Player = ({ player, isRunning }: PlayerProps) => {
  const laneY = LANE_POSITIONS[player.lane];

  return (
    <motion.div
      className="absolute left-[15%] z-20"
      initial={{ y: '50%' }}
      animate={{ 
        top: `${laneY}%`,
        scaleY: player.isSliding ? 0.5 : 1,
        y: player.isJumping ? -60 : player.isSliding ? 30 : 0,
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 500, 
        damping: 30,
        y: { duration: player.isJumping ? 0.3 : 0.2 }
      }}
      style={{ transform: 'translateY(-50%)' }}
    >
      {/* Player character - stylized runner */}
      <div className="relative w-16 h-20">
        {/* Glow effect */}
        <div 
          className={`absolute inset-0 rounded-full blur-xl transition-colors duration-300 ${
            player.hasShield ? 'bg-cyan-400/50' : 'bg-gold/30'
          }`}
        />
        
        {/* Shield effect */}
        {player.hasShield && (
          <motion.div
            className="absolute -inset-4 rounded-full border-2 border-cyan-400"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.8, 0.4, 0.8],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Magnet effect */}
        {player.hasMagnet && (
          <motion.div
            className="absolute -right-6 top-1/2 -translate-y-1/2"
            animate={{ 
              x: [0, 10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <div className="text-2xl">🧲</div>
          </motion.div>
        )}

        {/* Character body */}
        <div className="relative w-full h-full">
          {/* Cloak/robe */}
          <motion.div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-14 bg-gradient-to-b from-emerald-600 to-emerald-800 rounded-t-lg"
            animate={isRunning ? {
              skewX: [0, 5, 0, -5, 0],
            } : {}}
            transition={{ duration: 0.4, repeat: Infinity }}
            style={{
              transformOrigin: 'bottom center',
            }}
          />
          
          {/* Head with keffiyeh */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-200 rounded-full">
            {/* Keffiyeh */}
            <div className="absolute -top-1 -left-2 -right-2 h-4 bg-white rounded-t-full" />
            <div className="absolute top-2 -left-1 w-1 h-6 bg-white rounded-full" />
            <div className="absolute top-2 -right-1 w-1 h-6 bg-white rounded-full" />
            
            {/* Face */}
            <div className="absolute top-3 left-1.5 w-1.5 h-1.5 bg-stone-800 rounded-full" />
            <div className="absolute top-3 right-1.5 w-1.5 h-1.5 bg-stone-800 rounded-full" />
          </div>

          {/* Running legs */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            animate={isRunning && !player.isJumping ? {
              rotate: [0, 20, 0, -20, 0],
            } : {}}
            transition={{ duration: 0.25, repeat: Infinity }}
          >
            <div className="w-3 h-6 bg-stone-700 rounded-full origin-top" />
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            animate={isRunning && !player.isJumping ? {
              rotate: [0, -20, 0, 20, 0],
            } : {}}
            transition={{ duration: 0.25, repeat: Infinity }}
          >
            <div className="w-3 h-6 bg-stone-700 rounded-full origin-top ml-2" />
          </motion.div>
        </div>

        {/* Jump dust particles */}
        {player.isJumping && (
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2"
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-amber-300/60 rounded-full" />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
