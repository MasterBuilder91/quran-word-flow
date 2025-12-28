import { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Shuffle, Layers, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FlashCard } from '@/components/flashcards/FlashCard';
import { 
  flashcardCategories, 
  flashcardWords, 
  getWordsByCategory,
  FlashcardCategory,
  FlashcardWord 
} from '@/data/flashcardVocabulary';

type ViewMode = 'categories' | 'flashcards';

export default function FlashcardsPage() {
  const location = useLocation();
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [selectedCategory, setSelectedCategory] = useState<FlashcardCategory | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState<FlashcardWord[]>([]);

  // Reset to categories view when navigating to this page (e.g., from header link)
  useEffect(() => {
    setViewMode('categories');
    setSelectedCategory(null);
    setCurrentIndex(0);
    setShuffledWords([]);
  }, [location.key]);

  const categoryWords = useMemo(() => {
    if (!selectedCategory) return [];
    return getWordsByCategory(selectedCategory.id);
  }, [selectedCategory]);

  const currentWords = shuffledWords.length > 0 ? shuffledWords : categoryWords;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'flashcards') return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, currentIndex, currentWords.length]);

  const currentWord = currentWords[currentIndex];
  const progress = currentWords.length > 0 ? ((currentIndex + 1) / currentWords.length) * 100 : 0;

  const handleCategorySelect = (category: FlashcardCategory) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setShuffledWords([]);
    setViewMode('flashcards');
  };

  const handleBack = () => {
    setViewMode('categories');
    setSelectedCategory(null);
    setCurrentIndex(0);
    setShuffledWords([]);
  };

  const handleNext = () => {
    if (currentIndex < currentWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...categoryWords].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
    setCurrentIndex(0);
  };

  const handleStudyAll = () => {
    const allWords = [...flashcardWords].sort(() => Math.random() - 0.5);
    setShuffledWords(allWords);
    setSelectedCategory({ 
      id: 'all', 
      name: 'All Words', 
      nameArabic: 'كُلّ الكَلِمَات',
      icon: '📚',
      description: 'Study all vocabulary'
    });
    setCurrentIndex(0);
    setViewMode('flashcards');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Back button and title */}
        <div className="mb-8">
          {viewMode === 'flashcards' ? (
            <Button
              variant="outline"
              onClick={handleBack}
              className="gap-2 mb-4 border-primary/30 hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Categories
            </Button>
          ) : (
            <Link to="/">
              <Button variant="ghost" className="gap-2 mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          )}
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              {viewMode === 'categories' ? 'Arabic Flashcards' : selectedCategory?.name}
            </h1>
            <p className="text-xl font-arabic text-primary mb-4">
              {viewMode === 'categories' ? 'بِطَاقَات تَعْلِيمِيَّة' : selectedCategory?.nameArabic}
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {viewMode === 'categories' 
                ? 'Master Arabic vocabulary with beautiful flashcards. Each card includes pronunciation audio, transliteration, and visual aids.'
                : selectedCategory?.description
              }
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'categories' ? (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Study All Button */}
              <div className="flex justify-center mb-8">
                <Button
                  onClick={handleStudyAll}
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-primary to-primary/80"
                >
                  <Layers className="w-5 h-5" />
                  Study All Words ({flashcardWords.length} cards)
                </Button>
              </div>

              {/* Category Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {flashcardCategories.map((category, index) => {
                  const wordCount = getWordsByCategory(category.id).length;
                  return (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleCategorySelect(category)}
                      className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all text-left"
                    >
                      <div className="text-4xl mb-3">{category.icon}</div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm font-arabic text-muted-foreground">
                        {category.nameArabic}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {wordCount} words
                      </p>
                    </motion.button>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="mt-12 text-center">
                <div className="inline-flex items-center gap-8 p-6 rounded-xl bg-card border border-border">
                  <div>
                    <p className="text-3xl font-bold text-primary">{flashcardCategories.length}</p>
                    <p className="text-sm text-muted-foreground">Categories</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div>
                    <p className="text-3xl font-bold text-primary">{flashcardWords.length}</p>
                    <p className="text-sm text-muted-foreground">Words</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div>
                    <p className="text-3xl font-bold text-primary">🔊</p>
                    <p className="text-sm text-muted-foreground">With Audio</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="flashcards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto"
            >
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Card {currentIndex + 1} of {currentWords.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-2 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBack}
                  className="gap-2"
                >
                  <LayoutGrid className="w-4 h-4" />
                  All Categories
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShuffle}
                  className="gap-2"
                >
                  <Shuffle className="w-4 h-4" />
                  Shuffle
                </Button>
              </div>

              {/* Flashcard */}
              {currentWord && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentWord.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                  >
                    <FlashCard word={currentWord} />
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex gap-1">
                  {currentWords.slice(
                    Math.max(0, currentIndex - 2),
                    Math.min(currentWords.length, currentIndex + 3)
                  ).map((_, idx) => {
                    const actualIdx = Math.max(0, currentIndex - 2) + idx;
                    return (
                      <button
                        key={actualIdx}
                        onClick={() => setCurrentIndex(actualIdx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          actualIdx === currentIndex ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={handleNext}
                  disabled={currentIndex === currentWords.length - 1}
                  className="gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Keyboard hint */}
              <p className="text-center text-xs text-muted-foreground mt-6">
                Use ← → arrow keys to navigate • Click card to flip
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}
