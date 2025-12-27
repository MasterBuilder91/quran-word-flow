import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  sender_type: 'visitor' | 'admin';
  created_at: string;
}

export const VisitorChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`chat-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `conversation_id=eq.${conversationId}`,
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
  }, [conversationId]);

  const getLocation = async (): Promise<{ lat: number; lng: number } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => resolve(null),
        { timeout: 5000 }
      );
    });
  };

  const startConversation = async () => {
    if (!visitorName.trim()) return;
    
    setIsLoading(true);
    try {
      const location = await getLocation();
      
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert({
          visitor_name: visitorName.trim(),
          visitor_location: location,
          status: 'waiting',
        })
        .select()
        .single();

      if (error) throw error;
      
      setConversationId(data.id);
      setHasStarted(true);
    } catch (err) {
      console.error('Error starting conversation:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !conversationId) return;

    const content = newMessage.trim();
    setNewMessage('');

    try {
      const { error } = await supabase.from('chat_messages').insert({
        conversation_id: conversationId,
        content,
        sender_type: 'visitor',
      });

      if (error) throw error;
    } catch (err) {
      console.error('Error sending message:', err);
      setNewMessage(content);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 rounded-xl overflow-hidden shadow-lg border border-border bg-card"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-primary-foreground">Live Chat</h3>
                <p className="text-xs text-primary-foreground/80">We're here to help</p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="h-80 flex flex-col">
              {!hasStarted ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
                  <MessageCircle className="h-12 w-12 text-primary" />
                  <p className="text-sm text-muted-foreground text-center">
                    Enter your name to start chatting
                  </p>
                  <Input
                    placeholder="Your name"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && startConversation()}
                  />
                  <Button
                    onClick={startConversation}
                    disabled={!visitorName.trim() || isLoading}
                    className="w-full"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Start Chat'
                    )}
                  </Button>
                </div>
              ) : (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-8">
                        Send a message to start the conversation
                      </p>
                    )}
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sender_type === 'visitor' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                            msg.sender_type === 'visitor'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-3 border-t border-border flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button size="icon" onClick={sendMessage} disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
    </>
  );
};
