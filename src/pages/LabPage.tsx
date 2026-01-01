import { useState, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Trash2, BookOpen, Sparkles, ArrowRight, Loader2, Globe } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { 
  fullDictionary, 
  prefixes, 
  suffixes, 
  ArabicWordEntry 
} from "@/data/arabicDictionary";
import { analyzeWordMorphology, formatMorphologyDetails, MorphologyDetails } from "@/lib/quranMorphology";
import { supabase } from "@/integrations/supabase/client";

interface AIAnalysisResult {
  word: string;
  translation: string;
  transliteration: string;
  partOfSpeech: 'verb' | 'noun' | 'particle';
  root?: string;
  details: {
    particleType?: string;
    tense?: string;
    form?: string;
    voice?: string;
    person?: string;
    gender?: string;
    number?: string;
    definiteness?: string;
    case?: string;
    nounType?: string;
    morphability?: string;
  };
  notes?: string;
}

interface AnalyzedWord {
  original: string;
  entry: ArabicWordEntry | null;
  detectedPrefixes: string[];
  detectedSuffixes: string[];
  heuristicNotes: string[];
  translation?: string;
  transliteration?: string;
  morphology?: MorphologyDetails;
  aiAnalysis?: AIAnalysisResult;
}

interface QuranApiWord {
  id: number;
  position: number;
  text_uthmani?: string;
  text?: string;
  translation?: {
    text: string;
    language_name: string;
  };
  transliteration?: {
    text: string;
    language_name: string;
  };
  char_type_name: string;
}

