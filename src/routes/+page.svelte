<script lang="ts">
	import PostCard from '$components/PostCard.svelte';
	import Searchbar from '$components/Searchbar.svelte';
	import Footer from '$components/Footer.svelte';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const { posts } = data;
	const posts1 = Array(9).fill(posts.slice(undefined, 4)).flat();
	const posts2 = Array(9).fill(posts.slice(4, undefined)).flat();
</script>

<svelte:head>
	<title>LectCheck</title>
</svelte:head>

<div class="w-full min-h-[95lvh] flex flex-col justify-center items-center">
	<div class="w-screen mb-20 horizon-mask overflow-x-hidden">
		<div class="marquee flex gap-2" style="animation-direction: reverse;">
			{#each posts1 as post}
				<PostCard showTag {post} />
			{/each}
		</div>
	</div>
	<h1>LectCheck</h1>
	<p>Rate your UM lecturers</p>
	<Searchbar additionalClass="mt-4 lg:mt-10" moreInfo />
	<div class="w-screen mt-20 horizon-mask overflow-x-hidden">
		<div class="marquee flex gap-2">
			{#each posts2 as post}
				<PostCard showTag {post} />
			{/each}
		</div>
	</div>
</div>

<Footer />

<style>
	@reference "../app.css"
	h1 {
		@apply font-bold bg-clip-text bg-linear-to-tr from-sky-500 to-violet-500 text-3xl lg:text-5xl text-transparent drop-shadow-md;
	}

	.marquee {
		animation-name: marquee;
		animation-duration: 40s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
		transform: translateX(0);
		will-change: transform;
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-14.5rem * 4));
		}
	}
</style>
