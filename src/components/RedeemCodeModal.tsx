import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ticket } from "lucide-react";
import { toast } from "sonner";

interface RedeemCodeModalProps {
  onRedeem: (code: string) => Promise<{ success: boolean; message: string }>;
}

export const RedeemCodeModal = ({ onRedeem }: RedeemCodeModalProps) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      toast.error("Please enter a code");
      return;
    }

    setLoading(true);
    const result = await onRedeem(code.trim());
    setLoading(false);

    if (result.success) {
      toast.success(result.message);
      setOpen(false);
      setCode("");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Ticket className="w-4 h-4" />
          Have a code?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Redeem Access Code</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Enter your code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="text-center text-lg tracking-widest font-mono"
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Redeeming..." : "Redeem Code"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
