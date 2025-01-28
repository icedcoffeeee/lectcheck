<script lang="ts">
	interface Props {
		name: string;
		value?: number;
		[key: string]: any
	}

	let { name, value = 0, ...rest }: Props = $props();
</script>

<div class="flex justify-between items-center">
	<label class="font-bold" for={name}>{name[0].toUpperCase().concat(name.slice(1))}</label>
	<div class="rating rating-sm">
		{#each Array(6) as _, i}
			<input
				type="radio"
				{name}
				value={i}
				class={i !== 0 ? 'mask mask-star-2 bg-orange-400' : 'rating-hidden'}
				checked={value === i}
				{...rest}
			/>
		{/each}
	</div>
</div>
