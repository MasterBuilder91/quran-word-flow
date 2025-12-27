-- Create user_gamification table for streaks and progress
CREATE TABLE public.user_gamification (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE,
  total_words_learned INTEGER NOT NULL DEFAULT 0,
  total_modules_completed INTEGER NOT NULL DEFAULT 0,
  referral_code TEXT UNIQUE,
  referrals_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT user_gamification_user_id_key UNIQUE (user_id)
);

-- Create badges table
CREATE TABLE public.badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  requirement_type TEXT NOT NULL,
  requirement_value INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_badges junction table
CREATE TABLE public.user_badges (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  badge_id UUID NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT user_badges_user_badge_unique UNIQUE (user_id, badge_id)
);

-- Create email_subscribers table for lead magnet
CREATE TABLE public.email_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  source TEXT DEFAULT 'cheat_sheet'
);

-- Create referrals table
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_user_id UUID NOT NULL,
  referred_user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT referrals_referred_user_unique UNIQUE (referred_user_id)
);

-- Enable RLS
ALTER TABLE public.user_gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_gamification
CREATE POLICY "Users can view their own gamification data"
  ON public.user_gamification FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own gamification data"
  ON public.user_gamification FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gamification data"
  ON public.user_gamification FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for badges (public read)
CREATE POLICY "Anyone can view badges"
  ON public.badges FOR SELECT
  USING (true);

-- RLS Policies for user_badges
CREATE POLICY "Users can view their own badges"
  ON public.user_badges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can earn badges"
  ON public.user_badges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for email_subscribers (insert only for public)
CREATE POLICY "Anyone can subscribe"
  ON public.email_subscribers FOR INSERT
  WITH CHECK (true);

-- RLS Policies for referrals
CREATE POLICY "Users can view their own referrals"
  ON public.referrals FOR SELECT
  USING (auth.uid() = referrer_user_id);

CREATE POLICY "Users can create referrals"
  ON public.referrals FOR INSERT
  WITH CHECK (auth.uid() = referred_user_id);

-- Insert default badges
INSERT INTO public.badges (slug, name, description, icon, requirement_type, requirement_value) VALUES
  ('first_word', 'First Steps', 'Learned your first word', 'Sparkles', 'words_learned', 1),
  ('ten_words', 'Building Blocks', 'Learned 10 words', 'BookOpen', 'words_learned', 10),
  ('fifty_words', 'Halfway Hero', 'Learned 50 words', 'Target', 'words_learned', 50),
  ('hundred_words', 'Centurion', 'Learned 100 words', 'Trophy', 'words_learned', 100),
  ('all_words', 'Master Scholar', 'Learned all 125 words', 'Crown', 'words_learned', 125),
  ('streak_3', 'Consistency', '3-day learning streak', 'Flame', 'streak', 3),
  ('streak_7', 'Week Warrior', '7-day learning streak', 'Zap', 'streak', 7),
  ('streak_30', 'Monthly Master', '30-day learning streak', 'Star', 'streak', 30),
  ('first_module', 'Module Starter', 'Completed your first module', 'CheckCircle', 'modules_completed', 1),
  ('all_modules', 'Curriculum Complete', 'Completed all modules', 'Award', 'modules_completed', 6),
  ('first_referral', 'Community Builder', 'Referred your first friend', 'Users', 'referrals', 1),
  ('three_referrals', 'Ambassador', 'Referred 3 friends', 'Heart', 'referrals', 3);

-- Create function to generate referral code
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  NEW.referral_code := UPPER(SUBSTRING(MD5(NEW.user_id::text || NOW()::text) FROM 1 FOR 8));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger to auto-generate referral code
CREATE TRIGGER set_referral_code
  BEFORE INSERT ON public.user_gamification
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_referral_code();

-- Create function to update streak
CREATE OR REPLACE FUNCTION public.update_user_streak()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.last_activity_date = CURRENT_DATE THEN
    RETURN NEW;
  END IF;
  
  IF OLD.last_activity_date = CURRENT_DATE - INTERVAL '1 day' THEN
    NEW.current_streak := OLD.current_streak + 1;
    IF NEW.current_streak > OLD.longest_streak THEN
      NEW.longest_streak := NEW.current_streak;
    END IF;
  ELSIF OLD.last_activity_date < CURRENT_DATE - INTERVAL '1 day' THEN
    NEW.current_streak := 1;
  END IF;
  
  NEW.last_activity_date := CURRENT_DATE;
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_streak_on_activity
  BEFORE UPDATE ON public.user_gamification
  FOR EACH ROW
  WHEN (NEW.last_activity_date IS DISTINCT FROM OLD.last_activity_date)
  EXECUTE FUNCTION public.update_user_streak();