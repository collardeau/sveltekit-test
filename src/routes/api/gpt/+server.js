import { json } from '@sveltejs/kit';
import gpt from '$lib/openai/chatgpt';
import { addItem, getItems } from '$lib/db/mock.js';

// Handle HTTP POST requests
export const POST = async ({ request }) => {
	try {
		// Get tone and content from the request's JSON body
		const { tone, content } = await request.json();
		// Create system and user messages
		const systemMsg = { role: 'system', content: `use a ${tone} tone` };
		const lastMsg = { role: 'user', content };
		//  Retrieve all messages from mock database
		let msgs = await getItems();
		// Add system and user messages to the beginning of the messages array
		msgs = [systemMsg, ...msgs, lastMsg];
		// Generate a chat response based on all messages
		const chatResponse = await gpt(msgs);
		// Add user message and chat response to mock database
		await addItem(lastMsg);
		await addItem(chatResponse);
		// Return success response with chat response
		return json({ success: true, chatResponse });
	} catch (error) {
		// Log error and return error response
		console.log(error.message);
		return json({ success: false, error: error.message }, { status: 500 });
	}
};
