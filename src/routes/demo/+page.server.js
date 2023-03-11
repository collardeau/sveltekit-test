import { fail } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	try {
		// load some data here
		await new Promise((resolve) => setTimeout(resolve, 1000));
		// throw new Error('Something went wrong!');
		return {
			posts: [
				{ id: 1, title: 'Post 1', content: 'Lorem ipsum 1' },
				{ id: 2, title: 'Post 2', content: 'Lorem ipsum 2' }
			]
		};
	} catch (error) {
		console.error(error);
		return {
			posts: [],
			error: 'Could not load data'
		};
	}
};

export const actions = {
	test: async (event) => {
		try {
			// do some processing here
			await new Promise((resolve) => setTimeout(resolve, 500));
			// throw new Error('Oops, something went wrong!');
			return {
				success: true,
				message: 'your form was successfully processed'
			};
		} catch (error) {
			return fail(500, { success: false, error: error.message });
		}
	}
};
