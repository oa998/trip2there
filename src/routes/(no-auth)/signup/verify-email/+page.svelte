<script lang="ts">
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import Center from '$components/center.svelte';
	import Header from '$components/header.svelte';
	import { sendVerificationEmail } from '$lib/auth';
	import { toastErrorCatch, toastMsg } from '$lib/toast';
	import authLocal from '$stores/auth-local';
	import isLoading from '$stores/loading';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	let email = '';
	let password = '';
	let retry = false;
	let timeout: number;
	let delayForRetry = 0;
	let flyIn = false;
	let urlParams = new URLSearchParams();
	if (browser) {
		urlParams = new URLSearchParams(window.location.search);
		email = urlParams.get('email') || email;
		retry = urlParams.get('retry') == 'true';
		if (urlParams.get('email') !== $authLocal.email) {
			$authLocal = { email: '', password: '' };
		}
	}

	onMount(() => {
		setTimeout(() => (flyIn = true), 500);
		email = $authLocal.email || urlParams.get('email') || '';
		password = $authLocal.password || '';
	});

	authLocal.subscribe(({ email, password }) => {
		email = $authLocal.email || urlParams.get('email') || '';
		password = $authLocal.password || '';
	});

	$: if (timeout && delayForRetry > 0) {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			delayForRetry--;
		}, 1000);
	}
</script>

<Header />
<div class="grid place-items-center py-10">
	<div class="flex flex-col gap-3">
		<div class="text-center font-anybody text-lg">Almost done - let's finish validation</div>

		<div class="p-2">
			<div class="border border-black p-2 flex flex-col gap-3 overflow-hidden">
				<Center>
					<div class="flex flex-row items-center gap-2">
						<div>Email Verification</div>
					</div>
				</Center>
				<hr class="border-black w-full" />
				<div>
					Check your email <b>{email}</b> for a message from
					<u>noreply@trip2there.com</u>.
				</div>
				{#if flyIn}
					<div
						class="grid place-items-center py-3"
						transition:fly={{
							delay: 0,
							duration: 1300,
							x: -300,
							y: 0,
							opacity: 0.5,
							easing: quintOut
						}}
					>
						<Icon icon="emojione-monotone:envelope" style="font-size:xxx-large" />
					</div>
				{/if}

				<div>
					Once you have verified your email, click <a
						class="underline text-blue-600"
						href={`${base == '/' ? '' : base}/login?email=${email}`}>here</a
					> to go to the Log In page. Logging in will complete the process.
				</div>
				<div class="text-xs">
					<span class="font-bold">Terms of Service reminder:</span> We will send emails to you as a notification
					of service progress. Example, to let you know when your ride has been assigned or has arrived.
					By verifying your email address, you are agreeing to recieve such notifications.
				</div>
			</div>
		</div>
	</div>
</div>

{#if retry}
	<details class="bg-slate-400">
		<summary class="text-center">Need another verification email?</summary>
		<div class="grid place-items-center py-14 gap-2">
			{#if retry && email && $authLocal.password}
				<div class="text-sm text-center px-4">
					if you need another verification email, click "Send again".
				</div>
			{:else if retry && email}
				<div class="text-sm text-center px-4">
					if you need another verification email, input your password below and click "Send again".
				</div>
				<div class="inputs self-center">
					<div class="flex flex-col">
						<input type="text" bind:value={email} disabled />
						<label for="email">Email</label>
					</div>
					<div class="flex flex-col">
						<input type="password" bind:value={password} disabled={$isLoading} />
						<label for="password">Password</label>
					</div>
				</div>
			{/if}
			<button
				class="self-center button secondary bg-white disabled:text-gray-700"
				disabled={delayForRetry || !password}
				on:click={async () => {
					$isLoading = true;
					await sendVerificationEmail(email, password)
						.then(({ verified }) => {
							if (verified) {
								toastMsg('Email verified ✅.Try Logging in.');
							} else {
								toastMsg('Email sent');
								delayForRetry = 30;
								timeout = setTimeout(() => {
									delayForRetry--;
								}, 1000);
							}
						})
						.catch(toastErrorCatch)
						.then(() => ($isLoading = false));
				}}
				>{delayForRetry == 0
					? 'Send again'
					: `Please wait ${delayForRetry} seconds before trying again.`}</button
			>
		</div>
	</details>
{/if}

<style lang="postcss">
	.inputs {
		@apply flex flex-col w-3/4 gap-2 text-sm;
	}
	input {
		@apply border-b-black border-b py-1 px-3 disabled:text-gray-700 disabled:border-b-gray-500;
	}
	label {
		@apply text-xs;
	}
	input:disabled ~ label {
		@apply text-gray-700;
	}
</style>
