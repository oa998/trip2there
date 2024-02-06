import { goto } from '$app/navigation';
import { resetSession } from '$stores/session';
import { peekFor401, throwIfNot2xx } from './fetch-utils';
import { toastErrorCatch, toastMsg } from './toast';

export const signout = () => {
	return fetch('/data/auth/sign-out')
		.then(throwIfNot2xx)
		.then(() => resetSession())
		.then(() => toastMsg('Logged out'))
		.catch(toastErrorCatch);
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
	signout().then(() => goto('/'));
};

export const sendVerificationEmail = (email: string, password: string) => {
	return fetch(`/data/auth/request-verification-email`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify({ email, password })
	})
		.then(throwIfNot2xx)
		.then((r) => toastMsg('Email verification sent'))
		.catch(toastErrorCatch);
};

export function sessionPing() {
	return fetch(`/data/auth/session-ping`, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			['content-type']: 'application/json'
		},
		credentials: 'include'
	})
		.then(peekFor401)
		.then(throwIfNot2xx)
		.then((r) => r.text()); // token
}
