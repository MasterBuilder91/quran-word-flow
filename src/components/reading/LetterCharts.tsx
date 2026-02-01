import { arabicLetters, ArabicLetter } from "@/data/arabicReadingCourse";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import { useInstantAudio } from "@/hooks/useInstantAudio";

interface LetterFormsChartProps {
  letterIds?: string[];
  showAll?: boolean;
}

export const LetterFormsChart = ({ letterIds, showAll = true }: LetterFormsChartProps) => {
  const { speak, stop, isTextPlaying } = useInstantAudio();
  
  const letters = showAll 
    ? arabicLetters.filter(l => !['taa-marbuta', 'hamza'].includes(l.id))
    : arabicLetters.filter(l => letterIds?.includes(l.id));

  const handleLetterClick = async (arabic: string) => {
    if (isTextPlaying(arabic)) {
      stop();
    } else {
      try {
        await speak(arabic);
      } catch (error) {
        console.error('Failed to play letter:', error);
      }
    }
  };

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
          {letters.map((letter, index) => {
            const isCurrentlyPlaying = isTextPlaying(letter.arabic);
            return (
              <motion.tr
                key={letter.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="border-b border-border/50 hover:bg-card/50 transition-colors"
              >
                <td className="p-3">
                  <button
                    onClick={() => handleLetterClick(letter.arabic)}
                    className="flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <span className={`font-arabic text-2xl text-gold ${isCurrentlyPlaying ? 'animate-pulse' : ''}`}>
                      {letter.arabic}
                    </span>
                    <span className="text-sm text-foreground">{letter.name}</span>
                    <Volume2 className={`w-4 h-4 transition-colors ${isCurrentlyPlaying ? 'text-primary animate-pulse' : 'text-muted-foreground group-hover:text-primary'}`} />
                  </button>
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
            );
          })}
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
  const { speak, stop, isTextPlaying } = useInstantAudio();
  const isCurrentlyPlaying = isTextPlaying(letter.arabic);

  const handleClick = async () => {
    if (isCurrentlyPlaying) {
      stop();
    } else {
      try {
        await speak(letter.arabic);
      } catch (error) {
        console.error('Failed to play letter:', error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all discovery-card cursor-pointer"
      onClick={handleClick}
    >
      {/* Main letter */}
      <div className="text-center mb-4 relative">
        <span className={`font-arabic text-6xl text-gold text-glow-gold ${isCurrentlyPlaying ? 'animate-pulse' : ''}`}>
          {letter.arabic}
        </span>
        <Volume2 className={`absolute top-0 right-0 w-5 h-5 transition-colors ${isCurrentlyPlaying ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
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
