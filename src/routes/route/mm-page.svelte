<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	const dispatch = createEventDispatcher();
	// This example requires the Places library. Include the libraries=places
	// parameter when you first load the API. For example:
	// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
	function initMap() {
		// const map = new google.maps.Map(document.getElementById('map'), {
		// 	center: { lat: 40.749933, lng: -73.98633 },
		// 	zoom: 13,
		// 	mapTypeControl: false
		// });
		const card = document.getElementById('pac-card');
		const input = document.getElementById('pac-input');
		const options = {
			fields: ['formatted_address', 'geometry', 'name'],
			strictBounds: false
		};

		// map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

		const autocomplete = new google.maps.places.Autocomplete(input, options);

		// Bind the map's bounds (viewport) property to the autocomplete object,
		// so that the autocomplete requests use the current map bounds for the
		// bounds option in the request.
		// autocomplete.bindTo('bounds', map);

		const infowindow = new google.maps.InfoWindow();
		const infowindowContent = document.getElementById('infowindow-content');

		infowindow.setContent(infowindowContent);

		// const marker = new google.maps.Marker({
		// 	map,
		// 	anchorPoint: new google.maps.Point(0, -29)
		// });

		autocomplete.addListener('place_changed', () => {
			infowindow.close();
			// marker.setVisible(false);

			const place = autocomplete.getPlace();

			if (!place.geometry || !place.geometry.location) {
				// User entered the name of a Place that was not suggested and
				// pressed the Enter key, or the Place Details request failed.
				window.alert("No details available for input: '" + place.name + "'");
				return;
			}

			// If the place has a geometry, then present it on a map.
			// if (place.geometry.viewport) {
			// 	map.fitBounds(place.geometry.viewport);
			// } else {
			// 	map.setCenter(place.geometry.location);
			// 	map.setZoom(17);
			// }

			// marker.setPosition(place.geometry.location);
			// marker.setVisible(true);
			infowindowContent.children['place-name'].textContent = place.name;
			infowindowContent.children['place-address'].textContent = place.formatted_address;
			console.log('Address selected: ', place.formatted_address);
			dispatch('address-found', place.formatted_address);
			// infowindow.open(map, marker);
		});
	}

	function loadScript(url) {
		// adding the script element to the head as suggested before
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;

		// fire the loading
		head.appendChild(script);
	}

	onMount(() => {
		window.initMap = initMap;
		loadScript(
			'https://maps.googleapis.com/maps/api/js?key=AIzaSyCDqJ6iXrIkxBNOetKAbV_MMwdjzfX_7Fk&libraries=places&callback=initMap'
		);
	});
</script>

<div class="max-w-xs max-h-[600px]">
	<div class="pac-card w-full h-full" id="pac-card">
		<div id="pac-container" class="p-3">
			<input
				id="pac-input"
				type="text"
				placeholder="Enter a location"
				class="w-full text-sm p-2 border border-black rounded"
			/>
		</div>
	</div>
</div>

<!-- <div id="map" class="w-full h-full" />
<div id="infowindow-content">
	<span id="place-name" class="title" /><br />
	<span id="place-address" />
</div> -->

<style lang="postcss">
</style>
