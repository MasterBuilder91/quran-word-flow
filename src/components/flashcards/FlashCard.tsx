import { Volume2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FlashcardWord } from '@/data/flashcardVocabulary';
import { useElevenLabsTTS } from '@/hooks/useElevenLabsTTS';

interface FlashCardProps {
  word: FlashcardWord;
  showImage?: boolean;
}

export const FlashCard = ({ word, showImage = true }: FlashCardProps) => {
  const { speak, isPlaying, isLoading } = useElevenLabsTTS();

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await speak(word.arabic);
    } catch (error) {
      console.error('Failed to play pronunciation:', error);
    }
  };

  // Generate a placeholder gradient based on word category
  const getCategoryGradient = (category: string) => {
    const gradients: Record<string, string> = {
      fruits: 'from-red-400 to-orange-400',
      animals: 'from-amber-400 to-yellow-400',
      home: 'from-blue-400 to-cyan-400',
      body: 'from-pink-400 to-rose-400',
      nature: 'from-green-400 to-emerald-400',
      food: 'from-orange-400 to-amber-400',
      colors: 'from-purple-400 to-pink-400',
      numbers: 'from-indigo-400 to-blue-400',
      family: 'from-teal-400 to-cyan-400',
      places: 'from-slate-400 to-gray-400',
      weather: 'from-sky-400 to-blue-400',
      time: 'from-violet-400 to-purple-400',
    };
    return gradients[category] || 'from-primary to-primary/80';
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl bg-card border border-border shadow-lg overflow-hidden">
        {/* Image area */}
        {showImage && (
          <div className={`h-[160px] bg-gradient-to-br ${getCategoryGradient(word.category)} flex items-center justify-center`}>
            {word.image ? (
              <img 
                src={word.image} 
                alt={word.english}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl">{getEmojiForWord(word.id)}</span>
            )}
          </div>
        )}
        
        {/* Content area */}
        <div className="p-6 flex flex-col items-center text-center">
          {/* English - always visible */}
          <p className="text-2xl font-bold text-foreground mb-3">
            {word.english}
          </p>
          
          <div className="w-12 h-0.5 bg-primary/30 rounded-full mb-3" />
          
          {/* Arabic */}
          <p className="text-4xl font-arabic text-primary mb-2 leading-relaxed">
            {word.arabic}
          </p>
          
          {/* Transliteration */}
          <p className="text-sm text-muted-foreground italic mb-4">
            {word.transliteration}
          </p>
          
          {/* Audio button */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleSpeak}
            disabled={isPlaying || isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-primary animate-pulse' : ''}`} />
            )}
            Listen
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper function to get emoji for word
function getEmojiForWord(wordId: string): string {
  const emojiMap: Record<string, string> = {
    // Fruits
    apple: '🍎', banana: '🍌', orange: '🍊', grape: '🍇', watermelon: '🍉',
    strawberry: '🍓', mango: '🥭', pomegranate: '🫐', date: '🌴', fig: '🍐',
    // Animals
    cat: '🐱', dog: '🐕', bird: '🐦', fish: '🐟', lion: '🦁',
    horse: '🐴', camel: '🐪', elephant: '🐘', sheep: '🐑', cow: '🐄',
    chicken: '🐔', rabbit: '🐰',
    // Home
    house: '🏠', door: '🚪', window: '🪟', table: '🪑', chair: '🪑',
    bed: '🛏️', kitchen: '🍳', bathroom: '🚿', room: '🛋️', key: '🔑',
    lamp: '💡', mirror: '🪞',
    // Body
    head: '👤', eye: '👁️', ear: '👂', nose: '👃', mouth: '👄',
    hand: '✋', foot: '🦶', heart: '❤️', finger: '👆', tongue: '👅',
    // Nature
    sun: '☀️', moon: '🌙', star: '⭐', sky: '🌤️', water: '💧',
    tree: '🌳', flower: '🌸', mountain: '⛰️', sea: '🌊', river: '🏞️',
    earth: '🌍', fire: '🔥',
    // Food
    bread: '🍞', rice: '🍚', meat: '🥩', milk: '🥛', egg: '🥚',
    cheese: '🧀', honey: '🍯', tea: '🍵', coffee: '☕', sugar: '🧂',
    // Colors
    red: '🔴', blue: '🔵', green: '🟢', yellow: '🟡', white: '⚪',
    black: '⚫', 'orange-color': '🟠', purple: '🟣', brown: '🟤', pink: '💗',
    // Numbers
    one: '1️⃣', two: '2️⃣', three: '3️⃣', four: '4️⃣', five: '5️⃣',
    six: '6️⃣', seven: '7️⃣', eight: '8️⃣', nine: '9️⃣', ten: '🔟',
    // Family
    father: '👨', mother: '👩', son: '👦', daughter: '👧', brother: '👬',
    sister: '👭', grandfather: '👴', grandmother: '👵', uncle: '👨‍🦳', aunt: '👩‍🦳',
    // Places
    city: '🏙️', village: '🏘️', mosque: '🕌', school: '🏫', market: '🏪',
    hospital: '🏥', street: '🛣️', garden: '🌷', library: '📚', airport: '✈️',
    // Weather
    rain: '🌧️', wind: '💨', cloud: '☁️', snow: '❄️', hot: '🌡️', cold: '🥶',
    // Time
    day: '🌞', night: '🌜', morning: '🌅', evening: '🌆', hour: '⏰',
    week: '📅', month: '📆', year: '🗓️', today: '📌', tomorrow: '➡️',
  };
  return emojiMap[wordId] || '📝';
}
