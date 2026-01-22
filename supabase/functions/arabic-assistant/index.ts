import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, data, messages } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Comprehensive system prompt for Arabic learning
    const systemPrompt = `You are an expert Arabic teacher and Quranic linguist. You help students learn Arabic, especially Quranic Arabic.

YOUR CAPABILITIES:
1. **Word Analysis**: Break down any Arabic word with complete morphology (root, pattern, part of speech, gender, number, case, definiteness, verb tense/form/voice)
2. **Verse Lookup**: When given a reference like "2:255" or "Al-Baqarah 255", provide the Arabic text, word-by-word breakdown, and translation
3. **Root Exploration**: Explain Arabic roots and show all related words from that root
4. **Grammar Explanations**: Explain Arabic grammar concepts clearly with examples
5. **Conjugation**: Show complete verb conjugation tables
6. **Translation**: Translate Arabic to English and explain nuances
7. **Learning Tips**: Provide mnemonics and learning strategies

FORMATTING RULES:
- Always show Arabic text in its original form
- Provide transliteration for all Arabic
- Use clear headings and bullet points
- When analyzing words, use this format:
  • Arabic: [word]
  • Transliteration: [romanized]
  • Meaning: [translation]
  • Part of Speech: verb/noun/particle
  • Root: [3-letter root if applicable]
  • Details: [gender, number, case, etc.]

CRITICAL ACCURACY RULES:
- مِنْ (min) = preposition meaning "from" (PARTICLE)
- مَنْ (man) = "who" interrogative or relative (PARTICLE/PRONOUN)
- ما = negation/interrogative/relative depending on context
- الـ = definite article "the"
- وَ/فَ = conjunctions "and"/"so"
- Always distinguish between similar-looking words
- Identify attached pronouns (ه، ها، هم، كم، نا، etc.)
- Recognize prefixes (سَـ، لَـ، بِـ) and suffixes

When users ask general questions, provide helpful, educational responses.
When users paste Arabic text, automatically analyze it word-by-word.
When users ask about specific verses, provide comprehensive breakdowns.

Be encouraging, patient, and thorough. You are helping people connect with the Quran through understanding its language.

IMPORTANT: For multi-word analysis, return structured data when requested.`;

    let userMessage = '';
    let conversationHistory: Message[] = [];

    // Handle different action types
    switch (action) {
      case 'analyze':
        // Word-by-word analysis with structured output
        const words = data.words || [];
        userMessage = `Analyze these Arabic words and return a JSON array. For each word provide: word, translation, transliteration, partOfSpeech (verb/noun/particle), root, and details object with relevant grammatical info.

Words to analyze:
${words.join('\n')}

Return ONLY valid JSON array, no markdown, no explanation.`;
        break;
        
      case 'verse':
        // Verse lookup
        const reference = data.reference || '';
        userMessage = `Look up Quran verse ${reference}. Provide:
1. The full Arabic text
2. Word-by-word breakdown with meanings
3. Full translation
4. Key grammatical points
5. Notable vocabulary to learn`;
        break;
        
      case 'root':
        // Root exploration
        const root = data.root || '';
        userMessage = `Explore the Arabic root "${root}". Explain:
1. The core meaning of this root
2. Common words derived from it (with meanings)
3. Quranic words from this root
4. Verb forms using this root
5. Memory tips for this root family`;
        break;
        
      case 'conjugate':
        // Verb conjugation
        const verb = data.verb || '';
        userMessage = `Conjugate the Arabic verb "${verb}". Show:
1. What form this verb is (I-X)
2. Root letters
3. Complete past tense conjugation table
4. Complete present tense conjugation table
5. Command form
6. Verbal noun (masdar)`;
        break;
        
      case 'grammar':
        // Grammar explanation
        const topic = data.topic || '';
        userMessage = `Explain this Arabic grammar topic: "${topic}". Include:
1. Clear explanation
2. Rules and patterns
3. Examples from Quran
4. Common mistakes to avoid
5. Practice tips`;
        break;
        
      case 'chat':
        // Free-form chat with conversation history
        conversationHistory = messages || [];
        userMessage = data.message || '';
        break;
        
      default:
        // Default to chat mode
        userMessage = data.message || data.text || JSON.stringify(data);
    }

    // Build messages array
    const apiMessages: Message[] = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    // For structured analysis, use tool calling
    if (action === 'analyze') {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: apiMessages,
          tools: [
            {
              type: "function",
              function: {
                name: "analyze_arabic_words",
                description: "Return structured analysis of Arabic words",
                parameters: {
                  type: "object",
                  properties: {
                    analysis: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          word: { type: "string", description: "Original Arabic word" },
                          translation: { type: "string", description: "English meaning" },
                          transliteration: { type: "string", description: "Romanized pronunciation" },
                          partOfSpeech: { type: "string", enum: ["verb", "noun", "particle"] },
                          root: { type: "string", description: "Three-letter root" },
                          details: {
                            type: "object",
                            properties: {
                              particleType: { type: "string" },
                              tense: { type: "string" },
                              form: { type: "string" },
                              voice: { type: "string" },
                              person: { type: "string" },
                              gender: { type: "string" },
                              number: { type: "string" },
                              definiteness: { type: "string" },
                              case: { type: "string" },
                              nounType: { type: "string" },
                              morphability: { type: "string" }
                            }
                          },
                          notes: { type: "string" }
                        },
                        required: ["word", "translation", "transliteration", "partOfSpeech"]
                      }
                    }
                  },
                  required: ["analysis"]
                }
              }
            }
          ],
          tool_choice: { type: "function", function: { name: "analyze_arabic_words" } }
        }),
      });

      if (!response.ok) {
        const status = response.status;
        if (status === 429) {
          return new Response(
            JSON.stringify({ success: false, error: "Rate limit exceeded. Please try again in a moment." }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        if (status === 402) {
          return new Response(
            JSON.stringify({ success: false, error: "API credits exhausted." }),
            { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        throw new Error(`AI gateway error: ${status}`);
      }

      const responseData = await response.json();
      const toolCall = responseData.choices?.[0]?.message?.tool_calls?.[0];
      
      if (toolCall && toolCall.function?.arguments) {
        try {
          const parsed = JSON.parse(toolCall.function.arguments);
          return new Response(
            JSON.stringify({ success: true, analysis: parsed.analysis }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        } catch (e) {
          console.error("Failed to parse tool response:", e);
        }
      }
      
      // Fallback to content parsing
      const content = responseData.choices?.[0]?.message?.content;
      if (content) {
        return new Response(
          JSON.stringify({ success: true, content }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error("No valid response from AI");
    }

    // For all other actions, stream the response
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: apiMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(
          JSON.stringify({ success: false, error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (status === 402) {
        return new Response(
          JSON.stringify({ success: false, error: "API credits exhausted." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error(`AI gateway error: ${status}`);
    }

    // Return the stream
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (error: unknown) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
