import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft,
  Search,
  Loader2,
  ArrowLeft,
  Sparkles,
  Copy,
  Check
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Surah {
  id: number;
  name_arabic: string;
  name_english: string;
  name_translation: string;
  verses: number;
  revelation: 'meccan' | 'medinan';
}

interface Verse {
  id: number;
  verse_key: string;
  verse_number: number;
  text_uthmani: string;
  translation: string;
  words: Array<{ id: number; position: number; text: string }>;
}

interface Pagination {
  per_page: number;
  current_page: number;
  next_page: number | null;
  total_pages: number;
  total_records: number;
}

interface QuranBrowserProps {
  onSelectVerse: (verseText: string, verseKey: string, translation?: string) => void;
}

// Static surah data for instant loading
const surahData: Surah[] = [
  { id: 1, name_arabic: "الفاتحة", name_english: "Al-Fatihah", name_translation: "The Opening", verses: 7, revelation: "meccan" },
  { id: 2, name_arabic: "البقرة", name_english: "Al-Baqarah", name_translation: "The Cow", verses: 286, revelation: "medinan" },
  { id: 3, name_arabic: "آل عمران", name_english: "Ali 'Imran", name_translation: "Family of Imran", verses: 200, revelation: "medinan" },
  { id: 4, name_arabic: "النساء", name_english: "An-Nisa", name_translation: "The Women", verses: 176, revelation: "medinan" },
  { id: 5, name_arabic: "المائدة", name_english: "Al-Ma'idah", name_translation: "The Table Spread", verses: 120, revelation: "medinan" },
  { id: 6, name_arabic: "الأنعام", name_english: "Al-An'am", name_translation: "The Cattle", verses: 165, revelation: "meccan" },
  { id: 7, name_arabic: "الأعراف", name_english: "Al-A'raf", name_translation: "The Heights", verses: 206, revelation: "meccan" },
  { id: 8, name_arabic: "الأنفال", name_english: "Al-Anfal", name_translation: "The Spoils of War", verses: 75, revelation: "medinan" },
  { id: 9, name_arabic: "التوبة", name_english: "At-Tawbah", name_translation: "The Repentance", verses: 129, revelation: "medinan" },
  { id: 10, name_arabic: "يونس", name_english: "Yunus", name_translation: "Jonah", verses: 109, revelation: "meccan" },
  { id: 11, name_arabic: "هود", name_english: "Hud", name_translation: "Hud", verses: 123, revelation: "meccan" },
  { id: 12, name_arabic: "يوسف", name_english: "Yusuf", name_translation: "Joseph", verses: 111, revelation: "meccan" },
  { id: 13, name_arabic: "الرعد", name_english: "Ar-Ra'd", name_translation: "The Thunder", verses: 43, revelation: "medinan" },
  { id: 14, name_arabic: "إبراهيم", name_english: "Ibrahim", name_translation: "Abraham", verses: 52, revelation: "meccan" },
  { id: 15, name_arabic: "الحجر", name_english: "Al-Hijr", name_translation: "The Rocky Tract", verses: 99, revelation: "meccan" },
  { id: 16, name_arabic: "النحل", name_english: "An-Nahl", name_translation: "The Bee", verses: 128, revelation: "meccan" },
  { id: 17, name_arabic: "الإسراء", name_english: "Al-Isra", name_translation: "The Night Journey", verses: 111, revelation: "meccan" },
  { id: 18, name_arabic: "الكهف", name_english: "Al-Kahf", name_translation: "The Cave", verses: 110, revelation: "meccan" },
  { id: 19, name_arabic: "مريم", name_english: "Maryam", name_translation: "Mary", verses: 98, revelation: "meccan" },
  { id: 20, name_arabic: "طه", name_english: "Taha", name_translation: "Ta-Ha", verses: 135, revelation: "meccan" },
  { id: 21, name_arabic: "الأنبياء", name_english: "Al-Anbiya", name_translation: "The Prophets", verses: 112, revelation: "meccan" },
  { id: 22, name_arabic: "الحج", name_english: "Al-Hajj", name_translation: "The Pilgrimage", verses: 78, revelation: "medinan" },
  { id: 23, name_arabic: "المؤمنون", name_english: "Al-Mu'minun", name_translation: "The Believers", verses: 118, revelation: "meccan" },
  { id: 24, name_arabic: "النور", name_english: "An-Nur", name_translation: "The Light", verses: 64, revelation: "medinan" },
  { id: 25, name_arabic: "الفرقان", name_english: "Al-Furqan", name_translation: "The Criterion", verses: 77, revelation: "meccan" },
  { id: 26, name_arabic: "الشعراء", name_english: "Ash-Shu'ara", name_translation: "The Poets", verses: 227, revelation: "meccan" },
  { id: 27, name_arabic: "النمل", name_english: "An-Naml", name_translation: "The Ant", verses: 93, revelation: "meccan" },
  { id: 28, name_arabic: "القصص", name_english: "Al-Qasas", name_translation: "The Stories", verses: 88, revelation: "meccan" },
  { id: 29, name_arabic: "العنكبوت", name_english: "Al-'Ankabut", name_translation: "The Spider", verses: 69, revelation: "meccan" },
  { id: 30, name_arabic: "الروم", name_english: "Ar-Rum", name_translation: "The Romans", verses: 60, revelation: "meccan" },
  { id: 31, name_arabic: "لقمان", name_english: "Luqman", name_translation: "Luqman", verses: 34, revelation: "meccan" },
  { id: 32, name_arabic: "السجدة", name_english: "As-Sajdah", name_translation: "The Prostration", verses: 30, revelation: "meccan" },
  { id: 33, name_arabic: "الأحزاب", name_english: "Al-Ahzab", name_translation: "The Combined Forces", verses: 73, revelation: "medinan" },
  { id: 34, name_arabic: "سبأ", name_english: "Saba", name_translation: "Sheba", verses: 54, revelation: "meccan" },
  { id: 35, name_arabic: "فاطر", name_english: "Fatir", name_translation: "Originator", verses: 45, revelation: "meccan" },
  { id: 36, name_arabic: "يس", name_english: "Ya-Sin", name_translation: "Ya Sin", verses: 83, revelation: "meccan" },
  { id: 37, name_arabic: "الصافات", name_english: "As-Saffat", name_translation: "Those Who Set The Ranks", verses: 182, revelation: "meccan" },
  { id: 38, name_arabic: "ص", name_english: "Sad", name_translation: "Sad", verses: 88, revelation: "meccan" },
  { id: 39, name_arabic: "الزمر", name_english: "Az-Zumar", name_translation: "The Troops", verses: 75, revelation: "meccan" },
  { id: 40, name_arabic: "غافر", name_english: "Ghafir", name_translation: "The Forgiver", verses: 85, revelation: "meccan" },
  { id: 41, name_arabic: "فصلت", name_english: "Fussilat", name_translation: "Explained in Detail", verses: 54, revelation: "meccan" },
  { id: 42, name_arabic: "الشورى", name_english: "Ash-Shura", name_translation: "The Consultation", verses: 53, revelation: "meccan" },
  { id: 43, name_arabic: "الزخرف", name_english: "Az-Zukhruf", name_translation: "The Ornaments of Gold", verses: 89, revelation: "meccan" },
  { id: 44, name_arabic: "الدخان", name_english: "Ad-Dukhan", name_translation: "The Smoke", verses: 59, revelation: "meccan" },
  { id: 45, name_arabic: "الجاثية", name_english: "Al-Jathiyah", name_translation: "The Crouching", verses: 37, revelation: "meccan" },
  { id: 46, name_arabic: "الأحقاف", name_english: "Al-Ahqaf", name_translation: "The Wind-Curved Sandhills", verses: 35, revelation: "meccan" },
  { id: 47, name_arabic: "محمد", name_english: "Muhammad", name_translation: "Muhammad", verses: 38, revelation: "medinan" },
  { id: 48, name_arabic: "الفتح", name_english: "Al-Fath", name_translation: "The Victory", verses: 29, revelation: "medinan" },
  { id: 49, name_arabic: "الحجرات", name_english: "Al-Hujurat", name_translation: "The Rooms", verses: 18, revelation: "medinan" },
  { id: 50, name_arabic: "ق", name_english: "Qaf", name_translation: "Qaf", verses: 45, revelation: "meccan" },
  { id: 51, name_arabic: "الذاريات", name_english: "Adh-Dhariyat", name_translation: "The Winnowing Winds", verses: 60, revelation: "meccan" },
  { id: 52, name_arabic: "الطور", name_english: "At-Tur", name_translation: "The Mount", verses: 49, revelation: "meccan" },
  { id: 53, name_arabic: "النجم", name_english: "An-Najm", name_translation: "The Star", verses: 62, revelation: "meccan" },
  { id: 54, name_arabic: "القمر", name_english: "Al-Qamar", name_translation: "The Moon", verses: 55, revelation: "meccan" },
  { id: 55, name_arabic: "الرحمن", name_english: "Ar-Rahman", name_translation: "The Beneficent", verses: 78, revelation: "medinan" },
  { id: 56, name_arabic: "الواقعة", name_english: "Al-Waqi'ah", name_translation: "The Inevitable", verses: 96, revelation: "meccan" },
  { id: 57, name_arabic: "الحديد", name_english: "Al-Hadid", name_translation: "The Iron", verses: 29, revelation: "medinan" },
  { id: 58, name_arabic: "المجادلة", name_english: "Al-Mujadila", name_translation: "The Pleading Woman", verses: 22, revelation: "medinan" },
  { id: 59, name_arabic: "الحشر", name_english: "Al-Hashr", name_translation: "The Exile", verses: 24, revelation: "medinan" },
  { id: 60, name_arabic: "الممتحنة", name_english: "Al-Mumtahanah", name_translation: "She That Is Examined", verses: 13, revelation: "medinan" },
  { id: 61, name_arabic: "الصف", name_english: "As-Saf", name_translation: "The Ranks", verses: 14, revelation: "medinan" },
  { id: 62, name_arabic: "الجمعة", name_english: "Al-Jumu'ah", name_translation: "The Congregation", verses: 11, revelation: "medinan" },
  { id: 63, name_arabic: "المنافقون", name_english: "Al-Munafiqun", name_translation: "The Hypocrites", verses: 11, revelation: "medinan" },
  { id: 64, name_arabic: "التغابن", name_english: "At-Taghabun", name_translation: "The Mutual Disillusion", verses: 18, revelation: "medinan" },
  { id: 65, name_arabic: "الطلاق", name_english: "At-Talaq", name_translation: "The Divorce", verses: 12, revelation: "medinan" },
  { id: 66, name_arabic: "التحريم", name_english: "At-Tahrim", name_translation: "The Prohibition", verses: 12, revelation: "medinan" },
  { id: 67, name_arabic: "الملك", name_english: "Al-Mulk", name_translation: "The Sovereignty", verses: 30, revelation: "meccan" },
  { id: 68, name_arabic: "القلم", name_english: "Al-Qalam", name_translation: "The Pen", verses: 52, revelation: "meccan" },
  { id: 69, name_arabic: "الحاقة", name_english: "Al-Haqqah", name_translation: "The Reality", verses: 52, revelation: "meccan" },
  { id: 70, name_arabic: "المعارج", name_english: "Al-Ma'arij", name_translation: "The Ascending Stairways", verses: 44, revelation: "meccan" },
  { id: 71, name_arabic: "نوح", name_english: "Nuh", name_translation: "Noah", verses: 28, revelation: "meccan" },
  { id: 72, name_arabic: "الجن", name_english: "Al-Jinn", name_translation: "The Jinn", verses: 28, revelation: "meccan" },
  { id: 73, name_arabic: "المزمل", name_english: "Al-Muzzammil", name_translation: "The Enshrouded One", verses: 20, revelation: "meccan" },
  { id: 74, name_arabic: "المدثر", name_english: "Al-Muddaththir", name_translation: "The Cloaked One", verses: 56, revelation: "meccan" },
  { id: 75, name_arabic: "القيامة", name_english: "Al-Qiyamah", name_translation: "The Resurrection", verses: 40, revelation: "meccan" },
  { id: 76, name_arabic: "الإنسان", name_english: "Al-Insan", name_translation: "The Man", verses: 31, revelation: "medinan" },
  { id: 77, name_arabic: "المرسلات", name_english: "Al-Mursalat", name_translation: "The Emissaries", verses: 50, revelation: "meccan" },
  { id: 78, name_arabic: "النبأ", name_english: "An-Naba", name_translation: "The Tidings", verses: 40, revelation: "meccan" },
  { id: 79, name_arabic: "النازعات", name_english: "An-Nazi'at", name_translation: "Those Who Drag Forth", verses: 46, revelation: "meccan" },
  { id: 80, name_arabic: "عبس", name_english: "'Abasa", name_translation: "He Frowned", verses: 42, revelation: "meccan" },
  { id: 81, name_arabic: "التكوير", name_english: "At-Takwir", name_translation: "The Overthrowing", verses: 29, revelation: "meccan" },
  { id: 82, name_arabic: "الانفطار", name_english: "Al-Infitar", name_translation: "The Cleaving", verses: 19, revelation: "meccan" },
  { id: 83, name_arabic: "المطففين", name_english: "Al-Mutaffifin", name_translation: "The Defrauding", verses: 36, revelation: "meccan" },
  { id: 84, name_arabic: "الانشقاق", name_english: "Al-Inshiqaq", name_translation: "The Sundering", verses: 25, revelation: "meccan" },
  { id: 85, name_arabic: "البروج", name_english: "Al-Buruj", name_translation: "The Mansions of the Stars", verses: 22, revelation: "meccan" },
  { id: 86, name_arabic: "الطارق", name_english: "At-Tariq", name_translation: "The Nightcomer", verses: 17, revelation: "meccan" },
  { id: 87, name_arabic: "الأعلى", name_english: "Al-A'la", name_translation: "The Most High", verses: 19, revelation: "meccan" },
  { id: 88, name_arabic: "الغاشية", name_english: "Al-Ghashiyah", name_translation: "The Overwhelming", verses: 26, revelation: "meccan" },
  { id: 89, name_arabic: "الفجر", name_english: "Al-Fajr", name_translation: "The Dawn", verses: 30, revelation: "meccan" },
  { id: 90, name_arabic: "البلد", name_english: "Al-Balad", name_translation: "The City", verses: 20, revelation: "meccan" },
  { id: 91, name_arabic: "الشمس", name_english: "Ash-Shams", name_translation: "The Sun", verses: 15, revelation: "meccan" },
  { id: 92, name_arabic: "الليل", name_english: "Al-Layl", name_translation: "The Night", verses: 21, revelation: "meccan" },
  { id: 93, name_arabic: "الضحى", name_english: "Ad-Duhaa", name_translation: "The Morning Hours", verses: 11, revelation: "meccan" },
  { id: 94, name_arabic: "الشرح", name_english: "Ash-Sharh", name_translation: "The Relief", verses: 8, revelation: "meccan" },
  { id: 95, name_arabic: "التين", name_english: "At-Tin", name_translation: "The Fig", verses: 8, revelation: "meccan" },
  { id: 96, name_arabic: "العلق", name_english: "Al-'Alaq", name_translation: "The Clot", verses: 19, revelation: "meccan" },
  { id: 97, name_arabic: "القدر", name_english: "Al-Qadr", name_translation: "The Power", verses: 5, revelation: "meccan" },
  { id: 98, name_arabic: "البينة", name_english: "Al-Bayyinah", name_translation: "The Clear Proof", verses: 8, revelation: "medinan" },
  { id: 99, name_arabic: "الزلزلة", name_english: "Az-Zalzalah", name_translation: "The Earthquake", verses: 8, revelation: "medinan" },
  { id: 100, name_arabic: "العاديات", name_english: "Al-'Adiyat", name_translation: "The Courser", verses: 11, revelation: "meccan" },
  { id: 101, name_arabic: "القارعة", name_english: "Al-Qari'ah", name_translation: "The Calamity", verses: 11, revelation: "meccan" },
  { id: 102, name_arabic: "التكاثر", name_english: "At-Takathur", name_translation: "The Rivalry in World Increase", verses: 8, revelation: "meccan" },
  { id: 103, name_arabic: "العصر", name_english: "Al-'Asr", name_translation: "The Declining Day", verses: 3, revelation: "meccan" },
  { id: 104, name_arabic: "الهمزة", name_english: "Al-Humazah", name_translation: "The Traducer", verses: 9, revelation: "meccan" },
  { id: 105, name_arabic: "الفيل", name_english: "Al-Fil", name_translation: "The Elephant", verses: 5, revelation: "meccan" },
  { id: 106, name_arabic: "قريش", name_english: "Quraysh", name_translation: "Quraysh", verses: 4, revelation: "meccan" },
  { id: 107, name_arabic: "الماعون", name_english: "Al-Ma'un", name_translation: "The Small Kindnesses", verses: 7, revelation: "meccan" },
  { id: 108, name_arabic: "الكوثر", name_english: "Al-Kawthar", name_translation: "The Abundance", verses: 3, revelation: "meccan" },
  { id: 109, name_arabic: "الكافرون", name_english: "Al-Kafirun", name_translation: "The Disbelievers", verses: 6, revelation: "meccan" },
  { id: 110, name_arabic: "النصر", name_english: "An-Nasr", name_translation: "The Divine Support", verses: 3, revelation: "medinan" },
  { id: 111, name_arabic: "المسد", name_english: "Al-Masad", name_translation: "The Palm Fiber", verses: 5, revelation: "meccan" },
  { id: 112, name_arabic: "الإخلاص", name_english: "Al-Ikhlas", name_translation: "The Sincerity", verses: 4, revelation: "meccan" },
  { id: 113, name_arabic: "الفلق", name_english: "Al-Falaq", name_translation: "The Daybreak", verses: 5, revelation: "meccan" },
  { id: 114, name_arabic: "الناس", name_english: "An-Nas", name_translation: "Mankind", verses: 6, revelation: "meccan" },
];

