import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CheatSheetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheatSheetModal = ({ open, onOpenChange }: CheatSheetModalProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    const { error: dbError } = await supabase
      .from('email_subscribers')
      .insert({ email, source: 'newsletter' });

    if (dbError && dbError.code !== '23505') {
      setLoading(false);
      toast.error('Something went wrong. Please try again.');
      return;
    }

    if (dbError?.code === '23505') {
      toast.success("You're already subscribed!");
    } else {
      toast.success('Successfully subscribed!');
    }

    setLoading(false);
    setSuccess(true);
  };

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSuccess(false);
        setEmail("");
      }, 300);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            Stay Updated
          </DialogTitle>
          <DialogDescription className="text-center">
            Get learning tips, new lesson announcements, and exclusive resources delivered to your inbox.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <p className="text-foreground font-medium">You're all set!</p>
            <p className="text-sm text-muted-foreground">
              We'll keep you updated on your Arabic learning journey. 🌙
            </p>
            <Button onClick={() => onOpenChange(false)} className="mt-4">
              Continue Learning
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                'Subscribe'
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              No spam, ever. Unsubscribe anytime.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};