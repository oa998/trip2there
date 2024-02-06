import { browser } from '$app/environment';
import { jwtDecode } from 'jwt-decode';
import { writable } from 'svelte/store';

type Session = {
	email: string;
	orgsAndRoles: { org_name: string; role_name: string }[];
};

export const session = writable<Session>({
	email: '',
	orgsAndRoles: []
});

export const resetSession = () => {
	if (!browser) return;
	session.set({
		email: '',
		orgsAndRoles: []
	});
};

export const applyToken = (token: string) => {
	if (token) {
		const decoded = jwtDecode(token) satisfies {
			email: string;
			orgsAndRoles: { org_name: string; role_name: string }[];
		};
		console.log({ decoded });
		session.set({
			email: decoded?.email,
			orgsAndRoles: decoded?.orgsAndRoles
		});
	} else {
		console.log('resetting');
		resetSession();
	}
};
