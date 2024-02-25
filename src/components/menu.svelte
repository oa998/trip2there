<script context="module" lang="ts">
	export type MenuAction = {
		text: string;
		action?: () => void;
		class: string;
		icon?: string;
	};
</script>

<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	let focused = false;
	let intervals: number[] = [];
	const exit = () => {
		intervals.push(setTimeout(() => (focused = false), 500));
	};
	const enter = () => {
		intervals.forEach((i) => clearInterval(i));
		intervals = [];
	};

	export let actions: MenuAction[];
	export let icon: string;
	export let size: string = 'large';
	const dispatcher = createEventDispatcher();

	$: dispatcher('menu-open-close-event', {
		open: focused
	});

	const id = `${Math.floor(Math.random() * 9e10)}`;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class={`relative ${$$props.class}`} on:mouseleave={exit} on:mouseenter={enter}>
	<input type="checkbox" {id} class="hidden" bind:checked={focused} />
	<label for={id} class="flex items-end space-x-1 cursor-pointer">
		<div class="transistion">
			<Icon {icon} class="z-10" style={`font-size: ${size}`} color={focused ? 'black' : 'green'} />
		</div>
	</label>

	<div
		class:ztop={focused}
		class="absolute mt-1 right-1 top-full rounded overflow-hidden min-w-max shadow hidden transition delay-75 ease-in-out z-20"
		on:mouseenter={enter}
		on:mouseleave={exit}
	>
		<ul class="block text-center text-sm text-white">
			{#each actions as action, i}
				<li>
					{#if !action.action}
						<div
							class:rounded-t={i == 0}
							class:rounded-b={i == actions.length - 1}
							class={`icon-flex-container ${action.class}`}
						>
							{#if action.icon}
								<Icon icon={action.icon} color={'white'} style={`font-size: large`} />
							{/if}
							<span>{action.text}</span>
						</div>
					{:else}
						<button
							class:rounded-t={i == 0}
							class:rounded-b={i == actions.length - 1}
							class={`icon-flex-container block w-full hover:text-gray-300 hover:underline hover:brightness-150 ${action.class}`}
							on:click={() => {
								action.action?.();
								focused = false;
							}}
						>
							{#if action.icon}
								<Icon icon={action.icon} color={'white'} style={`font-size: large`} />
							{/if}
							<span class="w-full">{action.text}</span></button
						>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="postcss">
	input[type='checkbox']:checked ~ div {
		display: unset;
	}

	div.transistion {
		transition: transform 100ms linear;
	}
	div.rotate {
		color: green;
	}

	.icon-flex-container {
		@apply flex flex-row gap-2 justify-between items-center px-5 py-1 text-left;
	}

	li {
		list-style: none;
	}

	ul,
	li {
		@apply p-0;
	}
	.ztop {
		@apply z-40;
	}
</style>
