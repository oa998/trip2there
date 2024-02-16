<script lang="ts">
	import Center from '$components/center.svelte';
	import Header from '$components/header.svelte';
	import LoadingButton from '$components/loading-button.svelte';
	import { signup } from '$lib/auth.ts';
	import isLoading from '$stores/loading';
	import { toastMsg } from './../../../lib/toast.ts';

	let email = 'asdf@asdf.asdf';
	let password = 'asdfasdf';
	let confirmPassword = 'asdfasdf';
	let phoneNumber = '';

	async function handleSubmit() {
		const body = { email, password, phoneNumber: `1${phoneNumber.replace(/\D/g, '')}` };

		$isLoading = true;
		try {
			const response = await signup(body);
			const success = response.status == 200;

			if (success) {
				toastMsg('success?');
				// sessionPing().then(() => goto(`${base}/route`));
			} else {
				// try {
				// 	const { message } = await response.json();
				// 	if (message.includes('Needs to verify email')) {
				// 	} else {
				// 		toastErrorMsg(message);
				// 	}
				// } catch (e) {
				// 	console.log(e);
				// }
			}
		} catch (e) {
			console.log(e);
		} finally {
			$isLoading = false;
		}
	}
	$: {
		if (/^\d{3}$/.test(phoneNumber)) {
			phoneNumber += '-';
		} else if (/^\d{3}-\d{3}$/.test(phoneNumber)) {
			phoneNumber += '-';
		}
	}
</script>

<Header />
<Center>
	<form on:submit|preventDefault={handleSubmit} class:disable={$isLoading}>
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
		<div class="flex flex-col justify-end">
			<div class="flex flex-row">
				<div class="self-center border border-black bg-gray-300 text-gray-600 rounded-l h-full p-1">
					+1
				</div>
				<input
					name="phone"
					id="phone"
					type="text"
					on:input={(e) => {
						if (e.inputType == 'deleteContentBackward' && /-$/.test(phoneNumber)) {
							phoneNumber = phoneNumber.split('').slice(0, -2).join('');
						}
					}}
					class:disable={$isLoading}
					bind:value={phoneNumber}
					required
					placeholder="731-555-5555"
					title={`Area code and phone number. example: 731-555-5555`}
					pattern="^\d\d\d-\d\d\d-\d\d\d\d$"
					class="w-full"
					maxlength="12"
				/>
			</div>
			<label for="phone">Phone number</label>
		</div>

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
