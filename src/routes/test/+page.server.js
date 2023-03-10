export const actions = {
	test: async (event) => {
		const formData = await event.request.formData();
		let response = await fetch('https://dummyjson.com/products?limit=3');
		response = await response.json();
		return {
			success: true,
			response: response.products[0].description
		};
	}
};
