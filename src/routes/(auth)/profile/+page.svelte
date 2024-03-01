<script lang="ts">
	import { base } from '$app/paths';
	import PhoneNumber from '$components/form-inputs/phone-number.svelte';
	import PreferredName from '$components/form-inputs/preferred-name.svelte';
	import { getUser, updatePhoneNumber, user } from '$lib/user';
	import isLoading from '$stores/loading';
	import { session } from '$stores/session';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { toastErrorCatch, toastMsg } from './../../../lib/toast.ts';

	let phoneNumber = '';
	let disablePhoneNumber = true;

	user.subscribe((v) => {
		phoneNumber = v?.phone_number || '';
	});

	onMount(async () => {
		if (!$user) getUser($session.email);
	});

	$: phoneNumberValid = phoneNumber.length == 12;
</script>

<div class="text-xl pt-5 mx-5 font-anybody font-semibold font border-b-2 border-black">Profile</div>

{#if !$user && $isLoading}
	<div>Loading...</div>
{:else if !!$user}
	<div class="w-full p-5 pb-10 flex flex-col gap-10 relative">
		<div class="flex flex-col">
			<div class="flex flex-row gap-2">
				<input disabled type="text" class="text-lg w-full" value={$session.email} />
			</div>
			<span class="text-xs text-black">email</span>
		</div>

		<PreferredName
			preferredName={$user.preferred_name}
			on:preferred-name-updated={() => getUser($session.email)}
		/>

		<div class="flex flex-col gap-1">
			<div class="flex flex-row gap-2 items-start">
				<PhoneNumber
					bind:phoneNumber
					disabled={disablePhoneNumber}
					rightLabel={$user?.verified_phone ? 'Verified' : ''}
				/>

				{#if disablePhoneNumber}
					<button
						class="rounded border border-gray-700 flex aspect-square h-fit p-1"
						on:click={() => (disablePhoneNumber = false)}
					>
						<Icon icon="mdi:pencil" class="text-lg aspect-square w-5" />
					</button>
				{:else}
					<button
						class="rounded border border-green-800 flex aspect-square h-fit p-1 disabled:cursor-not-allowed disabled:border-gray-200"
						disabled={!phoneNumberValid}
						on:click={() => {
							// save if phone number is valid (12 digits with "-")
							disablePhoneNumber = phoneNumberValid;
							if (phoneNumberValid && $user?.phone_number != phoneNumber.replace(/\D/g, '')) {
								$isLoading = true;
								updatePhoneNumber($session.email, phoneNumber.replace(/\D/g, ''))
									.then((u) => {
										toastMsg(
											`Phone number updated from ${$user.phone_number} to ${phoneNumber.replace(
												/\D/g,
												''
											)}`
										);
										$user = u;
									})
									.catch((e) => {
										toastErrorCatch(e);
										return getUser($session.email);
									})
									.then(() => ($isLoading = false));
							}
						}}
					>
						<Icon
							icon={phoneNumberValid ? 'ph:floppy-disk-duotone' : 'ph:floppy-disk-light'}
							color={phoneNumberValid ? 'green' : 'lightgray'}
							class="text-2xl aspect-square w-5"
						/>
					</button>
				{/if}
			</div>
			{#if !$user?.verified_phone}
				<div class="text-xs text-right">
					Phone number is <b>not</b> verified.
					<a href={`${base}/profile/verify-phone`} class="underline cursor-pointer text-blue-800"
						>Click to verify.</a
					>
				</div>
			{/if}
		</div>
	</div>

	<div class="flex flex-col gap-4 bg-slate-300 py-10 px-5">
		<div class="flex flex-col gap-1">
			<div class="text-md font-anybody font-semibold font border-b border-black">
				Current trip in progress
			</div>
			<div class="text-sm">No trip in progress.</div>
		</div>

		<div class="flex flex-col gap-1">
			<div class="text-md font-anybody font-semibold font border-b border-black">
				Scheduled Trips
			</div>
			<div class="text-sm">No trips scheduled.</div>
		</div>

		<div class="flex flex-col gap-1">
			<div class="text-md font-anybody font-semibold font border-b border-black">
				Recently Completed Trips
			</div>
			<div class="text-sm">No trips taken yet.</div>
		</div>
	</div>

	<div class="px-20 py-3 text-xs text-center w-full">
		<div>Interested in joining the team as a driver?</div>
		<a href={`${base}/careers`} class="block underline text-blue-800 cursor-pointer">
			Click here to learn more.
		</a>
	</div>
{:else}
	<div>Something went wrong loading your data. Refresh.</div>
{/if}
