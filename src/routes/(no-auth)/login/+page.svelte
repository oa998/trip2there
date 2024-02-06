<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Center from '$components/center.svelte';
	import { toastErrorMsg, toastMsg } from './../../../lib/toast.ts';

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const data = new FormData(event.currentTarget);
		const body: Record<string, string> = {};
		body.email = data.get('email') as string;
		body.password = data.get('password') as string;
		const jwtDuration = data.get('expired') == 'on' ? 7 : 1;

		const response = await fetch(`/data/auth/login?jwtDuration=${jwtDuration}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(body)
		});

		const success = response.status == 200;

		if (success) {
			toastMsg('Logged in');
			goto(`${base}/route`);
		} else {
			toastErrorMsg('Unsuccessful. Try again.');
		}
	}
</script>

<Center>
	<form on:submit|preventDefault={handleSubmit}>
		<div class="flex flex-col">
			<input name="email" id="email" type="text" />
			<label for="email">Email</label>
		</div>
		<div class="flex flex-col">
			<input name="password" id="password" type="password" />
			<label for="password">Password</label>
		</div>

		<div class="flex flex-row gap-3">
			<input name="expired" type="checkbox" id="expired" />
			<label for="expired">Stay logged in for a week</label>
		</div>

		<button type="submit" class="button primary">Log In</button>
	</form>
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
	button[type='submit'] {
		@apply self-end;
	}
</style>
