import { Flame } from "lucide-react";
import { motion } from "framer-motion";

interface StreakCounterProps {
  streak: number;
  compact?: boolean;
}

export const StreakCounter = ({ streak, compact = false }: StreakCounterProps) => {
  const isActive = streak > 0;
  
  if (compact) {
    return (
      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${
        isActive 
          ? 'bg-accent/20 text-accent' 
          : 'bg-muted text-muted-foreground'
      }`}>
        <Flame className={`w-4 h-4 ${isActive ? 'text-accent' : ''}`} />
        <span>{streak}</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
        isActive 
          ? 'bg-accent/10 border-accent/30' 
          : 'bg-card border-border'
      }`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        isActive ? 'bg-accent/20' : 'bg-muted'
      }`}>
        <Flame className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-muted-foreground'}`} />
      </div>
      <div>
        <p className={`text-2xl font-bold ${isActive ? 'text-accent' : 'text-foreground'}`}>
          {streak}
        </p>
        <p className="text-xs text-muted-foreground">Day Streak</p>
      </div>
    </motion.div>
  );
};
