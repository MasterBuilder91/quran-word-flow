import { arabicLetters, ArabicLetter } from "@/data/arabicReadingCourse";
import { motion } from "framer-motion";

interface LetterFormsChartProps {
  letterIds?: string[];
  showAll?: boolean;
}

export const LetterFormsChart = ({ letterIds, showAll = true }: LetterFormsChartProps) => {
  const letters = showAll 
    ? arabicLetters.filter(l => !['taa-marbuta', 'hamza'].includes(l.id))
    : arabicLetters.filter(l => letterIds?.includes(l.id));

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="p-3 text-left text-sm text-muted-foreground font-medium">Name</th>
            <th className="p-3 text-center text-sm text-muted-foreground font-medium">Isolated</th>
            <th className="p-3 text-center text-sm text-muted-foreground font-medium">Initial</th>
            <th className="p-3 text-center text-sm text-muted-foreground font-medium">Medial</th>
            <th className="p-3 text-center text-sm text-muted-foreground font-medium">Final</th>
            <th className="p-3 text-left text-sm text-muted-foreground font-medium">Sound</th>
          </tr>
        </thead>
        <tbody>
          {letters.map((letter, index) => (
            <motion.tr
              key={letter.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className="border-b border-border/50 hover:bg-card/50 transition-colors"
            >
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <span className="font-arabic text-2xl text-gold">{letter.arabic}</span>
                  <span className="text-sm text-foreground">{letter.name}</span>
                </div>
              </td>
              <td className="p-3 text-center font-arabic text-3xl text-foreground">{letter.forms.isolated}</td>
              <td className="p-3 text-center font-arabic text-3xl text-foreground">
                {letter.connectorType === 'right-only' ? (
                  <span className="text-muted-foreground text-lg">—</span>
                ) : letter.forms.initial}
              </td>
              <td className="p-3 text-center font-arabic text-3xl text-foreground">{letter.forms.medial}</td>
              <td className="p-3 text-center font-arabic text-3xl text-foreground">{letter.forms.final}</td>
              <td className="p-3 text-sm text-muted-foreground">{letter.transliteration}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface LetterCardProps {
  letter: ArabicLetter;
  showDetails?: boolean;
}

export const LetterCard = ({ letter, showDetails = true }: LetterCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all discovery-card"
    >
      {/* Main letter */}
      <div className="text-center mb-4">
        <span className="font-arabic text-6xl text-gold text-glow-gold">{letter.arabic}</span>
      </div>

      {/* Name and transliteration */}
      <div className="text-center mb-4">
        <h3 className="font-english text-xl font-semibold text-foreground">{letter.name}</h3>
        <p className="text-sm text-primary font-mono">/{letter.transliteration}/</p>
      </div>

      {/* Sound description */}
      <p className="text-sm text-muted-foreground text-center mb-4">{letter.sound}</p>

      {showDetails && (
        <>
          {/* Letter forms */}
          <div className="grid grid-cols-4 gap-2 mb-4 p-3 rounded-lg bg-background/50">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Isolated</p>
              <span className="font-arabic text-2xl text-foreground">{letter.forms.isolated}</span>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Initial</p>
              <span className="font-arabic text-2xl text-foreground">
                {letter.connectorType === 'right-only' ? '—' : letter.forms.initial}
              </span>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Medial</p>
              <span className="font-arabic text-2xl text-foreground">{letter.forms.medial}</span>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Final</p>
              <span className="font-arabic text-2xl text-foreground">{letter.forms.final}</span>
            </div>
          </div>

          {/* Tips */}
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-xs text-primary">💡 {letter.tips}</p>
          </div>
        </>
      )}
    </motion.div>
  );
};
