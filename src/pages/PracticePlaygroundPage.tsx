import { useState, useCallback, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageSEO } from "@/components/layout/PageSEO";
import { SessionSetup } from "@/components/playground/SessionSetup";
import { ExercisePlayer } from "@/components/playground/ExercisePlayer";
import { SessionResults } from "@/components/playground/SessionResults";
import { usePlaygroundData } from "@/components/playground/usePlaygroundData";
import { useExerciseGenerator } from "@/components/playground/useExerciseGenerator";
import { 
  SessionConfig, 
  SessionStats, 
  Exercise,
  PracticeWord,
} from "@/components/playground/types";

type SessionState = 'setup' | 'playing' | 'results';

const DEFAULT_CONFIG: SessionConfig = {
  exerciseCount: 20,
  exerciseTypes: ['arabic-to-english', 'english-to-arabic', 'transliteration'],
  contentSources: ['all'],
  difficulty: 'mixed',
  gameMode: 'classic',
};

export default function PracticePlaygroundPage() {
  const [sessionState, setSessionState] = useState<SessionState>('setup');
  const [config, setConfig] = useState<SessionConfig>(DEFAULT_CONFIG);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [sessionStats, setSessionStats] = useState<SessionStats | null>(null);
  const [reviewWords, setReviewWords] = useState<PracticeWord[] | null>(null);

  const { getWordsBySource, getWordsByDifficulty, stats } = usePlaygroundData();

  // Get words based on current config or review words
  const activeWords = useMemo(() => {
    if (reviewWords) return reviewWords;
    
    const sourceWords = getWordsBySource(config.contentSources);
    return getWordsByDifficulty(sourceWords, config.difficulty);
  }, [config.contentSources, config.difficulty, getWordsBySource, getWordsByDifficulty, reviewWords]);

  const { generateSession } = useExerciseGenerator(activeWords);

  const handleStartSession = useCallback(() => {
    const newExercises = generateSession(config);
    setExercises(newExercises);
    setSessionState('playing');
    setReviewWords(null);
  }, [config, generateSession]);

  const handleCompleteSession = useCallback((stats: SessionStats) => {
    setSessionStats(stats);
    setSessionState('results');
  }, []);

  const handleQuitSession = useCallback(() => {
    setSessionState('setup');
    setExercises([]);
  }, []);

  const handleRestart = useCallback(() => {
    const newExercises = generateSession(config);
    setExercises(newExercises);
    setSessionState('playing');
  }, [config, generateSession]);

  const handleNewSession = useCallback(() => {
    setSessionState('setup');
    setExercises([]);
    setSessionStats(null);
    setReviewWords(null);
  }, []);

  const handleReviewMissed = useCallback(() => {
    if (sessionStats?.missedWords && sessionStats.missedWords.length > 0) {
      setReviewWords(sessionStats.missedWords);
      setConfig(prev => ({
        ...prev,
        exerciseCount: Math.min(sessionStats.missedWords.length * 2, 50),
        gameMode: 'review',
      }));
      
      // Generate exercises for missed words
      const reviewConfig = {
        ...config,
        exerciseCount: Math.min(sessionStats.missedWords.length * 2, 50),
        gameMode: 'review' as const,
      };
      
      // We need to regenerate with the review words
      setSessionState('setup');
    }
  }, [sessionStats, config]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageSEO title="Practice Playground" description="Practice your Quranic Arabic with interactive exercises. Customize difficulty and exercise types." path="/practice" />
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {sessionState === 'setup' && (
            <SessionSetup
              config={config}
              onConfigChange={setConfig}
              onStart={handleStartSession}
              stats={stats}
            />
          )}

          {sessionState === 'playing' && exercises.length > 0 && (
            <ExercisePlayer
              exercises={exercises}
              gameMode={config.gameMode}
              onComplete={handleCompleteSession}
              onQuit={handleQuitSession}
            />
          )}

          {sessionState === 'results' && sessionStats && (
            <SessionResults
              stats={sessionStats}
              onRestart={handleRestart}
              onNewSession={handleNewSession}
              onReviewMissed={handleReviewMissed}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
