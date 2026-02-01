import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Volume2, 
  Sparkles,
  Heart,
  Star,
  ChevronLeft
} from "lucide-react";
import { 
  heritageModules, 
  getHeritageModulePhrases,
  getCoreModules,
  getFunctionalModules,
  HeritagePhrase,
  HeritageModule,
  AddresseeType
} from "@/data/heritagePhrasesData";
import { useInstantAudio } from "@/hooks/useInstantAudio";

type ViewMode = 'modules' | 'phrases';
type GenderMode = 'masculine' | 'feminine';

const HeritagePage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('modules');
  const [selectedModule, setSelectedModule] = useState<HeritageModule | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [direction, setDirection] = useState(0);
  const [genderMode, setGenderMode] = useState<GenderMode>('masculine');
  const [addresseeMode, setAddresseeMode] = useState<AddresseeType>('masculine_singular');
  
  const { speak, isPlaying, stop } = useInstantAudio();
  
  const coreModules = getCoreModules();
  const functionalModules = getFunctionalModules();
  
  const currentPhrases = selectedModule ? getHeritageModulePhrases(selectedModule.id) : [];
  const currentPhrase = currentPhrases[currentIndex];
  const progress = currentPhrases.length > 0 ? ((currentIndex + 1) / currentPhrases.length) * 100 : 0;

  const handleModuleSelect = (module: HeritageModule) => {
    setSelectedModule(module);
    setCurrentIndex(0);
    setShowDetails(false);
    setViewMode('phrases');
  };

  const handleBack = () => {
    setViewMode('modules');
    setSelectedModule(null);
    setCurrentIndex(0);
    stop();
  };

  const goNext = () => {
    if (currentIndex < currentPhrases.length - 1) {
      setDirection(1);
      setShowDetails(false);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setShowDetails(false);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSpeak = (phrase: HeritagePhrase) => {
    if (isPlaying) {
      stop();
    } else {
      // Use imperative form if available, then gender form, then default
      let arabicText = phrase.arabic;
      if (phrase.imperativeForms) {
        arabicText = phrase.imperativeForms[addresseeMode].arabic;
      } else if (phrase.genderForms) {
        arabicText = phrase.genderForms[genderMode].arabic;
      }
      speak(arabicText);
    }
  };

  // Get the appropriate Arabic text based on addressee mode or gender mode
  const getArabicText = (phrase: HeritagePhrase) => {
    if (phrase.imperativeForms) {
      return phrase.imperativeForms[addresseeMode].arabic;
    }
    if (phrase.genderForms) {
      return phrase.genderForms[genderMode].arabic;
    }
    return phrase.arabic;
  };

  // Get the appropriate transliteration based on addressee mode or gender mode
  const getTransliteration = (phrase: HeritagePhrase) => {
    if (phrase.imperativeForms) {
      return phrase.imperativeForms[addresseeMode].transliteration;
    }
    if (phrase.genderForms) {
      return phrase.genderForms[genderMode].transliteration;
    }
    return phrase.transliteration;
  };

  // Get addressee label for display
  const getAddresseeLabel = (type: AddresseeType): { short: string; arabic: string; desc: string } => {
    const labels: Record<AddresseeType, { short: string; arabic: string; desc: string }> = {
      masculine_singular: { short: "♂ Him", arabic: "أنتَ", desc: "one male" },
      feminine_singular: { short: "♀ Her", arabic: "أنتِ", desc: "one female" },
      dual: { short: "👥 Two", arabic: "أنتما", desc: "two people" },
      masculine_plural: { short: "👥♂ Group", arabic: "أنتم", desc: "males/mixed" },
      feminine_plural: { short: "👥♀ Women", arabic: "أنتن", desc: "females only" }
    };
    return labels[type];
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const ModuleCard = ({ module, isCore }: { module: HeritageModule; isCore?: boolean }) => (
    <motion.button
      onClick={() => handleModuleSelect(module)}
      className={`w-full p-5 rounded-xl border text-left transition-all duration-300 ${
        isCore 
          ? "bg-gradient-to-br from-primary/10 to-accent/5 border-primary/30 hover:border-primary hover:shadow-lg hover:shadow-primary/10" 
          : "bg-card border-border hover:border-primary/50 hover:shadow-lg"
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-4">
        <span className="text-3xl">{module.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-english font-semibold text-foreground truncate">
              {module.title}
            </h3>
            {isCore && (
              <span className="flex-shrink-0 px-2 py-0.5 text-[10px] font-medium bg-primary/20 text-primary rounded-full">
                CORE
              </span>
            )}
          </div>
          <p className="text-lg font-arabic text-gold mb-2">{module.titleArabic}</p>
          <p className="text-sm text-muted-foreground line-clamp-2">{module.description}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {module.phraseIds.length} phrases
          </p>
        </div>
      </div>
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12 container mx-auto px-4">
        <AnimatePresence mode="wait">
          {viewMode === 'modules' ? (
            <motion.div
              key="modules"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Heritage Learning Method</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-english font-bold text-foreground mb-2">
                  Qur'anic Arabic Heritage
                </h1>
                <p className="text-2xl font-arabic text-gold mb-4">
                  التُّرَاث العَرَبِيّ القُرآنِيّ
                </p>
                <p className="text-muted-foreground text-lg">
                  Learn to speak Classical Arabic like heritage speakers learn their mother tongue — 
                  through core functional phrases that work in any situation.
                </p>
              </div>

              {/* Core Vocabulary Section */}
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Star className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-english font-semibold text-foreground">
                      Core Vocabulary
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Start here — these 50 building blocks let you express almost anything
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {coreModules.map((module, index) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ModuleCard module={module} isCore />
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Functional Library Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-english font-semibold text-foreground">
                      Functional Phrase Library
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Expand your fluency with phrases for every situation
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {functionalModules.map((module, index) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 + 0.3 }}
                    >
                      <ModuleCard module={module} />
                    </motion.div>
                  ))}
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="phrases"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto"
            >
              {/* Back Button & Module Title */}
              <button 
                onClick={handleBack}
                className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Modules
              </button>

              <div className="text-center mb-8">
                <span className="text-4xl mb-2 block">{selectedModule?.icon}</span>
                <h2 className="text-2xl font-english font-semibold text-foreground">
                  {selectedModule?.title}
                </h2>
                <p className="text-xl font-arabic text-gold">{selectedModule?.titleArabic}</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-8">
                <motion.div
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Phrase Card */}
              {currentPhrase && (
                <div className="relative mb-8">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentPhrase.id}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      className="bg-card border border-border rounded-2xl p-8"
                    >
                      {/* Phrase Number & Form Toggle */}
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-xs text-muted-foreground">
                          {currentIndex + 1} of {currentPhrases.length}
                        </span>
                        <div className="flex items-center gap-2">
                          {/* Imperative Forms Toggle (for commands) */}
                          {currentPhrase.imperativeForms && (
                            <div className="flex flex-wrap items-center gap-1 bg-muted rounded-lg p-1">
                              {(Object.keys(currentPhrase.imperativeForms) as AddresseeType[]).map((type) => {
                                const label = getAddresseeLabel(type);
                                return (
                                  <button
                                    key={type}
                                    onClick={() => setAddresseeMode(type)}
                                    className={`px-2 py-1 text-xs font-medium rounded-md transition-all ${
                                      addresseeMode === type
                                        ? 'bg-primary/20 text-primary'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10'
                                    }`}
                                    title={`${label.arabic} - ${label.desc}`}
                                  >
                                    {label.short}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                          
                          {/* Gender Forms Toggle (for self-descriptions) */}
                          {currentPhrase.genderForms && !currentPhrase.imperativeForms && (
                            <div className="flex items-center bg-muted rounded-full p-0.5">
                              <button
                                onClick={() => setGenderMode('masculine')}
                                className={`px-2 py-0.5 text-xs font-medium rounded-full transition-all ${
                                  genderMode === 'masculine'
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                              >
                                ♂ Masc
                              </button>
                              <button
                                onClick={() => setGenderMode('feminine')}
                                className={`px-2 py-0.5 text-xs font-medium rounded-full transition-all ${
                                  genderMode === 'feminine'
                                    ? 'bg-pink-500/20 text-pink-400'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                              >
                                ♀ Fem
                              </button>
                            </div>
                          )}
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            currentPhrase.frequency === 'core' 
                              ? 'bg-primary/20 text-primary' 
                              : currentPhrase.frequency === 'essential'
                              ? 'bg-accent/20 text-accent'
                              : 'bg-muted text-muted-foreground'
                          }`}>
                            {currentPhrase.frequency.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Arabic */}
                      <div className="text-center mb-6">
                        <p className="text-5xl font-arabic text-foreground mb-3 leading-relaxed">
                          {getArabicText(currentPhrase)}
                        </p>
                        <p className="text-lg text-primary/80 font-mono">
                          {getTransliteration(currentPhrase)}
                        </p>
                        
                        {/* Show all imperative forms */}
                        {currentPhrase.imperativeForms && (
                          <div className="mt-4 pt-4 border-t border-border/50">
                            <p className="text-xs text-muted-foreground mb-3">All forms (who you're speaking to):</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                              {(Object.entries(currentPhrase.imperativeForms) as [AddresseeType, {arabic: string; transliteration: string}][]).map(([type, form]) => {
                                const label = getAddresseeLabel(type);
                                return (
                                  <button
                                    key={type}
                                    onClick={() => setAddresseeMode(type)}
                                    className={`p-2 rounded-lg border transition-all ${
                                      addresseeMode === type
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border/50 hover:border-primary/50'
                                    }`}
                                  >
                                    <span className="block font-arabic text-lg">{form.arabic}</span>
                                    <span className="block text-xs text-muted-foreground">{form.transliteration}</span>
                                    <span className="block text-[10px] text-primary/70 mt-1">{label.arabic} ({label.desc})</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                        
                        {/* Show both gender forms (for non-imperatives) */}
                        {currentPhrase.genderForms && !currentPhrase.imperativeForms && (
                          <div className="mt-3 pt-3 border-t border-border/50">
                            <p className="text-xs text-muted-foreground mb-2">Both forms:</p>
                            <div className="flex justify-center gap-6 text-sm">
                              <div className={`${genderMode === 'masculine' ? 'text-blue-400' : 'text-muted-foreground/70'}`}>
                                <span className="block font-arabic text-lg">{currentPhrase.genderForms.masculine.arabic}</span>
                                <span className="text-xs">(♂ {currentPhrase.genderForms.masculine.transliteration})</span>
                              </div>
                              <div className={`${genderMode === 'feminine' ? 'text-pink-400' : 'text-muted-foreground/70'}`}>
                                <span className="block font-arabic text-lg">{currentPhrase.genderForms.feminine.arabic}</span>
                                <span className="text-xs">(♀ {currentPhrase.genderForms.feminine.transliteration})</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>


                      {/* Audio Button */}
                      <div className="flex justify-center mb-6">
                        <Button
                          variant="outline"
                          size="lg"
                          className={`rounded-full ${isPlaying ? 'border-primary text-primary' : ''}`}
                          onClick={() => handleSpeak(currentPhrase)}
                        >
                          <Volume2 className={`w-5 h-5 mr-2 ${isPlaying ? 'animate-pulse' : ''}`} />
                          {isPlaying ? 'Playing...' : 'Listen'}
                        </Button>
                      </div>

                      {/* English */}
                      <div className="text-center mb-6">
                        <p className="text-2xl font-english font-medium text-foreground">
                          {currentPhrase.english}
                        </p>
                      </div>

                      {/* Show Details Toggle */}
                      <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        {showDetails ? 'Hide Details' : 'Show Usage & Example'}
                      </button>

                      {/* Details Section */}
                      <AnimatePresence>
                        {showDetails && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-6 mt-6 border-t border-border space-y-4">
                              {/* Usage */}
                              <div>
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                  How to Use
                                </p>
                                <p className="text-sm text-foreground">
                                  {currentPhrase.usage}
                                </p>
                              </div>

                              {/* Quranic Example */}
                              {currentPhrase.quranicExample && (
                                <div className="bg-muted/50 rounded-lg p-4">
                                  <p className="text-xs text-gold uppercase tracking-wide mb-2">
                                    Qur'anic Example
                                  </p>
                                  <p className="text-xl font-arabic text-foreground mb-2 text-right">
                                    {currentPhrase.quranicExample.arabic}
                                  </p>
                                  <p className="text-sm text-muted-foreground mb-1">
                                    {currentPhrase.quranicExample.english}
                                  </p>
                                  <p className="text-xs text-primary">
                                    {currentPhrase.quranicExample.reference}
                                  </p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex gap-1">
                  {currentPhrases.slice(
                    Math.max(0, currentIndex - 2),
                    Math.min(currentPhrases.length, currentIndex + 3)
                  ).map((_, idx) => {
                    const actualIndex = Math.max(0, currentIndex - 2) + idx;
                    return (
                      <button
                        key={actualIndex}
                        onClick={() => {
                          setDirection(actualIndex > currentIndex ? 1 : -1);
                          setCurrentIndex(actualIndex);
                          setShowDetails(false);
                        }}
                        className={`w-2 h-2 rounded-full transition-all ${
                          actualIndex === currentIndex
                            ? 'bg-primary w-6'
                            : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                        }`}
                      />
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={goNext}
                  disabled={currentIndex === currentPhrases.length - 1}
                  className="gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Keyboard Hints */}
              <p className="text-center text-xs text-muted-foreground mt-6">
                Use <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">→</kbd> to navigate, <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">D</kbd> for details
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default HeritagePage;
