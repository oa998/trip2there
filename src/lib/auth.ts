import { goto } from '$app/navigation';
import authLocal from '$stores/auth-local';
import { applyToken, resetSession } from '$stores/session';
import { writable } from 'svelte/store';
import { peekFor401, throwIfNot2xx } from './fetch-utils';
import { toastErrorCatch, toastMsg } from './toast';
export const pingCompleted = writable(false);

export const signin = async (email: string, password: string, jwtDuration: 1 | 7) => {
	authLocal.set({ email, password });
	return fetch(`/data/auth/login?jwtDuration=${jwtDuration}`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify({
			email,
			password
		})
	})
		.then(throwIfNot2xx)
		.then(() => toastMsg('Logged in'))
		.then(() => {
			authLocal.set({ email: '', password: '' });
		});
};

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
		.then((r) => {
			return r.json(); // { verified: boolean }
		});
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
		.then((r) => r.text()) // token
		.then((token) => applyToken(token))
		.catch(() => {
			/* do nothing */
		})
		.then(() => {
			pingCompleted.set(true);
		});
}

export function signup(body: { email: string; password: string; phoneNumber: string }) {
	authLocal.set({ email: body.email, password: body.password });

	return fetch(`/data/auth/signup`, {
		method: 'POST',
		headers: {
			['content-type']: 'application/json'
		},
		body: JSON.stringify(body)
		// credentials: 'include'
	})
		.then(peekFor401)
		.then(throwIfNot2xx);
}
