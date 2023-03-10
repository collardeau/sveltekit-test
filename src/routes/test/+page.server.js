import { fail } from '@sveltejs/kit';

const endpoint = 'https://dummyjson.com/products?limit=3';

const fakeError = false;

export const actions = {
	test: async (event) => {
		const formData = await event.request.formData();
		const text = formData.get('userText');
		try {
			if (fakeError) throw new Error('Oops, something went wrong!');
			const res = await fetch(endpoint);
			const data = await res.json();
			return {
				success: true,
				thing: data.products[0].description
			};
		} catch (error) {
			return fail(500, { success: false, error: error.message, text });
		}
	}
};
