import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export const useAccess = () => {
  const [user, setUser] = useState<User | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAccess = async (userId: string) => {
    try {
      // Use the database function to check access
      const { data, error } = await supabase.rpc('user_has_access', {
        p_user_id: userId
      });
      
      if (error) {
        console.error('Error checking access:', error);
        return false;
      }
      
      return data === true;
    } catch (err) {
      console.error('Error in checkAccess:', err);
      return false;
    }
  };

  const redeemCode = async (code: string): Promise<{ success: boolean; message: string }> => {
    try {
      const { data, error } = await supabase.rpc('redeem_access_code', {
        p_code: code
      });
      
      if (error) {
        return { success: false, message: error.message };
      }
      
      const result = data as { success: boolean; error?: string; message?: string };
      
      if (result.success) {
        // Refresh access status
        if (user) {
          const access = await checkAccess(user.id);
          setHasAccess(access);
        }
        return { success: true, message: result.message || 'Code redeemed successfully!' };
      }
      
      return { success: false, message: result.error || 'Failed to redeem code' };
    } catch (err) {
      return { success: false, message: 'An error occurred' };
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const access = await checkAccess(session.user.id);
          setHasAccess(access);
        } else {
          setHasAccess(false);
        }
        setLoading(false);
      }
    );

    // Initial check
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const access = await checkAccess(session.user.id);
        setHasAccess(access);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, hasAccess, loading, redeemCode };
};
