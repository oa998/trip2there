<script lang="ts">
	import { sendVerificationEmail } from '$lib/auth';
	import { createEventDispatcher } from 'svelte';

	export let email: string;
	export let password: string;

	let verificationSent = false;

	const dispatch = createEventDispatcher();
</script>

<div class="px-5 flex flex-col gap-5">
	<h1 class="text-2xl">Email Verification</h1>

	<div>
		You haven't verified <b>{email}</b>, yet. Please check your inbox for your verification email.
	</div>

	{#if verificationSent}
		<div>Verification resent to <b>{email}</b>.</div>
	{:else}
		<div>
			If you need another verification email, click <button
				class="link"
				on:click={() => {
					sendVerificationEmail(email, password).then(() => (verificationSent = true));
				}}>here.</button
			>
		</div>
	{/if}

	<div>
		Once you've verified, please
		<button class="link" on:click={() => dispatch('log-in-again')}>log in again.</button>
	</div>
</div>

<style lang="postcss">
	button.link {
		@apply underline text-blue-700;
	}
</style>
