import { writable } from 'svelte/store';

const isLoading = writable(false);
export default isLoading;
