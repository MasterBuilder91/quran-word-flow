import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import articulation chart images
import throatLettersImg from "@/assets/articulation/throat-letters.png";
import tongueBackLettersImg from "@/assets/articulation/tongue-back-letters.png";
import tongueTipLettersImg from "@/assets/articulation/tongue-tip-letters.png";
import teethLettersImg from "@/assets/articulation/teeth-letters.png";
import lipsLettersImg from "@/assets/articulation/lips-letters.png";

// Letter groups organized by articulation point with English comparisons
export const articulationGroups = [
  {
    id: 'throat',
    name: 'Throat Letters (الحَلق)',
    image: throatLettersImg,
    letters: [
      { arabic: 'ء', name: 'Hamza', english: 'Glottal stop - like the pause in "uh-oh"' },
      { arabic: 'ه', name: 'Haa', english: 'Like "H" but from deeper in throat' },
      { arabic: 'ع', name: 'Ayn', english: 'No English equivalent - squeeze middle throat' },
      { arabic: 'ح', name: 'Haa', english: 'Breathy "H" - like fogging a mirror' },
      { arabic: 'غ', name: 'Ghayn', english: 'Like French "R" or gargling' },
      { arabic: 'خ', name: 'Khaa', english: 'Like "CH" in Scottish "loch" or German "Bach"' },
    ],
    description: 'These letters come from three areas of the throat: deep (ء ه), middle (ع ح), and upper (غ خ). Most are unique to Arabic.',
  },
  {
    id: 'tongue-back',
    name: 'Back of Tongue (أقصى اللِّسان)',
    image: tongueBackLettersImg,
    letters: [
      { arabic: 'ق', name: 'Qaf', english: 'Deep "K" from very back of throat - no English equivalent' },
      { arabic: 'ك', name: 'Kaf', english: '✓ Like "K" in "kite" - familiar!' },
      { arabic: 'ج', name: 'Jeem', english: '✓ Like "J" in "jam" - familiar!' },
      { arabic: 'ش', name: 'Sheen', english: '✓ Like "SH" in "ship" - familiar!' },
      { arabic: 'ي', name: 'Yaa', english: '✓ Like "Y" in "yes" - familiar!' },
      { arabic: 'ض', name: 'Daad', english: 'THE Arabic letter - tongue edge presses molars. Unique!' },
    ],
    description: 'The tongue presses against different parts of the roof of the mouth. ك ج ش ي are similar to English sounds. ض (Daad) is so unique that Arabic is called "the language of Daad".',
  },
  {
    id: 'tongue-tip',
    name: 'Tip of Tongue (طَرَف اللِّسان)',
    image: tongueTipLettersImg,
    letters: [
      { arabic: 'ل', name: 'Laam', english: '✓ Like "L" in "light" - tip touches gum ridge. Very familiar!' },
      { arabic: 'ن', name: 'Noon', english: '✓ Like "N" in "noon" - familiar!' },
      { arabic: 'ر', name: 'Raa', english: 'Rolled "R" like Spanish "rr" - NOT like English R' },
      { arabic: 'ط', name: 'Taa', english: 'Emphatic/heavy "T" - tongue back raised' },
      { arabic: 'د', name: 'Daal', english: '✓ Like "D" in "door" - familiar!' },
      { arabic: 'ت', name: 'Taa', english: '✓ Like "T" in "tea" - familiar!' },
    ],
    description: 'The tongue tip touches the gum ridge behind the upper front teeth. ل (L), ن (N), د (D), ت (T) are just like English! ر is rolled like Spanish.',
  },
  {
    id: 'teeth',
    name: 'Teeth Letters (الأسنان)',
    image: teethLettersImg,
    letters: [
      { arabic: 'ص', name: 'Saad', english: 'Emphatic "S" - tongue back raised' },
      { arabic: 'ز', name: 'Zaay', english: '✓ Like "Z" in "zoo" - familiar!' },
      { arabic: 'س', name: 'Seen', english: '✓ Like "S" in "sun" - familiar!' },
      { arabic: 'ظ', name: 'Dhaa', english: 'Emphatic "TH" (as in "this") - with raised tongue back' },
      { arabic: 'ذ', name: 'Dhaal', english: '✓ Like "TH" in "this" or "the" - familiar!' },
      { arabic: 'ث', name: 'Thaa', english: '✓ Like "TH" in "think" or "three" - familiar!' },
    ],
    description: 'The tongue tip touches or goes between the teeth. س (S), ز (Z), ث (TH-think), ذ (TH-this) are familiar English sounds!',
  },
  {
    id: 'lips',
    name: 'Lip Letters (الشَّفَتان)',
    image: lipsLettersImg,
    letters: [
      { arabic: 'ف', name: 'Faa', english: '✓ Like "F" in "fun" - upper teeth on lower lip. Familiar!' },
      { arabic: 'و', name: 'Waw', english: '✓ Like "W" in "water" or "OO" in "moon" - familiar!' },
      { arabic: 'ب', name: 'Baa', english: '✓ Like "B" in "book" - both lips together. Familiar!' },
      { arabic: 'م', name: 'Meem', english: '✓ Like "M" in "moon" - both lips together. Familiar!' },
    ],
    description: 'All lip letters have English equivalents! ف (F), و (W), ب (B), م (M) are exactly like their English counterparts.',
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

  return (
    <div className="space-y-6">
      {/* Quick reference: English-like letters */}
      <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
        <h4 className="font-semibold text-green-400 mb-2">✓ Good News for English Speakers!</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Many Arabic letters sound just like English! Look for the ✓ symbol below.
        </p>
        <div className="flex flex-wrap gap-2">
          {['ب', 'ت', 'ث', 'ج', 'د', 'ذ', 'ز', 'س', 'ش', 'ف', 'ك', 'ل', 'م', 'ن', 'و', 'ي'].map(letter => (
            <span 
              key={letter} 
              className="font-arabic text-lg px-2 py-1 rounded bg-green-500/20 text-green-300"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Articulation Charts */}
      <div className="space-y-6">
        {articulationGroups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-2xl border-2 overflow-hidden transition-all ${
              activeGroup === group.id 
                ? 'border-primary bg-card shadow-lg' 
                : 'border-border/50 bg-card/50'
            }`}
          >
            {/* Header - clickable */}
            <button
              onClick={() => handleGroupClick(group.id)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-card/80 transition-colors"
            >
              <h3 className="font-english font-semibold text-foreground text-lg">{group.name}</h3>
              <motion.span
                animate={{ rotate: activeGroup === group.id ? 180 : 0 }}
                className="text-muted-foreground"
              >
                ▼
              </motion.span>
            </button>

            {/* Expanded content */}
            <AnimatePresence>
              {activeGroup === group.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-6 space-y-6">
                    {/* Chart Image */}
                    <div className="rounded-xl overflow-hidden bg-white">
                      <img 
                        src={group.image} 
                        alt={group.name}
                        className="w-full h-auto"
                      />
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground">{group.description}</p>

                    {/* Letter breakdown */}
                    <div className="grid gap-3">
                      {group.letters.map((letter, i) => (
                        <div 
                          key={i}
                          className={`flex items-center gap-4 p-3 rounded-lg ${
                            letter.english.includes('✓') 
                              ? 'bg-green-500/10 border border-green-500/20' 
                              : 'bg-card border border-border/50'
                          }`}
                        >
                          <span className="font-arabic text-3xl text-gold w-12 text-center">
                            {letter.arabic}
                          </span>
                          <div className="flex-1">
                            <span className="font-semibold text-foreground">{letter.name}</span>
                            <p className="text-sm text-muted-foreground">{letter.english}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
        <h4 className="font-semibold text-primary mb-2">Summary</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• <strong>16 letters</strong> are similar to English sounds (marked with ✓)</li>
          <li>• <strong>6 throat letters</strong> are unique to Arabic (ء ه ع ح غ خ)</li>
          <li>• <strong>4 emphatic letters</strong> require raising the back of your tongue (ص ض ط ظ)</li>
          <li>• <strong>ق (Qaf)</strong> is a deep K from the very back</li>
          <li>• <strong>ر (Raa)</strong> is rolled like Spanish, not like English R</li>
        </ul>
      </div>
    </div>
  );
};

export default ArticulationChart;
