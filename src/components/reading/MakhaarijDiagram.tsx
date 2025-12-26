import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { makhaarij } from "@/data/arabicReadingCourse";

interface MakhaarijDiagramProps {
  highlightedMakhraj?: string;
  onMakhrajClick?: (makhrajId: string) => void;
  interactive?: boolean;
}

export const MakhaarijDiagram = ({
  highlightedMakhraj,
  onMakhrajClick,
  interactive = true,
}: MakhaarijDiagramProps) => {
  const [hoveredMakhraj, setHoveredMakhraj] = useState<string | null>(null);

  const activeMakhraj = hoveredMakhraj || highlightedMakhraj;
  const activeMakhrajData = makhaarij.find((m) => m.id === activeMakhraj);

  // SVG paths for the head profile
  const headOutline = `
    M 120 180
    C 100 180, 80 160, 75 140
    C 70 120, 70 100, 75 80
    C 80 60, 90 40, 110 30
    C 130 20, 160 20, 180 30
    C 200 40, 210 60, 215 80
    C 220 100, 220 130, 210 155
    C 200 180, 180 195, 160 200
    L 140 200
  `;

  // Mouth cavity
  const mouthCavity = `
    M 130 130
    C 140 125, 160 125, 175 130
    C 185 135, 190 145, 185 155
    C 180 165, 160 170, 140 165
    C 125 160, 120 145, 130 130
  `;

  // Throat
  const throatPath = `
    M 120 180
    L 115 220
    L 135 220
    L 140 200
  `;

  // Tongue
  const tonguePath = `
    M 125 165
    C 130 155, 150 150, 170 155
    C 175 158, 180 165, 175 170
    C 165 175, 140 175, 125 170
    Z
  `;

  // Articulation point markers
  const articulationPoints = [
    { id: 'jawf', x: 150, y: 90, label: 'Jawf' },
    { id: 'halq-aqsa', x: 125, y: 195, label: 'Deep Throat' },
    { id: 'halq-wasat', x: 130, y: 175, label: 'Mid Throat' },
    { id: 'halq-adna', x: 135, y: 155, label: 'Upper Throat' },
    { id: 'lisan-aqsa', x: 145, y: 140, label: 'Back Tongue' },
    { id: 'lisan-wasat', x: 160, y: 135, label: 'Mid Tongue' },
    { id: 'lisan-taraf-emphatic', x: 175, y: 130, label: 'Tongue Tip' },
    { id: 'lisan-taraf-thin', x: 185, y: 125, label: 'Teeth Edge' },
    { id: 'shafataan', x: 195, y: 135, label: 'Lips' },
    { id: 'khayshum', x: 140, y: 70, label: 'Nasal' },
  ];

  const getPointColor = (id: string) => {
    if (id === activeMakhraj) return 'hsl(175, 70%, 45%)';
    if (id === highlightedMakhraj) return 'hsl(42, 85%, 55%)';
    return 'hsl(230, 15%, 40%)';
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <svg
        viewBox="50 0 180 250"
        className="w-full h-auto"
        style={{ maxHeight: '400px' }}
      >
        {/* Definitions */}
        <defs>
          <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(175, 70%, 45%)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(175, 70%, 45%)" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background glow for active point */}
        {activeMakhraj && (
          <motion.circle
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            cx={articulationPoints.find((p) => p.id === activeMakhraj)?.x || 150}
            cy={articulationPoints.find((p) => p.id === activeMakhraj)?.y || 150}
            r="25"
            fill="url(#glowGradient)"
          />
        )}

        {/* Head outline */}
        <path
          d={headOutline}
          fill="none"
          stroke="hsl(230, 20%, 30%)"
          strokeWidth="2"
        />

        {/* Throat */}
        <path
          d={throatPath}
          fill="hsl(230, 22%, 15%)"
          stroke="hsl(230, 20%, 25%)"
          strokeWidth="1"
        />

        {/* Nasal cavity indicator */}
        <ellipse
          cx="150"
          cy="70"
          rx="25"
          ry="15"
          fill="none"
          stroke="hsl(230, 20%, 25%)"
          strokeWidth="1"
          strokeDasharray="3,3"
        />

        {/* Mouth cavity */}
        <path
          d={mouthCavity}
          fill="hsl(230, 22%, 12%)"
          stroke="hsl(230, 20%, 25%)"
          strokeWidth="1"
        />

        {/* Tongue */}
        <path
          d={tonguePath}
          fill="hsl(0, 30%, 40%)"
          stroke="hsl(0, 25%, 35%)"
          strokeWidth="1"
        />

        {/* Upper teeth */}
        <path
          d="M 185 130 L 192 128 L 190 135 Z"
          fill="hsl(40, 20%, 90%)"
        />

        {/* Lower teeth */}
        <path
          d="M 182 145 L 190 145 L 188 150 Z"
          fill="hsl(40, 20%, 85%)"
        />

        {/* Lips */}
        <ellipse
          cx="195"
          cy="137"
          rx="8"
          ry="12"
          fill="hsl(0, 35%, 45%)"
          stroke="hsl(0, 30%, 40%)"
          strokeWidth="1"
        />

        {/* Articulation points */}
        {articulationPoints.map((point) => (
          <g
            key={point.id}
            className={interactive ? 'cursor-pointer' : ''}
            onMouseEnter={() => interactive && setHoveredMakhraj(point.id)}
            onMouseLeave={() => interactive && setHoveredMakhraj(null)}
            onClick={() => interactive && onMakhrajClick?.(point.id)}
          >
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={point.id === activeMakhraj ? 8 : 6}
              fill={getPointColor(point.id)}
              filter={point.id === activeMakhraj ? 'url(#glow)' : undefined}
              initial={false}
              animate={{
                scale: point.id === activeMakhraj ? 1.2 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
            {/* Pulse ring for active */}
            {point.id === activeMakhraj && (
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={12}
                fill="none"
                stroke="hsl(175, 70%, 45%)"
                strokeWidth="1"
                initial={{ scale: 0.8, opacity: 1 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </g>
        ))}

        {/* Labels */}
        <text x="150" y="20" textAnchor="middle" fill="hsl(230, 10%, 55%)" fontSize="10" fontFamily="var(--font-ui)">
          Nasal Cavity
        </text>
        <text x="110" y="210" textAnchor="middle" fill="hsl(230, 10%, 55%)" fontSize="10" fontFamily="var(--font-ui)">
          Throat
        </text>
        <text x="200" y="155" textAnchor="start" fill="hsl(230, 10%, 55%)" fontSize="10" fontFamily="var(--font-ui)">
          Lips
        </text>
      </svg>

      {/* Info panel */}
      <AnimatePresence>
        {activeMakhrajData && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 rounded-xl bg-card border border-primary/30"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <h4 className="font-english font-semibold text-foreground">
                {activeMakhrajData.name}
              </h4>
            </div>
            <p className="font-arabic text-gold text-lg mb-2">{activeMakhrajData.nameArabic}</p>
            <p className="text-sm text-muted-foreground mb-2">{activeMakhrajData.description}</p>
            {activeMakhrajData.englishComparison && (
              <p className="text-sm text-primary/80 italic">
                💡 {activeMakhrajData.englishComparison}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
