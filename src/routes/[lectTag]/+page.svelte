<script lang="ts">
	import { page } from '$app/state';
	import type { User } from '$lib';
	import type { PageData } from './$types';

	import PostCard from '$components/PostCard.svelte';
	import RatingBoard from '$components/RatingBoard.svelte';
	import Alert from '$components/icons/Alert.svelte';
	import AddPostCard from '$components/AddPostCard.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const { lect, posts } = data;
	const user: User | null = page.data.user;

	const postsWithContent = posts.filter(
		(post) => post.content?.length || post.authorId === user?.id
	);

	const numOfPosts = posts.length;
	const avgOfRatings = $state([0, 0, 0, 0]);
	posts.forEach((post) => {
		post.ratings.forEach(function (rating, i) {
			avgOfRatings[i] += rating / numOfPosts;
		});
	});

	let addPostError = $state(false);
</script>

<div class="flex flex-col md:flex-row md:items-center md:justify-between md:gap-2">
	<div class="flex gap-4 mb-4">
		<img src={lect.imgSrc} alt={lect.name} class="h-[5.5rem] md:h-[6.5rem] rounded-sm" />
		<div class="flex flex-col">
			<h1 class=" font-bold md:text-2xl text-primary">
				{lect.name}
			</h1>
			<p class="text-sm">{lect.department}</p>
			<p class="text-sm">{lect.faculty}</p>
		</div>
	</div>

	<div>
		<h3 class="text-lg">{numOfPosts} Review{numOfPosts !== 1 ? 's' : ''}</h3>
		<RatingBoard ratings={avgOfRatings} additionalClass="mb-4" />
	</div>
</div>

<div class="w-full grid grid-cols-1 md:grid-cols-3 gap-2">
	<AddPostCard bind:addPostError />
	{#each postsWithContent as post}
		<PostCard {post} />
	{/each}
</div>

<div
	class="absolute bottom-2 right-2 rounded-sm bg-red-500 text-white p-3 flex gap-2 items-center opacity-0 transition-[opacity]"
	class:opacity-100={addPostError}
>
	<Alert />
	You must be logged in.
</div>
