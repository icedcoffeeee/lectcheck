import type { LayoutServerLoadEvent } from "./$types";

export async function load({ locals }: LayoutServerLoadEvent) {
  const session = await locals.auth();
  if (session) return { user: session.user };
  return {};
}
