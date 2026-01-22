import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Surah metadata (all 114 surahs)
const surahData = [
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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, surah, page = 1, per_page = 20 } = await req.json();
    
    // Return list of all surahs
    if (action === 'list_surahs') {
      return new Response(
        JSON.stringify({ success: true, surahs: surahData }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Get verses for a specific surah
    if (action === 'get_surah' && surah) {
      const surahInfo = surahData.find(s => s.id === surah);
      if (!surahInfo) {
        return new Response(
          JSON.stringify({ success: false, error: 'Surah not found' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
        );
      }

      // Fetch verses with words AND translations from Quran.com API
      // Translation 131 = Dr. Mustafa Khattab (Clear Quran), 20 = Saheeh International
      const versesResponse = await fetch(
        `https://api.quran.com/api/v4/verses/by_chapter/${surah}?words=true&word_fields=text_uthmani,text&translations=20&per_page=${per_page}&page=${page}`,
        { headers: { 'Accept': 'application/json' } }
      );

      if (!versesResponse.ok) {
        throw new Error(`Quran API returned ${versesResponse.status}`);
      }

      const versesData = await versesResponse.json();
      console.log('Sample verse translations:', JSON.stringify(versesData.verses?.[0]?.translations));
      
      // Format verses with translations
      const verses = versesData.verses.map((verse: any) => ({
        id: verse.id,
        verse_key: verse.verse_key,
        verse_number: parseInt(verse.verse_key.split(':')[1]),
        text_uthmani: verse.words
          .filter((w: any) => w.char_type_name === 'word')
          .map((w: any) => w.text_uthmani || w.text)
          .join(' '),
        translation: verse.translations?.[0]?.text?.replace(/<[^>]*>/g, '') || '',
        words: verse.words.filter((w: any) => w.char_type_name === 'word').map((w: any) => ({
          id: w.id,
          position: w.position,
          text: w.text_uthmani || w.text,
        }))
      }));

      return new Response(
        JSON.stringify({ 
          success: true, 
          surah: surahInfo,
          verses,
          pagination: versesData.pagination
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get a specific verse with full word details
    if (action === 'get_verse' && surah) {
      const { ayah } = await req.json();
      const verseKey = `${surah}:${ayah}`;
      
      const response = await fetch(
        `https://api.quran.com/api/v4/verses/by_key/${verseKey}?words=true&word_fields=text_uthmani,text,translation,transliteration&translations=131`,
        { headers: { 'Accept': 'application/json' } }
      );

      if (!response.ok) {
        throw new Error(`Quran API returned ${response.status}`);
      }

      const data = await response.json();
      const verse = data.verse;
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          verse: {
            id: verse.id,
            verse_key: verse.verse_key,
            text_uthmani: verse.words
              .filter((w: any) => w.char_type_name === 'word')
              .map((w: any) => w.text_uthmani || w.text)
              .join(' '),
            translation: verse.translations?.[0]?.text || '',
            words: verse.words.filter((w: any) => w.char_type_name === 'word').map((w: any) => ({
              id: w.id,
              position: w.position,
              text: w.text_uthmani || w.text,
              translation: w.translation?.text || '',
              transliteration: w.transliteration?.text || ''
            }))
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Invalid action' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
    
  } catch (error: unknown) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
