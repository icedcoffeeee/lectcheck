<script lang="ts">
	import WavyBackground from '$components/aceternity/WavyBackground.svelte';
	import Footer from '$components/Footer.svelte';
	import Navbar from '$components/Navbar.svelte';
</script>

<Navbar />
<div class="py-4">
	<WavyBackground className="mt-10">
		<section class="h-[50lvh] justify-between">
			<div>
				<h1>Read Other Reviews</h1>
				<p>Get to know the lecturer responsible for your grade next semester</p>
			</div>
			<div class="text-right">
				<h1>Share Your Experience</h1>
				<p>Let others know what you've gone through and what they're getting into</p>
			</div>
		</section>
	</WavyBackground>

	<section class="h-[70lvh] justify-center text-center gap-2">
		<h1 class="mb-2">FAQ</h1>
		<div class="collapse collapse-arrow bg-primary/20 rounded-md">
			<input type="checkbox" name="faq" />
			<div class="collapse-title text-xl">What's a lecturer "tag"?</div>
			<div class="collapse-content">
				<p>
					The beginning of their UM email. The tag for <span class="code">hamdi@um.edu.my</span> is
					<span class="code">hamdi</span>.
				</p>
			</div>
		</div>
		<div class="collapse collapse-arrow bg-primary/20 rounded-md">
			<input type="checkbox" name="faq" />
			<div class="collapse-title text-xl">Is this an official page?</div>
			<div class="collapse-content">
				<p>
					No. We have no relation to UM administration, just students helping students. The official
					platform is CTES but that's not useful.
				</p>
			</div>
		</div>
		<div class="collapse collapse-arrow bg-primary/20 rounded-md">
			<input type="checkbox" name="faq" />
			<div class="collapse-title text-xl">Are reviews anonymous?</div>
			<div class="collapse-content">
				<p>
					Your reviews are never released to third parties. We only manage data to deter spam and
					hateful comments. Any other reviews, good or bad, are always encouraged. Read our
					<a href="/privacy" class="underline">Privacy Policy</a> for more information.
				</p>
			</div>
		</div>
	</section>

	<Footer />
</div>

<style lang="postcss">
	h1 {
		@apply font-bold bg-clip-text bg-gradient-to-tr from-sky-500 to-violet-500 text-3xl lg:text-5xl text-transparent drop-shadow-md;
	}

	section {
		@apply mb-5 px-4 flex flex-col;
	}

	.code {
		@apply font-mono text-accent;
	}
</style>
