import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SessionStats, EXERCISE_TYPE_LABELS, ExerciseType } from './types';
import { Trophy, Target, Zap, Clock, RotateCcw, BookOpen, Share2 } from 'lucide-react';

interface SessionResultsProps {
  stats: SessionStats;
  onRestart: () => void;
  onNewSession: () => void;
  onReviewMissed: () => void;
}

export const SessionResults = ({ stats, onRestart, onNewSession, onReviewMissed }: SessionResultsProps) => {
  const accuracy = stats.totalQuestions > 0 
    ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) 
    : 0;

  const getGrade = () => {
    if (accuracy >= 95) return { grade: 'S', color: 'text-gold', message: 'Mastery Level!' };
    if (accuracy >= 90) return { grade: 'A+', color: 'text-primary', message: 'Excellent!' };
    if (accuracy >= 80) return { grade: 'A', color: 'text-primary', message: 'Great job!' };
    if (accuracy >= 70) return { grade: 'B', color: 'text-yellow-500', message: 'Good work!' };
    if (accuracy >= 60) return { grade: 'C', color: 'text-orange-500', message: 'Keep practicing!' };
    return { grade: 'D', color: 'text-red-500', message: 'More practice needed' };
  };

  const { grade, color, message } = getGrade();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-8 max-w-2xl mx-auto"
    >
      {/* Grade Display */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className={`text-8xl font-bold ${color} mb-2`}
        >
          {grade}
        </motion.div>
        <h2 className="text-2xl font-semibold text-foreground">{message}</h2>
        <p className="text-muted-foreground mt-1">{accuracy}% Accuracy</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-4 text-center"
        >
          <Trophy className="w-6 h-6 text-gold mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{stats.pointsEarned}</div>
          <div className="text-xs text-muted-foreground">Points</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-4 text-center"
        >
          <Target className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">
            {stats.correctAnswers}/{stats.totalQuestions}
          </div>
          <div className="text-xs text-muted-foreground">Correct</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-xl p-4 text-center"
        >
          <Zap className="w-6 h-6 text-orange-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{stats.longestStreak}</div>
          <div className="text-xs text-muted-foreground">Best Streak</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-border rounded-xl p-4 text-center"
        >
          <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-foreground">{formatTime(stats.totalTime)}</div>
          <div className="text-xs text-muted-foreground">Time</div>
        </motion.div>
      </div>

      {/* Exercise Type Breakdown */}
      {Object.keys(stats.exerciseTypeBreakdown).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-card border border-border rounded-xl p-6 mb-8"
        >
          <h3 className="font-semibold text-foreground mb-4">Performance by Exercise Type</h3>
          <div className="space-y-3">
            {Object.entries(stats.exerciseTypeBreakdown).map(([type, { correct, total }]) => {
              const typeInfo = EXERCISE_TYPE_LABELS[type as ExerciseType];
              const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
              
              return (
                <div key={type} className="flex items-center gap-3">
                  <span className="text-lg w-8">{typeInfo?.icon}</span>
                  <span className="text-sm text-muted-foreground flex-1">{typeInfo?.name}</span>
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-16 text-right">
                    {correct}/{total}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Missed Words */}
      {stats.missedWords.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-card border border-border rounded-xl p-6 mb-8"
        >
          <h3 className="font-semibold text-foreground mb-4">
            Words to Review ({stats.missedWords.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {stats.missedWords.map((word, index) => (
              <div 
                key={`${word.id}-${index}`}
                className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
              >
                <span className="font-arabic text-lg">{word.arabic}</span>
                <span className="text-muted-foreground text-sm">—</span>
                <span className="text-sm">{word.english}</span>
              </div>
            ))}
          </div>
          <Button 
            onClick={onReviewMissed} 
            variant="outline" 
            className="w-full mt-4"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Practice These Words
          </Button>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col sm:flex-row justify-center gap-4"
      >
        <Button onClick={onRestart} variant="outline" size="lg">
          <RotateCcw className="w-4 h-4 mr-2" />
          Play Again
        </Button>
        <Button onClick={onNewSession} size="lg">
          <BookOpen className="w-4 h-4 mr-2" />
          New Session
        </Button>
      </motion.div>

      {/* Share (placeholder) */}
      <div className="text-center mt-6">
        <button className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          <Share2 className="w-4 h-4" />
          Share Results
        </button>
      </div>
    </motion.div>
  );
};
