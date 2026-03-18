import { useState, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageSEO } from "@/components/layout/PageSEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Search, 
  Sparkles,
  BookOpen,
  BookMarked
} from "lucide-react";
import { ArabicAssistant } from "@/components/lab/ArabicAssistant";
import { WordAnalyzer } from "@/components/lab/WordAnalyzer";
import { QuranBrowser } from "@/components/lab/QuranBrowser";

const LabPage = () => {
  const [activeTab, setActiveTab] = useState("assistant");
  const [pendingVerse, setPendingVerse] = useState<{ text: string; key: string; translation?: string } | null>(null);

  // Handle verse selection from Quran Browser
  const handleVerseSelect = useCallback((verseText: string, verseKey: string, translation?: string) => {
    setPendingVerse({ text: verseText, key: verseKey, translation });
    setActiveTab("analyzer");
  }, []);

  // Clear pending verse after it's consumed
  const handlePendingVerseConsumed = useCallback(() => {
    setPendingVerse(null);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-8 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              100% FREE
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              Full Quran
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-english">
            Qur'anic Arabic Lab
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your intelligent Arabic learning companion. Browse the entire Quran, analyze any verse, 
            explore word roots, and get instant grammar explanations.
          </p>
        </div>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-6">
            <TabsTrigger value="assistant" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">AI Assistant</span>
              <span className="sm:hidden">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="quran" className="flex items-center gap-2">
              <BookMarked className="w-4 h-4" />
              <span className="hidden sm:inline">Quran Browser</span>
              <span className="sm:hidden">Quran</span>
            </TabsTrigger>
            <TabsTrigger value="analyzer" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Word Analyzer</span>
              <span className="sm:hidden">Analyze</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assistant" className="mt-0">
            <ArabicAssistant />
          </TabsContent>

          <TabsContent value="quran" className="mt-0">
            <QuranBrowser onSelectVerse={handleVerseSelect} />
          </TabsContent>

          <TabsContent value="analyzer" className="mt-0">
            <WordAnalyzer 
              initialText={pendingVerse?.text}
              initialVerseKey={pendingVerse?.key}
              initialTranslation={pendingVerse?.translation}
              onInitialTextConsumed={handlePendingVerseConsumed}
            />
          </TabsContent>
        </Tabs>

        {/* Features Overview */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
            <p className="text-sm text-muted-foreground">
              Ask questions about Arabic grammar, vocabulary, or get verse explanations.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
              <BookMarked className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Full Quran</h3>
            <p className="text-sm text-muted-foreground">
              Browse all 114 surahs, read verses with translations, and select for analysis.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Word Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Get complete morphological breakdowns: roots, patterns, gender, case, and more.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Root Explorer</h3>
            <p className="text-sm text-muted-foreground">
              Discover word families, related vocabulary, and verb conjugations.
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
          <p className="text-sm text-amber-200">
            ⚠️ <strong>Educational Tool Only:</strong> This lab provides grammatical analysis for learning purposes. 
            It is not a replacement for qualified teachers or authentic tafsīr.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LabPage;
