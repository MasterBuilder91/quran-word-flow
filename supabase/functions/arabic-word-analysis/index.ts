import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { words } = await req.json();
    
    if (!words || !Array.isArray(words) || words.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Please provide an array of Arabic words' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build prompt for word analysis
    const wordsText = words.join('\n');
    
    const systemPrompt = `You are an expert Arabic linguist specializing in Quranic Arabic morphology and translation.

For each Arabic word provided, analyze and return a JSON array with this exact structure for each word:

{
  "word": "the original word",
  "translation": "primary English meaning",
  "transliteration": "romanized pronunciation",
  "partOfSpeech": "verb" | "noun" | "particle",
  "root": "three letter root separated by spaces like 'ق و ل'" (if applicable),
  "details": {
    // For particles:
    "particleType": "preposition" | "conjunction" | "interrogative" | "negation" | "conditional" | "vocative" | "emphasis" | "exception" | "other"
    
    // For verbs:
    "tense": "past" | "present" | "imperative" | "jussive" | "subjunctive",
    "form": "I" through "X",
    "voice": "active" | "passive",
    "person": "1st" | "2nd" | "3rd",
    "gender": "masculine" | "feminine",
    "number": "singular" | "dual" | "plural"
    
    // For nouns:
    "gender": "masculine" | "feminine",
    "number": "singular" | "dual" | "plural",
    "definiteness": "definite" | "indefinite",
    "case": "nominative" | "accusative" | "genitive",
    "nounType": "common" | "proper" | "pronoun" | "demonstrative" | "relative" | "active-participle" | "passive-participle" | "verbal-noun",
    "morphability": "triptote" | "diptote" | "indeclinable"
  },
  "notes": "any additional grammatical notes"
}

IMPORTANT RULES:
- مِنْ (min) is a PARTICLE (preposition meaning "from")
- مَنْ (man) can be an interrogative particle ("who?") or relative pronoun ("he who")
- ما can be negation particle, interrogative, or relative depending on context
- Always identify the exact part of speech correctly
- Provide accurate meanings - multiple meanings if appropriate
- For verbs, always include tense, form, voice, person, gender, number
- For nouns, always include gender, number, definiteness, case, morphability

Return ONLY valid JSON array, no other text.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Analyze these Arabic words:\n${wordsText}` }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "API credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      throw new Error("No response from AI");
    }

    console.log("AI Response:", content);

    // Parse the JSON response - handle markdown code blocks
    let analysisResult;
    try {
      // Remove markdown code blocks if present
      let jsonContent = content.trim();
      if (jsonContent.startsWith('```json')) {
        jsonContent = jsonContent.slice(7);
      } else if (jsonContent.startsWith('```')) {
        jsonContent = jsonContent.slice(3);
      }
      if (jsonContent.endsWith('```')) {
        jsonContent = jsonContent.slice(0, -3);
      }
      jsonContent = jsonContent.trim();
      
      analysisResult = JSON.parse(jsonContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      // Return raw content for debugging
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Failed to parse AI response",
          rawContent: content 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, analysis: analysisResult }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
