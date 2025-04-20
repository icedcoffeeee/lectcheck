import { auth } from "@/lib/auth";
import type { LayoutServerLoadEvent } from "./$types";

export async function load({ request: { headers } }: LayoutServerLoadEvent) {
  const data = await auth.api.getSession({ headers });
  if (data && data.session) return { user: data.user };
  return {};
}
