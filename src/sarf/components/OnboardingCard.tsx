import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ONBOARDING_KEY = 'sarf-onboarding-seen';

const OnboardingCard = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { if (!localStorage.getItem(ONBOARDING_KEY)) setVisible(true); }, []);
  const dismiss = () => { localStorage.setItem(ONBOARDING_KEY, 'true'); setVisible(false); };
  if (!visible) return null;
  return (
    <div className="bg-card border-2 border-primary rounded-lg p-6 mb-6 relative">
      <button onClick={dismiss} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
      <h3 className="font-bold text-foreground text-lg mb-2">How this app works</h3>
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p>Arabic verbs are not memorized one by one. They follow patterns called <span className="arabic text-base text-accent">أَوْزَان</span> (scales). Every verb on the same scale conjugates <strong className="text-foreground">identically</strong>.</p>
        <p>This app will show you dozens of different verbs — but the pattern will always be the same. By the time you have drilled 50 verbs, you will be able to conjugate <em>any</em> verb you encounter.</p>
        <p className="text-foreground font-medium">The verb changes. The pattern does not.</p>
      </div>
      <button onClick={dismiss} className="mt-4 bg-primary text-primary-foreground rounded-lg py-2.5 px-6 font-semibold text-sm hover:opacity-90 transition-opacity">Begin Drilling</button>
    </div>
  );
};

export default OnboardingCard;
