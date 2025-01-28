<script lang="ts">
	import { page } from '$app/state';
	import Navbar from '$components/Navbar.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	{#if page.error}
		<title>LectCheck | Oops</title>
		<meta name="description" content="{page.params.lectTag} not found" />
	{:else}
		<title>LectCheck | {page.data.lect.lectTag}</title>
		<meta name="description" content="Reviews of {page.data.lect.name}" />
	{/if}
</svelte:head>

<Navbar />

<div class="h-full">
	{@render children?.()}
</div>
