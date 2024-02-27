<script lang="ts">
	import Icon from '@iconify/svelte';

	export let disabled = false;
	export let loading = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	let clazz = '';
	export { clazz as class };
</script>

<button disabled={loading || disabled} {type} class={clazz} on:click>
	<div class="flex flex-row justify-center items-center gap-2">
		<div>
			<slot />
		</div>
		{#if loading}
			<Icon icon="line-md:loading-loop" style="font-size:x-large" />
		{/if}
	</div>
</button>