const LabPage = () => {
  const [inputText, setInputText] = useState("");
  const [analyzedWords, setAnalyzedWords] = useState<AnalyzedWord[]>([]);
  const [selectedWord, setSelectedWord] = useState<AnalyzedWord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiSource, setApiSource] = useState<'local' | 'ai' | 'api' | null>(null);

  // Normalize Arabic text (remove some diacritics for lookup, keep original for display)
  const normalizeForLookup = (word: string): string => {
    return word.trim();
  };

  // Detect prefixes in a word
  const detectPrefixes = (word: string): { remaining: string; detected: string[] } => {
    const detected: string[] = [];
    let remaining = word;
    
    for (const { prefix, meaning, type } of prefixes) {
      if (remaining.startsWith(prefix) && remaining.length > prefix.length) {
        detected.push(`${prefix} (${meaning} - ${type})`);
        remaining = remaining.slice(prefix.length);
        break;
      }
    }
    
    return { remaining, detected };
  };

  // Detect suffixes in a word
  const detectSuffixes = (word: string): { remaining: string; detected: string[] } => {
    const detected: string[] = [];
    let remaining = word;
    
    for (const { suffix, meaning, type } of suffixes) {
      if (remaining.endsWith(suffix) && remaining.length > suffix.length) {
        detected.push(`${suffix} (${meaning} - ${type})`);
        remaining = remaining.slice(0, -suffix.length);
        break;
      }
    }
    
    return { remaining, detected };
  };

  // Analyze a single word with enhanced morphology
  const analyzeWord = (word: string, apiTranslation?: string, apiTransliteration?: string): AnalyzedWord => {
    const trimmed = word.trim();
    if (!trimmed) {
      return {
        original: word,
        entry: null,
        detectedPrefixes: [],
        detectedSuffixes: [],
        heuristicNotes: [],
      };
    }

    // Get morphology analysis
    const morphology = analyzeWordMorphology(trimmed);

    // First, try direct dictionary lookup
    const directMatch = fullDictionary[trimmed];
    if (directMatch) {
      return {
        original: trimmed,
        entry: directMatch,
        detectedPrefixes: [],
        detectedSuffixes: [],
        heuristicNotes: [],
        translation: apiTranslation,
        transliteration: apiTransliteration,
        morphology,
      };
    }

    // Try removing prefixes and looking up
    const { remaining: afterPrefix, detected: detectedPrefixes } = detectPrefixes(trimmed);
    if (afterPrefix !== trimmed) {
      const prefixMatch = fullDictionary[afterPrefix];
      if (prefixMatch) {
        return {
          original: trimmed,
          entry: prefixMatch,
          detectedPrefixes,
          detectedSuffixes: [],
          heuristicNotes: [],
          translation: apiTranslation,
          transliteration: apiTransliteration,
          morphology,
        };
      }
    }

    // Try removing suffixes and looking up
    const { remaining: afterSuffix, detected: detectedSuffixes } = detectSuffixes(trimmed);
    if (afterSuffix !== trimmed) {
      const suffixMatch = fullDictionary[afterSuffix];
      if (suffixMatch) {
        return {
          original: trimmed,
          entry: suffixMatch,
          detectedPrefixes: [],
          detectedSuffixes,
          heuristicNotes: [],
          translation: apiTranslation,
          transliteration: apiTransliteration,
          morphology,
        };
      }
    }

    // Try both prefix and suffix removal
    if (afterPrefix !== trimmed) {
      const { remaining: afterBoth, detected: suffixesAfterPrefix } = detectSuffixes(afterPrefix);
      const bothMatch = fullDictionary[afterBoth];
      if (bothMatch) {
        return {
          original: trimmed,
          entry: bothMatch,
          detectedPrefixes,
          detectedSuffixes: suffixesAfterPrefix,
          heuristicNotes: [],
          translation: apiTranslation,
          transliteration: apiTransliteration,
          morphology,
        };
      }
    }

    // No dictionary match - use morphology-based hints
    const morphHints = formatMorphologyDetails(morphology);
    
    return {
      original: trimmed,
      entry: null,
      detectedPrefixes,
      detectedSuffixes,
      heuristicNotes: morphHints,
      translation: apiTranslation,
      transliteration: apiTransliteration,
      morphology,
    };
  };

  // Tokenize Arabic text
  const tokenize = (text: string): string[] => {
    return text.split(/\s+/).filter(word => word.trim().length > 0);
  };

  // Try to fetch word-by-word data from Quran.com API
  const fetchFromQuranApi = async (text: string): Promise<QuranApiWord[] | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('quran-word-lookup', {
        body: { text }
      });
      
      if (error) {
        console.error('API error:', error);
        return null;
      }
      
      if (data?.success && data?.words?.length > 0) {
        return data.words;
      }
      
      return null;
    } catch (err) {
      console.error('Failed to fetch from API:', err);
      return null;
    }
  };

  // Use AI to analyze words
  const fetchAIAnalysis = async (words: string[]): Promise<AIAnalysisResult[] | null> => {
    try {
      const { data, error } = await supabase.functions.invoke('arabic-word-analysis', {
        body: { words }
      });
      
      if (error) {
        console.error('AI analysis error:', error);
        return null;
      }
      
      if (data?.success && data?.analysis) {
        return data.analysis;
      }
      
      return null;
    } catch (err) {
      console.error('Failed to fetch AI analysis:', err);
      return null;
    }
  };

  // Handle analysis with AI integration
  const handleAnalyze = useCallback(async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some Arabic text to analyze");
      return;
    }

    setIsLoading(true);
    setSelectedWord(null);

    try {
      // Tokenize the input
      const tokens = tokenize(inputText);
      
      // Use AI analysis for accurate meanings and grammar
      const aiResults = await fetchAIAnalysis(tokens);
      
      if (aiResults && aiResults.length > 0) {
        // Map AI results to AnalyzedWord format
        const analyzed: AnalyzedWord[] = aiResults.map((aiWord) => {
          // Also get local dictionary entry if available
          const entry = fullDictionary[aiWord.word] || null;
          
          // Convert AI analysis to morphology format
          const morphology: MorphologyDetails = {
            partOfSpeech: aiWord.partOfSpeech,
            root: aiWord.root,
            translation: aiWord.translation,
            transliteration: aiWord.transliteration,
          };
          
          // Add verb details
          if (aiWord.partOfSpeech === 'verb' && aiWord.details) {
            if (aiWord.details.tense) morphology.tense = aiWord.details.tense as MorphologyDetails['tense'];
            if (aiWord.details.form) morphology.verbForm = aiWord.details.form as MorphologyDetails['verbForm'];
            if (aiWord.details.voice) morphology.voice = aiWord.details.voice as MorphologyDetails['voice'];
            if (aiWord.details.person) morphology.person = aiWord.details.person as MorphologyDetails['person'];
            if (aiWord.details.gender) morphology.gender = aiWord.details.gender as MorphologyDetails['gender'];
            if (aiWord.details.number) morphology.number = aiWord.details.number as MorphologyDetails['number'];
          }
          
          // Add noun details
          if (aiWord.partOfSpeech === 'noun' && aiWord.details) {
            if (aiWord.details.gender) morphology.gender = aiWord.details.gender as MorphologyDetails['gender'];
            if (aiWord.details.number) morphology.number = aiWord.details.number as MorphologyDetails['number'];
            if (aiWord.details.definiteness) morphology.definiteness = aiWord.details.definiteness as MorphologyDetails['definiteness'];
            if (aiWord.details.case) morphology.case = aiWord.details.case as MorphologyDetails['case'];
            if (aiWord.details.morphability) morphology.morphability = aiWord.details.morphability as MorphologyDetails['morphability'];
            if (aiWord.details.nounType) morphology.nounType = aiWord.details.nounType as MorphologyDetails['nounType'];
          }
          
          return {
            original: aiWord.word,
            entry,
            detectedPrefixes: [],
            detectedSuffixes: [],
            heuristicNotes: aiWord.notes ? [aiWord.notes] : [],
            translation: aiWord.translation,
            transliteration: aiWord.transliteration,
            morphology,
            aiAnalysis: aiWord,
          };
        });
        
        setAnalyzedWords(analyzed);
        setApiSource('ai');
        toast.success(`Analyzed ${analyzed.length} words with AI`);
      } else {
        // Fallback to local analysis
        const analyzed = tokens.map(word => analyzeWord(word));
        setAnalyzedWords(analyzed);
        setApiSource('local');
        toast.success(`Analyzed ${analyzed.length} words (local analysis)`);
      }
    } catch (error) {
      console.error('Analysis error:', error);
      // Fallback to local
      const tokens = tokenize(inputText);
      const analyzed = tokens.map(word => analyzeWord(word));
      setAnalyzedWords(analyzed);
      setApiSource('local');
      toast.success(`Analyzed ${analyzed.length} words`);
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  // Handle clear
  const handleClear = () => {
    setInputText("");
    setAnalyzedWords([]);
    setSelectedWord(null);
    setApiSource(null);
  };

  // Load demo text
  const handleLoadDemo = () => {
    setInputText("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَالَمِينَ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ مَالِكِ يَوْمِ ٱلدِّينِ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ٱهْدِنَا ٱلصِّرَاطَ ٱلْمُسْتَقِيمَ صِرَاطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّالِّينَ");
  };

  // Generate shareable summary with morphology
  const generateSummary = (): string => {
    if (analyzedWords.length === 0) return "";

    let summary = "📖 Qur'anic Arabic Analysis\n";
    summary += "─".repeat(30) + "\n\n";

    analyzedWords.forEach((word, index) => {
      summary += `${index + 1}. ${word.original}\n`;
      
      // Use morphology or entry type
      const pos = word.morphology?.partOfSpeech || word.entry?.type || 'unknown';
      summary += `   Type: ${pos}\n`;
      
      if (word.translation) {
        summary += `   Translation: ${word.translation}\n`;
      }
      
      if (word.entry?.root || word.morphology?.root) {
        summary += `   Root: ${word.entry?.root || word.morphology?.root}\n`;
      }
      
      if (word.entry?.gloss) {
        summary += `   Meaning: ${word.entry.gloss}\n`;
      }
      
      // Add morphology details
      if (word.morphology) {
        if (word.morphology.partOfSpeech === 'verb') {
          if (word.morphology.tense) summary += `   Tense: ${word.morphology.tense}\n`;
          if (word.morphology.verbForm) summary += `   Form: ${word.morphology.verbForm}\n`;
          if (word.morphology.voice) summary += `   Voice: ${word.morphology.voice}\n`;
        }
        if (word.morphology.partOfSpeech === 'noun') {
          if (word.morphology.gender) summary += `   Gender: ${word.morphology.gender}\n`;
          if (word.morphology.number) summary += `   Number: ${word.morphology.number}\n`;
          if (word.morphology.definiteness) summary += `   Definiteness: ${word.morphology.definiteness}\n`;
          if (word.morphology.morphability) summary += `   Morphability: ${word.morphology.morphability}\n`;
        }
      }
      
      if (word.detectedPrefixes.length > 0) {
        summary += `   Prefixes: ${word.detectedPrefixes.join(", ")}\n`;
      }
      if (word.detectedSuffixes.length > 0) {
        summary += `   Suffixes: ${word.detectedSuffixes.join(", ")}\n`;
      }
      summary += "\n";
    });

    summary += "─".repeat(30) + "\n";
    summary += "Generated at QuranicArabicLab.com/lab\n";
    summary += "⚠️ Educational analysis only - not tafsīr";

    return summary;
  };

  // Copy summary to clipboard
  const handleCopySummary = () => {
    const summary = generateSummary();
    if (summary) {
      navigator.clipboard.writeText(summary);
      toast.success("Summary copied to clipboard!");
    }
  };

  // Get word type color - use morphology if available
  const getWordTypeColor = (word: AnalyzedWord): string => {
    const type = word.morphology?.partOfSpeech || word.entry?.type;
    switch (type) {
      case 'particle':
        return 'border-blue-500/70 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.15)]';
      case 'verb':
        return 'border-emerald-500/70 shadow-[inset_0_0_0_1px_rgba(16,185,129,0.15)]';
      case 'noun':
        return 'border-amber-500/70 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.15)]';
      default:
        return 'border-muted-foreground/30';
    }
  };

  // Get badge variant for word type
  const getBadgeVariant = (word: AnalyzedWord) => {
    const type = word.morphology?.partOfSpeech || word.entry?.type;
    switch (type) {
      case 'particle':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'verb':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'noun':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-muted text-muted-foreground border-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <Sparkles className="w-3 h-3 mr-1" />
              100% FREE
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Globe className="w-3 h-3 mr-1" />
              Quran.com API
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-english">
            Qur'anic Arabic Lab (Free)
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Paste any Qur'anic phrase and get a word-by-word breakdown with grammatical analysis: verb tenses, noun gender, number, definiteness, and morphability.
            <span className="block mt-1 text-amber-500/80 text-sm">
              ⚠️ Educational analysis only — not tafsīr or religious rulings.
            </span>
          </p>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <Badge variant="outline" className="text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />
              Verb Tense Detection
            </Badge>
            <Badge variant="outline" className="text-xs">
              <span className="w-2 h-2 rounded-full bg-amber-400 mr-2" />
              Noun Gender & Number
            </Badge>
            <Badge variant="outline" className="text-xs">
              <span className="w-2 h-2 rounded-full bg-blue-400 mr-2" />
              Morphability Analysis
            </Badge>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
          {/* Left Column - Input & Output */}
          <div className="space-y-6">
            {/* Input Card */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">1) Paste Arabic</h2>
                <span className="text-xs text-muted-foreground">
                  Works with any Qur'anic verse
                </span>
              </div>
              
              <label className="block text-sm text-muted-foreground mb-2">
                Arabic text (RTL)
              </label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="ٱهْدِنَا ٱلصِّرَاطَ ٱلْمُسْتَقِيمَ"
                className="min-h-[120px] text-xl leading-loose font-arabic text-right"
                dir="rtl"
              />
              
              <div className="flex flex-wrap gap-3 mt-4">
                <Button 
                  onClick={handleAnalyze} 
                  disabled={isLoading}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-4 h-4 mr-2" />
                      Analyze
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleClear}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
                <Button variant="ghost" onClick={handleLoadDemo} className="border border-dashed border-muted-foreground/30">
                  Load Al-Fatiha
                </Button>
              </div>
            </Card>

            {/* Output Card */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">2) Click any word</h2>
                {apiSource && (
                  <Badge variant="outline" className="text-xs">
                    {apiSource === 'ai' ? '🤖 AI Analysis' : apiSource === 'api' ? '🌐 API + Local' : '📚 Local Analysis'}
                  </Badge>
                )}
              </div>
              
              {analyzedWords.length > 0 ? (
                <div 
                  className="p-4 rounded-xl border border-border bg-muted/30 text-right leading-[2.5]"
                  dir="rtl"
                >
                  <div className="flex flex-wrap gap-3 justify-end">
                    {analyzedWords.map((word, index) => {
                      const meaning = word.translation || word.entry?.gloss;
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <button
                            onClick={() => setSelectedWord(word)}
                            className={`px-3 py-1 rounded-xl border-2 text-xl font-arabic transition-all hover:-translate-y-0.5 cursor-pointer bg-background/50 ${getWordTypeColor(word)} ${selectedWord?.original === word.original ? 'ring-2 ring-primary' : ''}`}
                            title={meaning || 'Click to analyze'}
                          >
                            {word.original}
                          </button>
                          {meaning && (
                            <span className="text-[10px] text-muted-foreground mt-1 max-w-[80px] text-center leading-tight" dir="ltr">
                              {meaning}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-xl border border-dashed border-muted-foreground/30 text-center text-muted-foreground">
                  Enter Arabic text above and click "Analyze" to see word breakdown
                </div>
              )}

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded border-2 border-blue-500/70" />
                  Particle
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded border-2 border-emerald-500/70" />
                  Verb
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded border-2 border-amber-500/70" />
                  Noun
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded border-2 border-muted-foreground/30" />
                  Unknown
                </div>
              </div>
            </Card>

            {/* Disclaimer */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Powered by AI:</strong> This tool uses AI-powered analysis for accurate 
              translations, part-of-speech identification, and detailed morphology. مِنْ is correctly identified as a 
              particle (preposition), not a noun!
            </p>
          </div>

          {/* Right Column - Details Panel */}
          <div className="space-y-6">
            {/* Word Details Card */}
            <Card className="p-6 bg-card border-border sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Word Details</h2>
                {analyzedWords.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={handleCopySummary}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Summary
                  </Button>
                )}
              </div>

              {selectedWord ? (
                <div className="space-y-4">
                  {/* Word Display */}
                  <div className="text-center py-4 bg-muted/30 rounded-xl">
                    <span className="text-4xl font-arabic" dir="rtl">
                      {selectedWord.original}
                    </span>
                    {selectedWord.transliteration && (
                      <p className="text-sm text-muted-foreground mt-2">{selectedWord.transliteration}</p>
                    )}
                  </div>

                  {/* MEANING - Most Important! */}
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="text-xs text-primary font-medium uppercase tracking-wide">Meaning</span>
                    <p className="text-lg font-medium text-foreground mt-1">
                      {selectedWord.translation || selectedWord.entry?.gloss || 'Meaning not found in dictionary'}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-[100px_1fr] gap-3 text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <Badge className={getBadgeVariant(selectedWord)}>
                      {selectedWord.morphology?.partOfSpeech || selectedWord.entry?.type || 'unknown'}
                    </Badge>
                    
                    <span className="text-muted-foreground">Root (جذر)</span>
                    <span className="font-arabic text-lg" dir="rtl">
                      {selectedWord.entry?.root || selectedWord.morphology?.root || '—'}
                    </span>
                  </div>

                  {/* Morphology Details */}
                  {selectedWord.morphology && (
                    <>
                      <div className="h-px bg-border my-4" />
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-foreground">Grammar Details</h4>
                        
                        {/* Verb-specific details */}
                        {selectedWord.morphology.partOfSpeech === 'verb' && (
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {selectedWord.morphology.tense && (
                              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                                <span className="text-xs text-emerald-400">Tense</span>
                                <p className="text-foreground capitalize">{selectedWord.morphology.tense}</p>
                              </div>
                            )}
                            {selectedWord.morphology.verbForm && (
                              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                                <span className="text-xs text-emerald-400">Form</span>
                                <p className="text-foreground">{selectedWord.morphology.verbForm}</p>
                              </div>
                            )}
                            {selectedWord.morphology.voice && (
                              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                                <span className="text-xs text-emerald-400">Voice</span>
                                <p className="text-foreground capitalize">{selectedWord.morphology.voice}</p>
                              </div>
                            )}
                            {selectedWord.morphology.person && (
                              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                                <span className="text-xs text-emerald-400">Person</span>
                                <p className="text-foreground">{selectedWord.morphology.person}</p>
                              </div>
                            )}
                            {selectedWord.morphology.gender && (
                              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                                <span className="text-xs text-emerald-400">Gender</span>
                                <p className="text-foreground capitalize">{selectedWord.morphology.gender}</p>
                              </div>
                            )}
                            {selectedWord.morphology.number && (
                              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                                <span className="text-xs text-emerald-400">Number</span>
                                <p className="text-foreground capitalize">{selectedWord.morphology.number}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Noun-specific details */}
                        {selectedWord.morphology.partOfSpeech === 'noun' && (
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {selectedWord.morphology.gender && (
                              <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                                <span className="text-xs text-amber-400">Gender</span>
                                <p className="text-foreground capitalize">{selectedWord.morphology.gender}</p>
                              </div>
                            )}
                            {selectedWord.morphology.number && (
                              <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                                <span className="text-xs text-amber-400">Number</span>
                                <p className="text-foreground capitalize">{selectedWord.morphology.number}</p>
                              </div>
                            )}
                            {selectedWord.morphology.definiteness && (
                              <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                                <span className="text-xs text-amber-400">Definiteness</span>
                                <p className="text-foreground capitalize">{selectedWord.morphology.definiteness}</p>
                              </div>
                            )}
                            {selectedWord.morphology.case && (
                              <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                                <span className="text-xs text-amber-400">Case</span>
                                <p className="text-foreground capitalize">{selectedWord.morphology.case}</p>
                              </div>
                            )}
                            {selectedWord.morphology.morphability && (
                              <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 col-span-2">
                                <span className="text-xs text-amber-400">Morphability</span>
                                <p className="text-foreground capitalize">
                                  {selectedWord.morphology.morphability === 'triptote' && 'Triptote (fully declinable)'}
                                  {selectedWord.morphology.morphability === 'diptote' && 'Diptote (partially declinable)'}
                                  {selectedWord.morphology.morphability === 'indeclinable' && 'Indeclinable'}
                                </p>
                              </div>
                            )}
                            {selectedWord.morphology.nounType && (
                              <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 col-span-2">
                                <span className="text-xs text-amber-400">Noun Type</span>
                                <p className="text-foreground capitalize">{selectedWord.morphology.nounType.replace(/-/g, ' ')}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Particle-specific details */}
                        {selectedWord.morphology.partOfSpeech === 'particle' && (
                          <div className="grid grid-cols-1 gap-2 text-sm">
                            <div className="p-2 rounded bg-blue-500/10 border border-blue-500/20">
                              <span className="text-xs text-blue-400">Particle Type</span>
                              <p className="text-foreground capitalize">
                                {selectedWord.aiAnalysis?.details?.particleType || 'particle'}
                              </p>
                            </div>
                            <div className="p-2 rounded bg-blue-500/10 border border-blue-500/20">
                              <span className="text-xs text-blue-400">Morphability</span>
                              <p className="text-foreground">Indeclinable (مبني)</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Prefixes & Suffixes */}
                  {(selectedWord.detectedPrefixes.length > 0 || selectedWord.detectedSuffixes.length > 0) && (
                    <>
                      <div className="h-px bg-border my-4" />
                      <div className="space-y-2 text-sm">
                        {selectedWord.detectedPrefixes.length > 0 && (
                          <div>
                            <span className="text-muted-foreground">Detected Prefixes:</span>
                            <ul className="mt-1 space-y-1">
                              {selectedWord.detectedPrefixes.map((p, i) => (
                                <li key={i} className="text-blue-400">{p}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {selectedWord.detectedSuffixes.length > 0 && (
                          <div>
                            <span className="text-muted-foreground">Detected Suffixes:</span>
                            <ul className="mt-1 space-y-1">
                              {selectedWord.detectedSuffixes.map((s, i) => (
                                <li key={i} className="text-amber-400">{s}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* AI Analysis Notes */}
                  {selectedWord.aiAnalysis?.notes && (
                    <>
                      <div className="h-px bg-border my-4" />
                      <div className="text-sm p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <span className="text-xs text-purple-400 font-medium">AI Notes</span>
                        <p className="mt-1 text-foreground/90">{selectedWord.aiAnalysis.notes}</p>
                      </div>
                    </>
                  )}

                  {/* Dictionary Notes */}
                  {selectedWord.entry?.notes && !selectedWord.aiAnalysis?.notes && (
                    <>
                      <div className="h-px bg-border my-4" />
                      <div className="text-sm">
                        <span className="text-muted-foreground">Notes:</span>
                        <p className="mt-1 text-foreground/80">{selectedWord.entry.notes}</p>
                      </div>
                    </>
                  )}

                  {/* Heuristic Notes for Unknown Words */}
                  {!selectedWord.entry && !selectedWord.aiAnalysis && selectedWord.heuristicNotes.length > 0 && (
                    <>
                      <div className="h-px bg-border my-4" />
                      <div className="text-sm">
                        <span className="text-muted-foreground">Analysis:</span>
                        <ul className="mt-2 space-y-1">
                          {selectedWord.heuristicNotes.map((note, i) => (
                            <li key={i} className="text-emerald-400 text-xs">• {note}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-8 text-center text-muted-foreground">
                    <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Select a word to see its grammatical analysis</p>
                  </div>
                </div>
              )}

              <div className="h-px bg-border my-6" />

              {/* Share Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-foreground">Share/Save Text</h3>
                  <span className="text-xs text-muted-foreground">Great for sharing your learning</span>
                </div>
                
                <div className="p-3 rounded-xl border border-border bg-muted/30 text-xs whitespace-pre-wrap max-h-40 overflow-y-auto font-mono">
                  {analyzedWords.length > 0 ? generateSummary() : "Run an analysis to generate a shareable summary…"}
                </div>
              </div>
            </Card>

            {/* CTA Card */}
            <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-gold/10 border-emerald-500/20">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ready for deeper learning?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you want structured guidance and live coaching to truly understand Qur'anic Arabic, explore our courses.
              </p>
              <Link to="/coaching">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-gold hover:from-emerald-600 hover:to-gold/90 text-white">
                  Explore Coaching
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>

        {/* Disclaimer Footer */}
        <div className="mt-12 p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 text-center">
          <p className="text-sm text-amber-500/90">
            ⚠️ <strong>Disclaimer:</strong> This tool provides educational Qur'anic Arabic analysis only. 
            It does not offer tafsir, interpretation, or religious rulings.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LabPage;
