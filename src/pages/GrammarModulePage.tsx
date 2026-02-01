import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { grammarModules, getGrammarModuleWords, getGrammarModuleById } from "@/data/grammarModules";
import { GrammarLearnMode } from "@/components/learning/GrammarLearnMode";
import { GrammarPracticeMode } from "@/components/learning/GrammarPracticeMode";
import { GrammarQuizMode } from "@/components/learning/GrammarQuizMode";
import { PronunciationMode } from "@/components/learning/PronunciationMode";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Repeat, Award, Languages, Mic } from "lucide-react";
import { motion } from "framer-motion";

type Phase = "overview" | "learn" | "practice" | "pronunciation" | "quiz" | "complete";

const GrammarModulePage = () => {
  const { id } = useParams();
  const moduleId = parseInt(id || "101");
  const module = getGrammarModuleById(moduleId);
  const words = getGrammarModuleWords(moduleId);
  
  const [phase, setPhase] = useState<Phase>("overview");

  // Find the module index
  const moduleIndex = grammarModules.findIndex(m => m.id === moduleId);

  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Module not found</p>
      </div>
    );
  }

  const phases = [
    { id: "learn", label: "Learn", icon: BookOpen },
    { id: "practice", label: "Practice", icon: Repeat },
    { id: "pronunciation", label: "Speak", icon: Mic },
    { id: "quiz", label: "Quiz", icon: Award },
  ];

  // Find next module for completion
  const nextModule = grammarModules[moduleIndex + 1];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-12 container mx-auto px-4">
        {/* Back Link */}
        <Link to="/modules" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Modules
        </Link>

        {phase === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4 bg-muted px-3 py-1 rounded-full">
              <Languages className="w-4 h-4" />
              Grammar Lesson
            </div>
            
            <span className="block text-gold font-arabic text-3xl mb-2">{module.titleArabic}</span>
            <h1 className="text-4xl font-english font-semibold text-foreground mt-2 mb-4">
              {module.title}
            </h1>
            <p className="text-muted-foreground mb-4">{module.description}</p>
            
            {module.grammarRule && (
              <div className="bg-muted/50 border border-border rounded-lg p-4 mb-8 text-left">
                <p className="text-sm font-medium text-foreground mb-1">Grammar Rule:</p>
                <p className="text-sm text-muted-foreground italic">{module.grammarRule}</p>
              </div>
            )}
            
            <div className="flex justify-center gap-8 mb-12">
              <div className="text-center">
                <p className="text-3xl font-semibold text-foreground">{words.length}</p>
                <p className="text-sm text-muted-foreground">Items</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-semibold text-gold">{module.coveragePercentage}%</p>
                <p className="text-sm text-muted-foreground">Mastery</p>
              </div>
            </div>

            {/* Phase Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {phases.map((p) => (
                <Button
                  key={p.id}
                  variant="outline"
                  size="lg"
                  className="h-24 flex flex-col gap-2"
                  onClick={() => setPhase(p.id as Phase)}
                >
                  <p.icon className="w-6 h-6" />
                  <span>{p.label}</span>
                </Button>
              ))}
            </div>

            <Button size="lg" onClick={() => setPhase("learn")} className="px-12">
              Start Learning
            </Button>
          </motion.div>
        )}

        {phase === "learn" && (
          <GrammarLearnMode words={words} onComplete={() => setPhase("practice")} />
        )}

        {phase === "practice" && (
          <GrammarPracticeMode words={words} onComplete={() => setPhase("pronunciation")} />
        )}

        {phase === "pronunciation" && (
          <PronunciationMode 
            words={words.map(w => ({ arabic: w.arabic, transliteration: w.transliteration, english: w.english }))} 
            onComplete={() => setPhase("quiz")} 
          />
        )}

        {phase === "quiz" && (
          <GrammarQuizMode 
            words={words} 
            onComplete={(passed) => setPhase(passed ? "complete" : "overview")} 
          />
        )}

        {phase === "complete" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-english font-semibold text-foreground mb-4">
              Lesson Complete!
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              You've mastered <span className="text-primary font-medium">{module.titleArabic}</span>
              {nextModule && (
                <span> — ready for <span className="text-primary font-medium">{nextModule.titleArabic}</span>?</span>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/modules">
                <Button variant="outline" size="lg">View All Modules</Button>
              </Link>
              {nextModule && (
                <Link to={`/grammar/${nextModule.id}`}>
                  <Button size="lg">
                    Next: {nextModule.title}
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default GrammarModulePage;
