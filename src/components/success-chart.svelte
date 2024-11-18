<script lang="ts">
	import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
	import generateColors from '../utils/color-generate';
	import type { landpadsType } from '../types/landpads';
	Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

	let { landpads }: { landpads: landpadsType[] } = $props();

	let chart: Chart | null = null;
	let canvas: HTMLCanvasElement;

	$effect(() => {
		const chart_data = landpads.map((chat) => {
			const successRate =
				chat.attempted_landings > 0
					? (chat.successful_landings / chat.attempted_landings) * 100
					: 0; // Avoid division by zero
			return {
				name: chat.full_name,
				successRate: successRate.toFixed(2) // Format to 2 decimal places
			};
		});
		if (chart) {
			chart.destroy();
		}
		const colors = generateColors(chart_data?.length!);
		//@ts-ignore
		chart = new Chart(canvas, {
			type: 'doughnut',
			data: {
				labels: chart_data.map((item) => item.name),
				datasets: [
					{
						data: chart_data.map((item) => item.successRate),
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
	<div style="font-size: 24px; font-weight: bold;">{landpads?.length}</div>
	<div style="font-size: 14px; color: #666;">Landing Pads</div>
</div>

<style>
	canvas {
		max-width: 100%;
	}
</style>
