// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import { jsonResponse } from "../_shared/jsonResponse.ts";
import { craftRequestBody } from "./utils.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) return jsonResponse({ message: "Missing OPENAI_API_KEY" }, 500);

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!SUPABASE_URL || !SERVICE_ROLE) {
    return jsonResponse(
      { message: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY" },
      500,
    );
  }

  const audience = await req.json();

  const body = craftRequestBody(audience);

  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return jsonResponse({ message: `OpenAI error: ${await res.text()}` }, 500);
  }

  const data = await res.json();

  const text =
    data?.output_text ??
    data?.choices?.[0]?.message?.content ??
    data?.output?.[0]?.content?.[0]?.text ??
    "{}";

  let concept;
  try {
    concept = JSON.parse(text);
  } catch {
    concept = { name: "Untitled Concept", description: String(text) };
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
  const { data: conceptCreated, error } = await admin
    .from("concepts")
    .insert([
      {
        ...concept,
        audience_id: audience.id,
        parent_id: audience?.conceptToRemix?.id,
      },
    ])
    .single()
    .select();

  if (error) {
    return jsonResponse({ message: error.message }, 500);
  }

  return jsonResponse(conceptCreated);
});
