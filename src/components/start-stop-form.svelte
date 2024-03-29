<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_RESTRICTED_KEY } from '$env/static/public';
	import type { Coordinate } from '$lib/types';
	import currentLocation from '$stores/current-location';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import GetCurrentLocation from './get-current-location.svelte';

	const dispatch = createEventDispatcher();
	const coordinateDispatcher = createEventDispatcher<{
		'start-coords': Coordinate;
		'end-coords': Coordinate;
	}>();

	const KEY = PUBLIC_RESTRICTED_KEY;
	let start: string;
	let end: string;

	$: if (start && end) {
		dispatch('route-selected', { ready: true, start, end });
	} else {
		dispatch('route-selected', { ready: false, start, end });
	}

	function setStartLocation(address: string, coords: Coordinate) {
		start = address;
		dispatch('start-address-found', address);
		coordinateDispatcher('start-coords', coords);
	}

	function initPlaces() {
		const startInput = document.getElementById('start-location');
		const endInput = document.getElementById('end-location');
		const options = {
			fields: ['formatted_address', 'geometry', 'name'],
			strictBounds: false
		};

		const autocompleteStart = new google.maps.places.Autocomplete(startInput, options);
		const autocompleteEnd = new google.maps.places.Autocomplete(endInput, options);

		autocompleteStart.addListener('place_changed', () => {
			const place = autocompleteStart.getPlace();

			if (!place.geometry || !place.geometry.location) {
				window.alert("No details available for input: '" + place.name + "'");
				return;
			}
			setStartLocation(place.formatted_address, {
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng()
			});
		});

		autocompleteEnd.addListener('place_changed', () => {
			const place = autocompleteEnd.getPlace();

			if (!place.geometry || !place.geometry.location) {
				window.alert("No details available for input: '" + place.name + "'");
				return;
			}
			console.log('end address selected: ', place.formatted_address, place);
			end = place.formatted_address;
			dispatch('end-address-found', place.formatted_address);
			coordinateDispatcher('end-coords', {
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng()
			});
		});
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
			window.initPlaces = initPlaces;
			loadScript(
				`https://maps.googleapis.com/maps/api/js?key=${KEY}&libraries=places&callback=initPlaces`
			);
		}
	});
</script>

<div class="w-full h-full">
	<div>
		<div class="flex flex-row justify-between">
			<label for="start-location">Start Location:</label>
			<GetCurrentLocation
				on:click={() => {
					document.getElementById('start-location').value = $currentLocation.address;
					setStartLocation($currentLocation.address, $currentLocation);
				}}
			/>
		</div>
		<div class="input-flex">
			<input
				on:focus={(e) => {
					start = '';
					e.target.value = '';
				}}
				id="start-location"
				type="text"
				placeholder="Choose pickup location"
				class="w-full text-sm p-2 border border-black rounded"
			/>
			{#if start}
				<Icon
					icon="material-symbols:check-circle-outline"
					color="green"
					style="font-size:xx-large"
				/>
			{/if}
		</div>
	</div>

	<div>
		<label for="end-location">End Location:</label>
		<div class="input-flex">
			<input
				on:focus={(e) => {
					end = '';
					e.target.value = '';
				}}
				id="end-location"
				type="text"
				placeholder="Choose the destination"
				class="w-full text-sm p-2 border border-black rounded"
			/>
			{#if end}
				<Icon
					icon="material-symbols:check-circle-outline"
					color="green"
					style="font-size:xx-large"
				/>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.input-flex {
		@apply flex flex-row items-center gap-2;
	}
</style>
