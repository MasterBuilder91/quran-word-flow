import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shuffle, Zap, BookOpen } from 'lucide-react';
import type { Tense } from '@/sarf/data/types';
import { getRandomVerbForDrill, getAvailableScales } from '@/sarf/lib/verbRandomizer';
import { getRecentVerbIds, addVerbToHistory } from '@/sarf/store/drillHistory';
import { playWhoosh, playTap } from '@/sarf/lib/sounds';

const TENSE_LABELS: Record<Tense, { ar: string; en: string }> = { madi: { ar: 'الماضي', en: 'Past' }, mudari: { ar: 'المضارع', en: 'Present' }, amr: { ar: 'الأمر', en: 'Imperative' } };
const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };

const SarfScaleDrill = () => {
  const navigate = useNavigate();
  const scales = getAvailableScales();
  const [selectedScale, setSelectedScale] = useState(scales[0]);
  const [selectedTense, setSelectedTense] = useState<Tense>('madi');
  const handleStart = () => {
    playWhoosh();
    const recentIds = getRecentVerbIds(selectedScale.form, selectedScale.verbType);
    const verb = getRandomVerbForDrill(selectedScale.form, selectedScale.verbType, recentIds);
    if (verb) { addVerbToHistory(selectedScale.form, selectedScale.verbType, verb.id); navigate(`/sarf/drill/${verb.id}?mode=scale&tense=${selectedTense}`); }
  };
  const recentCount = getRecentVerbIds(selectedScale.form, selectedScale.verbType).length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/50 glass-card shrink-0">
        <div className="container max-w-lg mx-auto py-4 px-5">
          <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} onClick={() => navigate('/sarf')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"><ArrowLeft className="w-4 h-4" /> Back</motion.button>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-emerald-light flex items-center justify-center"><Shuffle className="w-6 h-6 text-primary-foreground" /></div>
            <div><h1 className="text-xl font-bold text-foreground">Scale Drill</h1><p className="text-xs text-muted-foreground">The verb changes. The pattern stays.</p></div>
          </motion.div>
        </div>
      </header>
      <main className="flex-1 container max-w-lg mx-auto px-5 py-6 overflow-auto">
        <motion.section variants={container} initial="hidden" animate="show" className="mb-6">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Select Scale (وزن)</h2>
          <div className="grid gap-2">
            {scales.map((scale) => {
              const isSelected = selectedScale.form === scale.form && selectedScale.verbType === scale.verbType;
              return (<motion.button key={`${scale.form}_${scale.verbType}`} variants={item} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => { playTap(); setSelectedScale(scale); }} className={`text-left rounded-xl p-4 transition-all border ${isSelected ? 'border-primary bg-primary/10 glow-emerald' : 'border-border/50 glass-card hover:border-primary/30'}`}>
                <div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>{scale.form}</div><div><span className="font-semibold text-foreground text-sm">Form {scale.form}</span><span className="text-muted-foreground ml-2 text-xs capitalize">({scale.verbType})</span></div></div><span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground font-medium">{scale.count} verbs</span></div>
              </motion.button>);
            })}
          </div>
        </motion.section>
        <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Select Tense</h2>
          <div className="flex gap-1 bg-secondary/50 rounded-xl p-1">
            {(['madi', 'mudari', 'amr'] as Tense[]).map((t) => (<button key={t} onClick={() => { playTap(); setSelectedTense(t); }} className={`flex-1 py-3 rounded-lg text-sm font-medium transition-all ${selectedTense === t ? 'bg-gradient-to-r from-primary to-emerald-light text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}><span className="arabic text-base">{TENSE_LABELS[t].ar}</span><span className="block text-xs mt-0.5 font-normal">{TENSE_LABELS[t].en}</span></button>))}
          </div>
        </motion.section>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-4 mb-4"><div className="flex gap-3"><BookOpen className="w-4 h-4 text-primary shrink-0 mt-0.5" /><p className="text-xs text-muted-foreground leading-relaxed">A random <strong className="text-foreground">Form {selectedScale.form} {selectedScale.verbType}</strong> verb will be selected. You'll drill all pronoun slots × 3 passes.</p></div></motion.div>
        {recentCount > 0 && <div className="text-xs text-muted-foreground mb-4 pl-1">✓ {recentCount} verbs drilled from this scale</div>}
      </main>
      <div className="border-t border-border/50 glass-card shrink-0"><div className="container max-w-lg mx-auto p-5"><motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleStart} className="w-full relative group rounded-xl py-4 font-semibold text-lg overflow-hidden"><div className="absolute inset-0 bg-gradient-to-r from-primary via-emerald-light to-primary" /><span className="relative flex items-center justify-center gap-2 text-primary-foreground"><Zap className="w-5 h-5" />Start Drill</span></motion.button></div></div>
    </div>
  );
};

export default SarfScaleDrill;
