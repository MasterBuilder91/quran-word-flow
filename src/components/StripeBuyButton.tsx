import { useEffect } from "react";

interface StripeBuyButtonProps {
  buyButtonId: string;
  publishableKey: string;
}

export const StripeBuyButton = ({ buyButtonId, publishableKey }: StripeBuyButtonProps) => {
  useEffect(() => {
    // Load Stripe Buy Button script
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    // @ts-ignore - Custom element from Stripe
    <stripe-buy-button
      buy-button-id={buyButtonId}
      publishable-key={publishableKey}
    />
  );
};
