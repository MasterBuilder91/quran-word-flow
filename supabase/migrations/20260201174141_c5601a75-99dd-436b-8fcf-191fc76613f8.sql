-- Spaced Repetition System Tables

-- User word progress for SRS algorithm
CREATE TABLE public.user_word_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  word_key TEXT NOT NULL, -- e.g., "quranic_word_1" or "grammar_word_5"
  word_type TEXT NOT NULL DEFAULT 'quranic', -- 'quranic', 'grammar', 'heritage'
  
  -- SRS algorithm fields (SuperMemo SM-2 inspired)
  ease_factor DECIMAL(4,2) NOT NULL DEFAULT 2.5, -- Difficulty multiplier (1.3 - 2.5+)
  interval_days INTEGER NOT NULL DEFAULT 1, -- Days until next review
  repetitions INTEGER NOT NULL DEFAULT 0, -- Successful consecutive reviews
  
  -- Review scheduling
  next_review_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_reviewed_at TIMESTAMP WITH TIME ZONE,
  
  -- Performance tracking
  total_reviews INTEGER NOT NULL DEFAULT 0,
  correct_reviews INTEGER NOT NULL DEFAULT 0,
  pronunciation_score_avg DECIMAL(4,2) DEFAULT 0,
  
  -- Mastery level (0-100)
  mastery_level INTEGER NOT NULL DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(user_id, word_key)
);

-- Enable RLS
ALTER TABLE public.user_word_progress ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own word progress"
  ON public.user_word_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own word progress"
  ON public.user_word_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own word progress"
  ON public.user_word_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own word progress"
  ON public.user_word_progress FOR DELETE
  USING (auth.uid() = user_id);

-- Update timestamp trigger
CREATE TRIGGER update_user_word_progress_updated_at
  BEFORE UPDATE ON public.user_word_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes for efficient querying
CREATE INDEX idx_user_word_progress_user_id ON public.user_word_progress(user_id);
CREATE INDEX idx_user_word_progress_next_review ON public.user_word_progress(user_id, next_review_at);
CREATE INDEX idx_user_word_progress_mastery ON public.user_word_progress(user_id, mastery_level);

-- Study sessions table for analytics
CREATE TABLE public.study_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  session_type TEXT NOT NULL, -- 'vocabulary', 'grammar', 'pronunciation', 'listening'
  words_reviewed INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;

-- RLS policies for study sessions
CREATE POLICY "Users can view their own study sessions"
  ON public.study_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own study sessions"
  ON public.study_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own study sessions"
  ON public.study_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE INDEX idx_study_sessions_user_id ON public.study_sessions(user_id);
CREATE INDEX idx_study_sessions_started_at ON public.study_sessions(user_id, started_at DESC);