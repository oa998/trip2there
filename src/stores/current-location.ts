import { browser } from '$app/environment';
import type { Coordinate } from '$lib/types';
import { writable } from 'svelte/store';

type CurrentLocation = Coordinate & {
	address: string;
	error: string;
	loading: boolean;
	locationServicesEnabled: boolean;
};

const currentLocation = writable<CurrentLocation>({
	lat: 0,
	lng: 0,
	address: '',
	locationServicesEnabled: true, // presumed true
	error: '',
	loading: true
});

currentLocation.subscribe(console.log);

if (browser) {
	if (navigator?.geolocation) {
		const options = {
			enableHighAccuracy: true,
			timeout: 20_000,
			maximumAge: 0
		};

		function success(pos: GeolocationPosition) {
			const crd = pos.coords;
			const latlng = { lat: crd.latitude, lng: crd.longitude };

			fetch('/data/gcp-apis/get-my-address', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(latlng)
			}).then(async (r) => {
				if (r.status == 200) {
					const addressAry = await r.json();
					if (addressAry.length) {
						currentLocation.set({
							...latlng,
							address: addressAry[0],
							error: '',
							loading: false,
							locationServicesEnabled: true
						});
					}
				} else {
					currentLocation.set({
						...latlng,
						address: '',
						error: 'Unable to find your address',
						loading: false,
						locationServicesEnabled: true
					});
				}
			});
		}

		function error(e: GeolocationPositionError) {
			console.log({ c: e.code, m: e.message, e });
			switch (e.code) {
				case GeolocationPositionError.TIMEOUT:
					currentLocation.set({
						lat: 0,
						lng: 0,
						address: '',
						error: 'Timed out finding your location.',
						loading: false,
						locationServicesEnabled: true
					});
					return;

				case GeolocationPositionError.POSITION_UNAVAILABLE:
					currentLocation.set({
						lat: 0,
						lng: 0,
						address: '',
						error: 'Your location is unavailable.',
						loading: false,
						locationServicesEnabled: true
					});
					break;

				case GeolocationPositionError.PERMISSION_DENIED:
					currentLocation.set({
						lat: 0,
						lng: 0,
						address: '',
						error: 'Location services disabled.',
						loading: false,
						locationServicesEnabled: false
					});
					break;

				default:
					currentLocation.set({
						lat: 0,
						lng: 0,
						address: '',
						error: e.message,
						loading: false,
						locationServicesEnabled: true
					});
					break;
			}
		}
		navigator.geolocation.getCurrentPosition(success, error, options);
	} else {
		currentLocation.set({
			lat: 0,
			lng: 0,
			address: '',
			error: 'Location services not available in this browser.',
			loading: false,
			locationServicesEnabled: true
		});
	}
}

export default currentLocation;
