import { cn } from "@/lib/utils";

interface OrnamentalDividerProps {
  className?: string;
  symbol?: string;
}

export const OrnamentalDivider = ({ 
  className, 
  symbol = "◆" 
}: OrnamentalDividerProps) => {
  return (
    <div className={cn("flex items-center gap-4 my-8", className)}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <span className="text-gold text-sm">{symbol}</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/40 to-transparent" />
    </div>
  );
};
