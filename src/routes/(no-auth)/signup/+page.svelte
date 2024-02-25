<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Center from '$components/center.svelte';
	import PhoneNumber from '$components/form-inputs/phone-number.svelte';
	import Header from '$components/header.svelte';
	import LoadingButton from '$components/loading-button.svelte';
	import { signup } from '$lib/auth.ts';
	import isLoading from '$stores/loading';
	import { toastErrorCatch, toastMsg } from './../../../lib/toast.ts';

	let email = '';
	let password = '';
	let confirmPassword = '';
	let phoneNumber = '';

	async function handleSubmit() {
		const body = {
			email,
			password,
			phoneNumber: phoneNumber.replace(/\D/g, '')
		};

		$isLoading = true;
		await signup(body)
			.then(() => toastMsg('Account created 🎉'))
			.then(() => goto(`${base == '/' ? '' : base}/signup/verify-email?email=${email}`))
			.catch(toastErrorCatch)
			.then(() => ($isLoading = false));
	}
</script>

<Header />
<Center>
	<form on:submit|preventDefault={handleSubmit}>
		<div class="flex flex-col">
			<input
				name="email"
				id="email"
				type="text"
				bind:value={email}
				class:disable={$isLoading}
				title="Requires a valid email address"
				pattern="^[a-z0-9._%+\-]+@[a-z0-9\.\-]+\.[a-zA-Z]+$"
				maxlength="50"
				required
			/>
			<label for="email">Email</label>
		</div>
		<div class="flex flex-col">
			<input
				name="password"
				id="password"
				type="password"
				bind:value={password}
				required
				class:disable={$isLoading}
				title={password.length < 8
					? 'Password must be 8 characters'
					: password.length >= 50
					? 'Password too long. Should be less than 50 characters.'
					: /\s/.test(password)
					? 'Password cannot contain spaces'
					: 'Password invalid'}
				pattern={`^\\S{8,50}$`}
				minlength="8"
			/>
			<label for="password">Password</label>
		</div>
		<div class="flex flex-col">
			<input
				name="confirm-password"
				id="confirm-password"
				type="password"
				bind:value={confirmPassword}
				required
				class:disable={$isLoading}
				title="Must match your initial password"
				pattern={`^${password}$`}
			/>
			<label for="confirm-password">Confirm Password</label>
		</div>

		<PhoneNumber bind:phoneNumber />

		<div class="flex flex-col gap-2">
			<div class="text-xs self-center italic text-gray-700">
				Email and phone verification will be next.
			</div>
			<LoadingButton
				disabled={[email, password, confirmPassword, phoneNumber.length == 12].some((b) => !b)}
				type="submit"
				class="button primary self-center"
				loading={$isLoading}>Create Account</LoadingButton
			>
		</div>
	</form>
</Center>

<style lang="postcss">
</style>
