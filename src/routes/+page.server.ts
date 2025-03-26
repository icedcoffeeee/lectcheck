import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  async default({ request }) {
    const { tag } = Object.fromEntries(await request.formData());
    redirect(302, tag.toString());
  },
};
