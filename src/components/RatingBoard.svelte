<script lang="ts">
	import { readable } from 'svelte/store';

	export const runes_to_store = (cb: () => string[]) =>
		readable(cb(), (set) =>
			$effect.root(() => {
				$effect.pre(() => {
					set(cb());
				});
			})
		);

	interface Props {
		ratings: number[];
		shortCategory?: boolean;
		additionalClass?: string;
	}

	let { ratings, shortCategory = false, additionalClass = '' }: Props = $props();

	let categories = runes_to_store(() => ['Teaching', 'Assessment', 'Guidance', 'Reach']);
	if (shortCategory) categories = runes_to_store(() => $categories.map((c) => c[0]));
</script>

<div class="max-w-96 min-w-72 text-xs flex flex-col {additionalClass}">
	{#each ratings as rating, i}
		<div class="flex items-center gap-2">
			<span class={`${shortCategory ? 'w-[3%]' : 'w-[30%] md:w-[33%]'}`}>{$categories[i]}</span>
			<progress class="progress progress-primary w-[100%]" value={rating} max="5"></progress>
			<span class="w-[6%] text-right">{rating.toPrecision(2)}</span>
		</div>
	{/each}
</div>
