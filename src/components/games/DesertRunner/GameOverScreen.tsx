import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Zap, RotateCcw, Home } from 'lucide-react';
import { GameState } from './types';

interface GameOverScreenProps {
  gameState: GameState;
  onRestart: () => void;
  onHome: () => void;
}

export const GameOverScreen = ({ gameState, onRestart, onHome }: GameOverScreenProps) => {
  const accuracy = gameState.totalWords > 0 
    ? Math.round((gameState.correctWords / gameState.totalWords) * 100) 
    : 0;

  const isNewHighScore = gameState.score > gameState.highScore;

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-gradient-to-b from-stone-900 to-stone-950 rounded-2xl sm:rounded-3xl p-4 sm:p-8 max-w-md w-full mx-4 border border-gold/30 shadow-2xl"
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <motion.h2 
            className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            رحلة انتهت
          </motion.h2>
          <p className="text-gold text-sm sm:text-base">Journey Complete</p>
        </div>

        {/* New high score badge */}
        {isNewHighScore && (
          <motion.div
            className="flex justify-center mb-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 px-4 py-1 rounded-full">
              <span className="text-black font-bold">🎉 NEW HIGH SCORE!</span>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <motion.div
            className="bg-black/40 rounded-xl p-3 sm:p-4 text-center"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-gold mx-auto mb-1 sm:mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-white">{gameState.score.toLocaleString()}</div>
            <div className="text-xs text-white/60 uppercase">Score</div>
          </motion.div>

          <motion.div
            className="bg-black/40 rounded-xl p-3 sm:p-4 text-center"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Target className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-400 mx-auto mb-1 sm:mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-white">{accuracy}%</div>
            <div className="text-xs text-white/60 uppercase">Accuracy</div>
          </motion.div>

          <motion.div
            className="bg-black/40 rounded-xl p-3 sm:p-4 text-center"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400 mx-auto mb-1 sm:mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-white">{gameState.streak}</div>
            <div className="text-xs text-white/60 uppercase">Best Streak</div>
          </motion.div>

          <motion.div
            className="bg-black/40 rounded-xl p-3 sm:p-4 text-center"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-xl sm:text-2xl block mb-1 sm:mb-2">📏</span>
            <div className="text-xl sm:text-2xl font-bold text-white">{Math.floor(gameState.distance)}m</div>
            <div className="text-xs text-white/60 uppercase">Distance</div>
          </motion.div>
        </div>

        {/* Words learned */}
        <motion.div
          className="text-center mb-4 sm:mb-6 py-2 sm:py-3 bg-emerald-900/30 rounded-xl border border-emerald-500/30"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="text-emerald-400 font-medium text-sm sm:text-base">
            {gameState.correctWords} words collected correctly!
          </span>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex gap-3"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={onHome}
            variant="outline"
            className="flex-1 border-stone-600 hover:bg-stone-800"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
          <Button
            onClick={onRestart}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
