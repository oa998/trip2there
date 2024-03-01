<script lang="ts">
	import { toastErrorCatch, toastMsg } from '$lib/toast';
	import { updatePreferredName } from '$lib/user';
	import isLoading from '$stores/loading';
	import { session } from '$stores/session';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let preferredName: string;
	let disablePreferredName = true;
	const dispatch = createEventDispatcher();

	const cleanPreferredName = (n) => {
		if (!n) return null;
		// extra white space condensed to one. if all white-space, remove.
		const clean = n.replace(/\s+/g, ' ').replace(/^\s+$/, '');
		if (!clean) return null;
		return clean;
	};
</script>

<div class="flex flex-col gap-1">
	<div class="flex flex-row gap-2 items-start">
		<div class="w-full flex flex-col">
			<input type="text" bind:value={preferredName} disabled={disablePreferredName} />
			<span class="text-xs text-black">preferred name</span>
		</div>
		{#if disablePreferredName}
			<button
				class="rounded border border-gray-700 flex aspect-square h-fit p-1"
				on:click={() => (disablePreferredName = false)}
			>
				<Icon icon="mdi:pencil" class="text-lg aspect-square w-5" />
			</button>
		{:else}
			<button
				class="rounded border border-green-800 flex aspect-square h-fit p-1 disabled:cursor-not-allowed disabled:border-gray-200"
				on:click={() => {
					$isLoading = true;
					updatePreferredName($session.email, cleanPreferredName(preferredName))
						.then((u) => {
							toastMsg(`Updated`);
							dispatch('preferred-name-updated');
						})
						.catch((e) => {
							toastErrorCatch(e);
						})
						.then(() => {
							$isLoading = false;
							disablePreferredName = true;
						});
				}}
			>
				<Icon icon="ph:floppy-disk-duotone" color="green" class="text-2xl aspect-square w-5" />
			</button>
		{/if}
	</div>
</div>
