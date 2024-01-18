<script lang="ts">
	import { base } from '$app/paths';
</script>

<div class="grid place-items-center h-full relative">
	<div class="text-center">
		<div class="title">Rides 2U</div>
		<div class="subtitle">We'll get you there</div>
		<img src="/car.webp" alt="car" class="masked translate-up" />

		<div class="flex flex-row justify-around translate-up">
			<a href={`${base}/signup`} class="button secondary"> Create Account </a>
			<a href={`${base}/login`} class="button primary"> Log In </a>
		</div>
	</div>
</div>

<style lang="postcss">
	.title {
		@apply text-5xl font-bold relative z-10;
	}
	.subtitle {
		@apply text-lg relative z-10;
	}
	.translate-up {
		transform: translateY(-100px);
	}

	.masked {
		position: relative;
		-webkit-mask-image: linear-gradient(transparent, black 20%, black 80%, transparent);
		mask-image: linear-gradient (transparent, black 20%, black 80%, transparent);
	}
</style>
