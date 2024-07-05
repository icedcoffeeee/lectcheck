<script lang="ts">
	import { page } from '$app/stores';
	const divClass =
		'h-[80lvh] w-full flex flex-col justify-center items-center gap-2 md:gap-4 text-center';
	const emojiClass = 'text-2xl md:text-5xl';
	const errorClass = 'text-neutral/60 max-w-64';
</script>

{#if $page.status === 404}
	<div class={divClass}>
		<p class={emojiClass}>😵‍💫😵‍💫😵‍💫</p>
		<p class={errorClass}>Oops... We couldn't find them. Check their UMExpert page.</p>
	</div>
{:else if $page.status === 500}
	<div class={divClass}>
		<p class={emojiClass}>🤔🤔🤔</p>
		<p class={errorClass}>Hmmm... Something went wrong. Check back later?</p>
	</div>
{/if}
