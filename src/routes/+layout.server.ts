import { supabase } from "$lib/auth.js";

export async function load() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { session };
}
