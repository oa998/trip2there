<script lang="ts">
	import type { Coordinate } from '$lib/types';

	const KEY = 'AIzaSyCnOoJT9SDfNi4W-wHknlF23NtRkUleP9U';
	export let start: Coordinate;
	export let end: Coordinate;

	let clazz = '';
	export { clazz as class };

	export let distanceInMeters: number;

	$: console.log({ distanceInMeters });

	const zoomScale = [
		// distance in M (not kM): zoom level
		{ maxDist: 200, zoom: 14 }, // walmart -> service station
		{ maxDist: 9100, zoom: 13 },
		{ maxDist: 14000, zoom: 12 },
		{ maxDist: 29000, zoom: 11 },
		{ maxDist: 59000, zoom: 10 },
		{ maxDist: 122600, zoom: 9 },
		{ maxDist: 226000, zoom: 8 },
		{ maxDist: 500000, zoom: 7 },
		{ maxDist: 823000, zoom: 6 },
		{ maxDist: 1740000, zoom: 5 },
		{ maxDist: 4000000, zoom: 4 }
	];
	let url = '';

	let zoom = 20;
	$: {
		let mid = getMidpoint(start, end);
		for (const z of zoomScale) {
			if (distanceInMeters < z.maxDist) {
				console.log({ z, distanceInMeters });
				zoom = z.zoom;
				break;
			}
		}
		url = `https://maps.googleapis.com/maps/api/staticmap?markers=${coordStr(start)}|${coordStr(
			end
		)}&center=${coordStr(mid)}&zoom=${zoom}&size=400x400&
          markers=color:blue%7Clabel:S%7C11211%7C11206%7C11222&key=${KEY}`;
	}

	$: {
		console.log({
			start,
			end,
			distanceInMeters
		});
	}
	function deg2rad(degrees: number) {
		return (degrees * Math.PI) / 180;
	}
	function getMidpoint(c1: { lat: number; lng: number }, c2: { lat: number; lng: number }) {
		const lat1 = deg2rad(c1.lat);
		const lng1 = deg2rad(c1.lng);
		const lat2 = deg2rad(c2.lat);
		const lng2 = deg2rad(c2.lng);

		const dlng = lng2 - lng1;
		const Bx = Math.cos(lat2) * Math.cos(dlng);
		const By = Math.cos(lat2) * Math.sin(dlng);
		const lat3 = Math.atan2(
			Math.sin(lat1) + Math.sin(lat2),
			Math.sqrt((Math.cos(lat1) + Bx) * (Math.cos(lat1) + Bx) + By * By)
		);
		const lng3 = lng1 + Math.atan2(By, Math.cos(lat1) + Bx);
		return {
			lat: (lat3 * 180) / Math.PI,
			lng: (lng3 * 180) / Math.PI
		};
	}

	function coordStr(c1: { lat: number; lng: number }) {
		if (c1.lat != null) {
			return `${c1.lat},${c1.lng}`;
		}
		return '';
	}
</script>

{#if start !== undefined && end !== undefined}
	{#key url}
		<img src={url} alt="map" class={`w-full h-full aspect-square max-w-full ${clazz}`} />
	{/key}
{/if}
