<script lang="ts">
	export let header = false;
	let clazz = '';
	export { clazz as class };
</script>

<div class={`flex flex-row w-full justify-center gap-1 items-center ${clazz} `}>
	<div class="title font-anybody font-bold" class:text-shrink={header}>Trip</div>
	<div class="title font-anybody bigger shadowz" class:text-shrink={header}>2</div>
	<div class="title font-anybody font-bold" class:text-shrink={header}>There</div>
</div>

<style lang="postcss">
	.title {
		@apply text-5xl relative z-10;
	}
	.bigger {
		font-size: 5rem;
	}
	.shadowz {
		text-shadow: 0 0 10px #000090;
		background: transparent;
	}
	.title.text-shrink {
		@apply text-xl;
	}
	.bigger.text-shrink {
		@apply text-3xl;
	}
</style>
