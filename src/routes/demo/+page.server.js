import { fail } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	try {
		// Load data from API
		await new Promise((resolve) => setTimeout(resolve, 500));
		// throw new Error('Something went wrong!');
		return {
			posts: [
				{ id: 1, title: 'Post 1', content: 'Lorem ipsum 1' },
				{ id: 2, title: 'Post 2', content: 'Lorem ipsum 2' }
			]
		};
	} catch (error) {
		console.error('Failed to load data:', error);
		return {
			posts: [],
			error: 'Could not load data'
		};
	}
};

export const actions = {
	test: async ({ request }) => {
		try {
			// const formData = await request.formData();
			// const userText = formData.get('userText');
			// Process form data
			await new Promise((resolve) => setTimeout(resolve, 500));
			// throw new Error('Oops, something went wrong in a form action.');
			return {
				success: true,
				message: `Your form was successfully processed.`
			};
		} catch (error) {
			console.error(error.message);
			return fail(500, { success: false, error: 'Unable to process form' });
		}
	}
};
