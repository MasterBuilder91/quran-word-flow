import { CONJUGATION_SLOTS } from '@/sarf/data/seed';
import { generateConjugationsForVerb } from '@/sarf/lib/conjugationEngine';
import { getVerbById } from '@/sarf/data/seed';
import { getComparisonVerbs, getSessionCount } from '@/sarf/store/drillHistory';
import type { Tense, Voice, Verb } from '@/sarf/data/types';

interface PatternComparisonProps { form: number; verbType: string; tense: Tense; voice: Voice; }

const PatternComparison = ({ form, verbType, tense, voice }: PatternComparisonProps) => {
  const sessionCount = getSessionCount(form, verbType);
  if (sessionCount < 5) return null;
  const verbIds = getComparisonVerbs(form, verbType);
  const verbs = verbIds.map(id => getVerbById(id)).filter(Boolean) as Verb[];
  if (verbs.length < 3) return null;
  const slots = tense === 'amr' ? CONJUGATION_SLOTS.filter(s => s.slotId >= 7 && s.slotId <= 12) : CONJUGATION_SLOTS.slice(0, 6);
  return (
    <div className="bg-card border-2 border-primary/20 rounded-lg p-4 mt-6">
      <h3 className="text-sm font-bold text-primary mb-1">Pattern Comparison</h3>
      <p className="text-xs text-muted-foreground mb-4">Three different verbs. One pattern. This is the <span className="arabic">وزن</span>.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-center">
          <thead><tr><th className="text-xs text-muted-foreground pb-2 text-right">Pronoun</th>{verbs.map(v => (<th key={v.id} className="text-xs text-muted-foreground pb-2"><span className="arabic text-base text-accent">{v.madi}</span></th>))}</tr></thead>
          <tbody>{slots.map(slot => (<tr key={slot.slotId} className="border-t border-border"><td className="py-2 text-right"><span className="arabic text-sm">{slot.pronounAr}</span></td>{verbs.map(v => { const conjs = generateConjugationsForVerb(v, tense, voice); const conj = conjs.find(c => c.slotId === slot.slotId); return (<td key={v.id} className="py-2"><span className="arabic text-base text-foreground">{conj?.formText || '—'}</span></td>); })}</tr>))}</tbody>
        </table>
      </div>
    </div>
  );
};

export default PatternComparison;
