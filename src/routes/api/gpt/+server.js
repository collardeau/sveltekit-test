import { json } from '@sveltejs/kit';
import gpt from '$lib/openai/chatgpt';

export const POST = async ({ request }) => {
	const stuff = await gpt();
	return json({ success: true, thing: stuff });
};
