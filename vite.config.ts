import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/data': {
				// target: 'https://trip2there-server-bulntd73xq-uc.a.run.app',
				target: 'http://localhost:3000',
				rewrite: (path) => {
					return path.replace(/^\/data/, '');
				},
				changeOrigin: true
			}
		}
	}
});
