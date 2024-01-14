<script lang="ts">
	import StartStopForm from '$components/start-stop-form.svelte';
	import { dist, type DistElement } from '$lib/distance';
	import { toastErrorCatch } from '$lib/toast';
	import Icon from '@iconify/svelte';
	let routeSelected = false;
	let requestButton: HTMLButtonElement;
	let distance: DistElement[] = [
		{
			distance: {
				text: '8.5 mi',
				value: 13655
			},
			duration: {
				text: '19 mins',
				value: 1112
			},
			price: {
				text: '$12.50',
				value: 12.5
			},
			status: 'OK'
		}
	];
</script>

<div class="font-semibold py-3 bg-orange-300 text-2xl text-center">Request a ride</div>
<div class="p-2">
	<StartStopForm
		on:start-address-found={(x) => console.log('start', { x })}
		on:end-address-found={(x) => console.log('end', { x })}
		on:route-selected={(x) => {
			routeSelected = x.detail.ready;
			const { start, end } = x.detail;

			if (routeSelected) {
				dist(start, end)
					.then((dist) => (distance = dist))
					.catch(toastErrorCatch);
				setTimeout(() => requestButton.focus());
			} else {
				distance = [];
			}
		}}
	/>
	<br />
	<div class="h-24 w-full">
		{#if distance.length}
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
			disabled={!routeSelected}
			class:route-selected={routeSelected}
			class="schedule-ride flex flex-row gap-2"
		>
			Schedule Ride
			<Icon icon="raphael:future" style="font-size:x-large" />
		</button>
		<button
			bind:this={requestButton}
			disabled={!routeSelected}
			class:route-selected={routeSelected}
			class="submit-ride"
		>
			Request Ride Now</button
		>
	</div>
</div>

<style lang="postcss">
	* {
		@apply focus:outline-blue-950;
	}
	.schedule-ride {
		transition: box-shadow ease-in 500ms;
		@apply disabled:bg-slate-400 disabled:text-gray-700 disabled:cursor-not-allowed border border-black text-black p-2 rounded shadow-none;
	}
	.submit-ride {
		transition: box-shadow ease-in 500ms;
		@apply disabled:bg-slate-400 disabled:text-gray-700 disabled:cursor-not-allowed bg-violet-700 text-white p-2 rounded shadow-none;
	}
	.route-selected {
		@apply shadow-gray-500 shadow-lg;
	}
</style>
