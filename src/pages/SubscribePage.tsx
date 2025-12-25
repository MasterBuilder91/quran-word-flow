import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StripeBuyButton } from "@/components/StripeBuyButton";
import { RedeemCodeModal } from "@/components/RedeemCodeModal";
import { useAccess } from "@/hooks/useAccess";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const features = [
  "Access to all 6 learning modules",
  "125 high-frequency Qur'anic words",
  "Interactive flashcards & quizzes",
  "Track your progress",
  "Lifetime access",
];

const SubscribePage = () => {
  const { user, hasAccess, loading, redeemCode } = useAccess();
  const navigate = useNavigate();

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
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-english font-bold text-foreground mb-4">
              Unlock Full Access
            </h1>
            <p className="text-muted-foreground">
              Get lifetime access to all modules and start your journey to understanding the Qur'an.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="text-center mb-6">
              <span className="text-5xl font-bold text-foreground">$12</span>
              <span className="text-muted-foreground">/lifetime</span>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

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
