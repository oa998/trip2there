<script lang="ts">
	import { browser } from '$app/environment';
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	export let id: string;

	if (/[^a-zA-Z]/.test(id)) {
		throw new Error('id must be camelCase only. invalid: ' + id);
	}

	function initMap() {
		const input = document.getElementById(id);
		const options = {
			fields: ['formatted_address', 'geometry', 'name'],
			strictBounds: false
		};

		const autocomplete = new google.maps.places.Autocomplete(input, options);

		autocomplete.addListener('place_changed', () => {
			const place = autocomplete.getPlace();

			if (!place.geometry || !place.geometry.location) {
				window.alert("No details available for input: '" + place.name + "'");
				return;
			}
			console.log('Address selected: ', place.formatted_address);
			dispatch('address-found', place.formatted_address);
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
			window['' + id] = initMap;
			loadScript(
				`https://maps.googleapis.com/maps/api/js?key=AIzaSyCDqJ6iXrIkxBNOetKAbV_MMwdjzfX_7Fk&libraries=places&callback=${id}`
			);
		}
	});
</script>

<div class="pac-card w-full h-full" id="pac-card">
	<div id="pac-container">
		<input
			{id}
			type="text"
			placeholder="Enter a location"
			class="w-full text-sm p-2 border border-black rounded"
		/>
	</div>
</div>

<style lang="postcss">
</style>
