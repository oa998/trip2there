import { browser } from '$app/environment';
import { base } from '$app/paths';
export interface DistElement {
	distance: Distance;
	duration: Duration;
	price: Price;
	status: string;
}

export interface Distance {
	text: string;
	value: number;
}

export interface Duration {
	text: string;
	value: number;
}

export interface Price {
	text: string;
	value: number;
}

export async function dist(start: string, end: string): Promise<DistElement[]> {
	return fetch(`${base == '/' ? '' : base}/data/gcp-apis/distance`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify({ start, end })
	}).then(async (r) => {
		const json = await r.json();
		if (!/^200$/.test('' + r.status)) {
			throw new Error(json.message);
		}
		console.log(JSON.stringify(json, null, 2));
		let cost = 10 + json.distance.value * 0.001; // $1 per km plus a flat $10;
		json.price = {
			value: cost.toFixed(2),
			text: `$${cost.toFixed(2)}`
		};
		return [json satisfies DistElement];
	});
	/*
    {
      "distance": {
        "text": "8.5 mi",
        "value": 13655
      },
      "duration": {
        "text": "19 mins",
        "value": 1112
      },
      "status": "OK"
    }
  */
}

export const getMyAddress = () => {
	if (browser) {
		if (navigator?.geolocation) {
			const options = {
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			};

			return new Promise((ack, nack) => {
				function success(pos) {
					const crd = pos.coords;
					console.log('Your current position is:');
					console.log(`Latitude : ${crd.latitude}`);
					console.log(`Longitude: ${crd.longitude}`);
					console.log(`More or less ${crd.accuracy} meters.`);
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
							ack({
								latlng,
								addressAry
							});
						} else {
							const t = await r.text();
							nack(t);
						}
					});
				}

				function error(e) {
					console.log(e, String(e));
					nack('Could not get coordinates');
				}
				navigator.geolocation.getCurrentPosition(success, error, options);
			});
		}
	}
};
