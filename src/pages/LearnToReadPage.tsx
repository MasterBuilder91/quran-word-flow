import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { readingLessons, arabicLetters } from "@/data/arabicReadingCourse";
import { ArticulationChart } from "@/components/reading/ArticulationChart";
import { LetterFormsChart, LetterCard } from "@/components/reading/LetterCharts";
import { HarakatChart } from "@/components/reading/HarakatChart";
import { ArrowLeft, ArrowRight, BookOpen, Volume2, Home } from "lucide-react";
import { useArabicAudio } from "@/hooks/useArabicAudio";

export default function LearnToReadPage() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const lesson = readingLessons[currentLesson];
  const { playLetter, playSyllable, isPlaying, currentLetter } = useArabicAudio();

  const renderContent = (content: any) => {
    switch (content.type) {
      case 'text':
        return (
          <div className="mb-8">
            <h3 className="font-english text-xl font-semibold text-foreground mb-4">{content.data.title}</h3>
            <div className="space-y-3">
              {content.data.paragraphs.map((p: string, i: number) => (
                <p key={i} className="text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        );
      case 'diagram':
        return <ArticulationChart />;
      case 'chart':
        if (content.data.chartType === 'alphabet-full' || content.data.chartType === 'letter-forms') {
          return <LetterFormsChart />;
        }
        if (content.data.chartType === 'harakat') {
          return <HarakatChart />;
        }
        return null;
      case 'letters':
        const letters = arabicLetters.filter(l => content.data.letterIds.includes(l.id));
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {letters.map(letter => (
              <LetterCard key={letter.id} letter={letter} />
            ))}
          </div>
        );
      case 'practice':
        return (
          <div className="space-y-4">
            {content.data.words?.map((word: any, i: number) => {
              return (
                <div 
                  key={i} 
                  className="p-6 rounded-xl bg-card border border-border text-center hover:border-primary/50 transition-colors cursor-pointer group"
                  onClick={() => playSyllable(word.arabic)}
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <p className="font-arabic text-4xl text-gold">{word.arabic}</p>
                    <Volume2 className={`w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors ${isPlaying && currentLetter === word.arabic ? 'text-primary animate-pulse' : ''}`} />
                  </div>
                  <p className="font-mono text-primary mb-1">{word.transliteration}</p>
                  <p className="text-sm text-muted-foreground">{word.meaning}</p>
                </div>
              );
            })}
            {content.data.verses?.map((verse: any, i: number) => (
              <div key={i} className="p-6 rounded-xl bg-card border border-primary/30 text-center">
                <p className="font-arabic text-3xl text-gold mb-3 leading-loose">{verse.arabic}</p>
                <p className="font-mono text-primary mb-1">{verse.transliteration}</p>
                <p className="text-sm text-muted-foreground italic">{verse.meaning}</p>
              </div>
            ))}
          </div>
        );
      case 'drill':
        return (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-english text-lg font-semibold text-foreground">{content.data.title}</h3>
                <Volume2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Click to hear</span>
              </div>
              <span className="font-arabic text-gold">{content.data.titleArabic}</span>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="space-y-4">
                {content.data.rows.map((row: string[], rowIndex: number) => (
                  <div key={rowIndex} className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {row.map((syllable: string, colIndex: number) => {
                      const isCurrentlyPlaying = isPlaying && currentLetter === syllable;
                      return (
                        <div
                          key={colIndex}
                          onClick={() => playSyllable(syllable)}
                          className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-lg bg-background border transition-all cursor-pointer active:scale-95 ${
                            isCurrentlyPlaying 
                              ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20' 
                              : 'border-border hover:border-primary/50 hover:bg-primary/5'
                          }`}
                        >
                          <span className={`font-arabic text-2xl md:text-3xl ${isCurrentlyPlaying ? 'text-primary' : 'text-foreground'}`}>
                            {syllable}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Home Button */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" size="sm">
              <Home className="w-4 h-4 mr-2" /> Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-6">
            <BookOpen className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold font-medium">Learn to Read Arabic</span>
          </div>
          <h1 className="font-english text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Master the <span className="text-gradient-cosmic">Arabic Script</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A complete course designed for English speakers. Learn every letter, where sounds come from, and how to read the Quran.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Lesson Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-2">
              <h3 className="font-semibold text-foreground mb-4">Lessons</h3>
              {readingLessons.map((l, i) => (
                <button
                  key={l.id}
                  onClick={() => setCurrentLesson(i)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    i === currentLesson
                      ? 'bg-primary/20 border border-primary/30 text-foreground'
                      : 'bg-card/50 border border-transparent hover:border-border text-muted-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{i + 1}.</span>
                    <span className="text-sm truncate">{l.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs text-muted-foreground">Lesson {currentLesson + 1}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">{lesson.type}</span>
              </div>
              <h2 className="font-english text-2xl font-semibold text-foreground mb-2">{lesson.title}</h2>
              <p className="font-arabic text-gold mb-4">{lesson.titleArabic}</p>
              <p className="text-muted-foreground mb-8">{lesson.description}</p>

              {lesson.content.map((content, i) => (
                <div key={i}>{renderContent(content)}</div>
              ))}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setCurrentLesson(Math.max(0, currentLesson - 1))}
                  disabled={currentLesson === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                </Button>
                <Button
                  onClick={() => setCurrentLesson(Math.min(readingLessons.length - 1, currentLesson + 1))}
                  disabled={currentLesson === readingLessons.length - 1}
                >
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
