import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";

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
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-emerald blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-1/4 right-10 w-64 h-64 rounded-full bg-gold blur-3xl"
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

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-english text-4xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6 leading-tight"
          >
            Unlock the Language
            <br />
            <span className="text-gradient-emerald">of the Qur'an</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-ui text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Master 125 high-frequency words that cover 50% of the Qur'an's vocabulary. 
            Build recognition and comfort through structured learning, not rote memorization.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mb-10"
          >
            <div className="text-center">
              <p className="font-arabic text-3xl md:text-4xl text-primary font-semibold">١٢٥</p>
              <p className="text-sm text-muted-foreground">Essential Words</p>
            </div>
            <div className="text-center">
              <p className="font-english text-3xl md:text-4xl text-gold font-semibold">50%</p>
              <p className="text-sm text-muted-foreground">Qur'an Coverage</p>
            </div>
            <div className="text-center">
              <p className="font-english text-3xl md:text-4xl text-primary font-semibold">6</p>
              <p className="text-sm text-muted-foreground">Learning Modules</p>
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
                Begin Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/modules">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/5">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Modules
              </Button>
            </Link>
          </motion.div>

          {/* Featured Verse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
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
