import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CheatSheetRequest {
  email: string;
}

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(identifier: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  
  // Clean up old entries
  for (const [key, value] of rateLimitMap.entries()) {
    if (value.resetAt < now) {
      rateLimitMap.delete(key);
    }
  }
  
  const record = rateLimitMap.get(identifier);
  
  if (!record || record.resetAt < now) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + windowMs });
    return true;
  }
  
  if (record.count >= maxRequests) {
    return false;
  }
  
  record.count++;
  return true;
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: CheatSheetRequest = await req.json();

    // Validate email format properly
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      console.error("Invalid email provided:", email);
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize email
    const sanitizedEmail = email.trim().toLowerCase();

    // Check email length (max 255 chars is standard)
    if (sanitizedEmail.length > 255) {
      return new Response(
        JSON.stringify({ error: "Email address too long" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Rate limit: 3 requests per hour per email
    if (!checkRateLimit(sanitizedEmail, 3, 60 * 60 * 1000)) {
      console.log(`Rate limit exceeded for email: ${sanitizedEmail}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Also rate limit by IP to prevent mass spamming
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (!checkRateLimit(`ip:${clientIP}`, 10, 60 * 60 * 1000)) {
      console.log(`IP rate limit exceeded: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests from this IP. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log("Sending cheat sheet to:", sanitizedEmail);

    // Get the PDF URL from your deployed site
    const pdfUrl = "https://quranicarabiclab.com/downloads/125-words-cheatsheet.pdf";

    const emailResponse = await resend.emails.send({
      from: "Quranic Arabic Lab <onboarding@resend.dev>",
      to: [sanitizedEmail],
      subject: "Your Free 125-Word Quranic Vocabulary Cheat Sheet 📖",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 10px;">Assalamu Alaikum! 🌙</h1>
          </div>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            Thank you for joining Quranic Arabic Lab! Your free cheat sheet is ready.
          </p>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            This PDF contains <strong>125 high-frequency Quranic words</strong> that cover approximately <strong>50% of the Qur'an's vocabulary</strong>. Print it, save it, and use it as your companion on your journey to understanding the Qur'an.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${pdfUrl}" 
               style="display: inline-block; background-color: #c9a961; color: white; text-decoration: none; padding: 14px 30px; border-radius: 8px; font-weight: 600; font-size: 16px;">
              Download Your Cheat Sheet
            </a>
          </div>
          
          <p style="font-size: 16px; margin-bottom: 20px;">
            Ready to take the next step? Visit <a href="https://quranicarabiclab.com" style="color: #c9a961;">Quranic Arabic Lab</a> to start your full learning journey with our structured, science-backed method.
          </p>
          
          <p style="font-size: 16px; margin-bottom: 10px;">
            May Allah bless your efforts to understand His words.
          </p>
          
          <p style="font-size: 16px; color: #666; margin-top: 30px;">
            — The Quranic Arabic Lab Team
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          
          <p style="font-size: 12px; color: #999; text-align: center;">
            You received this email because you signed up for the free cheat sheet at Quranic Arabic Lab.
          </p>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-cheatsheet function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email. Please try again." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
