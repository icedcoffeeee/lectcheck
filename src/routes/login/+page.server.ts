import { supabase } from "$lib/auth.js";
import { redirect } from "@sveltejs/kit";

export async function load() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) redirect(301, "/");

  return { session };
}

export const actions = {
  login: async ({ request }) => {
    const form = await request.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) return { error: authError.message };
    redirect(301, "/");
  },
  register: async ({ request }) => {
    const form = await request.formData();
    const email = form.get("email") as string;
    const password = form.get("password") as string;

    const {
      data: { session },
      error: authError,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) return { error: authError.message };
    else if (!session)
      return { message: "Please check your email for verification!" };
    redirect(301, "/");
  },
  logout: async () => {
    const { error: authError } = await supabase.auth.signOut();

    if (authError) return { error: authError.message };
    redirect(301, "/");
  },
};
