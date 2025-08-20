export const liquidPlugin = (controller) => {
	controller.on('afterSearch', async ({ controller, response }, next) => {
		// for each result fetch data from Shopify
		controller.log.debug('got a response', response);
		const results = response.results;

		await Promise.all(
			results.map(async (result) => {
				try {
					const url = result?.mappings?.core?.url;
					var response = await fetch(url + '?view=searchspring&variant=' + result.id);
					result.attributes.shopifyTemplateHTML = await response.text();
				} catch (err) {
					controller.log.error('Not able to process this product because:', err, result);
				}
			})
		);

		await next();
	});
};
