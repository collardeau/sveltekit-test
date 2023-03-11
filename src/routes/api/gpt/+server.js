import { json } from '@sveltejs/kit';
import gpt from '$lib/openai/chatgpt';

export const POST = async ({ request }) => {
	try {
		// throw new Error('Oops, something went wrong!');
		const { tone, content } = await request.json();
		const msgs = [
			{ role: 'system', content: `use a ${tone} tone` },
			{ role: 'user', content }
		];
		const chatResponse = await gpt(msgs);
		return json({ success: true, chatResponse });
	} catch (error) {
		console.log(error.message);
		return json({ success: false, error: error.message }, { status: 500 });
	}
};
