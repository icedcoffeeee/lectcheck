import { supabase } from "$lib/auth.js";
import { redirect } from "@sveltejs/kit";

export async function load() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect(301, "/");

  return { session };
}
