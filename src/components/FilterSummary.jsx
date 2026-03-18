/* external imports */
import { h, Fragment } from 'preact';
import { observer } from 'mobx-react';

/* searchspring imports */
import { withController } from '@searchspring/snap-preact-components';

export const CustomFilterSummary = withController(
	observer((props) => {
		const { controller, isDesktop } = props;
		const { filters } = controller.store;
		const clearAll = controller.urlManager.remove('filter').remove('sort').remove('pageSize').remove('page').remove('rq');

		return (
			<div className={`active-facets active-facets-${isDesktop ? 'desktop' : 'mobile'}`}>
				{isDesktop ? (
					<div className="active-facets-vertical-filter">
						<h2 className="facets__heading facets__heading--vertical caption-large text-body" id="verticalTitle" tabIndex="-1">
							Filter:
						</h2>
						{filters?.length > 0 ? (
							<facet-remove className="active-facets__button-wrapper">
								<a {...clearAll.link} className="active-facets__button-remove underlined-link" role="button">
									<span>Remove all</span>
								</a>
							</facet-remove>
						) : null}
					</div>
				) : null}
				{filters?.length > 0 ? (
					<>
						{filters.map((filter) => (
							<facet-remove>
								<a {...filter.url.link} className="active-facets__button active-facets__button--light" role="button">
									<span className="active-facets__button-inner button button--tertiary">
										{filter.facet.label}: {filter.value.label}
										<span className="svg-wrapper">
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" className="icon icon-close-small" viewBox="0 0 12 13">
												<path
													stroke="currentColor"
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M8.486 9.33 2.828 3.67M2.885 9.385l5.544-5.77"
												></path>
											</svg>
										</span>
										<span className="visually-hidden">Remove filter</span>
									</span>
								</a>
							</facet-remove>
						))}
						{!isDesktop ? (
							<facet-remove className="active-facets__button-wrapper">
								<a {...clearAll.link} className="active-facets__button-remove underlined-link" role="button">
									<span>Remove all</span>
								</a>
							</facet-remove>
						) : null}
					</>
				) : null}
			</div>
		);
	})
);
