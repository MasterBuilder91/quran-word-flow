import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface GamificationData {
  currentStreak: number;
  longestStreak: number;
  totalWordsLearned: number;
  totalModulesCompleted: number;
  referralCode: string | null;
  referralsCount: number;
}

interface Badge {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export const useGamification = () => {
  const [data, setData] = useState<GamificationData | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      } else {
        setLoading(false);
      }
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUserId(session?.user?.id ?? null);
      if (!session) {
        setData(null);
        setEarnedBadges([]);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      
      setLoading(true);
      
      // Fetch or create gamification data
      let { data: gamData, error } = await supabase
        .from('user_gamification')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (!gamData && !error) {
        // Create gamification record for new user
        const { data: newData } = await supabase
          .from('user_gamification')
          .insert({ user_id: userId })
          .select()
          .single();
        gamData = newData;
      }

      if (gamData) {
        setData({
          currentStreak: gamData.current_streak,
          longestStreak: gamData.longest_streak,
          totalWordsLearned: gamData.total_words_learned,
          totalModulesCompleted: gamData.total_modules_completed,
          referralCode: gamData.referral_code,
          referralsCount: gamData.referrals_count,
        });
      }

      // Fetch all badges
      const { data: allBadges } = await supabase
        .from('badges')
        .select('*')
        .order('requirement_value');

      if (allBadges) {
        setBadges(allBadges.map(b => ({
          id: b.id,
          slug: b.slug,
          name: b.name,
          description: b.description,
          icon: b.icon,
        })));
      }

      // Fetch earned badges
      const { data: userBadges } = await supabase
        .from('user_badges')
        .select('badge_id, earned_at, badges(*)')
        .eq('user_id', userId);

      if (userBadges) {
        setEarnedBadges(userBadges.map((ub: any) => ({
          id: ub.badges.id,
          slug: ub.badges.slug,
          name: ub.badges.name,
          description: ub.badges.description,
          icon: ub.badges.icon,
          earnedAt: ub.earned_at,
        })));
      }

      setLoading(false);
    };

    fetchData();
  }, [userId]);

  const recordActivity = useCallback(async () => {
    if (!userId) return;
    
    await supabase
      .from('user_gamification')
      .update({ last_activity_date: new Date().toISOString().split('T')[0] })
      .eq('user_id', userId);
  }, [userId]);

  const updateProgress = useCallback(async (wordsLearned?: number, modulesCompleted?: number) => {
    if (!userId || !data) return;

    const updates: any = {};
    if (wordsLearned !== undefined) {
      updates.total_words_learned = data.totalWordsLearned + wordsLearned;
    }
    if (modulesCompleted !== undefined) {
      updates.total_modules_completed = data.totalModulesCompleted + modulesCompleted;
    }

    if (Object.keys(updates).length > 0) {
      await supabase
        .from('user_gamification')
        .update(updates)
        .eq('user_id', userId);
    }
  }, [userId, data]);

  // Calculate progress percentage toward 50% Quran coverage (125 words)
  const progressPercentage = data ? Math.min((data.totalWordsLearned / 125) * 100, 100) : 0;

  return {
    data,
    badges,
    earnedBadges,
    loading,
    isAuthenticated: !!userId,
    progressPercentage,
    recordActivity,
    updateProgress,
  };
};
