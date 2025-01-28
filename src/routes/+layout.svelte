<script lang="ts">
	import '../app.css';
	import colors from 'tailwindcss/colors';
	import { injectSpeedInsights } from '@vercel/speed-insights';
	import { onNavigate } from '$app/navigation';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	injectSpeedInsights();
	onNavigate(function (nav) {
		///@ts-ignore
		if (!document.startViewTransition) return;
		return new Promise((resolve) =>
			///@ts-ignore
			document.startViewTransition(async function () {
				resolve();
				await nav.complete;
			})
		);
	});
</script>

<div
	class="-z-10 absolute top-0 left-0 w-screen h-[100lvh]"
	style="background:
    radial-gradient(
      circle at 30% 20%,
      {colors.purple[900]}25,
      rgba(0, 0, 0, 0) 20%
    ),
    radial-gradient(
      circle at 70% 80%,
      {colors.blue[300]}aa 10%,
      rgba(0, 0, 0, 0) 30%
    );"
></div>
{@render children?.()}
