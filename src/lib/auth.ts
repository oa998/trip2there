import { goto } from '$app/navigation';
import { toastMsg } from './toast';

export const signout = () => {
	return fetch('/data/auth/sign-out');
};

export const isLoggedIn = () => {
	return fetch('/data/auth/ping').then(async (r) => {
		if (r.status != 200) {
			await signout();
			const json = await r.json();
			await new Promise((r) => setTimeout(r, 2000));
			throw new Error(json.message);
		}
	});
};

export const signoutAndHome = () => {
	signout().then(() => {
		toastMsg('Logged out');
		goto('/');
	});
};
