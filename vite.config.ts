import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/data': {
				target: 'https://anything-storage-glovbogi2a-uc.a.run.app',
				rewrite: (path) => {
					return path.replace(/^\/data/, '');
				},
				changeOrigin: true
			}
		}
	}
});
