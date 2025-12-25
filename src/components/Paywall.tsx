import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { RedeemCodeModal } from "./RedeemCodeModal";
import { StripeBuyButton } from "./StripeBuyButton";
import { motion } from "framer-motion";

interface PaywallProps {
  onRedeem: (code: string) => Promise<{ success: boolean; message: string }>;
  isLoggedIn: boolean;
}

export const Paywall = ({ onRedeem, isLoggedIn }: PaywallProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto text-center py-16"
    >
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
        <Lock className="w-8 h-8 text-muted-foreground" />
      </div>
      
      <h2 className="text-2xl font-english font-semibold text-foreground mb-4">
        Premium Content
      </h2>
      
      <p className="text-muted-foreground mb-8">
        This module requires a subscription. Unlock all modules and track your progress with full access.
      </p>

      {isLoggedIn ? (
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
            <RedeemCodeModal onRedeem={onRedeem} />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Link to="/auth">
            <Button size="lg" className="px-8">
              Sign In to Subscribe
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            Already have an access code?{" "}
            <Link to="/auth" className="text-primary hover:underline">
              Sign in first
            </Link>
          </p>
        </div>
      )}
    </motion.div>
  );
};
