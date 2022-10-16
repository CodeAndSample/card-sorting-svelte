import { writable } from 'svelte/store';

// TODO https://javascript.plainenglish.io/writing-a-svelte-store-with-typescript-22fa1c901a4
// TODO https://github.com/vercel/beginner-sveltekit/blob/main/course/11-stores/src/lib/ShoppingCart.svelte
const basketsVariable = [
	{
		name: 'Basket 1',
		items: ['Orange', 'Pineapple']
	},
	{
		name: 'Basket 2',
		items: ['Banana', 'Apple']
	},
	{
		name: 'Basket 3',
		items: ['GrapeFruit']
	}
];
export let baskets = writable(basketsVariable);
