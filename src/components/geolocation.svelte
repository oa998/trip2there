<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	let map;

	const myCoords = writable({ lat: null, lng: null });

	myCoords.subscribe((v) => {
		if (browser && window.google) initMap(v);
	});

	async function initMap(coords) {
		// The location of Uluru
		// const position = { lat: -25.344, lng: 131.031 };
		// Request needed libraries.
		console.log({ coords });
		//@ts-ignore
		const { Map } = await google.maps.importLibrary('maps');
		const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

		if (!coords.lat || !coords.lng) return;

		// The map, centered at Uluru
		map = new Map(document.getElementById('map'), {
			zoom: 18,
			center: coords,
			mapId: 'map'
		});

		// The marker
		const marker = new AdvancedMarkerElement({
			map: map,
			position: coords,
			title: 'Title1'
		});
	}

	if (browser) {
		if (navigator?.geolocation) {
			const options = {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			};

			function success(pos) {
				const crd = pos.coords;

				console.log('Your current position is:');
				console.log(`Latitude : ${crd.latitude}`);
				console.log(`Longitude: ${crd.longitude}`);
				console.log(`More or less ${crd.accuracy} meters.`);
				$myCoords = { lat: crd.latitude, lng: crd.longitude };
			}

			function error(err) {
				console.warn(`ERROR(${err.code}): ${err.message}`);
			}

			navigator.geolocation.getCurrentPosition(success, error, options);
		} else {
			alert('sorry - geolocation not available for your browser');
		}
	}

	function loadScript(url: string) {
		// adding the script element to the head as suggested before
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;

		// fire the loading
		head.appendChild(script);
	}

	onMount(() => {
		if (browser) {
			const KEY = 'AIzaSyCnOoJT9SDfNi4W-wHknlF23NtRkUleP9U';
			window.initMap = () => initMap($myCoords);
			loadScript(`https://maps.googleapis.com/maps/api/js?key=${KEY}&callback=initMap`);
		}
	});
</script>

<div id="map" />

<style lang="postcss">
	#map {
		@apply w-full h-[300px];
	}
</style>
