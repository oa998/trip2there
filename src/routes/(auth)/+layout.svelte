<script>
	import { base } from '$app/paths';
	import Center from '$components/center.svelte';
	import { isLoggedIn } from '$lib/auth';
	import '@fontsource-variable/hepta-slab';
	import '@fontsource-variable/quicksand';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import '../../app.css';
	import Loading from './../../components/loading.svelte';

	const loading = false;
</script>

<div class="w-full h-full grid place-items-center">
	<div
		class="w-full h-full max-h-full sm:max-h-[700px] sm:max-w-sm sm:border sm:border-black min-w-[400px] relative"
	>
		{#await isLoggedIn()}
			<Center>
				<Loading />
			</Center>
		{:then}
			<slot />
		{:catch error}
			<Center>
				<div class="flex flex-col gap-3 text-center w-full items-center">
					<img src={`${base == '/' ? '' : base}/map.webp`} alt="map" class="masked" />
					<div class="z-10">Please sign in to your account</div>
					<a href={`${base == '/' ? '' : base}/login`} class="button primary"> Log In </a>
				</div>
			</Center>
		{/await}
	</div>
</div>
<SvelteToast options={{ reversed: true, intro: { y: 192 } }} />

<style lang="postcss">
	:root {
		--toastContainerTop: auto;
		--toastContainerRight: 10px;
		--toastContainerBottom: 10px;
		--toastBarHeight: 0;
	}
</style>
