import { motion } from 'framer-motion';

interface SlotSentenceProps { translation: string; example: { ar: string; en: string } | null; }

const SlotSentence = ({ translation, example }: SlotSentenceProps) => (
  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-2 space-y-1">
    <div className="text-sm font-medium text-accent" dir="ltr">→ {translation}</div>
    {example && example.en && (
      <div className="space-y-0.5">
        {example.ar && <div className="text-sm text-foreground/70 font-arabic leading-relaxed" dir="rtl">مثال: {example.ar}</div>}
        <div className="text-[11px] text-muted-foreground italic leading-relaxed" dir="ltr">e.g. "{example.en}"</div>
      </div>
    )}
  </motion.div>
);

export default SlotSentence;
