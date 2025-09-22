import { corsHeaders } from "./cors.ts";

export const jsonResponse = (data: any, status = 200) =>
  new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    status: status,
  });
