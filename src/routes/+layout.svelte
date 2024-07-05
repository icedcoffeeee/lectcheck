<script lang="ts">
	import '../app.css';

	import { injectSpeedInsights } from '@vercel/speed-insights';
	injectSpeedInsights();
</script>

<slot />
