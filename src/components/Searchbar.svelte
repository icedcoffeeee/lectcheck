<script lang="ts">
	import { page } from '$app/state';
	import type { User } from '$lib';
	import Account from './icons/Account.svelte';
	import Search from './icons/Search.svelte';

	interface Props {
		additionalClass?: string;
		additionalInputClass?: string;
		moreInfo?: boolean;
	}

	let { additionalClass = '', additionalInputClass = '', moreInfo = false }: Props = $props();

	const user: User | null = page.data.user;
	let searchPressed = $state(false);
	let accountPressed = false;
</script>

<form action="/?/gotoTag" method="post" class="flex gap-2 {additionalClass}">
	{#if moreInfo}
		<a
			href="/about"
			class="px-1 h-6 w-6 flex justify-center items-center text-white bg-primary rounded tooltip tooltip-bottom"
			data-tip="Help"
		>
			?
		</a>
	{/if}
	<input
		name="lectTag"
		placeholder="lecturer tag or email"
		class="bg-secondary rounded px-2 placeholder-primary/70 {additionalInputClass}"
	/>
	<button
		onclick={() => (searchPressed = true)}
		class="px-1 flex items-center text-white bg-primary rounded tooltip tooltip-bottom"
		data-tip="Search"
	>
		<label class="swap swap-rotate {searchPressed ? 'swap-active' : ''}">
			<input type="checkbox" />
			<Search class="swap-off" />
			<span class="swap-on loading loading-spinner loading-xs"></span>
		</label>
	</button>
	{#if user}
		<button
			formaction="/?/gotoAccount"
			class="px-0.5 flex items-center text-white bg-accent rounded tooltip tooltip-bottom"
			data-tip="Account"
		>
			<label class="swap swap-rotate {accountPressed ? 'swap-active' : ''}">
				<input type="checkbox" />
				<img src={user.imageSrc} alt={user.email} class="swap-off object-cover w-6 rounded-full" />
				<span class="swap-on loading loading-spinner"></span>
			</label>
		</button>
	{:else}
		<button
			formaction="/?/gotoLogin"
			class="px-1 flex items-center text-white bg-accent rounded tooltip tooltip-bottom"
			data-tip="Log In"
		>
			<label class="swap swap-rotate {accountPressed ? 'swap-active' : ''}">
				<input type="checkbox" />
				<Account class="swap-off" />
				<span class="swap-on loading loading-spinner loading-xs"></span>
			</label>
		</button>
	{/if}
</form>
