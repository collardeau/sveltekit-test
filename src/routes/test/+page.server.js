import { fail, json } from '@sveltejs/kit';
import gpt from '$lib/openai/chatgpt';

export const actions = {
	test: async (event) => {
		const endpoint = 'https://dummyjson.com/products?limit=3';
		try {
			// throw new Error('Oops, something went wrong!');
			const res = await fetch(endpoint);
			const data = await res.json();
			return {
				success: true,
				content: data.products[0].description
			};
		} catch (error) {
			return fail(500, { success: false, error: error.message });
		}
	},
	gpt: async ({ request }) => {
		const formData = await request.formData();
		const text = formData.get('userText');
		try {
			const { content } = await gpt(text);
			return {
				success: true,
				content
			};
		} catch (error) {
			return fail(500, { success: false, error: error.message, text });
		}
	}
};
