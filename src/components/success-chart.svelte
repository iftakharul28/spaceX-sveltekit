<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
	import generateColors from '../utils/color-generate';
	Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

	let chart: Chart | null = null;
	let canvas: HTMLCanvasElement;

	// Props
	export let chartData: {
		name: string;
		successRate: number;
	}[];

	onMount(() => {
		if (chart) {
			chart.destroy();
		}
		const colors = generateColors(chartData.length);
		//@ts-ignore
		chart = new Chart(canvas, {
			type: 'doughnut',
			data: {
				labels: chartData.map((label) => label.name),
				datasets: [
					{
						data: chartData.map((success) => success.successRate),
						backgroundColor: colors,
						hoverBackgroundColor: colors.map((color) => color + '80'), // Slightly transparent on hover
						borderWidth: 0
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				cutout: '70%',
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: true
					}
				}
			}
		});
		return () => {
			if (chart) chart.destroy();
		};
	});
</script>

<canvas bind:this={canvas}></canvas>

<!-- Center Text -->
<div class="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-center">
	<div style="font-size: 24px; font-weight: bold;">{chartData.length}</div>
	<div style="font-size: 14px; color: #666;">Landing Pads</div>
</div>

<style>
	canvas {
		max-width: 100%;
	}
</style>
