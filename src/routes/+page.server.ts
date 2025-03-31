import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { signIn, signOut } from "../auth";

export const actions: Actions = {
  async tag({ request }) {
    const { tag } = Object.fromEntries(await request.formData());
    redirect(302, tag.toString());
  },
  login: signIn,
  logout: signOut,
};
