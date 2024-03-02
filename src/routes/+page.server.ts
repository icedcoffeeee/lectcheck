import { redirect } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    const tag = form.get("tag") as string;

    if (!tag) return;

    redirect(303, tag.toLowerCase().replaceAll(/[.\s]/g, "-"));
  },
};
