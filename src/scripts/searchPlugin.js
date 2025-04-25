async function scrollToTop(search, next) {
	window.scroll({ top: 0, left: 0, behavior: 'smooth' });

	await next();
}

export const searchPlugin = (controller) => {
	controller.store.custom.respondAt = '(max-width: 768px)';

	// log the store on each search
	controller.on('afterStore', async ({ controller }, next) => {
		controller.log.warn('Snap is Alive!');
		controller.log.debug('store', controller.store.toJSON());

		await next();
	});

	controller.on('afterStore', scrollToTop);

	controller.on('afterStore', async ({ controller }, next) => {
		controller.store.results.forEach((result) => {
			result.custom.srcSet = result.mappings?.core?.imageUrl.replace('600x600', '{width}x');
		});

		await next();
	});

	controller.on('afterSearch', async ({ response }, next) => {
		response.results.forEach((result, index) => {
			// preload first few images
			const preloadCount = 8;
			if (index < preloadCount) {
				const img = new Image();
				img.src = result.mappings?.core?.imageUrl;
			}
		});

		await next();
	});
};
