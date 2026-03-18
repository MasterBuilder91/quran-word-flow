import { STAGES, STARTER_VERBS } from '@/sarf/data/seed';
import { useDrillStore } from '@/sarf/store/drillStore';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, BookOpen, Shuffle, Library, Star, ChevronRight, Lock, Sparkles, ArrowLeft } from 'lucide-react';
import { playWhoosh } from '@/sarf/lib/sounds';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 30 } } };

const SarfDashboard = () => {
  const totalDrills = useDrillStore((s) => s.totalDrills);
  const streak = useDrillStore((s) => s.currentStreak);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-transparent" />
        <div className="container max-w-lg mx-auto pt-6 px-5 relative">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Main Site
          </Link>
        </div>
        <div className="container max-w-lg mx-auto pb-8 px-5 relative">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="text-center">
            <div className="arabic-xl text-gradient-gold leading-none mb-2 animate-float">صَرْف</div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-muted-foreground text-base tracking-widest uppercase font-light">Master the Arabic Verb</motion.p>
          </motion.div>
        </div>
      </header>
      <main className="container max-w-lg mx-auto px-5 pb-12">
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-3 gap-3 mb-8">
          <motion.div variants={item} className="glass-card rounded-2xl p-4 text-center"><div className="text-3xl font-bold text-foreground">{totalDrills}</div><div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1"><BookOpen className="w-3 h-3" /> Drills</div></motion.div>
          <motion.div variants={item} className="glass-card rounded-2xl p-4 text-center relative overflow-hidden"><div className="text-3xl font-bold text-accent">{streak > 0 && <Flame className="w-5 h-5 inline-block mr-1 text-accent" />}{streak}</div><div className="text-xs text-muted-foreground mt-1">Streak</div></motion.div>
          <motion.div variants={item} className="glass-card rounded-2xl p-4 text-center"><div className="text-3xl font-bold text-primary">{STARTER_VERBS.length}</div><div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1"><Star className="w-3 h-3" /> Verbs</div></motion.div>
        </motion.div>
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, type: 'spring' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { playWhoosh(); navigate('/sarf/scale-drill'); }} className="w-full relative group rounded-2xl py-5 px-6 font-semibold text-lg mb-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-emerald-light to-primary opacity-90 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center justify-center gap-3 text-primary-foreground"><Shuffle className="w-5 h-5" />Scale Drill — Pattern Training<Sparkles className="w-4 h-4 opacity-60" /></span>
        </motion.button>
        <motion.button initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, type: 'spring' }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => { playWhoosh(); navigate('/sarf/verbs'); }} className="w-full glass-card rounded-2xl py-4 px-6 font-semibold hover:border-primary/50 transition-all flex items-center justify-center gap-3 mb-10">
          <Library className="w-4 h-4 text-muted-foreground" /><span className="text-foreground">Verb Library</span><span className="text-xs text-muted-foreground ml-1">({STARTER_VERBS.length} verbs)</span>
        </motion.button>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2"><span className="h-px flex-1 bg-border" />Curriculum Path<span className="h-px flex-1 bg-border" /></h2>
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
            {STAGES.map((stage, i) => {
              const isUnlocked = totalDrills >= stage.unlockThreshold;
              return (
                <motion.button key={stage.id} variants={item} whileHover={isUnlocked ? { scale: 1.01, x: 4 } : {}} whileTap={isUnlocked ? { scale: 0.99 } : {}} onClick={() => isUnlocked && navigate(`/sarf/stage/${stage.id}`)} disabled={!isUnlocked} className={`group relative w-full text-left rounded-2xl p-5 transition-all duration-300 ${isUnlocked ? 'glass-card hover:glow-emerald cursor-pointer' : 'bg-muted/20 border border-border/30 cursor-not-allowed opacity-40'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${isUnlocked ? 'bg-gradient-to-br from-primary to-emerald-light text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{isUnlocked ? stage.id : <Lock className="w-4 h-4" />}</div>
                    <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><span className="arabic text-xl text-accent leading-tight">{stage.nameAr}</span><span className="font-semibold text-foreground">{stage.nameEn}</span></div><p className="text-muted-foreground text-xs mt-1 truncate">{stage.description}</p></div>
                    {isUnlocked && <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />}
                  </div>
                  {isUnlocked && i === 0 && (<div className="mt-3 h-1 bg-secondary rounded-full overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-primary to-emerald-light rounded-full" initial={{ width: 0 }} animate={{ width: `${Math.min((totalDrills / 150) * 100, 100)}%` }} transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }} /></div>)}
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default SarfDashboard;
