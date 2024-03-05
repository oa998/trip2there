<script lang="ts">
	import Map from '$components/map.svelte';
	import StartStopForm from '$components/start-stop-form.svelte';

	import { dist, type DistElement } from '$lib/distance';
	import { toastErrorCatch } from '$lib/toast';
	import isLoading from '$stores/loading';
	import Icon from '@iconify/svelte';
	import Loading from './../../../components/loading.svelte';
	let routeSelected = false;
	let requestButton: HTMLButtonElement;
	let startCoords: Coordinate;
	let endCoords: Coordinate;

	// let startCoords = {
	// 	lat: 34.0378168,
	// 	lng: -84.05254750000002
	// };
	// let endCoords = {
	// 	lat: 33.976525,
	// 	lng: -84.0802071
	// };

	let distance: DistElement[] = [
		// {
		// 	distance: {
		// 		text: '5.7 mi',
		// 		value: 9157
		// 	},
		// 	duration: {
		// 		text: '11 mins',
		// 		value: 663
		// 	},
		// 	price: {
		// 		value: 10 + 9157 * 0.001,
		// 		text: `$${(10 + 9157 * 0.001).toFixed(2)}`
		// 	},
		// 	status: 'OK'
		// }
	];
	$: ready = routeSelected && distance.length > 0;
	// let ready = true;
</script>

<div class="pt-5 pb-16">
	<div class="font-semibold font-anybody py-3 text-4xl text-center title-blue">Request a ride</div>
	<div class="p-2">
		<StartStopForm
			on:start-address-found={(x) => console.log('start', { x })}
			on:end-address-found={(x) => console.log('end', { x })}
			on:start-coords={(c) => (startCoords = c.detail)}
			on:end-coords={(c) => (endCoords = c.detail)}
			on:route-selected={(x) => {
				routeSelected = x.detail.ready;
				const { start, end } = x.detail;

				if (routeSelected) {
					$isLoading = true;
					dist(start, end)
						.then((dist) => {
							distance = dist;
							console.log({ dist });
						})
						.catch(toastErrorCatch)
						.then(() => {
							$isLoading = false;
						});
					// setTimeout(() => requestButton.focus());
				} else {
					distance = [];
				}
			}}
		/>
		<br />
		<div class="w-full">
			{#if routeSelected && $isLoading}
				<div class="border border-black rounded p-2 bg-blue-100 h-full grid place-items-center">
					<Loading text={`Calculating Trip`} />
				</div>
			{:else if !ready}
				<div class="w-full flex justify-center">
					<embed
						type="text/html"
						src="https://lottie.host/embed/2f0ea021-1f40-44f3-b903-a0491ef15203/ULd5BKWJbm.json"
						width="200"
						height="200"
					/>
				</div>
			{/if}
			{#if ready}
				<div class="border border-black rounded p-2 bg-blue-200">
					<div class="flex flex-row gap-2">
						<div class="font-semibold pl-2">Distance:</div>
						<div class="flex-auto">{distance[0].distance.text}</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="font-semibold pl-2">Time:</div>
						<div>{distance[0].duration.text}</div>
					</div>
					<div class="flex flex-row gap-2">
						<div class="font-semibold pl-2">Price:</div>
						<div>{distance[0].price.text}</div>
					</div>
					<br />

					<Map
						class="border-2 border-black rounded"
						start={startCoords}
						end={endCoords}
						distanceInMeters={distance[0].distance.value}
					/>
				</div>
				<br />
				<div class="flex flex-row justify-between w-full">
					<button
						bind:this={requestButton}
						disabled={!ready}
						class:route-selected={ready}
						class="button secondary flex flex-row gap-2 justify-center"
					>
						Schedule Ride
						<Icon icon="raphael:future" style="font-size:x-large" />
					</button>
					<button
						bind:this={requestButton}
						disabled={!ready}
						class:route-selected={ready}
						class="button primary"
					>
						Request Ride Now</button
					>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- </div> -->

<style lang="postcss">
	* {
		@apply focus:outline-blue-950;
	}
	.route-selected:not(:active) {
		@apply shadow-gray-500 shadow-lg;
	}
	.title-blue {
		/* background-image: linear-gradient(to bottom right, rgb(44, 44, 255) 60%, blue); */
	}
</style>
