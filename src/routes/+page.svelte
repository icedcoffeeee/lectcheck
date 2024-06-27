<script lang="ts">
	import PostCard from '$components/PostCard.svelte';
	import Searchbar from '$components/Searchbar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { posts } = data;
	const posts1 = posts.slice(undefined, 3);
	const posts2 = posts.slice(3, undefined);
	posts1.push(...posts1, ...posts1);
	posts2.push(...posts2, ...posts2);
</script>

<svelte:head>
	<title>LectCheck</title>
</svelte:head>

<div class="w-full min-h-[95lvh] flex flex-col justify-center items-center">
	<div class="w-full mb-20 horizon-mask overflow-x-hidden">
		<div class="marquee flex gap-2" style="animation-direction: reverse;">
			{#each posts1 as post}
				<PostCard showTag {post} />
			{/each}
		</div>
	</div>
	<h1
		class="font-bold bg-clip-text bg-gradient-to-tr from-sky-500 to-violet-500 text-3xl lg:text-5xl text-transparent drop-shadow-md"
	>
		LectCheck
	</h1>
	<p>Rate your UM lecturers</p>
	<Searchbar additionalClass="mt-4 lg:mt-10" />
	<div class="w-full mt-20 horizon-mask overflow-x-hidden">
		<div class="marquee flex gap-2">
			{#each posts2 as post}
				<PostCard showTag {post} />
			{/each}
		</div>
	</div>
</div>

<style lang="css">
	.marquee {
		animation-name: marquee;
		animation-duration: 30s;
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
			transform: translateX(calc(-14.5rem * 3));
		}
	}
	.horizon-mask {
		mask-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
	}
</style>
