import { h, Fragment, render } from 'preact';
import { configure as configureMobx } from 'mobx';

/* searchspring imports */
import { Snap } from '@searchspring/snap-preact';
import { getScriptContext } from '@searchspring/snap-toolbox';

/* local imports */
import { searchspring } from '../package.json';
import { middleware } from './scripts/middleware';
import './styles/custom.scss';

import { SearchHeader } from './components/SearchHeader';
import { SortBy } from './components/SortBy';
import { Content } from './components/Content';
import { Autocomplete } from './components/Autocomplete';

/*
	configuration and instantiation
 */

configureMobx({
	useProxies: 'never',
});

/*
	configuration and instantiation
 */

const config = {
	parameters: {
		query: { name: 'q' },
	},
	client: {
		globals: {
			siteId: searchspring.siteId,
		},
	},
	controllers: {
		search: [
			{
				config: {
					id: 'search',
					plugin: middleware,
				},
				targets: [
					{
						name: 'title',
						selector: '.ss-shop .section-header__title',
						component: SearchHeader,
						hideTarget: true,
					},
					{
						name: 'sort',
						selector: '#CollectionSection .section-header__link--right',
						component: SortBy,
						hideTarget: true,
					},
					{
						name: 'main',
						selector: '#searchspring-content',
						component: Content,
						hideTarget: true,
					},
				],
			},
		],
		autocomplete: [
			{
				config: {
					id: 'autocomplete',
					selector: '.header-bar__search-input',
				},
				targets: [
					{
						selector: '#shopify-section-header .header-bar .header-bar__right .header-bar__search-input',
						component: Autocomplete,
					},
					{
						selector: '#MobileNav .header-bar__search-input',
						component: Autocomplete,
					},
				],
			},
		],
	},
};

const snap = new Snap(config);
const { search, autocomplete } = snap.controllers;

search.plugin((controller) => {
	controller.store.custom.respondAt = '(max-width: 768px)';
});
