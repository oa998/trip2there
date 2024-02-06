<script>
	import { session } from '$stores/session';
</script>

{#if $session.email}
	<div class="text-black">{$session.email}</div>
{/if}
<slot />
