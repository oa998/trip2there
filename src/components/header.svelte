<script>
	import { session } from '$stores/session';

	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { signout } from '$lib/auth';
	import isLoading from '$stores/loading';
	import Company from './company.svelte';
	import Menu from './menu.svelte';

	const loggedInNav = [
		{
			text: 'Profile',
			class: 'bg-slate-900 border border-slate-500',
			icon: 'ph:user-circle-light',
			action: () => goto(`${base}/profile`)
		},
		{
			text: 'Request Ride',
			class: 'bg-slate-900 border border-slate-200',
			icon: 'clarity:car-line',
			action: () => goto(`${base}/route`)
		},
		{
			text: 'Log out',
			class: 'bg-slate-900 border border-slate-200',
			// icon: 'clarity:car-line',
			action: () =>
				signout().then(() => {
					goto(`/`);
				})
		}
	];

	const loggedOutNav = [
		{
			text: 'Log In',
			class: 'bg-slate-900 border border-slate-200',
			// icon: 'clarity:car-line',
			action: () => goto(`${base}/login`)
		},
		{
			text: 'Create Account',
			class: 'bg-slate-900 border border-slate-200',
			// icon: 'clarity:car-line',
			action: () => goto(`${base}/signup`)
		}
	];
</script>

<div
	class="absolute top-0 left-0 w-full flex flex-row justify-between items-center gap-3 p-2 border-b border-black overflow-hidden pr-10"
>
	<div class="header-bg absolute top-0 left-0 h-[400px]" class:isLoading={$isLoading} />
	<Company header class="flex-0 w-min" />
	{#if $session.email}
		<div class="text-xs sm:text-sm flex-shrink text-ellipsis overflow-hidden z-10">
			{$session.email}
		</div>
	{/if}
</div>
<div class="absolute top-4 right-2">
	{#if $session.email}
		<Menu icon={'ic:round-menu'} actions={loggedInNav} />
	{:else}
		<Menu icon={'ic:round-menu'} actions={loggedOutNav} />
	{/if}
</div>
<div class="mb-14" />

<style lang="postcss">
	.header-bg {
		background-color: white;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23ffffff' stroke-width='0.7' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='rotate(56 1000 750) scale(13.15) translate(-923.95 -692.97)'%3E%3Cuse fill='%23fcfcfc' href='%23s' y='2'/%3E%3Cuse fill='%23fcfcfc' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s'/%3E%3Cuse fill='%23f7f7f7' href='%23s' x='2'/%3E%3Cuse fill='%23f7f7f7' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='rotate(56 1000 750) scale(13.15) translate(-923.95 -692.97)'%3E%3Cg fill='%23f5f5f5'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(56 1000 750) scale(13.15) translate(-923.95 -692.97)'%3E%3Cg fill='%23f5f5f5'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='rotate(56 1000 750) scale(13.15) translate(-923.95 -692.97)'%3E%3Cg fill='%23f2f2f2'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='rotate(56 1000 750) scale(13.15) translate(-923.95 -692.97)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23efefef'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='rotate(56 1000 750) scale(13.15) translate(-923.95 -692.97)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='rotate(56 1000 750) scale(13.15) translate(-923.95 -692.97)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='rotate(56 1000 750) scale(13.15) translate(-923.95 -692.97)'%3E%3Cg fill='%23F60'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E");
		background-attachment: fixed;
		background-size: cover;
		width: calc(1500px * 3);
		animation: slide 90s linear infinite;
	}
	.header-bg.isLoading {
		animation: slide 6s linear infinite;
	}

	@keyframes slide {
		0% {
			transform: translate3d(0, 0, 0);
		}
		100% {
			transform: translate3d(-1500px, 0, 0); /* The image width */
		}
	}
</style>
