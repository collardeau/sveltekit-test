export const load = async ({ fetch }) => {
	const response = await fetch('https://dummyjson.com/products?limit=3');
	const products = await response.json();
	return {
		name: 'Billy',
		products
	};
};
