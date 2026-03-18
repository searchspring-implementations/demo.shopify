/* external imports */
import { h, Fragment } from 'preact';
import { observer } from 'mobx-react';

/* searchspring imports */
import { withController } from '@searchspring/snap-preact-components';

/* local imports */
import { SelectMenu } from './SelectMenu';
import { CustomFilterSummary } from './FilterSummary';
import { Slideout } from './Slideout';
import '../styles/Toolbar.scss';

export const Toolbar = withController(
	observer(({ controller, isDesktop }) => {
		const { pagination, sorting } = controller.store;

		return (
			<form className="ss__toolbar facets-vertical-form" id="FacetSortForm">
				<div className="ss__toolbar--count-sort">
					<div className="product-count-vertical light" role="status">
						<h2 className="product-count__text text-body">
							<span id="ProductCountDesktop">
								{pagination.multiplePages && <>{`${pagination.begin} - ${pagination.end} of `}</>}
								{`${pagination.totalResults} product${pagination.totalResults === 1 ? '' : 's'}`}
							</span>
						</h2>
					</div>

					<div>
						{isDesktop && <SelectMenu options={pagination.pageSizeOptions} type="per-page" label="Show" />}
						<SelectMenu options={sorting.options} type="sort-by" label="Sort by" />
					</div>
				</div>

				{!isDesktop ? (
					<>
						<Slideout />
						<CustomFilterSummary isDesktop={isDesktop} />
					</>
				) : null}
			</form>
		);
	})
);
