import type { LayoutServerLoadEvent } from './$types';

export function load({ locals: { user } }: LayoutServerLoadEvent) {
	return { user };
}
