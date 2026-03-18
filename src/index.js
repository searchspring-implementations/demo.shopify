/* searchspring imports */
import { Snap } from '@searchspring/snap-preact';
import { getContext } from '@searchspring/snap-toolbox';

/* local imports */
import { searchPlugin } from './scripts/searchPlugin';
import './styles/custom.scss';

/* -------------------------------- */
/* context and background filtering */
/* -------------------------------- */

const context = getContext(['collection', 'tags', 'template', 'shopper', 'siteId']);

/* site details config */
let site = {
	id: context?.siteId ? context.siteId : 'y56s6x',
	loggedIn: context?.shopper?.id ? true : false,
	currency: 'usd',
	lang: 'en',
	parameters: {
		query: 'q',
		page: 'page',
	},
	features: {
		integratedSpellCorrection: {
			enabled: true,
		},
	},
};

/* check for search pages */
const searchPages = ['/shop', '/mockup', '/lighthouse'];
const isSearch = searchPages.find((page) => window.location.href.toLowerCase().includes(page)) ? true : false;

/* page details config */
let page = {
	id: isSearch ? 'shop' : 'other',
	title: isSearch ? 'Search Results' : 'Other Page',
	type: isSearch ? 'search' : 'other',
};

/* background filters */

let backgroundFilters = [];

if (!isSearch && context?.collection?.handle) {
	// replace characters on collection name
	const collectionName = context.collection.name.replace(/\&\#39\;/, "'");

	// update page details when on collection
	page = {
		id: context.collection.handle,
		title: collectionName,
		type: 'collection',
	};

	// set background filter
	if (context.collection.handle == 'vendors') {
		backgroundFilters.push({
			field: 'vendor',
			value: collectionName,
			type: 'value',
			background: true,
		});
	} else if (context.collection.handle == 'types') {
		backgroundFilters.push({
			field: 'product_type',
			value: collectionName,
			type: 'value',
			background: true,
		});
	} else {
		backgroundFilters.push({
			field: 'collection_handle',
			value: context.collection.handle,
			type: 'value',
			background: true,
		});
	}

	// handle collection tags (filters)
	if (context?.tags && Array.isArray(context.tags)) {
		context.tags.forEach((tag) => {
			backgroundFilters.push({
				field: 'ss_tags',
				value: tag,
				type: 'value',
				background: true,
			});
		});
	}
}

/* ------------------------------- */
/* configuration and instantiation */
/* ------------------------------- */

const config = {
	context,
	url: {
		parameters: {
			core: {
				query: { name: site.parameters.query },
				page: { name: site.parameters.page },
			},
		},
	},
	client: {
		globals: {
			siteId: site.id,
		},
	},
	features: site.features,
	instantiators: {
		recommendation: {
			components: {
				Carousel: async () => (await import('./components/recommendations/carousel/Carousel')).Carousel,
			},
			config: {
				branch: BRANCHNAME,
				plugins: [[searchPlugin, site, page]],
			},
		},
	},
	controllers: {
		search: [
			{
				config: {
					id: 'search',
					plugins: [[searchPlugin, site, page]],
					globals: {
						filters: backgroundFilters,
					},
					settings: {
						redirects: {
							singleResult: false,
						},
						facets: {
							pinFiltered: true,
						},
						pagination: {
							pageSizeOptions: [
								{
									label: '16',
									value: 16,
								},
								{
									label: '32',
									value: 32,
								},
								{
									label: '48',
									value: 48,
								},
							],
						},
					},
				},
				targeters: [
					{
						name: 'title',
						selector: '.ss-shop .collection-hero__text-wrapper',
						component: async () => (await import('./components/SearchHeader')).SearchHeader,
						hideTarget: true,
					},
					{
						name: 'sidebar',
						selector: '#athos-sidebar',
						component: async () => (await import('./components/Sidebar')).Sidebar,
						hideTarget: true,
						prefetch: Boolean(context.collection?.handle),
						renderAfterSearch: true,
					},
					{
						name: 'content',
						selector: '#athos-content',
						component: async () => (await import('./components/Content')).Content,
						hideTarget: true,
						prefetch: Boolean(context.collection?.handle),
						renderAfterSearch: true,
					},
				],
			},
		],
		autocomplete: [
			{
				config: {
					id: 'autocomplete',
					plugins: [[searchPlugin, site, page]],
					selector: '.search__input',
					globals: {
						facets: {
							limit: 3,
							valueLimit: 10,
						},
						pagination: {
							pageSize: 6,
						},
					},
					settings: {
						history: {
							limit: 6,
							showResults: true,
						},
						trending: {
							limit: 6,
							showResults: true,
						},
					},
				},
				targeters: [
					{
						name: 'main',
						selector: '.search__input',
						component: async () => (await import('./components/Autocomplete')).Autocomplete,
						hideTarget: true,
					},
				],
			},
		],
		recommendation: [
			{
				config: {
					id: 'no-results',
					tag: 'no-results',
					branch: BRANCHNAME,
					plugins: [[searchPlugin, site, page]],
				},
			},
		],
	},
};

const snap = new Snap(config);

/* recommendations for no results */
snap.getControllers('search', 'no-results').then(([search, noResults]) => {
	search.noResultsController = noResults;
});
