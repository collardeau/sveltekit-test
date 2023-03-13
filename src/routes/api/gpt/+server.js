import { json } from '@sveltejs/kit';
import gpt from '$lib/openai/chatgpt';
import { addMessage, getMessages } from '$lib/db/mock.js';

export const POST = async ({ request }) => {
	try {
		// throw new Error('Oops, something went wrong!');
		const { tone, content } = await request.json();
		await addMessage({ role: 'user', content });
		let msgs = await getMessages();
		msgs = [{ role: 'system', content: `use a ${tone} tone` }, ...msgs]; // maybe just put it last?
		const chatResponse = await gpt(msgs);
		await addMessage(chatResponse);
		return json({ success: true, chatResponse });
	} catch (error) {
		console.log(error.message);
		return json({ success: false, error: error.message }, { status: 500 });
	}
};
