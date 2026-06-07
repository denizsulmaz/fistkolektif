import { writable } from 'svelte/store';

export const currentAct = writable<number>(1);
export const scrollProgress = writable<number>(0);
export const activeNode = writable<string | null>(null);
