<script lang="ts">
	import { onMount } from 'svelte';
	import 'ol/ol.css';
	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import VectorLayer from 'ol/layer/Vector';
	import VectorSource from 'ol/source/Vector';
	import { Circle as CircleStyle, Fill, Style } from 'ol/style';
	import Feature from 'ol/Feature';
	import Point from 'ol/geom/Point';
	import { fromLonLat } from 'ol/proj';
	import XYZ from 'ol/source/XYZ';
	let map: Map | undefined;
	export let coordinates: [number, number][];

	const vectorSource = new VectorSource({
		features: coordinates.map(
			(coord) =>
				new Feature({
					geometry: new Point(fromLonLat(coord))
				})
		)
	});

	const vectorLayer = new VectorLayer({
		source: vectorSource,
		style: new Style({
			image: new CircleStyle({
				radius: 10,
				fill: new Fill({
					color: 'limegreen'
				})
			})
		})
	});

	onMount(() => {
		map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new XYZ({
						url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png',
						attributions:
							'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
					})
				}),
				vectorLayer
			],
			view: new View({
				center: fromLonLat(coordinates[0]),
				zoom: 10
			})
		});
		return () => {
			if (map) map.setTarget(undefined);
		};
	});
</script>

<div id="map"></div>

<style>
	#map {
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>
