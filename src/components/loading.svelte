<script lang="ts">
	import Icon from '@iconify/svelte';
	export let text: string = 'Loading';
</script>

<div class="flex flex-row gap-3">
	<div>{text}</div>
	<Icon icon="line-md:loading-loop" style="font-size:x-large" color="black" />
</div>
