<script lang="ts">
	import StartStopForm from '$components/start-stop-form.svelte';
	import { dist, type DistElement } from '$lib/distance';
	import { toastErrorCatch } from '$lib/toast';
	import Icon from '@iconify/svelte';
	import Loading from './../../../components/loading.svelte';
	let routeSelected = false;
	let requestButton: HTMLButtonElement;
	let loadingDistance = false;
	let distance: DistElement[] = [
		// {
		// 	distance: {
		// 		text: '8.5 mi',
		// 		value: 13655
		// 	},
		// 	duration: {
		// 		text: '19 mins',
		// 		value: 1112
		// 	},
		// 	price: {
		// 		text: '$12.50',
		// 		value: 12.5
		// 	},
		// 	status: 'OK'
		// }
	];
	$: ready = routeSelected && distance.length > 0;
</script>

<div class="font-semibold font-anybody py-3 text-4xl text-center mt-5 bg-violet-400">
	Request a ride
</div>
<div class="p-2">
	<StartStopForm
		on:start-address-found={(x) => console.log('start', { x })}
		on:end-address-found={(x) => console.log('end', { x })}
		on:route-selected={(x) => {
			routeSelected = x.detail.ready;
			const { start, end } = x.detail;

			if (routeSelected) {
				loadingDistance = true;
				dist(start, end)
					.then((dist) => (distance = dist))
					.catch(toastErrorCatch)
					.then(() => (loadingDistance = false));
				setTimeout(() => requestButton.focus());
			} else {
				distance = [];
			}
		}}
	/>
	<br />
	<div class="h-24 w-full">
		{#if routeSelected && loadingDistance}
			<div class="border border-black rounded p-2 bg-blue-100 h-full grid place-items-center">
				<Loading text={`Calculating Trip`} />
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
			</div>
		{/if}
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
</div>

<!-- </div> -->

<style lang="postcss">
	* {
		@apply focus:outline-blue-950;
	}
	.route-selected:not(:active) {
		@apply shadow-gray-500 shadow-lg;
	}
</style>
