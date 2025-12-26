import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StripeBuyButton } from "@/components/StripeBuyButton";
import { RedeemCodeModal } from "@/components/RedeemCodeModal";
import { useAccess } from "@/hooks/useAccess";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { OrnamentalDivider } from "@/components/ui/OrnamentalDivider";

const plans = [
  {
    id: "vocabulary",
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
    id: "complete",
    name: "Complete",
    price: "$7",
    description: "Vocabulary + Grammar combined",
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
    id: "grammar",
    name: "Grammar",
    price: "$5",
    description: "Understand sentence structure",
    features: [
      "12 grammar modules",
      "Pronouns, plurals & more",
      "Learn → Practice → Quiz",
      "Progress tracking",
    ],
    popular: false,
  },
];

const SubscribePage = () => {
  const { user, hasAccess, loading, redeemCode } = useAccess();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("complete");

  useEffect(() => {
    if (hasAccess && !loading) {
      navigate("/modules");
    }
  }, [hasAccess, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-english font-bold text-foreground mb-4">
              Choose Your Plan
            </h1>
            <p className="text-muted-foreground">
              Focus on what matters most to you, or get everything at a discount.
            </p>
          </div>

          {/* Plan Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <motion.button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative text-left bg-card rounded-2xl border p-6 transition-all ${
                  selectedPlan === plan.id
                    ? 'border-primary ring-2 ring-primary/20'
                    : plan.popular
                    ? 'border-gold'
                    : 'border-border hover:border-muted-foreground/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gold text-background text-xs font-semibold px-3 py-1 rounded-full">
                      Best Value
                    </span>
                  </div>
                )}
                
                <h3 className="font-english text-lg font-semibold text-foreground mb-1">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {plan.description}
                </p>
                
                <div className="mb-4">
                  <span className="text-3xl font-english font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Selection indicator */}
                <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === plan.id ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                }`}>
                  {selectedPlan === plan.id && (
                    <Check className="w-3 h-3 text-primary-foreground" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Subscribe Section */}
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-center mb-4">
              <p className="text-muted-foreground text-sm">Selected plan</p>
              <p className="text-xl font-semibold text-foreground">
                {plans.find(p => p.id === selectedPlan)?.name} — {plans.find(p => p.id === selectedPlan)?.price}/month
              </p>
            </div>

            <OrnamentalDivider symbol="✦" className="my-4" />

            {user ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <StripeBuyButton
                    buyButtonId="buy_btn_1SiEWIGAtYKo4nymTylZrMgN"
                    publishableKey="pk_live_51R1aMZGAtYKo4nymurCYvAbK33ZFFHUHdHYV9mYihSf4ngtkxd6fthHvWwT0xk3WndJ1yMaKysicZ0HxboCeIUoB00faWxdgGL"
                  />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-muted-foreground">or</span>
                </div>
                <div className="flex justify-center">
                  <RedeemCodeModal onRedeem={redeemCode} />
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <Link
                  to="/auth"
                  className="inline-flex w-full justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Sign In to Subscribe
                </Link>
                <p className="text-sm text-muted-foreground">
                  Already have an access code?{" "}
                  <Link to="/auth" className="text-primary hover:underline">
                    Sign in first
                  </Link>
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default SubscribePage;
