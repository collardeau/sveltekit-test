import { OPENAI_KEY } from '$env/static/private';

const moderate = false; // only applies to last message for now

export default async function gpt(
	chatMessages = [],
	options = {
		model: 'gpt-3.5-turbo'
		// temperature: 1,
		// top_p: 1,
		// n: 1,
		// stream: false,
		// max_tokens: 4096
		// https://platform.openai.com/docs/api-reference/chat/create
	}
) {
	// Check for API key
	if (!OPENAI_KEY) throw new Error('No API key found.');

	// Convert the input to an array, if necessary
	let userInput = Array.isArray(chatMessages) ? chatMessages : [chatMessages];

	// Extract only the 'model' and 'content' properties from each message object
	userInput = userInput.map((message) => {
		return {
			model: message.model,
			content: message.content
		};
	});

	// Validate input messages and accumulate character count
	let characterCount = 0;
	userInput.forEach((message, index) => {
		if (!message?.content?.trim())
			throw new Error(`Invalid message at index ${index}. Must have non-empty "content" property.`);
		if (!message.role) message.role = 'user';
		characterCount += message.content.length;
	});

	// Calculate tokens from character count with a very cheap tokenizer
	const tokens = characterCount / 4;

	// Check tokens against limit
	const MAX_TOKENS = 2000;
	if (tokens > MAX_TOKENS) throw new Error('Messages are too long. Please shorten your messages.');

	// Moderation check
	if (moderate) {
		const lastMsg = userInput[userInput.length - 1].content;
		const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${OPENAI_KEY}`
			},
			method: 'POST',
			body: JSON.stringify({
				input: lastMsg
			})
		});
		const moderationData = await moderationRes.json();
		const [results] = moderationData.results;
		// console.log(results);
		if (results.flagged) {
			console.warn('flagged: ', results);
			throw new Error('Query flagged by openai');
		}
	}

	// Generate chat response using OpenAI API

	const opts = {
		...options,
		messages: userInput
	};

	const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
		headers: {
			Authorization: `Bearer ${OPENAI_KEY}`,
			'Content-Type': 'application/json'
		},
		method: 'POST',
		body: JSON.stringify(opts)
	});

	const responseData = await chatResponse.json();

	if (!chatResponse.ok) {
		console.error(responseData);
		throw new Error(responseData);
	}
	return {
		content: responseData.choices[0].message.content
	};
}
