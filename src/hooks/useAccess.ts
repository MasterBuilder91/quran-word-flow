import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export const useAccess = () => {
  const [user, setUser] = useState<User | null>(null);
  // Always grant access - entire website is now free
  const [hasAccess] = useState(true);
  const [loading, setLoading] = useState(true);

  const redeemCode = async (_code: string): Promise<{ success: boolean; message: string }> => {
    // No longer needed - everything is free
    return { success: true, message: 'All content is now free!' };
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Initial check
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, hasAccess, loading, redeemCode };
};
