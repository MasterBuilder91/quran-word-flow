import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Letter groups organized by articulation point (inspired by reference images)
export const articulationGroups = [
  {
    id: 'throat-deep',
    name: 'Deep Throat',
    nameArabic: 'أقصى الحَلق',
    color: 'hsl(280, 60%, 60%)', // Purple
    letters: [
      { arabic: 'ء', forms: 'أَ أِ أُ' },
      { arabic: 'ه', forms: 'هَ هِ هُ' },
    ],
    diagramType: 'throat',
    description: 'Deepest part of the throat. Hamza is a glottal stop like "uh-oh". Haa is a soft breath.',
  },
  {
    id: 'throat-mid',
    name: 'Middle Throat',
    nameArabic: 'وَسَط الحَلق',
    color: 'hsl(320, 60%, 55%)', // Pink
    letters: [
      { arabic: 'ع', forms: 'عَ عِ عُ' },
      { arabic: 'ح', forms: 'حَ حِ حُ' },
    ],
    diagramType: 'throat',
    description: 'Ayn (ع) requires squeezing the throat - unique to Arabic. Haa (ح) is a breathy H.',
  },
  {
    id: 'throat-upper',
    name: 'Upper Throat',
    nameArabic: 'أدنى الحَلق',
    color: 'hsl(200, 70%, 55%)', // Blue
    letters: [
      { arabic: 'غ', forms: 'غَ غِ غُ' },
      { arabic: 'خ', forms: 'خَ خِ خُ' },
    ],
    diagramType: 'throat',
    description: 'Ghayn (غ) like French R. Khaa (خ) like Scottish "loch".',
  },
  {
    id: 'tongue-back',
    name: 'Back of Tongue',
    nameArabic: 'أقصى اللِّسان',
    color: 'hsl(150, 60%, 45%)', // Green
    letters: [
      { arabic: 'ق', forms: 'قَ قِ قُ' },
      { arabic: 'ك', forms: 'كَ كِ كُ' },
    ],
    diagramType: 'tongue-back',
    description: 'Qaf (ق) is a deep K from the very back. Kaf (ك) is like English K.',
  },
  {
    id: 'tongue-middle',
    name: 'Middle of Tongue',
    nameArabic: 'وَسَط اللِّسان',
    color: 'hsl(180, 60%, 45%)', // Teal
    letters: [
      { arabic: 'ش', forms: 'شَ شِ شُ' },
      { arabic: 'ي', forms: 'يَ يِ يُ' },
      { arabic: 'ج', forms: 'جَ جِ جُ' },
      { arabic: 'ض', forms: 'ضَ ضِ ضُ' },
    ],
    diagramType: 'tongue-middle',
    description: 'Middle tongue against the roof. Daad (ض) is THE Arabic letter - tongue edge presses molars.',
  },
  {
    id: 'tongue-tip-gum',
    name: 'Tongue Tip to Gum',
    nameArabic: 'طَرَف اللِّسان',
    color: 'hsl(45, 80%, 50%)', // Gold
    letters: [
      { arabic: 'ل', forms: 'لَ لِ لُ' },
      { arabic: 'ن', forms: 'نَ نِ نُ' },
      { arabic: 'ر', forms: 'رَ رِ رُ' },
      { arabic: 'ط', forms: 'طَ طِ طُ' },
      { arabic: 'د', forms: 'دَ دِ دُ' },
      { arabic: 'ت', forms: 'تَ تِ تُ' },
    ],
    diagramType: 'tongue-tip',
    description: 'Tongue tip touches the gum ridge behind upper teeth. Raa (ر) is rolled like Spanish R.',
  },
  {
    id: 'tongue-teeth',
    name: 'Tongue to Teeth',
    nameArabic: 'الأسنان',
    color: 'hsl(260, 60%, 60%)', // Purple
    letters: [
      { arabic: 'ص', forms: 'صَ صِ صُ' },
      { arabic: 'ز', forms: 'زَ زِ زُ' },
      { arabic: 'س', forms: 'سَ سِ سُ' },
      { arabic: 'ظ', forms: 'ظَ ظِ ظُ' },
      { arabic: 'ذ', forms: 'ذَ ذِ ذُ' },
      { arabic: 'ث', forms: 'ثَ ثِ ثُ' },
    ],
    diagramType: 'teeth',
    description: 'Tongue tip at or between teeth edges. Emphatic letters (ص ظ) have raised tongue back.',
  },
  {
    id: 'lips',
    name: 'The Lips',
    nameArabic: 'الشَّفَتان',
    color: 'hsl(0, 65%, 55%)', // Red
    letters: [
      { arabic: 'ف', forms: 'فَ فِ فُ' },
      { arabic: 'و', forms: 'وَ وِ وُ' },
      { arabic: 'ب', forms: 'بَ بِ بُ' },
      { arabic: 'م', forms: 'مَ مِ مُ' },
    ],
    diagramType: 'lips',
    description: 'Faa (ف) - upper teeth on lower lip. Others use both lips together.',
  },
];

