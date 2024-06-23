<script lang="ts">
	export let ratings: number[];
	export let shortCategory = false;
	export let additionalClass = '';

	let categories = ['Teaching', 'Assessment', 'Guidance', 'Reach'];
	if (shortCategory) categories = categories.map((c) => c[0]);
</script>

<div class="max-w-96 min-w-72 text-xs flex flex-col {additionalClass}">
	{#each ratings as rating, i}
		<div class="flex items-center gap-2">
			<span class={`${shortCategory ? 'w-[3%]' : 'w-[30%] md:w-[33%]'}`}>{categories[i]}</span>
			<progress class="progress progress-primary w-[100%]" value={rating} max="5" />
			<span class="w-[6%] text-right">{rating.toPrecision(2)}</span>
		</div>
	{/each}
</div>
