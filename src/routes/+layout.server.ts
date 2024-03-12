// @ts-expect-error has no typees
import hash from "string-hash";
import { supabase } from "$lib/auth.js";
import type { Writable } from "svelte/store";

export async function load() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { session, userUID: hash(session?.user.email ?? "") };
}

export type Session = Awaited<ReturnType<typeof load>>["session"];
export type SessionWritable = Writable<Session>;
