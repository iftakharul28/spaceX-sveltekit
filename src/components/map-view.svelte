<script lang="ts">
	let { landpads }: { landpads: landpadsType[] } = $props();
	import 'leaflet/dist/leaflet.css';
	import type { landpadsType } from '../types/landpads';

	let mapRef: HTMLDivElement;
	let leaflet: typeof import('leaflet') | null = null;
	let map: L.Map | null = null;

	$effect(() => {
		// Call the async function
		initializeMap();
		// Cleanup on unmount
		return () => {
			if (map) map.remove();
		};
	});
	async function initializeMap() {
		leaflet = await import('leaflet');
		if (leaflet && mapRef) {
			map = leaflet.map(mapRef, {
				center: [Number(landpads[0]?.location?.latitude), Number(landpads[0]?.location?.longitude)],
				zoom: 9,
				minZoom: 2
			});

			leaflet
				.tileLayer('https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			if (Array.isArray(landpads)) {
				landpads
					.filter((location) => location.location.latitude && location.location.longitude)
					.forEach((location) => {
						const position: [number, number] = [
							Number(location.location.latitude),
							Number(location.location.longitude)
						];
						addMarker(position, location);
					});
			}
		}
		function addMarker(position: [number, number], location: landpadsType) {
			const customIcon = leaflet?.divIcon({
				className: `w-10 h-10 rounded-full ${
					location.status === 'active'
						? 'bg-green-600'
						: location.status === 'retired'
							? 'bg-red-600'
							: 'bg-blue-600'
				}`,
				iconSize: [18, 18]
			});

			if (leaflet && map) {
				leaflet.marker(position, { icon: customIcon }).addTo(map).bindPopup(`
        <h3 class="my-1.5 font-bold">${location.full_name}</h3>
        <p class="text-2xs !my-1.5 capitalize">
          <span class="font-bold">Status: </span>
          ${location.status}
        </p>
        <p class="text-2xs !my-1.5 capitalize">
          <span class="font-bold">Address: </span>
          ${location.location.name}
        </p>
    `);
			}
		}
	}
</script>

<div bind:this={mapRef} id="map"></div>

<style>
	#map {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 9;
	}
</style>
