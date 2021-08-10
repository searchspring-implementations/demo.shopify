async function scrollToTop(search, next) {
	window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	await next();
}

export const middleware = (controller) => {
	// log the store
	controller.on('afterStore', async ({ controller }, next) => {
		controller.log.debug('store', controller.store.toJSON());
		await next();
	});

	controller.on('afterStore', scrollToTop);

	controller.on('afterStore', async ({ controller }, next) => {
		controller.store.results.forEach((result) => {
			// "//cdn.shopify.com/s/files/1/0584/1721/7736/products/navy-blue-chakra-bracelet_925x_fdde53d6-fbed-4fef-967e-514c0b290bf4_{width}x.jpg?v=1626791971"
			result.custom.srcSet = result.mappings?.core?.imageUrl.replace('600x600', '{width}x');
		});

		await next();
	});
};
