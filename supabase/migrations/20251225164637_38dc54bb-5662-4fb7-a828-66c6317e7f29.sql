-- Create access_codes table for storing promo/access codes
CREATE TABLE public.access_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  description text,
  max_uses integer DEFAULT NULL, -- NULL means unlimited
  current_uses integer DEFAULT 0,
  expires_at timestamp with time zone DEFAULT NULL, -- NULL means never expires
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create redeemed_codes table to track who redeemed what
CREATE TABLE public.redeemed_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  access_code_id uuid NOT NULL REFERENCES public.access_codes(id) ON DELETE CASCADE,
  redeemed_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, access_code_id)
);

-- Enable RLS
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redeemed_codes ENABLE ROW LEVEL SECURITY;

-- RLS for access_codes: anyone can check if a code exists (for validation)
CREATE POLICY "Anyone can validate codes"
ON public.access_codes
FOR SELECT
USING (is_active = true);

-- RLS for redeemed_codes: users can see their own redemptions
CREATE POLICY "Users can view their own redemptions"
ON public.redeemed_codes
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own redemptions
CREATE POLICY "Users can redeem codes"
ON public.redeemed_codes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Function to redeem a code (handles validation and incrementing uses)
CREATE OR REPLACE FUNCTION public.redeem_access_code(p_code text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code_record access_codes%ROWTYPE;
  v_user_id uuid;
BEGIN
  v_user_id := auth.uid();
  
  IF v_user_id IS NULL THEN
    RETURN jsonb_build_object('success', false, 'error', 'Must be logged in');
  END IF;

  -- Find the code
  SELECT * INTO v_code_record
  FROM access_codes
  WHERE code = UPPER(TRIM(p_code))
    AND is_active = true;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Invalid code');
  END IF;

  -- Check expiry
  IF v_code_record.expires_at IS NOT NULL AND v_code_record.expires_at < now() THEN
    RETURN jsonb_build_object('success', false, 'error', 'Code has expired');
  END IF;

  -- Check max uses
  IF v_code_record.max_uses IS NOT NULL AND v_code_record.current_uses >= v_code_record.max_uses THEN
    RETURN jsonb_build_object('success', false, 'error', 'Code has reached maximum uses');
  END IF;

  -- Check if already redeemed by this user
  IF EXISTS (SELECT 1 FROM redeemed_codes WHERE user_id = v_user_id AND access_code_id = v_code_record.id) THEN
    RETURN jsonb_build_object('success', false, 'error', 'You have already redeemed this code');
  END IF;

  -- Redeem the code
  INSERT INTO redeemed_codes (user_id, access_code_id)
  VALUES (v_user_id, v_code_record.id);

  -- Increment usage
  UPDATE access_codes
  SET current_uses = current_uses + 1, updated_at = now()
  WHERE id = v_code_record.id;

  RETURN jsonb_build_object('success', true, 'message', 'Code redeemed successfully!');
END;
$$;

-- Function to check if user has access (via subscription OR code)
CREATE OR REPLACE FUNCTION public.user_has_access(p_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    -- Check active subscription
    SELECT 1 FROM subscriptions
    WHERE user_id = p_user_id
      AND status = 'active'
      AND (current_period_end IS NULL OR current_period_end > now())
  ) OR EXISTS (
    -- Check redeemed code
    SELECT 1 FROM redeemed_codes rc
    JOIN access_codes ac ON rc.access_code_id = ac.id
    WHERE rc.user_id = p_user_id
      AND ac.is_active = true
      AND (ac.expires_at IS NULL OR ac.expires_at > now())
  );
$$;