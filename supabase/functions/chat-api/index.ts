import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, ...params } = await req.json();
    console.log(`Chat API action: ${action}`, params);

    switch (action) {
      case 'create_conversation': {
        const { visitor_name, visitor_location } = params;
        
        const { data, error } = await supabase
          .from('chat_conversations')
          .insert({
            visitor_name,
            visitor_location,
            status: 'waiting',
          })
          .select()
          .single();

        if (error) {
          console.error('Error creating conversation:', error);
          throw error;
        }

        console.log('Created conversation:', data.id);
        return new Response(
          JSON.stringify({ success: true, conversation: data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'send_message': {
        const { conversation_id, content, sender_type } = params;

        // Validate conversation exists
        const { data: conversation } = await supabase
          .from('chat_conversations')
          .select('id')
          .eq('id', conversation_id)
          .single();

        if (!conversation) {
          return new Response(
            JSON.stringify({ success: false, error: 'Conversation not found' }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
          );
        }

        const { data, error } = await supabase
          .from('chat_messages')
          .insert({
            conversation_id,
            content,
            sender_type: sender_type || 'visitor',
          })
          .select()
          .single();

        if (error) {
          console.error('Error sending message:', error);
          throw error;
        }

        // Update conversation timestamp
        await supabase
          .from('chat_conversations')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', conversation_id);

        console.log('Message sent:', data.id);
        return new Response(
          JSON.stringify({ success: true, message: data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'get_messages': {
        const { conversation_id } = params;

        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('conversation_id', conversation_id)
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error fetching messages:', error);
          throw error;
        }

        return new Response(
          JSON.stringify({ success: true, messages: data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ success: false, error: 'Unknown action' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
        );
    }
  } catch (error) {
    console.error('Chat API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
