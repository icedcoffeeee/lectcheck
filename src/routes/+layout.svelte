<script lang="ts">
	import '../app.css';
	import { injectSpeedInsights } from '@vercel/speed-insights';
	import { onNavigate } from '$app/navigation';

	injectSpeedInsights();
	onNavigate(function (nav) {
		///@ts-ignore
		if (!document.startViewTransition) return;
		return new Promise((res) =>
			///@ts-ignore
			document.startViewTransition(async function () {
				res();
				await nav.complete;
			})
		);
	});
</script>

<slot />
