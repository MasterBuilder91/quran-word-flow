import { motion } from "framer-motion";
import { Users, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";

const differentiators = [
  {
    icon: Users,
    title: "Built for English Speakers",
    description: "Created by a native English speaker who understands the challenges of learning Arabic from scratch. Every explanation is crafted with English-first clarity."
  },
  {
    icon: GraduationCap,
    title: "Designed for Absolute Beginners",
    description: "No prior Arabic knowledge assumed. We start from zero and build systematically — no sudden jumps, no assumed vocabulary, no confusing gaps."
  },
  {
    icon: BookOpen,
    title: "English-First Instruction",
    description: "Many Arabic platforms are built by native Arabic speakers. While their expertise is invaluable, instructional flow often assumes familiarity that beginners lack. We explain first, then transition to Arabic."
  }
];

export const WhySectionApart = () => {
  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold font-ui text-sm uppercase tracking-widest"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-english text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-4"
          >
            What Sets Quranic Arabic Lab Apart
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto font-ui"
          >
            A learning experience designed from the ground up for those with no Arabic background.
          </motion.p>
        </div>

        {/* Differentiator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-16">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="p-8 rounded-2xl bg-card border border-border h-full transition-all duration-300 hover:border-gold/30 hover:shadow-medium"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gold/10 text-gold">
                <item.icon className="w-7 h-7" />
              </div>

              {/* Title */}
              <h3 className="font-english text-xl font-semibold text-foreground mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground font-ui text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Structured Learning Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="p-8 rounded-2xl bg-card/50 border border-border">
            <h3 className="font-english text-xl font-semibold text-foreground mb-4 text-center">
              A Structured Path to Understanding
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-6">
              <div className="flex items-center gap-2 text-primary font-ui font-medium">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">1</span>
                Learn
              </div>
              <ArrowRight className="hidden md:block w-5 h-5 text-muted-foreground" />
              <div className="flex items-center gap-2 text-gold font-ui font-medium">
                <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-sm">2</span>
                Practice
              </div>
              <ArrowRight className="hidden md:block w-5 h-5 text-muted-foreground" />
              <div className="flex items-center gap-2 text-primary font-ui font-medium">
                <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">3</span>
                Quiz
              </div>
            </div>

            <p className="text-muted-foreground font-ui text-sm leading-relaxed text-center">
              Every module follows this consistent structure. You read and absorb first, 
              then reinforce through interactive practice, and finally demonstrate your 
              understanding through a short quiz. No surprises, no confusion — just steady progress.
            </p>
          </div>
        </motion.div>

        <OrnamentalDivider className="mt-16" />
      </div>
    </section>
  );
};
