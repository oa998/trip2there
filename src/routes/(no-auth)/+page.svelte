<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Center from '$components/center.svelte';
	import Company from '$components/company.svelte';
</script>

<Center>
	<div class="text-center">
		<Company />
		<div class="subtitle">One App, Endless Trips</div>
		<img src={`${base == '/' ? '' : base}/car.webp`} alt="car" class="masked translate-up" />

		<div class="flex flex-row justify-around translate-up">
			<button class="button secondary" on:click={() => goto(`${base == '/' ? '' : base}/signup`)}>
				Create Account
			</button>
			<button class="button primary" on:click={() => goto(`${base == '/' ? '' : base}/login`)}>
				Log In
			</button>
		</div>
	</div>
</Center>
