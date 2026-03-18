import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { CONJUGATION_SLOTS, getVerbById } from '@/sarf/data/seed';
import { generateConjugationsForVerb } from '@/sarf/lib/conjugationEngine';
import { useDrillStore } from '@/sarf/store/drillStore';
import { getRandomVerbForDrill } from '@/sarf/lib/verbRandomizer';
import { addVerbToHistory, getRecentVerbIds } from '@/sarf/store/drillHistory';
import PatternBreakdown from '@/sarf/components/PatternBreakdown';
import PatternComparison from '@/sarf/components/PatternComparison';
import SlotSentence from '@/sarf/components/SlotSentence';
import { getSlotTranslation, getExampleSentence, getTenseAwareMeaning } from '@/sarf/lib/sentenceEngine';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Eye, EyeOff, Shuffle, Sparkles } from 'lucide-react';
import type { Tense, Voice } from '@/sarf/data/types';
import { useState, useEffect } from 'react';
import { playTap, playSuccess, playWhoosh } from '@/sarf/lib/sounds';

const TENSE_LABELS: Record<Tense, { ar: string; en: string }> = { madi: { ar: 'الماضي', en: 'Past' }, mudari: { ar: 'المضارع', en: 'Present' }, amr: { ar: 'الأمر', en: 'Imperative' } };
const PATTERN_MESSAGES = [(verb: string) => `You drilled ${verb}. Next: different verb, same pattern.`, () => `The verb changes. The pattern does not. That is Sarf.`, (verb: string) => `Form I always follows the same wazn — you drilled ${verb} today.`];

