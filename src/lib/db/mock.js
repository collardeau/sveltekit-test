/**
 * This is a mock database module that provides functions for basic CRUD operations (Create, Read, Update, Delete) on an array of items.
 *
 * The module exports the following functions:
 *
 * - getItems(timeoutMs = 0): Returns the items array with an optional mock delay.
 *
 * - addItem(item, timeoutMs = 0): Adds a new item to the items array with an optional mock delay.
 *
 * - deleteItem(id, timeoutMs = 0): Deletes an item from the items array with the specified ID, with an optional mock delay. If the item is not found, the function will return false.
 *
 * - updateItem(id, updatedItem, timeoutMs = 0): Updates an item in the items array with the specified ID, with an optional mock delay. If the item is not found, the function will return false.
 *
 * - reset(startItems = []): Resets the items array to an array of items. If an array of items is provided as the 'startItems' parameter, those items will be added to the items array. If a single item is provided, it will be converted to an array before being added to the items array.
 *
 * The items in the array are objects with an automatically assigned 'id' property.
 *
 * The module uses asynchronous functions and the 'await' keyword to simulate delays in database operations.
 */

let lastId = 0;

let items = [];

/**
 * Returns the items array.
 * @param {Number} timeoutMs - The number of milliseconds to wait before returning the items array.
 * @returns {Array} The items array.
 */
export async function getItems(timeoutMs = 0) {
	if (timeoutMs) {
		await new Promise((resolve) => setTimeout(resolve, timeoutMs));
	}
	return items;
}

/**
 * Adds a new item to the items array.
 * @param {Object} item - The item to add.
 * @param {Number} timeoutMs - The number of milliseconds to wait before adding the item.
 * @returns {Boolean} Returns true if the item was added successfully.
 */
export async function addItem(item, timeoutMs = 0) {
	if (timeoutMs) {
		await new Promise((resolve) => setTimeout(resolve, timeoutMs));
	}
	const newItem = { ...item, id: generateRandomString(10) };
	items.push(newItem);
	return true;
}

/**
 * Deletes an item from the items array.
 * @param {Number} id - The ID of the item to delete.
 * @param {Number} timeoutMs - The number of milliseconds to wait before deleting the item.
 * @returns {Boolean} Returns true if the item was deleted successfully, or false if the item was not found.
 */
export async function deleteItem(id, timeoutMs = 0) {
	if (timeoutMs) {
		await new Promise((resolve) => setTimeout(resolve, timeoutMs));
	}
	const index = items.findIndex((item) => item.id === id);
	if (index === -1) {
		console.warn(`Item with ID ${id} not found`);
		return false;
	} else {
		items.splice(index, 1);
		return true;
	}
}

/**
 * Updates an item in the items array.
 * @param {Number} id - The ID of the item to update.
 * @param {Object} updatedItem - The updated item object.
 * @param {Number} timeoutMs - The number of milliseconds to wait before updating the item.
 * @returns {Boolean} Returns true if the item was updated successfully, or false if the item was not found.
 */
export async function updateItem(id, updatedItem, timeoutMs = 0) {
	if (timeoutMs) {
		await new Promise((resolve) => setTimeout(resolve, timeoutMs));
	}
	const index = items.findIndex((item) => item.id === id);
	if (index === -1) {
		console.warn(`Item with ID ${id} not found`);
		return false;
	} else {
		items[index] = { ...items[index], ...updatedItem };
		return true;
	}
}

/**
 * Resets the items array to an array of items.
 * @param {Object | Array} startItems - An object or array of items to start with.
 * @returns {Boolean} Returns true.
 */
export async function reset(startItems = []) {
	if (!Array.isArray(startItems)) {
		startItems = [startItems];
	}
	items = [];
	for (const item of startItems) {
		await addItem(item);
	}
	return true;
}

function generateRandomString(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
}
