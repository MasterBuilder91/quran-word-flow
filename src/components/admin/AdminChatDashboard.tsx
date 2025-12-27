import { useState, useEffect, useRef } from 'react';
import { Send, MapPin, Clock, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { AdminLocationMap } from './AdminLocationMap';

interface VisitorLocation {
  lat: number;
  lng: number;
}

interface Conversation {
  id: string;
  visitor_name: string | null;
  visitor_location: VisitorLocation | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Message {
  id: string;
  content: string;
  sender_type: 'visitor' | 'admin';
  created_at: string;
}

export const AdminChatDashboard = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch all conversations
  useEffect(() => {
    const fetchConversations = async () => {
      const { data, error } = await supabase
        .from('chat_conversations')
        .select('*')
        .order('updated_at', { ascending: false });

      if (!error && data) {
        const mapped = data.map((conv) => ({
          ...conv,
          visitor_location: conv.visitor_location as unknown as VisitorLocation | null,
        }));
        setConversations(mapped);
      }
      setIsLoading(false);
    };

    fetchConversations();

    // Subscribe to new conversations
    const channel = supabase
      .channel('admin-conversations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_conversations',
        },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!selectedConversation) {
      setMessages([]);
      return;
    }

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', selectedConversation.id)
        .order('created_at', { ascending: true });

      if (!error && data) {
        setMessages(data as Message[]);
      }
    };

    fetchMessages();

    // Mark as active
    supabase
      .from('chat_conversations')
      .update({ status: 'active' })
      .eq('id', selectedConversation.id)
      .then();

    // Subscribe to new messages
    const channel = supabase
      .channel(`admin-chat-${selectedConversation.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${selectedConversation.id}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedConversation]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const content = newMessage.trim();
    setNewMessage('');

    try {
      const { error } = await supabase.from('chat_messages').insert({
        conversation_id: selectedConversation.id,
        content,
        sender_type: 'admin',
      });

      if (error) throw error;
    } catch (err) {
      console.error('Error sending message:', err);
      setNewMessage(content);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)] min-h-[500px]">
      {/* Conversations List */}
      <Card className="lg:col-span-1 overflow-hidden flex flex-col">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-lg">Conversations</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-0">
          {conversations.length === 0 ? (
            <p className="text-muted-foreground text-sm p-4 text-center">
              No conversations yet
            </p>
          ) : (
            <div className="divide-y divide-border">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`w-full p-4 text-left hover:bg-muted/50 transition-colors ${
                    selectedConversation?.id === conv.id ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {conv.visitor_name || 'Anonymous'}
                    </span>
                    <Badge
                      variant={conv.status === 'waiting' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {conv.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(conv.created_at), { addSuffix: true })}
                    </span>
                    {conv.visitor_location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Location shared
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chat Area */}
      <Card className="lg:col-span-2 overflow-hidden flex flex-col">
        {!selectedConversation ? (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to start chatting
          </div>
        ) : (
          <>
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">
                    {selectedConversation.visitor_name || 'Anonymous'}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Started {formatDistanceToNow(new Date(selectedConversation.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            </CardHeader>

            {/* Location Map */}
            {selectedConversation.visitor_location && (
              <div className="h-48 border-b border-border">
                <AdminLocationMap location={selectedConversation.visitor_location} />
              </div>
            )}

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No messages yet
                </p>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender_type === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                      msg.sender_type === 'admin'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input */}
            <div className="p-3 border-t border-border flex gap-2">
              <Input
                placeholder="Type a reply..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
