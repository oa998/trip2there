<script lang="ts">
	export let vertically = true;
	export let horizontally = true;
	let clazz = '';
	export { clazz as class };
</script>

<div
	class:justify-center={horizontally && !vertically}
	class:place-items-center={horizontally && vertically}
	class:h-no-header={vertically}
	class={`grid relative ${clazz}`}
>
	<slot />
</div>

<style lang="postcss">
	.h-no-header {
		height: calc(90% - 56px);
	}
</style>
