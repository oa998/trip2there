import { writable } from 'svelte/store';

export const images = writable<{ link: string; id: string }[]>([]);
