import { decomposeForm } from '@/sarf/lib/conjugationEngine';
import { motion } from 'framer-motion';
import type { Verb } from '@/sarf/data/types';

interface PatternBreakdownProps {
  formText: string;
  verb: Verb;
  showBreakdown: boolean;
}

const PatternBreakdown = ({ formText, verb, showBreakdown }: PatternBreakdownProps) => {
  if (!showBreakdown) return null;
  const segments = decomposeForm(formText, verb);
  return (
    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-1 text-lg" style={{ fontFamily: "'Amiri', serif", direction: 'rtl' }}>
      {segments.map((seg, i) => (
        <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }} className={seg.type === 'root' ? 'text-foreground' : 'text-accent font-bold'}>{seg.text}</motion.span>
      ))}
    </motion.div>
  );
};

export default PatternBreakdown;
