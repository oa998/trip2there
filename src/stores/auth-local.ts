import { writable } from 'svelte/store';

// used to persist the email and password locally to aide in
export default writable({
	email: '',
	password: ''
});
