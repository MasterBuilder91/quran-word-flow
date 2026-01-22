import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  SessionConfig, 
  ExerciseType, 
  GameMode, 
  Difficulty, 
  ContentSource,
  EXERCISE_TYPE_LABELS,
  GAME_MODE_CONFIG,
  DIFFICULTY_CONFIG,
  CONTENT_SOURCE_LABELS,
} from './types';
import { BookOpen, Sparkles, Zap, Heart, Trophy, Target, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SessionSetupProps {
  config: SessionConfig;
  onConfigChange: (config: SessionConfig) => void;
  onStart: () => void;
  stats: {
    vocabulary: number;
    grammar: number;
    heritage: number;
    letters: number;
    total: number;
  };
}

export const SessionSetup = ({ config, onConfigChange, onStart, stats }: SessionSetupProps) => {
  const toggleExerciseType = (type: ExerciseType) => {
    const types = config.exerciseTypes.includes(type)
      ? config.exerciseTypes.filter(t => t !== type)
      : [...config.exerciseTypes, type];
    
    // Ensure at least one type is selected
    if (types.length === 0) return;
    
    onConfigChange({ ...config, exerciseTypes: types });
  };

  const toggleContentSource = (source: ContentSource) => {
    if (source === 'all') {
      onConfigChange({ ...config, contentSources: ['all'] });
      return;
    }
    
    let sources = config.contentSources.filter(s => s !== 'all');
    
    if (sources.includes(source)) {
      sources = sources.filter(s => s !== source);
    } else {
      sources = [...sources, source];
    }
    
    // Ensure at least one source is selected
    if (sources.length === 0) {
      sources = ['vocabulary'];
    }
    
    onConfigChange({ ...config, contentSources: sources });
  };

  const getActiveWordCount = () => {
    if (config.contentSources.includes('all')) return stats.total;
    
    let count = 0;
    config.contentSources.forEach(source => {
      if (source !== 'all' && source in stats) {
        count += stats[source as keyof typeof stats] || 0;
      }
    });
    return count;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-8"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-arabic text-5xl md:text-6xl text-primary mb-3">ملعب الممارسة</h1>
        <h2 className="font-english text-2xl md:text-3xl text-foreground mb-4">Practice Playground</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Master <span className="text-primary font-semibold">{stats.total.toLocaleString()}</span> words 
          across vocabulary, grammar, heritage phrases, and Arabic letters.
        </p>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-10">
        {Object.entries(CONTENT_SOURCE_LABELS).map(([key, { name, icon }]) => {
          const source = key as ContentSource;
          const count = source === 'all' ? stats.total : stats[source] || 0;
          const isActive = config.contentSources.includes(source) || 
                          (source !== 'all' && config.contentSources.includes('all'));
          
          return (
            <motion.button
              key={key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleContentSource(source)}
              className={`p-4 rounded-xl border transition-all ${
                isActive 
                  ? 'bg-primary/10 border-primary text-foreground' 
                  : 'bg-card border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              <div className="text-2xl mb-1">{icon}</div>
              <div className="font-semibold">{count}</div>
              <div className="text-xs">{name}</div>
            </motion.button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center gap-4 my-8">
        <div className="h-px w-16 bg-border" />
        <Sparkles className="w-5 h-5 text-gold" />
        <div className="h-px w-16 bg-border" />
      </div>

      {/* Game Mode Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Game Mode</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(GAME_MODE_CONFIG).map(([key, { name, icon, description }]) => {
            const mode = key as GameMode;
            const isActive = config.gameMode === mode;
            
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onConfigChange({ ...config, gameMode: mode })}
                className={`p-4 rounded-xl border transition-all text-left ${
                  isActive 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-card border-border hover:border-primary/50'
                }`}
              >
                <div className="text-2xl mb-2">{icon}</div>
                <div className="font-semibold text-foreground">{name}</div>
                <div className="text-xs text-muted-foreground">{description}</div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Difficulty</h3>
        <div className="flex justify-center gap-3 flex-wrap">
          {Object.entries(DIFFICULTY_CONFIG).map(([key, { name, color }]) => {
            const difficulty = key as Difficulty;
            const isActive = config.difficulty === difficulty;
            
            return (
              <Button
                key={key}
                variant={isActive ? 'default' : 'outline'}
                onClick={() => onConfigChange({ ...config, difficulty })}
                className={`min-w-[80px] ${!isActive ? color : ''}`}
              >
                {name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Exercise Types */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Exercise Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(EXERCISE_TYPE_LABELS).map(([key, { name, icon, description }]) => {
            const type = key as ExerciseType;
            const isActive = config.exerciseTypes.includes(type);
            
            // Skip listening and complex types for now
            if (['listening', 'fill-blank', 'root-match', 'sentence-order'].includes(key)) {
              return null;
            }
            
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleExerciseType(type)}
                className={`p-3 rounded-xl border transition-all text-left ${
                  isActive 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-card border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{icon}</span>
                  <span className="font-medium text-foreground text-sm">{name}</span>
                </div>
                <div className="text-xs text-muted-foreground">{description}</div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Question Count */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Number of Questions</h3>
        <div className="flex justify-center gap-3 flex-wrap">
          {[10, 20, 30, 50, 100].map((count) => (
            <Button
              key={count}
              variant={config.exerciseCount === count ? 'default' : 'outline'}
              onClick={() => onConfigChange({ ...config, exerciseCount: count })}
              className="min-w-[60px]"
            >
              {count}
            </Button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <div className="text-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={onStart} size="lg" className="px-12 py-6 text-lg">
            {config.gameMode === 'speed' && <Zap className="w-5 h-5 mr-2" />}
            {config.gameMode === 'survival' && <Heart className="w-5 h-5 mr-2" />}
            {config.gameMode === 'marathon' && <Target className="w-5 h-5 mr-2" />}
            {config.gameMode === 'classic' && <BookOpen className="w-5 h-5 mr-2" />}
            {config.gameMode === 'review' && <Trophy className="w-5 h-5 mr-2" />}
            Start {GAME_MODE_CONFIG[config.gameMode].name}
          </Button>
        </motion.div>
        <p className="text-sm text-muted-foreground mt-4">
          {getActiveWordCount().toLocaleString()} words available · {config.exerciseCount} questions
        </p>

        {/* Desert Runner Game Link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground mb-4">Or try our adventure game:</p>
          <Link to="/games/desert-runner">
            <Button variant="outline" size="lg" className="gap-2 border-gold/50 hover:bg-gold/10 hover:border-gold">
              <Gamepad2 className="w-5 h-5 text-gold" />
              <span className="text-gradient-gold font-semibold">Desert Word Runner</span>
              <span className="text-xs text-muted-foreground ml-2">— Endless Adventure!</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};
