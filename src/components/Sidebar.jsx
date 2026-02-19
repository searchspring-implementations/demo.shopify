/* external imports */
import { h, Fragment } from 'preact';
import { observer } from 'mobx-react';

/* searchspring imports */
import { ControllerProvider, ThemeProvider, useMediaQuery } from '@searchspring/snap-preact-components';

/* local imports */
import { CustomFacets } from './Facets';
import { CustomFilterSummary } from './FilterSummary';
import { theme } from '../theme';

export const Sidebar = observer(({ controller }) => {
	const { loaded } = controller.store;

	const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.bp02}px)`);

	return loaded && isDesktop ? (
		<ThemeProvider theme={theme}>
			<ControllerProvider controller={controller}>
				<div className="facets-container scroll-trigger animate--fade-in">
					<facet-filters-form className="facets small-hide">
						<div id="FacetFiltersForm" className="facets__form-vertical">
							<div id="FacetsWrapperDesktop">
								<CustomFilterSummary isDesktop={isDesktop} />
								<CustomFacets />
							</div>
						</div>
					</facet-filters-form>
				</div>
			</ControllerProvider>
		</ThemeProvider>
	) : null;
});
