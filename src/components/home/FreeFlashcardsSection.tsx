import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Volume2, Languages, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { flashcardWords, flashcardCategories } from "@/data/flashcardVocabulary";

const features = [
  {
    icon: BookOpen,
    text: `${flashcardCategories.length} Categories`
  },
  {
    icon: Languages,
    text: "Transliteration"
  },
  {
    icon: Volume2,
    text: "Audio Pronunciation"
  },
  {
    icon: Sparkles,
    text: "Visual Aids"
  }
];

export const FreeFlashcardsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-green-500/5 to-transparent relative overflow-hidden">
      <div className="absolute inset-0 pattern-islamic opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Free Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-lg font-bold border border-green-500/30">
              100% FREE
            </span>
          </motion.div>

          {/* Heading */}
          <h2 className="font-english text-3xl md:text-5xl font-bold text-foreground mb-4">
            Over <span className="text-primary">{flashcardWords.length.toLocaleString()}</span> Arabic Flashcards
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Build your Arabic vocabulary with our comprehensive flashcard library — no subscription required. 
            Learn at your own pace with audio pronunciation and visual aids.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
              >
                <feature.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/flashcards">
              <Button 
                size="lg" 
                className="gap-2 text-lg px-8 py-6 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-lg hover:shadow-xl transition-all"
              >
                <BookOpen className="w-5 h-5" />
                Start Learning — It's Free
              </Button>
            </Link>
          </motion.div>

          {/* Sample Categories Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-3"
          >
            {flashcardCategories.slice(0, 8).map((category) => (
              <span
                key={category.id}
                className="px-3 py-1 rounded-lg bg-card/50 border border-border text-sm text-muted-foreground"
              >
                {category.icon} {category.name}
              </span>
            ))}
            <span className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary font-medium">
              +{flashcardCategories.length - 8} more categories
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
