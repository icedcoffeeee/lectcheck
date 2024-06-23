<script lang="ts">
	import { page } from '$app/stores';
	import Navbar from '$components/Navbar.svelte';
</script>

<svelte:head>
	<title>LectCheck | {$page.data.lect.lectTag}</title>
	<meta name="description" content="Reviews of {$page.data.lect.name}" />
</svelte:head>

<Navbar />

<div class="h-full">
	<slot />
</div>
