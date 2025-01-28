<script lang="ts">
	import Searchbar from '$components/Searchbar.svelte';
	let homePressed = $state(false);
</script>

<nav class="mt-2 mb-4 flex justify-between gap-2">
	<a
		href="/"
		class="px-0.5 bg-primary rounded flex items-center aspect-square"
		onclick={() => (homePressed = true)}
	>
		<label class="swap swap-rotate {homePressed ? 'swap-active' : ''}">
			<input type="checkbox" />
			<img src="/icon.svg" alt="LectCheck" class="swap-off w-5" />
			<span class="swap-on loading loading-spinner loading-sm text-white"></span>
		</label>
	</a>
	<Searchbar additionalInputClass="w-full md:w-full" additionalClass="w-full md:w-auto" />
</nav>
