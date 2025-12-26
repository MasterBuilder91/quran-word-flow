import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { modules } from "@/data/quranicWords";
import { grammarModules } from "@/data/grammarModules";
import { Lock, BookOpen, Languages, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAccess } from "@/hooks/useAccess";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FREE_MODULE_LIMIT = 1;
const FREE_GRAMMAR_MODULE_LIMIT = 2;

const ModulesPage = () => {
  const { hasAccess, loading } = useAccess();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-english font-bold text-foreground mb-4">
            Learning Path
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose your learning path: master high-frequency vocabulary or build your grammar foundation piece by piece.
          </p>
        </motion.div>

        <Tabs defaultValue="vocabulary" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="vocabulary" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Vocabulary
            </TabsTrigger>
            <TabsTrigger value="grammar" className="flex items-center gap-2">
              <Languages className="w-4 h-4" />
              Grammar
            </TabsTrigger>
          </TabsList>

          {/* Vocabulary Modules */}
          <TabsContent value="vocabulary">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Master the 125 most frequent words covering 50% of the Qur'an
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module, index) => {
                const isUnlocked = hasAccess || module.id <= FREE_MODULE_LIMIT;
                
                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={isUnlocked ? `/module/${module.id}` : "/subscribe"}
                      className={`block p-6 rounded-xl border transition-all duration-300 h-full ${
                        isUnlocked
                          ? "bg-card border-border hover:border-primary hover:shadow-lg"
                          : "bg-muted/50 border-border/50 opacity-75"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-sm font-medium text-muted-foreground">
                          Module {module.id}
                        </span>
                        {!isUnlocked && <Lock className="w-4 h-4 text-muted-foreground" />}
                      </div>

                      <h3 className="text-xl font-english font-semibold text-foreground mb-1">
                        {module.title}
                      </h3>
                      <p className="text-2xl font-arabic text-primary mb-3">
                        {module.titleArabic}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {module.description}
                      </p>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {module.wordIds.length} words
                        </span>
                        <span className="text-primary font-medium">
                          {module.coveragePercentage}% coverage
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Grammar Modules */}
          <TabsContent value="grammar">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Build your Arabic grammar foundation — each lesson builds on the previous
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {grammarModules.map((module, index) => {
                const isUnlocked = hasAccess || index < FREE_GRAMMAR_MODULE_LIMIT;
                const prerequisite = module.prerequisiteModuleId 
                  ? grammarModules.find(m => m.id === module.prerequisiteModuleId)
                  : null;
                
                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={isUnlocked ? `/grammar/${module.id}` : "/subscribe"}
                      className={`block p-6 rounded-xl border transition-all duration-300 h-full ${
                        isUnlocked
                          ? "bg-card border-border hover:border-primary hover:shadow-lg"
                          : "bg-muted/50 border-border/50 opacity-75"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">
                            {index + 1}
                          </span>
                          {prerequisite && (
                            <span className="text-xs text-muted-foreground flex items-center">
                              <ChevronRight className="w-3 h-3" />
                              After {prerequisite.title}
                            </span>
                          )}
                        </div>
                        {!isUnlocked && <Lock className="w-4 h-4 text-muted-foreground" />}
                      </div>

                      <h3 className="text-xl font-english font-semibold text-foreground mb-1">
                        {module.title}
                      </h3>
                      <p className="text-2xl font-arabic text-primary mb-3">
                        {module.titleArabic}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {module.description}
                      </p>

                      {module.grammarRule && (
                        <p className="text-xs text-muted-foreground/80 italic mb-4 line-clamp-2 border-l-2 border-primary/30 pl-2">
                          {module.grammarRule}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {module.wordIds.length} items
                        </span>
                        <span className="text-primary font-medium">
                          {module.coveragePercentage}% mastery
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {!hasAccess && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link
              to="/subscribe"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Unlock All Modules
            </Link>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ModulesPage;
