import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Zap, Trophy, Target } from 'lucide-react';
import { GameState, GameWord } from './types';

interface GameHUDProps {
  gameState: GameState;
  currentQuestion: GameWord | null;
}

export const GameHUD = ({ gameState, currentQuestion }: GameHUDProps) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 p-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        {/* Lives */}
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ 
                scale: i < gameState.lives ? 1 : 0.5,
                opacity: i < gameState.lives ? 1 : 0.3,
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Heart 
                className={`w-6 h-6 ${i < gameState.lives ? 'text-red-500 fill-red-500' : 'text-stone-600'}`}
              />
            </motion.div>
          ))}
        </div>

        {/* Score */}
        <motion.div 
          className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 0.3 }}
          key={gameState.score}
        >
          <Trophy className="w-5 h-5 text-gold" />
          <span className="text-xl font-bold text-white tabular-nums">
            {gameState.score.toLocaleString()}
          </span>
        </motion.div>

        {/* Streak */}
        <AnimatePresence mode="wait">
          {gameState.streak > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 20 }}
              className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 rounded-full"
            >
              <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span className="text-white font-bold">{gameState.streak}x</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Current target word */}
      <AnimatePresence mode="wait">
        {currentQuestion && (
          <motion.div
            key={currentQuestion.id}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="mt-4 flex justify-center"
          >
            <div className="bg-gradient-to-r from-emerald-900/90 to-emerald-800/90 backdrop-blur-sm px-6 py-3 rounded-2xl border border-emerald-500/50 shadow-lg shadow-emerald-500/20">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-100 font-medium">Collect:</span>
                <span className="text-xl font-bold text-white">
                  {currentQuestion.english}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Distance/Progress */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="text-xs text-white/60 uppercase tracking-wider">Distance</span>
        <span className="text-sm font-mono text-white/80">
          {Math.floor(gameState.distance)}m
        </span>
      </div>
    </div>
  );
};
