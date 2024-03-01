import { writable } from 'svelte/store';

// used to persist the email and password locally to aide in
const authLocal = writable({
	email: '',
	password: ''
});

export default authLocal;
