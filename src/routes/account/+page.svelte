<script lang="ts">
	import { page } from '$app/state';
	import Navbar from '$components/Navbar.svelte';
	import PostCard from '$components/PostCard.svelte';
	import PostCardSkeleton from '$components/PostCardSkeleton.svelte';
	import type { User } from '$lib';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const user: User = page.data.user;
	const { postsPromise, likedPostsPromise } = data;
	const numPostsPromise = postsPromise.then((posts) => posts.length);
	const numLikesPromise = postsPromise.then((posts) =>
		posts.map((post) => post.likeIds.length).reduce((likes, like) => likes + like)
	);
	const numLikedPromise = likedPostsPromise.then((likedPosts) => likedPosts.length);

	let postsScreen = $state(true);
	const pressedTabClass = 'bg-red-500 text-white';
	const unpressedTabClass = 'border border-red-500 bg-white text-red-500';

	let signingOut = $state(false);
</script>

<svelte:head>
	<title>LectCheck | My account</title>
</svelte:head>

<Navbar />

<div class="w-full flex gap-2 flex-col-reverse md:flex-row">
	<div class="md:w-3/4">
		<div class="h-14 flex gap-2 items-center">
			<button
				onclick={() => (postsScreen = true)}
				class="h-fit px-2 rounded {postsScreen ? pressedTabClass : unpressedTabClass}">Posts</button
			>
			<button
				onclick={() => (postsScreen = false)}
				class="h-fit px-2 rounded {!postsScreen ? pressedTabClass : unpressedTabClass}"
			>
				Liked
			</button>
		</div>
		<div class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-2">
			{#if postsScreen}
				{#await postsPromise}
					<PostCardSkeleton />
				{:then posts}
					{#each posts as post}
						<PostCard {post} showTag />
					{/each}
				{/await}
			{:else}
				{#await likedPostsPromise}
					<PostCardSkeleton />
				{:then likedPosts}
					{#each likedPosts as likedPost}
						<PostCard post={likedPost} showTag />
					{/each}
				{/await}
			{/if}
		</div>
	</div>

	<div class="md:w-1/4">
		<div class="flex flex-col gap-3 items-center bg-white rounded shadow-md p-2 mt-14 pt-12">
			<img
				src={user.imageSrc}
				alt={user.email}
				class="w-20 rounded-full border-8 border-white absolute -translate-y-[5.5rem]"
			/>
			<span>{user.email}</span>
			<div class="w-full flex gap-1">
				<div class="w-full flex flex-col items-center">
					{#await numPostsPromise}
						<span class="w-4 h-4 skeleton rounded"></span>
					{:then numPosts}
						<span>{numPosts}</span>
					{/await}
					<p>Posts</p>
				</div>
				<div class="w-full flex flex-col items-center">
					{#await numLikesPromise}
						<span class="w-4 h-4 skeleton rounded"></span>
					{:then numLikes}
						<span>{numLikes}</span>
					{/await}
					<p>Likes</p>
				</div>
				<div class="w-full flex flex-col items-center">
					{#await numLikedPromise}
						<span class="w-4 h-4 skeleton rounded"></span>
					{:then numLiked}
						<span>{numLiked}</span>
					{/await}
					<p>Liked</p>
				</div>
			</div>
			<form method="post">
				<button
					onclick={() => (signingOut = true)}
					class="my-2 px-2 py-1 rounded bg-accent text-white"
					class:opacity-80={signingOut}
				>
					Sign Out
				</button>
				<!-- disabled={signingOut} -->
			</form>
		</div>
	</div>
</div>