export function QuranBrowser({ onSelectVerse }: QuranBrowserProps) {
  const [view, setView] = useState<'surahs' | 'verses'>('surahs');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedVerse, setCopiedVerse] = useState<string | null>(null);

  const filteredSurahs = surahData.filter(surah => 
    surah.name_arabic.includes(searchQuery) ||
    surah.name_english.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.name_translation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.id.toString() === searchQuery
  );

  const fetchVerses = useCallback(async (surahId: number, page: number = 1) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('quran-browser', {
        body: { action: 'get_surah', surah: surahId, page, per_page: 20 }
      });

      if (error) throw error;

      if (data?.success) {
        setVerses(data.verses);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching verses:', error);
      toast.error('Failed to load verses');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectSurah = (surah: Surah) => {
    setSelectedSurah(surah);
    setView('verses');
    fetchVerses(surah.id);
  };

  const handleBack = () => {
    setView('surahs');
    setSelectedSurah(null);
    setVerses([]);
    setPagination(null);
  };

  const handleAnalyzeVerse = (verse: Verse) => {
    onSelectVerse(verse.text_uthmani, verse.verse_key, verse.translation);
    toast.success(`Verse ${verse.verse_key} sent to analyzer`);
  };

  const handleCopyVerse = async (verse: Verse) => {
    const text = `${verse.text_uthmani}\n\n"${verse.translation}"\n— Quran ${verse.verse_key}`;
    await navigator.clipboard.writeText(text);
    setCopiedVerse(verse.verse_key);
    setTimeout(() => setCopiedVerse(null), 2000);
    toast.success('Verse copied!');
  };

  const handlePageChange = (page: number) => {
    if (selectedSurah) {
      fetchVerses(selectedSurah.id, page);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            {view === 'surahs' ? 'Browse the Quran' : selectedSurah?.name_english}
          </h2>
          <p className="text-sm text-muted-foreground">
            {view === 'surahs' 
              ? 'Select a surah to explore its verses'
              : `${selectedSurah?.name_arabic} • ${selectedSurah?.verses} verses • ${selectedSurah?.revelation === 'meccan' ? 'Meccan' : 'Medinan'}`
            }
          </p>
        </div>
        {view === 'verses' && (
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            All Surahs
          </Button>
        )}
      </div>

      {/* Surah List View */}
      {view === 'surahs' && (
        <>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search surahs by name or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Surah Grid */}
          <ScrollArea className="h-[500px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pr-4">
              {filteredSurahs.map((surah) => (
                <Card
                  key={surah.id}
                  className="p-4 cursor-pointer hover:bg-muted/50 transition-colors border-border group"
                  onClick={() => handleSelectSurah(surah)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">
                        {surah.id}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{surah.name_english}</h3>
                        <p className="text-xs text-muted-foreground">{surah.name_translation}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-arabic text-foreground/80">{surah.name_arabic}</span>
                      <p className="text-xs text-muted-foreground">{surah.verses} verses</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="outline" className="text-xs">
                      {surah.revelation === 'meccan' ? '🕋 Meccan' : '🕌 Medinan'}
                    </Badge>
                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </>
      )}

      {/* Verses View */}
      {view === 'verses' && selectedSurah && (
        <>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
            </div>
          ) : (
            <ScrollArea className="h-[500px]">
              <div className="space-y-4 pr-4">
                {verses.map((verse) => (
                  <Card key={verse.id} className="p-4 border-border">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-semibold shrink-0">
                        {verse.verse_number}
                      </div>
                      <div className="flex-1 min-w-0">
                        {/* Arabic Text */}
                        <p className="text-2xl font-arabic leading-loose text-foreground text-right mb-3" dir="rtl">
                          {verse.text_uthmani}
                        </p>
                        {/* Translation */}
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {verse.translation}
                        </p>
                        {/* Actions */}
                        <div className="flex items-center gap-2 mt-3">
                          <Button
                            size="sm"
                            onClick={() => handleAnalyzeVerse(verse)}
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                          >
                            <Sparkles className="w-3 h-3 mr-1.5" />
                            Analyze
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopyVerse(verse)}
                          >
                            {copiedVerse === verse.verse_key ? (
                              <><Check className="w-3 h-3 mr-1.5" /> Copied</>
                            ) : (
                              <><Copy className="w-3 h-3 mr-1.5" /> Copy</>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}

          {/* Pagination */}
          {pagination && pagination.total_pages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.current_page === 1}
                onClick={() => handlePageChange(pagination.current_page - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {pagination.current_page} of {pagination.total_pages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={!pagination.next_page}
                onClick={() => handlePageChange(pagination.current_page + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
