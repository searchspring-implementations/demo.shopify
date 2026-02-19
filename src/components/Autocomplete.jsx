/* external imports */
import { h, Fragment } from 'preact';
import { observer } from 'mobx-react';

/* searchspring imports */
import { ControllerProvider, ThemeProvider, Autocomplete as LibraryAutocomplete } from '@searchspring/snap-preact-components';

/* local imports */
import { ResultDetails } from './Results';
import { theme } from '../theme';
import '../styles/Autocomplete.scss';
import '../styles/Results.scss';

export const Autocomplete = observer(({ controller, input }) => {
	const breakpoints = {
		0: {
			columns: 2,
			rows: 1,
			hideFacets: true,
			vertical: true,
		},
		541: {
			columns: 3,
			rows: 1,
			hideFacets: true,
			vertical: true,
		},
		750: {
			columns: 2,
			rows: 2,
		},
		990: {
			columns: 3,
			rows: 3,
		},
	};

	const acTheme = {
		components: {
			result: {
				hidePricing: true,
				hideTitle: true,
				detailSlot: <ResultDetails />,
			},
		},
	};

	const acProps = {
		controller: controller,
		input: input,
		hideBanners: false,
		breakpoints: breakpoints,
		theme: acTheme,
	};

	return (
		<ThemeProvider theme={theme}>
			<ControllerProvider controller={controller}>
				<LibraryAutocomplete {...acProps} />
			</ControllerProvider>
		</ThemeProvider>
	);
});
