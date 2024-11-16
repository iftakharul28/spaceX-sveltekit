<script lang="ts">
	import type { PageData } from './$types';
	import type { Snippet } from 'svelte';

	import {
		Card,
		Progressbar,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import LandpadsDetails from '../components/landpads-details.svelte';
	import SuccessRate from '../components/success-rate.svelte';
	import MapView from '../components/map-view.svelte';
	import SuccessChart from '../components/success-chart.svelte';

	let { data, children }: { data: PageData; children: Snippet } = $props();

	// Example data for the chart
	const newChart = data.result.map((chat) => {
		return {
			name: chat.full_name,
			successRate: (chat.landing_successes / chat.landing_attempts) * 100
		};
	});
</script>

<svelte:head>
	<title>spaceX Page</title>
	<meta name="description" content="spaceX for SEO" />
</svelte:head>
<main class="container mt-7 grid grid-cols-12 gap-10">
	<Table divClass="col-span-8" hoverable={true}>
		<TableHead>
			<TableHeadCell>Full Name</TableHeadCell>
			<TableHeadCell>Location Name</TableHeadCell>
			<TableHeadCell>Region</TableHeadCell>
			<TableHeadCell>Details</TableHeadCell>
			<TableHeadCell>Success Rate</TableHeadCell>
			<TableHeadCell>Wikipedia Link</TableHeadCell>
			<TableHeadCell>Status</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each data.result as item}
				<TableBodyRow>
					<TableBodyCell>{item.full_name}</TableBodyCell>
					<TableBodyCell>{item.locality}</TableBodyCell>
					<TableBodyCell>{item.region}</TableBodyCell>
					<TableBodyCell>
						<!-- {item.details} -->
						<LandpadsDetails {item} />
					</TableBodyCell>
					<TableBodyCell>
						<SuccessRate progress={(item.landing_successes / item.landing_attempts) * 100} />
					</TableBodyCell>
					<TableBodyCell
						><a href={item.wikipedia} target="_blank" aria-label={item.name}>
							<svg
								width="19"
								height="18"
								viewBox="0 0 19 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6.25346 17.25C5.49435 17.2513 4.752 17.0045 4.12049 16.5409C3.48898 16.0774 2.99675 15.418 2.70621 14.6462C2.41566 13.8745 2.33987 13.0252 2.48846 12.206C2.63704 11.3867 3.0033 10.6345 3.54081 10.0447L6.59274 6.68703C7.31274 5.89649 8.2883 5.45251 9.30539 5.45251C10.3225 5.45251 11.298 5.89649 12.018 6.68703C12.1629 6.85707 12.242 7.08247 12.2386 7.31554C12.2351 7.54861 12.1494 7.77107 11.9996 7.93584C11.8498 8.10061 11.6476 8.19476 11.4358 8.19838C11.224 8.202 11.0192 8.1148 10.8648 7.95523C10.4508 7.50099 9.89001 7.24591 9.30539 7.24591C8.72076 7.24591 8.15999 7.50099 7.74598 7.95523L4.69405 11.3138C4.28047 11.7689 4.04812 12.3862 4.04812 13.0298C4.04812 13.3485 4.10516 13.6641 4.21599 13.9586C4.32682 14.253 4.48926 14.5205 4.69405 14.7459C4.89883 14.9712 5.14195 15.15 5.40951 15.272C5.67707 15.3939 5.96385 15.4567 6.25346 15.4567C6.83835 15.4567 7.39928 15.201 7.81286 14.7459L8.20842 14.3106C8.28441 14.2273 8.37457 14.1612 8.47376 14.1162C8.57294 14.0712 8.67921 14.0482 8.78649 14.0484C8.89376 14.0486 8.99995 14.0721 9.09899 14.1174C9.19803 14.1628 9.28798 14.2292 9.3637 14.3128C9.43943 14.3965 9.49944 14.4957 9.54032 14.6048C9.5812 14.714 9.60214 14.8309 9.60195 14.949C9.60176 15.067 9.58044 15.1839 9.53922 15.2929C9.49799 15.4019 9.43766 15.5008 9.36166 15.5842L8.9661 16.0195C8.60987 16.4111 8.18685 16.7214 7.72133 16.9325C7.25581 17.1437 6.75697 17.2516 6.25346 17.25Z"
									fill="#1C64F2"
								/>
								<path
									d="M10.5296 12.5488C10.0258 12.5496 9.52683 12.441 9.06132 12.229C8.5958 12.0171 8.17291 11.7061 7.81694 11.3138C7.66837 11.1445 7.58617 10.9178 7.58802 10.6824C7.58988 10.4471 7.67566 10.222 7.82687 10.0556C7.97809 9.88919 8.18265 9.7948 8.3965 9.79276C8.61034 9.79071 8.81636 9.88118 8.97018 10.0447C9.3903 10.486 9.94878 10.7323 10.5296 10.7323C11.1104 10.7323 11.6689 10.486 12.089 10.0447L15.1401 6.68703C15.3453 6.46191 15.5081 6.19445 15.6191 5.89998C15.7302 5.6055 15.7874 5.2898 15.7874 4.97097C15.7874 4.65213 15.7302 4.33643 15.6191 4.04196C15.5081 3.74748 15.3453 3.48002 15.1401 3.2549C14.7202 2.81342 14.1618 2.56705 13.5811 2.56705C13.0004 2.56705 12.442 2.81342 12.0221 3.2549L11.4137 3.92446C11.2606 4.09275 11.0531 4.18725 10.8368 4.18716C10.6204 4.18708 10.413 4.09242 10.26 3.92401C10.1071 3.75559 10.0212 3.52723 10.0213 3.28914C10.0214 3.05105 10.1074 2.82275 10.2604 2.65446L10.8689 1.98491C11.5883 1.19379 12.5639 0.749579 13.5809 0.75C14.598 0.750421 15.5732 1.19544 16.2921 1.98715C17.011 2.77887 17.4147 3.85242 17.4143 4.97166C17.4139 6.09089 17.0095 7.16411 16.2901 7.95523L13.2382 11.3129C12.8828 11.7048 12.4606 12.0157 11.9958 12.2278C11.531 12.4399 11.0327 12.549 10.5296 12.5488Z"
									fill="#1C64F2"
								/>
							</svg>
						</a></TableBodyCell
					>
					<TableBodyCell>
						{#if item.status != 'retired'}
							<p class="h-6 rounded bg-green-300 px-2 text-center capitalize text-green-600">
								{item.status}
							</p>
						{:else}
							<p class="h-6 rounded bg-red-300 px-2 text-center capitalize text-red-600">
								{item.status}
							</p>
						{/if}
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
	<div class="col-span-4 max-w-full space-y-4">
		<Card title="Map View" class="h-96 max-w-full">
			<MapView
				coordinates={data.result.map((coordinate) => {
					return [coordinate.longitude, coordinate.latitude];
				})}
			/>
		</Card>
		<Card class="relative flex h-96 max-w-full items-center justify-center">
			<SuccessChart chartData={newChart} />
		</Card>
	</div>
</main>
