import { useParams, useNavigate } from 'react-router-dom';
import { STAGES } from '@/sarf/data/seed';
import { FORM_LABELS } from '@/sarf/data/formTemplates';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PageSEO } from '@/components/layout/PageSEO';
import { motion } from 'framer-motion';
import { Lock, ChevronRight } from 'lucide-react';

const STAGE_MODULES: Record<number, { name: string; nameAr: string; path: string; available: boolean }[]> = {
  1: [
    { name: 'Past Tense (Active)', nameAr: 'الماضي المعلوم', path: '/sarf/verbs?tense=madi&voice=active&form=1', available: true },
    { name: 'Past Tense (Passive)', nameAr: 'الماضي المجهول', path: '/sarf/verbs?tense=madi&voice=passive&form=1', available: true },
    { name: 'Present Tense (Active)', nameAr: 'المضارع المعلوم', path: '/sarf/verbs?tense=mudari&voice=active&form=1', available: true },
    { name: 'Present Tense (Passive)', nameAr: 'المضارع المجهول', path: '/sarf/verbs?tense=mudari&voice=passive&form=1', available: true },
    { name: 'Imperative', nameAr: 'الأمر', path: '/sarf/verbs?tense=amr&form=1', available: true },
  ],
  2: [2,3,4,5,6,7,8,10].map(f => {
    const label = FORM_LABELS[f];
    return {
      name: `Form ${['','I','II','III','IV','V','VI','VII','VIII','IX','X'][f]} — ${label?.meaning || ''}`,
      nameAr: label?.ar || '',
      path: `/sarf/verbs?form=${f}`,
      available: [2,3,4,5,6,7,8,10].includes(f),
    };
  }),
  3: [
    { name: 'Jussive Particles (لَمْ، لَمَّا)', nameAr: 'حُرُوف الجَزْم', path: '/sarf/lesson/jussive-particles', available: true },
    { name: 'Subjunctive Particles (أَنْ، لَنْ)', nameAr: 'حُرُوف النَّصْب', path: '/sarf/lesson/subjunctive-particles', available: true },
    { name: 'Emphatic Nūn (نون التوكيد)', nameAr: 'نُون التَّوكيد', path: '/sarf/lesson/emphatic-nun', available: true },
    { name: 'Negation Particles (لا، ما، لن)', nameAr: 'حُرُوف النَّفي', path: '/sarf/lesson/negation-particles', available: true },
  ],
  4: [
    { name: 'Active Participle (اسم الفاعل)', nameAr: 'اِسْم الفَاعِل', path: '/sarf/lesson/active-participle', available: true },
    { name: 'Passive Participle (اسم المفعول)', nameAr: 'اِسْم المَفْعُول', path: '/sarf/lesson/passive-participle', available: true },
    { name: 'Verbal Noun (المصدر)', nameAr: 'المَصْدَر', path: '/sarf/lesson/verbal-noun', available: true },
    { name: 'Noun of Place & Time', nameAr: 'اِسْم المَكَان والزَّمَان', path: '/sarf/lesson/noun-of-place-time', available: true },
    { name: 'Noun of Instrument', nameAr: 'اِسْم الآلَة', path: '/sarf/lesson/noun-of-instrument', available: true },
  ],
  5: [
    { name: 'Subject & Object Agreement', nameAr: 'المُطَابَقَة', path: '/sarf/lesson/subject-object-agreement', available: true },
    { name: 'Verb–Sentence Integration', nameAr: 'الجُمْلَة الفِعْلِيَّة', path: '/sarf/lesson/verbal-sentence', available: true },
    { name: 'Conditional Sentences (لَوْ، إِنْ)', nameAr: 'الشَّرْط', path: '/sarf/lesson/conditional-sentences', available: true },
    { name: 'Qur\'anic Verb Patterns', nameAr: 'أَوزان القُرآن', path: '/sarf/lesson/quranic-verb-patterns', available: true },
  ],
};

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

const SarfStageHub = () => {
  const { stageId } = useParams();
  const navigate = useNavigate();
  const stage = STAGES.find((s) => s.id === Number(stageId));
  const modules = STAGE_MODULES[Number(stageId)] || [];
  if (!stage) return <div className="p-8 text-center">Stage not found</div>;
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageSEO title={`${stage.nameEn} — Sarf`} description={stage.description} path={`/sarf/stage/${stageId}`} />
      <Header />
      <div className="pt-20">
        <div className="border-b border-border bg-card/80">
          <div className="container max-w-4xl mx-auto py-6 px-4 text-center">
            <h1 className="arabic text-2xl text-accent">{stage.nameAr}</h1>
            <p className="text-foreground font-semibold text-lg">{stage.nameEn}</p>
            <p className="text-muted-foreground text-sm mt-1">{stage.description}</p>
          </div>
        </div>
      </div>
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
          {modules.map((mod, i) => (
            <motion.button
              key={i}
              variants={item}
              whileHover={mod.available ? { scale: 1.01, x: 4 } : {}}
              whileTap={mod.available ? { scale: 0.99 } : {}}
              onClick={() => mod.available && mod.path !== '#' && navigate(mod.path)}
              disabled={!mod.available}
              className={`w-full text-left rounded-lg p-5 transition-colors flex items-center justify-between ${mod.available ? 'bg-card border border-border hover:border-primary/50 cursor-pointer' : 'bg-muted/20 border border-border/30 cursor-not-allowed opacity-50'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${mod.available ? 'bg-gradient-to-br from-primary to-emerald-light text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                  {mod.available ? i + 1 : <Lock className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <span className="arabic text-lg text-accent">{mod.nameAr}</span>
                  <p className="text-foreground font-medium text-sm">{mod.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!mod.available && <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">Coming Soon</span>}
                {mod.available && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default SarfStageHub;
