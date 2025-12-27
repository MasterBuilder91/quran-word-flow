import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

// Animated counter component
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();
    const startValue = 0;
    
    const updateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      setDisplayValue(Math.round(startValue + (value - startValue) * eased));
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };
    
    requestAnimationFrame(updateValue);
  }, [value]);
  
  return <span>{displayValue}{suffix}</span>;
};

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-islamic opacity-30" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2 }}
        className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-primary blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-gold blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Arabic Calligraphy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="font-arabic text-gold text-2xl md:text-3xl">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </span>
          </motion.div>

          {/* New Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-english text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight"
          >
            Finally, a way to understand the Qur'an
            <br />
            <span className="text-gradient-emerald">that speaks your language.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-ui text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Built by English speakers, for English speakers. No confusing grammar dumps. 
            No assumed knowledge. Just clear, structured learning that actually works.
          </motion.p>

          {/* The Viral Hook - 125 Words = 50% */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-10"
          >
            <div className="inline-flex flex-col items-center p-8 rounded-3xl bg-card/80 border border-primary/30 backdrop-blur-sm glow-emerald">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-gold" />
                <span className="text-gold text-sm font-medium uppercase tracking-wider">The Breakthrough</span>
                <Sparkles className="w-5 h-5 text-gold" />
              </div>
              
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-english text-6xl md:text-8xl font-bold text-primary">
                  <AnimatedCounter value={125} />
                </span>
                <span className="text-2xl md:text-3xl text-muted-foreground">words</span>
                <span className="text-3xl md:text-4xl text-foreground">=</span>
                <span className="font-english text-6xl md:text-8xl font-bold text-gold">
                  <AnimatedCounter value={50} suffix="%" />
                </span>
              </div>
              
              <p className="text-lg md:text-xl text-foreground font-medium">
                of the Qur'an's vocabulary
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Master just 125 high-frequency words and unlock half of what you read.
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/subscribe">
              <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 glow-emerald">
                Start Your 50% Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/modules">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/5">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Free Modules
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>No Arabic background needed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gold" />
              <span>English-first explanations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Structured progression</span>
            </div>
          </motion.div>

          {/* Featured Verse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-16 p-6 md:p-8 rounded-2xl bg-card/50 border border-border backdrop-blur-sm max-w-2xl mx-auto"
          >
            <p className="font-arabic arabic-large text-foreground mb-4 leading-loose">
              وَلَقَدْ يَسَّرْنَا ٱلْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ
            </p>
            <p className="font-english text-muted-foreground italic">
              "And We have certainly made the Qur'an easy for remembrance, so is there any who will remember?"
            </p>
            <p className="text-sm text-gold mt-2">— Surah Al-Qamar (54:17)</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
