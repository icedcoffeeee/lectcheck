import { SUPABASE_ANON_KEY, SUPABASE_URL } from "$env/static/private";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Session = Awaited<
  ReturnType<typeof supabase.auth.getSession>
>["data"]["session"];
