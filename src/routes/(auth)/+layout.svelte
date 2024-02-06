<script>
	import { base } from '$app/paths';
	import Center from '$components/center.svelte';
	import { session } from '$stores/session';
</script>

{#if $session.email}
	<div class="text-black">{$session.email}</div>
	<slot />
{:else}
	<Center>
		<div class="flex flex-col gap-3 text-center w-full items-center">
			<img src={`${base == '/' ? '' : base}/map.webp`} alt="map" class="masked" />
			<div class="z-10">Please sign in to your account</div>
			<a href={`${base == '/' ? '' : base}/login`} class="button primary"> Log In </a>
		</div>
	</Center>
{/if}
