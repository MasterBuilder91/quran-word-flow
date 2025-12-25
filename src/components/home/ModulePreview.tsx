import { motion } from "framer-motion";
import { Lock, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { modules } from "@/data/quranicWords";
import { ProgressRing } from "@/components/ui/ProgressRing";

export const ModulePreview = () => {
  // For demo purposes, show first module as accessible
  const unlockedModules = [1];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold font-ui text-sm uppercase tracking-widest"
          >
            Learning Path
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-english text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-4"
          >
            Sequential Modules
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto font-ui"
          >
            Progress through carefully structured modules, each building upon the previous. 
            Complete quizzes to unlock new content and grow your Qur'anic vocabulary.
          </motion.p>
        </div>

        {/* Coverage Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <ProgressRing progress={0} size={140} strokeWidth={10}>
            <div className="text-center">
              <p className="text-2xl font-semibold text-foreground">0%</p>
              <p className="text-xs text-muted-foreground">Coverage</p>
            </div>
          </ProgressRing>
        </motion.div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {modules.map((module, index) => {
            const isUnlocked = unlockedModules.includes(module.id);
            const isCompleted = false; // Will be tracked via state/backend

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={isUnlocked ? `/module/${module.id}` : "#"}
                  className={`block ${!isUnlocked && 'cursor-not-allowed'}`}
                >
                  <div className={`p-6 rounded-2xl border transition-all duration-300 h-full ${
                    isUnlocked 
                      ? 'bg-card border-border hover:border-primary/50 hover:shadow-medium' 
                      : 'bg-muted/30 border-border/50 opacity-70'
                  }`}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-arabic text-gold font-semibold">
                          {module.id}
                        </span>
                        <div>
                          <h3 className="font-english font-semibold text-foreground">
                            {module.title}
                          </h3>
                          <p className="font-arabic text-sm text-muted-foreground">
                            {module.titleArabic}
                          </p>
                        </div>
                      </div>
                      
                      {/* Status Icon */}
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      ) : !isUnlocked ? (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      ) : null}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground font-ui mb-4">
                      {module.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-lg font-semibold text-foreground">
                            {module.wordIds.length}
                          </p>
                          <p className="text-xs text-muted-foreground">Words</p>
                        </div>
                        <div className="w-px h-8 bg-border" />
                        <div>
                          <p className="text-lg font-semibold text-gold">
                            {module.coveragePercentage}%
                          </p>
                          <p className="text-xs text-muted-foreground">Coverage</p>
                        </div>
                      </div>

                      {isUnlocked && !isCompleted && (
                        <span className="text-sm text-primary font-ui">
                          Start →
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/subscribe">
            <Button size="lg" className="px-8">
              Unlock All Modules
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
