import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";
import { StripeBuyButton } from "@/components/StripeBuyButton";

const plans = [
  {
    name: "Vocabulary",
    price: "$5",
    description: "Master Qur'anic vocabulary",
    features: [
      "6 vocabulary modules",
      "125 high-frequency words",
      "Learn → Practice → Quiz",
      "Progress tracking",
    ],
    popular: false,
  },
  {
    name: "Complete",
    price: "$7",
    description: "Full learning experience",
    features: [
      "All vocabulary modules",
      "All grammar modules",
      "12+ comprehensive lessons",
      "Progress tracking",
      "Best value",
    ],
    popular: true,
  },
  {
    name: "Grammar",
    price: "$5",
    description: "Master Qur'anic grammar",
    features: [
      "12 grammar modules",
      "Pronouns, plurals & more",
      "Learn → Practice → Quiz",
      "Progress tracking",
    ],
    popular: false,
  },
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-primary/5 relative overflow-hidden scroll-mt-20">
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
            Choose Your Path
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-xl mx-auto font-ui"
          >
            Focus on what matters most to you, or get everything at a discount.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-gold text-background text-xs font-semibold px-3 py-1 rounded-full">
                    Best Value
                  </span>
                </div>
              )}
              <div className={`bg-card rounded-2xl border p-6 h-full flex flex-col ${
                plan.popular ? 'border-gold shadow-lg' : 'border-border'
              }`}>
                {/* Plan name */}
                <h3 className="font-english text-xl font-semibold text-foreground text-center mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="text-center mb-4">
                  <span className="text-4xl font-english font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground font-ui">/month</span>
                </div>

                <OrnamentalDivider symbol="✦" className="my-4" />

                {/* Features */}
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 text-primary" />
                      </div>
                      <span className="text-sm text-foreground font-ui">{feature}</span>
                    </li>
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
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mt-12 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span>No ads or distractions</span>
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
