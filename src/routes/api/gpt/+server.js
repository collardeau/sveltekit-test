import { json } from '@sveltejs/kit';

const endpoint = 'https://dummyjson.com/products?limit=3';

export const POST = async ({ request }) => {
	const res = await fetch(endpoint);
	const data = await res.json();
	return json({ success: true, content: data });
};
