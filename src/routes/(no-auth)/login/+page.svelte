<script lang="ts">
	import Center from '$components/center.svelte';
	import { toastErrorMsg, toastMsg } from './../../../lib/toast.ts';

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const data = new FormData(event.currentTarget);
		const body: Record<string, string> = {};
		body.username = data.get('username') as string;
		body.password = data.get('password') as string;
		const jwtDuration = 1;

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
			toastMsg('success');
		} else {
			toastErrorMsg('not success');
		}
	}
</script>

<Center>
	<form on:submit|preventDefault={handleSubmit}>
		<div class="flex flex-col">
			<input name="username" id="username" type="text" />
			<label for="username">Username</label>
		</div>
		<div class="flex flex-col">
			<input name="password" id="password" type="password" />
			<label for="password">Password</label>
		</div>

		<div class="flex flex-row gap-3">
			<input type="checkbox" id="expired" />
			<label for="expired">Stay logged in for a week</label>
		</div>

		<button type="submit" class="button primary">Log In</button>
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
	button[type='submit'] {
		@apply self-end;
	}
</style>
