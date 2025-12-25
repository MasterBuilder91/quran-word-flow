import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { StripeBuyButton } from "@/components/StripeBuyButton";

const features = [
  "Access to all 6 learning modules",
  "Learn → Practice → Quiz methodology",
  "Track your Qur'anic vocabulary coverage",
  "Progress saved across devices",
  "No ads or distractions",
  "Cancel anytime"
];

export const PricingSection = () => {
  return (
    <section className="py-24 bg-primary/5 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 pattern-islamic opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold font-ui text-sm uppercase tracking-widest"
          >
            Simple Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-english text-3xl md:text-4xl font-semibold text-foreground mt-4 mb-4"
          >
            Start Your Journey Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto font-ui"
          >
            One simple subscription gives you full access to the complete learning experience.
          </motion.p>
        </div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-card rounded-3xl border border-border p-8 md:p-10 shadow-large relative overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold/20 to-transparent rounded-bl-full" />
            
            {/* Price */}
            <div className="text-center mb-8">
              <p className="text-muted-foreground font-ui mb-2">Monthly Subscription</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-5xl md:text-6xl font-english font-bold text-foreground">$10</span>
                <span className="text-muted-foreground font-ui">/month</span>
              </div>
              <p className="text-sm text-gold mt-2 font-ui">Less than a cup of coffee</p>
            </div>

            <OrnamentalDivider symbol="✦" className="my-6" />

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-foreground font-ui">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex justify-center">
              <StripeBuyButton
                buyButtonId="buy_btn_1SiEWIGAtYKo4nymTylZrMgN"
                publishableKey="pk_live_51R1aMZGAtYKo4nymurCYvAbK33ZFFHUHdHYV9mYihSf4ngtkxd6fthHvWwT0xk3WndJ1yMaKysicZ0HxboCeIUoB00faWxdgGL"
              />
            </div>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>Respectful design</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span>No gamification</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>Focused learning</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
