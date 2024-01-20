<script lang="ts">
	import { base } from '$app/paths';
	import Center from '$components/center.svelte';
</script>

<Center>
	<div class="text-center">
		<div class="flex flex-row w-full justify-center gap-1 items-center">
			<div class="title font-anybody font-bold">Trip</div>
			<div class="title font-anybody bigger shadowz">2</div>
			<div class="title font-anybody font-bold">There</div>
		</div>
		<div class="subtitle">One App, Endless Trips</div>
		<img src={`${base == '/' ? '' : base}/car.webp`} alt="car" class="masked translate-up" />

		<div class="flex flex-row justify-around translate-up">
			<button class="button secondary">
				<a href={`${base == '/' ? '' : base}/signup`}> Create Account </a>
			</button>
			<button class="button primary">
				<a href={`${base == '/' ? '' : base}/login`}>Log In</a>
			</button>
		</div>
	</div>
</Center>

<style lang="postcss">
	.title {
		@apply text-5xl relative z-10;
	}
	.subtitle {
		@apply text-lg relative z-10;
	}
	.bigger {
		font-size: 5rem;
	}
	.shadowz {
		text-shadow: 0 0 10px #000090;
		background: transparent;
	}
</style>
