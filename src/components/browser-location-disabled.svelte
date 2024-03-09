<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	function agentHas(keyword) {
		return navigator.userAgent.toLowerCase().search(keyword.toLowerCase()) > -1;
	}

	function isIE() {
		return !!document.documentMode;
	}

	function isSafari() {
		return (
			(!!window.ApplePaySetupFeature || !!window.safari) &&
			agentHas('Safari') &&
			!agentHas('Chrome') &&
			!agentHas('CriOS')
		);
	}

	function isChrome() {
		return agentHas('CriOS') || agentHas('Chrome') || !!window.chrome;
	}

	function isFirefox() {
		return agentHas('Firefox') || agentHas('FxiOS') || agentHas('Focus');
	}

	function whichBrowser() {
		if (isFirefox()) {
			return 'Firefox';
		} else if (isIE()) {
			return 'Internet Explorer';
		} else if (isChrome()) {
			return 'Chrome';
		} else if (isSafari()) {
			return 'Safari';
		} else {
			return 'Unknown';
		}
	}
	let browser = '';
	onMount(() => {
		browser = whichBrowser();
	});
</script>

<div class="w-full grid place-items-center relative pb-20 gap-5 p-3">
	<h1 class="font-anybody font-semibold text-xl w-full border-b-2 border-black">
		Enable Location Services
	</h1>
	<div class="text-center p-5">
		Sorry, but your browser's <b>location services</b> are disabled. Please enable them to allow us to
		best navigate to you and provide status updates from your driver.
	</div>

	{#if browser == 'Chrome'}
		<div class="flex flex-col gap-3 p-5 items-center bg-slate-300">
			<div class="text-center text-sm pb-2 px-10">
				When loading the page, you may be shown this dialog. Choose "Allow".
			</div>
			<img alt="load" src={`${base}/firefox-allow-location.png`} />
		</div>
		<div class="flex flex-col gap-3 p-5 items-center bg-blue-300">
			<div>
				<div class="text-center text-sm pb-2 px-10">
					If you have already disabled it in the past, you can re-enable it:
				</div>
				<ol class="text-xs list-decimal text-left pl-10">
					<li>Open the menu left of your URL</li>
					<li>Open the <span class="font-bold">Permissions</span> menu</li>
					<li>Set the <span class="font-bold">Locations</span> option to "Allowed"</li>
					<li>Reload the page</li>
				</ol>
			</div>
			<img alt="settings" src={`${base}/chrome-settings-url.png`} />
			<img alt="settings" src={`${base}/chrome-settings-open.png`} />
			<img alt="settings" src={`${base}/chrome-location-blocked.png`} />
			<img alt="settings" src={`${base}/chrome-location-allowed.png`} />
		</div>
	{/if}

	{#if browser == 'Firefox'}
		<div class="flex flex-col gap-3 p-5 items-center bg-slate-300">
			<div class="text-center text-sm pb-2 px-10">
				When loading the page, you may be shown this dialog. Choose "Allow".
			</div>
			<img alt="load" src={`${base}/firefox-allow-location.png`} />
		</div>
		<div class="flex flex-col gap-3 p-5 items-center bg-blue-300">
			<div>
				<div class="text-center text-sm pb-2 px-10">
					If you have already disabled it in the past, you can unblock it:
				</div>
				<ol class="text-xs list-decimal text-left pl-10">
					<li>Open the menu left of your URL</li>
					<li>Click the "X" next to the "Blocked" or "Temporarily Blocked" message</li>
					<li>Reload the page</li>
				</ol>
			</div>
			<img alt="settings" src={`${base}/firefox-unblock-location.png`} />
		</div>
	{/if}

	{#if browser == 'Safari'}
		<div class="flex flex-col gap-3 p-5 items-center bg-slate-300">
			<div class="text-center">
				When loading the page, you may be shown this dialog. Choose "Allow".
			</div>
			<img alt="load" src={`${base}/safari-allow-location.png`} />
		</div>
		<div class="flex flex-col gap-3 p-5 items-center bg-blue-300">
			<div>
				<div class="text-center text-sm pb-2 px-10">
					If you have already disabled it in the past, you can re-enable it:
				</div>
				<ol class="text-xs list-decimal text-left pl-10">
					<li>Right-click on the URL</li>
					<li>Open "Settings"</li>
					<li>Set <span class="font-bold">Location</span> to "Allow"</li>
				</ol>
			</div>
			<img alt="settings" src={`${base}/safari-open-settings.png`} />
			<img alt="enable" src={`${base}/safari-enable-location.png`} />
		</div>
	{/if}
</div>

<style lang="postcss">
	img {
		@apply border-2 border-black w-5/6;
	}
</style>
