<script lang="ts">
	import { page } from '$app/stores';
	import Navbar from '$components/Navbar.svelte';
</script>

<svelte:head>
	{#if $page.error}
		<title>LectCheck | Oops</title>
		<meta name="description" content="{$page.params.lectTag} not found" />
	{:else}
		<title>LectCheck | {$page.data.lect.lectTag}</title>
		<meta name="description" content="Reviews of {$page.data.lect.name}" />
	{/if}
</svelte:head>

<Navbar />

<div class="h-full">
	<slot />
</div>
