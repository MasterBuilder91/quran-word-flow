import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Gift, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGamification } from "@/hooks/useGamification";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export const ReferralSection = () => {
  const { data, isAuthenticated } = useGamification();
  const [copied, setCopied] = useState(false);

  const referralLink = data?.referralCode 
    ? `${window.location.origin}?ref=${data.referralCode}`
    : '';

  const handleCopy = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Referral link copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const referralsNeeded = 3 - (data?.referralsCount || 0);
  const hasUnlockedReward = (data?.referralsCount || 0) >= 3;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-sm mb-6">
            <Gift className="w-4 h-4" />
            <span>Learn One, Give One</span>
          </div>

          <h2 className="font-english text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Share the Gift of Understanding
          </h2>
          <p className="text-muted-foreground mb-8">
            Refer 3 friends and unlock a premium module for free. 
            Your friends get started on their journey, you get rewarded.
          </p>

          {isAuthenticated ? (
            <div className="space-y-6">
              {/* Progress indicator */}
              <div className="flex justify-center gap-3 mb-6">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      num <= (data?.referralsCount || 0)
                        ? 'bg-gold border-gold text-background'
                        : 'border-border text-muted-foreground'
                    }`}
                  >
                    {num <= (data?.referralsCount || 0) ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Users className="w-5 h-5" />
                    )}
                  </div>
                ))}
              </div>

              {hasUnlockedReward ? (
                <div className="p-4 rounded-xl bg-gold/10 border border-gold/30">
                  <p className="text-gold font-medium">
                    🎉 You've unlocked your free premium module!
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {referralsNeeded} more referral{referralsNeeded !== 1 ? 's' : ''} to unlock your reward
                </p>
              )}

              {/* Referral link */}
              <div className="flex gap-2 max-w-md mx-auto">
                <Input
                  value={referralLink}
                  readOnly
                  className="bg-muted"
                />
                <Button onClick={handleCopy} variant="outline">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                {data?.referralsCount || 0} friend{(data?.referralsCount || 0) !== 1 ? 's' : ''} referred so far
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Sign in to get your unique referral link
              </p>
              <Link to="/auth">
                <Button>Sign In to Start Sharing</Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
