import { OPENAI_KEY } from '$env/static/private';

// Define the chat response generator function
export default async function gpt(chatMessages) {
	// Check for the OpenAI API key
	if (!OPENAI_KEY) throw new Error('No API key found.');

	// Convert the input to an array, if necessary
	let userInput = Array.isArray(chatMessages) ? chatMessages : [chatMessages];

	// Validate input messages and accumulate character count
	let characterCount = 0;
	userInput.forEach((message, index) => {
		if (!message?.content?.trim())
			throw new Error(`Invalid message at index ${index}. Must have non-empty "content" property.`);
		if (!message.role) message.role = 'user';
		characterCount += message.content.length;
	});

	// Calculate tokens from character count
	const tokens = characterCount / 4; // very cheap tokenizer

	// Check tokens against limit
	const MAX_TOKENS = 2000;
	if (tokens > MAX_TOKENS) throw new Error('Messages are too long. Please shorten your messages.');

	// TODO: Generate chat response using OpenAI API
	console.log(userInput);

	// Dummy chat response for testing
	return {
		content: 'This is a dummy response.'
	};
}
