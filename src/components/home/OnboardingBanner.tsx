import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Sparkles, Languages, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const LEVELS = [
  {
    id: "beginner",
    icon: BookOpen,
    label: "I'm a complete beginner",
    description: "I can't read Arabic yet",
    path: "/learn-to-read",
    cta: "Start with the alphabet",
  },
  {
    id: "basics",
    icon: Languages,
    label: "I can read but need vocabulary",
    description: "I know the letters but want to build Quranic vocabulary",
    path: "/modules",
    cta: "Begin vocabulary modules",
  },
  {
    id: "intermediate",
    icon: Sparkles,
    label: "I want deeper understanding",
    description: "I know some Arabic and want grammar & morphology",
    path: "/sarf",
    cta: "Jump into Sarf training",
  },
];

export const OnboardingBanner = () => {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const seen = localStorage.getItem("onboarding_dismissed");
    if (!seen) setDismissed(false);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("onboarding_dismissed", "true");
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border-b border-primary/20"
      >
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-1">Where should you start?</h2>
            <p className="text-sm text-muted-foreground">Pick your level and we'll guide you to the right place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {LEVELS.map((level) => {
              const Icon = level.icon;
              return (
                <Link
                  key={level.id}
                  to={level.path}
                  onClick={handleDismiss}
                  className="group glass-card rounded-xl p-5 text-center hover:border-primary/40 transition-all"
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="font-medium text-foreground text-sm mb-1">{level.label}</div>
                  <p className="text-xs text-muted-foreground mb-3">{level.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    {level.cta} <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};
