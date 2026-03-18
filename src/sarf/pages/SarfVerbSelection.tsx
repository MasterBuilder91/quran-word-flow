import { useState, useMemo } from 'react';
import { STARTER_VERBS } from '@/sarf/data/seed';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Search, Star } from 'lucide-react';
import { playTap } from '@/sarf/lib/sounds';

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.02 } } };
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

const SarfVerbSelection = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterQuranic, setFilterQuranic] = useState(false);
  const filtered = useMemo(() => STARTER_VERBS.filter(v => {
    if (filterQuranic && !v.isQuranic) return false;
    if (!search) return true;
    return v.meaningEn.toLowerCase().includes(search.toLowerCase()) || v.root.includes(search) || v.madi.includes(search);
  }), [search, filterQuranic]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 glass-card sticky top-0 z-10">
        <div className="container max-w-lg mx-auto py-4 px-5">
          <motion.button initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} onClick={() => navigate('/sarf')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3 text-sm"><ArrowLeft className="w-4 h-4" /> Back</motion.button>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><h1 className="text-xl font-bold text-foreground mb-1">Verb Library</h1><p className="text-xs text-muted-foreground">{STARTER_VERBS.length} verbs available</p></motion.div>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search verbs..." className="w-full bg-secondary/50 border border-border/50 rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" /></div>
            <button onClick={() => { playTap(); setFilterQuranic(!filterQuranic); }} className={`px-3 rounded-lg text-xs font-medium transition-all border ${filterQuranic ? 'bg-accent/15 border-accent/30 text-accent' : 'border-border/50 text-muted-foreground hover:text-foreground'}`}><Star className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      </header>
      <main className="container max-w-lg mx-auto px-5 py-4">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
          {filtered.map((verb) => (
            <motion.button key={verb.id} variants={item} whileHover={{ scale: 1.01, x: 3 }} whileTap={{ scale: 0.99 }} onClick={() => { playTap(); navigate(`/sarf/drill/${verb.id}`); }} className="w-full glass-card rounded-xl p-4 text-left group hover:border-primary/30 transition-all border border-border/30">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0"><div className="flex items-center gap-3"><span className="arabic text-2xl text-foreground leading-tight shrink-0">{verb.madi}</span><div className="min-w-0"><div className="text-sm font-medium text-foreground truncate">{verb.meaningEn}</div><div className="flex items-center gap-2 mt-0.5"><span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{verb.root}</span>{verb.isQuranic && <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/15 text-accent">☪ Quranic</span>}</div></div></div></div>
                <BookOpen className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </div>
            </motion.button>
          ))}
        </motion.div>
        {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground text-sm">No verbs match your search.</div>}
      </main>
    </div>
  );
};

export default SarfVerbSelection;
