import { motion } from 'framer-motion';
import { Obstacle } from './types';

interface ObstacleSpriteProps {
  obstacle: Obstacle;
}

export const ObstacleSprite = ({ obstacle }: ObstacleSpriteProps) => {
  return (
    <motion.div
      className="absolute z-10"
      style={{
        left: `${obstacle.x}%`,
        top: `${obstacle.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {obstacle.type === 'rock' && (
        <div className="relative">
          <div 
            className="w-12 h-10 bg-stone-600 rounded-lg shadow-lg"
            style={{
              clipPath: 'polygon(15% 100%, 0% 50%, 20% 0%, 80% 0%, 100% 50%, 85% 100%)',
            }}
          >
            {/* Rock texture */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-2 left-2 w-3 h-2 bg-stone-500 rounded" />
              <div className="absolute bottom-2 right-2 w-4 h-2 bg-stone-700 rounded" />
            </div>
          </div>
          {/* Shadow */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/30 rounded-full blur-sm" />
        </div>
      )}

      {obstacle.type === 'cactus' && (
        <div className="relative">
          {/* Main stem */}
          <div className="w-4 h-14 bg-green-700 rounded-full mx-auto relative">
            {/* Arms */}
            <div className="absolute top-3 -left-3 w-3 h-6 bg-green-600 rounded-full origin-bottom-right rotate-12" />
            <div className="absolute top-5 -right-3 w-3 h-5 bg-green-600 rounded-full origin-bottom-left -rotate-12" />
            {/* Spines */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-1 bg-green-400"
                style={{
                  top: `${10 + i * 10}%`,
                  left: i % 2 === 0 ? '-2px' : 'auto',
                  right: i % 2 === 1 ? '-2px' : 'auto',
                }}
              />
            ))}
          </div>
          {/* Shadow */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-2 bg-black/30 rounded-full blur-sm" />
        </div>
      )}

      {obstacle.type === 'pit' && (
        <div className="relative w-16 h-4">
          <div 
            className="w-full h-full bg-stone-900 rounded-full"
            style={{
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.8)',
            }}
          />
          {/* Warning edges */}
          <div className="absolute -top-1 left-0 right-0 h-1 bg-amber-600/50 rounded-full" />
        </div>
      )}
    </motion.div>
  );
};
