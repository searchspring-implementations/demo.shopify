import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import { observer } from 'mobx-react';
import { FilterSummary, Price, Results as LibraryResults, InlineBanner, withController } from '@searchspring/snap-preact-components';
import classnames from 'classnames';

export const Results = withController(
	observer(({ controller }) => {
		useEffect(() => {
			// custom JS integration code
		}, []);

		useEffect(() => {
			// custom JS integration code
		});

		const { results } = controller.store;

		const theme = {
			components: {
				result: {
					hidePricing: true,
					hideTitle: true,
					detailSlot: <ResultDetails />,
				},
				image: {
					lazy: false,
				},
			},
		};

		return <LibraryResults controller={controller} results={results} theme={theme} />;
	})
);

export const ResultDetails = ({ result }) => {
	const {
		custom,
		attributes,
		mappings: { core },
	} = result;
	const onSale = Boolean(attributes.ss_on_sale);

	return (
		<>
			<p class="grid-link__title">{core.name}</p>

			<p class="grid-link__meta">
				{onSale && core.msrp > 0 && (
					<s class="grid-link__sale_price">
						<Price raw value={core.msrp} />
					</s>
				)}{' '}
				<Price value={core.price} />
			</p>
		</>
	);
};

export const NoResults = withController(
	observer(({ controller }) => {
		const store = controller.store;
		const dym = store.search.didYouMean;
		const contactEmail = 'contact@thesite.com';

		return (
			<div class="ss__no-results">
				<FilterSummary
					style={{ marginBottom: '20px' }}
					filters={store.filters}
					onClearAllClick={() => {
						controller.urlManager.remove('filter').go();
					}}
				/>

				<div class="ss__no-results__container">
					{dym && (
						<p class="ss__did-you-mean">
							Did you mean <a href={dym.url.href}>{dym.string}</a>?
						</p>
					)}
				</div>

				<div class="ss__no-results__container">
					<h4 style="margin-bottom: 5px;">Suggestions</h4>

					<ul class="ss__no-results__suggestions">
						<li>Check for misspellings.</li>
						<li>Remove possible redundant keywords (ie. "products").</li>
						<li>Use other words to describe what you are searching for.</li>
					</ul>

					<p>
						Still can't find what you're looking for?{' '}
						<a href="https://searchspring.com/contact/" style="font-size: 14px;">
							Contact us
						</a>
						.
					</p>

					<hr />

					<div class="ss__no-results__container">
						<div class="ss__no-results__contact">
							<div class="ss__no-results__contact__phone">
								<h4 style="margin-bottom: 5px;">Call Us</h4>
								<p>555-555-5555</p>
							</div>

							<div class="ss__no-results__contact__email">
								<h4 style="margin-bottom: 5px;">Email Us</h4>
								<p>
									<a href={`mailto:${contactEmail}`} style="font-size: 14px;">
										{contactEmail}
									</a>
								</p>
							</div>

							<div class="ss__no-results__contact__location">
								<h4 style="margin-bottom: 5px;">Physical Address</h4>
								<p>
									123 Street Address
									<br />
									City, State, Zipcode
								</p>
							</div>

							<div class="ss__no-results__contact__hours">
								<h4 style="margin-bottom: 5px;">Hours</h4>
								<p>Monday - Friday: 8am - 9pm MDT</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	})
);
