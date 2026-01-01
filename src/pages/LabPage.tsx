import { useState, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Trash2, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { 
  fullDictionary, 
  prefixes, 
  suffixes, 
  ArabicWordEntry 
} from "@/data/arabicDictionary";

interface AnalyzedWord {
  original: string;
  entry: ArabicWordEntry | null;
  detectedPrefixes: string[];
  detectedSuffixes: string[];
  heuristicNotes: string[];
}

const LabPage = () => {
  const [inputText, setInputText] = useState("");
  const [analyzedWords, setAnalyzedWords] = useState<AnalyzedWord[]>([]);
  const [selectedWord, setSelectedWord] = useState<AnalyzedWord | null>(null);

  // Normalize Arabic text (remove some diacritics for lookup, keep original for display)
  const normalizeForLookup = (word: string): string => {
    // Keep the word mostly as-is for dictionary lookup
    // Just trim whitespace
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
        break; // Only detect one prefix layer for simplicity
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
        break; // Only detect one suffix layer for simplicity
      }
    }
    
    return { remaining, detected };
  };

  // Generate heuristic notes for unknown words
  const generateHeuristicNotes = (word: string): string[] => {
    const notes: string[] = [];
    
    // Check for definite article
    if (word.startsWith('ٱلْ') || word.startsWith('ال')) {
      notes.push('Definite article (ال) detected - likely a noun');
    }
    
    // Check for common verb prefixes (imperfect tense markers)
    if (word.startsWith('يَ') || word.startsWith('ي')) {
      notes.push('Prefix يـ suggests 3rd person masculine present tense verb');
    } else if (word.startsWith('تَ') || word.startsWith('ت')) {
      notes.push('Prefix تـ suggests 2nd person or 3rd feminine present tense verb');
    } else if (word.startsWith('أَ') || word.startsWith('أ')) {
      notes.push('Prefix أ suggests 1st person singular present tense verb or Form IV');
    } else if (word.startsWith('نَ') || word.startsWith('ن')) {
      notes.push('Prefix نـ suggests 1st person plural present tense verb');
    }
    
    // Check for feminine markers
    if (word.includes('ة') || word.endsWith('ة')) {
      notes.push('Feminine marker (ة) detected');
    }
    
    // Check for plural patterns
    if (word.endsWith('ونَ') || word.endsWith('ون')) {
      notes.push('Masculine plural verb/noun ending (-ون)');
    } else if (word.endsWith('ينَ') || word.endsWith('ين')) {
      notes.push('Masculine plural noun ending (-ين) - genitive/accusative');
    } else if (word.endsWith('ات')) {
      notes.push('Feminine plural ending (-ات)');
    }
    
    // Check for dual
    if (word.endsWith('انِ') || word.endsWith('ان')) {
      notes.push('Dual ending (-ان) nominative');
    } else if (word.endsWith('يْنِ') || word.endsWith('ين')) {
      notes.push('Possible dual ending (-ين) genitive/accusative');
    }
    
    // Check for attached pronouns
    if (word.endsWith('هُمْ') || word.endsWith('هم')) {
      notes.push('Attached pronoun: هم (them/their)');
    } else if (word.endsWith('هُ') || (word.endsWith('ه') && word.length > 2)) {
      notes.push('Attached pronoun: ه (him/his/it)');
    } else if (word.endsWith('هَا') || word.endsWith('ها')) {
      notes.push('Attached pronoun: ها (her/hers/it)');
    } else if (word.endsWith('نَا') || word.endsWith('نا')) {
      notes.push('Attached pronoun: نا (us/our)');
    } else if (word.endsWith('كَ') || (word.endsWith('ك') && word.length > 2)) {
      notes.push('Attached pronoun: ك (you/your - masculine singular)');
    } else if (word.endsWith('كُمْ') || word.endsWith('كم')) {
      notes.push('Attached pronoun: كم (you all/your - plural)');
    }
    
    // Check for shadda (gemination)
    if (word.includes('ّ')) {
      notes.push('Shadda (ّ) indicates doubled letter - may suggest Form II verb or intensive form');
    }
    
    // Check for tanween (nunation)
    if (word.includes('ً') || word.includes('ٍ') || word.includes('ٌ')) {
      notes.push('Tanween detected - indicates indefinite noun');
    }
    
    return notes;
  };

  // Analyze a single word
  const analyzeWord = (word: string): AnalyzedWord => {
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

    // First, try direct dictionary lookup
    const directMatch = fullDictionary[trimmed];
    if (directMatch) {
      return {
        original: trimmed,
        entry: directMatch,
        detectedPrefixes: [],
        detectedSuffixes: [],
        heuristicNotes: [],
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
        };
      }
    }

    // No dictionary match - provide heuristic analysis
    return {
      original: trimmed,
      entry: null,
      detectedPrefixes,
      detectedSuffixes,
      heuristicNotes: generateHeuristicNotes(trimmed),
    };
  };

  // Tokenize Arabic text
  const tokenize = (text: string): string[] => {
    // Split on whitespace and filter empty strings
    return text.split(/\s+/).filter(word => word.trim().length > 0);
  };

  // Handle analysis
  const handleAnalyze = useCallback(() => {
    if (!inputText.trim()) {
      toast.error("Please enter some Arabic text to analyze");
      return;
    }

    const tokens = tokenize(inputText);
    const analyzed = tokens.map(analyzeWord);
    setAnalyzedWords(analyzed);
    setSelectedWord(null);
    toast.success(`Analyzed ${analyzed.length} words`);
  }, [inputText]);

  // Handle clear
  const handleClear = () => {
    setInputText("");
    setAnalyzedWords([]);
    setSelectedWord(null);
  };

  // Load demo text
  const handleLoadDemo = () => {
    setInputText("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَالَمِينَ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ مَالِكِ يَوْمِ ٱلدِّينِ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ٱهْدِنَا ٱلصِّرَاطَ ٱلْمُسْتَقِيمَ صِرَاطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّالِّينَ");
  };

  // Generate shareable summary
  const generateSummary = (): string => {
    if (analyzedWords.length === 0) return "";

    let summary = "📖 Qur'anic Arabic Analysis\n";
    summary += "─".repeat(30) + "\n\n";

    analyzedWords.forEach((word, index) => {
      summary += `${index + 1}. ${word.original}\n`;
      if (word.entry) {
        summary += `   Type: ${word.entry.type}\n`;
        if (word.entry.root) summary += `   Root: ${word.entry.root}\n`;
        summary += `   Meaning: ${word.entry.gloss}\n`;
        if (word.entry.notes) summary += `   Notes: ${word.entry.notes}\n`;
      } else {
        summary += `   Type: unknown\n`;
        if (word.heuristicNotes.length > 0) {
          summary += `   Hints: ${word.heuristicNotes.join("; ")}\n`;
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

  // Get word type color
  const getWordTypeColor = (type: string | undefined): string => {
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
  const getBadgeVariant = (type: string | undefined) => {
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
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 font-english">
            Qur'anic Arabic Lab (Free)
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Paste a Qur'anic phrase and get a word-by-word breakdown (particles, roots, verb clues, and grammar notes).
            <span className="block mt-1 text-amber-500/80 text-sm">
              ⚠️ Educational analysis only — not tafsīr or religious rulings.
            </span>
          </p>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <Badge variant="outline" className="text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />
              Zero backend
            </Badge>
            <Badge variant="outline" className="text-xs">
              <span className="w-2 h-2 rounded-full bg-blue-400 mr-2" />
              Zero API cost
            </Badge>
            <Badge variant="outline" className="text-xs">
              <span className="w-2 h-2 rounded-full bg-amber-400 mr-2" />
              Runs in browser
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
                  Tip: try "ٱهْدِنَا ٱلصِّرَاطَ ٱلْمُسْتَقِيمَ"
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
                <Button onClick={handleAnalyze} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Analyze
                </Button>
                <Button variant="outline" onClick={handleClear}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
                <Button variant="ghost" onClick={handleLoadDemo} className="border border-dashed border-muted-foreground/30">
                  Load Demo
                </Button>
              </div>
            </Card>

            {/* Output Card */}
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">2) Click any word</h2>
                <span className="text-xs text-muted-foreground">
                  Particles/verbs/nouns are color-outlined
                </span>
              </div>
              
              {analyzedWords.length > 0 ? (
                <div 
                  className="p-4 rounded-xl border border-border bg-muted/30 text-right leading-[2.5]"
                  dir="rtl"
                >
                  {analyzedWords.map((word, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedWord(word)}
                      className={`inline-block mx-1 my-1 px-3 py-1 rounded-xl border-2 text-xl font-arabic transition-all hover:-translate-y-0.5 cursor-pointer bg-background/50 ${getWordTypeColor(word.entry?.type)} ${selectedWord?.original === word.original ? 'ring-2 ring-primary' : ''}`}
                    >
                      {word.original}
                    </button>
                  ))}
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
              <strong className="text-foreground">Accuracy & Scope:</strong> This tool uses deterministic rules + a growing word list.
              Arabic morphology has edge cases. If a word is unknown, it will show "unknown" and still give helpful prefix/suffix hints.
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
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-[100px_1fr] gap-3 text-sm">
                    <span className="text-muted-foreground">Selected</span>
                    <span className="font-arabic text-lg" dir="rtl">{selectedWord.original}</span>
                    
                    <span className="text-muted-foreground">Type</span>
                    <Badge className={getBadgeVariant(selectedWord.entry?.type)}>
                      {selectedWord.entry?.type || 'unknown'}
                    </Badge>
                    
                    <span className="text-muted-foreground">Root (جذر)</span>
                    <span className="font-arabic" dir="rtl">
                      {selectedWord.entry?.root || '—'}
                    </span>
                    
                    <span className="text-muted-foreground">Gloss</span>
                    <span>{selectedWord.entry?.gloss || '—'}</span>
                    
                    <span className="text-muted-foreground">Notes</span>
                    <span className="text-sm leading-relaxed">
                      {selectedWord.entry?.notes || '—'}
                    </span>
                  </div>

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

                  {/* Heuristic Notes for Unknown Words */}
                  {!selectedWord.entry && selectedWord.heuristicNotes.length > 0 && (
                    <>
                      <div className="h-px bg-border my-4" />
                      <div className="text-sm">
                        <span className="text-muted-foreground">Structural Hints:</span>
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
                  <div className="grid grid-cols-[100px_1fr] gap-3 text-sm">
                    <span className="text-muted-foreground">Selected</span>
                    <span className="text-muted-foreground">—</span>
                    
                    <span className="text-muted-foreground">Type</span>
                    <span className="text-muted-foreground">—</span>
                    
                    <span className="text-muted-foreground">Root (جذر)</span>
                    <span className="text-muted-foreground">—</span>
                    
                    <span className="text-muted-foreground">Gloss</span>
                    <span className="text-muted-foreground">—</span>
                    
                    <span className="text-muted-foreground">Notes</span>
                    <span className="text-muted-foreground">—</span>
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
