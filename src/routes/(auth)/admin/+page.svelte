<script lang="ts">
	import { toastErrorMsg, toastMsg } from '$lib/toast';

	let email = '';
	let driverName = '';

	$: sendEmail = () => {
		fetch('/data/email/test-template', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				email,
				templateInputs: {
					driver_name: driverName
				}
			})
		}).then(async (r) => {
			if (r.status == 200) {
				toastMsg('Email sent');
			} else {
				toastErrorMsg((await r.json()).message);
			}
		});
	};
</script>

<div class="text-xl pt-5 mx-5 font-anybody font-semibold font border-b-2 border-black">Admin</div>

<div class="flex flex-col p-5 gap-3">
	<div>Work In Progress...</div>
	<hr class="border" />
	<div>Send test email alert:</div>
	<div class="flex flex-row items-end">
		<div class="whitespace-nowrap text-xs">to email:</div>
		<input type="text" bind:value={email} class="w-full" />
	</div>
	<div class="flex flex-row items-end">
		<div class="whitespace-nowrap text-xs">driver name:</div>
		<input type="text" bind:value={driverName} class="w-full" placeholder="Billy Bob" />
	</div>
	<button
		class="bg-blue-400 disabled:bg-gray-300"
		disabled={!email || !driverName}
		on:click={sendEmail}>Send</button
	>
</div>
