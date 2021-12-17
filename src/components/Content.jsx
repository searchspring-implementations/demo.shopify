import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react';

import { Banner, Facets, FilterSummary, useMediaQuery, ControllerProvider, ThemeProvider } from '@searchspring/snap-preact-components';

import { Results, NoResults } from './Results';
import { Pagination } from './Pagination';
import { theme } from '../theme';

@observer
export class Content extends Component {
	render() {
		const controller = this.props.controller;
		const {
			store,
			store: { facets, filters, pagination, merchandising, custom },
		} = controller;

		const isMobile = custom.respondAt && useMediaQuery(custom.respondAt);

		return (
			controller.store.loaded && (
				<ThemeProvider theme={theme}>
					<ControllerProvider controller={controller}>
						<div class="ss__wrapper">
							{!isMobile && facets.length > 0 && (
								<div class="ss__sidebar">
									<FilterSummary
										filters={filters}
										onClearAllClick={() => {
											controller.urlManager.remove('filter').go();
										}}
									/>
									<Facets facets={facets} />
								</div>
							)}

							<div class="ss__contents">
								<Banner content={merchandising.content} type="header" />
								<Banner content={merchandising.content} type="banner" />

								{pagination.totalResults ? (
									<div>
										<h5>
											{pagination.multiplePages && (
												<span class="ss__search-header__count-range">{` ${pagination.begin} - ${pagination.end} of `}</span>
											)}
											<span class="ss__search-header__count-total">{pagination.totalResults}</span>
											{` result${pagination.totalResults == 1 ? '' : 's'}`}
										</h5>

										<Results results={store.results}></Results>

										<hr class="hr--clear" />
										<Pagination pagination={store.pagination} />
									</div>
								) : (
									pagination.totalResults === 0 && <NoResults />
								)}
							</div>

							<Banner content={merchandising.content} type="footer" />
						</div>
					</ControllerProvider>
				</ThemeProvider>
			)
		);
	}
}
