<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import LoadingButton from '$components/loading-button.svelte';
	import { toastErrorCatch, toastMsg } from '$lib/toast';
	import { getUser, requestPhoneVerification, submitPhoneVerification } from '$lib/user';
	import isLoading from '$stores/loading';
	import { session } from '$stores/session';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let value: string = '';
	let phoneNumber = '';

	function initiateVerification() {
		$isLoading = true;

		Promise.all([
			getUser($session.email)
				.then((u) => {
					const matches = /^(\d{1,3})(\d{0,3})(\d{0,4})$/.exec(u.phone_number.replace(/\D/g, ''));
					if (!matches?.[3]) {
						throw new Error(
							`Your phone number, ${u.phone_number}, isn't valid. Please go update it.`
						);
					}
					phoneNumber = `${matches[1]}-${matches[2]}-${matches[3]}`;
				})
				.catch(toastErrorCatch),
			requestPhoneVerification($session.email)
				.then(({ status }) => {
					if (status === 'Already verified') {
						toastMsg('Your phone is already verified.');
						goto(`${base}/profile`);
					}
				})
				.catch(toastErrorCatch)
		]).then(() => ($isLoading = false));
	}

	onMount(() => {
		initiateVerification();
	});

	function submitVerificationCode() {
		$isLoading = true;
		submitPhoneVerification($session.email, value)
			.then(({ status }) => {
				toastMsg(status);
				return goto(`${base}/profile`);
			})
			.catch((e) => {
				toastErrorCatch(e);
			})
			.then(() => ($isLoading = false));
	}
</script>

<div class="p-5 grid relative place-items-center h-[70lvh]">
	{#if $isLoading}
		<Icon icon="line-md:loading-loop" style="font-size:xxx-large" />
	{:else}
		<div class="flex flex-col gap-10">
			<div class="text-center text-sm px-10">
				A verification code was sent to your phone at <b>{phoneNumber}</b>. Please type it below and
				submit to verify your phone number.
			</div>
			<div class="text-center text-xs px-10 italic">
				If this is not your phone number, go back to your profile and update your phone number.
			</div>
			<div class="flex flex-col self-center w-3/4">
				<input
					name="phone-validation"
					id="phone-validation"
					type="text"
					bind:value
					class="text-3xl text-center"
					style="letter-spacing: 0.5rem"
					maxlength="6"
				/>
				<label for="phone-validation">Verification Number</label>
			</div>
			<LoadingButton
				on:click={submitVerificationCode}
				class="button primary self-center"
				disabled={$isLoading || value.length != 6}>Submit</LoadingButton
			>
		</div>
	{/if}
</div>
