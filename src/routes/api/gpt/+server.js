import { json } from '@sveltejs/kit';
import gpt from '$lib/openai/chatgpt';
import { addItem, getItems } from '$lib/db/mock.js';

export const POST = async ({ request }) => {
	try {
		// throw new Error('Oops, something went wrong!');
		const { tone, content } = await request.json();
		await addItem({ role: 'user', content });
		let msgs = await getItems();
		msgs = [{ role: 'system', content: `use a ${tone} tone` }, ...msgs]; // maybe just put it last?
		console.log(msgs);
		const chatResponse = await gpt(msgs);
		await addItem(chatResponse);
		return json({ success: true, chatResponse });
	} catch (error) {
		console.log(error.message);
		return json({ success: false, error: error.message }, { status: 500 });
	}
};
