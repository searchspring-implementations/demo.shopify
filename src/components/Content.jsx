/* external imports */
import { h, Fragment } from 'preact';
import { observer } from 'mobx-react';

/* searchspring imports */
import { Banner, useMediaQuery, ControllerProvider, ThemeProvider } from '@searchspring/snap-preact-components';

/* local imports */
import { Results, NoResults } from './Results';
import { Toolbar } from './Toolbar';
import { Pagination } from './Pagination';
import { theme } from '../theme';

export const Content = observer(({ controller }) => {
	const { merchandising, pagination } = controller.store;
	const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.bp02}px)`);

	return (
		controller.store.loaded && (
			<ThemeProvider theme={theme}>
				<ControllerProvider controller={controller}>
					<div className="collection">
						<Banner content={merchandising.content} type="header" />
						<Banner content={merchandising.content} type="banner" />

						{pagination.totalResults > 0 ? (
							<>
								<Toolbar isDesktop={isDesktop} />
								<Results isDesktop={isDesktop} />
								<Pagination />
							</>
						) : (
							<NoResults />
						)}

						<Banner content={merchandising.content} type="footer" />
					</div>
				</ControllerProvider>
			</ThemeProvider>
		)
	);
});
