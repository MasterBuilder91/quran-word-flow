-- Drop and recreate user_has_access with SECURITY DEFINER
DROP FUNCTION IF EXISTS user_has_access();

CREATE OR REPLACE FUNCTION user_has_access()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
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