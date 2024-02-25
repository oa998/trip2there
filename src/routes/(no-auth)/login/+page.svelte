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

			<LoadingButton
				type="submit"
				class="button primary self-end"
				loading={$isLoading}
				disabled={!email || !password}>Log In</LoadingButton
			>
		</form>
	{/if}
</Center>

<style lang="postcss">
</style>
