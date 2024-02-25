<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Center from '$components/center.svelte';
	import EmailVerification from '$components/email-verification.svelte';
	import Header from '$components/header.svelte';
	import LoadingButton from '$components/loading-button.svelte';
	import { sessionPing, signin } from '$lib/auth.ts';
	import { toastErrorCatch } from '$lib/toast';
	import isLoading from '$stores/loading';
	import { session } from '$stores/session.ts';

	let needsVerification = false;
	let email = '';
	let password = '';

	let urlParams = new URLSearchParams();
	if (browser) {
		urlParams = new URLSearchParams(window.location.search);
		email = urlParams.get('email') || '';
	}

	$: if ($session.email) {
		goto(`${base}/route`);
	}

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const data = new FormData(event.currentTarget);
		// const body: Record<string, string> = {};
		// body.email = data.get('email') as string;
		// body.password = data.get('password') as string;
		const body = { email, password };
		const jwtDuration = data.get('expired') == 'on' ? 7 : 1;
		$isLoading = true;

		await signin(email, password, jwtDuration)
			.then(() => sessionPing().then(() => goto(`${base}/route`)))
			.catch((e) => {
				if (e.message.includes('Needs to verify email')) {
					goto(`${base == '/' ? '' : base}/signup/verify-email?email=${email}&retry=true`);
				} else {
					toastErrorCatch(e);
				}
			})
			.then(() => ($isLoading = false));
	}
</script>

<Header />

<Center>
	{#if needsVerification}
		<EmailVerification
			{email}
			{password}
			on:log-in-again={() => {
				password = '';
				needsVerification = false;
			}}
		/>
	{:else}
		<form on:submit|preventDefault={handleSubmit} class:disable={$isLoading}>
			<div class="flex flex-col">
				<input name="email" id="email" type="text" bind:value={email} disabled={$isLoading} />
				<label for="email">Email</label>
			</div>
			<div class="flex flex-col">
				<input
					name="password"
					id="password"
					type="password"
					bind:value={password}
					disabled={$isLoading}
				/>
				<label for="password">Password</label>
			</div>

			<div class="flex flex-row gap-3">
				<input name="expired" type="checkbox" id="expired" disabled={$isLoading} />
				<label for="expired">Stay logged in for a week</label>
			</div>

			<LoadingButton type="submit" class="button primary self-end" loading={$isLoading}
				>Log In</LoadingButton
			>
		</form>
	{/if}
</Center>
<div class="flex flex-row w-full justify-center absolute bottom-1">
	<button on:click={() => goto(`${base}/route`)} class="bg-red-300 rounded-full px-3">
		(DEMO) Go directly to trip planning</button
	>
</div>

<style lang="postcss">
	form {
		@apply flex flex-col w-3/4 gap-8;
	}
	input {
		@apply border-b-black border-b py-1 px-3;
	}
	label {
		@apply text-xs;
	}

	form.disable input,
	form.disable label {
		@apply border-gray-400 text-gray-400 bg-transparent;
	}
</style>
