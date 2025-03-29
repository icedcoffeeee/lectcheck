import { auth } from "$lib/auth";
import type { ServerLoadEvent } from "@sveltejs/kit";

export async function load({ request: { headers } }: ServerLoadEvent) {
  const data = await auth.api.getSession({ headers });
  console.log(data);
  if (data) return { user: data.user };
  return {};
}
