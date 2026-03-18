import { useParams, useNavigate } from 'react-router-dom';
import { STAGES } from '@/sarf/data/seed';
import { ArrowLeft } from 'lucide-react';

const STAGE_MODULES: Record<number, { name: string; nameAr: string; path: string }[]> = {
  1: [
    { name: 'Past Tense (Active)', nameAr: 'الماضي المعلوم', path: '/sarf/verbs?tense=madi&voice=active' },
    { name: 'Past Tense (Passive)', nameAr: 'الماضي المجهول', path: '/sarf/verbs?tense=madi&voice=passive' },
    { name: 'Present Tense (Active)', nameAr: 'المضارع المعلوم', path: '/sarf/verbs?tense=mudari&voice=active' },
    { name: 'Present Tense (Passive)', nameAr: 'المضارع المجهول', path: '/sarf/verbs?tense=mudari&voice=passive' },
    { name: 'Imperative', nameAr: 'الأمر', path: '/sarf/verbs?tense=amr' },
  ],
  2: Array.from({ length: 10 }, (_, i) => ({ name: `Form ${['I','II','III','IV','V','VI','VII','VIII','IX','X'][i]}`, nameAr: `الوزن ${i+1}`, path: `/sarf/stage/2/form/${i+1}` })),
  3: [{ name: 'Coming soon', nameAr: 'قريبًا', path: '#' }],
  4: [{ name: 'Coming soon', nameAr: 'قريبًا', path: '#' }],
  5: [{ name: 'Coming soon', nameAr: 'قريبًا', path: '#' }],
};

const SarfStageHub = () => {
  const { stageId } = useParams();
  const navigate = useNavigate();
  const stage = STAGES.find((s) => s.id === Number(stageId));
  const modules = STAGE_MODULES[Number(stageId)] || [];
  if (!stage) return <div className="p-8 text-center">Stage not found</div>;
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b-2 border-border bg-card/80 backdrop-blur-sm">
        <div className="container max-w-4xl mx-auto py-4 px-4">
          <button onClick={() => navigate('/sarf')} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-3"><ArrowLeft className="w-4 h-4" /> Back</button>
          <div className="text-center"><h1 className="arabic text-2xl text-accent">{stage.nameAr}</h1><p className="text-foreground font-semibold text-lg">{stage.nameEn}</p><p className="text-muted-foreground text-sm mt-1">{stage.description}</p></div>
        </div>
      </header>
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-3">
          {modules.map((mod, i) => (
            <button key={i} onClick={() => mod.path !== '#' && navigate(mod.path)} className="w-full text-left bg-card border border-border rounded-lg p-5 hover:border-primary transition-colors flex items-center justify-between">
              <div><span className="arabic text-xl text-accent">{mod.nameAr}</span><p className="text-foreground font-medium">{mod.name}</p></div>
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-bold text-muted-foreground">{i+1}</div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SarfStageHub;