const SarfDrillMode = () => {
  const { verbId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const verb = getVerbById(verbId || '');
  const isScaleMode = searchParams.get('mode') === 'scale';
  const initialTense = (searchParams.get('tense') as Tense) || 'madi';
  const [showBreakdown, setShowBreakdown] = useState(true);
  const [msgIdx] = useState(() => Math.floor(Math.random() * PATTERN_MESSAGES.length));
  const { currentSlotIndex, currentPass, totalPasses, tense, voice, setTense, setVoice, nextSlot, resetDrill, incrementDrills } = useDrillStore();

  useEffect(() => { if (initialTense && initialTense !== tense) setTense(initialTense); }, []);

  const conjugations = verb ? generateConjugationsForVerb(verb, tense, voice) : [];
  const validSlots = tense === 'amr' ? CONJUGATION_SLOTS.filter((s) => s.slotId >= 7 && s.slotId <= 12) : CONJUGATION_SLOTS;
  const totalSlots = validSlots.length;
  const isDone = currentSlotIndex >= totalSlots;
  useEffect(() => { if (isDone) playSuccess(); }, [isDone]);

  if (!verb) return <div className="p-8 text-center text-foreground">Verb not found</div>;

  const handleNext = () => { playTap(); incrementDrills(); nextSlot(totalSlots); };
  const handleFinish = () => { resetDrill(); navigate(isScaleMode ? '/sarf/scale-drill' : '/sarf/verbs'); };
  const handleNextVerb = () => { playWhoosh(); const recentIds = getRecentVerbIds(verb.form, verb.verbType); const nextVerb = getRandomVerbForDrill(verb.form, verb.verbType, recentIds); if (nextVerb) { addVerbToHistory(verb.form, verb.verbType, nextVerb.id); resetDrill(); navigate(`/sarf/drill/${nextVerb.id}?mode=scale&tense=${tense}`, { replace: true }); } };
  const progress = totalSlots > 0 ? (currentSlotIndex / totalSlots) * 100 : 0;

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <header className="border-b border-border/50 glass-card shrink-0">
        <div className="container max-w-lg mx-auto py-3 px-5">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => { resetDrill(); navigate(isScaleMode ? '/sarf/scale-drill' : '/sarf/verbs'); }} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"><ArrowLeft className="w-4 h-4" /> Back</button>
            {isScaleMode && <span className="text-xs px-2.5 py-1 rounded-full bg-primary/15 text-primary font-medium flex items-center gap-1"><Shuffle className="w-3 h-3" /> Scale Mode</span>}
          </div>
          <motion.div key={verb.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-3">
            <div className="arabic-xl text-gradient-gold leading-none text-5xl">{verb.madi}</div>
            <div className="flex items-center justify-center gap-3 mt-1.5"><span className="text-xs text-muted-foreground">{verb.root}</span><span className="text-sm font-medium text-accent">{getTenseAwareMeaning(verb, tense)}</span><span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">Form {verb.form}</span></div>
          </motion.div>
          <div className="flex gap-1 bg-secondary/50 rounded-xl p-1">
            {(['madi', 'mudari', 'amr'] as Tense[]).map((t) => (<button key={t} onClick={() => { playTap(); setTense(t); }} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tense === t ? 'bg-gradient-to-r from-primary to-emerald-light text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}`}><span className="arabic text-base">{TENSE_LABELS[t].ar}</span><span className="block text-[10px] font-normal">{TENSE_LABELS[t].en}</span></button>))}
          </div>
          {tense !== 'amr' && (<div className="flex gap-1 mt-2 bg-secondary/50 rounded-lg p-1">{(['active', 'passive'] as Voice[]).map((v) => (<button key={v} onClick={() => { playTap(); setVoice(v); }} className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${voice === v ? 'bg-accent/20 text-accent border border-accent/30' : 'text-muted-foreground hover:text-foreground'}`}>{v === 'active' ? 'مَعْلُوم (Active)' : 'مَجْهُول (Passive)'}</button>))}</div>)}
          {!isDone && (<div className="mt-3 h-1 bg-secondary rounded-full overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-primary to-accent rounded-full" animate={{ width: `${progress}%` }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} /></div>)}
        </div>
      </header>
      <main className="flex-1 container max-w-lg mx-auto px-5 py-4 overflow-auto">
        <AnimatePresence mode="wait">
          {isDone ? (
            <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-12">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }} className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-emerald-light flex items-center justify-center mb-6 glow-emerald"><Sparkles className="w-10 h-10 text-primary-foreground" /></motion.div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Drill Complete!</h2>
              <p className="text-muted-foreground mb-6 text-sm">{totalPasses} passes × {totalSlots} slots</p>
              {isScaleMode && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card border-primary/20 rounded-xl p-4 mb-6 max-w-sm text-center"><p className="text-xs text-muted-foreground leading-relaxed italic">{PATTERN_MESSAGES[msgIdx](verb.madi)}</p></motion.div>}
              <div className="flex flex-col gap-3 w-full max-w-sm">
                {isScaleMode && <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleNextVerb} className="w-full relative group rounded-xl py-4 px-8 font-semibold overflow-hidden"><div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-light" /><span className="relative flex items-center justify-center gap-2 text-primary-foreground"><Shuffle className="w-4 h-4" /> Next Random Verb</span></motion.button>}
                <button onClick={handleFinish} className={`w-full rounded-xl py-3 px-8 font-semibold transition-all ${isScaleMode ? 'glass-card text-foreground hover:border-primary/50' : 'bg-gradient-to-r from-primary to-emerald-light text-primary-foreground'}`}>{isScaleMode ? 'Back to Scale Drill' : 'Choose Another Verb'}</button>
              </div>
              {isScaleMode && <PatternComparison form={verb.form} verbType={verb.verbType} tense={tense} voice={voice} />}
            </motion.div>
          ) : (
            <motion.div key="drilling" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex justify-end mb-2"><button onClick={() => setShowBreakdown(!showBreakdown)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">{showBreakdown ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}{showBreakdown ? 'Hide' : 'Show'} pattern</button></div>
              <div className="space-y-2">
                {validSlots.map((slot, index) => {
                  const conj = conjugations.find((c) => c.slotId === slot.slotId);
                  const isActive = index === currentSlotIndex;
                  const isCompleted = index < currentSlotIndex;
                  return (
                    <motion.div key={slot.slotId} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }} className={`flex items-center gap-4 rounded-xl border p-4 transition-all duration-300 ${isActive ? 'border-primary/50 bg-primary/5' : isCompleted ? 'border-border/30 glass-card opacity-40' : 'border-border/30 glass-card opacity-50'}`}>
                      <div className="w-20 shrink-0 text-right"><div className={`arabic text-xl ${isActive ? 'text-primary' : 'text-foreground'}`}>{slot.pronounAr}</div><div className="text-[10px] text-muted-foreground">{slot.pronounEn}</div></div>
                      <div className="flex-1 text-right">
                        {conj ? (<><motion.div key={`${conj.formText}-${isActive}`} initial={isActive ? { scale: 0.95, opacity: 0 } : {}} animate={{ scale: 1, opacity: 1 }} className={`font-arabic transition-all ${isActive ? 'text-[2.2rem] text-foreground' : 'text-[1.6rem] text-foreground'}`} style={{ fontFamily: "'Amiri', serif", direction: 'rtl' }}>{conj.formText}</motion.div>{isActive && <PatternBreakdown formText={conj.formText} verb={verb} showBreakdown={showBreakdown} />}<SlotSentence translation={getSlotTranslation(verb, slot.slotId, tense, voice)} example={isActive ? getExampleSentence(verb, slot.slotId, tense, conj.formText) : null} /></>) : (<div className="text-muted-foreground text-sm italic">—</div>)}
                      </div>
                      <div className="w-6 shrink-0">{isCompleted && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}><Check className="w-5 h-5 text-primary" /></motion.div>}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      {!isDone && (<div className="border-t border-border/50 glass-card shrink-0"><div className="container max-w-lg mx-auto p-4"><div className="flex items-center justify-between mb-2"><span className="text-xs text-muted-foreground">Pass {currentPass}/{totalPasses}</span><span className="text-xs text-muted-foreground">{currentSlotIndex + 1}/{totalSlots}</span></div><motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={handleNext} className="w-full relative group rounded-xl py-4 font-semibold text-lg overflow-hidden"><div className="absolute inset-0 bg-gradient-to-r from-primary to-emerald-light" /><span className="relative text-primary-foreground">Next →</span></motion.button></div></div>)}
    </div>
  );
};

export default SarfDrillMode;
