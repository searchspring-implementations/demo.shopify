import { h, Fragment, Component } from 'preact';
import { observer } from 'mobx-react';

import { Icon, Autocomplete as LibraryAutocomplete } from '@searchspring/snap-preact-components';
import { ResultDetails } from './Results';

@observer
export class Autocomplete extends Component {
	render() {
		const { controller, input } = this.props;

		const responsive = {
			0: {
				columns: 2,
				rows: 1,
			},
			991: {
				columns: 3,
				rows: 3,
			},
		};

		const theme = {
			components: {
				results: {
					theme: {
						components: {
							result: {
								hidePricing: true,
								hideTitle: true,
								detailSlot: <ResultDetails />,
							},
						},
					},
				},
			},
		};

		const inputText = controller.store.state.input;

		const reset = () => {
			controller.reset && controller.reset();
			const inputElement = typeof input == 'string' ? window.document.querySelector(input) : input;
			if (inputElement) {
				inputElement.focus();
			}
		};

		return (
			<>
				{inputText && (
					<span class="ss__autocomplete-close" onClick={reset}>
						<Icon icon="close-thin" size="8px" />
					</span>
				)}
				<LibraryAutocomplete input={input} controller={controller} responsive={responsive} theme={theme} />
			</>
		);
	}
}
