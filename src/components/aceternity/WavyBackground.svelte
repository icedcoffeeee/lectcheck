<!-- @migration-task Error while migrating Svelte code: $$props is used together with named props in a way that cannot be automatically migrated. -->
<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { createNoise3D } from 'simplex-noise';
	import { onMount } from 'svelte';
	import TWcolors from 'tailwindcss/colors';

	const { sky, violet } = TWcolors;

	export let className: string | undefined = undefined;
	export let colors = [sky[500], violet[500]];
	export let waveWidth: number | undefined = undefined;
	export let backgroundFill: string | undefined = undefined;
	export let blur = 10;
	export let speed = 0.004;
	export let waveOpacity = 0.5;

	const noise = createNoise3D();

	let w: number, h: number;
	let nt: number, i: number, x: number;

	let ctx: CanvasRenderingContext2D;
	let canvas: HTMLCanvasElement;
	let canvasRef: HTMLCanvasElement;

	function init() {
		canvas = canvasRef;
		ctx = canvas.getContext('2d')!;

		w = ctx.canvas.width = window.innerWidth;
		h = ctx.canvas.height = window.innerHeight;

		ctx.filter = `blur(${blur}px)`;
		nt = 0;

		window.onresize = function () {
			w = ctx.canvas.width = window.innerWidth;
			h = ctx.canvas.height = window.innerHeight;
			ctx.filter = `blur(${blur}px)`;
		};
		render();
	}

	function drawWave(n: number) {
		nt += speed;
		for (i = 0; i < n; i++) {
			ctx.beginPath();
			ctx.lineWidth = waveWidth || 50;
			ctx.strokeStyle = colors[i % colors.length];
			for (x = 0; x < w; x += 5) {
				var y = noise(x / 800, 0.3 * i, nt) * 200 * 0.25;
				ctx.lineTo(x, y + h * 0.25); // adjust for height, currently at 25% of the container
			}
			ctx.stroke();
			ctx.closePath();
		}
	}

	let animationId: number;
	function render() {
		ctx.clearRect(0, 0, w, h);
		ctx.fillStyle = backgroundFill || 'rgb(0 0 0 / 0%)';
		ctx.globalAlpha = waveOpacity || 0.5;

		ctx.fillRect(0, 0, w, h);
		drawWave(5);

		animationId = requestAnimationFrame(render);
	}

	onMount(function () {
		init();
		return () => cancelAnimationFrame(animationId);
	});
</script>

<div class="relative">
	<canvas
		class="absolute inset-0 z-0"
		style="--left:{canvas ? canvas.getBoundingClientRect().left : ''}"
		bind:this={canvasRef}
	></canvas>
	<div class={cn('relative z-10', className)} {...$$props}>
		<slot />
	</div>
</div>

<style>
	canvas {
		left: calc(var(--left) * 1px);
	}
</style>
