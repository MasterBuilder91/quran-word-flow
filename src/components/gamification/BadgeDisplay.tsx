import { motion } from "framer-motion";
import { 
  Sparkles, BookOpen, Target, Trophy, Crown, Flame, Zap, Star, 
  CheckCircle, Award, Users, Heart, Lock 
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const iconMap: Record<string, React.ComponentType<any>> = {
  Sparkles, BookOpen, Target, Trophy, Crown, Flame, Zap, Star,
  CheckCircle, Award, Users, Heart,
};

interface Badge {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

interface BadgeDisplayProps {
  badges: Badge[];
  earnedBadges: Badge[];
  compact?: boolean;
}

export const BadgeDisplay = ({ badges, earnedBadges, compact = false }: BadgeDisplayProps) => {
  const earnedIds = new Set(earnedBadges.map(b => b.id));

  if (compact) {
    // Show only earned badges in a row
    if (earnedBadges.length === 0) return null;
    
    return (
      <div className="flex flex-wrap gap-2">
        {earnedBadges.slice(0, 5).map((badge) => {
          const IconComponent = iconMap[badge.icon] || Sparkles;
          return (
            <Tooltip key={badge.id}>
              <TooltipTrigger>
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-gold" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">{badge.name}</p>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
        {earnedBadges.length > 5 && (
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
            +{earnedBadges.length - 5}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {badges.map((badge, index) => {
        const isEarned = earnedIds.has(badge.id);
        const IconComponent = iconMap[badge.icon] || Sparkles;
        
        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className={`relative flex flex-col items-center p-4 rounded-xl border transition-all ${
              isEarned 
                ? 'bg-gold/10 border-gold/30' 
                : 'bg-card border-border opacity-50'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
              isEarned ? 'bg-gold/20' : 'bg-muted'
            }`}>
              {isEarned ? (
                <IconComponent className="w-6 h-6 text-gold" />
              ) : (
                <Lock className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <p className={`text-xs font-medium text-center ${
              isEarned ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {badge.name}
            </p>
            <p className="text-[10px] text-muted-foreground text-center mt-1">
              {badge.description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};
