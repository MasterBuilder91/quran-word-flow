-- Fix user_has_access function to use auth.uid() directly instead of accepting p_user_id parameter
-- This prevents potential manipulation of the user_id parameter

CREATE OR REPLACE FUNCTION public.user_has_access()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    -- Check active subscription
    SELECT 1 FROM subscriptions
    WHERE user_id = auth.uid()
      AND status = 'active'
      AND (current_period_end IS NULL OR current_period_end > now())
  ) OR EXISTS (
    -- Check redeemed code
    SELECT 1 FROM redeemed_codes rc
    JOIN access_codes ac ON rc.access_code_id = ac.id
    WHERE rc.user_id = auth.uid()
      AND ac.is_active = true
      AND (ac.expires_at IS NULL OR ac.expires_at > now())
  );
$$;

-- Drop the old function with parameter (different signature)
DROP FUNCTION IF EXISTS public.user_has_access(uuid);