import { getMessages, resetMessages, addMessage } from '$lib/db/mock.js';

export const load = async () => {
	// mock db reset
	resetMessages();
	addMessage({ role: 'assistant', content: 'Hello, I am the assistant :)' });
	// get the messages
	const messages = await getMessages();
	return {
		messages
	};
};
