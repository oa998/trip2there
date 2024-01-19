<script lang="ts">
	import { base } from '$app/paths';
	import Center from '$components/center.svelte';
</script>

<Center>
	<div class="text-center">
		<div class="title">Rides 2U</div>
		<div class="subtitle">We'll get you there</div>
		<img src="/car.webp" alt="car" class="masked translate-up" />

		<div class="flex flex-row justify-around translate-up">
			<a href={`${base}/signup`} class="button secondary"> Create Account </a>
			<a href={`${base}/login`} class="button primary"> Log In </a>
		</div>
	</div>
</Center>

<style lang="postcss">
	.title {
		@apply text-5xl font-bold relative z-10;
	}
	.subtitle {
		@apply text-lg relative z-10;
	}
</style>
