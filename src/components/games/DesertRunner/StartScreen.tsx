import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Trophy, Keyboard, Gauge, Smartphone } from 'lucide-react';
import { GAME_CONFIG } from './types';

interface StartScreenProps {
  highScore: number;
  onStart: (initialSpeed: number) => void;
}

export const StartScreen = ({ highScore, onStart }: StartScreenProps) => {
  const [speed, setSpeed] = useState(GAME_CONFIG.initialSpeed);

  const getSpeedLabel = (value: number) => {
    if (value <= 1) return 'Super Relaxed';
    if (value <= 1.5) return 'Relaxed';
    if (value <= 2) return 'Normal';
    if (value <= 3) return 'Fast';
    if (value <= 4) return 'Intense';
    return 'Extreme';
  };

  return (
    <motion.div
      className="absolute inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

      <motion.div
        className="relative z-10 text-center px-4 max-w-md w-full"
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2">
            <span className="text-gradient-gold">رحلة الصحراء</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 font-light tracking-wide">
            Desert Word Runner
          </p>
        </motion.div>

        {/* Animated runner silhouette */}
        <motion.div
          className="my-6 flex justify-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
        >
          <div className="text-6xl sm:text-8xl">🏃‍♂️</div>
        </motion.div>

        {/* High score */}
        {highScore > 0 && (
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Trophy className="w-5 h-5 text-gold" />
            <span className="text-gold font-medium">High Score: {highScore.toLocaleString()}</span>
          </motion.div>
        )}

        {/* Speed slider */}
        <motion.div
          className="bg-black/40 backdrop-blur-sm rounded-xl p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-emerald-400" />
              <span className="text-white/80 text-sm">Starting Speed</span>
            </div>
            <span className="text-emerald-400 font-medium text-sm">
              {getSpeedLabel(speed)}
            </span>
          </div>
          <Slider
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            min={0.5}
            max={5}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-white/40 mt-1">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </motion.div>

        {/* Start button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        >
          <Button
            onClick={() => onStart(speed)}
            size="lg"
            className="text-lg sm:text-xl px-8 sm:px-10 py-5 sm:py-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 shadow-lg shadow-emerald-500/30 w-full sm:w-auto"
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 fill-current" />
            Start Running
          </Button>
        </motion.div>

        {/* Controls hint - Desktop */}
        <motion.div
          className="mt-6 space-y-2 hidden sm:block"
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

        {/* Controls hint - Mobile */}
        <motion.div
          className="mt-6 space-y-2 sm:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 text-white/60">
            <Smartphone className="w-4 h-4" />
            <span className="text-sm">Touch Controls</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-white/50">
            <span className="bg-white/10 px-2 py-1 rounded">⬆️ ⬇️ Switch lanes</span>
            <span className="bg-white/10 px-2 py-1 rounded">🚀 Jump</span>
            <span className="bg-white/10 px-2 py-1 rounded">Tap words</span>
          </div>
        </motion.div>

        {/* Objective */}
        <motion.p
          className="mt-4 text-white/70 text-sm sm:text-base max-w-md mx-auto"
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
