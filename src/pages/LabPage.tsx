import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Search, 
  Sparkles,
  BookOpen
} from "lucide-react";
import { ArabicAssistant } from "@/components/lab/ArabicAssistant";
import { WordAnalyzer } from "@/components/lab/WordAnalyzer";

const LabPage = () => {
  const [activeTab, setActiveTab] = useState("assistant");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
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
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-english">
            Qur'anic Arabic Lab
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your intelligent Arabic learning companion. Ask questions, analyze text, explore roots, 
            conjugate verbs, and dive deep into Quranic vocabulary.
          </p>
        </div>

        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="assistant" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">AI Assistant</span>
              <span className="sm:hidden">Chat</span>
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

          <TabsContent value="analyzer" className="mt-0">
            <WordAnalyzer />
          </TabsContent>
        </Tabs>

        {/* Features Overview */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Conversational Learning</h3>
            <p className="text-sm text-muted-foreground">
              Ask any question about Arabic grammar, vocabulary, or Quranic phrases in natural language.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Deep Word Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Get complete morphological breakdowns: roots, patterns, gender, number, case, and more.
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-card border border-border">
            <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Verse Explanations</h3>
            <p className="text-sm text-muted-foreground">
              Look up any Quran verse by reference and get word-by-word breakdowns with grammar notes.
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
