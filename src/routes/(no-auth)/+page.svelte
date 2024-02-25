<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Company from '$components/company.svelte';
	import { session } from '$stores/session';
</script>

<div class="grid relative place-items-center h-full">
	<div class="text-center">
		<div class="flex flex-col">
			<Company />
			<div class="subtitle z-20">We'll drive, you ride</div>
		</div>
		<img src={`${base == '/' ? '' : base}/car.webp`} alt="car" class="masked translate-up" />

		<div class="flex flex-row justify-around translate-up">
			{#if $session.email}
				<div class="flex flex-col">
					<div>Logged in - <b>{$session.email}</b></div>
					<a href={`${base}/route`} class="underline text-lg">Request a ride</a>
				</div>
			{:else}
				<button class="button secondary" on:click={() => goto(`${base == '/' ? '' : base}/signup`)}>
					Create Account
				</button>
				<button class="button primary" on:click={() => goto(`${base == '/' ? '' : base}/login`)}>
					Log In
				</button>
			{/if}
		</div>
	</div>
</div>
