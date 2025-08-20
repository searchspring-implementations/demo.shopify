const liquidCache = new Map();

export const liquidPlugin = (controller) => {
	controller.on('afterSearch', async ({ controller, response }, next) => {
		// for each result fetch data from Shopify
		controller.log.debug('got a response', response);
		const results = response.results;

		await Promise.all(
			results.map(async (result) => {
				try {
					const url = result?.mappings?.core?.url;
					const cacheKey = url + '?view=searchspring&variant=' + result.id;
					if (liquidCache.has(cacheKey)) {
						result.attributes.shopifyTemplateHTML = liquidCache.get(cacheKey);
					} else {
						var response = await fetch(cacheKey);
						const html = await response.text();
						liquidCache.set(cacheKey, html);
						result.attributes.shopifyTemplateHTML = html;
					}
				} catch (err) {
					controller.log.error('Not able to process this product because:', err, result);
				}
			})
		);

		await next();
	});
};
