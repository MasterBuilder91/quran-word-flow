import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Trash2, BookOpen, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface WordAnalyzerProps {
  initialText?: string;
  initialVerseKey?: string;
  initialTranslation?: string;
  onInitialTextConsumed?: () => void;
}

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

interface AnalyzedWord extends AIAnalysisResult {
  id: string;
}

const demoTexts = [
  { label: "Al-Fatiha", text: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ" },
  { label: "Ayat al-Kursi", text: "ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ" },
  { label: "Surah Al-Ikhlas", text: "قُلْ هُوَ ٱللَّهُ أَحَدٌ" },
  { label: "Surah An-Nas", text: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ" }
];

export function WordAnalyzer({ initialText, initialVerseKey, initialTranslation, onInitialTextConsumed }: WordAnalyzerProps) {
  const [inputText, setInputText] = useState("");
  const [verseKey, setVerseKey] = useState<string | null>(null);
  const [translation, setTranslation] = useState<string | null>(null);
  const [analyzedWords, setAnalyzedWords] = useState<AnalyzedWord[]>([]);
  const [selectedWord, setSelectedWord] = useState<AnalyzedWord | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle initial text from Quran Browser
  useEffect(() => {
    if (initialText) {
      setInputText(initialText);
      setVerseKey(initialVerseKey || null);
      setTranslation(initialTranslation || null);
      onInitialTextConsumed?.();
    }
  }, [initialText, initialVerseKey, initialTranslation, onInitialTextConsumed]);

  const tokenize = (text: string): string[] => {
    return text.split(/\s+/).filter(word => word.trim().length > 0);
  };

  const handleAnalyze = useCallback(async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some Arabic text to analyze");
      return;
    }

    setIsLoading(true);
    setSelectedWord(null);

    try {
      const tokens = tokenize(inputText);
      
      const { data, error } = await supabase.functions.invoke('arabic-assistant', {
        body: { 
          action: 'analyze',
          data: { words: tokens }
        }
      });

      if (error) throw error;

      if (data?.success && data?.analysis) {
        const analyzed: AnalyzedWord[] = data.analysis.map((word: AIAnalysisResult, index: number) => ({
          ...word,
          id: `word-${index}`
        }));
        setAnalyzedWords(analyzed);
        toast.success(`Analyzed ${analyzed.length} words`);
      } else {
        throw new Error(data?.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to analyze text');
    } finally {
      setIsLoading(false);
    }
  }, [inputText]);

  const handleClear = () => {
    setInputText("");
    setVerseKey(null);
    setTranslation(null);
    setAnalyzedWords([]);
    setSelectedWord(null);
  };

  const getWordTypeColor = (type: string): string => {
    switch (type) {
      case 'particle':
        return 'border-blue-500/70 bg-blue-500/10 hover:bg-blue-500/20';
      case 'verb':
        return 'border-emerald-500/70 bg-emerald-500/10 hover:bg-emerald-500/20';
      case 'noun':
        return 'border-amber-500/70 bg-amber-500/10 hover:bg-amber-500/20';
      default:
        return 'border-muted-foreground/30 bg-muted/30';
    }
  };

  const getBadgeColor = (type: string): string => {
    switch (type) {
      case 'particle':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'verb':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'noun':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const copyAnalysis = () => {
    if (analyzedWords.length === 0) return;
    
    let text = "📖 Arabic Word Analysis\n\n";
    analyzedWords.forEach((word, i) => {
      text += `${i + 1}. ${word.word}\n`;
      text += `   Translation: ${word.translation}\n`;
      text += `   Type: ${word.partOfSpeech}\n`;
      if (word.root) text += `   Root: ${word.root}\n`;
      text += "\n";
    });
    
    navigator.clipboard.writeText(text);
    toast.success("Analysis copied!");
  };

  return (
    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
      {/* Left Column - Input & Output */}
      <div className="space-y-6">
        {/* Input Card */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              Word-by-Word Analyzer
            </h2>
          </div>
          
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste any Arabic text here..."
            className="min-h-[120px] text-xl leading-loose font-arabic text-right mb-4"
            dir="rtl"
          />
          
          <div className="flex flex-wrap gap-2 mb-4">
            {demoTexts.map((demo) => (
              <Button
                key={demo.label}
                variant="outline"
                size="sm"
                onClick={() => setInputText(demo.text)}
                className="text-xs"
              >
                {demo.label}
              </Button>
            ))}
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleAnalyze} 
              disabled={isLoading}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
              ) : (
                <><BookOpen className="w-4 h-4 mr-2" /> Analyze</>
              )}
            </Button>
            <Button variant="outline" onClick={handleClear}>
              <Trash2 className="w-4 h-4 mr-2" /> Clear
            </Button>
          </div>
        </Card>

        {/* Output Card */}
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Click any word for details</h3>
            {analyzedWords.length > 0 && (
              <Button variant="ghost" size="sm" onClick={copyAnalysis}>
                <Copy className="w-4 h-4 mr-2" /> Copy All
              </Button>
            )}
          </div>
          
          {analyzedWords.length > 0 ? (
            <div className="space-y-4">
              {/* Sahih International Translation Banner */}
              {translation && verseKey && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <BookOpen className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
                          Sahih International
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Quran {verseKey}
                        </span>
                      </div>
                      <p className="text-foreground/90 text-sm leading-relaxed italic">
                        "{translation}"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Word Analysis Grid */}
              <div className="p-4 rounded-xl border border-border bg-muted/30" dir="rtl">
                <div className="flex flex-wrap gap-3 justify-end">
                  {analyzedWords.map((word) => (
                    <div key={word.id} className="flex flex-col items-center">
                      <button
                        onClick={() => setSelectedWord(word)}
                        className={`px-4 py-2 rounded-xl border-2 text-xl font-arabic transition-all hover:-translate-y-0.5 cursor-pointer ${getWordTypeColor(word.partOfSpeech)} ${
                          selectedWord?.id === word.id ? 'ring-2 ring-primary shadow-lg' : ''
                        }`}
                      >
                        {word.word}
                      </button>
                      <span className="text-[11px] text-muted-foreground mt-1 max-w-[100px] text-center leading-tight" dir="ltr">
                        {word.translation}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-xl border border-dashed border-muted-foreground/30 text-center text-muted-foreground">
              Enter Arabic text above and click "Analyze"
            </div>
          )}

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded border-2 border-blue-500/70 bg-blue-500/20" />
              Particle (حرف)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded border-2 border-emerald-500/70 bg-emerald-500/20" />
              Verb (فعل)
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded border-2 border-amber-500/70 bg-amber-500/20" />
              Noun (اسم)
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column - Details Panel */}
      <div className="lg:sticky lg:top-4 lg:self-start">
        <Card className="p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4">Word Details</h3>

          {selectedWord ? (
            <div className="space-y-4">
              {/* Word Display */}
              <div className="text-center py-6 bg-muted/30 rounded-xl">
                <span className="text-5xl font-arabic" dir="rtl">
                  {selectedWord.word}
                </span>
                <p className="text-sm text-muted-foreground mt-3">
                  {selectedWord.transliteration}
                </p>
              </div>

              {/* Meaning */}
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-primary font-medium uppercase tracking-wide">Meaning</span>
                <p className="text-lg font-medium text-foreground mt-1">
                  {selectedWord.translation}
                </p>
              </div>

              {/* Type & Root */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/50">
                  <span className="text-xs text-muted-foreground">Part of Speech</span>
                  <Badge className={`mt-1 ${getBadgeColor(selectedWord.partOfSpeech)}`}>
                    {selectedWord.partOfSpeech}
                  </Badge>
                </div>
                {selectedWord.root && (
                  <div className="p-3 rounded-lg bg-muted/50">
                    <span className="text-xs text-muted-foreground">Root (جذر)</span>
                    <p className="text-lg font-arabic mt-1" dir="rtl">{selectedWord.root}</p>
                  </div>
                )}
              </div>

              {/* Grammatical Details */}
              {selectedWord.details && Object.keys(selectedWord.details).length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-foreground">Grammar Details</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedWord.details.tense && (
                      <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                        <span className="text-xs text-emerald-400">Tense</span>
                        <p className="text-foreground capitalize">{selectedWord.details.tense}</p>
                      </div>
                    )}
                    {selectedWord.details.form && (
                      <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                        <span className="text-xs text-emerald-400">Form</span>
                        <p className="text-foreground">Form {selectedWord.details.form}</p>
                      </div>
                    )}
                    {selectedWord.details.voice && (
                      <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                        <span className="text-xs text-emerald-400">Voice</span>
                        <p className="text-foreground capitalize">{selectedWord.details.voice}</p>
                      </div>
                    )}
                    {selectedWord.details.person && (
                      <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20">
                        <span className="text-xs text-emerald-400">Person</span>
                        <p className="text-foreground">{selectedWord.details.person}</p>
                      </div>
                    )}
                    {selectedWord.details.gender && (
                      <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                        <span className="text-xs text-amber-400">Gender</span>
                        <p className="text-foreground capitalize">{selectedWord.details.gender}</p>
                      </div>
                    )}
                    {selectedWord.details.number && (
                      <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                        <span className="text-xs text-amber-400">Number</span>
                        <p className="text-foreground capitalize">{selectedWord.details.number}</p>
                      </div>
                    )}
                    {selectedWord.details.definiteness && (
                      <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                        <span className="text-xs text-amber-400">Definiteness</span>
                        <p className="text-foreground capitalize">{selectedWord.details.definiteness}</p>
                      </div>
                    )}
                    {selectedWord.details.case && (
                      <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20">
                        <span className="text-xs text-amber-400">Case</span>
                        <p className="text-foreground capitalize">{selectedWord.details.case}</p>
                      </div>
                    )}
                    {selectedWord.details.particleType && (
                      <div className="p-2 rounded bg-blue-500/10 border border-blue-500/20 col-span-2">
                        <span className="text-xs text-blue-400">Particle Type</span>
                        <p className="text-foreground capitalize">{selectedWord.details.particleType}</p>
                      </div>
                    )}
                    {selectedWord.details.nounType && (
                      <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 col-span-2">
                        <span className="text-xs text-amber-400">Noun Type</span>
                        <p className="text-foreground capitalize">{selectedWord.details.nounType.replace(/-/g, ' ')}</p>
                      </div>
                    )}
                    {selectedWord.details.morphability && (
                      <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20 col-span-2">
                        <span className="text-xs text-purple-400">Morphability</span>
                        <p className="text-foreground capitalize">{selectedWord.details.morphability}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedWord.notes && (
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <span className="text-xs text-purple-400 font-medium">Notes</span>
                  <p className="mt-1 text-foreground/90 text-sm">{selectedWord.notes}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Select a word to see detailed analysis</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
