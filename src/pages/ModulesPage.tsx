import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { modules } from "@/data/quranicWords";
import { Lock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAccess } from "@/hooks/useAccess";

const FREE_MODULE_LIMIT = 1;

const ModulesPage = () => {
  const { hasAccess, loading } = useAccess();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-english font-bold text-foreground mb-4">
            Learning Modules
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master the 125 most frequent words in the Qur'an through our structured modules.
            Each module builds upon the previous one.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {modules.map((module, index) => {
            const isUnlocked = hasAccess || module.id <= FREE_MODULE_LIMIT;
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={isUnlocked ? `/module/${module.id}` : "/subscribe"}
                  className={`block p-6 rounded-xl border transition-all duration-300 ${
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
