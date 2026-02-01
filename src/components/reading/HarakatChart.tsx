import { harakat, Harakah } from "@/data/arabicReadingCourse";
import { motion } from "framer-motion";
import { AudioButton } from "@/components/ui/AudioButton";

export const HarakatChart = () => {
  const mainHarakat = harakat.filter(h => ['fatha', 'kasra', 'damma', 'sukun', 'shadda'].includes(h.id));
  const tanween = harakat.filter(h => h.id.startsWith('tanwin'));

  return (
    <div className="space-y-8">
      {/* Main vowels */}
      <div>
        <h3 className="font-english text-lg font-semibold text-foreground mb-4">The Core Vowel Marks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mainHarakat.slice(0, 3).map((h, index) => (
            <HarakahCard key={h.id} harakah={h} index={index} />
          ))}
        </div>
      </div>

      {/* Sukun and Shadda */}
      <div>
        <h3 className="font-english text-lg font-semibold text-foreground mb-4">Special Marks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mainHarakat.slice(3).map((h, index) => (
            <HarakahCard key={h.id} harakah={h} index={index} />
          ))}
        </div>
      </div>

      {/* Tanween */}
      <div>
        <h3 className="font-english text-lg font-semibold text-foreground mb-4">Tanween (Nunation)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Tanween adds an "n" sound at the end of words. Used in Classical Arabic grammar.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tanween.map((h, index) => (
            <HarakahCard key={h.id} harakah={h} index={index} compact />
          ))}
        </div>
      </div>
    </div>
  );
};

interface HarakahCardProps {
  harakah: Harakah;
  index: number;
  compact?: boolean;
}

const HarakahCard = ({ harakah, index, compact = false }: HarakahCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-5 rounded-xl bg-card border border-border ${compact ? '' : 'hover:border-primary/30 transition-all'}`}
    >
      {/* Example with vowel */}
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2">
          <span className="font-arabic text-5xl text-gold">{harakah.example.arabic}</span>
          <AudioButton 
            text={harakah.example.arabic} 
            iconOnly 
          />
        </div>
        <p className="text-sm text-primary font-mono mt-2">{harakah.example.transliteration}</p>
      </div>

      {/* Name */}
      <div className="text-center mb-3">
        <h4 className="font-english font-semibold text-foreground">{harakah.name}</h4>
        <p className="font-arabic text-gold">{harakah.nameArabic}</p>
      </div>

      {/* Sound */}
      <p className="text-sm text-muted-foreground text-center mb-3">{harakah.sound}</p>

      {!compact && (
        <p className="text-xs text-muted-foreground text-center">{harakah.description}</p>
      )}
    </motion.div>
  );
};
