let lastId = 1;

let messages = [
	{
		id: 1,
		role: 'assistant',
		content: 'Hello, how can I assist you today?'
	}
	// {
	// 	id: 2,
	// 	role: 'user',
	// 	content: 'I need help with my account, it seems to be locked out.'
	// },
	// {
	// 	id: 3,
	// 	role: 'assistant',
	// 	content: 'Sure, I can help you with that. Can you please provide me with your account details?'
	// },
];

/**
 * Returns the messages array.
 * @returns {Array} The messages array.
 */
export async function getMessages() {
	return messages;
}

/**
 * Adds a new message to the messages array.
 * @param {Object} message - The message to add.
 * @returns {Boolean} Returns true if the message was added successfully.
 */
export async function addMessage(message) {
	lastId++;
	message.id = lastId;
	messages.push(message);
	return true;
}

/**
 * Deletes a message from the messages array.
 * @param {Number} id - The ID of the message to delete.
 * @returns {Boolean} Returns true if the message was deleted successfully, or false if the message was not found.
 */
export async function deleteMessage(id) {
	const index = messages.findIndex((message) => message.id === id);
	if (index === -1) {
		console.log(`Message with ID ${id} not found`);
		return false;
	}
	messages.splice(index, 1);
	return true;
}

/**
 * Updates a message in the messages array.
 * @param {Number} id - The ID of the message to update.
 * @param {Object} updatedMessage - The updated message object.
 * @returns {Boolean} Returns true if the message was updated successfully, or false if the message was not found.
 */
export async function updateMessage(id, updatedMessage) {
	const index = messages.findIndex((message) => message.id === id);
	if (index === -1) {
		console.log(`Message with ID ${id} not found`);
		return false;
	}
	messages[index] = { ...messages[index], ...updatedMessage };
	return true;
}

/**
 * Resets the messages array to an empty array.
 * @returns {Boolean} Returns true.
 */
export function resetMessages() {
	messages = [];
	lastId = 0;
	return true;
}
