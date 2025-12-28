-- Fix PUBLIC_DATA_EXPOSURE: Restrict chat tables to admin-only access
-- Visitors interact via chat-api edge function which uses service role

-- Drop overly permissive chat_conversations policies
DROP POLICY IF EXISTS "Anyone can view conversations" ON public.chat_conversations;

-- Create admin-only select policy for chat_conversations
CREATE POLICY "Admins can view conversations"
ON public.chat_conversations FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Drop overly permissive chat_messages policies
DROP POLICY IF EXISTS "Anyone can view messages" ON public.chat_messages;

-- Create admin-only select policy for chat_messages
CREATE POLICY "Admins can view messages"
ON public.chat_messages FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));