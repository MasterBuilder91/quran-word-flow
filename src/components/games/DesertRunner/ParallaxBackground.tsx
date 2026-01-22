import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ParallaxBackgroundProps {
  speed: number;
  isPaused: boolean;
}

export const ParallaxBackground = ({ speed, isPaused }: ParallaxBackgroundProps) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setOffset(prev => (prev + speed) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, [speed, isPaused]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient - deep desert sunset */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, hsl(220 30% 15%) 0%, hsl(25 60% 25%) 40%, hsl(35 70% 40%) 70%, hsl(40 80% 50%) 100%)',
        }}
      />

      {/* Stars layer (far) */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          transform: `translateX(-${offset * 0.1}%)`,
        }}
      >
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${(i * 37) % 200}%`,
              top: `${(i * 13) % 40}%`,
              opacity: 0.3 + (i % 3) * 0.3,
              animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Distant mountains (far) */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[30%]"
        style={{
          transform: `translateX(-${offset * 0.3}%)`,
        }}
      >
        <svg viewBox="0 0 400 100" className="w-[200%] h-full" preserveAspectRatio="none">
          <path
            d="M0 100 L0 70 Q20 50 40 65 Q60 40 80 55 Q100 30 120 50 Q140 35 160 45 Q180 25 200 40 Q220 30 240 50 Q260 40 280 55 Q300 35 320 50 Q340 45 360 60 Q380 50 400 65 L400 100 Z"
            fill="hsl(25 30% 20%)"
          />
        </svg>
      </motion.div>

      {/* Mid mountains */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[25%]"
        style={{
          transform: `translateX(-${offset * 0.6}%)`,
        }}
      >
        <svg viewBox="0 0 400 100" className="w-[200%] h-full" preserveAspectRatio="none">
          <path
            d="M0 100 L0 60 Q30 40 60 55 Q90 30 120 45 Q150 25 180 40 Q210 20 240 35 Q270 30 300 45 Q330 35 360 50 Q380 40 400 55 L400 100 Z"
            fill="hsl(30 35% 25%)"
          />
        </svg>
      </motion.div>

      {/* Sand dunes (closer) */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[20%]"
        style={{
          transform: `translateX(-${offset * 1.2}%)`,
        }}
      >
        <svg viewBox="0 0 400 100" className="w-[200%] h-full" preserveAspectRatio="none">
          <path
            d="M0 100 L0 50 Q50 30 100 45 Q150 25 200 40 Q250 30 300 45 Q350 35 400 50 L400 100 Z"
            fill="hsl(35 50% 35%)"
          />
        </svg>
      </motion.div>

      {/* Ground layer */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[15%]"
        style={{
          transform: `translateX(-${offset * 2}%)`,
          background: 'linear-gradient(180deg, hsl(35 45% 30%) 0%, hsl(30 40% 25%) 100%)',
        }}
      />

      {/* Ground details - ruins, palm trees */}
      <motion.div 
        className="absolute bottom-[12%] left-0 right-0 h-[10%]"
        style={{
          transform: `translateX(-${offset * 2.5}%)`,
        }}
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={`detail-${i}`}
            className="absolute"
            style={{
              left: `${i * 20}%`,
              bottom: 0,
            }}
          >
            {i % 3 === 0 ? (
              // Palm tree
              <div className="relative">
                <div className="w-2 h-12 bg-emerald-900 rounded-full mx-auto" />
                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                  {[...Array(5)].map((_, j) => (
                    <div
                      key={`leaf-${j}`}
                      className="absolute w-8 h-1 bg-emerald-700 rounded-full origin-left"
                      style={{
                        transform: `rotate(${-60 + j * 30}deg)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : i % 3 === 1 ? (
              // Ruins pillar
              <div className="w-4 h-8 bg-stone-600 opacity-60" style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)' }} />
            ) : (
              // Small rock
              <div className="w-6 h-3 bg-stone-700 rounded-t-full opacity-50" />
            )}
          </div>
        ))}
      </motion.div>

      {/* Running path */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[12%]"
        style={{
          background: 'linear-gradient(180deg, hsl(25 35% 22%) 0%, hsl(20 30% 18%) 100%)',
        }}
      />
    </div>
  );
};
