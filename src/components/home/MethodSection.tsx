import { motion } from "framer-motion";
import { BookOpen, Repeat, Award, ChevronRight } from "lucide-react";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";

const methods = [
  {
    icon: BookOpen,
    title: "Learn",
    titleArabic: "تَعَلَّمْ",
    description: "Read short Qur'anic passages with fully vocalized Arabic. Toggle English meanings for context. Pure exposure — no quizzes, no pressure.",
    color: "emerald"
  },
  {
    icon: Repeat,
    title: "Practice",
    titleArabic: "تَدَرَّبْ",
    description: "Interactive recognition activities: matching, selection, and context recognition. Immediate feedback helps reinforce what you've learned.",
    color: "gold"
  },
  {
    icon: Award,
    title: "Quiz",
    titleArabic: "ٱمْتَحِنْ",
    description: "Short assessments at the end of each module. Frequency-weighted scoring. Pass to unlock the next module and track your progress.",
    color: "emerald"
  }
];

export const MethodSection = () => {
  return (
    <section className="py-24 bg-card/30 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold font-ui text-sm uppercase tracking-widest"
          >
            Our Methodology
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-english text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-4"
          >
            Learn Through Structured Repetition
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto font-ui"
          >
            Each module follows a three-phase loop designed for recognition and familiarity, not rote memorization or academic grammar instruction.
          </motion.p>
        </div>

        {/* Method Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {methods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative group"
            >
              <div className="p-8 rounded-2xl bg-card border border-border h-full transition-all duration-300 hover:border-gold/30 hover:shadow-medium">
                {/* Step Number */}
                <div className="absolute -top-4 left-8 bg-background px-3 py-1 rounded-full border border-border">
                  <span className="text-sm text-muted-foreground font-ui">{index + 1}</span>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  method.color === 'emerald' ? 'bg-primary/10 text-primary' : 'bg-gold/10 text-gold'
                }`}>
                  <method.icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <div className="mb-4">
                  <h3 className="font-english text-xl font-semibold text-foreground">{method.title}</h3>
                  <span className="font-arabic text-gold text-lg">{method.titleArabic}</span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground font-ui text-sm leading-relaxed">
                  {method.description}
                </p>

                {/* Arrow indicator between cards (desktop only) */}
                {index < 2 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-8 h-8 text-border" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <OrnamentalDivider className="mt-16" />

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="font-ui text-muted-foreground italic max-w-xl mx-auto">
            "The goal is to increase your recognition, comfort, and access to Qur'anic language — 
            not rote memorization or academic grammar instruction."
          </p>
        </motion.div>
      </div>
    </section>
  );
};
