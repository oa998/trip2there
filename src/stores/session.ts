import { browser } from '$app/environment';
import { jwtDecode } from 'jwt-decode';
import { writable } from 'svelte/store';

type Session = {
	email: string;
	orgsAndRoles: { org_name: string; role_name: string }[];
	initial?: boolean;
};

const email = browser && sessionStorage.getItem('email');
export const session = writable<Session>({
	email: email || '',
	orgsAndRoles: [],
	initial: true // used to prevent clearing the session on startup
});

session.subscribe((v) => {
	if (!browser) return;
	if (v.email) {
		sessionStorage.setItem('email', v.email);
	} else if (!v.initial) {
		// only remove after the first initializtion
		sessionStorage.removeItem('email');
	}
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
		session.set({
			email: decoded?.email,
			orgsAndRoles: decoded?.orgsAndRoles
		});
	} else {
		resetSession();
	}
};
