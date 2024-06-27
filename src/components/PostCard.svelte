<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { Post, User } from '$lib';
	import { timeSince } from '$lib/utils/time';

	import RatingBoard from './RatingBoard.svelte';
	import Alert from './icons/Alert.svelte';
	import Dislike from './icons/Dislike.svelte';
	import Like from './icons/Like.svelte';
	import Delete from './icons/Delete.svelte';

	export let post: Post;
	export let showTag = false;
	export let additionalClass = '';

	const user: User | null = $page.data.user;
	const { ratings, likeIds, dislikeIds, content } = post;
	const avgRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
	let totalLikes = likeIds.length - dislikeIds.length;

	let liked = 0;
	let likeError = false;
	let dislikeError = false;

	if (user) {
		if (likeIds.includes(user.id)) {
			liked = 1;
			totalLikes -= 1;
		}
		if (dislikeIds.includes(user.id)) {
			liked = -1;
			totalLikes -= -1;
		}
	}

	function toggleModal() {
		const modal = document.getElementById(post.id.toString()) as HTMLDialogElement;
		modal.showModal();
	}
	function like() {
		if (!user) {
			likeError = true;
			setTimeout(() => (likeError = false), 3000);
			return;
		}
		if (liked < 1) liked = 1;
		else liked = 0;
	}
	function dislike() {
		if (!user) {
			dislikeError = true;
			setTimeout(() => (dislikeError = false), 3000);
			return;
		}
		if (liked > -1) liked = -1;
		else liked = 0;
	}
</script>

<button
	on:click={toggleModal}
	class="min-w-56 p-2 rounded bg-white text-sm text-left flex
  flex-col gap-2 justify-between shadow-md {additionalClass}"
>
	<p class="line-clamp-3 {!content ? 'opacity-80' : ''}">{content ? content : 'No Comment'}</p>
	<div class="w-full flex justify-between">
		<span class="flex items-center gap-1">
			<div class="w-3 h-3 mask mask-star-2 bg-yellow-500" />
			{Math.round(avgRating * 100) / 100} / 5
		</span>
		{#if showTag}
			<p class="font-bold">{post.lectTag}</p>
		{:else}
			<p>{timeSince(post.createdAt ?? '')}</p>
		{/if}
	</div>
</button>

<dialog id={post.id.toString()} class="modal p-4">
	<div
		class="modal-box w-full max-w-96 p-2 rounded bg-white text-sm flex flex-col gap-4 justify-between"
	>
		<p class={!content ? 'opacity-80' : ''}>{content ? content : 'No Comment'}</p>
		<RatingBoard ratings={post.ratings} />
		<div class="flex justify-between">
			<div class="flex gap-4">
				<span class="bg-accent text-white rounded px-2">{post.classCode}</span>
				<form
					use:enhance={function ({ action }) {
						if (action.search === '?/like') return like();
						if (action.search === '?/dislike') return dislike();
						return async function ({ action, update }) {
							if (action.search === '?/delete') return location.reload();
							update();
						};
					}}
					method="post"
					class="flex gap-1"
				>
					<input type="hidden" name="postId" value={post.id} />
					<button formaction="/[lectTag]?/like" class="text-primary">
						<Like liked={liked > 0} />
					</button>
					<span class="w-3 flex justify-center">{totalLikes + liked}</span>
					<button formaction="/[lectTag]?/dislike" class="text-primary">
						<Dislike disliked={liked < 0} />
					</button>
					{#if post.authorId === user?.id}
						<button formaction="/[lectTag]?/delete" class="text-red-500">
							<Delete />
						</button>
					{/if}
				</form>
			</div>
			<span>{timeSince(post.createdAt ?? '')}</span>
		</div>
	</div>
	<div
		class="absolute bottom-2 right-2 rounded bg-red-500 text-white p-3 flex gap-2 items-center opacity-0 transition-[opacity]"
		class:opacity-100={likeError || dislikeError}
	>
		<Alert />
		You must be logged in.
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
