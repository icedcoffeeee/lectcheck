import { supabase } from "$lib/auth.js";
import type { Writable } from "svelte/store";

export async function load() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { session };
}

export type Session = Awaited<ReturnType<typeof load>>["session"];
export type SessionWritable = Writable<Session>;
