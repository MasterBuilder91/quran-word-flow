import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface WordProgress {
  id: string;
  word_key: string;
  word_type: 'quranic' | 'grammar' | 'heritage';
  ease_factor: number;
  interval_days: number;
  repetitions: number;
  next_review_at: string;
  last_reviewed_at: string | null;
  total_reviews: number;
  correct_reviews: number;
  pronunciation_score_avg: number;
  mastery_level: number;
}

interface ReviewResult {
  correct: boolean;
  pronunciationScore?: number;
}

// SM-2 Algorithm Constants
const MIN_EASE_FACTOR = 1.3;
const INITIAL_EASE_FACTOR = 2.5;

export const useSpacedRepetition = (userId?: string) => {
  const [wordsToReview, setWordsToReview] = useState<WordProgress[]>([]);
  const [allProgress, setAllProgress] = useState<WordProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch user's word progress
  const fetchProgress = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_word_progress')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      const typedData = (data || []) as WordProgress[];
      setAllProgress(typedData);
      
      // Filter words due for review
      const now = new Date();
      const dueWords = typedData.filter(word => 
        new Date(word.next_review_at) <= now
      );
      setWordsToReview(dueWords);
    } catch (error) {
      console.error('Error fetching word progress:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Calculate new interval using SM-2 algorithm
  const calculateNextReview = (
    currentProgress: Partial<WordProgress> | null,
    result: ReviewResult
  ): { ease_factor: number; interval_days: number; repetitions: number; mastery_level: number } => {
    const easeFactor = currentProgress?.ease_factor || INITIAL_EASE_FACTOR;
    const repetitions = currentProgress?.repetitions || 0;
    const totalReviews = (currentProgress?.total_reviews || 0) + 1;
    const correctReviews = (currentProgress?.correct_reviews || 0) + (result.correct ? 1 : 0);
    
    let newEaseFactor = easeFactor;
    let newInterval: number;
    let newRepetitions: number;

    if (result.correct) {
      // Correct answer - increase interval
      newRepetitions = repetitions + 1;
      
      if (newRepetitions === 1) {
        newInterval = 1;
      } else if (newRepetitions === 2) {
        newInterval = 3;
      } else {
        newInterval = Math.round((currentProgress?.interval_days || 1) * easeFactor);
      }
      
      // Adjust ease factor based on performance
      const quality = result.pronunciationScore ? Math.min(5, Math.round(result.pronunciationScore / 20)) : 4;
      newEaseFactor = Math.max(MIN_EASE_FACTOR, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    } else {
      // Incorrect - reset repetitions
      newRepetitions = 0;
      newInterval = 1;
      newEaseFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.2);
    }

    // Calculate mastery level (0-100)
    const accuracy = totalReviews > 0 ? (correctReviews / totalReviews) * 100 : 0;
    const repetitionBonus = Math.min(50, newRepetitions * 10);
    const mastery_level = Math.min(100, Math.round((accuracy * 0.5) + repetitionBonus));

    return {
      ease_factor: Number(newEaseFactor.toFixed(2)),
      interval_days: newInterval,
      repetitions: newRepetitions,
      mastery_level
    };
  };

  // Record a review
  const recordReview = useCallback(async (
    wordKey: string,
    wordType: 'quranic' | 'grammar' | 'heritage',
    result: ReviewResult
  ) => {
    if (!userId) return;

    try {
      // Get current progress
      const existing = allProgress.find(p => p.word_key === wordKey);
      const nextReviewData = calculateNextReview(existing || null, result);
      
      const nextReviewAt = new Date();
      nextReviewAt.setDate(nextReviewAt.getDate() + nextReviewData.interval_days);

      // Calculate new pronunciation average
      const currentAvg = existing?.pronunciation_score_avg || 0;
      const totalReviews = (existing?.total_reviews || 0) + 1;
      const newPronunciationAvg = result.pronunciationScore 
        ? ((currentAvg * (totalReviews - 1)) + result.pronunciationScore) / totalReviews
        : currentAvg;

      const upsertData = {
        user_id: userId,
        word_key: wordKey,
        word_type: wordType,
        ease_factor: nextReviewData.ease_factor,
        interval_days: nextReviewData.interval_days,
        repetitions: nextReviewData.repetitions,
        next_review_at: nextReviewAt.toISOString(),
        last_reviewed_at: new Date().toISOString(),
        total_reviews: (existing?.total_reviews || 0) + 1,
        correct_reviews: (existing?.correct_reviews || 0) + (result.correct ? 1 : 0),
        pronunciation_score_avg: Number(newPronunciationAvg.toFixed(2)),
        mastery_level: nextReviewData.mastery_level,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('user_word_progress')
        .upsert(upsertData, { onConflict: 'user_id,word_key' });

      if (error) throw error;

      // Update local state
      await fetchProgress();
      
    } catch (error) {
      console.error('Error recording review:', error);
      toast({
        title: "Error",
        description: "Failed to save progress",
        variant: "destructive"
      });
    }
  }, [userId, allProgress, fetchProgress, toast]);

  // Get mastery stats
  const getMasteryStats = useCallback((wordType?: 'quranic' | 'grammar' | 'heritage') => {
    const filtered = wordType 
      ? allProgress.filter(p => p.word_type === wordType)
      : allProgress;

    if (filtered.length === 0) {
      return { averageMastery: 0, masteredCount: 0, learningCount: 0, newCount: 0 };
    }

    const totalMastery = filtered.reduce((sum, p) => sum + p.mastery_level, 0);
    const masteredCount = filtered.filter(p => p.mastery_level >= 80).length;
    const learningCount = filtered.filter(p => p.mastery_level > 0 && p.mastery_level < 80).length;

    return {
      averageMastery: Math.round(totalMastery / filtered.length),
      masteredCount,
      learningCount,
      newCount: filtered.filter(p => p.mastery_level === 0).length,
      totalWords: filtered.length
    };
  }, [allProgress]);

  // Get word progress by key
  const getWordProgress = useCallback((wordKey: string): WordProgress | undefined => {
    return allProgress.find(p => p.word_key === wordKey);
  }, [allProgress]);

  return {
    wordsToReview,
    allProgress,
    isLoading,
    recordReview,
    getMasteryStats,
    getWordProgress,
    refreshProgress: fetchProgress
  };
};
