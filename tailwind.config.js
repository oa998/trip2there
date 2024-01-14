/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				serif: ['Hepta Slab Variable', 'serif'],
				sans: ['Quicksand Variable', 'sans-serif']
			}
		}
	},
	safelist: [
		// {
		// 	pattern: /place-self-center/
		// }
	],
	plugins: []
};
