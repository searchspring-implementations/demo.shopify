/* external imports */
import { h, Fragment } from 'preact';
import { observer } from 'mobx-react';

/* searchspring imports */
import { FacetSlider, FacetGridOptions, FacetPaletteOptions, FacetHierarchyOptions, withController } from '@searchspring/snap-preact-components';

/* local imports */
import '../styles/Facets.scss';

export const CustomFacets = withController(
	observer((props) => {
		const { facets } = props.controller.store;

		return (
			facets?.length > 0 && (
				<div className="ss__facets">
					{facets.map((facet) => (
						<CustomFacet facet={facet} key={facet.field} />
					))}
				</div>
			)
		);
	})
);

const CustomFacet = withController(
	observer((props) => {
		const { facet } = props;

		// set limits for facet options
		let limits = {
			grid: 12,
			palette: 18,
			default: 5,
		};

		// set facet overflow limit
		if (facet.overflow) {
			if (facet.display === 'grid') {
				facet.overflow.setLimit(limits.grid);
			} else if (facet.display === 'palette') {
				facet.overflow.setLimit(limits.palette);
			} else {
				facet.overflow.setLimit(limits.default);
			}
		}

		return (
			facet && (
				<div
					id={`ss__facet--${facet.field}`}
					className={`ss__facet ss__facet--${facet.display} ss__${facet.collapsed ? 'collapsed' : 'expanded'} facets__disclosure-vertical`}
				>
					<div
						className="facets__summary caption-large focus-offset"
						tabIndex="0"
						role="button"
						onClick={() => facet.toggleCollapse()}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								facet.toggleCollapse();
							}
						}}
					>
						<div>
							<span className="facets__summary-label">{facet.label}</span>
							<svg className="icon icon-caret" viewBox="0 0 10 6">
								<path
									fill="currentColor"
									fill-rule="evenodd"
									d="M9.354.646a.5.5 0 0 0-.708 0L5 4.293 1.354.646a.5.5 0 0 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					</div>

					<div className="parent-display facets__display-vertical">
						{{
							grid: <FacetGridOptions values={facet.refinedValues} />,
							palette: <FacetPaletteOptions values={facet.refinedValues} />,
							hierarchy: <FacetHierarchyOptions values={facet.refinedValues} />,
							slider: <FacetSlider facet={facet} />,
						}[facet.display] || <CustomFacetListOptions facet={facet} />}

						{facet.overflow && facet.overflow.enabled && (
							<div className="ss__show-more">
								<button
									className="ss__show-more__button underlined-link"
									onClick={(e) => {
										e.preventDefault();
										facet.overflow.toggle();
									}}
								>
									Show {facet.overflow.remaining ? 'more' : 'less'}
								</button>
							</div>
						)}
					</div>
				</div>
			)
		);
	})
);

const CustomFacetListOptions = observer((props) => {
	const { facet } = props;
	const values = facet.refinedValues;

	return (
		<div className="facets-wrap parent-wrap facets-wrap-vertical">
			<ul className="facets-layout facets-layout-list facets-layout-list--text facets__list--vertical list-unstyled ss__scrollbar">
				{values?.map((value) => (
					<li className="list-menu__item facets__item" key={`${facet.field}.${value.value}.${value.filtered}`}>
						<a
							className={`facets__label facet-checkbox${value.filtered ? ' active' : ''}`}
							tabIndex="0"
							role="button"
							href={value.url.link.href}
							onClick={(e) => value.url.link.onClick(e)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									value.url.link.onClick(e);
								}
							}}
						>
							<input type="checkbox" value={value.value} id="Filter-filter.v.availability-1" checked={value.filtered} />
							<svg width="16px" height="16px" viewBox="0 0 16 16">
								<rect width="16" height="16" fill="none" stroke="currentColor" />
							</svg>
							<div className="svg-wrapper">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" className="icon icon-checkmark" viewBox="0 0 12 9">
									<path
										fill="currentColor"
										fill-rule="evenodd"
										d="M11.35.643a.5.5 0 0 1 .006.707l-6.77 6.886a.5.5 0 0 1-.719-.006L.638 4.845a.5.5 0 1 1 .724-.69l2.872 3.011 6.41-6.517a.5.5 0 0 1 .707-.006z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
							<span className="facet-checkbox__text" aria-hidden="true">
								<span className="facet-checkbox__text-label">{value.label}</span> ({value.count})
							</span>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
});
