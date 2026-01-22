import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { modules, getModuleWords } from "@/data/quranicWords";
import { LearnMode } from "@/components/learning/LearnMode";
import { PracticeMode } from "@/components/learning/PracticeMode";
import { QuizMode } from "@/components/learning/QuizMode";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Repeat, Award } from "lucide-react";
import { motion } from "framer-motion";

type Phase = "overview" | "learn" | "practice" | "quiz" | "complete";

const ModulePage = () => {
  const { id } = useParams();
  const moduleId = parseInt(id || "1");
  const module = modules.find(m => m.id === moduleId);
  const words = getModuleWords(moduleId);
  
  const [phase, setPhase] = useState<Phase>("overview");

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
    { id: "quiz", label: "Quiz", icon: Award },
  ];

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
            <span className="text-gold font-arabic text-2xl">{module.titleArabic}</span>
            <h1 className="text-4xl font-english font-semibold text-foreground mt-2 mb-4">
              {module.title}
            </h1>
            <p className="text-muted-foreground mb-8">{module.description}</p>
            
            <div className="flex justify-center gap-8 mb-12">
              <div className="text-center">
                <p className="text-3xl font-semibold text-foreground">{words.length}</p>
                <p className="text-sm text-muted-foreground">Words</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-semibold text-gold">{module.coveragePercentage}%</p>
                <p className="text-sm text-muted-foreground">Coverage</p>
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
          <LearnMode words={words} onComplete={() => setPhase("practice")} />
        )}

        {phase === "practice" && (
          <PracticeMode words={words} onComplete={() => setPhase("quiz")} />
        )}

        {phase === "quiz" && (
          <QuizMode 
            words={words} 
            onComplete={(passed) => setPhase(passed ? "complete" : "overview")} 
          />
        )}

        {phase === "complete" && (
          <div className="text-center py-16">
            <h2 className="text-3xl font-english font-semibold text-foreground mb-4">
              Module Complete! 🎉
            </h2>
            <p className="text-muted-foreground mb-8">
              You've unlocked the next module.
            </p>
            <Link to="/modules">
              <Button size="lg">View All Modules</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default ModulePage;
