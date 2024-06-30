<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { page } from '$app/stores';
	import type { User } from '$lib';
	import StarRating from './StarRating.svelte';
	import Add from './icons/Add.svelte';

	export let addPostError = false;

	const user: User | null = $page.data.user;
	let loading = false;

	function toggleModal() {
		if (!user) {
			addPostError = true;
			setTimeout(() => (addPostError = false), 3000);
			return;
		}
		const modal = document.getElementById('addPost') as HTMLDialogElement;
		modal.showModal();
	}
</script>

<button
	on:click={toggleModal}
	class="min-w-56 h-full min-h-16 border border-dashed border-primary rounded flex justify-center items-center"
>
	<Add class="text-2xl text-primary" />
</button>

<dialog id="addPost" class="modal p-4">
	<form
		action="/[lectTag]?/submitReview"
		method="post"
		use:enhance={function () {
			loading = true;
			return async function ({ result, update }) {
				await applyAction(result);
				if (result.type === 'failure') {
					await update({ reset: false, invalidateAll: false });
				} else {
					location.reload();
				}
				loading = false;
			};
		}}
		class="modal-box w-full max-w-96 p-4 rounded bg-white text-sm flex flex-col gap-2 justify-between"
	>
		<h3 class="text-lg text-primary">Add Review</h3>
		<input type="hidden" name="lectTag" value={$page.params.lectTag} />
		<label class="flex justify-between">
			<span class="font-bold">Class Code</span>
			<input name="classCode" class="w-32 border-2 p-1" />
		</label>
		<label class="font-bold" for="content">Comment</label>
		<textarea
			name="content"
			placeholder="Add a comment (optional, max 200)"
			class="border-2 mb-4 p-1"
		/>
		<StarRating name="teaching" />
		<StarRating name="assessment" />
		<StarRating name="guidance" />
		<StarRating name="reach" />
		<button
			disabled={loading}
			class:opacity-80={loading}
			class="bg-accent text-white rounded py-1 mt-3"
		>
			Submit
		</button>
		<div class="flex flex-col gap-1 text-red-500">
			{#if $page.form}
				{#each $page.form.errors as error}
					<span>{error}</span>
				{/each}
			{/if}
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
