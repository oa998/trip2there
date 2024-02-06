<script>
	import { sessionPing } from '$lib/auth';
	import '@fontsource-variable/hepta-slab';
	import '@fontsource-variable/quicksand';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { onMount } from 'svelte';
	import '../app.css';

	onMount(() => {
		sessionPing();
	});
</script>

<div class="w-full h-full grid place-items-center">
	<div
		class="w-full h-full max-h-full sm:max-h-[700px] sm:max-w-sm sm:border sm:border-black min-w-[400px] relative"
	>
		<slot />
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
