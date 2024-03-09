<script lang="ts">
	import currentLocation from '$stores/current-location';
</script>

<button
	class="underline flex flex-row disabled:brightness-50"
	disabled={$currentLocation.loading || !!$currentLocation.error || !$currentLocation.address}
	on:click
	><span>Use current address</span>
</button>
