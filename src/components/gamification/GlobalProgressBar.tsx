import { motion } from "framer-motion";

interface GlobalProgressBarProps {
  percentage: number;
  wordsLearned: number;
  totalWords?: number;
  showLabel?: boolean;
}

export const GlobalProgressBar = ({ 
  percentage, 
  wordsLearned, 
  totalWords = 125,
  showLabel = true 
}: GlobalProgressBarProps) => {
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Progress to 50% Qur'an Coverage
          </span>
          <span className="text-sm font-medium text-primary">
            {wordsLearned}/{totalWords} words
          </span>
        </div>
      )}
      
      <div className="relative h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-emerald-light rounded-full"
        />
        
        {/* Milestone markers */}
        <div className="absolute inset-0 flex justify-between px-1">
          {[25, 50, 75].map((milestone) => (
            <div
              key={milestone}
              className="w-0.5 h-full bg-background/50"
              style={{ marginLeft: `${milestone - 1}%` }}
            />
          ))}
        </div>
      </div>
      
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      )}
    </div>
  );
};
