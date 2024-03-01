import { throwIfNot2xx } from './fetch-utils';

export type User = {
	user_id: string;
	email: string;
	phone_number: string;
	verified_email: 0 | 1;
	verified_phone: 0 | 1;
	preferred_name: string;
};

export const getUser = async (email: string) => {
	return fetch(`/data/profile/get-profile`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify({
			email
		})
	})
		.then(throwIfNot2xx)
		.then<User>((r) => r.json());
};

export const updatePhoneNumber = async (email: string, phoneNumber: string) => {
	return fetch(`/data/profile/update-phone-number`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify({
			email,
			phoneNumber
		})
	})
		.then(throwIfNot2xx)
		.then<User>((r) => r.json());
};

export const updatePreferredName = async (email: string, preferredName: string) => {
	return fetch(`/data/profile/set-preferred-name`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify({
			email,
			preferredName
		})
	})
		.then(throwIfNot2xx)
		.then<User>((r) => r.json());
};

export const requestPhoneVerification = async (email: string) => {
	return fetch(`/data/profile/ask-for-phone-verification`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify({
			email
		})
	})
		.then(throwIfNot2xx)
		.then<{ status: string }>((r) => r.json());
};

export const submitPhoneVerification = async (email: string, verificationNumber: string) => {
	return fetch(`/data/profile/submit-phone-verification`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify({
			email,
			verificationNumber
		})
	})
		.then(throwIfNot2xx)
		.then<{ status: string }>((r) => r.json());
};
