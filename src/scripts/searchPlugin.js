export const searchPlugin = (controller, site, page) => {
	controller.store.custom.respondAt = '(max-width: 768px)';

	// add site and page details configs to the store
	controller.store.custom = { ...controller.store.custom, site: site, page: page };

	controller.on('afterSearch', async ({ response }, next) => {
		// preload first few images
		response.results.forEach((result, index) => {
			const preloadCount = 8;
			if (index < preloadCount) {
				const img = new Image();
				img.src = result.mappings?.core?.imageUrl;
			}
		});

		await next();
	});

	controller.on('afterStore', async ({ controller }, next) => {
		const store = controller.store;
		const page = store.custom.page;
		const { results, pagination } = store;

		// scroll to top of page
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });

		// add collection path to product URLs on collection pages
		if (controller.type === 'search' && page?.type === 'collection' && results?.length > 0) {
			const hasRoute = typeof Shopify === 'object' && typeof Shopify.routes === 'object' && typeof Shopify.routes.root === 'string';
			const routeShopify = hasRoute ? Shopify.routes.root : '/';
			const routeCollection = `collections/${page.id}/`;
			results.forEach((result) => {
				if (result.type !== 'banner') {
					result.mappings.core.url = `${routeShopify}${routeCollection}products/${result.attributes.handle}`;
				}
			});
		}

		// add body class on no-results page
		if (controller.type === 'search' && store.loaded) {
			if (pagination.totalResults === 0) {
				document.body.classList.add('ss__loaded--no-results');
			} else {
				document.body.classList.remove('ss__loaded--no-results');
			}
		}

		await next();
	});

	// log the store on each search
	controller.on('afterStore', async ({ controller }, next) => {
		controller.log.warn('Snap is alive!');
		controller.log.debug('store', controller.store.toJSON());

		await next();
	});
};
