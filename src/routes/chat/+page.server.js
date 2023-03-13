import { getItems, reset } from '$lib/db/mock.js';

export const load = async () => {
	const startMsg = 'Hello, I am the assistant.';
	reset({ role: 'assistant', content: startMsg }); // mock db reset
	const messages = await getItems();
	return {
		messages
	};
};
