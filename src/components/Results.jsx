/* external imports */
import { h, Fragment } from 'preact';
import { useEffect } from 'preact/hooks';
import { observer } from 'mobx-react';
import classnames from 'classnames';

/* searchspring imports */
import {
	withController,
	withTracking,
	withTheme,
	InlineBanner,
	OverlayBadge,
	CalloutBadge,
	Image,
	Price,
	FilterSummary,
} from '@searchspring/snap-preact-components';

/* local imports */
import { Carousel } from './recommendations/carousel/Carousel';
import '../styles/Results.scss';

export const Results = withController(
	observer(({ controller, isDesktop }) => {
		useEffect(() => {
			// custom JS integration code
		}, []);

		useEffect(() => {
			// custom JS integration code
		});

		const { results } = controller.store;

		return (
			<ul id="product-grid" className={`ss__results ss__results--${controller.id} grid product-grid grid--2-col-tablet-down grid--4-col-desktop`}>
				{results.map((result, index) => (
					<li
						id={`ss__result--${controller.id}-${result.id}`}
						className={classnames('ss__result grid__item scroll-trigger animate--slide-in', {
							'ss__result--inline-banner': result.type === 'banner',
							'ss__result--item': result.type !== 'banner',
						})}
						style={`--animation-order: ${index + 1};`}
						data-cascade
						key={result.id}
					>
						{{
							banner: <InlineBanner banner={result} disableStyles={true} />,
						}[result.type] || <Result result={result} />}
					</li>
				))}
			</ul>
		);
	})
);

export const Result = withController(
	withTracking(
		observer((props) => {
			const { controller, result, trackingRef } = props;
			const core = result.mappings.core;
			const attr = result.attributes;

			return (
				result && (
					<div className="card-wrapper product-card-wrapper underline-links-hover" ref={trackingRef}>
						<div className="card card--standard card--media" style="--ratio-percent: 100%;">
							<div className="card__inner color-scheme-2 gradient ratio" style="--ratio-percent: 100%;">
								<div className="card__media">
									<a href={core.url} className={`media media--transparent media--hover-effect${attr.ss_hover_image ? ' media--hover-effect' : ''}`}>
										<OverlayBadge controller={controller} result={result} limit={3}>
											<Image
												src={core.thumbnailImageUrl}
												alt={core.name}
												lazy={false}
												fallback="//cdn.searchspring.net/ajax_search/img/default_image.png"
											/>
										</OverlayBadge>
									</a>
								</div>
							</div>
							<div className="card__content">
								<ResultDetails result={result} />
								<CalloutBadge controller={controller} result={result} limit={2} />
							</div>
						</div>
					</div>
				)
			);
		})
	)
);

export const ResultDetails = withTheme((props) => {
	const { result, theme } = props;
	const core = result.mappings.core;
	const attr = result.attributes;
	const currency = theme.currency.usd;
	const onSale = Boolean(attr.ss_on_sale);

	return (
		<div className="card__information">
			<h3 className="card__heading h5">
				<a href={core.url} className="full-unstyled-link">
					{core.name}
				</a>
			</h3>
			<div className="card-information">
				<div className={`price${onSale ? ' price--on-sale' : ''}`}>
					<div className="price__container">
						<div className={onSale ? 'price__sale' : 'price__regular'}>
							{onSale ? (
								<>
									<span>
										<s className="price-item price-item--regular">
											<Price value={core.msrp} {...currency} />
										</s>
									</span>
									<span className="price-item price-item--sale price-item--last">
										<Price value={core.price} {...currency} />
									</span>
								</>
							) : (
								<span className="price-item price-item--regular">
									<Price value={core.price} {...currency} />
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

export const NoResults = withController(
	observer(({ controller }) => {
		const store = controller.store;
		const dym = store.search.didYouMean;
		const contactEmail = 'contact@thesite.com';

		return (
			<div className="ss__no-results">
				<FilterSummary
					style={{ marginBottom: '20px' }}
					filters={store.filters}
					onClearAllClick={() => {
						controller.urlManager.remove('filter').go();
					}}
				/>

				<div className="ss__no-results__container">
					{dym && (
						<p className="ss__did-you-mean">
							Did you mean <a href={dym.url.href}>{dym.string}</a>?
						</p>
					)}
				</div>

				<div className="ss__no-results__container">
					<h4 style="margin-bottom: 5px;">Suggestions</h4>

					<ul className="ss__no-results__suggestions">
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

					<Carousel controller={controller.noResultsController} />

					<hr />

					<div className="ss__no-results__container">
						<div className="ss__no-results__contact">
							<div className="ss__no-results__contact__phone">
								<h4 style="margin-bottom: 5px;">Call Us</h4>
								<p>555-555-5555</p>
							</div>

							<div className="ss__no-results__contact__email">
								<h4 style="margin-bottom: 5px;">Email Us</h4>
								<p>
									<a href={`mailto:${contactEmail}`} style="font-size: 14px;">
										{contactEmail}
									</a>
								</p>
							</div>

							<div className="ss__no-results__contact__location">
								<h4 style="margin-bottom: 5px;">Physical Address</h4>
								<p>
									123 Street Address
									<br />
									City, State, Zipcode
								</p>
							</div>

							<div className="ss__no-results__contact__hours">
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
