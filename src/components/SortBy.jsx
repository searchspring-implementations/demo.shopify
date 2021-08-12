import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react';
import { useMediaQuery, ControllerProvider, FilterSummary, ThemeProvider } from '@searchspring/snap-preact-components';

import { Slideout } from './Slideout';
import { theme } from '../theme';

@observer
export class SortBy extends Component {
	render() {
		const controller = this.props.controller;
		const { sorting, custom, filters } = controller.store;

		const isMobile = custom.respondAt && useMediaQuery(custom.respondAt);

		return (
			<ThemeProvider theme={theme}>
				<ControllerProvider controller={controller}>
					<div class="form-horizontal">
						<label for="SortBy">Sort by</label>
						<select
							name="sort_by"
							id="SortBy"
							class="btn--tertiary"
							aria-describedby="a11y-refresh-page-message"
							onChange={(e) => {
								const selectedOption = sorting.options.filter((option) => option.value == e.target.value).pop();
								selectedOption && selectedOption.url.go();
							}}
						>
							{sorting.options.map((option) => (
								<option value={option.value} selected={option.value === sorting.current.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>

					<Slideout />

					{isMobile && (
						<FilterSummary
							style={{ marginTop: '20px' }}
							onClearAllClick={() => {
								controller.urlManager.remove('filter').go();
							}}
							filters={filters}
						/>
					)}
				</ControllerProvider>
			</ThemeProvider>
		);
	}
}
