import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Trophy, Keyboard } from 'lucide-react';

interface StartScreenProps {
  highScore: number;
  onStart: () => void;
}

export const StartScreen = ({ highScore, onStart }: StartScreenProps) => {
  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        {/* Title */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            <span className="text-gradient-gold">رحلة الصحراء</span>
          </h1>
          <p className="text-2xl text-white/90 font-light tracking-wide">
            Desert Word Runner
          </p>
        </motion.div>

        {/* Animated runner silhouette */}
        <motion.div
          className="my-8 flex justify-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
        >
          <div className="text-8xl">🏃‍♂️</div>
        </motion.div>

        {/* High score */}
        {highScore > 0 && (
          <motion.div
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Trophy className="w-5 h-5 text-gold" />
            <span className="text-gold font-medium">High Score: {highScore.toLocaleString()}</span>
          </motion.div>
        )}

        {/* Start button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="text-xl px-10 py-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-lg shadow-emerald-500/30"
          >
            <Play className="w-6 h-6 mr-2 fill-current" />
            Start Running
          </Button>
        </motion.div>

        {/* Controls hint */}
        <motion.div
          className="mt-8 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 text-white/60">
            <Keyboard className="w-4 h-4" />
            <span className="text-sm">Controls</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-white/50">
            <span className="bg-white/10 px-2 py-1 rounded">↑ / W - Move Up</span>
            <span className="bg-white/10 px-2 py-1 rounded">↓ / S - Move Down</span>
            <span className="bg-white/10 px-2 py-1 rounded">Click words to collect</span>
          </div>
        </motion.div>

        {/* Objective */}
        <motion.p
          className="mt-6 text-white/70 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Collect the Arabic words that match the English translation shown above. 
          Avoid wrong words and obstacles!
        </motion.p>
      </motion.div>
    </motion.div>
  );
};
