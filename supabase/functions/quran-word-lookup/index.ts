import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuranWord {
  id: number;
  position: number;
  text_uthmani: string;
  text: string;
  translation: {
    text: string;
    language_name: string;
  };
  transliteration: {
    text: string;
    language_name: string;
  };
  char_type_name: string;
  audio_url?: string;
}

interface VerseResponse {
  verse: {
    id: number;
    verse_key: string;
    words: QuranWord[];
  };
}

interface ChapterVersesResponse {
  verses: Array<{
    id: number;
    verse_key: string;
    words: QuranWord[];
  }>;
  pagination: {
    per_page: number;
    current_page: number;
    next_page: number | null;
    total_pages: number;
    total_records: number;
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { surah, ayah, text } = await req.json();
    
    // If specific verse is provided, fetch that verse
    if (surah && ayah) {
      const verseKey = `${surah}:${ayah}`;
      const response = await fetch(
        `https://api.quran.com/api/v4/verses/by_key/${verseKey}?words=true&word_fields=text_uthmani,text,translation,transliteration&translations=131`,
        {
          headers: {
            'Accept': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`Quran API returned ${response.status}`);
      }
      
      const data: VerseResponse = await response.json();
      
      // Filter out verse end markers
      const words = data.verse.words.filter(w => w.char_type_name === 'word');
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          verse_key: data.verse.verse_key,
          words 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // If text is provided, try to match it to verses
    if (text) {
      // Normalize the input text
      const normalizedInput = normalizeArabic(text);
      
      // Search through first few surahs to find matching verses
      const matchedWords: Array<{
        word: string;
        translation: string;
        transliteration: string;
        position: number;
        verse_key?: string;
      }> = [];
      
      // Try to find the text in Quran - search through common surahs first
      const surahsToSearch = [1, 2, 3, 4, 36, 55, 67, 112, 113, 114];
      
      for (const surahNum of surahsToSearch) {
        try {
          const response = await fetch(
            `https://api.quran.com/api/v4/verses/by_chapter/${surahNum}?words=true&word_fields=text_uthmani,text,translation,transliteration&per_page=50`,
            {
              headers: { 'Accept': 'application/json' },
            }
          );
          
          if (!response.ok) continue;
          
          const data: ChapterVersesResponse = await response.json();
          
          // Check each verse for matching text
          for (const verse of data.verses) {
            const verseText = verse.words
              .filter(w => w.char_type_name === 'word')
              .map(w => normalizeArabic(w.text_uthmani || w.text))
              .join(' ');
            
            if (normalizedInput.includes(verseText) || verseText.includes(normalizedInput)) {
              // Found matching verse - return its words
              const words = verse.words.filter(w => w.char_type_name === 'word');
              return new Response(
                JSON.stringify({ 
                  success: true, 
                  verse_key: verse.verse_key,
                  words,
                  matched: true
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
              );
            }
          }
        } catch (e) {
          console.error(`Error searching surah ${surahNum}:`, e);
          continue;
        }
      }
      
      // If no exact match found, return empty but successful response
      return new Response(
        JSON.stringify({ 
          success: true, 
          words: [],
          matched: false,
          message: 'No exact verse match found. Try entering a complete verse or specify surah:ayah.'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ success: false, error: 'Please provide surah/ayah or text to search' }),
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

// Normalize Arabic text for comparison (remove diacritics)
function normalizeArabic(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // Remove tashkeel
    .replace(/\u0671/g, '\u0627') // Replace alef wasla with alef
    .replace(/ٱ/g, 'ا')
    .replace(/\s+/g, ' ')
    .trim();
}
