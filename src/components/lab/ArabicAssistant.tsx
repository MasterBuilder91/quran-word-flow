import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Loader2, 
  BookOpen, 
  Sparkles, 
  RotateCcw,
  Search,
  BookMarked,
  Languages,
  GitBranch,
  GraduationCap,
  Lightbulb,
  Copy,
  Check
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  prompt: string;
  placeholder: string;
}

const quickActions: QuickAction[] = [
  {
    id: 'analyze',
    label: 'Analyze Text',
    icon: <Search className="w-4 h-4" />,
    prompt: 'Analyze this Arabic text word by word: ',
    placeholder: 'Paste Arabic text...'
  },
  {
    id: 'verse',
    label: 'Verse Lookup',
    icon: <BookMarked className="w-4 h-4" />,
    prompt: 'Look up and explain Quran verse ',
    placeholder: 'e.g., 2:255 or Al-Baqarah 255'
  },
  {
    id: 'root',
    label: 'Explore Root',
    icon: <GitBranch className="w-4 h-4" />,
    prompt: 'Explore the Arabic root ',
    placeholder: 'e.g., ك ت ب or كتب'
  },
  {
    id: 'conjugate',
    label: 'Conjugate Verb',
    icon: <Languages className="w-4 h-4" />,
    prompt: 'Conjugate the Arabic verb ',
    placeholder: 'e.g., كَتَبَ or يَكْتُبُ'
  },
  {
    id: 'grammar',
    label: 'Grammar Help',
    icon: <GraduationCap className="w-4 h-4" />,
    prompt: 'Explain this Arabic grammar concept: ',
    placeholder: 'e.g., إعراب, حروف الجر, الفعل المضارع'
  },
  {
    id: 'translate',
    label: 'Translate',
    icon: <Lightbulb className="w-4 h-4" />,
    prompt: 'Translate and explain: ',
    placeholder: 'Any Arabic or English text'
  }
];

const exampleQueries = [
  "What's the difference between مِنْ and عَنْ?",
  "Analyze: إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ",
  "Explain the root ح م د",
  "Look up verse 1:1",
  "How do I conjugate Form II verbs?",
  "What are the types of إعراب?"
];

export function ArabicAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Stream chat response
  const streamChat = useCallback(async (userMessage: string) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/arabic-assistant`;
    
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        action: 'chat',
        data: { message: userMessage },
        messages: messages.map(m => ({ role: m.role, content: m.content }))
      }),
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.error || `Request failed: ${resp.status}`);
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantContent = "";
    const assistantId = `msg-${Date.now()}-assistant`;

    // Add empty assistant message
    setMessages(prev => [...prev, {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      textBuffer += decoder.decode(value, { stream: true });
      
      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages(prev => 
              prev.map(m => m.id === assistantId 
                ? { ...m, content: assistantContent } 
                : m
              )
            );
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setActiveAction(null);
    setIsLoading(true);

    try {
      await streamChat(trimmed);
    } catch (error) {
      console.error('Chat error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to get response');
      // Remove the empty assistant message if there was an error
      setMessages(prev => prev.filter(m => m.content !== ''));
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    setActiveAction(action.id);
    setInput(action.prompt);
    inputRef.current?.focus();
  };

  const handleExampleQuery = (query: string) => {
    setInput(query);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyMessage = async (content: string, id: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success("Copied to clipboard");
  };

  const clearChat = () => {
    setMessages([]);
    setInput("");
    setActiveAction(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] min-h-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              100% Free
            </Badge>
          </div>
          <h2 className="text-xl font-bold text-foreground">Arabic Learning Assistant</h2>
          <p className="text-sm text-muted-foreground">
            Ask anything about Arabic, Quranic vocabulary, grammar, or verse explanations
          </p>
        </div>
        {messages.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearChat}>
            <RotateCcw className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant={activeAction === action.id ? "default" : "outline"}
            size="sm"
            className="justify-start text-xs"
            onClick={() => handleQuickAction(action)}
          >
            {action.icon}
            <span className="ml-1.5 truncate">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col overflow-hidden bg-card/50 border-border">
        <ScrollArea ref={scrollRef} className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Welcome to the Arabic Lab
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mb-6">
                I can help you analyze Arabic text, explore word roots, explain grammar, 
                look up Quranic verses, and conjugate verbs. Just ask!
              </p>
              
              <div className="w-full max-w-lg">
                <p className="text-xs text-muted-foreground mb-3">Try these examples:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {exampleQueries.map((query, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleExampleQuery(query)}
                    >
                      {query}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 border border-border'
                    }`}
                  >
                    {/* Message content with markdown-like rendering */}
                    <div 
                      className={`prose prose-sm max-w-none ${
                        message.role === 'user' ? 'prose-invert' : ''
                      }`}
                    >
                      {message.content.split('\n').map((line, i) => {
                        // Handle headers
                        if (line.startsWith('### ')) {
                          return <h4 key={i} className="text-base font-bold mt-3 mb-1">{line.slice(4)}</h4>;
                        }
                        if (line.startsWith('## ')) {
                          return <h3 key={i} className="text-lg font-bold mt-4 mb-2">{line.slice(3)}</h3>;
                        }
                        if (line.startsWith('# ')) {
                          return <h2 key={i} className="text-xl font-bold mt-4 mb-2">{line.slice(2)}</h2>;
                        }
                        // Handle bullet points
                        if (line.startsWith('• ') || line.startsWith('- ') || line.startsWith('* ')) {
                          return <p key={i} className="ml-4">{line}</p>;
                        }
                        // Handle numbered lists
                        if (/^\d+\.\s/.test(line)) {
                          return <p key={i} className="ml-4">{line}</p>;
                        }
                        // Handle bold text
                        const boldParts = line.split(/\*\*(.*?)\*\*/g);
                        if (boldParts.length > 1) {
                          return (
                            <p key={i}>
                              {boldParts.map((part, j) => 
                                j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                              )}
                            </p>
                          );
                        }
                        // Regular text
                        if (line.trim()) {
                          return <p key={i}>{line}</p>;
                        }
                        return <br key={i} />;
                      })}
                    </div>
                    
                    {/* Copy button for assistant messages */}
                    {message.role === 'assistant' && message.content && (
                      <div className="flex justify-end mt-2 pt-2 border-t border-border/50">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs"
                          onClick={() => copyMessage(message.content, message.id)}
                        >
                          {copiedId === message.id ? (
                            <><Check className="w-3 h-3 mr-1" /> Copied</>
                          ) : (
                            <><Copy className="w-3 h-3 mr-1" /> Copy</>
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && messages[messages.length - 1]?.content === '' && (
                <div className="flex justify-start">
                  <div className="bg-muted/50 border border-border rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-background/50">
          <div className="flex gap-2">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                activeAction 
                  ? quickActions.find(a => a.id === activeAction)?.placeholder 
                  : "Ask about Arabic, paste text to analyze, or type a verse reference..."
              }
              className="min-h-[60px] max-h-[120px] resize-none"
              dir="auto"
            />
            <Button 
              onClick={handleSend} 
              disabled={!input.trim() || isLoading}
              className="h-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send • Shift+Enter for new line
          </p>
        </div>
      </Card>

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground mt-3 text-center">
        ⚠️ Educational tool only — not a replacement for qualified teachers or authentic tafsīr
      </p>
    </div>
  );
}
