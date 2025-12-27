import { motion } from "framer-motion";
import { Brain, Languages, BookText, Lightbulb } from "lucide-react";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";

const challenges = [
  {
    icon: Languages,
    challenge: "Root System Confusion",
    solution: "We teach roots through patterns you already recognize, building from familiar English logic."
  },
  {
    icon: BookText,
    challenge: "Non-Latin Script",
    solution: "Gradual letter introduction with phonetic bridges — no overwhelming alphabet dumps."
  },
  {
    icon: Brain,
    challenge: "Right-to-Left Reading",
    solution: "Interactive exercises that build your directional comfort naturally."
  },
  {
    icon: Lightbulb,
    challenge: "Abstract Grammar",
    solution: "Grammar explained through English comparisons, not Arabic terminology."
  }
];

export const BuiltForOurBrainsSection = () => {
  return (
    <section className="py-24 bg-card/50 relative overflow-hidden">
      <div className="absolute inset-0 pattern-islamic opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold font-ui text-sm uppercase tracking-widest"
          >
            Designed Differently
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-english text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-4"
          >
            Built for Our Brains
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto font-ui"
          >
            Created by native English speakers who know exactly what makes Arabic challenging — 
            and how to overcome each hurdle.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {challenges.map((item, index) => (
            <motion.div
              key={item.challenge}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-english font-semibold text-foreground mb-1">
                    {item.challenge}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-foreground font-medium">
            No assumed knowledge. No confusing gaps. Just steady, satisfying progress.
          </p>
        </motion.div>

        <OrnamentalDivider className="mt-16" />
      </div>
    </section>
  );
};