interface ArticulationChartProps {
  selectedGroup?: string;
  onGroupSelect?: (groupId: string) => void;
}

export const ArticulationChart = ({ selectedGroup, onGroupSelect }: ArticulationChartProps) => {
  const [activeGroup, setActiveGroup] = useState<string | null>(selectedGroup || null);

  const handleGroupClick = (groupId: string) => {
    setActiveGroup(activeGroup === groupId ? null : groupId);
    onGroupSelect?.(groupId);
  };

  const activeData = articulationGroups.find(g => g.id === activeGroup);

  return (
    <div className="space-y-8">
      {/* Groups Display */}
      <div className="grid gap-6">
        {articulationGroups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleGroupClick(group.id)}
            className={`relative rounded-2xl border-2 transition-all cursor-pointer overflow-hidden ${
              activeGroup === group.id 
                ? 'border-primary bg-card shadow-lg' 
                : 'border-border/50 bg-card/50 hover:border-border hover:bg-card/80'
            }`}
          >
            {/* Color indicator bar */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1.5"
              style={{ backgroundColor: group.color }}
            />
            
            <div className="p-5 pl-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-english font-semibold text-foreground">{group.name}</h3>
                  <p className="font-arabic text-gold text-lg">{group.nameArabic}</p>
                </div>
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: group.color }}
                />
              </div>

              {/* Letters Row */}
              <div className="flex flex-wrap gap-4 mb-4">
                {group.letters.map((letter, i) => (
                  <div key={i} className="text-center">
                    {/* Main letter */}
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl font-arabic mb-2"
                      style={{ 
                        backgroundColor: `${group.color}20`,
                        border: `2px solid ${group.color}40`
                      }}
                    >
                      <span className="text-foreground">{letter.arabic}</span>
                    </div>
                    {/* Vowel forms */}
                    <div 
                      className="px-2 py-1 rounded-lg text-sm font-arabic"
                      style={{ backgroundColor: `${group.color}15` }}
                    >
                      <span className="text-red-400">{letter.forms.split(' ')[0]}</span>
                      {' '}
                      <span className="text-green-400">{letter.forms.split(' ')[1]}</span>
                      {' '}
                      <span className="text-blue-400">{letter.forms.split(' ')[2]}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Expanded description */}
              <AnimatePresence>
                {activeGroup === group.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-border/50">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Diagram */}
                        <div className="flex-shrink-0">
                          <ArticulationDiagram type={group.diagramType} color={group.color} />
                        </div>
                        {/* Description */}
                        <div className="flex-1">
                          <p className="text-muted-foreground leading-relaxed">{group.description}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-400">Fatha (َ)</span>
                            <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400">Kasra (ِ)</span>
                            <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">Damma (ُ)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Mini diagram component showing mouth/tongue position
const ArticulationDiagram = ({ type, color }: { type: string; color: string }) => {
  return (
    <div className="w-32 h-32 rounded-xl bg-background/50 border border-border/50 flex items-center justify-center overflow-hidden">
      <svg viewBox="0 0 100 100" className="w-full h-full p-2">
        {type === 'throat' && (
          <>
            {/* Side profile showing throat */}
            <path
              d="M 70 20 C 80 25, 85 35, 85 50 C 85 65, 75 80, 60 85 L 40 85 L 40 75 C 45 75, 50 70, 52 60 L 55 40 C 55 30, 60 22, 70 20"
              fill="none"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
            />
            {/* Throat highlight */}
            <circle cx="45" cy="55" r="8" fill={`${color}40`} stroke={color} strokeWidth="2" />
            <line x1="45" y1="55" x2="30" y2="45" stroke={color} strokeWidth="2" strokeDasharray="3,2" />
          </>
        )}
        {type === 'tongue-back' && (
          <>
            {/* Open mouth view showing tongue */}
            <ellipse cx="50" cy="50" rx="35" ry="40" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
            {/* Teeth */}
            <path d="M 25 35 Q 50 25 75 35" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
            {/* Tongue */}
            <ellipse cx="50" cy="60" rx="25" ry="20" fill="hsl(0, 40%, 55%)" opacity="0.7" />
            {/* Back highlight */}
            <ellipse cx="50" cy="48" rx="10" ry="8" fill={`${color}60`} stroke={color} strokeWidth="2" />
          </>
        )}
        {type === 'tongue-middle' && (
          <>
            <ellipse cx="50" cy="50" rx="35" ry="40" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
            <path d="M 25 35 Q 50 25 75 35" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
            <ellipse cx="50" cy="60" rx="25" ry="20" fill="hsl(0, 40%, 55%)" opacity="0.7" />
            {/* Middle line highlight */}
            <line x1="35" y1="55" x2="65" y2="55" stroke={color} strokeWidth="4" strokeLinecap="round" />
          </>
        )}
        {type === 'tongue-tip' && (
          <>
            <ellipse cx="50" cy="50" rx="35" ry="40" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
            <path d="M 25 35 Q 50 25 75 35" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
            <ellipse cx="50" cy="60" rx="25" ry="20" fill="hsl(0, 40%, 55%)" opacity="0.7" />
            {/* Tip highlight near teeth */}
            <circle cx="50" cy="42" r="6" fill={`${color}60`} stroke={color} strokeWidth="2" />
            <path d="M 50 48 L 50 55" stroke={color} strokeWidth="2" />
          </>
        )}
        {type === 'teeth' && (
          <>
            <ellipse cx="50" cy="50" rx="35" ry="40" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
            {/* Upper teeth */}
            <path d="M 25 35 Q 50 25 75 35" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
            {/* Lower teeth */}
            <path d="M 30 70 Q 50 75 70 70" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
            <ellipse cx="50" cy="58" rx="20" ry="12" fill="hsl(0, 40%, 55%)" opacity="0.7" />
            {/* Teeth edge highlight */}
            <line x1="35" y1="35" x2="65" y2="35" stroke={color} strokeWidth="4" strokeLinecap="round" />
          </>
        )}
        {type === 'lips' && (
          <>
            {/* Side profile of lips */}
            <ellipse cx="50" cy="50" rx="30" ry="35" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
            {/* Lips */}
            <ellipse cx="50" cy="50" rx="20" ry="12" fill={`${color}40`} stroke={color} strokeWidth="2" />
            {/* Upper lip */}
            <path d="M 30 48 Q 50 40 70 48" fill="none" stroke={color} strokeWidth="2" />
            {/* Lower lip */}
            <path d="M 32 52 Q 50 60 68 52" fill="none" stroke={color} strokeWidth="2" />
          </>
        )}
      </svg>
    </div>
  );
};

export default ArticulationChart;
