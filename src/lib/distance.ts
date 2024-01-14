import { env } from '$env/dynamic/public';
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
	const s = encodeURI(`${env.PUBLIC_SERVER_URL}/gcp-apis/distance?end=${end}&start=${start}`);
	return fetch(s).then(async (r) => {
		const json = await r.json();
		if (!/^200$/.test('' + r.status)) {
			throw new Error(json.message);
		}
		console.log(JSON.stringify(json, null, 2));
		let cost = json.distance.value * 0.001; // 0.1 cent per meter
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
